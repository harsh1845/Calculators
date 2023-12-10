function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    const display = document.getElementById('display');

    if (value === '(' || value === ')') {
        display.value += ' ' + value + ' ';
    } else {
        display.value += value;
    }
}

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value.trim(); 

    if (expression !== '') {
        try {
            display.value = eval(expression);
        } catch (error) {
            display.value = 'Error';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value') || this.textContent;
            handleButtonClick(value);
            event.stopPropagation();
        });
    });

    document.addEventListener('keydown', function (event) {
        const key = event.key;
        const ctrlKey = event.ctrlKey || event.metaKey;

        if (key === 'Backspace' && !ctrlKey) {
            handleButtonClick('Backspace');
        } else if ((key === 'Backspace' || key === 'Delete') && ctrlKey) {
            handleButtonClick('CtrlBackspace');
        } else if (key === 'Enter') {
            handleButtonClick('=');
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '(', ')'].includes(key)) {
            handleButtonClick(key);
        }
    });
});

function handleButtonClick(value) {
    const display = document.getElementById('display');

    switch (value) {
        case 'C':
            clearDisplay();
            break;
        case '=':
            calculate();
            break;
        case 'Backspace':
            display.value = display.value.slice(0, -1);
            break;
        case 'CtrlBackspace':
            clearDisplay();
            break;
        default:
            if (value instanceof Event) {
                value = value.target.getAttribute('data-value');
            }
            appendToDisplay(value);
    }
}
