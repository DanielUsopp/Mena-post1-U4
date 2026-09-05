"use strict";

// ─── Funciones de retroalimentación ────────────────────────────────────
function mostrarError(campoId, mensaje) {
  const campo = document.querySelector(`#${campoId}`);
  const span  = document.querySelector(`#error-${campoId}`);

  campo.classList.add("invalido");
  campo.classList.remove("valido");
  span.textContent = mensaje;
  span.classList.add("visible");
}

function limpiarError(campoId) {
  const campo = document.querySelector(`#${campoId}`);
  const span  = document.querySelector(`#error-${campoId}`);

  campo.classList.remove("invalido");
  campo.classList.add("valido");
  span.textContent = "";
  span.classList.remove("visible");
}

function limpiarTodo() {
  ["nombre", "email", "username", "password", "confirmar", "rol", "equipo", "horas", "terminos"]
    .forEach(id => limpiarError(id));
}

function validarNombre() {
  const campo = document.querySelector("#nombre");
  if (campo.validity.valueMissing) {
    mostrarError("nombre", "El nombre es obligatorio.");
    return false;
  }
  if (campo.validity.tooShort) {
    mostrarError("nombre", `El nombre debe tener al menos ${campo.minLength} caracteres.`);
    return false;
  }
  limpiarError("nombre");
  return true;
}

function validarEmail() {
  const campo = document.querySelector("#email");
  if (campo.validity.valueMissing) {
    mostrarError("email", "El correo es obligatorio.");
    return false;
  }
  if (campo.validity.typeMismatch) {
    mostrarError("email", "El formato del correo no es válido.");
    return false;
  }
  limpiarError("email");
  return true;
}

// Checkpoint de comprensión: se reutiliza el pattern nativo del HTML (Paso 2)
// en vez de repetir la misma regla como una expresión regular manual en JS,
// para no tener la validación de formato duplicada en dos lugares.
function validarUsername() {
  const campo = document.querySelector("#username");
  if (campo.validity.valueMissing) {
    mostrarError("username", "El nombre de usuario es obligatorio.");
    return false;
  }
  if (campo.validity.patternMismatch) {
    mostrarError("username", "Use 4 a 20 caracteres: letras, números o guion bajo, sin espacios.");
    return false;
  }
  limpiarError("username");
  return true;
}

// Estrategia A — regex compuesta
function validarPassword() {
  const campo = document.querySelector("#password");
  if (campo.validity.valueMissing) {
    mostrarError("password", "La contraseña es obligatoria.");
    return false;
  }
  if (campo.validity.tooShort) {
    mostrarError("password", "La contraseña debe tener al menos 8 caracteres.");
    return false;
  }
  const regexCompleta = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
  if (!regexCompleta.test(campo.value)) {
    mostrarError("password", "Debe incluir al menos una mayúscula, un número y un carácter especial.");
    return false;
  }
  limpiarError("password");
  return true;
}