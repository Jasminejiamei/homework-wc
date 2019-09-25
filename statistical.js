//  各种操作指令的实现

const http = require("http");
const c = require('child_process');
const fs = require("fs")
const readline = require('readline')
const path = require('path')
const httpServer = require('./webServer')

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


// -c 指令
const LettersNum = (fileName) => {
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
    console.log(`${fileName}文件的字符数为: ${wordsNum}`)
  })
}

// -l 指令 
const LinesNum = (fileName) => {
  const rl = readLineHandle(fileName)
  let lines = 0
  rl.on('line', (line) => {
    lines += 1
  })
  rl.on('close', () => {
    console.log(`${fileName}文件的行数为: ${lines}`)
  })
}

// -w 指令
const WordsNum = (fileName) => {
  const rl = readLineHandle(fileName)
  let words = []
  // 以空格分界计算单词数，压入单词栈
  rl.on('line', (line) => {
    const currentLineArr = line.trim().split(' ')
    const currentLine = currentLineArr.length === 0 ? line : currentLineArr
    words = [...words, ...currentLine]
  })
  rl.on('close', () => {
    console.log(`${fileName}文件的单词数为: ${words.length}`)
  })
}

// -a 指令
const returnNull = (fileName) => {
  const rl = readLineHandle(fileName)
  let lines = 0
  let nullLine = 0
  let filecode = 0
  let solution = 0
  rl.on('line', (line) => {
    lines += 1;
    if (line.split(/^(\s*)\r\n/g)[0] === '') {
      nullLine++;
    }
    if (line.match(/\/\//g) || line.match(/\/\*/g) || line.match(/\*\//g)) {
      solution++;
    }
  })
  rl.on('close', () => {
    console.log(`${fileName}文件的代码行有: ${lines-solution-nullLine}`)
    console.log(`${fileName}文件的空行有: ${nullLine}`)
    console.log(`${fileName}文件的注释行有: ${solution/2}`)
    }, 0)
}

// 高级功能
const returnHTML = ()=>{
  console.log("start G:/aboutFrontEnd/前端/软工作业/homeworkWc/index.html");
  c.exec('start G:/aboutFrontEnd/前端/软工作业/homeworkWc/index.html')
}

exports = module.exports = {
  LinesNum,
  WordsNum,
  LettersNum,
  returnNull,
  returnHTML
}
