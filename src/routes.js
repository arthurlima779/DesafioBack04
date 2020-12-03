const Router = require ('koa-router');
const Cobrancas = require('./controllers/cobrancas');
const Clientes = require('./controllers/clientes');
const Usuarios = require('./controllers/usuarios');

const Router = new Router();

router.post('/auth', Usuarios.Login); /*Fazer Login*/
router.post('/usuarios', Usuarios.CriarUsuarios) /*Criar Usuario*/

router.post('/clientes', Clientes.CriarClientes) /* Criar Clientes*/
router.put('/clientes', Clientes.EditarClientes)/*Editar Cliente*/
router.get('/clientes?clientesPorPagina=10&offset=20', Clientes.ListarClientes)/*Listar Clientes */
router.get('/clientes?busca=texto da busca&clientesPorPagina=10&offset=20', Clientes.BuscarClientes)/*Buscar Clientes */

router.post('/cobrancas', Cobrancas.CriarCobrancas) /*Criar Cobranças*/
router.get('/cobrancas?cobrancasPorPagina=10&offset=20', Cobrancas.ListarCobrancas) /*Listar Cobranças*/
router.put('/cobrancas', Cobrancas.PagarCobrancas) /*Pagar Cobrança */
router.get('/relatorios', Cobrancas.ObterRelatorios) /*Obter Relatórios */


module.exports = router;