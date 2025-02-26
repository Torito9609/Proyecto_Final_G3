document.getElementById("shipping-form").addEventListener("submit", function(event) {
    let valid = true;

    // Validación de Nombre
    let nombre = document.getElementById("nombre").value.trim();
    if (nombre === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        showError("error-nombre", "Ingrese un nombre válido.");
        valid = false;
    } else {
        clearError("error-nombre");
    }

    // Validación de Apellido
    let apellido = document.getElementById("apellido").value.trim();
    if (apellido === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
        showError("error-apellido", "Ingrese un apellido válido.");
        valid = false;
    } else {
        clearError("error-apellido");
    }

    // Validación de Correo Electrónico
    let correo = document.getElementById("correo").value.trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(correo)) {
        showError("error-correo", "Ingrese un correo válido.");
        valid = false;
    } else {
        clearError("error-correo");
    }

    // Validación de Teléfono
    let telefono = document.getElementById("telefono").value.trim();
    if (!/^\d{7,15}$/.test(telefono)) {
        showError("error-telefono", "Ingrese un teléfono válido (7-15 dígitos).");
        valid = false;
    } else {
        clearError("error-telefono");
    }

    // Validación de Dirección
    let direccion = document.getElementById("direccion").value.trim();
    if (direccion.length < 5) {
        showError("error-direccion", "Ingrese una dirección válida (mínimo 5 caracteres).");
        valid = false;
    } else {
        clearError("error-direccion");
    }

    // Evitar el envío si hay errores
    if (!valid) {
        event.preventDefault();
    }
});

// Función para mostrar errores
function showError(id, message) {
    let errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.color = "red";
}

// Función para limpiar errores
function clearError(id) {
    let errorElement = document.getElementById(id);
    errorElement.textContent = "";
}
