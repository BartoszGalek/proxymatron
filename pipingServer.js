var path = require('path'),
    fs   = require('fs'),
    http = require('http'),
    port = 4000
    handleRequest,
    server;

handleRequest = function(req, res) {
  //TODO change to path determining child_process.execFile(file, /*, args, options, callback, */);
  var file = path.normalize(req.url);
  
  path.exists(file, function(exists) {
    if (exists) {
      fs.stat(file, function(err, stat) {
        var rs;
        
        if (err) { throw err; }
        
        if (stat.isDirectory()) {
          res.writeHead(403);
          res.end('Forbidden');
        } else {
          rs = fs.createReadStream(file);
          res.writeHead(200);
          rs.pipe(res);
        }
      });
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  })
};

server = http.createServer(handleRequest);

server.listen(port);