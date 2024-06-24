import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navibar.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuNum } from '../store/modules/hemsSlice';


const Navibar = () => {

    // const [indexNum, setIndexNum] = useState(1);

    const indexNum = useSelector((state)=>state.hemsR.menuNum);
    const dispatch = useDispatch();

    const onGo = (num) =>{
        dispatch(changeMenuNum(num));
    }
    
    return (
        <nav className="nav">
            <ul>
                <li className={indexNum===1?"menuBoxOn":""} onClick={()=>{onGo(1)}}><Link to="/">PV+ESS</Link></li>
                <li className={indexNum===2?"menuBoxOn":""} onClick={()=>{onGo(2)}}><Link to="/hems">HEMS</Link></li>
                <li className={indexNum===3?"menuBoxOn":""} onClick={()=>{onGo(3)}}><Link to="/audit">AUDIT</Link></li>
                <li className={indexNum===4?"menuBoxOn":""} onClick={()=>{onGo(4)}}><Link to="/dataview">DATAVIEW</Link></li>
            </ul>
        </nav>
    );
};

export default Navibar;