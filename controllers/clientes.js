const response = require('./response');
const Clientes = require('../repositories/clientes');
const Usuarios = require('./usuarios');

const CriarClientes = async (ctx) =>{
    const usuarioId = ctx.state.id;
    const {nome = null, cpf = null, email = null, tel = null} = ctx.request.body;
    if(!nome || !email){
        return response (ctx, 400,{
            mensagem: 'Pedido mal-formatado'
        });
    }
    const existe = await Clientes.obterClientesPorCPF(cpf);

    if(existe){
        return response(ctx, 400,{
            mensagem: 'CPF já cadastrado'
        });
    }
    
    

    const clientes = {
        nome,
        cpf,
        email,
        tel,
        idUser: Usuarios.id,
    };

    const result = await Clientes.CriarClientes(clientes);
    return response(ctx, 201, result);
};

const ObterCliente = async (ctx) => {
    const {id = null} = ctx.request.body;
	if (id) {
		const result = await Clientes.ObterCliente(id);
		if (result) {
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Cliente não encontrado' });
	}

	return response(ctx, 400, { message: 'Mal formatado' });
};


const EditarClientes = async (ctx) => {

    const {id , nome , cpf , email } = ctx.request.body;

    
	if (!id || !nome || !cpf || !email) {
		return response(ctx, 400, 'Pedido mal-formatado');
	}
    
	if (id) {
        const ClienteAtual = await Clientes.ObterCliente(id);
        
		if (ClienteAtual) {
            const ClienteAtualizado = {
				...ClienteAtual,
				nome: nome ? nome : ClienteAtual.nome,
				cpf: cpf ? cpf : ClienteAtual.cpf,
				email: email ? email : ClienteAtual.email,
            };
            
			//const result = await Clientes.EditarClientes(ClienteAtualizado); Problema de erro na sintaxe, entendi nada//
			return response(ctx, 200, ClienteAtualizado);
		}
		return response(ctx, 404, { message: 'Cliente não encontrado' });
	}

}

const ListarClientes = async (ctx) => {
	const result = await Clientes.ListarClientes();
	return response(ctx, 200, result);
};



module.exports = {
    CriarClientes,
    ObterCliente,
    EditarClientes,
    ListarClientes
};