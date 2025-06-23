import { useState } from "react"
import Header from "../header"
import Middle from "../middle/middle"
import { MQTTProvider } from "../../service/mqtt";
const Main = ()=>{
    const [tela, setTela] = useState("card");



    return(
        <>  
            <Header setTela = {setTela}/>
            <MQTTProvider>
                <Middle tela = {tela} setTela = {setTela}/>
            </MQTTProvider>
        </>
    )
}

export default Main