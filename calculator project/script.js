let input = document.getElementById('inputBox');
let button = document.querySelectorAll('button');
let string = "";
let arr = Array.from(button);

// Button click logic
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Keyboard input logic
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key === 'Enter') {
        e.preventDefault();
        string = eval(string);
        input.value = string;
    } else if (key === 'Escape') {
        string = "";
        input.value = string;
    } else if (key === 'Backspace') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } else if (/[0-9+\-*/.]/.test(key)) {
        string += key;
        input.value = string;
    }
});

function handleInput(value) {
    if (value == '=') {
        string = eval(string);
        input.value = string;
    } else if (value == 'AC') {
        string = "";
        input.value = string;
    } else if (value == 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } else {
        string += value;
        input.value = string;
    }
}