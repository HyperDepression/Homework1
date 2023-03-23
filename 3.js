class Product {
    constructor(name, price, quan, desc) {
        this.name = name
        this.price = price
        this.quantity = quan
        this.description = desc
    }

    static query(str, arr) {

        function StrQuery(strQue, res) {
            for (let i = 0; i < res.length; i++) {
                switch (strQue[1]) {
                    case 'contains':
                        if (!res[i][strQue[0]].includes(strQue[2])) {
                            res.splice(i--, 1)
                        }
                        break;
                    case 'starts':
                        if (!res[i][strQue[0]].startsWith(strQue[2])) {
                            res.splice(i--, 1)
                        }
                        break;
                    case 'ends':
                        if (!res[i][strQue[0]].endsWith(strQue[2])) {
                            res.splice(i--, 1)
                        }
                        break;
                    default:
                        res = ['Error', 'Wrong operation']
                }
            }
        }

        function NumQuery(numQue, res) {
            for (let i = 0; i < res.length; i++) {
                let sign = (numQue[1].indexOf('=') < 1)
                    ? numQue[1].slice(0, 1)
                    : numQue[1].slice(0, 2)
                let num = (numQue[1].indexOf('=') < 1)
                    ? Number(numQue[1].slice(1))
                    : Number(numQue[1].slice(2))
                if (num == NaN) return ['Error', 'Not a number']
                switch (sign) {
                    case '>':
                        if (res[i][numQue[0]] <= num) {
                            res.splice(i--, 1)
                        }
                        break;
                    case '>=':
                        if (res[i][numQue[0]] < num) {
                            res.splice(i--, 1)
                        }
                        break;
                    case '<':
                        if (res[i][numQue[0]] >= num) {
                            res.splice(i--, 1)
                        }
                        break;
                    case '<=':
                        if (res[i][numQue[0]] > num) {
                            res.splice(i--, 1)
                        }
                        break;
                    case '=':
                        if (res[i][numQue[0]] != num) {
                            res.splice(i--, 1)
                        }
                        break;
                    default:
                        res = ['Error', 'Wrong operation sign']
                }
            }
        }

        let que = str.split('&'),
            res = arr.slice()

        for (let elem of que) {
            let parsed = elem.split('-')
            if (parsed[0] == 'name' || parsed[0] == 'description')
                StrQuery(parsed, res)
            else if (parsed[0] == 'price' || parsed[0] == 'quantity')
                NumQuery(parsed, res)
            else res = ['Error', 'Wrong attribute name']

            if (res == [] || res[0] === 'Error') return res
        }
        return res
    }
}

let arr = []
arr.push(new Product('cookie', 2, 60, 'sweety'))
arr.push(new Product('pie', 5, 8, 'apple'))
arr.push(new Product('cake', 3, 6, 'tasty'))
arr.push(new Product('bun', 3, 4, 'nasty'))
arr.push(new Product('pizza', 4, 10, 'pineapple'))

let query = Product.query('name-contains-k&price->=2&quantity->=6&description-ends-y', arr)

for (let i of query) console.log(i)