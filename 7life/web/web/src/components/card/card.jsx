//Importacao de bibliotecas
import { useEffect, useState } from "react";
import { useMQTT } from "../../service/mqtt";
import "./card.css"
import ConnApi from "../../service/conn";
const Card = ({setUser, setTela, user})=>{
  const [ dados, setDados] = useState([  ])
  const { client, isConnected } = useMQTT();
  useEffect(() => {
    if (client && isConnected) {

      const topic = [ '+/temperatura', '+/bpm', '+/oxigenacao'];
      client.unsubscribe(`${user.esp_mac}/*`, (err) => {
          if (err) {
              console.error('Erro ao desinscrever:', err);
          } // else {
          //    console.log('Desinscrito com sucesso!');
          //}
      })
      client.subscribe(topic, (err) => {
        if (err) {
          console.error('Erro ao se inscrever:', err);
        } // else {
        //   console.log(`Inscrito no tópico: ${topic}`);
        // }
      });

      const handleMessage = (topic, message) => {
                
        const [esp_mac, action] = topic.split('/');
        if (action === "temperatura"  || action === "bpm" || action === "oxigenacao") {
            const menssage = JSON.parse(message.toString());
            
            const use_id = menssage.use_id;
            const dados_tipo = menssage.dados_tipo
            const dados_valor = menssage.dados_valor
            let chave
            if (dados_tipo == "temperatura") {
              chave = "temp_valor"
            }
            if (dados_tipo == "bpm") {
              chave = "bpm_valor"
            }
            if (dados_tipo == "oxigenacao") {
              chave = "oxig_valor"
            }
            setDados(
                (prevData)=> 
                    prevData.map(
                        //use_id são de tipos diferentes
                        dataItem=> String(dataItem.use_id) === String(use_id) ? { ...dataItem , [chave] : dados_valor} : dataItem
                    )
            )
        }
      };

      client.on('message', handleMessage);

      return () => {
        client.unsubscribe(topic);
        client.off('message', handleMessage);
      };
    }
  }, [client, isConnected]);


    // REQUEST API
    const lastDataUsers = async () =>{
      try {
      const resposta = await ConnApi.get("/lastDataUsers")
      setDados(resposta.data.data)
      } catch (error) {
      console.log(error);
      }
    }
    useEffect(()=>{ lastDataUsers() },[])

    return(
        <>
      {/* Formulando o card */}
          {
            dados?
            dados.map(dado=>(
                <div className="container wmin250 m001 " 
                  key={dado.use_id}
                  onClick={
                    () => {
                      setUser(dado);
                      setTela("grafico");
                    }
                  }
                >
                  <div className="card wmin250">
                    <div className="title">{dado.usu_nome}</div>      
                      <div className="metric-um bpm w1">
                        ❤️<span>{dado.bpm_valor}bpm</span>
                      </div>
                      <div className="df w1 ac jcsb ">
                        <div className="metric-dois temp w040">
                          🌡️<span>{dado.temp_valor}°C</span>
                        </div>
                        <div className="metric-tres spo2 w040">
                          🩸<span>{dado.oxig_valor}%</span>
                        </div>  
                      </div>
                    </div>  
                  </div>  
            ))
            :
            ""
          } 
        </> 
    )
}




export default Card;