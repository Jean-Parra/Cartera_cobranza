// Expresiones regulares para validaciones
const regEx = {
    'nombre_completo': /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/, // Letras y espacios, de 2 a 50 caracteres
    'cedula': /^\d{5,15}$/, // Solo números, entre 5 y 15 dígitos
    'direccion': /^.{5,100}$/, // Cualquier carácter, de 5 a 100 caracteres
    'celular': /^\d{10}$/, // Solo números, exactamente 10 dígitos
    'correo': /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // Formato de correo

};

// Estado inicial de validación para cada campo
const fields = {
    'nombre_completo': false,
    'cedula': false,
    'direccion': false,
    'celular': false,
    'correo': false,

};

// Selección de elementos del DOM
const inputs = document.querySelectorAll('.form-card__input');
const form = document.getElementById('register-form');
const formGeneralError = document.getElementById('form-error');


// Función para manejar eventos de validación
// Modificar el event listener para inputs
inputs.forEach((input) =>
    input.addEventListener('input', (e) => {
        const fieldName = e.target.name;
        const errorElement = document.getElementById(`error-${fieldName}`);
        
        
        const value = e.target.value.trim();
        if (regEx[fieldName].test(value)) {
            e.target.parentElement.classList.remove('form-card__group--incorrect');
            errorElement.style.display = 'none';
            fields[fieldName] = true;
        } else {
            e.target.parentElement.classList.add('form-card__group--incorrect');
            errorElement.style.display = 'block';
            fields[fieldName] = false;
        }
    
    })
);


// Validar campos vacíos al enviar
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;

    for (const key in fields) {
        const errorElement = document.getElementById(`error-${key}`);
        
        if (!fields[key]) {
            errorElement.style.display = 'block';
            allValid = false;
        }
    }

    if (allValid) {
        formGeneralError.classList.remove('form-card__error--visible');
        form.submit();
    } else {
        formGeneralError.classList.add('form-card__error--visible');
    }
});
