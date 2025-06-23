// Imports
// Conexao com Banco de dados
const db = require("../db/conection.js");
// SQL
const { SqlLastDataUser, SqlSelectAllDataUser } = require("./sql.js");

// Seleciona todos os Dados relacionado ao ultimo relacionamento do usuario com um esp
const AllDataUser = async ( request, response)=>{
    try {

        // Recebe os dados do body
        const { use_id} = request.params;
        
        // Verifica os dados 
        if(!use_id){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Seleciona os dados do usuario
        const values = [ use_id, use_id, use_id];
        const res = await db.query( SqlSelectAllDataUser, values);

        

        // Retorna os dados
        return response.status(200).json({
            message:"sucesso",
            data: res[0]
        })

    // Em caso de erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
};

//Retorna os ultimos registro de todos de cada usuario
const LastDataUsers = async ( request, response)=>{
    try {

        // selecionas os dados do usuarios
        const res = await db.query(SqlLastDataUser);
        const respostaTratada = res[0]        

        // Retorna sucesso
        return response.status(200).json({
            message: "sucesso",
            data: respostaTratada
        })

    // Em caso de erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
};

// Exporta as Funcões
module.exports = { AllDataUser, LastDataUsers };