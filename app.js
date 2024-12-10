"use strict";
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let currentInput = "";
let resultDisplayed = false;
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.value;
        if (!isNaN(Number(value)) || value === "0" || value === "00" || value === ".") {
            // Handle numbers and decimal point
            if (resultDisplayed) {
                // If a result was just displayed, start fresh unless appending new numbers
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
                const result = calculate(currentInput); // Use the calculate function
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
            if (resultDisplayed) {
                // If a result was displayed, continue from the current result
                resultDisplayed = false;
            }
            currentInput += value; // Add operator
            display.value = currentInput;
        }
    });
});
function clearDisplay() {
    currentInput = "";
    display.value = "";
    resultDisplayed = false;
}
function calculate(expression) {
    // Replace invalid characters and prepare expression
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, "");
    try {
        // Use Function constructor for safer evaluation
        const result = new Function(`return ${sanitizedExpression}`)();
        if (typeof result === "number" && !isNaN(result)) {
            return result;
        }
        else {
            throw new Error("Invalid calculation");
        }
    }
    catch (_a) {
        throw new Error("Invalid expression");
    }
}
// IMAD UL ISLAM
