 var http = require("http");
 var c = require('child_process');
  
 http.createServer(function(req,res){
   res.writeHead(200,{"Content-Type":"text/html"});
   res.write("<p>The number of file`s letter is:</p>");
   res.write("<p>The number of file`s word is:</p>");
   res.write("<p>The number of file`s line is:</p>");
   res.end("<button>Please select a file</button>");
}).listen(3000);
// console.log("Http server is listening at port 3000");
c.exec('start G:/aboutFrontEnd/前端/软工作业/homeworkWc/index.html')