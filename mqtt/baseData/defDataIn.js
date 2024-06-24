
const mysql = require('mysql2/promise');
const { connectDb } = require('../connect/connectDb');
const defData = require('../data/defData');


const defDataIn = async () => {
    const tableName = `DATA_DEF_TB`;

    const dataToInsert = defData();
    let connection;

    const insertQuery = `
        INSERT IGNORE INTO ${tableName}
        (dtl_cd, grp_cd, dtl_cd_nm, dtl_cd_desc, unit_cd, ord)
        VALUES(?, ?, ?, ?, ?, ?)
    `;
    try {
        connection = await connectDb();

        for(const data of dataToInsert){
            await connection.execute(insertQuery,[
                data.dtl_cd,
                data.grp_cd,
                data.dtl_cd_nm,
                data.dtl_cd_desc,
                data.unit_cd,
                data.ord
            ]);
        }
        console.log('Data inserted successfully into ')

    } catch(error){
        console.error('Error occurred:', error);
    } finally {
        if(connection){
            connection.release();
        }
    }

}
module.exports=defDataIn;