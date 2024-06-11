import { formatValidations } from "./Utils/formatValidation";

/**
 * Calculates the verification digit of a Chilean RUT (Rol Único Tributario).
 * @param {string | number} rut - The RUT in one of the following formats:
 *   - '12.345.678-9'
 *   - '12345678'
 *   - 12345678 (as a number)
 *   - '1'
 *   - '1-k'
 * @returns {string} The calculated verification digit or '0' if it's 11, 'K' if it's 10.
 * @throws {Error} If the RUT format is invalid.
 * @throws {Error} If the length of the RUT is incorrect.
 * @example
 * calculateDv('12.345.678-5'); // returns '5'
 * calculateDv('12345678'); // returns '5'
 * calculateDv('1'); // returns '9'
 * calculateDv('1-k'); // returns '9'
 * calculateDv(12345678); // returns '5'
 */
export const calculateDv = (rut: string | number): string => {
    if (typeof rut !== 'string') {
        rut = rut.toString();
    }

    formatValidations(rut);

    // Remove dots and split into the base RUT and the verifier digit (if any)
    const [rutBase, dv] = rut.replace(/\./g, '').split('-');

    if (rutBase.length === 0 || isNaN(Number(rutBase))) {
        throw new Error("Invalid RUT format");
    }

    const series = [2, 3, 4, 5, 6, 7];
    const sum = rutBase
        .split('')
        .reverse()
        .reduce((acc, digit, idx) => acc + parseInt(digit) * series[idx % series.length], 0);

    const dvCalc = 11 - (sum % 11);
    const finalDv: { [key: number]: string } = { 11: '0', 10: 'K' };

    return finalDv[dvCalc] ?? dvCalc.toString();
};

export default calculateDv;




/**
 * Validates if a Chilean RUT (Rol Único Tributario) is valid.
 * @param {string} rut - The RUT in one of the following formats:
 *   - '12.345.678-9'
 *   - '12345678-9'
 * @returns {boolean} true if the RUT is valid, false otherwise.
 * @throws {Error} If the RUT format is invalid.
 */
export const isValidRut = (rut: string): boolean => {
    const validFormat = /^(?!0)(\d{2}\.\d{3}\.\d{3}-\d|\d{8}-\d)$/;
    if (!validFormat.test(rut)) {
        throw new Error("Invalid RUT format");
    }

    const digits = rut.replace(/\D/g, '');
    const verificationDigit = rut.slice(-1);
    const calculatedVerificationDigit = calculateDv(digits.slice(0, -1));

    return verificationDigit === calculatedVerificationDigit;
};

export const isFormatLike = {
    /**
     * Checks if a Chilean RUT has the correct format with dots and optional dash.
     * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
     * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
     */
    dot: (rut: string): boolean => {
        return /^(?!0)(\d{2}\.\d{3}\.\d{3}-?\d)$/.test(rut);
    },

    /**
     * Checks if a Chilean RUT has the correct format with dash at the end.
     * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
     * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
     */
    dash: (rut: string): boolean => {
        return /^(?!0)\d{2}\.\d{3}\.\d{3}-\d$/.test(rut);
    },

    /**
     * Checks if a Chilean RUT has the correct format with dots and dash, regardless of their order.
     * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
     * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
     */
    dotDash: (rut: string): boolean => {
        return /^(?!0)(\d{2}\.\d{3}\.\d{3}-\d|\d{8}-\d)$/.test(rut) || /^(?!0)(\d{1,2})(\.\d{3}){2}-\d$/.test(rut);
    }
};
