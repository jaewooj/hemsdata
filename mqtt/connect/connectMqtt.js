const mqtt = require('mqtt');
    
const options = {
    host: '127.0.0.1', // MQTT 브로커의 주소
    port: 1883, // MQTT 브로커의 포트
};

const client = mqtt.connect(options);

module.exports = client;