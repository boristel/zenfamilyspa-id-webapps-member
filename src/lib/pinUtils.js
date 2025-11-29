/**
 * Hash a PIN using SHA-256
 * @param {string} pin - 6-digit PIN
 * @returns {Promise<string>} Hashed PIN
 */
export async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate PIN format (6 digits)
 * @param {string} pin - PIN to validate
 * @returns {boolean} True if valid
 */
export function isValidPin(pin) {
  return /^\d{6}$/.test(pin);
}
