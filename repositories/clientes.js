const database = require ('../utils/database');

const CriarClientes = async (clientes) =>{
    const {nome, cpf, email, tel, idUser} = clientes;
    const query = {
        text: `INSERT INTO clients (
            nome,
            cpf,
            email,
            tel,
            idUser) VALUES ($1, $2, $3, $4, $5) RETURNING id;
        `,
        values: [nome, cpf, email, tel, idUser]
    };
    const result = await database.query(query);
    return result.rows.shift();
};

const obterClientesPorCPF = async (cpf = null) =>{
    if(!cpf){
        return null;
    }
    const query = `SELECT * FROM clients WHERE cpf = $1`;
    const result = await database.query({
        text: query,
        values: [cpf]
    });
    return result.rows.shift();
}

const ObterCliente = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM clients WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};


const EditarClientes = async (clientes) => {
	const { nome, cpf, email} = clientes;
	const query = {
        text: `UPDATE autores SET (
		nome = $1,
		cpf = $2,
		email = $3 WHERE id = $4)
		RETURNING id`,
		values: [nome, cpf, email],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const ListarClientes = async (deletado = false) => {
	const query = `SELECT * FROM clients WHERE idUser = $1;`;
	const result = await database.query({
		text: query,
		values: [deletado],
	});

	return result.rows;
};

module.exports={
    CriarClientes,
    obterClientesPorCPF,
    ObterCliente,
    EditarClientes,
    ListarClientes,
    /*
    BuscarClientes*/
}