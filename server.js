//create server
const http = require('http');
const server = http.createServer();
//assign a port where the project will run on
const port = proccess.env.PORT || 3000;
server.listen(port);