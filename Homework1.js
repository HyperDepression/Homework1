function ToLowerCase(str){
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function Spaces(str){
    marks = new Set(`!()-;?:'",.;`)
    marks.forEach(x => {
        str = str.replaceAll(x, x + ' ')
        str = str.replaceAll(' ' + x, x)
    });
    return str.split(' ').filter(x => x).join(' ')
}

function WordCount(str){
    marks = new Set(`!()-;?:'",.;`)
    marks.forEach(x => {
        str = str.replaceAll(x, '')
    });
    return str.split(' ').filter(x => x).length
}

function UniqueWordCount(str){
    str = str.toLowerCase()
    marks = new Set(`!()-;?:'",.;`)
    marks.forEach(x => {
        str = str.replaceAll(x, '')
    });
    str = str.split(' ')
    words = new Set(str)
    count = new Map()
    words.forEach(i => {count.set(i, str.filter(x => x == i).length)})
    return count
}

// str = `Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.`
// console.log(ToLowerCase(str))
// console.log(Spaces(str))
// console.log(WordCount(str))
// str = `Текст, в котором слово текст несколько раз встречается и слово тоже`
// UniqueWordCount(str).forEach((value, key, map) => console.log(key + ` ` + value))