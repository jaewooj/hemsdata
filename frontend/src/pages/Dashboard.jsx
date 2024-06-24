import React from 'react';
import './Dashboard.css'
import RealInfo from '../dashCom/RealInfo.jsx';
import ElectFlow from '../dashCom/ElectFlow.jsx';
import Summary from '../dashCom/Summary.jsx';
import Alram from '../dashCom/Alram.jsx';
import AccumGp from '../dashCom/AccumGp.jsx';
import TodayGp from '../dashCom/TodayGp.jsx';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <RealInfo/>
            <div className="dashMid">
                <ElectFlow/>
                <div className="midRt">
                    <Alram/>
                    <Summary/>
                </div>
            </div>
            <div className="dashBtm">
                <AccumGp/>
                <TodayGp/>
            </div>
        </div>
    );
};

export default Dashboard;