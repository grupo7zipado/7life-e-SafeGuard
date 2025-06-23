// Imports
// Conexao com banco
const db = require("../db/conection");
// SQL
const { SqlCadastroUsuario, SqlDadosUsuarios } = require("./sql");

// Cadastro de Usuarios
const cadastroUsuarios = async (request, response)=>{
    try {

        // Recebe os dados do body
        const { usu_nome, usu_nascimento } = request.body;

        // Verifica se os dados do usuarios existem 
        if(!(usu_nome && usu_nascimento)){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Cadastra o usuario
        const values = [ usu_nome, usu_nascimento]
        const res = await db.query( SqlCadastroUsuario , values);

        // Retorna sucesso
        return response.status(200).json({
            message:"suscesso",
            data: res
        })

    // Em caso de Erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
};


const dadosUsuarios = async (request, response)=>{
    try {

        // Recebe os dados do body
        const { usu_id } = request.params;

        // Verifica se os dados do usuarios existem 
        if(!usu_id){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Cadastra o usuario
        const values = [ usu_id ]
        const res = await db.query( SqlDadosUsuarios , values);

        // Retorna sucesso
        return response.status(200).json({
            message:"suscesso",
            data: res[0]
        })

    // Em caso de Erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}
// Exporta as Funcões
module.exports =  {cadastroUsuarios, dadosUsuarios };