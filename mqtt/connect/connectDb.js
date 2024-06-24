
const mysql = require('mysql2/promise');

let pool;

const createPool = () => {
    return mysql.createPool({
        host:'localhost',
        user:'root',
        password:'12345',
        database:'hemsdata',
        connectionLimit:20,
        waitForConnections:true,
        queueLimit:0,
        maxIdle:0,
        keepAliveInitialDelay:1000,
        enableKeepAlive:true,
    });
};

const connectDb = async()=> {
    try {
        if(!pool||pool._closed){
            pool = createPool();
        }
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('데이터베이스 연결 실패 : ',error);
        if(pool){
            try {
                await pool.end();
            } catch (err) {
                console.error('기존 풀 닫기 실패 :',err);
            }
        }
        // 새로운 풀 생성 및 연결 시도
        pool = createPool();
        const connection = await pool.getConnection();
        return connection;
    }
};
module.exports = {connectDb};