var express = require("express"),
    routes = require('./routes'),
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

    // 雨モード
    socket.on('ame', function(data) {
        console.log('ame event');
        io.sockets.emit('ame', data);
    });
    // 夏モード
    socket.on('natsu', function(data) {
        console.log('natsu event');
        io.sockets.emit('natsu', data);
    });
    // 予定モード
    socket.on('yotei', function(data) {
        console.log('yotei event');
        io.sockets.emit('yotei', data);
    });
    // 寝るモード
    socket.on('neru', function(data) {
        console.log('neru event');
        io.sockets.emit('neru', data);
    });

    socket.on('disconnect', function(){
        console.log("disconnect");
    });
});
