let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let isResultDisplayed = false;
let memory = 0;

function inputNumber(num) {
    if (isResultDisplayed) {
        currentInput = num;
        isResultDisplayed = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (isResultDisplayed) {
        currentInput = '0.';
        isResultDisplayed = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function toggleSign() {
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    updateDisplay();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function operation(op) {
    if (operator && currentInput !== '') {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    currentInput = '';
}

function calculate() {
    if (!operator || !previousInput || !currentInput) return;

    let result;
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Error';
            break;
        case '^':
            result = Math.pow(prev, curr);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    isResultDisplayed = true;
    updateDisplay();
}

function squareRoot() {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}

function pi() {
    currentInput = Math.PI.toString();
    updateDisplay();
}

function memoryAdd() {
    memory += parseFloat(currentInput);
}

function memorySubtract() {
    memory -= parseFloat(currentInput);
}

function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay();
}

function memoryClear() {
    memory = 0;
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}
