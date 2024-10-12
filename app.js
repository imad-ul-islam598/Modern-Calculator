"use strict";
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let currentInput = ""; // Store the current expression that the user inputs
let operator = ""; // Current operator (if any)
let resultDisplayed = false; // To check if the result is being displayed
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.value;
        if (!isNaN(Number(value)) || value === "0" || value === "00" || value === ".") {
            // Handle numbers and decimal point
            if (resultDisplayed) {
                // If a result was just displayed, start fresh
                currentInput = "";
                resultDisplayed = false;
            }
            currentInput += value;
            display.value = currentInput;
        }
        else if (value === "AC") {
            // Clear everything
            clearDisplay();
        }
        else if (value === "DEL") {
            // Delete last input
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
        else if (value === "=") {
            // Calculate result and display it
            try {
                const result = eval(currentInput); // Use eval to evaluate the string expression
                display.value = result.toString();
                currentInput = result.toString(); // Store result as the new current input
                resultDisplayed = true;
            }
            catch (error) {
                display.value = "Error";
                currentInput = "";
            }
        }
        else {
            // Handle operators (+, -, *, /, %)
            if (!resultDisplayed) {
                currentInput += ` ${value} `; // Add operator with spaces around it
                display.value = currentInput;
            }
        }
    });
});
function clearDisplay() {
    currentInput = "";
    operator = "";
    display.value = "";
    resultDisplayed = false;
}
