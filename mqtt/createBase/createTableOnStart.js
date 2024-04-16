


const mysql = require('mysql2/promise');

const connectDatabase = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'myworks'
    });
  
    return connection;
};

const createDailyTable = async (connection, year, month, day) => {
    const tableName = `data_${year}_${month}_${day}`;
  
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INT PRIMARY KEY,
            datetime DATETIME NOT NULL UNIQUE,
            value01 FLOAT,
            value02 FLOAT,
            value03 FLOAT,
            value04 FLOAT
        )
    `;
    // value FLOAT NOT NULL

    // ** 컬럼 추가시 createDailyTable 같이 변경 필요
    // const alterTableQuery = `
    //       ALTER TABLE ${tableName}
    //       ADD COLUMN value01 FLOAT AFTER datetime,
    //       ADD COLUMN value02 FLOAT AFTER value01
    //     `;
  
    try {
        await connection.execute(createTableQuery);
        // await connection.execute(alterTableQuery);
        console.log(`Table ${tableName} created successfully - start`);
    } catch (error) {
        console.error(`Error creating table ${tableName}:`, error);
    }
};

const createTableOnStart = async () => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const connection = await connectDatabase();
        
        await createDailyTable(connection, year, month, day);
        
        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { createTableOnStart };