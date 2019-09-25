// handler.js 基本操作指令

const fs = require("fs")
const readline = require('readline')
const path = require('path')
var http = require("http");
var c = require('child_process');

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
    console.log(`${fileName}文件的字符数为: ${wordsNum}`)
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

// -a 指令
const returnNull = (fileName) => {
  const rl = readLineHandle(fileName)
  let nullLine = 0
  let filecode = 0
  let solution = 0
  let regxNodeBegin = "\\s*/\\*.*";
  let regxNodeEnd = ".*\\*/\\s*";
  let regx = "//.*";
  let regxSpace = '\ ';
  rl.on('line', (line) => {
    if(line.match(regxNodeBegin)&&line.match(regxNodeEnd)){
      ++solution;
    }
    if(line.match(regxNodeBegin)){
      ++solution;
    }else if(line.match(regxNodeBegin)){
      ++solution;
    }else if(line.match(regxSpace)){
      ++nullLine;
    }else if(line.match(regx)){
      ++solution;
    }else{
      ++filecode;
    }

  })
  rl.on('close', () => {
    console.log(`${fileName}文件的代码行有: ${nullLine}`)
    console.log(`${fileName}文件的空行有: ${filecode-1}`)
    console.log(`${fileName}文件的注释行有: ${solution}`)
    }, 0)
}

// 高级功能
const returnHTML = function(){
  http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<p>The number of file`s letter is:</p>");
    res.write("<p>The number of file`s word is:</p>");
    res.write("<p>The number of file`s line is:</p>");
    res.end("<button>Please select a file</button>");
  }).listen(3000);
  console.log("start G:/aboutFrontEnd/前端/软工作业/homeworkWc/index.html");
  c.exec('start G:/aboutFrontEnd/前端/软工作业/homeworkWc/index.html')
}

exports = module.exports = {
  returnLinesNum,
  returnWordsNum,
  returnLettersNum,
  returnNull,
  returnHTML
}
