const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port1 = 5003;

const options = {
  host: '127.0.0.1', // MQTT 브로커의 주소
  port: 1883, // MQTT 브로커의 포트
};

const client = mqtt.connect(options);

client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({"state": "ON"}), () => {
  console.log('Sent command to turn on/off the smart plug');
});
/* client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({"state": "ON"}), () => {
  console.log('Sent command to turn off the smart plug');
}); */


  
  client.on('connect', () => {
    client.subscribe('zigbee2mqtt/0xa4c13824c66735cc'); // 스마트 플러그의 토픽
    console.log('Connected to MQTT broker');
  });
  
  client.on('message', (topic, message) => {
    // 여기에서 스마트 플러그의 데이터를 처리하세요.
    const data = JSON.parse(message);
    const currentTime = new Date().toLocaleString(); // 현재 시간을 가져옵니다.
    console.log(`Received message at ${currentTime} from topic ${topic}:`, data);  
    app.get('/',(req,res)=>{
      res.send(`${JSON.stringify(data)}`)
    })
  });
  
  client.on('error', (error) => {
    console.error('MQTT error:', error);
  });
  
  
  app.listen(port1,()=>{
    console.log('서버 접속 성공')
  })


// process.stdin.resume();