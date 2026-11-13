// Validaciones del formulario de contacto.
// Cada función devuelve `true` si el valor es válido o un texto con el error.
// Es el formato que React Hook Form espera en la opción `validate`.

const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 300;

export function validateName(value) {
  return NAME_PATTERN.test((value || '').trim()) || 'Ingresa un nombre de al menos 3 letras.';
}

export function validateEmail(value) {
  return EMAIL_PATTERN.test((value || '').trim()) || 'Ingresa un correo válido.';
}

export function validateMessage(value) {
  const length = (value || '').trim().length;
  return (length >= MESSAGE_MIN && length <= MESSAGE_MAX)
    || `El mensaje debe tener entre ${MESSAGE_MIN} y ${MESSAGE_MAX} caracteres.`;
}
