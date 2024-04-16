import React from 'react';
import { Link } from 'react-router-dom';

const Title = () => {

    const updateTime = () => {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        // 시, 분, 초를 두 자리 숫자로 표시하기 위해 0을 추가합니다.
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var currentTimeString = hours + ":" + minutes + ":" + seconds;
        document.getElementById("currentTime").textContent = currentTimeString;
    }
    setInterval(updateTime,1000);

    return (
        <div className="title">
            <h1><Link to="/"><img src="/images/logo.jpg" alt="" /></Link></h1>
            <p>인도네시아 무하마드</p>
            <h2>Home Energy Management System</h2>
            <span id="currentTime"></span>
            
        </div>
    );
};

export default Title;