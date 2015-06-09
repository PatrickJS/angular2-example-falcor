

var server = require('./server/server')(__dirname);

server.listen(8080, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('navigate to http://localhost:8080');
});
