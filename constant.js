// constant.js

const { returnLinesNum, returnWordsNum, returnLettersNum } = require('./handler')

// 返回基本指令集和指令操作
module.exports = {
	'-c': returnLettersNum,  //返回文件 file 的字符数
	'-w': returnLinesNum,    //返回文件 file 的词的数目
	'-l': returnWordsNum    //返回文件 file 的行数
}
