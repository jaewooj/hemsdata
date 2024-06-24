
function thData(callback){  
    const {SerialPort} = require('serialport');
    const ModbusRTU = require('modbus-serial');
  
  
    // Modbus RTU 객체 생성
    const modbusRTU = new ModbusRTU();
  
    modbusRTU.connectRTU('COM9', {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      flowControl: false
    }, (err) => {
      if (err) {
        console.error('Error:', err);
      } else {
        // console.log('Connected');
        // 특정 주소(1번)로부터 데이터 요청
        const deviceAddress = 1; // 계측기의 Modbus 주소
        const startRegister = 200; // 요청할 시작 레지스터(0부터 시작하는 주소)
        const quantity = 2; // 읽어올 데이터의 양
        // console.log('변수 설정 완료');
  
        modbusRTU.setID(deviceAddress);
        modbusRTU.readHoldingRegisters(startRegister, quantity, (err, data) => {
          // 기능 코드 03의 메서드는 writeFC3임
          if (err) {
            console.error('Error:', err);
          } else {
            const temData = data.data[0]/10;
            const humData = data.data[1]/10;
            console.log('데이터 :', temData, humData);
            // 여기에서 데이터를 가공하거나 처리합니다.
            const now = new Date();
            const year = now.getFullYear();  // 현재 연도
            const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줌)
            const day = now.getDate(); // 현재 일
            const hour = now.getHours(); // 현재 시간
            const minute = now.getMinutes(); // 현재 분
            callback(temData,humData,year,month,day,hour,minute);
            // callback(temData,humData);
            }
          modbusRTU.close();
          });
        }
  
        
      });
  
  }
  
  module.exports = thData;
  