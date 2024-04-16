

function zigbeeInput(){
    const mysql = require('mysql2/promise');
    
    const plugData = require('./plugData.js');

    const connectDatabase = async () => {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'myworks'
        });
        return connection;
    };

    const insertZigbee = async (connection, year, month, day, hour, minute, value003) => {
        try {
            const tableName = `data_${year}_${month}_${day}`;
            const now = new Date();
            const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;

            const insertZigbeeQuery = `
                UPDATE ${tableName} SET VALUE03 = ? 
                WHERE datetime = '${datetime}';
            `;
            // WHERE datetime = ${datetime};

            await connection.execute(insertZigbeeQuery, [value003]);
            console.log(`plugData ${datetime} inserted into ${tableName}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    (async () => {
        try {
            plugData(async(plugData,year,month,day,hour,minute)=>{
                const connection = await connectDatabase();
                await insertZigbee(connection, year, month, day, hour, minute, plugData);
                await connection.end();
            })

        } catch (error) {
            console.error('Error:', error);
        }
    })();
}
module.exports=zigbeeInput;