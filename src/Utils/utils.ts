export const formatValidations = (rut: string): void => {
    if (typeof rut !== 'string') {
        throw new Error("Invalid RUT format. RUT must be a string.");
    }

    if (rut.startsWith('0')) {
        throw new Error("Invalid RUT format. RUT cannot start with zero.");
    }

    const cleanRut = rut.replace(/[.-]/g, '');
    const rutRegex = /^\d{1,9}[0-9kK]?$/i;
    
    if (!rutRegex.test(cleanRut)) {
        throw new Error('Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.');
    }
};

/**
 * Validates the format of a Chilean RUT (Rol Único Tributario).
 * @param {string} rut - The RUT to validate.
 * @returns {boolean} True if the format is valid, false otherwise.
 */
export const isValidFormatWithOutDash = (rut: string): boolean => {
    return /^\d{1,9}$/.test(rut) || /^\d{1,3}(\.\d{3}){0,2}$/.test(rut);
};