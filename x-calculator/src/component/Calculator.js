import React, { useState } from "react";
import "./calculator.css";

const Calculator = () => {
    const [value, setValue] = useState('')
    const [sumValue, setSumValue] = useState('')
  return (
    <div className="container">
      <div className="cal-container">
        <h1>React Calculator</h1>
        <div className="input-container">
          <input type="text" value={value} />
        </div>

        <p className="ans-sum">{sumValue}</p>

        <div className="btn-container">
          <input type="button" value="7" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="8" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="9" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="+" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="4" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="5" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="6" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="-" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="1" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="2" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="3" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="*" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="C" className="calBtn" onClick={(e)=>setValue('')}/>
          <input type="button" value="0" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
          <input type="button" value="=" className="calBtn" onClick={(e)=>setSumValue(eval(value))}/>
          <input type="button" value="/" className="calBtn" onClick={(e)=>setValue(value+e.target.value)}/>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
