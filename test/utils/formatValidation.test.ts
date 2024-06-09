import { describe, test, expect } from '@jest/globals';
import { formatValidations } from '../../src/Utils/formatValidation';

describe('formatValidations function', () => {
    test('should throw error if the parameter is not a string', () => {
        expect(() => {
            // @ts-ignore
            formatValidations(12345678);
        }).toThrowError("Invalid RUT format. RUT must be a string.");
    });

    test('should throw error if the RUT starts with zero', () => {
        expect(() => {
            formatValidations('012345678');
        }).toThrowError("Invalid RUT format. RUT cannot start with zero.");
    });

    test('should throw error if the RUT has more than 10 digits', () => {
        expect(() => {
            formatValidations('12345678901');
        }).toThrowError("Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.");
    });

    test('should not throw error for a valid RUT without "-"', () => {
        expect(() => {
            formatValidations('12345678');
        }).not.toThrow();
        expect(() => {
            formatValidations('543');
        }).not.toThrow();
    });

    test('should throw error if the RUT contains non-numeric characters', () => {
        expect(() => {
            formatValidations('12.34a.678');
        }).toThrowError('Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.');
    });

    test('should not throw error for a valid RUT with "-"', () => {
        expect(() => {
            formatValidations('12.345.678-9');
        }).not.toThrow();
        expect(() => {
            formatValidations('2.345.678-9');
        }).not.toThrow();
        expect(() => {
            formatValidations('992.345.678-9');
        }).not.toThrow();
        expect(() => {
            formatValidations('1-9');
        }).not.toThrow();
    });

    test('should not throw error for a valid RUT without "-"', () => {
        expect(() => {
            formatValidations('12.345.678');
        }).not.toThrow();
        expect(() => {
            formatValidations('2345678');
        }).not.toThrow();
        expect(() => {
            formatValidations('992345678');
        }).not.toThrow();
        expect(() => {
            formatValidations('1');
        }).not.toThrow();
    });
});
