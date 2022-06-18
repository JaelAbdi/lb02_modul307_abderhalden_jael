// read form element
const form = document.getElementById('form');
const email = document.getElementById('email');
const passwort = document.getElementById('passwort');
const passwort2 = document.getElementById('passwort2');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');
const alter = document.getElementById('alter');
const telefonnummer = document.getElementById('telefonnummer');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email enthält einen Fehler');
    }
}

//Check Phonenumber
function checkNumber(input) {
    const re = /^0(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Fehlerhafte Telefonnummer');
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} Pflichtfeld`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} muss mind. ${min} Zeichen beinhalten`
        );
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} darf max. ${max} Zeichen beinhalten`
        );
    } else {
        showSuccess(input);
    }
}


//Validate password
function checkPasswort(input){

    const first = document.getElementById('passwort').value;
    const second = document.getElementById('passwort2').value;

    if(first == second){
        showSuccess(input);
    }
    else{
        showError(input,'Passwörter stimmen nicht überein!');
        showError(passwort2, 'Passwörter stimmen nicht überein!');
    }
}

//Age restriction
function checkAge(input){
    if (input.value >= 18){
        showSuccess(input);
    }
    else {
        showError(input,'Um sich registrieren zu können müssen sie Volljährig sein, min. 18 Jahre.')
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm(){
    if(!checkRequired([vorname, nachname, alter, telefonnummer, email, passwort, passwort2])){
        checkLength(passwort, 8, 35);
        checkPasswort(passwort2);
        checkEmail(email);
        checkAge(alter);
        checkNumber(telefonnummer);
        checkLength(vorname, 2,25);
        checkLength(nachname, 2, 25);
    }
}


// Event listeners
form.addEventListener('submit', function(e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});