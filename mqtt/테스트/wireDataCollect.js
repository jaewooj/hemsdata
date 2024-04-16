
// 데이터 수집 시작 및 기기 제어 시작
const mysql = require('mysql2/promise');
const temperData = require('./temperData.js');
let isFirstData = true;
// 

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
        value002 FLOAT NOT NULL
    )
    `;

    try {
    await connection.execute(createTableQuery);
    console.log(`Table ${tableName} created successfully`);
    } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    }
};

const insertData = async (connection, year, month, day, hour, minute, value) => {
    const tableName = `data_${year}_${month}_${day}`;
    const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;
    const getMaxIdQuery = `
    SELECT MAX(id) AS max_id FROM ${tableName}
    `;
    const [rows] = await connection.execute(getMaxIdQuery);
    const maxId = rows[0].max_id || 0; // 테이블이 비어있을 경우를 대비하여 0으로 초기화

    const insertOrUpdateQuery = `
    INSERT INTO ${tableName} (id,datetime, value) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE value = ?;
    `;

    try {
    await connection.execute(insertOrUpdateQuery, [maxId+1, datetime, value, value]);
    console.log(`Data inserted/updated into ${tableName}`);
    } catch (error) {
    console.error(`Error inserting/updating data into ${tableName}:`, error);
    }
};

(async () => {
    try {
        plugData(async (data,year,month,day,hour,minute)=>{
            const connection = await connectDatabase();
            
            // const year = 2023;
            // const month = 8;
            // const day = 10;
            // const hour = 13;
            // const minute = 30;
            // const value = 25.5;
            console.log(`파워 : ${data.power}`)
            if(isFirstData){
                await createDailyTable(connection, year, month, day);
                isFirstData=false;
            }
            await insertData(connection, year, month, day, hour, minute, data.power);
            console.log(`${hour}:${minute} 실시간 데이터 수집 성공`)
        
            await connection.end();

        });
    } catch (error) {
        console.error('Error:', error);
    }
})();
    
  
