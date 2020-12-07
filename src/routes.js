const Router = require ('koa-router');
const router = new Router();

/*const Cobrancas = require('./controllers/cobrancas');*/
const Clientes = require('../controllers/clientes');
const Usuarios = require('../controllers/usuarios');
const Auth = require('../controllers/Auth');
const Password = require('../middlewares/encrypt');
const Session = require('../middlewares/session');



router.post('/auth', Auth.autenticar); 
router.post('/usuarios', Password.encrypt, Usuarios.CriarUsuarios);


router.post('/clientes', Session.verify, Clientes.CriarClientes);  
router.put('/clientes', Session.verify, Clientes.EditarClientes);
router.get('/clientes?clientesPorPagina=10&offset=20', Clientes.ListarClientes);


/*
router.get('/clientes?busca=texto da busca&clientesPorPagina=10&offset=20', Clientes.BuscarClientes) Buscar Clientes 

router.post('/cobrancas', Cobrancas.CriarCobrancas) Criar Cobranças
router.get('/cobrancas?cobrancasPorPagina=10&offset=20', Cobrancas.ListarCobrancas) Listar Cobranças
router.put('/cobrancas', Cobrancas.PagarCobrancas) Pagar Cobrança 
router.get('/relatorios', Cobrancas.ObterRelatorios) Obter Relatórios */


module.exports = router;