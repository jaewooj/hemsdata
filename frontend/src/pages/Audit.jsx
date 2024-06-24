import React, { useState } from 'react';
import './Audit.css'

const Audit = () => {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');

    const [num,setNum] = useState(0);
  
    const handleInputChange = (event) => {
      setName(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
        setGreeting(`${name} 안녕`);
    };

    const plus = () =>{
        setNum(num+1);
        
    }
    return (
        <div className="audit">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name} 
            onChange={handleInputChange} 
            placeholder="이름을 입력하세요" 
          />
          <button type="submit">Submit</button>
        </form>
        {greeting && <h1>{greeting}</h1>}
        <button onClick={plus}>PLUS</button>
            <p>{num}</p>
        </div>
    );
};

export default Audit;