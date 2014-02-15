$(function() {
    console.log("console page start!");

    console.log($("#hostName").text());

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
            this.addEvnet();
            socket.init();
            $(window).on(socket.ON_SOCKET_DATA, function(e, data) {
                app.onSocketData(e, data);
            });
        },
        addEvnet: function() {
            $(".btn").on("click", function(e) {
                console.log("touch btn!",e);
                var command = $(e.originalEvent.target).val();
                console.log("touch btn!", command);
                app._sendData(command);
            })
        },
        _sendData: function(command) {
            socket.sendData(command);
        },
        onSocketData :function(e, data) {
            console.log("console画面でも受け取るぴょん", e, data);
        }
    };

    app.init();

});

