const response = require ('./response');
const Usuario = require('../repositories/usuarios');
const Password = require('../utils/password');

const CriarUsuarios = async (ctx) =>{
    const {nome = null, email = null} = ctx.request.body;
    const {hash} = ctx.state;
    if(!nome || !email){
        return response (ctx, 400,{
            mensagem: 'Pedido mal-formatado'
        });
    }
    const existe = await Usuario.obterUsuarioPorEmail(email);

    if(existe){
        return response(ctx, 400,{
            mensagem: 'Email já cadastrado'
        });
    }
    
    
    const usuario = {
        nome,
        email,
        senha: hash,
    };

    const result = await Usuario.CriarUsuarios(usuario);
    return response(ctx, 201, result);
};

module.exports = {CriarUsuarios};