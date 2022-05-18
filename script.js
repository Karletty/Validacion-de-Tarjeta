const verifyButton = document.querySelector(".button-indication");
const returnButton = document.querySelector(".return-button");
const errorMessage = document.getElementById("error-message");
const creditInput = document.querySelector(".creditnumber");
const txtLabel = document.querySelector(".text-label");

verifyButton.addEventListener("click", function () {
    lenghtComprobant();
});

creditInput.addEventListener("keypress", function (event) {
    if (creditInput.value.length > 0) {
        txtLabel.classList.add("hover");
        console.log("MAYOR")
    }
    else
        txtLabel.classList.remove("hover");
    let keycode = event.keyCode;
    if (keycode === 13) {
        lenghtComprobant();
    }
    if (keycode !== 8) {
        putHyphen();
    }
});

returnButton.addEventListener("click", function () {
    changePage();
});

function putHyphen() {
    let size = Array.from(creditInput.value);
    size = size.length;
    for (let i = 0; i < 20; i += 5) {
        if (size === (i - 1)) {
            creditInput.value += "-"
        }
    }
}

function lenghtComprobant() {
    let userCreditNumber = document.querySelector(".creditnumber").value;
    userCreditNumber = userCreditNumber.trim();
    userCreditNumber = userCreditNumber.replaceAll("-", "");
    if (userCreditNumber.length === 0) {
        errorMessage.innerText = "You don't enter any digits, try again";
    } else {
        if (userCreditNumber.length != 16) {
            errorMessage.innerText = "You have to enter exactly 16 digits , try again";
        } else {
            verifyIsNumber(userCreditNumber);
        }
    }
}

function verifyIsNumber(userCreditNumber) {
    let creditIsNumber = [];
    let digitIsNumber = false;
    let transformedCreditNumber = [];
    for (i = 0; i < userCreditNumber.length; i++) {
        transformedCreditNumber[i] = parseInt(userCreditNumber.charAt(i), 10);
        for (j = 0; j <= 9; j++) {
            if (transformedCreditNumber[i] === j) {
                digitIsNumber = digitIsNumber | true;
            }
        }
        creditIsNumber[i] = digitIsNumber;
        digitIsNumber = false;
    }
    actionIfNumber(creditIsNumber, transformedCreditNumber);
}

function actionIfNumber(creditIsNumber, transformedCreditNumber) {
    let digitsAreNumber = true;
    for (i = 0; i <= creditIsNumber.length; i++) {
        if (creditIsNumber[i] === false) {
            errorMessage.innerText = "You entered a non-numeric digit,try again";
            digitsAreNumber = digitsAreNumber & false;
            break;
        } else {
            digitsAreNumber = digitsAreNumber & true;
        }
    }
    if (digitsAreNumber) {
        changePage();
        evalueNumber(transformedCreditNumber);
    }
}

function evalueNumber(transformedCreditNumber) {
    let sumDigits = 0;
    let newTransformedCreditNumber = [];
    for (let i = 0; i < 16; i++) {
        if ((i % 2) === 0) {
            newTransformedCreditNumber[i] = transformedCreditNumber[i] * 2;
        } else {
            newTransformedCreditNumber[i] = transformedCreditNumber[i];
        }
    }
    for (let j = 0; j < 16; j++) {
        if (newTransformedCreditNumber[j] > 9) {
            newTransformedCreditNumber[j] = 1 + (newTransformedCreditNumber[j] - 10);
        }
    }
    for (k = 0; k < 16; k++) {
        sumDigits = sumDigits + newTransformedCreditNumber[k];

    }
    changeImageText(sumDigits, transformedCreditNumber);
}

function changePage() {
    const checkDiv = document.querySelector('.check');
    const verifyDiv = document.querySelector(".verify");
    if (checkDiv.classList.contains("hide")) {
        checkDiv.classList.remove("hide");
        verifyDiv.classList.add("hide");
    } else {
        checkDiv.classList.add("hide");
        verifyDiv.classList.remove("hide");
        errorMessage.innerText = "";
    }
}

function changeImageText(sumDigits, transformedCreditNumber) {
    const verifyMessage = document.getElementById("verify-message");
    const verifyImage = document.querySelector(".verify-image");
    hideNumber(transformedCreditNumber);
    let text = " "
    for (i = 0; i < 16; i++) {
        text = text + transformedCreditNumber[i]
    }
    if ((sumDigits % 10) === 0) {
        verifyMessage.innerText = "Your card" + text + " has been recognized correctly";
        verifyImage.src = "images/true.png";
        verifyImage.alt = "correct";

    } else {
        verifyMessage.innerText = "Your card" + text + " has not been recognized";
        verifyImage.src = "images/false.png";
        verifyImage.alt = "incorrect";
        cleanCreditNumber(transformedCreditNumber);
    }

}

function cleanCreditNumber() {
    creditInput.value = "";
}

function hideNumber(transformedCreditNumber) {
    for (i = 0; i < 16; i++) {
        if (i < 12) {
            transformedCreditNumber[i] = "#";
        }
    }
}