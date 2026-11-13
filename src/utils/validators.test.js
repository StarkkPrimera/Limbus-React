import { validateName, validateEmail, validateMessage } from './validators';

describe('validateName', () => {
  test.each(['Ana', 'Gabriel Pérez', 'Ñandú Núñez'])('acepta "%s"', value => {
    expect(validateName(value)).toBe(true);
  });

  test.each(['', '  ', 'Al', 'Ana2', 'R2-D2'])('rechaza "%s" con un mensaje', value => {
    expect(validateName(value)).toBe('Ingresa un nombre de al menos 3 letras.');
  });
});

describe('validateEmail', () => {
  test('acepta un correo con formato válido', () => {
    expect(validateEmail('gabriel@example.com')).toBe(true);
  });

  test.each(['', 'sin-arroba', 'a@b', 'a b@c.cl'])('rechaza "%s"', value => {
    expect(validateEmail(value)).toBe('Ingresa un correo válido.');
  });
});

describe('validateMessage', () => {
  test('acepta entre 10 y 300 caracteres (límites incluidos)', () => {
    expect(validateMessage('x'.repeat(10))).toBe(true);
    expect(validateMessage('x'.repeat(300))).toBe(true);
  });

  test('rechaza 9 y 301 caracteres', () => {
    const error = 'El mensaje debe tener entre 10 y 300 caracteres.';
    expect(validateMessage('x'.repeat(9))).toBe(error);
    expect(validateMessage('x'.repeat(301))).toBe(error);
  });

  test('ignora los espacios al inicio y al final', () => {
    expect(validateMessage('   corto   ')).not.toBe(true);
  });
});
