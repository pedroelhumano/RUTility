export const formatValidations = (rut: string): void => {
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
    } else if (rutDigits.length !== 8) {
        throw new Error("Invalid RUT format. RUT must have at least 8 characters.");
    }

    const numericRegexRut = /^\d{8}[\dkK]?$/;
    if (!numericRegexRut.test(rutDigits)) {
        throw new Error('Invalid RUT format. RUT must have at least 8 numeric characters or 9 if it contains a "-" character.');
    }
};