// Get the display element where the calculator's output will be shown
let display = document.getElementById('display');

// Store the current input value, initialized to '0'
let currentInput = '0';

// Store the previous input value (before an operator is pressed)
let previousInput = '';

// Store the operator (+, -, *, /, ^) used for calculation
let operator = '';

// Flag to check if a result is displayed to reset the input for the next number
let isResultDisplayed = false;

// Store memory value for memory functions (M+, M-, MR, MC)
let memory = 0;

// Function to handle number inputs (0-9)
function inputNumber(num) {
    // If a result was just displayed, reset the current input with the new number
    if (isResultDisplayed) {
        currentInput = num;
        isResultDisplayed = false;
    } else {
        // If the current input is '0', replace it; otherwise, append the number
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay(); // Update the display with the new input
}

// Function to handle decimal point input
function inputDecimal() {
    // If a result was just displayed, reset input to '0.' to start a new decimal number
    if (isResultDisplayed) {
        currentInput = '0.';
        isResultDisplayed = false;
    } else if (!currentInput.includes('.')) {
        // If there's no decimal point yet, add one
        currentInput += '.';
    }
    updateDisplay(); // Update the display with the new input
}

// Function to clear the display and reset variables
function clearDisplay() {
    currentInput = '0';  // Reset current input
    previousInput = '';  // Clear previous input
    operator = '';       // Clear operator
    updateDisplay();     // Update display to show '0'
}

// Function to toggle the sign of the current input (+/-)
function toggleSign() {
    // If the input is positive, make it negative and vice versa
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    updateDisplay(); // Update display with the new sign
}

// Function to convert the current input into a percentage
function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString(); // Divide the input by 100
    updateDisplay(); // Update display with the percentage value
}

// Function to handle operator input (+, -, *, /, ^)
function operation(op) {
    // If an operator is already chosen and current input is not empty, calculate the result
    if (operator && currentInput !== '') {
        calculate();
    }
    previousInput = currentInput; // Store the current input as the previous input
    operator = op;                // Store the operator for future calculation
    currentInput = '';            // Reset the current input for the next number
}

// Function to calculate the result based on the chosen operator and inputs
function calculate() {
    // Ensure there's an operator and both previous and current inputs exist
    if (!operator || !previousInput || !currentInput) return;

    let result;
    let prev = parseFloat(previousInput);  // Convert previous input to a number
    let curr = parseFloat(currentInput);   // Convert current input to a number

    // Perform the operation based on the selected operator
    switch (operator) {
        case '+':
            result = prev + curr;  // Addition
            break;
        case '-':
            result = prev - curr;  // Subtraction
            break;
        case '*':
            result = prev * curr;  // Multiplication
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Error';  // Division (handle division by zero)
            break;
        case '^':
            result = Math.pow(prev, curr);  // Exponentiation (power)
            break;
        default:
            return;
    }

    // Store the result as the current input and reset the operator and previous input
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    isResultDisplayed = true;  // Flag that a result was just displayed
    updateDisplay();           // Update the display with the result
}

// Function to calculate the square root of the current input
function squareRoot() {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString(); // Calculate square root
    updateDisplay(); // Update the display with the square root value
}

// Function to input the value of Pi (π)
function pi() {
    currentInput = Math.PI.toString(); // Set the current input to Pi
    updateDisplay(); // Update the display with the value of Pi
}

// Memory Functions

// Function to add the current input to memory (M+)
function memoryAdd() {
    memory += parseFloat(currentInput); // Add the current input to the memory value
}

// Function to subtract the current input from memory (M-)
function memorySubtract() {
    memory -= parseFloat(currentInput); // Subtract the current input from the memory value
}

// Function to recall the memory value (MR) and display it
function memoryRecall() {
    currentInput = memory.toString(); // Set the current input to the memory value
    updateDisplay(); // Update the display with the memory value
}

// Function to clear the memory (MC)
function memoryClear() {
    memory = 0; // Reset memory to 0
}

// Function to update the calculator's display with the current input
function updateDisplay() {
    display.textContent = currentInput || '0'; // If input is empty, display '0'
}
