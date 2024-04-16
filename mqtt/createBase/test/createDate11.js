
function createDate () {
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
            console.log(`Data inserted into ${tableName}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    (async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const hour = now.getHours();
            const minute = now.getMinutes();

            const connection = await connectDatabase();
            await insertDate(connection, year, month, day, hour, minute);
            await connection.end();
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

module.exports = createDate;