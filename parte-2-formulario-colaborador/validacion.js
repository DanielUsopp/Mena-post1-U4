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

function validarConfirmar() {
  const password  = document.querySelector("#password").value;
  const confirmar = document.querySelector("#confirmar").value;
  if (!confirmar) {
    mostrarError("confirmar", "La confirmación es obligatoria.");
    return false;
  }
  if (password !== confirmar) {
    mostrarError("confirmar", "Las contraseñas no coinciden.");
    return false;
  }
  limpiarError("confirmar");
  return true;
}

const selectRol   = document.querySelector("#rol");
const grupoEquipo = document.querySelector("#grupo-equipo");

selectRol.addEventListener("change", () => {
  const esLider = selectRol.value === "lider";
  grupoEquipo.classList.toggle("oculto", !esLider);

  // Estrategia A seleccionada: alternar el atributo required nativo
  document.querySelector("#equipo").required = esLider;

  if (!esLider) limpiarError("equipo");
});

// Estrategia A — alternar el atributo required nativo
function validarEquipo() {
  const campo = document.querySelector("#equipo");
  if (!campo.required) return true;  // el campo no aplica si el rol no es Líder

  if (campo.validity.valueMissing) {
    mostrarError("equipo", "Indique el equipo a cargo para el rol de Líder.");
    return false;
  }
  limpiarError("equipo");
  return true;
}

function validarRol() {
  const campo = document.querySelector("#rol");
  if (campo.validity.valueMissing) {
    mostrarError("rol", "Seleccione un rol.");
    return false;
  }
  limpiarError("rol");
  return true;
}

function validarHoras() {
  const campo = document.querySelector("#horas");
  if (campo.validity.valueMissing) {
    mostrarError("horas", "Indique las horas disponibles por semana.");
    return false;
  }
  if (campo.validity.rangeUnderflow) {
    mostrarError("horas", `Debe disponer al menos de ${campo.min} horas semanales.`);
    return false;
  }
  if (campo.validity.rangeOverflow) {
    mostrarError("horas", `No puede superar las ${campo.max} horas semanales.`);
    return false;
  }
  limpiarError("horas");
  return true;
}

function validarTerminos() {
  const campo = document.querySelector("#terminos");
  if (!campo.checked) {
    mostrarError("terminos", "Debe aceptar los términos para continuar.");
    return false;
  }
  limpiarError("terminos");
  return true;
}