// constant.js

const { returnLinesNum, returnWordsNum, returnLettersNum,returnNull,returnHTML} = require('./statistical')

// 返回基本指令集和指令操作
module.exports = {
	'-c': returnLettersNum,  //返回文件 file 的字符数
	'-w': returnLinesNum,    //返回文件 file 的词的数目
	'-l': returnWordsNum,   //返回文件 file 的行数
	'-a':returnNull,		//返回文件更复杂的数据结构
	'-x': returnHTML,		//返回图形页面
}
