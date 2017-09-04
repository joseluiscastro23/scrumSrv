try {
    const { express, server } = require('ful-ms-svr');
    let port = 3005;

    console.log('Hello to the scrumSrv.');
    console.log(`pid: ${process.pid}`);
    server.port = port;
    server.run(port);

    let router = express.Router();
    let dbSettings = require('./dbSettings');
    server.use(express.static('public'));
    server.use('/api', router);

    console.log('Database settings: ');
    console.log(dbSettings.dbScrumSettings);

    let db = require('knex')(dbSettings.dbScrumSettings);
    require('./controllers/priorities')(router, db);
    require('./controllers/projects')(router, db);
} catch (ex) {
    console.log(ex);
}

