import { describe, test, expect } from '@jest/globals';
import { calculateDv } from '../src/validations';

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
    expect(() => calculateDv('')).toThrow("Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'.");
    expect(() => calculateDv('1234a678')).toThrow("Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'.");
    expect(() => calculateDv('9999999999')).toThrow("Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'.");
    expect(() => calculateDv(9999999999)).toThrow("Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'.");
    expect(() => calculateDv('9.999.999.999')).toThrow("Invalid RUT format. Acceptable formats are '12.345.678' or '12345678'.");
  });
});