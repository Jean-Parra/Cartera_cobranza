document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los campos
    const amountInput = document.getElementById('amount');
    const interestRateInput = document.getElementById('interest_rate');
    const installmentsInput = document.getElementById('installments');

    // Función para formatear el monto con separadores de miles
    const formatNumber = (number) => {
        return number.toLocaleString('es-CO'); // Formato para Colombia
    };

    // Validar y formatear los valores iniciales
    if (amountInput && amountInput.value) {
        const rawValue = parseInt(amountInput.value.replace(/\./g, ''), 10); // Remover puntos
        if (!isNaN(rawValue)) {
            amountInput.value = formatNumber(rawValue);
            fields.amount = true; // Marcar como válido
        }
    }

    if (interestRateInput && interestRateInput.value) {
        interestRateInput.value = interestRateInput.value.replace('.', ','); // Reemplazar punto por coma
        if (regEx.interest_rate.test(interestRateInput.value)) {
            fields.interest_rate = true; // Marcar como válido
        }
    }

    if (installmentsInput && installmentsInput.value) {
        const rawValue = parseInt(installmentsInput.value.replace(/\./g, ''), 10); // Remover puntos
        if (!isNaN(rawValue)) {
            installmentsInput.value = formatNumber(rawValue);
            fields.installments = true; // Marcar como válido
        }
    }

    // Si todos los campos necesarios tienen valores válidos, calcular ganancias y cuota
    if (fields.amount && fields.interest_rate && fields.installments) {
        calculateProfit();
    }
});


const regEx = {
    amount: /^\d+$/, // Solo números enteros positivos
    interest_rate: /^\d+([\,]\d{1,2})?$/, // Decimal con coma, máximo 2 decimales
    installments: /^\d+$/, // Solo números enteros positivos
};

const fields = {
    amount: false,
    interest_rate: false,
    installments: false,
    modalidad: false,
    date_start: false,  // Nueva validación para la fecha
};

const inputs = document.querySelectorAll('.form-card__input');
const select = document.getElementById('modalidad');
const dateStartInput = document.getElementById('date_start'); // Nuevo campo de fecha
const form = document.getElementById('register-form');
const formGeneralError = document.getElementById('form-error');
const interestRateInput = document.getElementById('interest_rate');

// Función para formatear números con separador de miles
const formatNumber = (number) => {
    return number.toLocaleString('es-CO'); // Formato para Colombia
};

// Recalcular ganancia
const calculateProfit = () => {
    const amount = parseInt(document.getElementById('amount').value.replace(/\./g, ''), 10);
    const interestRate = parseFloat(document.getElementById('interest_rate').value.replace(',', '.')) / 100; // Convertir coma a punto
    const installments = parseInt(document.getElementById('installments').value, 10);

    if (amount > 0 && installments > 0) {
        let cuota;
        let totalGanancia;

        if (interestRate > 0) {
            // Fórmula para calcular la cuota con interés compuesto
            cuota = (amount * interestRate * Math.pow(1 + interestRate, installments)) / 
                    (Math.pow(1 + interestRate, installments) - 1);
            totalGanancia = Math.round((cuota * installments) - amount);
        } else {
            // Caso especial para tasa de interés 0%
            cuota = amount / installments;
            totalGanancia = 0; // Sin ganancia si la tasa de interés es 0
        }

        const valor_cuota = Math.round(cuota); // Redondea a entero

        // Actualiza los valores en el HTML
        const valor_cuota_input = document.getElementById('valor_cuota');
        const profitInput = document.getElementById('profit'); // Campo para ganancia

        if (valor_cuota_input) {
            valor_cuota_input.value = formatNumber(valor_cuota); // Asigna el valor con formato
        }

        if (profitInput) {
            profitInput.value = formatNumber(totalGanancia); // Asigna el valor con formato
        }


    } else {
        // Limpia los campos si hay un error en los datos de entrada
        const valor_cuota_input = document.getElementById('valor_cuota');
        const profitInput = document.getElementById('profit');
        if (valor_cuota_input) valor_cuota_input.value = '';
        if (profitInput) profitInput.value = '';
    }
};


// Validación de campos
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const { name, value } = e.target;

        if (name === 'interest_rate') {
            // Reemplazar punto por coma
            e.target.value = e.target.value.replace('.', ',');
        }

        const numericValue = parseInt(value.replace(/\./g, ''), 10); // Convertir a número

        if (name === 'installments') {
            // Validar que las cuotas sean mayores a 0
            if (numericValue <= 0) {
                e.target.parentElement.classList.add('form-card__group--incorrect');
                fields[name] = false;
                calculateProfit(); // Limpiar ganancia si es inválido
                return;
            }
        }

        if (regEx[name] && regEx[name].test(value.trim().replace(/\./g, ''))) {
            e.target.parentElement.classList.remove('form-card__group--incorrect');
            fields[name] = true;

            // Formatear números en tiempo real para los campos numéricos
            if (name === 'amount' || name === 'installments') {
                e.target.value = formatNumber(parseInt(value.replace(/\./g, ''), 10));
            }
            calculateProfit();
        } else {
            e.target.parentElement.classList.add('form-card__group--incorrect');
            fields[name] = false;
            calculateProfit(); // Si no es válido, limpiar ganancia
        }
    });
});

// Validación para el campo de selección "modalidad"
select.addEventListener('change', (e) => {
    if (e.target.value) {
        select.parentElement.classList.remove('form-card__group--incorrect');
        fields.modalidad = true;
    } else {
        select.parentElement.classList.add('form-card__group--incorrect');
        fields.modalidad = false;
    }
});

// Validación para el campo "date_start"
dateStartInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value) {
        dateStartInput.parentElement.classList.remove('form-card__group--incorrect');
        fields.date_start = true;
    } else {
        dateStartInput.parentElement.classList.add('form-card__group--incorrect');
        fields.date_start = false;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let flag = true; // Variable para verificar si todos los campos son válidos

    // Recorrer los campos en el objeto `fields` para verificar cuáles son inválidos
    Object.entries(fields).forEach(([fieldName, isValid]) => {
        const input = document.querySelector(`[name="${fieldName}"]`) || document.getElementById(fieldName);

        if (!isValid && input) {
            flag = false; // Marcar que hay al menos un campo inválido
            input.parentElement.classList.add('form-card__group--incorrect'); // Resaltar el campo inválido
        } else if (isValid && input) {
            input.parentElement.classList.remove('form-card__group--incorrect'); // Remover resaltado si es válido
        }
    });

    // Mostrar el error general si hay algún campo inválido
    if (!flag) {
        formGeneralError.classList.add('form-card__error--visible');
        formGeneralError.textContent = 'Por favor, complete todos los campos correctamente.';
    } else {
        formGeneralError.classList.remove('form-card__error--visible');
        form.submit(); // Enviar el formulario si todos los campos son válidos
    }
});
