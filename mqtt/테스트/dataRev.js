
// 누락데이터를 이전 데이터로 대체 

const dataRev = async () => {
    const mysql = require('mysql2/promise');

  // 데이터베이스 연결 코드
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'myworks'
  });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const tableName = `data_${year}_${month}_${day}`;
  const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;
  const getMaxIdQuery = `
    SELECT MAX(id) AS max_id FROM ${tableName}
  `;
  
  const [rows] = await connection.execute(getMaxIdQuery);
  const maxId = rows[0].max_id;
  
  try {

    if (maxId) {
        const getMaxPowerQuery = `SELECT value AS max_value FROM ${tableName} WHERE id = ${maxId};`;
      
        const [values] = await connection.execute(getMaxPowerQuery); // assuming maxId is a Date object      
        const maxValues = values[0].max_value;
    
        const insertOrUpdateQuery = `
          INSERT INTO ${tableName} (id,datetime, value) 
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE value = ?;
        `;
    
        await connection.execute(insertOrUpdateQuery, [maxId + 1, datetime, maxValues, maxValues]);
      }
      console.log(`${datetime} 이전 데이터 입력 성공`)
    
      await connection.end();

  } catch (error) {
    console.error(`Error`, error);
  }

};

module.exports = dataRev;