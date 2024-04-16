

function plugDataInput1(){
    const mysql = require('mysql2/promise');
    
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

    const insertPlug = async (connection, year, month, day, hour, minute, value003) => {
        try {
            const tableName = `data_${year}_${month}_${day}`;
            const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;

            const insertPlugQuery = `
                UPDATE ${tableName} SET VALUE03 = ?
                WHERE datetime = '${datetime}';
            `;
            // WHERE datetime = ${datetime};

            await connection.execute(insertPlugQuery, [value003]);
            console.log(`plugData ${datetime} inserted into ${tableName}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    (async () => {
        try {
            plugData1(async(plugData1,year,month,day,hour,minute)=>{
                const connection = await connectDatabase();
                await insertPlug(connection, year, month, day, hour, minute, plugData1);
                await connection.end();
            })

        } catch (error) {
            console.error('Error:', error);
        }
    })();
}
module.exports=plugDataInput1;