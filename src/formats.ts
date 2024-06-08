import { formatValidations } from "./Utils/formatValidation";

export const format = {
    /**
     * Formats a RUT by adding dots and dash if necessary.
     * @param {string} rut - The RUT to format.
     * @returns {string} The formatted RUT.
     * @example
     * format.dot("12345678-0")
     * // Returns "12.345.678-0"
     * format.dot("12345678")
     * // Returns "12.345.678"
     */
    dot: (rut: string): string => {
        formatValidations(rut);
        if (rut.includes('-')) {
            return rut.replace(/^(\d{1,2})(\d{3})(\d{3})-(\d|k)$/, '$1.$2.$3-$4');
        }

        return rut.replace(/^(\d{1,2})(\d{3})(\d{3})$/, '$1.$2.$3');
    },

    /**
     * Formats a RUT by adding a dash at the end if it's missing.
     * @param {string} rut - The RUT to format.
     * @returns {string} The formatted RUT.
     * @example
     * format.dash("123456780")
     * // Returns "12345678-0"
     * format.dash("12.345.6780")
     * // Returns "12345678-0"
     */
    dash: (rut: string): string => {
        formatValidations(rut);
        if (!rut.includes('-')) {
            return rut.slice(0, -1) + '-' + rut.slice(-1);
        }
        return rut;
    },

    /**
     * Formats a RUT by removing dots and dashes and adding dots and dash in the proper position.
     * @param {string} rut - The RUT to format.
     * @returns {string} The formatted RUT.
     * @example
     * format.dotDash("123456780")
     * // Returns "12.345.678-0"
     */
    dotDash: (rut: string): string => {
        formatValidations(rut);
        const formattedRut = rut.replace(/\./g, '').replace(/-/g, '');

        return formattedRut.slice(0, 2) + '.' + formattedRut.slice(2, 5) + '.' + formattedRut.slice(5, 8) + '-' + formattedRut.slice(-1);
    },

    /**
     * Removes dots from a RUT.
     * @param {string} rut - The RUT from which to remove the dots.
     * @returns {string} The RUT without dots.
     * @example
     * format.notDot("12.345.678-0")
     * // Returns "12345678-0"
     */
    notDot: (rut: string): string => {
        formatValidations(rut);
        return rut.replace(/\./g, '');
    },

    /**
     * Removes the dash and the final digit (or "k") from a RUT.
     * @param {string} rut - The RUT from which to remove the dash and the final digit.
     * @returns {string} The RUT without the dash and the final digit.
     * @example
     * format.notDash("12.345.678-0")
     * // Returns "12.345.678"
     * format.notDash("12345678-0")
     * // Returns "12345678"
     */
    notDash: (rut: string): string => {
        formatValidations(rut);
        if (rut.includes('-')) {
            return rut.slice(0, -2);
        }
        return rut;
    },

    /**
     * Removes dots and the dash followed by the final digit (or "k") from a RUT.
     * @param {string} rut - The RUT from which to remove dots and the dash followed by the final digit.
     * @returns {string} The RUT without dots and without the dash followed by the final digit.
     * @example
     * format.notDotDash("12.345.678-9")
     * // Returns "12345678"
     */
    notDotDash: (rut: string): string => {
        formatValidations(rut);
        return rut.replace(/\./g, '').replace(/-(\d|k|K)$/, '');
    }
};