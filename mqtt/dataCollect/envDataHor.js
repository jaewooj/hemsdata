

const envDataHor = () => {
    return new Promise((resolve,reject)=>{
        // 환경센서는 192.168.0.4에 4031포트임
        const net = require('net');
        // 허브의 IP 주소와 포트 번호
        const hubIP = '192.168.0.4';
        const port = 4031; // 허브의 포트 번호
        // 체크섬 계산 함수
        const calculateChecksum = (data) => {
            return data.reduce((acc, byte) => acc + byte, 0) & 0xFF;
        };
        // 요청 데이터 생성
        const createRequestData = () => {
            const stx = 0x02;
            const command = 0x52; // 'R'
            const type = 0x45; // 'E'
            //   const data = [0x30, 0x30, 0x30]; // 예: ID 000 : FDP153.S
            const data = [0x30, 0x30, 0x31]; // 예: ID 001 : FDP153.E
            const etx = 0x03;
            const payload = [stx, command, type, ...data, etx];
            const checksum = calculateChecksum(payload);
            return Buffer.from([...payload, checksum]);
        };
        // 소켓 생성 및 연결
        const socket = net.createConnection({ host: hubIP, port: port }, () => {
            console.log('Connected to hub(Env)');
            const requestData = createRequestData();
            console.log('Sent request:', requestData);
            // 요청 데이터 전송
            socket.write(requestData);
        });
        // 데이터 수신
        socket.on('data', (data) => {
            // console.log('Received:', data);
            // 데이터 처리 로직 추가 (필요에 따라 수정)
            // console.log('Response as COMMON :', data);
            const responseString = data.toString('ascii');
            const horIns = responseString.slice(7,11);
            // console.log(horIns);
            const outTemBef = responseString.slice(12,16);
            const outTem=outTemBef/10;
            // console.log(outTem);
            console.log(`${horIns}, ${outTem}`);
            resolve({horIns,outTem})
            // console.log('Response as ASCII:', responseString);
            // 예: 응답 데이터에서 온도와 습도 값을 추출
            // 여기서는 응답 데이터의 형식에 따라 데이터를 처리하는 예제를 추가해야 합니다.
            socket.end();
        });
        // 연결 종료
        socket.on('end', () => {
            console.log('Disconnected from hub(Env)');   
        });
        // 에러 처리
        socket.on('error', (err) => {
            // console.error('Socket error:', err);
            reject(err);
        });

    })
}
// envDataHor();
module.exports=envDataHor;