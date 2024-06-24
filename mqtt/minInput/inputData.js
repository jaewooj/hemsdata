
const mysql = require('mysql2/promise');
const nowTime = require('../conference/nowTime');
const { connectDb } = require('../connect/connectDb');
const thData = require('../dataCollect/thData');
const plugData = require('../dataCollect/plugData');
const plugData10 = require('../dataCollect/plugData10');
const envDataHor = require('../dataCollect/envDataHor');
// const zbThData = require('../dataCollect/zbThData');

const inputData = async () => {
    
    const {now,year,month,day,hour,minute,seconds} = nowTime();
    const tableName = `DATA_${year}_${month}_${day}`;
    const connection = await connectDb();
    const datetime = `${year}-${month}-${day} ${hour}:${minute}:00`;
    const { temValue, humValue } = await thData();
    const {plugData1} = await plugData()
    const {plugData11} = await plugData10()
    const {horIns, outTem} = await envDataHor();

    try {
        
        const insertThDataQuery = `
            UPDATE ${tableName} SET H032 = ?, H033 = ?, H034 = ?, H035 = ?, H018 = ?, H020 = ?
            WHERE date_time = '${datetime}';
        `;
        await connection.execute(insertThDataQuery, [plugData1, temValue, humValue, plugData11, horIns, outTem]);
        console.log(`All Data inserted into ${tableName}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if(connection){
            connection.release();
        }
    }
}

module.exports = inputData;