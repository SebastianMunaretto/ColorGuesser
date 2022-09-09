const colorSquares = document.getElementsByClassName("color-square");
const colorCodeDisplay = document.getElementById("color-code-display");
const rgbButton = document.getElementById("rgb-button");
const hexButton = document.getElementById("hex-button");
const newButton = document.getElementById("new-button");
const resultDisplay = document.getElementById("result-display")

let gamemode = "rgb";
let metaColor = "";
let gameEnded = false;

function newGame() {

    gameEnded = false;

    resultDisplay.innerHTML = "";

    if (gamemode === "rgb") {
        metaColor = generateRandomRGBColor();

        // display color gets set
        colorCodeDisplay.innerHTML = metaColor

        for (let square of colorSquares) {
            square.innerHTML = "";
            square.style.backgroundColor = generateRandomRGBColor()
            addSquareListener(square)
        }

        // Color gets set that has to be guessed
        let solution = Math.round(Math.random() * 5);
        colorSquares[solution].style.backgroundColor = metaColor;
    } else {
        metaColor = generateRandomHEXColor().toUpperCase();


        // display color gets set
        colorCodeDisplay.innerHTML = metaColor

        for (let square of colorSquares) {
            square.innerHTML = "";
            square.style.backgroundColor = generateRandomHEXColor()
            addSquareListener(square)
        }

        // Color gets set that has to be guessed
        let solution = Math.round(Math.random() * 5);
        colorSquares[solution].style.backgroundColor = metaColor;

    }
}

function endGame() {
    gameEnded = true;
    for (let square of colorSquares) {
        if (gamemode === "rgb")
            square.innerHTML = rgbValuesToRgb(extractRGBValues(square.style.backgroundColor))
        else {
            square.innerHTML = rgbValuesToHex(extractRGBValues(square.style.backgroundColor))
        }
    }
}

/* Generates RGB values */

function generateRandomRGBColor() {
    return `rgb(${generateRGBColorValue()},${generateRGBColorValue()},${generateRGBColorValue()})`
}

function generateRGBColorValue() {
    return Math.round(Math.random() * 255);
}

/* Generate HEX values */

function generateRandomHEXColor() {
    const value = `#${generateHEXColorValue()}${generateHEXColorValue()}${generateHEXColorValue()}`;
    return value;
}

function generateHEXColorValue() {
    const rgbValue = Math.round(Math.random() * 255);
    if (rgbValue < 10) {
        let hexValue = "0" + rgbValue.toString(16);
        return hexValue;
    } else {
        let hexValue = rgbValue.toString(16);
        return hexValue;
    }
}

/* Toggles between RGB and HEX gamemode */

rgbButton.onclick = () => {
    if (rgbButton.style.backgroundColor != "green") {
        gamemode = "rgb";
        rgbButton.style.backgroundColor = "green";
        hexButton.style.backgroundColor = "red";
        newGame();
    }
}

hexButton.onclick = () => {
    if (hexButton.style.backgroundColor != "green") {
        gamemode = "hex";
        hexButton.style.backgroundColor = "green";
        rgbButton.style.backgroundColor = "red";
        newGame();
    }
}


// Defines if the game is won
function addSquareListener(square) {
    square.onclick = () => {
        if (!gameEnded) {
            // Color of the square you clicked on
            const values = extractRGBValues(square.style.backgroundColor);
            if (gamemode === "rgb") {
                if (metaColor === rgbValuesToRgb(values)) {
                    resultDisplay.innerHTML = "WIN!";
                    resultDisplay.style.color = "green";
                }
                else {
                    resultDisplay.innerHTML = "LOSE!";
                    resultDisplay.style.color = "red";
                }
            } else {
                if (metaColor === rgbValuesToHex(values)) {
                    resultDisplay.innerHTML = "WIN!";
                    resultDisplay.style.color = "green";
                }
                else {
                    resultDisplay.innerHTML = "LOSE!";
                    resultDisplay.style.color = "red";
                }
            }
        }
        endGame()
    }
}

function extractRGBValues(rgb) {
    return rgb.substring(4, rgb.length - 1)
        .replace(/ /g, '')
        .split(',');
}

function rgbValuesToHex(values) {
    // We need the conditions, because the .toString(16) method transforms numbers
    // less than 10 in (for example) 6 and not into 06
    return (`#${parseInt(values[0]) >= 10 ? parseInt(values[0]).toString(16) : "0" + parseInt(values[0]).toString(16)}${parseInt(values[1]) >= 10 ? parseInt(values[1]).toString(16) : "0" + parseInt(values[1]).toString(16)}${parseInt(values[2]) >= 10 ? parseInt(values[2]).toString(16) : "0" + parseInt(values[2]).toString(16)}`).toUpperCase();
}

function rgbValuesToRgb(values) {
    return "rgb(" + values[0] + "," + values[1] + "," + values[2] + ")";
}



// Starts new game
newButton.onclick = () => newGame();

newGame();