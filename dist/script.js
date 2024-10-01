let currentInput = '';
let previousInput = '';
let operator = '';

let output_screen = document.getElementById('screen'); // Assuming you are using the screen element with ID 'screen'
const buttons = document.querySelectorAll('.row'); // Buttons for all operations and numbers
const equals = document.querySelector('.equals');  // Equals button

// Append number to the current input
function appendNumber(number) {
  if (currentInput.length < 12) {  // Limit to 12 digits to avoid overflow
    currentInput += number;
    updateScreen(currentInput);
  }
}

// Add operation logic
function addOperation(op) {
  if (currentInput === '') return; // Prevent operation if no number is entered
  if (previousInput !== '') calculate(); // Calculate if there's already a previous number
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function copyToClipboard() {
  const screen = document.getElementById('screen');

  // Select the text in the input
  screen.select();
  screen.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text to clipboard
  document.execCommand('copy');

  // Optional: Alert to confirm the action
  alert('Result copied to clipboard!');
}



// Clear screen
function clearScreen() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateScreen('0');
}

// Delete last digit
function deleteDigit() {
  currentInput = currentInput.slice(0, -1);
  updateScreen(currentInput === '' ? '0' : currentInput);
}

// Toggle sign of the current input
function toggleSign() {
  if (currentInput === '') return; // Prevent toggling if no number is entered
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateScreen(currentInput);
}

// Perform the calculation based on the current and previous input and operator
function calculate() {
  if (previousInput === '' || currentInput === '') return;
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }
  
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateScreen(currentInput);
}

// Update the calculator screen
function updateScreen(value) {
  output_screen.value = value;
}

// Add event listeners for all operator buttons
for (let btn of buttons) {
  for (let operator of btn.children) {
    operator.onclick = function(e) {
      let operator_value = e.target.innerHTML;

      switch (operator_value) {
        case '×':
          addOperation('*');
          break;
        case '÷':
          addOperation('/');
          break;
        case '−':
          addOperation('-');
          break;
        case 'log':
          currentInput = Math.log(parseFloat(currentInput)).toString();
          updateScreen(currentInput);
          break;
        case 'sin':
          currentInput = Math.sin(parseFloat(currentInput)).toString();
          updateScreen(currentInput);
          break;
        case 'cos':
          currentInput = Math.cos(parseFloat(currentInput)).toString();
          updateScreen(currentInput);
          break;
        case 'tan':
          currentInput = Math.tan(parseFloat(currentInput)).toString();
          updateScreen(currentInput);
          break;
        case 'random':
          currentInput = Math.round(Math.random() * 100).toString();
          updateScreen(currentInput);
          break;
        case '√':
          currentInput = Math.sqrt(parseFloat(currentInput)).toString();
          updateScreen(currentInput);
          break;
        case 'π':
          currentInput = (3.14159265359).toString();
          updateScreen(currentInput);
          break;
        case 'DEL':
          deleteDigit();
          break;
        case 'AC':
          clearScreen();
          break;
        case 'x!':
          let fact = 1;
          for (let i = 1; i <= parseInt(currentInput); i++) {
            fact *= i;
          }
          currentInput = fact.toString();
          updateScreen(currentInput);
          break;
        default:
          if (operator_value === '=') {
            calculate();
          } else {
            appendNumber(operator_value);
          }
      }
    };
  }
}

// Add event listener for the equals button to calculate the result
equals.addEventListener('click', () => {
  try {
    calculate();
  } catch (err) {
    updateScreen("Error");
  }
});
