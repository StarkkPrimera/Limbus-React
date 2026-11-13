import { site } from './site';

// Cada proyecto tiene claves distintas: sus datos no se mezclan en localhost.
export function readData(key, initialValue) {
  try {
    const saved = localStorage.getItem(`${site.storageKey}-${key}`);
    return saved === null ? initialValue : JSON.parse(saved);
  } catch {
    return initialValue;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(`${site.storageKey}-${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
