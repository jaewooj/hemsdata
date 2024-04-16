
// table 생성 및 분당 datatime 행 생성
const createDailyTable = require('./createBase/createDailyTable.js');
const {createTableOnStart} = require('./createBase/createTableOnStart.js');
const inputDataTime = require('./createBase/inputDateTime.js');

// zigbee2mqtt 서버 실행
const {start} = require('./zigbee2mqtt/index.js');

// 제어
const plugControl = require('./control/plugControl.js');

// 데이터 수집 및 저장
const plugDataInput1 = require('./dataCollect/plugDataInput1.js');
const thDataInput = require('./dataCollect/thDataInput.js');

// Web 데이터 전송
const webTrans = require('./webTrans/webTrans.js')

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
              inputDataTime(); 
              plugDataInput1(); 
              thDataInput();
            })
            webTrans();

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

