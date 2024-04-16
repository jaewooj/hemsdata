

    const mqtt = require('mqtt');

    const options = {
    host: '127.0.0.1', // MQTT 브로커의 주소
    port: 1883, // MQTT 브로커의 포트
    };

    const client = mqtt.connect(options);

    client.on('connect', () => {
        // console.log('Connected to MQTT broker');
        // 주기적으로 데이터 요청을 보내기 위한 타이머 설정 (예: 10초마다 요청)
        const topic = 'zigbee2mqtt/0xa4c13824c66735cc/get'; // 스마트 플러그의 토픽

        // 스마트 플러그에 데이터 요청을 보내는 메시지를 JSON 형식으로 작성하여 발행
        const message = JSON.stringify({
            state:'',
        });

        client.publish(topic, message, () => {
            console.log('Sent data request to Zigbee2mqtt');
        });
        
    });

    client.on('connect', () => {
        client.subscribe('zigbee2mqtt/0xa4c13824c66735cc'); // 스마트 플러그의 토픽
        // console.log('Connected to MQTT broker');
    });
    client.on('message', (topic, message) => {
        // MQTT 메시지 수신 시 처리할 로직
    
        const data = JSON.parse(message);
        const now = new Date();
        const year = now.getFullYear();  // 현재 연도
        const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줌)
        const day = now.getDate(); // 현재 일
        const hour = now.getHours(); // 현재 시간
        const minute = now.getMinutes(); // 현재 분
        const plugData1 = data.power;
        console.log(`${now} Received message from topic ${topic}:`, plugData1);
        // callback(plugData1,year,month,day,hour,minute)
        client.end();
    });

    client.on('error', (error) => {
        console.error('MQTT error:', error);
    });