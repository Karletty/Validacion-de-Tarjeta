const button = document.querySelector(".verify-button");
const errorMessage = document.getElementById("error-message");
let CNumber = [];
let CNisnumber = [];
let isnumber = false;
let sumDigits = 0;
button.addEventListener("click", function() {
    let creditnumber = document.querySelector(".creditnumber").value;
    creditnumber = creditnumber.trim();
    numberComprobant(creditnumber);
});


function numberComprobant(credit) {
    if (credit.length === 0) {
        errorMessage.innerText = "You don't enter any digits, try again";
    } else {
        if (credit.length != 16) {
            errorMessage.innerText = "You have to enter exactly 16 digits , try again";
        } else {
            numberTurn(credit);

        }
    }
}

function numberTurn(creditnumber) {
    for (i = 0; i < creditnumber.length; i++) {
        CNumber[i] = parseInt(creditnumber.charAt(i), 10);
        for (j = 0; j <= 9; j++) {
            if (CNumber[i] === j) {
                isnumber = isnumber | true;
            }
        }
        CNisnumber[i] = isnumber;
        isnumber = false;
    }
    verify(CNisnumber)

}

function verify(CNisnumber) {
    isnumber = true;
    for (i = 0; i <= CNumber.length; i++) {
        if (CNisnumber[i] === false) {
            errorMessage.innerText = "You entered a non-numeric digit,try again";
            isnumber = isnumber & false;
            break;
        } else {
            isnumber = isnumber & true;
        }
    }
    if (isnumber) {
        changePage();
        evalue(CNumber);

    }
}

function changePage() {
    let x = document.getElementById("info");
    let y = document.getElementById("check");
    let z = document.getElementById("verify");
    if (x.style.display === "none") {
        x.style.display = "flex";
        y.style.display = "flex";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "flex";
    }
}
//Por aca voy xddddd
function evalue(CNumber) {
    let CNew = [];
    for (let i = 0; i < 16; i++) {
        if ((i % 2) === 0) {
            CNew[i] = CNumber[i] * 2;
        } else {
            CNew[i] = CNumber[i]
        }
    }
    for (let j = 0; j < 16; j++) {
        if (CNew[j] > 9) {
            CNew[j] = 1 + (CNew[j] - 10);
        }
    }

    for (k = 0; k < 16; k++) {
        sumDigits = sumDigits + CNew[k];
    }
    changeImageText(sumDigits)

}

function changeImageText(sumDigits) {
    const verifyMessage = document.getElementById("verify-message");
    const verifyImage = document.querySelector(".image");
    convertNumber(CNumber);
    let text = " "
    for (i = 0; i < 16; i++) {
        text = text + CNumber[i]
    }
    if ((sumDigits % 10) === 0) {
        verifyMessage.innerText = "Your card" + text + " has been recognized correctly";
        verifyImage.src = "true.png";
        verifyImage.alt = "correct";

    } else {
        verifyMessage.innerText = "Your card" + text + " has not been recognized";
        verifyImage.src = "false.png";
        verifyImage.alt = "incorrect";
    }
}

function convertNumber(CNumber) {
    for (i = 0; i < 16; i++) {
        if (i < 12) {
            CNumber[i] = "#";
        }
    }
}