let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;
let expressionDisplay = '';

function appendNumber(value) {
  if (currentInput === '0' && value === '0') return;
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }

  expressionDisplay += value;
  display.textContent = expressionDisplay;
}

function appendDecimalPoint() {
  if (currentInput.includes('.')) return;
  currentInput += '.';
  expressionDisplay += '.';
  display.textContent = expressionDisplay;
}

function appendOperator(op) {
  if (currentInput === '' && op !== '.') return;

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    calculateResult();
    firstOperand = parseFloat(currentInput);
  }

  let displayOperatorSymbol = op;
  if (op === '/') {
    displayOperatorSymbol = '÷';
  } else if (op === '*') {
    displayOperatorSymbol = 'x';
  }

  if (firstOperand !== null) {
    expressionDisplay += ` ${displayOperatorSymbol} `;
    display.textContent = expressionDisplay;
  }

  operator = op;
  currentInput = '';
}

function calculateResult() {
  if (operator === null || firstOperand === null) return;

  let secondOperand = parseFloat(currentInput);
  if (isNaN(secondOperand)) return;

  expressionDisplay += ` ${secondOperand} =`;
  display.textContent = expressionDisplay;

  let result;

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        display.textContent = 'Erro: Divisão por Zero';
        expressionDisplay = '';
        currentInput = '';
        firstOperand = null;
        operator = null;
        return;
      }
      result = firstOperand / secondOperand;
      break;
    case '%':
      result = firstOperand % secondOperand;
      break;
    default:
      return;
  }

  currentInput = String(result);
  expressionDisplay = String(result);
  display.textContent = expressionDisplay;
  firstOperand = result;
  operator = null;
}

function clearDisplay() {
  currentInput = '';
  expressionDisplay = '';
  display.textContent = '0';
  firstOperand = null;
  operator = null;
}

document.querySelectorAll('.light-gray').forEach((button) => {
  if (button.textContent === '.') {
    button.onclick = appendDecimalPoint;
  } else if (button.textContent === 'C') {
    button.onclick = clearDisplay;
  }
});

document.querySelectorAll('.dark-gray').forEach((button) => {
  if (!isNaN(parseInt(button.textContent))) {
    button.onclick = () => appendNumber(button.textContent);
  }
});

document.querySelectorAll('.orange').forEach((button) => {
  if (button.textContent === '=') {
    button.onclick = calculateResult;
  } else if (['÷', 'x', '-', '+', '%'].includes(button.textContent)) {
    let operatorValue;
    if (button.textContent === '÷') {
      operatorValue = '/';
    } else if (button.textContent === 'x') {
      operatorValue = '*';
    } else {
      operatorValue = button.textContent;
    }
    button.onclick = () => appendOperator(operatorValue);
  }
});
