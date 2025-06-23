import { useEffect } from "react";
import "./logs.css"

const Logs = ({values}) =>{
    // useEffect(()=>{console.log(values);
    // },[])
    return(
        /* define os logs do usuário com suas informações (temperatura, nivel de oxigenação do sangue, batimentos cardiacos e a hora em que os dados foram inseridos*/
        /* define os logs do usuario de sinais vitais como temperatura, oxigenação, bpm e hora em que os dados foram gerados*/
<ul className="logset">
  
    <li className="com-log w020">
        <p className="titulo-log">
            {values.dados_tipo}
        </p>
        <label className="info-log">
            {values.dados_valor}
        </label>
    </li>
    <li className="com-log w035">
        <p className="titulo-log">
            Hora
        </p>
        <label className="info-log">
            {values.dados_generate}
        </label>
    </li>
   
    
</ul>
    )
}

export default Logs;