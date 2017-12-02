var mkdirp = require('mkdirp');
module.exports = function files(){

	mkdirp('/workspace', function (err) {
	    if (err) {
	    	console.error(err)
	    }
	    console.log('Creation success!!!!!')
	});

}