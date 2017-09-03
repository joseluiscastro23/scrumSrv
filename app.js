const { express, server } = require('ful-ms-svr');
let bodyParser = require('body-parser');
let port = 3000;

console.log('Hello to the scrumSrv.');
console.log(`pid: ${process.pid}`);
server.port = port;
server.use(require('body-parser').json());
server.run(port);

let router = express.Router();
let dbSettings = require('./dbSettings');
server.use(express.static('public'));
server.use('/api', router);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

console.log('Database settings: ');
console.log(dbSettings.dbScrumSettings);

let db = require('knex')(dbSettings.dbScrumSettings);
require('./controllers/priorities')(router, db);
require('./controllers/projects')(router, db);

