try {
    const { express, server } = require('ful-ms-svr');
    const port = 3005;

    console.log('Hello to the scrumSrv.');
    console.log(`pid: ${process.pid}`);
    server.port = port;
    server.run(port);

    server.use(express.static('public'));
    const router = express.Router();
    server.use('/api', router);

    const dbSettings = require('./dbSettings');
    console.log('Database settings: ');
    console.log(dbSettings.dbScrumSettings);

    require('./controllers')(router);
    //require('./controllers/priorities')(router);
} catch (ex) {
    console.log(ex);
}
