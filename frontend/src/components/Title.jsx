import React from 'react';
import { Link } from 'react-router-dom';
import './Title.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuNum } from '../store/modules/hemsSlice';

const Title = () => {
    
    const indexNum = useSelector((state)=>state.hemsR.menuNum);
    const dispatch = useDispatch();

    const updateTime = () => {
        var now = new Date();
        var year = now.getFullYear();
        var mon1 = now.getMonth()+1;
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        // 시, 분, 초를 두 자리 숫자로 표시하기 위해 0을 추가합니다.
        var mon = (mon1<10)?"0"+mon1:mon1;
        day = (day<10)?"0"+day:day;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var currentTimeString = year+"년 "+ mon+"월 "+day+"일 "+ hours + ":" + minutes + ":" + seconds;
        document.getElementById("currentTime").textContent = currentTimeString;
    }
    setInterval(updateTime,1000);
    const onGo = (num) => {
        dispatch(changeMenuNum(num));
    }

    return (
        <div className="title">
            <h1 onClick={()=>{onGo(1)}}><Link to="/"><img src="/images/logo.png" alt="" /></Link></h1>
            {/* <p>인도네시아 무하마드</p> */}
            <h2>HEMS(Home Energy Management System)</h2>
            <span id="currentTime"></span>
            
        </div>
    );
};

export default Title;