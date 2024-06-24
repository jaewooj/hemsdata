

const thData = () => {
  return new Promise((resolve, reject)=>{
    
    const net = require('net');

    // 허브의 IP 주소와 포트 번호
    // ModbusRTU 는 readHoldingResgisters로 데이터를 요청
    // 이더넷 컨버터의 경우 socket과 Buffer를 통해 데이터를 요청
    // 서버모드로 할것. 가상포트는 안만들어도됨
    const hubIP = '192.168.0.3';
    const port = 4030; // 허브의 포트 번호

    // 소켓 생성
    const socket = net.createConnection({ host: hubIP, port: port }, () => {
      console.log('Connected to hub(th)');

      const requestData = Buffer.from([0x01, 0x03, 0x00, 0xC8, 0x00, 0x0C, 0xC4, 0x31]);

      // console.log('Sent request:', requestData);
      socket.write(requestData); // 데이터 요청
    });

    // 데이터 수신
    socket.once('data', data => {
        // console.log('Received:', data.toString());
        // console.log('Received:', data);
        const temp = data.slice(3,5);
        // console.log(temp);
        const temValue = temp.readUInt16BE()/10;
        // console.log(temValue);
        const hum = data.slice(5,7);
        // console.log(hum);
        const humValue = hum.readUInt16BE()/10;
        // console.log(humValue);
        console.log(`${temValue}, ${humValue}`);
        resolve({temValue, humValue});
        socket.end(); // 데이터 수신 후 소켓 종료
      });
      
      // 연결 종료
      socket.on('end', () => {
        console.log('Disconnected from hub(th)');
      });
      
      // 에러 처리
      socket.on('error', err => {
        reject(err);
      });
  })
}
module.exports=thData;