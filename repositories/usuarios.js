const database = require ('../utils/database');

const CriarUsuarios = async (usuario) =>{
    const {nome, email, senha} = usuario;
    const query = {
        text: `INSERT INTO usuario (
            nome,
            email,
            senha) VALUES ($1, $2, $3) RETURNING id;
        `,
        values: [nome, email, senha]
    };
    const result = await database.query(query);
    return result.rows.shift();
};

const obterUsuarioPorEmail = async (email = null) =>{
    if(!email){
        return null;
    }
    const query = `SELECT * FROM usuario WHERE email = $1`;
    const result = await database.query({
        text: query,
        values: [email]
    });
    return result.rows.shift();
}




module.exports={
    CriarUsuarios,
    obterUsuarioPorEmail
}

