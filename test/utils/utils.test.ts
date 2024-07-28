import { describe, test, expect } from '@jest/globals';
import {
  formatValidations,
  isValidFormatWithOutDash
} from '../../src/Utils/utils';

describe('formatValidations function', () => {
  test('should throw error if the parameter is not a string', () => {
    expect(() => {
      // @ts-expect-error Ignoring type error for testing purposes
      formatValidations(12345678);
    }).toThrowError('Invalid RUT format. RUT must be a string.');
  });

  test('should throw error if the RUT starts with zero', () => {
    expect(() => {
      formatValidations('012345678');
    }).toThrowError('Invalid RUT format. RUT cannot start with zero.');
  });

  test('should throw error if the RUT has more than 10 digits', () => {
    expect(() => {
      formatValidations('12345678901');
    }).toThrowError(
      'Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.'
    );
  });

  test('should throw error if the RUT contains non-numeric characters', () => {
    expect(() => {
      formatValidations('12.34a.678');
    }).toThrowError(
      'Invalid RUT format. RUT must be numeric and have between 1 and 10 digits.'
    );
  });

  test('should not throw error for a valid RUT with "-"', () => {
    expect(() => {
      formatValidations('12.345.678-9');
    }).not.toThrow();
    expect(() => {
      formatValidations('12.345.678-K');
    }).not.toThrow();
    expect(() => {
      formatValidations('2.345.678-9');
    }).not.toThrow();
    expect(() => {
      formatValidations('2.345.678-k');
    }).not.toThrow();
    expect(() => {
      formatValidations('992.345.678-9');
    }).not.toThrow();
    expect(() => {
      formatValidations('992345678-K');
    }).not.toThrow();
    expect(() => {
      formatValidations('999.999.999-k');
    }).not.toThrow();
    expect(() => {
      formatValidations('1-k');
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

describe('isValidFormatWithOutDash function', () => {
  test('should return true for valid RUT without dash and without dots', () => {
    expect(isValidFormatWithOutDash('12345678')).toBe(true);
    expect(isValidFormatWithOutDash('1')).toBe(true);
    expect(isValidFormatWithOutDash('123')).toBe(true);
    expect(isValidFormatWithOutDash('999999999')).toBe(true);
  });

  test('should return true for valid RUT without dash and with dots', () => {
    expect(isValidFormatWithOutDash('12.345.678')).toBe(true);
    expect(isValidFormatWithOutDash('1.234.567')).toBe(true);
    expect(isValidFormatWithOutDash('123.456')).toBe(true);
    expect(isValidFormatWithOutDash('999.999.999')).toBe(true);
  });

  test('should return false for RUT with invalid characters', () => {
    expect(isValidFormatWithOutDash('1234a678')).toBe(false);
    expect(isValidFormatWithOutDash('1234-678')).toBe(false);
    expect(isValidFormatWithOutDash('12.34a.678')).toBe(false);
    expect(isValidFormatWithOutDash('12.345.678-9')).toBe(false);
  });

  test('should return false for RUT with more than 9 digits', () => {
    expect(isValidFormatWithOutDash('1234567890')).toBe(false);
    expect(isValidFormatWithOutDash('1.234.567.890')).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(isValidFormatWithOutDash('')).toBe(false);
  });
});
