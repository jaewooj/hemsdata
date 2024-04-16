
function inputDataTime () {
    const mysql = require('mysql2/promise');
    
    const connectDatabase = async () => {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'myworks'
        });
        return connection;
    };

    const insertDate = async (connection, year, month, day, hour, minute) => {
        try {
            const tableName = `data_${year}_${month}_${day}`;
            const now = new Date();
            const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;

            // Fetching max ID
            const getMaxIdQuery = `SELECT MAX(id) AS max_id FROM ${tableName}`;
            const [rows] = await connection.execute(getMaxIdQuery);
            const maxId = rows[0].max_id || 0;

            const insertDateQuery = `
                INSERT INTO ${tableName} (id, datetime) 
                VALUES (?, ?);
            `;

            await connection.execute(insertDateQuery, [maxId + 1, datetime]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    (async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();  // 현재 연도
            const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줌)
            const day = now.getDate(); // 현재 일
            const hour = now.getHours(); // 현재 시간
            const minute = now.getMinutes(); // 현재 분
            const connection = await connectDatabase();
            await insertDate(connection, year, month, day, hour, minute);
            await connection.end();
                

        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

module.exports = inputDataTime;