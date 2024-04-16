const mqtt = require('mqtt');

const options = {
  host: '127.0.0.1',
  port: 1883,
};

const client = mqtt.connect(options);

client.on('connect', () => {
  client.subscribe('zigbee2mqtt/0xa4c13824c66735cc');
});

client.on('error', (error) => {
  console.error('MQTT error:', error);
});

const turnOnLights = () => {
  client.publish('zigbee2mqtt/0xa4c13824c66735cc/set', JSON.stringify({
    "state": "off",
  }), () => {
    console.log('Sent command to turn on the lights');
  });
};

const scheduleLightsOn = () => {
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    14, // 12 PM
    38, // 30 minutes
    0 // 0 seconds
  );

  const delay = targetTime - now; // Calculate the delay until 12:30

  setTimeout(() => {
    turnOnLights(); // Call the function to turn on the lights
  }, delay);
};

scheduleLightsOn(); // Start the scheduling process