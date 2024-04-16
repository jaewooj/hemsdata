
function thDataInput () {
    const mysql = require('mysql2/promise');
    
    const thData = require('./thData.js');

    const connectDatabase = async () => {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'myworks'
        });
        return connection;
    };

    const insertThData = async (connection, year, month, day, hour, minute, value001, value002) => {
        try {
            const tableName = `data_${year}_${month}_${day}`;
            const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;

            const insertThDataQuery = `
                UPDATE ${tableName} SET VALUE01 = ?, VALUE02 = ?
                WHERE datetime = '${datetime}';
            `;

            await connection.execute(insertThDataQuery, [value001, value002]);
            console.log(`ThData inserted into ${tableName}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    (async () => {
        try {
            thData(async(temData,humData,year,month,day,hour,minute)=>{
                const connection = await connectDatabase();
                await insertThData(connection, year, month, day, hour, minute, temData, humData);
                await connection.end();
                
            })

        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

module.exports = thDataInput;