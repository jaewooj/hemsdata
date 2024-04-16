
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
    SELECT MAX(id)-1 AS max_id FROM ${tableName}
  `;
  
  const [rows] = await connection.execute(getMaxIdQuery);
  const maxId = rows[0].max_id;
  
  try {

    if (maxId>0) {
        const getMaxPowerQuery = `SELECT value03 AS max_value FROM ${tableName} WHERE id = ${maxId};`;
      
        const [values] = await connection.execute(getMaxPowerQuery); // assuming maxId is a Date object      
        // let maxValues = values[0].max_value;
        let maxValues;
        if (values[0].max_value !== null) {
            maxValues = values[0].max_value;
        } else {
            maxValues = 0;
        }

        const updateQuery = `
            UPDATE ${tableName} SET VALUE03 = ? 
            WHERE datetime = '${datetime}';
        `;
    
        await connection.execute(updateQuery, [maxValues]);
      } else {
        const idNoUpdateQuery =`
        UPDATE ${tableName} SET VALUE03 = ? 
        WHERE datetime = '${datetime}';
        `
        let maxValues = 0;
        await connection.execute(idNoUpdateQuery, [maxValues]);
      }
      console.log(`${datetime} plugData 이전 데이터 입력 성공`)
    
      await connection.end();

  } catch (error) {
    console.error(`Error`, error);
  }

};

module.exports = dataRev;