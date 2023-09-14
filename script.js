let operand1 = '';
let operand2 = '';
let currentOperator = null;
let screenClear = false;

let calculatorScreen = document.getElementById('calculator-screen');
let prevCalculatorScreen = document.getElementById('prev-calculator-screen');

let operatorButtons = document.querySelectorAll('.operator');
let numberButtons = document.querySelectorAll('.button');
let clearButton = document.querySelector('.all-clear');
let equalsButton = document.querySelector('.equal-sign');
let decimalButton = document.querySelector('.decimal');

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', calculation);
decimalButton.addEventListener('click', appendDecimal);


numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function clear(){
    clearScreen;
    calculatorScreen.textContent = 0;
    prevCalculatorScreen.textContent = 0;
    operand1 = '';
    operand2 = '';
    currentOperator = null;
}

function appendNumber(n) {
    if (calculatorScreen.textContent === '0' || screenClear)
        clearScreen()
    calculatorScreen.textContent += n;
}

function appendDecimal(){
    if (screenClear) clearScreen()
    if (calculatorScreen.textContent === '')
        calculatorScreen.textContent = 0;
    if (calculatorScreen.textContent.includes('.')) return
    calculatorScreen.textContent += '.';
}

function clearScreen() {
    calculatorScreen.textContent = ''
    screenClear = false
  }

function setOperation(operator) {
    if (currentOperator !== null) calculation;
    operand1 = calculatorScreen.textContent;
    currentOperator = operator;
    prevCalculatorScreen.textContent = `${calculatorScreen.textContent} ${operator}`;
    screenClear = true;
}

function calculation(){
    console.log(currentOperator);
    if (currentOperator === null || screenClear) return;
    if (currentOperator === '/' && calculatorScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    operand2 = calculatorScreen.textContent;
    calculatorScreen.textContent = Math.round(
        calculate() * 1000 
    ) / 1000
    prevCalculatorScreen.textContent = `${operand1} ${currentOperator} ${operand2} =`
    currentOperator = null
}

function calculate() {
    let [a, b] = [Number(operand1), Number(operand2)];
    switch (currentOperator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '/':
            if(a === 0 || b === 0) return null;
            return a / b;
        case '*':
            return a * b;
        default:
            return null;
    }
}
