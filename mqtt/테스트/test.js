const ModbusTCP = require('modbus-serial');

const modbusTCP = new ModbusTCP();

modbusTCP.connectTCP('10.1.254.100', {
    port: 4002 // TCP 포트 번호
}, (err) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Connected');

        // const deviceAddress = 0; // 계측기의 Modbus 주소
        const startRegister = 1; // 요청할 시작 레지스터(0부터 시작하는 주소)
        const quantity = 100; // 읽어올 데이터의 양

        // modbusTCP.setID(deviceAddress);
        modbusTCP.readHoldingRegisters(startRegister, quantity, (err, data) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('데이터 :', data);

                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                const hour = now.getHours();
                const minute = now.getMinutes();
            }
            modbusTCP.close();
        });
    }
});