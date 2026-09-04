package com.dicoding.exam.optionalexam2

// TODO
fun minAndMax(number: Int): Int {
    val numberString = number.toString()
    val minDigit = numberString.minOrNull()?.digitToInt() ?: 0
    val maxDigit = numberString.maxOrNull()?.digitToInt() ?: 0
    return minDigit + maxDigit
}