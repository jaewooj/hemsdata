

// 테스트용 파일
const mqtt = require('mqtt');

const options = {
    host: '127.0.0.1', // MQTT 브로커의 주소
    port: 1883, // MQTT 브로커의 포트
};

const client = mqtt.connect(options);

client.on('connect', () => {
    // console.log('Connected to MQTT broker');
    // 주기적으로 데이터 요청을 보내기 위한 타이머 설정 (예: 10초마다 요청)
    const topic = 'zigbee2mqtt/0xa4c138b0806545cc/get'; // 스마트 플러그의 토픽

    // 스마트 플러그에 데이터 요청을 보내는 메시지를 JSON 형식으로 작성하여 발행
    const message = JSON.stringify({
        state:'',
    });

    client.publish(topic, message, () => {
        console.log('Sent data request to Zigbee2mqtt');
    });
    
});

client.on('connect', () => {
    client.subscribe('zigbee2mqtt/0xa4c138b0806545cc'); // 스마트 플러그의 토픽
    // console.log('Connected to MQTT broker');
});
client.on('message', (topic, message) => {
    // MQTT 메시지 수신 시 처리할 로직
    const data = JSON.parse(message);
    console.log(data);
    // const plugData1 = data.power;
    // console.log(plugData1);
    client.end();
});

client.on('error', (error) => {
    reject(error);
});