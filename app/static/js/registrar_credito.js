// Precios constantes
// Función para calcular el monto total
// Constantes de precios
const ADULT_PRICE = 1096000;
const CHILD_PRICE = 694000;
const COSTOS_CONSULARES = 832500;
const ANTICIPO = 385000;


document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los campos
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const amountInput = document.getElementById('amount');
    const interestRateInput = document.getElementById('interest_rate');
    const installmentsInput = document.getElementById('installments');
    const dateStartInput = document.getElementById('date_start');
    const modalidadSelect = document.getElementById('modalidad');
    
    // Establecer la fecha de hoy
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateStartInput.value = formattedDate;

    // Validar los valores iniciales
    fields.interest_rate = validateField('interest_rate', interestRateInput.value);
    fields.installments = validateField('installments', installmentsInput.value);
    fields.modalidad = modalidadSelect.value !== '';
    fields.date_start = dateStartInput.value !== '';

    // Listeners para los campos de adultos y niños
    adultsInput.addEventListener('input', calculateAmount);
    childrenInput.addEventListener('input', calculateAmount);

    // Calcular monto inicial
    calculateAmount();
});

const regEx = {
    amount: /^\d+$/,
    interest_rate: /^\d+([\,]\d{1,2})?$/,
    installments: /^\d+$/,
};

const fields = {
    adults: true,
    children: true,
    amount: true,
    interest_rate: false,
    installments: false,
    modalidad: false,
    date_start: false,
    credit_type: false
};

// Listener para el campo 'credit_type'
document.getElementById('credit_type').addEventListener('change', (e) => {
    fields.credit_type = e.target.value !== '';
    e.target.parentElement.classList.toggle('form-card__group--incorrect', !fields.credit_type);
    calculateAmount();
});

// Función para validar un campo específico
const validateField = (fieldName, value) => {
    if (!regEx[fieldName]) return true;
    return regEx[fieldName].test(value.toString().trim().replace(/\./g, ''));
};

// Función para formatear números
const formatNumber = (number) => {
    return number.toLocaleString('es-CO');
};


const calculateAmount = () => {
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const children = parseInt(document.getElementById('children').value) || 0;
    const creditType = document.getElementById('credit_type').value;
    const serviceCost = (adults * ADULT_PRICE) + (children * CHILD_PRICE);
    let totalAmount = 0;
    const totalPeople = adults + children;

    if (creditType === 'consular') {
        // Se suma el costo consular menos el anticipo por persona: 832500 - 385000 = 447500
        totalAmount = serviceCost + (totalPeople * 832500);
    } else {
        // Crédito normal: se descuenta 100000 por persona
        totalAmount = serviceCost;
    }
    
    document.getElementById('amount').value = formatNumber(totalAmount);
    calculateProfit();
};


// Función para validar entrada de tasa de interés
function validateInterestRateInput(input) {
    input.value = input.value.replace('.', ',');
    
    if ((input.value.match(/,/g) || []).length > 1) {
        input.value = input.value.replace(/,([^,]*)$/, '$1');
    }
    
    input.value = input.value.replace(/[^0-9,]/g, '');
}

// Función para prevenir caracteres inválidos
function preventInvalidChars(e) {
    if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+' || e.key === '.') {
        e.preventDefault();
    }
}

// Función para calcular ganancia y cuota
const calculateProfit = () => {
    const amount = parseInt(document.getElementById('amount').value.replace(/\./g, ''), 10);
    const interestRate = parseFloat(document.getElementById('interest_rate').value.replace(',', '.')) / 100;
    const installments = parseInt(document.getElementById('installments').value, 10);

    if (amount > 0 && installments > 0) {
        let cuota;
        let totalGanancia;

        if (interestRate > 0) {
            cuota = (amount * interestRate * Math.pow(1 + interestRate, installments)) / 
                    (Math.pow(1 + interestRate, installments) - 1);
            totalGanancia = Math.round((cuota * installments) - amount);
        } else {
            cuota = amount / installments;
            totalGanancia = 0;
        }

        const valor_cuota = Math.round(cuota);

        document.getElementById('valor_cuota').value = formatNumber(valor_cuota);
        document.getElementById('profit').value = formatNumber(totalGanancia);
    } else {
        document.getElementById('valor_cuota').value = '';
        document.getElementById('profit').value = '';
    }
};

// Agregar event listeners para campos editables
const inputs = document.querySelectorAll('.form-card__input');
inputs.forEach((input) => {
    if (input.type !== 'hidden' && !input.readOnly) {
        input.addEventListener('input', (e) => {
            const { name, value } = e.target;

            if (name === 'adults' || name === 'children') {
                const numValue = parseInt(value) || 0;
                if (numValue < 0) {
                    e.target.value = 0;
                }
                fields[name] = true;
                calculateAmount();
                return;
            }

            if (name === 'interest_rate') {
                e.target.value = e.target.value.replace('.', ',');
            }

            if (name === 'installments') {
                const numValue = parseInt(value);
                if (numValue <= 0) {
                    e.target.parentElement.classList.add('form-card__group--incorrect');
                    fields[name] = false;
                    return;
                }
            }

            if (regEx[name] && regEx[name].test(value.trim().replace(/\./g, ''))) {
                e.target.parentElement.classList.remove('form-card__group--incorrect');
                fields[name] = true;
                calculateProfit();
            } else {
                e.target.parentElement.classList.add('form-card__group--incorrect');
                fields[name] = false;
            }
        });
    }
});

// Event listeners para modalidad y fecha
document.getElementById('modalidad').addEventListener('change', (e) => {
    fields.modalidad = e.target.value !== '';
    e.target.parentElement.classList.toggle('form-card__group--incorrect', !fields.modalidad);
});

document.getElementById('date_start').addEventListener('input', (e) => {
    fields.date_start = e.target.value !== '';
    e.target.parentElement.classList.toggle('form-card__group--incorrect', !fields.date_start);
});

// Prevenir caracteres inválidos en campos numéricos
document.getElementById('interest_rate').addEventListener('keydown', preventInvalidChars);

// Validación del formulario
const form = document.getElementById('register-form');
const formGeneralError = document.getElementById('form-error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const children = parseInt(document.getElementById('children').value) || 0;
    
    if (adults === 0 && children === 0) {
        formGeneralError.classList.add('form-card__error--visible');
        formGeneralError.textContent = 'Debe ingresar al menos un pasajero.';
        return;
    }

    let isValid = true;
    
    // Verificar todos los campos
    Object.entries(fields).forEach(([fieldName, isValidField]) => {
        const input = document.querySelector(`[name="${fieldName}"]`) || document.getElementById(fieldName);
        if (!isValidField && input) {
            isValid = false;
            input.parentElement.classList.add('form-card__group--incorrect');
        }
    });

    if (!isValid) {
        formGeneralError.classList.add('form-card__error--visible');
        formGeneralError.textContent = 'Por favor, complete todos los campos correctamente.';
        return;
    }

    formGeneralError.classList.remove('form-card__error--visible');
    form.submit();
});