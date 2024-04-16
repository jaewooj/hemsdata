
// mqtt 구독 및 데이터 가져오기
const mqtt = require('mqtt');

const options = {
  host: '127.0.0.1', // MQTT 브로커의 주소
  port: 1883, // MQTT 브로커의 포트
};

const client = mqtt.connect(options);

/* client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({"state": "ON"}), () => {
  console.log('Sent command to turn off the smart plug');
}); */
// 위토픽을 대상으로 변경을 발행해라는 명령어 

client.on('connect', () => {
  client.subscribe('zigbee2mqtt/0xb0c7defffe8ea80f'); // 스마트 플러그의 토픽
  // console.log('Connected to MQTT broker');
});
// connect는 연결하라는뜻
// subcribe은 zigbee2mqtt의 0x~요 토픽을 구독해라는 명령어
// 구독을 안하면 명령을 못시킴

// client.publish('zigbee2mqtt/0xb0c7defffe8ea80f/set', JSON.stringify({"state": "ON"}), () => {
    // OPEN 올리기, STOP 중지, CLOSE 내리기
client.publish('zigbee2mqtt/0xb0c7defffe8ea80f/set', JSON.stringify({"state": "OPEN"}), () => {
    console.log('Sent command to turn on the smart plug');
  });

client.on('message', (topic, message) => {
  // 여기에서 스마트 플러그의 데이터를 처리하세요.
  const data = JSON.parse(message);
  const now = new Date();
  const year = now.getFullYear();  // 현재 연도
  const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줌)
  const day = now.getDate(); // 현재 일
  const hour = now.getHours(); // 현재 시간
  const minute = now.getMinutes(); // 현재 분
//   const plugData = data.power;
  // const currentTime = new Date().toLocaleString(); // 현재 시간을 가져옵니다.
  console.log(`Received message from topic ${topic}:`, data);
//   console.log(`Received message from topic ${topic}:`, data);
//   callback(plugData,year,month,day,hour,minute);
});
// 메시지를 가져오라는 명령어

client.on('error', (error) => {
  console.error('MQTT error:', error);
});

