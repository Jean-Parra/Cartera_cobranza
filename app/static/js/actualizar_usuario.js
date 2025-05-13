// Expresiones regulares para validaciones
const regEx = {
    'nombre_completo': /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/, // Letras y espacios, de 2 a 50 caracteres
    'cedula': /^\d{5,15}$/, // Solo números, entre 5 y 15 dígitos
    'direccion': /^.{5,100}$/, // Cualquier carácter, de 5 a 100 caracteres
    'celular': /^\+?[0-9\s\-]{7,20}$/,
    'correo': /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // Formato de correo
};

// Estado inicial de validación para cada campo
const fields = {
    'nombre_completo': false,
    'cedula': false,
    'direccion': false,
    'celular': false,
    'correo': false
};

// Selección de elementos del DOM
const inputs = document.querySelectorAll('.form-card__input');
const form = document.getElementById('register-form');
const formGeneralError = document.getElementById('form-error');
// Validaciones iniciales
inputs.forEach((input) => {
    const fieldName = input.name;

    if (regEx[fieldName]) { // Verificar que el campo tenga una expresión regular asociada
        const value = input.value.trim();

        if (regEx[fieldName].test(value)) {
            input.parentElement.classList.remove('form-card__group--incorrect');
            fields[fieldName] = true;
        } else {
            input.parentElement.classList.add('form-card__group--incorrect');
            fields[fieldName] = false;
        }
    }
});

// Validación en tiempo real
inputs.forEach((input) =>
    input.addEventListener('input', (e) => {
        const fieldName = e.target.name;

        if (regEx[fieldName]) {
            const value = e.target.value.trim();

            if (regEx[fieldName].test(value)) {
                e.target.parentElement.classList.remove('form-card__group--incorrect');
                fields[fieldName] = true;
            } else {
                e.target.parentElement.classList.add('form-card__group--incorrect');
                fields[fieldName] = false;
            }
        }
    })
);

// Validación al enviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = Object.values(fields).every((field) => field);

    if (allValid) {
        formGeneralError.classList.remove('form-card__error--visible');
        form.submit(); // Enviar el formulario
    } else {
        formGeneralError.classList.add('form-card__error--visible');
    }
});
