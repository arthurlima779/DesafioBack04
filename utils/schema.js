const database = require('./database');

const schema = {
    1: `
    CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
    );
    `,
    2:`
    CREATE TABLE IF NOT EXISTS clients (
        id SERIAL,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        cpf TEXT NOT NULL,
        tel TEXT NOT NULL,
        idUser INTEGER 
    );
    `,
    3: `
    CREATE TABLE IF NOT EXISTS cobrancas (
        id SERIAL,
        valor INTEGER NOT NULL,
        vencimento DATE,
        clienteId INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        linkBoleto TEXT NOT NULL,
        codigoDeBarras TEXT NOT NULL,
        dataPagamento DATE
    );
    `
};

const drop = async (tableName) =>{
    if(tableName){
        await database.query(`DROP TABLE ${tableName}`);
        console.log('Tabela Apagada!!');
    }
};

const up = async (number=null) =>{
    if(!number){
        for(const value in schema){
            await database.query({ text: schema[value]});
        }
    }else{
        await database.query({ text: schema[number]});
        }
        console.log('Migração Rodada');
};

drop('clients');
up(2);