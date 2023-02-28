function Add(num1, num2) {
    let x = BigInt(num1), y = BigInt(num2)
    return (x + y).toString()
}

function Sub(num1, num2) {
    let x = BigInt(num1), y = BigInt(num2)
    return (x - y).toString()
}

function Mult(num1, num2) {
    let x = BigInt(num1), y = BigInt(num2)
    return (x * y).toString()
}

function Div(num1, num2) {
    let x = BigInt(num1), y = BigInt(num2)
    return (x / y).toString()
}

module.exports = {Add, Sub, Mult, Div}