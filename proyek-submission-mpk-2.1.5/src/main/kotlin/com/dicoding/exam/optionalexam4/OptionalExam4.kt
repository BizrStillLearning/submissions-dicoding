package com.dicoding.exam.optionalexam4

// TODO
fun getMiddleCharacters(string: String): String {
    val length = string.length
    val mid = length / 2

    return if (length % 2 == 0) {
        string.substring(mid - 1, mid + 1)
    } else {
        string[mid].toString()
    }
}