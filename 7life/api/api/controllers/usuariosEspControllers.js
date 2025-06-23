// Imports
// Conexão com Banco de dados
const db = require("../db/conection.js");
// SQL
const {SqlCadastroUsuarioEsp, SqlTodosEsps, SqlTodosUsuarios, SqlStatusUpdateUsuariosEsp } = require("./sql.js");


// Relaciona o Usuario com o Esp
const CadatroUsuarioEsp = async ( request, response)=>{
    try {

        // Recebe os dados do body
        const { usu_id, esp_id} = request.body;

        // Verifica a existencia dos dados
        if(!(usu_id && esp_id)){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Da update de nos relacionamentos antigos do esp para desabilitalos
        const resposta = await db.query(SqlStatusUpdateUsuariosEsp, esp_id)
        // Cadastra o relacionamento do Usuario com Esp
        const values = [ usu_id, esp_id];
        const res = await db.query(SqlCadastroUsuarioEsp, values);

        // Retorna sucesso
        return response.status(200).json({
            message: "suscesso",
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
const ListarUsuariosEsps = async ( request, response)=>{
    try {

        // Cadastra o relacionamento do Usuario com Esp
        const resUser = await db.query(SqlTodosUsuarios);
        const resEsp = await db.query(SqlTodosEsps);
        // Retorna sucesso
        return response.status(200).json({
            message: "suscesso",
            data: {
                usuarios: resUser[0],
                esps: resEsp[0]
            }
        })

    // Em caso de erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}

// Exporta as Funcões
module.exports = { CadatroUsuarioEsp, ListarUsuariosEsps};