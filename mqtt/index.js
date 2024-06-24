
// table 생성
const dataDefTable = require('./tableDef/dataDefTable.js');
const dataCtTable= require('./tableDef/dataCtTable.js');
// 정의 테이블 데이터 삽입
const defDataIn = require('./baseData/defDataIn.js');

// zigbee2mqtt 서버 실행
const {start} = require('./zigbee2mqtt/index.js');

// 제어
// const plugControl = require('./control/plugControl.js');

// 데이터 수집 및 저장
// const plugDataInput1 = require('./dataCollect/plugDataInput1.js');
// const thDataInput = require('./dataCollect/thDataInput.js');

// Web 데이터 전송
const webTrans = require('./webTrans/webTrans.js')

const cron = require('node-cron');

// 데이터 저장(매분)
const inputDataTime = require('./minInput/inputDateTime.js');
const inputData = require('./minInput/inputData.js');

const runTasks = async () => {
    try {        
      // 최초 실행 시 시작
      await dataDefTable();
      await dataCtTable();
      await defDataIn();

      // cron.schedule('0 * * * * *', () => {
      //   inputDataTime(); 
      //   inputData();
      // })
      await start()
          .then(() => {
              console.log('Zigbee2MQTT 시작됨');
              // plugControl();
            cron.schedule('0 * * * * *', async ()=>{
              await inputDataTime(); 
              await inputData();
            })
            // webTrans();

          })
          .catch((error) => {
              console.error('Zigbee2MQTT 시작 실패:', error);
      });
      
      // 매 자정 시작
      cron.schedule('0 0 0 * * *',async()=>{
        await dataCtTable();
        
      });
      

    } catch (error) {
      console.error('Error:', error);
    }
  };

// 함수 실행
runTasks();

