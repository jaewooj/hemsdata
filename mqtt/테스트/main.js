const express = require('express');
const app = express();
const port = 5003;

app.get('/',(req,res)=>{
    res.send('테스트 화면 결과')
})
app.listen(port,()=>{
    console.log('서버 접속 성공')
})