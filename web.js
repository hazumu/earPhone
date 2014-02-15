var express = require("express"),
    routes = require('./routes'),
    routeConsole = require('./routes/console'),
    socketIO = require('socket.io'),
    http = require('http'),
    path = require('path'),
    app    = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    // app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/console', routeConsole.console);

var server = http.createServer(app);
console.log(app.get("port"));
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = socketIO.listen(server);

// クライアントが接続してきたときの処理
io.sockets.on('connection', function(socket) {
    console.log("connection");

    socket.on('message', function(data) {
        io.sockets.emit('message', { value: data.value });
    });

    socket.on('disconnect', function(){
        console.log("disconnect");
    });
});
