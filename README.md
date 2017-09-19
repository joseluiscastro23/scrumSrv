﻿# scrumSrv
Azure Node.js Express 4 App
Backend bootcamp SCRUM

---
### Special Instructions:
Requires dbSettings.js file with settings to connecto to database:

```javascript
exports.dbScrumSettings = {
    client: 'mssql',
    connection: {
        host: 'localhost\\MSSQLSERVER',
        user: 'sa',
        password: 'yourPassword',
        database: 'scrumdb'
    }
};
```