 var http = require("http");
 var c = require('child_process');
  
//  http.createServer(function(req,res){
//    res.writeHead(200,{"Content-Type":"text/html"});
//    res.write("<p>The number of file`s letter is:</p>");
//    res.write("<p>The number of file`s word is:</p>");
//    res.write("<p>The number of file`s line is:</p>");
//    res.end("<button>Please select a file</button>");
// }).listen(3000);
// console.log("Http server is listening at port 3000");
// c.exec('start G:/aboutFrontEnd/前端/软工作业/homeworkWc/index.html')

var fs = require('fs'),
var url = require('url'),
var path = require('path'),
var http = require('http');
 
//从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);
 
//创建服务器
var server = http.createServer(function (request, response) {
    //获取URL的路径
    var pathname = url.parse(request.url).pathname,
    //获取对应的本地文件的路径
    filepath = path.join(root, pathname);
    fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
        console.log('200 ' + request.url);
        response.writeHead(200);
        fs.createReadStream(filepath).pipe(response);
      } else {
        console.log('404 ' + request.url);
        response.writeHead(404);
        response.end('404 Not Found');
      }
    });
});
 
server.listen(8080);