import { useEffect, useState } from "react"
import "./styles.css"
import ConnApi from "../../service/conn"
import { CadastroSuccess, ErrorDados } from "../../service/swal"
import { useMQTT } from "../../service/mqtt"
const UsuarioEsp= (
    {
        // NOVO ESP SELECIONADO 
        esp, 
        // SET NOVO ESP SELECIONADO
        setEsp, 
        // SET ARRAY DE NOVOS ESPS
        setEspMac
    }
)=>{

    //RECEBE TODOS USUARIOS
    const [usuarios, setUsuarios] = useState([]);

    //RECEBE TODOS OS ESPS CADASTRADOS NO BANCO DE DADOS
    const [esps, setEsps] = useState([]);

    //ESP SELECIONA PELO USUÁRIO NO SELECT
    const [espSelecionado, setEspSelecionado] = useState();

    //USUÁRIO SELECIONA PELO USUÁRIO NO SELECT
    const [usuarioSelecionado, setUsuarioSelecionado] = useState();

    const [use_id , setUse_id] = useState();


    //CONEXÃO MQTT
    const { client, isConnected } = useMQTT();
    

    
    // REQUEST API OS ESP E USUÁRIOS
    useEffect( ()=>{
        
        const fetchData = async () =>{
            try {
                const resposta = await ConnApi.get(`/usuariosEsp`)
                //console.log(resposta);
                setUsuarios(resposta.data.data.usuarios);
                setEsps(resposta.data.data.esps)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[])
    
    // SE ESP EXISTIR(primeira conexão) FORÇA O VALOR DO ESPSELECIONADO SER frist_request
    useEffect(()=>{ setEspSelecionado("frist_request") },[esp])

    // CADASTRA O USUÁRIOS ESP
    const CadastroUsuariosEsp = async ()=>{

        //VERIFICA SE O USUÁRIO E ESP FOI SELECIONADO
        if (!usuarioSelecionado) {
            ErrorDados({campo:"selecione um usuário"})
            return;
        }
        if (!espSelecionado) {
            ErrorDados({campo:"selecione um esp"})
            return;
        }
        


        const fetchData = async () =>{

                try {
                    //INICIA A VARIÁVEL QUE RECEBE O VALOR DO ID DO ESP
                    let id;

                    // SE FOR A PRIMEIRA CONEXÃO DO ESP CAI AQUI DENTRO PRA CADASTRAR O ESP
                    if (espSelecionado ==="frist_request") {
                        try {

                            const respostaEsp = await ConnApi.post("/esp",{ esp_mac:esp });
                            
                            // PEGA O ID DO ESP CADASTRADO OU 
                            id = respostaEsp.data.data.insertId ?? respostaEsp.data.data.esp_id
                            // console.log(respostaEsp);
                            // console.log(id);
                            
                        } catch (error) {
                            return console.log(error)
                        }
                        
                    }
                    // DADOS PARA CADASTRAR O USUARIOSESP
                    const dados = {
                        //SE O ID RECEBER UM VALOR ELE E SELECIONADO SENÃO VAI O ESPSELECIONADO COM O ID DO USUÁRIO DENTRO
                        esp_id: id? id:espSelecionado,
                        usu_id: usuarioSelecionado
                    }
                    // CADASTRA O USUARIOSESP
                    const resposta = await ConnApi.post(`/usuariosEsp`, dados)
                    //console.log(resposta);
                    
                    if (resposta.data.message == "suscesso") {
                        
                        //PUBLICA A MENSAGEM ENVIANDO O NOVO ID USUÁRIO <---> ESP PARA O ESP
                        const publicarMensagem = () => {
                            if (client && client.connected) {


                                //console.log(`${esp?esp: esps[espSelecionado-1].esp_mac}/response_user`,  String(resposta.data.data.insertId));
                                //PUBLICA NO TOPICO esp_mac/response_user O VALOR DO NOVO ID
                                client.publish(`${esp?esp: esps[espSelecionado-1].esp_mac}/response_user`,  String(resposta.data.data.insertId));
                                return true; // deu bom
                            } else {
                                console.warn('⚠️ Broker não conectado');
                                return false; // deu ruim
                            }
                        }
                        
                        // Chamando e verificando o resultado
                        if (publicarMensagem()) {
                            CadastroSuccess(); // SE DEU BOM
                            // ESQUECE O ESP CADASTRADO
                            setEspMac(prevItens => prevItens.filter(item => item !== esp))
                            setEsp("");
                        }else{
                            console.log("deu erro menor");
                            
                        }
                        

                        
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
    }


    return(
        // campo de vincular o usuario ao esp
        <div className="usuariosesp df jcsa ac fdc w600 h400 wmax090 br20">
            <div className="fs1_5 p002">
                CADASTRO USUÁRIO ESP
            </div>
            <div className="usuariosespcorpo w1 h050 df jcc ">
                <div className="usuariosespcorpointerno w080 h1 df fdc ac jcsa br20">
                    <div className="titleselect df fdr w1 df ac jcsa mt20">
                        <div  className=" w045_80 w045 tal">
                            USUARIO SELECIONADO
                        </div>
                        <select name="usuario" className="selectue w045_80 w045 h30 br5" id="usuario" 
                            onChange={(e)=>{setUsuarioSelecionado(e.target.value)}}
                        >
                            <option value="" selected hidden></option>
                            {
                                usuarios
                                ?
                                usuarios.map(
                                    usuario =>
                                        <option value={usuario.usu_id} key={usuario.usu_id}>{usuario.usu_nome}</option>
                                )
                                :
                                ""
                            }
                        </select>
                    </div>
                    <div className="titleselect df fdr w1 df ac jcsa mt20">
                        <div className="w045_80 w045 tal">
                            ESP SELECIONADO
                        </div>
                        <select 
                            name="esp" 
                            className="selectue w045_80 w045 h30 br5" 
                            id="esp" 
                            value={espSelecionado}
                            onChange={
                                (e)=>{
                                    setEspSelecionado(e.target.value)
                                }
                            }
                        >
                            <option value="" selected hidden></option>
                            {
                                
                                 esp
                                 ? 
                                    <option value="frist_request" selected>{esp}</option>    
                                 : 
                                    esps?.map(item => (
                                     <option key={item.esp_id} value={item.esp_id}>
                                       {item.esp_mac}
                                     </option>
                                   ))
                            }
                        </select>
                    </div>
                </div>
            </div>
            <input 
                type="button" 
                value="ANEXAR ESP" 
                onClick={
                    ()=>{
                        CadastroUsuariosEsp()
                    }
                } 
                className="cadastrar-button h50"
            />
        </div>
    )
}
export default UsuarioEsp;