// import React, { useState } from "react";
// import "./calculator.css";

// const Calculator = () => {
//   const [value, setValue] = useState("");
//   const [sumValue, setSumValue] = useState("");
//   const [equal, setEqual] = useState(false);

//   const calculation = (inpValue) => {
//     const mathSymbol = ['+', '*', '-', '/'];
//     let number = [];
//     let operations = [];
//     let currentNumber = '';

//     for (let i = 0; i < inpValue.length; i++) {
//       let char = inpValue[i];
//       if (mathSymbol.includes(char)) {
//         number.push(parseFloat(currentNumber));
//         operations.push(char);
//         currentNumber = '';
//       } else {
//         currentNumber += char;
//       }
//     }
//     number.push(parseFloat(currentNumber));

//     let index = 0;
//     while (index < operations.length) {
//       if (operations[index] === '*' || operations[index] === '/') {
//         if (number[index + 1] === 0) {
//           return 'Infinity'; // or 'NaN' depending on the desired behavior
//         }
//         const result = operations[index] === '*'
//           ? number[index] * number[index + 1]
//           : number[index] / number[index + 1];
//         number.splice(index, 2, result);
//         operations.splice(index, 1);
//       } else {
//         index++;
//       }
//     }

//     index = 0;
//     while (index < operations.length) {
//       const result = operations[index] === '+'
//         ? number[index] + number[index + 1]
//         : number[index] - number[index + 1];
//       number.splice(index, 2, result);
//       operations.splice(index, 1);
//     }

//     return number[0];
//   };

//   const handleClearBtn = () => {
//     setEqual(false);
//     setSumValue('');
//     setValue('');
//   };

//   const handleEqualBtn = () => {
//     if (!value) {
//       setSumValue('Error');
//     } else {
//       setEqual(true);
//       setSumValue(calculation(value));
//       setValue("");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="cal-container">
//         <h1>React Calculator</h1>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="input-container">
//             <input 
//               type="text" 
//               value={value} 
//               onChange={(e) => setValue(e.target.value)} 
//             />
//           </div>
  
//           <p className="ans-sum">{sumValue}</p>
  
//           <div className="btn-container">
//             {[
//               7,
//               8,
//               9,
//               "+",
//               4,
//               5,
//               6,
//               "-",
//               1,
//               2,
//               3,
//               "*",
//               "C",
//               0,
//               "=",
//               "/",
//             ].map((btnValue, index) => (
//               <input
//                 key={index}
//                 value={btnValue}
//                 type="submit"
//                 className="calBtn"
//                 onClick={(e) => {
//                   if (btnValue === "C") {
//                     handleClearBtn();
//                   } else if (btnValue === "=") {
//                     handleEqualBtn();
//                   } else {
//                     setValue(parseInt(value) + parseInt(e.target.value));
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         </form>
        
//       </div>
//     </div>
//   );
// }

// export default Calculator;

import React, { useState } from "react";
import "./calculator.css";

const Calculator = () => {
  const [value, setValue] = useState("");
  const [sumValue, setSumValue] = useState("");
  const [equal, setEqual] = useState(false);

  const calculation = (input) => {
    // Remove any leading zeros that are not part of a number
    const cleanedInput = input.replace(/^0+(?=\d)/, '');

    try {
      // Evaluate the expression using eval() to handle basic calculations
      // Note: eval() should be used carefully in production to avoid security risks
      return eval(cleanedInput);
    } catch (error) {
      // Handle any errors (e.g., division by zero)
      return "Error";
    }
  };

  const handleClearBtn = () => {
    setEqual(false);
    setSumValue("");
    setValue("");
  };

  const handleEqualBtn = () => {
    setEqual(true);
    setSumValue(calculation(value));
  };

  const handleButtonClick = (btnValue) => {
    if (btnValue === "C") {
      handleClearBtn();
    } else if (btnValue === "=") {
      handleEqualBtn();
    } else {
      setValue(value + btnValue);
      setEqual(false);
    }
  };

  return (
    <div className="container">
      <div className="cal-container">
        <h1>React Calculator</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-container">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          {/* Display the calculation result or error message */}
          <p className="ans-sum">{equal && value === "" ? "Error" : sumValue}</p>

          <div className="btn-container">
            {[
              7,
              8,
              9,
              "/",
              4,
              5,
              6,
              "*",
              1,
              2,
              3,
              "-",
              "C",
              0,
              "=",
              "+",
            ].map((btnValue, index) => (
              <input
                key={index}
                value={btnValue}
                type="button"
                className="calBtn"
                onClick={() => handleButtonClick(btnValue)}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
