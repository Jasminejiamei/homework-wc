#!/usr/bin/env node
const handlers = require('./constant')
const recurseFolder = require('./recurseHandler')

const commandLine = process.argv  // 获取命令行输入
const lineLength = commandLine.length

let commands = []
let files = []
let breakError = true
let lastCommandIdx = 2

handlers['-s'] = recurseFolder

/* 
 * 对命令行输入进行操作
 * 将指令压入指令集 commands
 * 将可能存在的通配符匹配的文件压入所匹配的文件栈 files
 */
const readCommandLines = (async () => {
	try {
		commandLine.forEach((val, i) => {
			if (i > 1 && i < lineLength - 1) {
				const validCommand = val.indexOf('-') === 0
				if (validCommand) {
					// 验证指令是否存在在 handlers 中，不存在则跳出整个操作
					if (handlers[val]) {
						commands.push(val)
						lastCommandIdx = i
					} else {
						console.log(`找不到相关指令: ${val}`)
						throw new Error('cannot find such command')
					}
				}
			}
			breakError = false
		})
	} catch(e) {
		breakError = true
		console.log(e.message)
	}
})()

/* 
 * 验证 -s 是否带基础指令
 */
const dealWithFloder = (commands) => {
	if (!commands || commands.length === 1) {
		console.log('请至少输入一个除 -s 之外的基础指令')
		return false
	}
	commands = commands.filter((val) => {
		return val !== '-s'
	})
	files.forEach((fileName) => {
		recurseFolder(fileName, commands)
	})
}

/* 
 * 指令未有输入错误时可进行指令操作
 * 执行指令与 data 所匹配的命令 
 * 如果是对文件夹的操作则进行文件夹递归操作 recurseFolder
 */
if (!breakError) {
	commandLine.splice(0, lastCommandIdx + 1)
	files = commandLine
	if (commands.indexOf('-s') > -1) {
		return dealWithFloder(commands)
	} else {
		commands.forEach((command) => {
			files.forEach((fileName) => {
				// 执行指令与 data 所匹配的命令
				handlers[command].call(this, fileName, command) 
			})
		})
	}
}
