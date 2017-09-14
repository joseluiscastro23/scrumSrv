try {
    const { express, server } = require('ful-ms-svr');
    const port = 3005;

    console.log('Hello to the scrumSrv.');
    console.log(`pid: ${process.pid}`);
    server.port = port;
    server.run(port);

    server.use(express.static('public'));
    server.use(require('./controllers/controllers'));

    const dbSettings = require('./dbSettings');
    console.log('Database settings: ');
    console.log(dbSettings.dbScrumSettings);

} catch (ex) {
    console.log(ex);
}
