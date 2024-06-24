import React from 'react';
import './RealInfo.css'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealInfo = () => {
    const [h001Unit, setH001Unit] = useState('kW');
    const [h001EffUnit, setH001EffUnit] = useState('%');
    const [h002Unit, setH002Unit] = useState('kW');
    const [h002EffUnit, setH002EffUnit] = useState('%');
    const [h003Unit, setH003Unit] = useState('kW');
    const [h003EffUnit, setH003EffUnit] = useState('%');
    const [h004Unit, setH004Unit] = useState('kW');
    const [h004EffUnit, setH004EffUnit] = useState('%');
    const [h005Unit, setH005Unit] = useState('kW');
    const [h005EffUnit, setH005EffUnit] = useState('%');
    const [h006Unit, setH006Unit] = useState('kW');
    const [h006EffUnit, setH006EffUnit] = useState('%');

    let h001 = 2.7;
    let h001Max = 3.0;
    let h001Eff = (h001/h001Max*100).toFixed(1);

    let h002 = 2.2;
    let h002Max = 3;
    let h002Eff = (h002/h002Max*100).toFixed(1);

    let h003 = 0.2;
    let h003Max = 4.1;
    let h003Eff = (h003/h003Max*100).toFixed(1);

    let h004 = 0.3;
    let h004Max = 3.2;
    let h004Eff = (h004/h004Max*100).toFixed(1);

    let h005 = 0.1;
    let h005Max = 3;
    let h005Eff = (h005/h005Max*100).toFixed(1);
    
    let h006 = 0.1;
    let h006Max = 3;
    let h006Eff = (h006/h006Max*100).toFixed(1);


    const pvCapacity = 3; // kW
    let realTimePv = 2.25;
    const dcGr = realTimePv/pvCapacity;
    const circum =  2 * Math.PI * 90;
    const dcRadiusCal = 2 * Math.PI * 90 * dcGr;

    function CustomTextProgressbar(props) {
        const { children, ...otherProps } = props;
      
        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ 
                position: 'relative', 
                width:'80%', 
                margin:'10px auto'
                }}>
              <CircularProgressbar {...otherProps} />
            </div>
            {/* <div
              style={{
                // position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize:'16px',
                lineHeight:'1.3',
                color:'#4277FF',
                marginTop:'2px'
              }}
            >
              {props.children}
            </div> */}
          </div>
        );
      }

    return (
        <div className="realInfo">
            <div className="realTimeData">
                <div className="rtdTt">
                    <p>실시간에너지정보</p>
                </div>
                <ul>
                    {/* 1 태양광발전량 */}
                    <li className="dcGr">
                        <div className="realTitle">
                            <p>태양광 발전량(3kW)</p>
                        </div>
                        <div className="realCon">
                            <div className="circleGraph">
                                <CustomTextProgressbar 
                                    value={h001} 
                                    maxValue={h001Max} 
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#9880FA`,
                                        trailColor: '#d0d0d0',
                                    })}
                                    >
                                </CustomTextProgressbar>
                            </div>
                            <div className="realTimeGeneration">
                                <div className="value">
                                    <p>{h001}</p>
                                    <span>{h001Unit}</span>
                                </div>
                                <div className="eff">
                                    <p>({h001Eff}</p>
                                    <span>{h001EffUnit})</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 2 */}
                    <li className="dcGr">
                        <div className="realTitle">
                            <p>ESS 충전전력</p>
                        </div>
                        <div className="realCon">
                            <div className="circleGraph">
                                <CustomTextProgressbar 
                                    value={h002} 
                                    maxValue={h002Max} 
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#71DAA9`,
                                        trailColor: '#d0d0d0',
                                    })}
                                    >
                                </CustomTextProgressbar>
                            </div>
                            <div className="realTimeGeneration">
                                <div className="value">
                                    <p>{h002}</p>
                                    <span>{h002Unit}</span>
                                </div>
                                <div className="eff">
                                    <p>({h002Eff}</p>
                                    <span>{h002EffUnit})</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 3 */}
                    <li className="dcGr">
                        <div className="realTitle">
                            <p>DC부하 소비전력</p>
                        </div>
                        <div className="realCon">
                            <div className="circleGraph">
                                <CustomTextProgressbar 
                                    value={h003} 
                                    maxValue={h003Max} 
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#5C9FE7`,
                                        trailColor: '#d0d0d0',
                                    })}
                                    >
                                </CustomTextProgressbar>
                            </div>
                            <div className="realTimeGeneration">
                                <div className="value">
                                    <p>{h003}</p>
                                    <span>{h003Unit}</span>
                                </div>
                                <div className="eff">
                                    <p>({h003Eff}</p>
                                    <span>{h003EffUnit})</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 4 */}
                    <li className="dcGr">
                        <div className="realTitle">
                            <p>AC부하 소비전력</p>
                        </div>
                        <div className="realCon">
                            <div className="circleGraph">
                                <CustomTextProgressbar 
                                    value={h004} 
                                    maxValue={h004Max} 
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#f65d83`,
                                        trailColor: '#d0d0d0',
                                    })}
                                    >
                                </CustomTextProgressbar>
                            </div>
                            <div className="realTimeGeneration">
                                <div className="value">
                                    <p>{h004}</p>
                                    <span>{h004Unit}</span>
                                </div>
                                <div className="eff">
                                    <p>({h004Eff}</p>
                                    <span>{h004EffUnit})</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 5 */}
                    <li className="dcGr">
                        <div className="realTitle">
                            <p>계통 수전전력</p>
                        </div>
                        <div className="realCon">
                            <div className="circleGraph">
                                <CustomTextProgressbar 
                                    value={h005} 
                                    maxValue={h005Max} 
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#F0884E`,
                                        trailColor: '#d0d0d0',
                                    })}
                                    >
                                </CustomTextProgressbar>
                            </div>
                            <div className="realTimeGeneration">
                                <div className="value">
                                    <p>{h005}</p>
                                    <span>{h005Unit}</span>
                                </div>
                                <div className="eff">
                                    <p>({h005Eff}</p>
                                    <span>{h005EffUnit})</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 6 */}
                    <li className="dcGr">
                        <div className="realTitle">
                            <p>계통 송전전력</p>
                        </div>
                        <div className="realCon">
                            <div className="circleGraph">
                                <CustomTextProgressbar 
                                    value={h006} 
                                    maxValue={h006Max} 
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#5486A0`,
                                        trailColor: '#d0d0d0',
                                    })}
                                    >
                                </CustomTextProgressbar>
                            </div>
                            <div className="realTimeGeneration">
                                <div className="value">
                                    <p>{h006}</p>
                                    <span>{h006Unit}</span>
                                </div>
                                <div className="eff">
                                    <p>({h006Eff}</p>
                                    <span>{h006EffUnit})</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                </ul>
                

            </div>
        </div>
    );
};

export default RealInfo;