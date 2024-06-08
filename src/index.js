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
const calculateDv = (rut) => {
    if (typeof rut !== 'string') {
        rut = rut.toString();
    }

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
    const finalDv = { 11: '0', 10: 'K' };
    
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
const isValidRut = (rut) => {
    const validFormat = /^(?!0)(\d{2}\.\d{3}\.\d{3}-\d|\d{8}-\d)$/;
    if (!validFormat.test(rut)) {
        throw new Error("Invalid RUT format");
    }

    const digits = rut.replace(/\D/g, '');
    const verificationDigit = rut.slice(-1);
    const calculatedVerificationDigit = calculateDv(digits.slice(0, -1));

    return verificationDigit === calculatedVerificationDigit;
};

const formatValidations = (rut) => {
    if (typeof rut !== 'string') {
        throw new Error("Invalid RUT format. RUT must be a string.");
    }

    if (rut.startsWith('0')) {
        throw new Error("Invalid RUT format. RUT cannot start with zero.");
    }

    let rutDigits = rut.replace(/\./g, '');
    
    if (rut.includes('-')) {
        rutDigits = rutDigits.replace(/-/g, '');
        if (rutDigits.length !== 9) {
            throw new Error("Invalid RUT format. RUT must have at least 9 characters if the RUT contains the '-' character.");
        }
    }   else if (rutDigits.length !== 8) {
            throw new Error("Invalid RUT format. RUT must have at least 8 characters.");
    }

    const numericRegexRut = /^\d{8}[\dkK]?$/;
    if (!numericRegexRut.test(rutDigits)) {
        throw new Error('Invalid RUT format. RUT must have at least 8 numeric characters or 9 if it contains a "-" character.');
    }
}

const format = {
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
    dot: (rut) => {
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
    // TODO!: Validar esto, creo que hay un error para el caso 12.345.6780
    dash: (rut) => {
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
    dotDash: (rut) => {
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
    notDot: (rut) => {
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
    notDash: (rut) => {
        formatValidations(rut);
        if (rut.includes('-')) {
            return rut.slice(0, -2);
        }
        return rut
    },

    /**
     * Removes dots and the dash followed by the final digit (or "k") from a RUT.
     * @param {string} rut - The RUT from which to remove dots and the dash followed by the final digit.
     * @returns {string} The RUT without dots and without the dash followed by the final digit.
     * @example
     * format.notDotDash("12.345.678-9")
     * // Returns "12345678"
     */
    notDotDash: (rut) => {
        formatValidations(rut);
        return rut.replace(/\./g, '').replace(/-(\d|k|K)$/, '');
    }
};

const isFormatLike = {
    /**
     * Checks if a Chilean RUT has the correct format with dots and optional dash.
     * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
     * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
     */
    dot: (rut) => {
        return /^(?!0)(\d{2}\.\d{3}\.\d{3}-?\d)$/.test(rut);
    },

    /**
     * Checks if a Chilean RUT has the correct format with dash at the end.
     * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
     * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
     */
    dash: (rut) => {
        // formatValidations(rut);
        return /^(?!0)\d{2}\.\d{3}\.\d{3}-\d$/.test(rut);
    },

    /**
     * Checks if a Chilean RUT has the correct format with dots and dash, regardless of their order.
     * @param {string} rut - The RUT to be checked. Example: "12.345.678-9".
     * @returns {boolean} true if the RUT has the correct format, false otherwise. Example: true.
     */
    dotDash: (rut) => {
        // formatValidations(rut);
        return /^(?!0)(\d{2}\.\d{3}\.\d{3}-\d|\d{8}-\d)$/.test(rut) || /^(?!0)(\d{1,2})(\.\d{3}){2}-\d$/.test(rut);
    }
};



console.log("Ejemplo para isFormatLike.dot")
console.log(isFormatLike.dot("12.345.678-9")); // true
console.log(isFormatLike.dot("12345678-9"));   // true
console.log(isFormatLike.dot("123456789"));    // false
console.log(isFormatLike.dot("12.345.6789"));  // false
console.log(isFormatLike.dot("0"));            // false

console.log("Ejemplo para isFormatLike.dash");
console.log(isFormatLike.dash("12.345.678-9")); // true
console.log(isFormatLike.dash("12345678-9"));   // false
console.log(isFormatLike.dash("123456789"));    // false
console.log(isFormatLike.dash("12.345.6789"));  // false
console.log(isFormatLike.dash("0"));            // false

console.log("Ejemplo para isFormatLike.dotDash");
console.log(isFormatLike.dotDash("12.345.678-9"));  // true
console.log(isFormatLike.dotDash("12345678-9"));    // true
console.log(isFormatLike.dotDash("123456789"));     // false
console.log(isFormatLike.dotDash("12.345.6789"));   // false
console.log(isFormatLike.dotDash("0"));             // false
console.log(isFormatLike.dotDash("12.345-678.9"));  // true
console.log(isFormatLike.dotDash("12.345.67-89"));  // true