import {formattingMoney} from '../scripts/utils/foramtingMoney.js';

describe('Money Formatting Test suite', () => {
    it('should format cents to dollars correctly', () => {
        expect(formattingMoney(100)).toEqual('1.00');
        expect(formattingMoney(2500)).toBe('25.00');
        expect(formattingMoney(9999)).toBe('99.99');          
    });
    it('work with zero', () => {
        expect(formattingMoney(0)).toBe('0.00');
    });
     it('work with negative numbers', () => {
        expect(formattingMoney(-500)).toEqual('-5.00');
    });

});