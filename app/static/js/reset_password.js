const regEx = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const fields = {
    email: false
};

const inputs = document.querySelectorAll('.form-card__input');
const form = document.getElementById('login-form');
const formGeneralError = document.getElementById('form-error');

inputs.forEach((input) =>
    input.addEventListener('input', (e) => {
        if (regEx[e.target.name].test(e.target.value.trim().replace(/\s\s+/g, ' '))) {
            e.target.parentElement.parentElement.classList.remove('form-card__group--incorrect');
            fields[e.target.name] = true;
        } else {
            e.target.parentElement.parentElement.classList.add('form-card__group--incorrect');
            fields[e.target.name] = false;
        }
    }),
);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let flag = Object.values(fields).every(field => field);

    if (!flag) {
        formGeneralError.classList.add('form-card__error--visible');
    } else {
        formGeneralError.classList.remove('form-card__error--visible');
        form.submit();
    }
});
