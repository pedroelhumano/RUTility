import { describe, test, expect } from '@jest/globals';
import { format } from '../src/formats';

describe('RUT Formatting Functions', () => {
    describe('format.dot', () => {
        test('should format RUT with dots', () => {
            expect(format.dot('123456780')).toBe('123.456.780');
            expect(format.dot('12345678-0')).toBe('12.345.678-0');
            expect(format.dot('12345678-K')).toBe('12.345.678-K');
            expect(format.dot('5678-0')).toBe('5.678-0');
            expect(format.dot('5678-k')).toBe('5.678-k');
            expect(format.dot('678-0')).toBe('678-0');
            expect(format.dot('1-k')).toBe('1-k');
            expect(format.dot('1')).toBe('1');
        });

        test('should do nothing if RUT is already formatted with dots', () => {
            expect(format.dot('123.456.780')).toBe('123.456.780');
            expect(format.dot('12.345.678-0')).toBe('12.345.678-0');
            expect(format.dot('12345678-K')).toBe('12.345.678-K');
            expect(format.dot('5678-0')).toBe('5.678-0');
            expect(format.dot('5678-k')).toBe('5.678-k');
            expect(format.dot('678-0')).toBe('678-0');
            expect(format.dot('1-k')).toBe('1-k');
        });
    });

    describe('format.dash', () => {
        test('should add dash if missing', () => {
            expect(format.dash('123456780')).toBe('12345678-0');
            expect(format.dash('12345678')).toBe('1234567-8');
            expect(format.dash('56780')).toBe('5678-0');
            expect(format.dash('123')).toBe('12-3');
            expect(format.dash('12')).toBe('1-2');
        });

        test('should add dash if missing and keep dots', () => {
            expect(format.dash('12.345.6780')).toBe('12.345.678-0');
            expect(format.dash('1.234.567')).toBe('1.234.56-7');
            expect(format.dash('123.456.789')).toBe('123.456.78-9');
        });
    
        test('should handle short RUTs', () => {
            expect(format.dash('1k')).toBe('1-k');
            expect(format.dash('12-K')).toBe('12-K');
            expect(format.dash('11')).toBe('1-1');
            expect(format.dash('3-k')).toBe('3-k');
        });
    
        test('should handle long RUTs', () => {
            expect(format.dash('123456789K')).toBe('123456789-K');
            expect(format.dash('123.456.789K')).toBe('123.456.789-K');
        });

        test('should do nothing if RUT already has dash', () => {
            expect(format.dash('12345678-0')).toBe('12345678-0');
            expect(format.dash('12345678-K')).toBe('12345678-K');
            expect(format.dash('12345678-k')).toBe('12345678-k');
            expect(format.dash('5678-0')).toBe('5678-0');
            expect(format.dash('123-4')).toBe('123-4');
            expect(format.dash('1-k')).toBe('1-k');
        });
    
        test('should do nothing if RUT already has dots and dash', () => {
            expect(format.dash('12.345.678-0')).toBe('12.345.678-0');
            expect(format.dash('1.234.567-8')).toBe('1.234.567-8');
            expect(format.dash('999.999.999-K')).toBe('999.999.999-K');
        });
    });

    describe('format.dotDash', () => {
        test('should add dots and dash if missing', () => {
            expect(format.dotDash('123456780')).toBe('12.345.678-0');
            expect(format.dotDash('5678k')).toBe('5.678-k');
            expect(format.dotDash('111111111')).toBe('11.111.111-1');
            expect(format.dotDash('12345')).toBe('1.234-5');
        });
    
        test('should add dash if missing and already has dots', () => {
            expect(format.dotDash('12.345.6780')).toBe('12.345.678-0');
            expect(format.dotDash('1.234.5678')).toBe('1.234.567-8');
        });
    
        test('should add dots if missing and already has dash', () => {
            expect(format.dotDash('12345678-0')).toBe('12.345.678-0');
            expect(format.dotDash('5678-0')).toBe('5.678-0');
        });
    
        test('should do nothing if RUT already has dots and dash', () => {
            expect(format.dotDash('12.345.678-0')).toBe('12.345.678-0');
            expect(format.dotDash('1.234.567-8')).toBe('1.234.567-8');
            expect(format.dotDash('999.999.999-k')).toBe('999.999.999-k');
            expect(format.dotDash('123-k')).toBe('123-k');
            expect(format.dotDash('1-2')).toBe('1-2');
        });
    
        test('should handle short RUTs', () => {
            expect(format.dotDash('1-k')).toBe('1-k');
            expect(format.dotDash('12-K')).toBe('12-K');
            expect(format.dotDash('3-k')).toBe('3-k');
            expect(format.dotDash('10')).toBe('1-0');
            expect(format.dotDash('12K')).toBe('12-K');
        });
    
        test('should handle long RUTs', () => {
            expect(format.dotDash('1234567890')).toBe('123.456.789-0');
            expect(format.dotDash('123456789K')).toBe('123.456.789-K');
        });
    });

    describe('format.notDot', () => {
        test('should remove dots from RUT with dash', () => {
            expect(format.notDot('12.345.678-0')).toBe('12345678-0');
            expect(format.notDot('1.234.567-K')).toBe('1234567-K');
            expect(format.notDot('123.456.789-9')).toBe('123456789-9');
        });
    
        test('should remove dots from RUT without dash', () => {
            expect(format.notDot('12.345.678')).toBe('12345678');
            expect(format.notDot('1.234.567')).toBe('1234567');
            expect(format.notDot('123.456.789')).toBe('123456789');
        });

        test('should do nothing if RUT already has no dots', () => {
            expect(format.notDot('12345678-0')).toBe('12345678-0');
            expect(format.notDot('12345678K')).toBe('12345678K');
            expect(format.notDot('123456789')).toBe('123456789');
        });
    
        test('should handle short RUTs', () => {
            expect(format.notDot('1.2')).toBe('12');
            expect(format.notDot('1.2-3')).toBe('12-3');
            expect(format.notDot('1-K')).toBe('1-K');
        });

        test('should handle long RUTs', () => {
            expect(format.notDot('123.456.789-0')).toBe('123456789-0');
            expect(format.notDot('123.456.789-K')).toBe('123456789-K');
            expect(format.notDot('123.456.789')).toBe('123456789');
        });
    });
    
    // describe('format.notDash', () => {
    //     // RUTs en blanco donde se deben remover los guiones (manteniendo los puntos si existen)
    //     test('should remove dash from RUT with dots', () => {
    //         expect(format.notDash('12.345.678-0')).toBe('12.345.678');
    //         expect(format.notDash('1.234.567-K')).toBe('1.234.567K');
    //         expect(format.notDash('123.456.789-9')).toBe('123.456.789');
    //     });
    
    //     // RUTs con guion sin puntos (debe remover solo el guion)
    //     test('should remove dash from RUT without dots', () => {
    //         expect(format.notDash('12345678-0')).toBe('12345678');
    //         expect(format.notDash('12345678-K')).toBe('12345678K');
    //         expect(format.notDash('123456789-9')).toBe('123456789');
    //     });
    
    //     // RUTs que ya vienen sin puntos ni guion (debe retornar lo mismo que entra)
    //     test('should do nothing if RUT already has no dash', () => {
    //         expect(format.notDash('12345678')).toBe('12345678');
    //         expect(format.notDash('12345678K')).toBe('12345678K');
    //         expect(format.notDash('123456789')).toBe('123456789');
    //     });
    
    //     // RUTs cortos
    //     test('should handle short RUTs', () => {
    //         expect(format.notDash('1-2')).toBe('12');
    //         expect(format.notDash('1-K')).toBe('1K');
    //         expect(format.notDash('12-K')).toBe('12K');
    //     });
    
    //     // RUTs largos
    //     test('should handle long RUTs', () => {
    //         expect(format.notDash('123456789012-3')).toBe('1234567890123');
    //         expect(format.notDash('123456789012-K')).toBe('123456789012K');
    //     });
    // });
    
    // describe('format.notDotDash', () => {
    //     // RUTs en blanco donde se deben remover los puntos y el guion
    //     test('should remove dots and dash from RUT', () => {
    //         expect(format.notDotDash('12.345.678-9')).toBe('123456789');
    //         expect(format.notDotDash('1.234.567-K')).toBe('1234567K');
    //         expect(format.notDotDash('123.456.789-0')).toBe('1234567890');
    //     });
    
    //     // RUTs con puntos sin guion (debe remover solo los puntos)
    //     test('should remove dots from RUT without dash', () => {
    //         expect(format.notDotDash('12.345.678')).toBe('12345678');
    //         expect(format.notDotDash('1.234.567')).toBe('1234567');
    //         expect(format.notDotDash('123.456.789')).toBe('123456789');
    //     });
    
    //     // RUTs con guion sin puntos (debe remover solo el guion)
    //     test('should remove dash from RUT without dots', () => {
    //         expect(format.notDotDash('12345678-9')).toBe('123456789');
    //         expect(format.notDotDash('12345678-K')).toBe('12345678K');
    //     });
    
    //     // RUTs que ya vienen sin puntos ni guion (debe retornar lo mismo que entra)
    //     test('should do nothing if RUT already has no dots or dash', () => {
    //         expect(format.notDotDash('123456789')).toBe('123456789');
    //         expect(format.notDotDash('12345678K')).toBe('12345678K');
    //     });
    
    //     // RUTs cortos
    //     test('should handle short RUTs', () => {
    //         expect(format.notDotDash('1-2')).toBe('12');
    //         expect(format.notDotDash('1.2')).toBe('12');
    //         expect(format.notDotDash('1-K')).toBe('1K');
    //     });
    
    //     // RUTs largos
    //     test('should handle long RUTs', () => {
    //         expect(format.notDotDash('123.456.789.012-3')).toBe('1234567890123');
    //         expect(format.notDotDash('123.456.789.012-K')).toBe('123456789012K');
    //     });
    // });    
});
