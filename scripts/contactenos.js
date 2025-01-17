/*=========================================
   CONTACTENOS
==========================================*/
const form = document.querySelector('#form');
const notification = document.querySelector('#notification');
const notificationMessage = document.querySelector('#notification-message');
const notificationClose = document.querySelector('#notification-close');

// Seleccionamos los campos del formulario
const nameField = document.querySelector('#nombre');
const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#telefono');
const messageField = document.querySelector('#mensaje');

// Evento de envío de formulario
form.addEventListener('submit', handleSubmit);

// Función para manejar el envío del formulario
async function handleSubmit(e) {
    e.preventDefault(); // Detenemos el envío solo si es necesario

    // Reseteamos los mensajes de error
    resetErrors();

    // Validamos los campos del formulario
    if (!validateForm()) {
        return; // Si hay errores, no enviamos el formulario
    }

    // Si la validación es correcta, enviamos el formulario
    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });

    // Verifica la respuesta del servidor y muestra la notificación
    if (response.ok) {
        form.reset();
        showNotification('Gracias por contactarnos, pronto nos comunicaremos contigo');
    } else {
        showNotification('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
    }
}

// Función para mostrar la notificación
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.style.display = 'block';

    // Oculta la notificación después de 5 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Cerrar la notificación manualmente
notificationClose.addEventListener('click', () => {
    notification.style.display = 'none';
});

// Función de validación del formulario
function validateForm() {
    let isValid = true;

    // Validar nombre (solo texto, mínimo 3 caracteres)
    if (nameField.value.trim() === '') {
        showError(nameField, 'El nombre es obligatorio');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameField.value)) {
        showError(nameField, 'El nombre solo puede contener letras');
        isValid = false;
    } else if (nameField.value.trim().length < 3) {
        showError(nameField, 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
    }

    // Validar correo electrónico (formato válido con dominio)
    if (emailField.value.trim() === '') {
        showError(emailField, 'El correo electrónico es obligatorio');
        isValid = false;
    } else if (!isValidEmail(emailField.value)) {
        showError(emailField, 'Por favor, ingresa un correo electrónico válido');
        isValid = false;
    }

    // Validar teléfono (exactamente 10 caracteres)
    if (phoneField.value.trim() === '') {
        showError(phoneField, 'El teléfono es obligatorio');
        isValid = false;
    } else if (!/^\d+$/.test(phoneField.value)) {
        showError(phoneField, 'El teléfono solo puede contener números');
        isValid = false;
    } else if (phoneField.value.trim().length !== 10) {
        showError(phoneField, 'El teléfono debe tener exactamente 10 caracteres');
        isValid = false;
    }

    // Validar mensaje (mínimo 5 caracteres)
    if (messageField.value.trim() === '') {
        showError(messageField, 'El mensaje es obligatorio');
        isValid = false;
    } else if (messageField.value.trim().length < 5) {
        showError(messageField, 'El mensaje debe tener al menos 5 caracteres');
        isValid = false;
    }

    return isValid;
}

// Función para mostrar el error junto al campo correspondiente
function showError(field, message) {
    const errorElement = document.createElement('span');
    errorElement.classList.add('error');
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

// Función para limpiar los errores antes de validaciones
function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach((errorElement) => {
        errorElement.remove();
    });
}

// Función para validar el formato del correo electrónico con dominio
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
