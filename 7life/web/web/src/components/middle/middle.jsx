import "./middle.css"
import Card from "../card/card"
import { useState } from "react"
import { useEffect } from "react"
import UsuarioEsp from "../usuarioesp/usuariosEsp"
import RegisterUser from "../register/registerUser"
import Grafico from "../grafico/grafico"
import { useMQTT } from "../../service/mqtt"
import Sobre from "../sobre/sobre"
const Middle = ({tela, setTela}) =>{


    //const [subInscrito, setSubInscrito] = useState(false);
  
    //RECEBE TODOS OS REQUEST_USER
    const [requests_esp, setEspMac] = useState([]);
  
    //RECEBE A INFORMAÇÃO DO USUÁRIO SELECIONADO PELO CARD E ENVIA PARA O GRAFICO
    const [ user, setUser] = useState("");
  
    //RECEBE O ESP DO CARD(request_user) SELECIONADO
    const [ esp, setEsp] = useState();


    
    const [usuValues , setUsuValues]= useState([])


      const { client, isConnected } = useMQTT();
      useEffect(() => {
        if (client && isConnected) {
    
          const topic = "+/request_user";
    
          client.subscribe(topic, (err) => {
            if (err) {
              console.error('Erro ao se inscrever:', err);
            } // else {
            //   console.log(`Inscrito no tópico: ${topic}`);
            // }
          });
    
          const handleMessage = (topic, message) => {
            const [esp_mac, action] = topic.split('/');
            if (action === "request_user") {
              //console.log(message.toString());
              
              setEspMac(prevItens => [...prevItens, message.toString()])
            }
          };
    
          client.on('message', handleMessage);
    
          return () => {
            client.unsubscribe(topic);
            client.off('message', handleMessage);
          };
        }
      }, [client, isConnected]);
      
      //QUANDO CLICA NO CARDZINHO DO NOVO ESP
      const newEsp = (esp)=>{
          //RECEBE O VALOR DO ESP DO CARD SELECIONADO
          setEsp(esp);
          //MANDA PRA TELA DE CADASTRO
          setTela("espUser");
      }

   
    
    return(
        /* Função apenas para facilitar a organização da pagina*/
        <div className="meio-pagina">
            {
                <>
                        {

                            tela === "card"
                            ?
                            <Card setUser = {setUser} setTela = {setTela} user={user}/>
                            :
                            tela === "espUser"
                            ?
                            <UsuarioEsp esp={esp} setEsp={setEsp} setEspMac={setEspMac}/> 
                            :
                            tela === "cadUser"
                            ?
                            <RegisterUser/>
                            :
                            tela === "grafico"
                            ?
                            <Grafico user={user} usuValues = {usuValues} setUsuValues = {setUsuValues}/>
                            :
                            tela === "sobre"
                            ?
                            <Sobre/>
                            :
                            ""
                        }
                        {
                            <div className="Requests">
                                {
                                    requests_esp
                                    ? 
                                    requests_esp.map(
                                        (esp)=>{
                                            return(
                                                <div className="RequestCard" onClick={()=>{newEsp(esp)}}>
                                                    <strong>Novo ESP conectado</strong>
                                                    <div>MAC: {esp}</div>
                                                </div>
                                            )
                                        }
                                    )
                                    :
                                    ""
                                }
                            </div>
                        }
                </>
            } 

        </div>
    )
}

export default Middle;