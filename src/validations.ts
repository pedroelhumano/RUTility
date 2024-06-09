import { formatValidations } from "./Utils/formatValidation";

/**
 * Calculates the verification digit of a Chilean RUT (Rol Único Tributario).
 * @param {string | number} rut - The RUT in one of the following formats:
 *   - '12.345.678-9'
 *   - '12345678'
 *   - 12345678 (as a number)
 * @returns {string} The calculated verification digit or '0' if it's 11, 'K' if it's 10.
 * @throws {Error} If the RUT format is invalid.
 * @throws {Error} If the length of the RUT is incorrect.
 */
const calculateDv = (rut: string | number): string => {
    if (typeof rut !== 'string') {
        rut = rut.toString();
    }
    
    formatValidations(rut);

    const validFormat = /^(?!0)(\d{2}\.\d{3}\.\d{3}|\d{8})$/;
    if (!validFormat.test(rut)) {
        throw new Error("Invalid RUT format");
    }

    const cleanRut = rut.replace(/\./g, '');
    const series = [2, 3, 4, 5, 6, 7];
    const sum = cleanRut
        .split('')
        .reverse()
        .reduce((acc, digit, idx) => acc + parseInt(digit) * series[idx % series.length], 0);
    const dv = 11 - (sum % 11);
    const finalDv: { [key: number]: string } = { 11: '0', 10: 'K' };

    return finalDv[dv] ?? dv.toString();
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
    const validFormat = /^(?!0)(\d{2}\.\d{3}\.\d{3}-\d|\d{8}-\d)$/;
    if (!validFormat.test(rut)) {
        throw new Error("Invalid RUT format");
    }

    const digits = rut.replace(/\D/g, '');
    const verificationDigit = rut.slice(-1);
    const calculatedVerificationDigit = calculateDv(digits.slice(0, -1));

    return verificationDigit === calculatedVerificationDigit;
};

const isFormatLike = {
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
