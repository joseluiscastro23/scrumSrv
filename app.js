const { express, server } = require('ful-ms-svr');
let port = 3000;
console.log(`Hello world from scrumSrv. ${process.pid}`);
server.port = port;
server.use(require('body-parser').json());
server.run(port);

let router = express.Router();
let dbSettings = require('./dbSettings');
server.use(express.static('public'));
server.use('/api', router);
require('./controllers/priority')(router);
let db = require('knex')(dbSettings.dbScrumSettings);
console.log(db);
