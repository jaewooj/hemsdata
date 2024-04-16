

// db 저장 테스트



const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345', // 본인의 MySQL 비밀번호로 변경
  database: 'myworks' // 사용할 데이터베이스명으로 변경
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

const newDatas = [
    { id: 6, text: '일하기', isChk : false },
    { id: 7, text: '쉬기', isChk : false },
    // ... 다른 데이터들
  ];
  
const query = 'INSERT INTO todos (id, text, isChk) VALUES ?'; // your_table_name과 컬럼명을 수정
connection.query(query, [newDatas.map(item => [item.id, item.text, item.isChk])], (error, results, fields) => {
if (error) throw error;
console.log('Data added to MySQL:', results);
});
