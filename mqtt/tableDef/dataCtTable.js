const mysql = require('mysql2/promise');
const { connectDb } = require('../connect/connectDb');
const nowTime = require('../conference/nowTime');
const dataCtTable = async () => {
    const {now,year,month,day,hour,minute,seconds} = nowTime();
    const tableName = `DATA_${year}_${month}_${day}`;
    const connection = await connectDb();
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            time_nm INT NOT NULL,
            date_time VARCHAR(20) NOT NULL,
            ${Array.from({ length: 37 }, (_, i) => `H${String(i + 1).padStart(3, '0')} 
            DECIMAL(5,2) DEFAULT 0`).join(',\n')}
        )
    `
    try {
        await connection.execute(createTableQuery);
        console.log(`collection table created successfully`);
    } catch(error) {
        console.error(`Error occur :`, error);
    } finally {
        if (connection){
            connection.release();
        }
    }
}
module.exports=dataCtTable;