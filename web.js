var express = require("express"),
    app     = express();

app.get("/", function (req, res) {
    res.send("Hello World!");
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
    console.log("lisning on " + port);
});
