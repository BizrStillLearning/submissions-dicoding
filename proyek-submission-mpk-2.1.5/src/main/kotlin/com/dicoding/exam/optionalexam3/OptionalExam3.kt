package com.dicoding.exam.optionalexam3

// TODO
fun manipulateString(str: String, int: Int): String {
    val numberPart = str.filter { it.isDigit() }
    val textPart = str.filterNot { it.isDigit() }

    return if (numberPart.isNotEmpty()) {
        textPart + (numberPart.toInt() * int)
    } else {
        str + int
    }
}