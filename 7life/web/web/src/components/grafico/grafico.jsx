import { useEffect, useState } from "react";
import GraficoLog from "../chart"
import Logs from "../logs"
import Title from "../title"
import { useMQTT } from "../../service/mqtt";
import ConnApi from "../../service/conn";
import EnviarMensagem from "../msg/mandarMsg";


// Organiza o Gráfico do usuário junto dos logs de seus sinais vitais //
const Grafico = ({user})=>{

      // useEffect(()=>{console.log(user);
      // },[user])
      const [values, setValues] = useState([]);
      // REQUEST API
      useEffect( ()=>{
        const fetchData = async () =>{
          try {
            const resposta = await ConnApi.get(`/allDataUser/${user.usu_id}`)
            //console.log(resposta);
            const dadosConvertidos = resposta.data.data.map(item => ({
              ...item,
              dados_valor: Number(item.dados_valor),
            }));
            setValues(dadosConvertidos)
    
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      },[])

       const { client, isConnected } = useMQTT();
        useEffect(() => {
          if (client && isConnected) {
      
            const topic = `${user.esp_mac}/#`;
            //console.log(topic);
            
            client.unsubscribe(['+/temperatura', '+/bpm', '+/oxigenacao'], (err) => {
                if (err) {
                    console.error('Erro ao desinscrever:', err);
                } //else {
                    //console.log('Desinscrito com sucesso!');
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
      
              //LOG
              
              // TRANSFORMA A MESSAGEM EM JSON
              const novoItem = JSON.parse(message.toString());
              
              if (esp_mac === user.esp_mac && novoItem.use_id == user.use_id) {
      
                //TROCA O VALOR DO DADO PARA NUMBER
                novoItem.dados_valor =  Number(novoItem.dados_valor);
                

                //TRANFORMA O TIMESTAMP EM DATE
                //console.log(novoItem.dados_generate);
                novoItem.dados_generate = new Date(novoItem.dados_generate*1000)
                .toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                });
      
      
                //ADICIONA ELE NO ARRAY DE VALORES
                setValues(prevItens => [...prevItens, novoItem]);
              }
            };
      
            client.on('message', handleMessage);
      
            return () => {
              client.unsubscribe(topic);
              client.off('message', handleMessage);
            };
          }
        }, [client, isConnected]);
      

// constante para seletor de dados 

  const [mudarGrafico, setMudarGrafico] = useState('');



  const [dadosExibidos , setDadosExibidos] = useState("");


  useEffect(()=>{
    // filtra o itens de acordo com o dados_tipo e seleciona os 10 ultimos 
    setDadosExibidos(values? values.filter((item)=>item.dados_tipo == mudarGrafico).slice(-10):"")
    //console.log(dadosExibidos);
    //console.log(values);
    
  },[mudarGrafico,values])
  useEffect(()=>{
    setMudarGrafico("temperatura")
  },[])

 


    return(
        <>
            <Title user={user}/>
            <GraficoLog user={user} values={values} mudarGrafico={mudarGrafico} setMudarGrafico={setMudarGrafico} dadosExibidos={dadosExibidos}/>
            <EnviarMensagem esp_mac={user.esp_mac}/>
            {
                dadosExibidos
                ?
                dadosExibidos.slice().reverse().map((e, index) => (
                  <Logs key={index} values={e} />
                ))
                :
                ""
            }

        </>
    )
}
export default Grafico