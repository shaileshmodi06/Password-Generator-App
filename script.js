let upperCaseLatters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerCaseLatters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "1234567890"; 
let symbols = "!@#$%^&*()-_{}[],.<>?/\\|~";

const sliderValue = document.getElementById("lengthVal");
const showPassword = document.getElementById("generatedPass");
const uppercaseCheck = document.getElementById("uppercaseCheckBox");
const lowercaseCheck = document.getElementById("lowercaseCheckBox");
const numericBoxCheck = document.getElementById("numericNumCheckBox");
const symbolBoxCheck = document.getElementById("symbolCheckBox");

let lengthVal = parseInt(sliderValue.textContent);

function onRangeChange(e) {
    lengthVal = e.value;
    sliderValue.textContent = lengthVal;
}
let totalCheck = 0;

function onGeneratePasswordClick() {
    let passwordArr = []; // Reset the password array
    let availableChars = ""; // A string of all selected character types

    // Add selected character types to the availableChars pool
    if (uppercaseCheck.checked) availableChars += upperCaseLatters;
    if (lowercaseCheck.checked) availableChars += lowerCaseLatters;
    if (numericBoxCheck.checked) availableChars += numbers;
    if (symbolBoxCheck.checked) availableChars += symbols;

    if (availableChars === "") {
        alert("Please select at least one character type!");
        return;
    }

    // Ensure password contains at least one character of each selected type
    if (uppercaseCheck.checked) passwordArr.push(randomChar(upperCaseLatters));
    if (lowercaseCheck.checked) passwordArr.push(randomChar(lowerCaseLatters));
    if (numericBoxCheck.checked) passwordArr.push(randomChar(numbers));
    if (symbolBoxCheck.checked) passwordArr.push(randomChar(symbols));

    // Fill the remaining password length with random characters from availableChars
    while (passwordArr.length < lengthVal) {
        passwordArr.push(randomChar(availableChars));
    }

    // Shuffle the password array to randomize character positions
    passwordArr = shuffleArray(passwordArr);

    // Convert the password array to a string
    const password = passwordArr.join("");
    showPassword.textContent = password;
}

function randomChar(charSet) {
    const randIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randIndex];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


function onCopyClick() {
    const copyText = showPassword.textContent; // Get the password text

    if (!copyText) {
        return;
    }

    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = copyText; // Set the value to the password
    document.body.appendChild(tempInput); // Add it to the DOM

    // Select and copy the text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
}