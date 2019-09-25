// constant.js

const {LinesNum, WordsNum, LettersNum,returnNull,returnHTML} = require('./statistical')

// 返回基本指令集和指令操作
module.exports = {
	'-c': WordsNum,  //返回文件 file 的字符数
	'-w': LettersNum,    //返回文件 file 的词的数目
	'-l': LinesNum,   //返回文件 file 的行数
	'-a': returnNull,		//返回文件更复杂的数据结构
	'-x': returnHTML,		//返回图形页面
}
