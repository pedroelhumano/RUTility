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

        test('should do nothing if RUT already has dash', () => {
            expect(format.dash('12345678-0')).toBe('12345678-0');
            expect(format.dash('12345678-K')).toBe('12345678-K');
            expect(format.dash('12345678-k')).toBe('12345678-k');
            expect(format.dash('5678-0')).toBe('5678-0');
            expect(format.dash('123-4')).toBe('123-4');
            expect(format.dash('1-k')).toBe('1-k');
        });

        test('should handle short RUTs', () => {
            expect(format.dash('1-k')).toBe('1-k');
            expect(format.dash('12-K')).toBe('12-K');
            expect(format.dash('11')).toBe('1-1');
            expect(format.dash('3-k')).toBe('3-k');
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
        test('should remove dots from RUT', () => {
            expect(format.notDot('12.345.678-0')).toBe('12345678-0');
            expect(format.notDot('12.345.678')).toBe('12345678');
        });
    });

    describe('format.notDash', () => {
        test('should remove dash from RUT', () => {
            expect(format.notDash('12.345.678-0')).toBe('12.345.678');
            expect(format.notDash('12345678-0')).toBe('12345678');
        });
    });

    describe('format.notDotDash', () => {
        test('should remove dots and dash from RUT', () => {
            expect(format.notDotDash('12.345.678-9')).toBe('12345678');
            expect(format.notDotDash('12.345.678')).toBe('12345678');
        });
    });
});
