
const createDailyTable = require('./createBase/createDailyTable.js');
const {createTableOnStart} = require('./createBase/createTableOnStart.js');
const dataInput = require('./dataCollect/dataInput.js');
const zigbeeInput = require('./dataCollect/zigbeeInput.js');
const dataRev = require('./dataCollect/dataRev.js');
const plugControl = require('./control/plugControl.js');
const {start} = require('./zigbee2mqtt/index.js');

const cron = require('node-cron');

const runTasks = async () => {
    try {
      await createTableOnStart();
      await createDailyTable();
      
      await start()
          .then(() => {
              console.log('Zigbee2MQTT 시작됨');
              plugControl();
            cron.schedule('* * * * *', ()=>{
              dataInput();  
            })
            cron.schedule('2 * * * * *', ()=>{
              dataRev();      
            })
              zigbeeInput();
          })
          .catch((error) => {
              console.error('Zigbee2MQTT 시작 실패:', error);
      });
      
      

    } catch (error) {
      console.error('Error:', error);
    }
  };

// 함수 실행
runTasks();

