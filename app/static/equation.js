document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("equationForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        calculateRoots();
    });
});

function calculateRoots() {
    const functionInput = document.getElementById("functionInput").value.trim();
    const resultElement = document.getElementById("result");

    try {
        const preprocessedInput = preprocessInput(functionInput);

        // Calculate roots using math.js
        const roots = findRoots(preprocessedInput);
        
        // Display roots in the desired format
        const rootsString = roots.map(root => `(x - ${root})`).join('');
        resultElement.textContent = `Roots: ${rootsString}`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
}

function findRoots(functionInput) {
    try {
        // Convert the function to a polynomial
        const parsedExpression = math.parse(functionInput).toString();
        console.log(parsedExpression);

        // Extract coefficients
        const coefficients = getCoefficients(parsedExpression);
        console.log(coefficients);

        // Find roots using the coefficients
        const roots = math.polynomialRoot(coefficients);

        // Return the roots
        return roots;
    } catch (error) {
        // If an error occurs, return an empty array or handle it accordingly
        console.error('Error finding roots:', error);
        return [];
    }
}

function getCoefficients(expression) {
    if (!expression || !expression.args) {
        console.error('Expression or expression.args is undefined.');
        return [];
    }
    // Initialize an array to store the coefficients
    const coefficients = [];

    // Iterate over the terms of the polynomial in descending order
    for (let i = expression.args.length - 1; i >= 0; i--) {
        // Get the coefficient of each term
        const term = expression.args[i];

        // If the term is a constant (no variable), set its coefficient to the term's value
        const coefficient = term.isConstantNode ? term.valueOf() : 1;

        // Add the coefficient to the array
        coefficients.push(coefficient);
    }

    // Return the array of coefficients
    return coefficients;
}


function preprocessInput(expression) {
    expression = expression.replace(/\(/g, '*(').replace(/\)/g, ')*');
    expression = expression.replace(/([0-9a-zA-Z])x/g, '$1*x');

    return expression;
}
