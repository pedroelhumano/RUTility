import { describe, test, expect } from '@jest/globals';
import { calculateDv, isValidRut, isFormat } from '../src/validations';

describe('calculateDv', () => {
  test('should calculate DV correctly for valid clean RUTs', () => {
    expect(calculateDv('12345678')).toBe('5');
    expect(calculateDv('87654321')).toBe('4');
    expect(calculateDv('11111111')).toBe('1');
    expect(calculateDv('99999999')).toBe('9');
    expect(calculateDv('123')).toBe('6');
    expect(calculateDv('1')).toBe('9');
  });

  test('should calculate DV correctly for valid numeric RUTs', () => {
    expect(calculateDv(12345678)).toBe('5');
    expect(calculateDv(87654321)).toBe('4');
    expect(calculateDv(11111111)).toBe('1');
    expect(calculateDv(123)).toBe('6');
    expect(calculateDv(1)).toBe('9');
  });

  test('should calculate DV correctly for formatted RUTs with dots', () => {
    expect(calculateDv('12.345.678')).toBe('5');
    expect(calculateDv('87.654.321')).toBe('4');
    expect(calculateDv('11.111.111')).toBe('1');
  });

  test('should calculate DV correctly for short RUTs', () => {
    expect(calculateDv('1')).toBe('9');
    expect(calculateDv('12')).toBe('4');
  });

  test('should calculate DV correctly for long RUTs', () => {
    expect(calculateDv('999999999')).toBe('6');
    expect(calculateDv('999999999')).toBe('6');
  });

  test('should return correct DV for RUTs ending with K', () => {
    expect(calculateDv('20.347.878')).toBe('K');
    expect(calculateDv('20347878')).toBe('K');
    expect(calculateDv(20347878)).toBe('K');
  });

  test('should return correct DV for RUTs ending with zero', () => {
    expect(calculateDv('76.180.692')).toBe('0');
    expect(calculateDv('76180692')).toBe('0');
    expect(calculateDv(76180692)).toBe('0');
  });

  test('should throw error for invalid RUT formats', () => {
    expect(() => calculateDv('')).toThrow(
      "Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'."
    );
    expect(() => calculateDv('1234a678')).toThrow(
      "Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'."
    );
    expect(() => calculateDv('9999999999')).toThrow(
      "Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'."
    );
    expect(() => calculateDv(9999999999)).toThrow(
      "Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'."
    );
    expect(() => calculateDv('9.999.999.999')).toThrow(
      "Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'."
    );
  });
});

describe('isValidRut function', () => {
  test('should return true for valid RUTs with dash and dots', () => {
    expect(isValidRut('12.345.678-5')).toBe(true);
    expect(isValidRut('87.654.321-4')).toBe(true);
    expect(isValidRut('11.111.111-1')).toBe(true);
    expect(isValidRut('99.999.999-9')).toBe(true);
  });

  test('should return true for valid RUTs without dots', () => {
    expect(isValidRut('12345678-5')).toBe(true);
    expect(isValidRut('87654321-4')).toBe(true);
    expect(isValidRut('11111111-1')).toBe(true);
    expect(isValidRut('99999999-9')).toBe(true);
    expect(isValidRut('123456789-2')).toBe(true);
  });

  test('should throw error for invalid RUT formats', () => {
    expect(() => isValidRut('1234a678-5')).toThrow(
      'Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.'
    );
    expect(() => isValidRut('12.34a.678-5')).toThrow(
      'Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.'
    );
  });

  test('should return false for RUTs with incorrect verification digits', () => {
    expect(isValidRut('12.345.678-4')).toBe(false);
    expect(isValidRut('87.654.321-3')).toBe(false);
    expect(isValidRut('11.111.111-2')).toBe(false);
    expect(isValidRut('99.999.999-1')).toBe(false);
  });

  test('should return true for valid RUTs with uppercase K', () => {
    expect(isValidRut('20.347.878-K')).toBe(true);
    expect(isValidRut('20347878-K')).toBe(true);
  });

  test('should return false for valid RUTs with lowercase k', () => {
    expect(isValidRut('20.347.878-k')).toBe(true);
    expect(isValidRut('20347878-k')).toBe(true);
  });

  test('should throw error for RUTs with more than 10 digits', () => {
    expect(() => isValidRut('12345678901-5')).toThrow('Invalid RUT format');
    expect(() => isValidRut('1.234.567.890-5')).toThrow('Invalid RUT format');
  });

  test('should throw error for RUTs starting with zero', () => {
    expect(() => isValidRut('012345678-5')).toThrow('Invalid RUT format');
    expect(() => isValidRut('0.123.456.789-5')).toThrow('Invalid RUT format');
  });

  test('should throw error for empty string', () => {
    expect(() => isValidRut('')).toThrow('Invalid RUT format');
  });

  describe('isFormat', () => {
    describe('isFormat.dot', () => {
      test('should return true for valid RUT with dots', () => {
        expect(isFormat.dot('12.345.678')).toBe(true);
        expect(isFormat.dot('999.999.999')).toBe(true);
        expect(isFormat.dot('5.678')).toBe(true);
        expect(isFormat.dot('678')).toBe(true);
        expect(isFormat.dot('1')).toBe(true);
      });

      test('should return false for invalid RUT with dots', () => {
        expect(isFormat.dot('12345678-9')).toBe(false);
        expect(isFormat.dot('12345678')).toBe(false);
        expect(isFormat.dot('12.345.678-')).toBe(false);
        expect(isFormat.dot('12.34.5678-9')).toBe(false);
        expect(isFormat.dot('12.345.678-90')).toBe(false);
      });
    });

    describe('isFormat.dash', () => {
      test('should return true for valid RUT with dash', () => {
        expect(isFormat.dash('12345678-9')).toBe(true);
        expect(isFormat.dash('999999999-2')).toBe(true);
        expect(isFormat.dash('1-K')).toBe(true);
      });

      test('should return false for invalid RUT with dash', () => {
        expect(isFormat.dash('12345678')).toBe(false);
        expect(isFormat.dash('12.345.678')).toBe(false);
        expect(isFormat.dash('12.34.5678-9')).toBe(false);
        expect(isFormat.dash('12.345.678-90')).toBe(false);
        expect(isFormat.dash('0345678-9')).toBe(false);
        expect(isFormat.dash('345678-92')).toBe(false);
      });
    });

    describe('isFormat.dotDash', () => {
      test('should return true for valid RUT with dots and dash', () => {
        expect(isFormat.dotDash('12.345.678-9')).toBe(true);
        expect(isFormat.dotDash('12.345.678-0')).toBe(true);
        expect(isFormat.dotDash('12.345.678-K')).toBe(true);
        expect(isFormat.dotDash('5.678-9')).toBe(true);
        expect(isFormat.dotDash('678-0')).toBe(true);
        expect(isFormat.dotDash('678-K')).toBe(true);
      });

      test('should return false for invalid RUT with dots and dash', () => {
        expect(isFormat.dotDash('12.345.678-')).toBe(false);
        expect(isFormat.dotDash('12.345.678')).toBe(false);
        expect(isFormat.dotDash('12345678-')).toBe(false);
        expect(isFormat.dotDash('12345678')).toBe(false);
        expect(isFormat.dotDash('12.345.678-K1')).toBe(false);
        expect(isFormat.dotDash('12345678-9')).toBe(false);
        expect(isFormat.dotDash('12345678-0')).toBe(false);
        expect(isFormat.dotDash('12345678-K')).toBe(false);
        expect(isFormat.dotDash('5678-K')).toBe(false);
      });
    });
  });
});
