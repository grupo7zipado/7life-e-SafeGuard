// Imports
// Conexão com Banco de dados
const db = require("../db/conection");
// SQL
const { SqlCadastroEsp, SqlEspJaCadastrado } = require("./sql");


// Cadastro Esp
const CadastroEsp = async( request, response)=>{
    try {
        
        // Recebe os dados do body
        const { esp_mac} = request.body
        
        // Verifica os dados do esp existem
        if(!esp_mac){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        const jaCadastrado = await db.query(SqlEspJaCadastrado, esp_mac);
        
        if (jaCadastrado[0].length > 0) {
            //retorna sucesso
            return response.status(200).json({
                message:"suscesso",
                log:"esp já cadastrado" ,
                data: jaCadastrado[0][0]
            })

        }
        // Cadastra o esp
        const res = await db.query( SqlCadastroEsp, esp_mac)

        //retorna sucesso
        return response.status(200).json({
            message:"suscesso",
            data: res[0]
        })

    // Em caso de erro
    } catch (error) {
        console.log(error);
        
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
};

// Exporta as Funcões
module.exports = {CadastroEsp};