软工作业

## 开发环境

开发语言：`node.js`
开发环境：Visual Studio Code

## 原理

主要是使用 `node.js` 中的 `fs`（文件系统）和 `process.argv`（含命令行参数）

`fs` 是读取文件操作指令集
`process.argv` 是获取命令行指令操作


## 代码运行测试
完成了基本功能和扩展功能，高级功能未能实现
在 `git bash` 中运行以下命令，`file` 可以相应替换成测试文件

有三个基础指令，分别是 `-c`，`-w`，`-l`
```bash
homeworkWc -c file  //返回文件 file.c 的字符数
homeworkWc -w file  //返回文件 file.c 的词的
homeworkWc -l file  //返回文件 file.c 的行数
homeworkWc -s -c/-l/-w [文件夹名称]]  //返回文件夹符合规定的文件的相应统计结果
homeworkWc -a file  //返回文件空行等信息
homeworkWc -x file  //打开图形界面
```
例如：
```bash 输入命令行
homeworkWc -c test/file.txt
homeworkWc -s -c test
```


