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

import './calculator.css'
const Calculator = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState(0);

  const calculate = (expression) => {
    const operators = ["+", "-", "*", "/"];
    const stack = [];
    const output = [];

    const getPrecedence = (operator) => {
      switch (operator) {
        case "+":
        case "-":
          return 1;
        case "*":
        case "/":
          return 2;
        default:
          return 0;
      }
    };

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === ".") {
        let number = char;
        while (!isNaN(expression[i + 1]) || expression[i + 1] === ".") {
          number += expression[++i];
        }
        output.push(parseFloat(number));
      } else if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        stack.pop();
      } else if (operators.includes(char)) {
        while (
          stack.length &&
          getPrecedence(char) <= getPrecedence(stack[stack.length - 1])
        ) {
          output.push(stack.pop());
        }
        stack.push(char);
      }
    }

    while (stack.length) {
      output.push(stack.pop());
    }

    const resultStack = [];
    output.forEach((token) => {
      if (!isNaN(token)) {
        resultStack.push(token);
      } else {
        const b = resultStack.pop();
        const a = resultStack.pop();
        switch (token) {
          case "+":
            resultStack.push(a + b);
            break;
          case "-":
            resultStack.push(a - b);
            break;
          case "*":
            resultStack.push(a * b);
            break;
          case "/":
            resultStack.push(a / b);
            break;
          default:
            break;
        }
      }
    });

    return resultStack.pop();
  };

  const handleInput = (char) => {
    setText((prev) => prev + char);
  };

  const clearInput = () => {
    setText("");
    setOutput(0);
  };

  const equalsResult = () => {
    if (text === "") {
      setOutput("Error");
      return;
    } else if (text.includes("0/0")) {
      setOutput(NaN);
    } else if (text.includes("/0")) {
      setOutput(Infinity);
    }
    setOutput(calculate(text));
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <input type="text" value={text} readOnly />
      <h3>Output: {output}</h3>
      <div className="card">
        <div>
          <button onClick={() => handleInput("7")}>7</button>
          <button onClick={() => handleInput("8")}>8</button>
          <button onClick={() => handleInput("9")}>9</button>
          <button onClick={() => handleInput("+")}>+</button>
        </div>
        <div>
          <button onClick={() => handleInput("4")}>4</button>
          <button onClick={() => handleInput("5")}>5</button>
          <button onClick={() => handleInput("6")}>6</button>
          <button onClick={() => handleInput("-")}>-</button>
        </div>
        <div>
          <button onClick={() => handleInput("1")}>1</button>
          <button onClick={() => handleInput("2")}>2</button>
          <button onClick={() => handleInput("3")}>3</button>
          <button onClick={() => handleInput("*")}>*</button>
        </div>
        <div>
          <button onClick={clearInput}>C</button>
          <button onClick={() => handleInput("0")}>0</button>
          <button onClick={equalsResult}>=</button>
          <button onClick={() => handleInput("/")}>/</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
