const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port1 = 5003;

const options = {
  host: '127.0.0.1', // MQTT 브로커의 주소
  port: 1883, // MQTT 브로커의 포트
};

const client = mqtt.connect(options);

// 제어 코드
client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({"state": "ON"}), () => {
  // console.log('Sent command to turn on/off the smart plug');
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (error) => {
  console.error('MQTT error:', error);
});

// 요청 보내기
setInterval(() => {
  client.publish('zigbee2mqtt/0xa4c13824c66735cc', 'Requesting data...');
  console.log('5초단위 요청 성공');
}, 5000);

// 응답 받기
client.subscribe('zigbee2mqtt/0xa4c13824c66735cc');

// JSON 확인
function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

client.on('message', (topic, message) => {
  if (topic === 'zigbee2mqtt/0xa4c13824c66735cc') {
    if(isJSON(message)){
      const data = JSON.parse(message);
      console.log(`Received response:`, data);
    } else {
      const messageString = message.toString();
      console.log(`Received response:`, messageString);
    }
    // try {
    //   const data = JSON.parse(message);
    //   console.log(`Received response:`, data);
    // } catch (error) {
    //   console.error('Error parsing JSON:', error);
    // }
  } else {
    console.log('Received message from unexpected topic:', topic);
  }
});

app.listen(port1, () => {
  console.log(`Server is running on http://127.0.0.1:${port1}`);
});