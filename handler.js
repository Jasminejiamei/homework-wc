// handler.js 基本操作指令

const fs = require("fs")
const readline = require('readline')
const path = require('path')

/*
 * 逐行读取文件，待下一步操作
 * input: fileName：文件相对路径
 * return：rl：逐行读取的文件内容
 */
const readLineHandle = (fileName) => {
  let filepath = path.join(__dirname, fileName)
  let input = fs.createReadStream(filepath)
  return readline.createInterface({
    input: input
  })
}

// -l 指令 
const returnLinesNum = (fileName) => {
  const rl = readLineHandle(fileName)
  let lines = 0
  // 逐行加一
  rl.on('line', (line) => {
    lines += 1
  })
  rl.on('close', () => {
    console.log(`${fileName}文件的行数为: ${lines}`)
  })
}

// -s 指令
const returnWordsNum = (fileName) => {
  const rl = readLineHandle(fileName)
  let words = []
  // 对逐行的内容操作，以空格为分界计算单词数，压入单词栈
  rl.on('line', (line) => {
    const currentLineArr = line.trim().split(' ')
    const currentLine = currentLineArr.length === 0 ? line : currentLineArr
    words = [...words, ...currentLine]
  })
  rl.on('close', () => {
    console.log(`${fileName}文件的单词数为: ${words.length}`)
  })
}

// -c 指令
const returnLettersNum = (fileName) => {
  const rl = readLineHandle(fileName)
  let words = []
  // 对逐行的内容操作，以空格为分界计算单词数，压入单词栈
  rl.on('line', (line) => {
    const currentLineArr = line.trim().split(' ')
    const currentLine = currentLineArr.length === 0 ? line : currentLineArr
    words = [...words, ...currentLine]
  })
  rl.on('close', () => {
    // 逐行读取结束时，对单词栈的逐个单词长度累加，得字符数
    const wordsNum = words.reduce((acc, val) => {
      return acc + val.length
    }, 0)
    console.log(`${fileName}文件的字母数为: ${wordsNum}`)
  })
}

exports = module.exports = {
  returnLinesNum,
  returnWordsNum,
  returnLettersNum
}
