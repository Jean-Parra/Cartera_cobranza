const regEx = {
    'email': /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const fields = {
    'email': false,
    'password': false,
    'password-2': false,
};

const inputs = document.querySelectorAll('.form-card__input');
const form = document.getElementById('register-form');
const formGeneralError = document.getElementById('form-error');
const alerta = document.getElementById('alerta');

const password = document.getElementById('password');
const password2 = document.getElementById('password-2');

const updateFieldStatus = (input, isValid) => {
    console.log(`Updating status for ${input.name}: ${isValid}`);
    if (isValid) {
        input.parentElement.classList.remove('form-card__group--incorrect');
    } else {
        input.parentElement.classList.add('form-card__group--incorrect');
    }
};

// Add event listeners for input fields
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const { name, value } = e.target;

        console.log(`Input changed: ${name} = ${value}`);

        if (name === 'password') {
            // Reset the state of password-2 when password changes
            updateFieldStatus(password2, false);
            fields['password-2'] = false;
            // Additional step: Always update password field to true
            fields['password'] = true;
        }

        if (name === 'password-2') {
            // Validate that password-2 is equal to password
            const isValid = value === password.value;
            fields[name] = isValid;
            fields['password'] = isValid;  // Ensure both fields are updated together
            updateFieldStatus(e.target, isValid);
        } else if (regEx[name]) {
            // Validate other fields with regular expressions
            const isValid = regEx[name].test(value.trim().replace(/\s\s+/g, ' '));
            fields[name] = isValid;
            updateFieldStatus(e.target, isValid);
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let flag = true;

    console.log('Validating form submission...');

    // Check if all fields are valid
    for (const key in fields) {
        console.log(`Field ${key} is valid: ${fields[key]}`);
        if (!fields[key]) {
            formGeneralError.classList.add('form-card__error--visible');
            flag = false;
            break;
        }
    }

    console.log(`Form is ${flag ? 'valid' : 'invalid'}`);

    // Toggle the visibility of the alert based on the form validity
    if (flag) {
        formGeneralError.classList.remove('form-card__error--visible');
        alerta.classList.add('invisible'); // Hide the alert
        form.submit(); // Submit the form
    } else {
        alerta.classList.remove('invisible'); // Show the alert
    }
});
