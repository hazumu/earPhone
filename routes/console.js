/*
 * console page
 */
exports.console = function(req, res){
    var hostName = req.protocol + "://" + req.headers.host;

    res.render('console', {
        title: 'コンソール画面',
        hostName: hostName
    });
};
