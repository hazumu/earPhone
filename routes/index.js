/*
 * index page
 */
exports.index = function(req, res){
	res.render('index', {
		title: '音楽くん'
	});
};
