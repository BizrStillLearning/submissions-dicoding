import test from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

test('menjumlahkan dua angka positif', () => {
    assert.strictEqual(sum(2, 3), 5);
});

test('menjumlahkan dengan nol', () => {
    assert.strictEqual(sum(5, 0), 5);
});

test('mengembalikan 0 jika ada angka negatif', () => {
    assert.strictEqual(sum(-2, 3), 0);
});

test('mengembalikan 0 jika kedua angka negatif', () => {
    assert.strictEqual(sum(-2, -3), 0);
});

test('mengembalikan 0 jika input string', () => {
    assert.strictEqual(sum('2', 3), 0);
});

test('mengembalikan 0 jika input null', () => {
    assert.strictEqual(sum(null, 3), 0);
});

test('mengembalikan 0 jika input undefined', () => {
    assert.strictEqual(sum(undefined, 3), 0);
});