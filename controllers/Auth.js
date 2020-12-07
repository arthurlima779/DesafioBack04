const response = require ('./response');
const Usuario = require('../repositories/usuarios');
const Password = require('../utils/password');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const autenticar = async (ctx) =>{
    const { email = null, password = null} = ctx.request.body;
    if(!email || !password){
        return response(ctx, 400, {
            mensagem: 'Pedido mal formatado'
        });
    }
    const usuario = await Usuario.obterUsuarioPorEmail(email);
    
    if(usuario){
        const comparison = await Password.check(password, usuario.senha);
        if(comparison){
            const token = await jwt.sign({
                id: usuario.id,
                email: usuario.email
            }, process.env.JWT_SECRET|| 'desafio04', {expiresIn: '1h'});
            return response(ctx, 200, {
                    mensagem: "Usuário logado com sucesso!",
                    token
            });
        }
    }
    return response (ctx, 200,{
        mensagem: 'Email ou Senha incorretos.',
    })
    
};

module.exports = {autenticar};