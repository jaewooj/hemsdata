
// get 안됨 ~~~~~~~~~~~ https://www.zigbee2mqtt.io/devices/ZG-205ZL.html
function motionData (callback){

    const mqtt = require('mqtt');

    const options = {
      host: '127.0.0.1',
      port: 1883,
    };
    
    const client = mqtt.connect(options);
    
    /* client.on('connect', () => {
        client.subscribe('zigbee2mqtt/0xa4c13859a72b2d47');
    }); */
    client.on('connect', () => {
        // console.log('Connected to MQTT broker');
        // 주기적으로 데이터 요청을 보내기 위한 타이머 설정 (예: 10초마다 요청)
        const topic = 'zigbee2mqtt/0xa4c13859a72b2d47/get'; // 스마트 플러그의 토픽
    
        // 스마트 플러그에 데이터 요청을 보내는 메시지를 JSON 형식으로 작성하여 발행
        const message = JSON.stringify({
            state:'',
        });
    
        client.publish(topic, message, () => {
            console.log('Sent data request to Zigbee2mqtt');
        });
        
    });
    client.on('connect', () => {
        client.subscribe('zigbee2mqtt/0xa4c13859a72b2d47'); // 스마트 플러그의 토픽
        // console.log('Connected to MQTT broker');
    });
    client.on('message', (topic, message) => {
        // MQTT 메시지 수신 시 처리할 로직
    
        const data = JSON.parse(message);
        console.log(data);
        const motionState = data.motion_state;
        console.log(motionState);
        callback(motionState);
        // client.end();
    });
}
module.exports=motionData;