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
    dot: (rut) => {
        formatValidations(rut);
        if (rut.includes('-')) {
            return rut.replace(/^(\d{1,2})(\d{3})(\d{3})-(\d|k)$/, '$1.$2.$3-$4');
        }
        
        return rut.replace(/^(\d{1,2})(\d{3})(\d{3})$/, '$1.$2.$3');
    },    
    dash: (rut) => {
        if (typeof rut !== 'string') {
            throw new Error("Invalid RUT format. RUT must be a string.");
        }
        return rut.replace(/-/g, '');
    },
    dotDash: (rut) => {
        if (typeof rut !== 'string') {
            throw new Error("Invalid RUT format. RUT must be a string.");
        }
        return rut.replace(/\./g, '').replace(/-/g, '');
    },
    notDash: (rut) => {
        if (typeof rut !== 'string') {
            throw new Error("Invalid RUT format. RUT must be a string.");
        }
        return rut.replace(/-0/g, '');
    }
};

//Validaciones correctas
// console.log(format.dot("12.123.123-0"));
// console.log(format.dot("12123123-0"));
// console.log(format.dot("12123123"));
//error cases
console.log(format.dot("asdasdas-k"))
