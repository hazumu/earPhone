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

    var ImageManager = {
        images: {
                natsu: "natsu.jpg",
                ame:   "ame.jpg",
                yotei: "yotei.jpg",
                neru:  "neru.jpg"
        },
        path: "/images/",
        preload: function() {
            for (var i in ImageManager.images) {
                var img = document.createElement("img");
                img.src = ImageManager.path + ImageManager.images[i];
            }
        },
        show: function(cmd) {
            $("#imgArea").attr("src", ImageManager.path + ImageManager.images[cmd]);
        },
        clear: function() {
            $("#imgList")
                .empty()
                .css({
                        "-webkit-transform" : "translate(0px, 0px)",
                        "opacity" : 1
                    });
        },
        render: function () {
            var html = "";
            for (var i in ImageManager.images) {
                html += '<li><img src=' + ImageManager.path + ImageManager.images[i] + ' /></li>';
            }
            var nextX = $("#imgWrap").width();
            $("#imgList")
                .html(html)
                .css({
                        "-webkit-transform" : "translate(-" + nextX * 3 + "px, 0px)",
                        "opacity" : 1
                    });
        },
        slide: function(cmd) {
            var pos = 0;
            var i = 0;
            for (var key in ImageManager.images) {
                if (cmd === key) {
                    break;
                }
                i++;
            }

            pos = $(window).width() * i;

            $("#imgList").css({
                "-webkit-transform" : "translate(-" + pos + "px, 0px)",
            });
        }
    };

    var startBtn = {
        isStart: false,
        init: function() {
            startBtn.addEvent();
        },
        addEvent: function() {
            $("#start").on("click", function() {
                if (!startBtn.isStart) {
                    $(this)
                         .addClass("on down")
                         .removeClass("up")
                         .html("STOP")
                         .on("webkitTransitionEnd", function(){
                            ImageManager.render();
                         });
                } else {
                    $(this)
                         .removeClass("on down")
                         .addClass("up")
                         .html("START")
                         .on("webkitTransitionEnd", function(){
                            ImageManager.clear();
                         });
                }
                startBtn.isStart = !startBtn.isStart;
            });
        }
    }

    var app = {
        isStart : false,
        init : function() {
            socket.init();
            startBtn.init();
            ImageManager.preload();
            $(window).on(socket.ON_SOCKET_DATA, function(e, data) {
                app.onSocketData(e, data);
            });
        },
        onSocketData : function(e, data) {
            console.log("受信", data);
            // 画像表示
            // ImageManager.show(data);
            ImageManager.slide(data);
            // ina_job実装部分
            // data => ame || natsu || yotei || neru
        }
    };

    app.init();
});

