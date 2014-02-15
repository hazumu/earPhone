$(function() {
    console.log("console page start!");

    var socket = {
        ON_SOCKET_DATA : 'ON_SOCKET_DATA',
        connectUrl : $("#hostName").text(),
        init : function() {
            socket.io = io.connect(socket.connectUrl);
            socket.io.on('connect', socket.onConnected);
            socket.io.on('message', socket.onMessage);
        },
        onConnected : function(msg) {
            document.getElementById("connectId").innerHTML = "接続ID::" + socket.io.socket.transport.sessid;
            document.getElementById("type").innerHTML = "接続方式::" + socket.io.socket.transport.name;
        },
        onMessage : function(data) {
            $(window).trigger(socket.ON_SOCKET_DATA, [data.value]);
        },
        sendData : function(cmd) {
            socket.io.emit(cmd, {value : cmd});
        },
        disConnect : function() {
            var msg = socket.io.socket.transport.sessid + "は切断しました。";
                socket.io.emit('message', {
                value: msg
            });
            // socketを切断する
            socket.io.disconnect();
        }
    };

    var app = {
        init : function() {
            socket.init();
            $(window).on(socket.ON_SOCKET_DATA, function(e, data) {
                app.onSocketData(e, data);
            });
        },
        onSocketData : function(e, data) {
            console.log("受信", e, data);
            // ina_job実装部分
            // data => ame || natsu || yotei || neru
        }
    };

    app.init();

});

