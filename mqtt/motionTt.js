


// const cron = require('node-cron');

const mqtt = require('mqtt');
const motionData = require('./motionData.js');

const options = {
  host: '127.0.0.1',
  port: 1883,
};

const client = mqtt.connect(options);

client.on('connect', () => {
  client.subscribe('zigbee2mqtt/0xa4c138bce829abd7');
});

client.on('error', (error) => {
  console.error('MQTT error:', error);
});
const turnOnLights = () => {
    client.publish('zigbee2mqtt/0xa4c138bce829abd7/set', JSON.stringify({
      "state_left": "on",
      "state_center": "on",
      "state_right": "on"
    }), () => {
      console.log('Sent command to turn on the lights');
    });
  };

const turnOffLights = () => {
  client.publish('zigbee2mqtt/0xa4c138bce829abd7/set', JSON.stringify({
    "state_left": "off",
    "state_center": "off",
    "state_right": "off"
  }), () => {
    console.log('Sent command to turn on the lights');
  });
};

// turnOnLights(); 
// client.end();
// turnOffLights(); 


(async () => {
    try {
        motionData((motionState)=>{
          // console.log(motionState);
          const motion = motionState;
          let motionDetected = true; // 기본값은 false로 설정
          if (motion !== "none") { // motionState가 none이 아닌 경우에는 true로 설정
              motionDetected = true;
          }
          if (motionDetected) {
              console.log("Motion detected:", motion);
              turnOnLights();
          } else {
              console.log("No motion detected");
              // 10분 후에 turnOffLights 함수 실행
              setTimeout(() => {
                  console.log("Turning off lights after 10 minutes of no motion");
                  turnOffLights();
              }, 1 * 60 * 1000); // 10분을 밀리초로 변환하여 지연 시간으로 설정
          }
            // console.log(motionState);
            // const motion = motionState;
            // if(motion==="large"){
            //     console.log(motion);
            //     turnOnLights(); 
            // } else if (motion==="none"){
            //     console.log(motion);
            //     turnOffLights(); 
            // }

        })

    } catch (error) {
        console.error('Error:', error);
    }
})();
