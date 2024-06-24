
const mysql = require('mysql2/promise');
const { connectDb } = require('../connect/connectDb');
const dataDefTable =async()=>{
    const tableName = `DATA_DEF_TB`;
    let connection;
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            dtl_cd VARCHAR(4) NOT NULL PRIMARY KEY,
            grp_cd VARCHAR(12) NOT NULL,
            dtl_cd_nm VARCHAR(20) NOT NULL,
            dtl_cd_desc VARCHAR(20) NOT NULL,
            unit_cd VARCHAR(4) NOT NULL,
            ord INT NOT NULL
        )
    `
    try {
        connection = await connectDb();
        await connection.execute(createTableQuery);
        console.log(`successfully`)
    } catch (error){
        console.error(`Error occur:`, error);
    } finally {
        if(connection){
            connection.release();
        }
    }
}
module.exports=dataDefTable;