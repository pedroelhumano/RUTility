import { describe, test, expect } from '@jest/globals';
import { calculateDv } from '../src/validations';

describe('calculateDv', () => {
  describe('clean RUTs', () => {
    test('should calculate DV correctly for valid clean RUTs', () => {
      expect(calculateDv('12345678')).toBe('5');
      expect(calculateDv('87654321')).toBe('4');
      expect(calculateDv('11111111')).toBe('1');
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
  });
  describe('formatted RUTs', () => {
    test('should calculate DV correctly for formatted RUTs with dots and dash', () => {
      expect(calculateDv('12.345.678-5')).toBe('5');
      expect(calculateDv('87.654.321-4')).toBe('4');
      expect(calculateDv('11.111.111-1')).toBe('1');
      expect(calculateDv('999.999.999-6')).toBe('6');
    });

    test('should calculate DV correctly for formatted RUTs with dots only', () => {
      expect(calculateDv('12.345.678')).toBe('5');
      expect(calculateDv('87.654.321')).toBe('4');
      expect(calculateDv('11.111.111')).toBe('1');
    });

    test('should calculate DV correctly for formatted RUTs with dash only', () => {
      expect(calculateDv('12345678-5')).toBe('5');
      expect(calculateDv('87654321-4')).toBe('4');
      expect(calculateDv('11111111-1')).toBe('1');
    });
  });

  describe('short RUTs', () => {
    test('should calculate DV correctly for short RUTs', () => {
      expect(calculateDv('1')).toBe('9');
      expect(calculateDv('1-9')).toBe('9');
      expect(calculateDv('12')).toBe('4');
      expect(calculateDv('12-4')).toBe('4');
    });
  });

  describe('long RUTs', () => {
    test('should calculate DV correctly for long RUTs', () => {
      expect(calculateDv('999999999')).toBe('6');
      expect(calculateDv('999999999-9')).toBe('6');
    });
  });

  describe('invalid RUT formats', () => {
    test('should throw error for invalid RUT formats', () => {
      expect(() => calculateDv('')).toThrow("Invalid RUT format");
      expect(() => calculateDv('1234a678')).toThrow("Invalid RUT format");
    });
  });

  describe('edge cases', () => {
    test('should handle edge cases', () => {
      expect(calculateDv('1')).toBe('9');
      expect(calculateDv('99999999')).toBe('9');
      expect(calculateDv('99999999-9')).toBe('9');
    });
  });

  describe('K cases', () => {
    test('should return correct DV for RUTs ending with K', () => {
      expect(calculateDv('20.347.878-K')).toBe('K');
      expect(calculateDv('20347878-K')).toBe('K');
      expect(calculateDv('20.347.878K')).toBe('K');
      // expect(calculateDv('20347878K')).toBe('K');
    });

    // test('should return correct DV for RUTs ending with lowercase k', () => {
    //   expect(calculateDv('20.347.878-k')).toBe('K');
    //   expect(calculateDv('20347878-k')).toBe('K');
    //   expect(calculateDv('20.347.878k')).toBe('K');
    //   expect(calculateDv('20347878k')).toBe('K');
    // });

    // test('should return correct DV for short RUTs ending with K', () => {
    //   expect(calculateDv('6-K')).toBe('K');
    //   expect(calculateDv('6k')).toBe('K');
    // });

    // test('should handle numeric RUTs and return correct DV', () => {
    //   expect(calculateDv(20347878)).toBe('K');
    //   expect(calculateDv(6)).toBe('K'); // Example for a short RUT
    // });

    // test('should return correct DV for RUTs with dots and no dash', () => {
    //   expect(calculateDv('20.347.878K')).toBe('K');
    //   expect(calculateDv('20.347.878-k')).toBe('K');
    // });

    // test('should return correct DV for clean RUT without format', () => {
    //   expect(calculateDv('20347878')).toBe('K');
    //   expect(calculateDv('6')).toBe('K'); // Example for a short RUT
    // });
  });
});

