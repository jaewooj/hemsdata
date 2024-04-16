
// Plug on/off 제어 

function webTrans (){
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const port = 5010;
    
    const plugData1 = require('../dataCollect/plugData1');
  
    app.use(express.json());
    app.use(cors());
    

    app.get('/test',(req,res)=>{
        plugData1((plugData1)=>{
            let dataim = {
                plugData : plugData1
            }
            res.json(dataim);
        })
    })
  
  
    app.listen(port, () => {
        console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
    });
  
  }
  
  module.exports=webTrans;
  
  
  