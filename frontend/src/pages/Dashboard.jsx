import React from 'react';
import './Dashboard.css'
import axios from 'axios';
import { useState, useEffect } from 'react'

const Dashboard = () => {
    const [dataDisplay, setDataDisplay] = useState('kW');

    useEffect(() => {
        plugData();
        const intervalId = setInterval(() => {
            plugData(); // 주기적으로 데이터를 업데이트합니다.
        }, 5000); // 5초마다 업데이트하도록 설정합니다.

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval을 정리합니다.
    }, []);

    const pvCapacity = 3; // kW
    let realTimePv = 2.25;
    const dcGeneration = realTimePv/pvCapacity;
    const circum =  2 * Math.PI * 90;
    const dcRadiusCal = 2 * Math.PI * 90 * dcGeneration;
    const plugOn = () =>{
        axios.post('http://localhost:3000/control', {
            data: 'plugOn'
        })
        .then(response => {
            console.log('서버 응답:', response.data);
        })
        .catch(error => {
            console.error('에러:', error);
        });
        alert('Plug On 성공');
    }
    const plugOff = () =>{
        axios.post('http://localhost:3000/control1', {
            data: 'plugOff'
        })
        .then(response => {
            console.log('서버 응답:', response.data);
        })
        .catch(error => {
            console.error('에러:', error);
        });
        alert('Plug off 성공');
    }
    const plugData = () => {
        axios.get('http://localhost:5010/test')
            .then(response => {
                setDataDisplay(JSON.stringify(response.data.plugData));
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="dashboard">
            <div className="realTimeData">
                <ul>
                    <li className="dcGeneration">
                        <div className="circleGraph">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="yellow" strokeWidth="20" />
                                <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="green"
                                strokeWidth="20"
                                // strokeDashoffset={dcDashoffset}
                                // strokeDasharray={2 * Math.PI * 90 * 0.75}
                                strokeDasharray=""
                                />
                            </svg>
                        </div>
                        <div className="realTimeGeneration">
                            <p>DC 발전전력</p>
                            <span>{dataDisplay}</span>
                        </div>
                    </li>
                    {/* DC 발전전력 */}
                    <li className="dcGeneration">
                        <div className="circleGraph">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="yellow" strokeWidth="20" />
                                <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="green"
                                strokeWidth="20"
                                // strokeDashoffset={dcDashoffset}
                                // strokeDasharray={2 * Math.PI * 90 * 0.75}
                                strokeDasharray=""
                                />
                            </svg>
                        </div>
                        <div className="realTimeGeneration">
                            <p>DC 발전전력</p>
                            <span>10kW</span>
                        </div>
                    </li>
                    {/* DC 발전전력 */}
                    <li className="dcGeneration">
                        <div className="circleGraph">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="yellow" strokeWidth="20" />
                                <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="green"
                                strokeWidth="20"
                                // strokeDashoffset={dcDashoffset}
                                // strokeDasharray={2 * Math.PI * 90 * 0.75}
                                strokeDasharray=""
                                />
                            </svg>
                        </div>
                        <div className="realTimeGeneration">
                            <p>DC 발전전력</p>
                            <span>10kW</span>
                        </div>
                    </li>
                    {/* DC 발전전력 */}
                    <li className="dcGeneration">
                        <div className="circleGraph">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="yellow" strokeWidth="20" />
                                <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="green"
                                strokeWidth="20"
                                // strokeDashoffset={dcDashoffset}
                                // strokeDasharray={2 * Math.PI * 90 * 0.75}
                                strokeDasharray=""
                                />
                            </svg>
                        </div>
                        <div className="realTimeGeneration">
                            <p>DC 발전전력</p>
                            <span>10kW</span>
                        </div>
                    </li>
                    {/* DC 발전전력 */}
                    <li className="dcGeneration">
                        <div className="circleGraph">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="yellow" strokeWidth="20" />
                                <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="green"
                                strokeWidth="20"
                                // strokeDashoffset={dcDashoffset}
                                // strokeDasharray={2 * Math.PI * 90 * 0.75}
                                strokeDasharray=""
                                />
                            </svg>
                        </div>
                        <div className="realTimeGeneration">
                            <p>DC 발전전력</p>
                            <span>10kW</span>
                        </div>
                    </li>
                    {/* DC 발전전력 */}
                    <li className="dcGeneration">
                        <div className="circleGraph">
                            <svg viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="yellow" strokeWidth="20" />
                                <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="green"
                                strokeWidth="20"
                                // strokeDashoffset={dcDashoffset}
                                // strokeDasharray={2 * Math.PI * 90 * 0.75}
                                strokeDasharray=""
                                />
                            </svg>
                        </div>
                        <div className="realTimeGeneration">
                            <p>DC 발전전력</p>
                            <span>10kW</span>
                        </div>
                    </li>
                    {/* DC 발전전력 */}
                </ul>
                <button className='plugOn plug' onClick={plugOn}>ON</button>
                <button className='plugOFF plug' onClick={plugOff}>OFF</button>
            </div>
        </div>
    );
};

export default Dashboard;