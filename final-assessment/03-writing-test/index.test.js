import test from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('menjumlahkan dua angka dengan benar', () => {
    const result = sum(2, 3);
    assert.strictEqual(result, 5);
});

test('menjumlahkan angka negatif', () => {
    const result = sum(-2, -3);
    assert.strictEqual(result, -5);
});

test('menjumlahkan angka dengan nol', () => {
    const result = sum(5, 0);
    assert.strictEqual(result, 5);
});