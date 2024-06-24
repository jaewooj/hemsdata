
const mysql = require('mysql2/promise');
const nowTime = require('../conference/nowTime');
const { connectDb } = require('../connect/connectDb');

const inputDataTime = async () => {

    const {now,year,month,day,hour,minute,seconds} = nowTime();
    const tableName = `DATA_${year}_${month}_${day}`;
    const connection = await connectDb();
    const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;

    try {
        // Fetching max ID
        const getMaxIdQuery = `SELECT MAX(time_nm) AS max_id FROM ${tableName}`;
        const [rows] = await connection.execute(getMaxIdQuery);
        const maxId = rows[0].max_id || 0;

        const insertDateQuery = `
            INSERT INTO ${tableName} (time_nm, date_time) 
            VALUES (?, ?);
        `;

        await connection.execute(insertDateQuery, [maxId + 1, datetime]);
        console.log(`${datetime} 입력 성공(분)`)
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if(connection){
            connection.release();
        }
    }
}

module.exports = inputDataTime;