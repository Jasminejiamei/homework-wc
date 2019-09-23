const fs = require("fs")
const path = require('path')
const commonHandle = require('./constant')

module.exports = (filePath, commands) => {
  try {
    commands.forEach((command) => {
    //根据文件路径读取文件，返回文件列表
      fs.readdir(filePath, (err, files) => {
        if (err) {
          console.log('如果使用 -s 指令请选择一个文件夹')
          console.log('正则表达式不需要使用 -s 操作')
          throw new Error('unexpected command')
        } else {
          //遍历读取到的文件列表
          files.forEach((filename) => {
            //获取当前文件的绝对路径
            const filedir = path.join(filePath, filename)
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            fs.stat(filedir, (error, stats) => {
              if (error) {
                console.warn('获取文件stats失败')
                throw new Error('unexpected command')
              } else {
                const isFile = stats.isFile()  //是文件
                const isDir = stats.isDirectory()  //是文件夹
                if (isFile) {
                  commonHandle[command].call(this, filedir, command)
                }
                if (isDir) {
                  fileDisplay(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
              }
            })
          })
        }
      })
    })
  } catch (e) {
    console.log(e.message)
  }
}
