function deleteZeros(num) {
    while (num.length != 1 && num[num.length - 1] == 0) num.pop()
}

function LongCompare(x, y) {
    if (x.length > y.length) return true
    if (x.length < y.length) return false
    for (let i = 0; i < x.length; i++) {
        if (x[i] > y[i]) return true
        if (x[i] < y[i]) return false
    }
    return false
}

function Add(num1, num2) {
    let sign = '', x = num1, y = num2
    if (x[0] == '-' && y[0] == '-') {
        sign = '-'
        x = x.slice(1)
        y = y.slice(1)
    }
    if (x[0] == '-') return Sub(y, x.slice(1));
    if (y[0] == '-') return Sub(x, y.slice(1));

    if (LongCompare(y, x)) {
        let temp = x
        x = y.split('').reverse()
        y = temp.split('').reverse()
    }
    else {
        x = x.split('').reverse()
        y = y.split('').reverse()
    }

    let res = []
    for (let i = 0, sum = 0, exc = 0; i < x.length; i++) {
        sum = Number(x[i]) + (Number(y[i]) || 0) + exc
        if (sum > 9) {
            exc = 1
            res[i] = sum - 10
        }
        else {
            exc = 0
            res[i] = sum
        }
    }
    deleteZeros(res)
    return sign + res.reverse().join('')
}

function Sub(num1, num2) {
    let sign = '',
        x = num1, y = num2
    if (num1[0] != '-' && num2[0] == '-') return Add(num1, num2.slice(1))
    if (num1[0] == '-' && num2[0] != '-') return '-' + Add(num1.slice(1), num2)
    if (num1[0] == '-' && num2[0] == '-') {
        x = num2.slice(1), y = num1.slice(1)
    }

    if (LongCompare(y, x)) {
        sign = '-'
        let temp = x
        x = y.split('').reverse()
        y = temp.split('').reverse()
    }
    else {
        x = x.split('').reverse()
        y = y.split('').reverse()
    }

    let len = x.length
    res = []
    for (let i = 0, diff = 0, exc = 0; i < len; i++) {
        diff = x[i] - (y[i] || 0) + exc
        if (diff < 0) {
            exc = -1
            res[i] = 10 + diff
        }
        else {
            exc = 0
            res[i] = diff
        }
    }
    deleteZeros(res)
    return sign + res.reverse().join('')
}

function Mult(num1, num2) {
    let x = num1, y = num2, sign = 1
    if (x[0] == '-') {
        x = x.slice(1)
        sign *= -1
    }
    if (y[0] == '-') {
        y = y.slice(1)
        sign *= -1
    }

    if (LongCompare(y, x)) {
        let temp = x
        x = y.split('').reverse()
        y = temp.split('').reverse()
    }
    else {
        x = x.split('').reverse()
        y = y.split('').reverse()
    }

    let res = []
    for (let i = 0; i < x.length + y.length; i++) res[i] = 0

    for (let j = 0; j < y.length; j++) {
        let exc = 0
        for (let i = 0, comp = 0; i < x.length; i++) {
            comp = Number(x[i]) * (Number(y[j])) + exc
            if (comp > 9) {
                exc = Math.floor(comp / 10)
                res[i + j] += comp % 10
            }
            else {
                exc = 0
                res[i + j] += comp
            }
        }
        res[x.length] += exc
    }
    deleteZeros(res)
    return (sign == 1 ? '' : '-') + res.reverse().join('')
}

function Div(num1, num2) {
    let x = num1, y = num2, sign = 1
    if (x[0] == '-') {
        x = x.slice(1)
        sign *= -1
    }
    if (y[0] == '-') {
        y = y.slice(1)
        sign *= -1
    }

    let res = []
    let cur = ''
    while (x != '') {
        let len = 0, div = y, mult = 1
        cur = cur + x[len++]
        while (LongCompare(y, cur) && x[len] != undefined) {
            cur = cur + x[len++]
            res.push(0)
        }
        for (let i = 2; i < 10; i++) {
            let temp = Mult(y, i.toString())
            if (LongCompare(cur, temp) || cur == temp) {
                div = temp
                mult = i
            }
            else break
        }
        cur = Sub(cur, div.toString())
        cur = cur == '0' ? '' : cur
        res.push(mult)
        x = (x.length > len) ? x.slice(len) : ''
    }
    res = res.reverse()
    deleteZeros(res)
    return (sign == 1 ? '' : '-') + res.reverse().join('')
}

module.exports = { Add, Sub, Mult, Div }