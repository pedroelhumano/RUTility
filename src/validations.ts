import { formatValidations, isValidFormatWithOutDash } from './Utils/utils';

/**
 * Calculates the verification digit of a Chilean RUT (Rol Único Tributario).
 * @param {string | number} rut - The RUT in one of the following formats:
 *   - '12.345.678'
 *   - '12345678'
 *   - 12345678 (as a number)
 * @returns {string} The calculated verification digit or '0' if it's 11, 'K' if it's 10.
 * @throws {Error} If the RUT format is invalid. Acceptable formats are '26270086' or '26.270.086'.
 * @example
 * calculateDv('12.345.678'); // returns '5'
 * calculateDv('12345678'); // returns '5'
 * calculateDv(12345678); // returns '5'
 */
export const calculateDv = (rut: string | number): string => {
  if (typeof rut === 'number') {
    rut = rut.toString();
  }

  if (!isValidFormatWithOutDash(rut)) {
    throw new Error(
      "Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'."
    );
  }

  const rutBase = rut.replace(/\./g, '');

  const series = [2, 3, 4, 5, 6, 7];
  const sum = rutBase
    .split('')
    .reverse()
    .reduce(
      (acc, digit, idx) => acc + parseInt(digit) * series[idx % series.length],
      0
    );

  const dvCalc = 11 - (sum % 11);
  const finalDv: { [key: number]: string } = { 11: '0', 10: 'K' };

  return finalDv[dvCalc] ?? dvCalc.toString();
};

/**
 * Validates if a Chilean RUT (Rol Único Tributario) is valid.
 * @param {string} rut - The RUT in one of the following formats:
 *   - '12.345.678-9'
 *   - '12345678-9'
 * @returns {boolean} true if the RUT is valid, false otherwise.
 * @throws {Error} If the RUT format is invalid.
 */
export const isValidRut = (rut: string): boolean => {
  formatValidations(rut);

  const digitsAndVerification = rut.replace(/[.-]/g, '');
  const digits = digitsAndVerification.slice(0, -1);
  const verificationDigit = digitsAndVerification.slice(-1);
  const calculatedVerificationDigit = calculateDv(digits);

  return (
    verificationDigit.toLowerCase() ===
    calculatedVerificationDigit.toLowerCase()
  );
};

export const isFormat = {
  /**
   * Checks if a Chilean RUT has the correct format with dots and optional dash.
   * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
   * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
   */
  dot: (rut: string): boolean => {
    return /^(?!0)(\d{1,3}(?:\.\d{3})*)$/.test(rut);
  },

  /**
   * Checks if a Chilean RUT has the correct format with dash at the end.
   * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
   * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
   */
  dash: (rut: string): boolean => {
    return /^(?!0)\d{1,9}-(\d|k|K)$/i.test(rut);
  },

  /**
   * Checks if a Chilean RUT has the correct format with dots and dash, regardless of their order.
   * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
   * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
   */
  dotDash: (rut: string): boolean => {
    return /^(?!0)(\d{1,3}(?:\.\d{3})*)-(\d|k|K)$/i.test(rut);
  }
};
