
// dawon dns 스마트 플러그
const plugData10 = () => {
    return new Promise((resolve, reject)=>{
        const mqtt = require('mqtt');
        
        const options = {
            host: '127.0.0.1', // MQTT 브로커의 주소
            port: 1883, // MQTT 브로커의 포트
        };
        
        const client = mqtt.connect(options);

        client.on('connect', () => {
            // console.log('Connected to MQTT broker');
            // 주기적으로 데이터 요청을 보내기 위한 타이머 설정 (예: 10초마다 요청)
            const topic = 'zigbee2mqtt/0x003c84fffefd7f81/get'; // 스마트 플러그의 토픽

            // 스마트 플러그에 데이터 요청을 보내는 메시지를 JSON 형식으로 작성하여 발행
            const message = JSON.stringify({
                state:'',
            });

            client.publish(topic, message, () => {
                console.log('Sent data request to Zigbee2mqtt');
            });
            
        });

        client.on('connect', () => {
            client.subscribe('zigbee2mqtt/0x003c84fffefd7f81'); // 스마트 플러그의 토픽
            // console.log('Connected to MQTT broker');
        });
        client.on('message', (topic, message) => {
            // MQTT 메시지 수신 시 처리할 로직
            const data = JSON.parse(message);
            const plugData11 = data.power;
            console.log(plugData11);
            resolve({plugData11});
            client.end();
        });

        client.on('error', (error) => {
            reject(error);
        });
    })
}
module.exports=plugData10;