const { express, server } = require('ful-ms-svr');
let port = 3000;
console.log(`Hello world from scrumSrv. ${process.pid}`);
server.port = port;
server.run(port);

let router = express.Router();
server.use(express.static('public'));
server.use('/api', router);

router.get('/test', (req, res) => {
    res.send('Hello world');
});