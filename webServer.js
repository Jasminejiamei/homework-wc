var http= require('http');
var fs= require('fs');
// 传入http server，并传入回调函数
var server= http.createServer(function(request, response){
    var url = request.url;
    if(url === '/'){
        fs.readFile('./index.html', function(err, data){
          if(!err){
            response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            response.end(data)
          }else{
              throw err;
          }
        });
    }else{
        console.log("错误");
    }
});
server.listen(8080, '127.0.0.1');