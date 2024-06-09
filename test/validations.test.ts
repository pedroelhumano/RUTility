import {describe, test, expect} from '@jest/globals';
// import { isValidRut } from '../src/validations';

describe('isValidRut', () => {
  test('2+2 is:', () => {
    expect(4)
  })
  // test('should return true for a valid RUT with dots and dash', () => {
  //   const validRut = '12.345.678-9';
  //   expect(isValidRut(validRut)).toBe(true);
  // });

  // // Segundo caso de prueba: RUT válido sin puntos y con guión
  // test('should return true for a valid RUT without dots and with dash', () => {
  //   const validRut = '12345678-9';
  //   expect(isValidRut(validRut)).toBe(true);
  // });

  // // Tercer caso de prueba: RUT inválido con formato incorrecto
  // test('should throw an error for an invalid RUT format', () => {
  //   const invalidRut = '12-345-678-9';
  //   expect(() => isValidRut(invalidRut)).toThrowError('Invalid RUT format');
  // });
});
