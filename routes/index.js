/*
 * index page
 */
exports.index = function(req, res){
    var hostName = req.protocol + "://" + req.headers.host;

    res.render('index', {
        title: '音楽くん',
        hostName: hostName
    });
};
