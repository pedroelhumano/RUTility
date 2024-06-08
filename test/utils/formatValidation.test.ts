import {describe, test, expect} from '@jest/globals';
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

    test('should throw error if the RUT length is less than 8 characters', () => {
        expect(() => {
            formatValidations('1234567');
        }).toThrowError("Invalid RUT format. RUT must have at least 8 characters.");
    });

    test('should throw error if the RUT contains "-" and has less than 9 characters', () => {
        expect(() => {
            formatValidations('12.345.67-');
        }).toThrowError("Invalid RUT format. RUT must have at least 9 characters if the RUT contains the '-' character.");
    });

    // test('should throw error if the RUT contains non-numeric characters', () => {
    //     expect(() => {
    //         formatValidations('12.34a.678-9');
    //     }).toThrowError("Invalid RUT format. RUT must have at least 8 numeric characters or 9 if it contains a '-' character.");
    // });

    test('should not throw error for a valid RUT without "-"', () => {
        expect(() => {
            formatValidations('12345678');
        }).not.toThrow();
    });

    test('should not throw error for a valid RUT with "-"', () => {
        expect(() => {
            formatValidations('12.345.678-9');
        }).not.toThrow();
    });
});
