import { describe, it, expect } from 'vitest';
import { allocate, recover } from '../backend/shared/split.js';
const row = (id, value) => ({ beneficiaryId: id, label: id, value });
describe('minor-unit split allocation', () => {
    it('allocates $100 to manufacturer $70 and DoneDoc $30', () => expect(allocate(10000, { mode: 'fixed', shares: [row('manufacturer', 7000), row('DoneDoc', 3000)] }).map(a => a.amountMinor)).toEqual([7000, 3000]));
    it('allocates $120 among three parties', () => expect(allocate(12000, { mode: 'fixed', shares: [row('manufacturer', 8000), row('DoneDoc', 2000), row('franchise', 2000)] }).map(a => a.amountMinor)).toEqual([8000, 2000, 2000]));
    it('rejects invalid totals and duplicate beneficiaries', () => { expect(() => allocate(10000, { mode: 'percentage', shares: [row('a', 6000), row('b', 3000)] })).toThrow(); expect(() => allocate(10000, { mode: 'fixed', shares: [row('a', 5000), row('a', 5000)] })).toThrow(); });
    it('distributes odd cents without losing money', () => expect(allocate(101, { mode: 'percentage', shares: [row('a', 3333), row('b', 3333), row('c', 3334)] }).reduce((n, a) => n + a.amountMinor, 0)).toBe(101));
    it('calculates proportional $60 recovery on $120', () => expect(recover(allocate(12000, { mode: 'fixed', shares: [row('manufacturer', 8000), row('DoneDoc', 2000), row('franchise', 2000)] }), 6000, 12000).map(a => a.amountMinor)).toEqual([4000, 1000, 1000]));
});
