function createPool() {
    try {
        const mysql = require('mysql2');
        
        const pool = mysql.createPool({
            host: 'remotemysql.com',
            user: '7W8jy6kswF',
            password: 't8F01TnfaE',
            database: '7W8jy6kswF',
            connectionLimit: 10,
            waitForConnections: true,
            queueLimit: 0
        });
        
        const promisePool = pool.promise();
        
        return promisePool;
    } catch (error) {
        return console.log(`Could not connect - ${error}`);
    }
}

const pool = createPool();

module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params) => pool.execute(...params)
};