
const net = require('net');

// 허브의 IP 주소와 포트 번호
const hubIP = '10.1.254.100';
// const port = 8477; // 예시 포트 번호
const port = 4003; // 예시 포트 번호

// 소켓 생성
const socket = net.createConnection({ host: hubIP, port: port }, () => {
  console.log('Connected to hub');

  // 연결이 성공했을 때, 데이터를 요청할 수 있습니다.
  // 예를 들어, 계측기로부터 데이터를 요청하는 명령을 보낼 수 있습니다.
  // socket.write('Request data');
});

// 데이터 수신
socket.on('data', data => {
  console.log('Received:', data.toString());
  // 데이터를 분석하고 필요한 작업을 수행합니다.
});

// 연결 종료
socket.on('end', () => {
  console.log('Disconnected from hub');
});

// 에러 처리
socket.on('error', err => {
  console.error('Socket error:', err);
});