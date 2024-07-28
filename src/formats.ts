import { formatValidations } from './Utils/utils';

export const format = {
  /**
   * Function to format a RUT by adding dots.
   * @param {string} rut - The RUT to format.
   * @returns {string} The formatted RUT with dots.
   * @example
   * // Returns '12.345.678'
   * format.dot('12345678');
   * @example
   * // Returns '12.345.678-K'
   * format.dot('12345678-K');
   */
  dot: (rut: string): string => {
    formatValidations(rut);
    const [rutWithoutDv, dv] = rut.replace(/\./g, '').split('-');
    const formattedRut = rutWithoutDv.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return dv ? `${formattedRut}-${dv}` : formattedRut;
  },

  /**
   * Function to format a RUT by adding a dash.
   * @param {string} rut - The RUT to format.
   * @returns {string} The formatted RUT with a dash.
   * @example
   * // Returns '12345678-0'
   * format.dash('123456780');
   * @example
   * // Returns '12.345.678-0'
   * format.dash('12.345.6780');
   * @example
   * // Returns '1-2'
   * format.dash('12');
   */
  dash: (rut: string): string => {
    formatValidations(rut);
    if (!rut.includes('-')) {
      return rut.slice(0, -1) + '-' + rut.slice(-1);
    }
    return rut;
  },

  /**
   * Function to format a RUT by adding dots and a dash.
   * @param {string} rut - The RUT to format.
   * @returns {string} The formatted RUT with dots and a dash.
   * @example
   * // Returns '12.345.678-0'
   * format.dotDash('123456780');
   * @example
   * // Returns '12.345.678-K'
   * format.dotDash('12345678-K');
   */
  dotDash: (rut: string): string => {
    formatValidations(rut);
    const cleanRut = rut.replace(/[.-]/g, '');

    const dv = cleanRut.slice(-1);
    const rutWithoutDv = cleanRut.slice(0, -1);
    const formattedRut = rutWithoutDv.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${formattedRut}-${dv}`;
  },

  /**
   * Function to remove dots from a RUT.
   * @param {string} rut - The RUT from which to remove the dots.
   * @returns {string} The RUT without dots.
   * @example
   * // Returns '12345678-0'
   * format.notDot('12.345.678-0');
   * @example
   * // Returns '12345678'
   * format.notDot('12.345.678');
   */
  notDot: (rut: string): string => {
    formatValidations(rut);
    return rut.replace(/\./g, '');
  },

  /**
   * Function to remove the dash from a RUT.
   * @param {string} rut - The RUT from which to remove the dash.
   * @returns {string} The RUT without the dash and the Dv.
   * @example
   * // Returns '12.345.678'
   * format.notDash('12.345.678-0');
   * @example
   * // Returns '12345678'
   * format.notDash('12345678-0');
   */
  notDash: (rut: string): string => {
    formatValidations(rut);
    if (rut.includes('-')) {
      return rut.slice(0, -2);
    }
    return rut;
  },

  /**
   * Function to remove dots and the dash from a RUT.
   * @param {string} rut - The RUT from which to remove dots and the dash.
   * @returns {string} The RUT without dots and the dash.
   * @example
   * // Returns '12345678'
   * format.notDotDash('12.345.678-9');
   * @example
   * // Returns '12345678'
   * format.notDotDash('12.345.678');
   */
  notDotDash: (rut: string): string => {
    formatValidations(rut);
    return rut.replace(/\./g, '').replace(/-(\d|k|K)$/i, '');
  }
};
