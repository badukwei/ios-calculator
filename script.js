const display = document.querySelector(".result");

// Buttons
const numbers = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const negative = document.querySelector(".negative");
const percentage = document.querySelector(".percentage");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");

// State
let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let resultValue = 0;

// Add event listeners for number buttons
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const value = e.target.getAttribute("value");
    if (!currentOperator) {
      updateFirstOperand(value);
    } else {
      updateSecondOperand(value);
    }
  });
});

// Update first operand value
function updateFirstOperand(value) {
  if (
    (firstOperand.includes(".") && value === ".") ||
    firstOperand.length >= 8
  ) {
    display.innerHTML = firstOperand;
    return;
  }

  if (value === ".") {
    firstOperand = firstOperand ? firstOperand + value : "0.";
  } else {
    firstOperand = firstOperand === "0" ? value : firstOperand + value;
  }

  display.innerHTML = firstOperand;
}

// Update second operand value
function updateSecondOperand(value) {
  if (firstOperand && currentOperator) {
    if (
      (secondOperand.includes(".") && value === ".") ||
      secondOperand.length >= 8
    ) {
      display.innerHTML = secondOperand;
      return;
    }

    if (value === ".") {
      secondOperand = secondOperand ? secondOperand + value : "0.";
    } else {
      secondOperand = secondOperand === "0" ? value : secondOperand + value;
    }

    display.innerHTML = secondOperand;
  }
}

// Assign operator when an operator button is clicked
function assignOperator() {
  operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
      currentOperator = e.target.getAttribute("value");
    });
  });
}

assignOperator();

// Calculate result and display it
equal.addEventListener("click", () => {
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);

  switch (currentOperator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "*":
      resultValue = firstOperand * secondOperand;
      break;
    case "/":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      resultValue = firstOperand;
  }

  displayResult(resultValue);
  resetState();
});

// Display result and limit its length
function displayResult(resultValue) {
  const maxLength = 8;
  const resultString = resultValue.toString();

  if (resultString.length > maxLength) {
    const precision = resultString.includes('.') ? maxLength - 1 : 3;
    display.innerHTML = parseFloat(resultValue).toPrecision(precision);
  } else {
    display.innerHTML = resultValue;
  }
}


// Reset calculator state
function resetState() {
  firstOperand = `${resultValue}`;
  secondOperand = "";
  currentOperator = "";
}

// Negate the value
negative.addEventListener("click", () => {
  if (firstOperand && !secondOperand && !currentOperator) {
    firstOperand = -firstOperand;
    resultValue = firstOperand;
  } else if (firstOperand && secondOperand && currentOperator) {
    secondOperand = -secondOperand;
    resultValue = secondOperand;
  }
  displayResult(resultValue);
});

// Convert to percentage
percentage.addEventListener("click", () => {
  if (firstOperand && !secondOperand && !currentOperator) {
    firstOperand /= 100;
    resultValue = firstOperand;
  } else if (firstOperand && secondOperand && currentOperator) {
    secondOperand /= 100;
    resultValue = secondOperand;
  }
  displayResult(resultValue);
});

// Clear calculator state and display
clear.addEventListener("click", () => {
  display.innerHTML = "0";

  firstOperand = "";
  secondOperand = "";
  currentOperator = "";
  resultValue = 0;
});

