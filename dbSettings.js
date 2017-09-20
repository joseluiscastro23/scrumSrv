//exports.dbScrumSettings = {
//    client: 'mssql',
//    connection: {
//        host: 'localhost\\MSSQLSERVER',
//        user: 'sa',
//        password: '12345678',
//        database: 'scrumdb',
//        port: 1433
//    }
//};

module.exports = {
    development: {
        client: 'mssql',
        connection: {
            host: 'localhost\\MSSQLSERVER',
            user: 'sa',
            password: '12345678',
            database: 'scrumdb',
            port: 1433
        }
    },
    test: {
        client: 'mssql',
        connection: {
            host: 'localhost\\MSSQLSERVER',
            user: 'sa',
            password: '12345678',
            database: 'scrumdbtest',
            port: 1433
        }
    }
}