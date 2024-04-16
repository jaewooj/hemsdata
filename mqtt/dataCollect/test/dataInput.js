
function dataInput () {
    const mysql = require('mysql2/promise');
    
    const thData = require('../dataCollect/thData.js');
    const plugData1 = require('./plugData1.js');

    const connectDatabase = async () => {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'myworks'
        });
        return connection;
    };

    const insertDate = async (connection, year, month, day, hour, minute, value001, value002) => {
        try {
            const tableName = `data_${year}_${month}_${day}`;
            const now = new Date();
            const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;

            // Fetching max ID
            const getMaxIdQuery = `SELECT MAX(id) AS max_id FROM ${tableName}`;
            const [rows] = await connection.execute(getMaxIdQuery);
            const maxId = rows[0].max_id || 0;

            const insertDateQuery = `
                INSERT INTO ${tableName} (id, datetime, value01, value02) 
                VALUES (?, ?, ?, ?);
            `;

            await connection.execute(insertDateQuery, [maxId + 1, datetime, value001, value002]);
            console.log(`ThData inserted into ${tableName}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    (async () => {
        try {
            thData(async(temData,humData,year,month,day,hour,minute)=>{
                const connection = await connectDatabase();
                await insertDate(connection, year, month, day, hour, minute, temData, humData);
                await connection.end();
                
            })

        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

module.exports = dataInput;