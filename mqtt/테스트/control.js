
// Plug on/off 제어 

function plugControl (){
  const express = require('express');
  const  cors = require('cors');
  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use(cors());

  app.post('/control', (req, res) => {
      let requestData = req.body;
      console.log('클라이언트에서 받은 데이터:', requestData);

      // 서버에서 수행할 작업을 여기에 작성

      if(requestData='plugOn'){
        const mqtt = require('mqtt');

        const options = {
          host: '127.0.0.1', // MQTT 브로커의 주소
          port: 1883, // MQTT 브로커의 포트
        };
    
        const client = mqtt.connect(options);
    
        client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({"state": "ON"}), () => {
          console.log('Sent command to turn off the smart plug');
        });
      } 
      // res.json({ message: '작업이 완료되었습니다.' });
  });
  app.post('/control1', (req, res) => {
      let requestData = req.body;
      console.log('클라이언트에서 받은 데이터:', requestData);

      // 서버에서 수행할 작업을 여기에 작성

      if(requestData='plugOff'){
        const mqtt = require('mqtt');

        const options = {
          host: '127.0.0.1', // MQTT 브로커의 주소
          port: 1883, // MQTT 브로커의 포트
        };
    
        const client = mqtt.connect(options);
    
        client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({"state": "OFF"}), () => {
          console.log('Sent command to turn off the smart plug');
        });
      } 
      // res.json({ message: '작업이 완료되었습니다.' });
  });


  app.get('/test',(request,response)=>{
    response.send('<h2>test 화면</h2>')
  })


  app.listen(port, () => {
      console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  });

}

module.exports=plugControl;


