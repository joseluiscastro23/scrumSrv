# scrumSrv
Azure Node.js Express 4 App
Backend bootcamp SCRUM

---
### Special Instructions:
Requires dbSettings.js file with settings to connecto to database:

```javascript
module.exports = {
    development: {
        client: 'mssql',
        connection: {
            host: 'localhost\\MSSQLSERVER',
            user: 'sa',
            password: 'yourPass',
            database: 'scrumdb',
            port: 1433
        }
    },
    test: {
        client: 'mssql',
        connection: {
            host: 'localhost\\MSSQLSERVER',
            user: 'sa',
            password: 'yourPass',
            database: 'scrumdbtest',
            port: 1433
        }
    }
}
```