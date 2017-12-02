module.exports = function getusers(){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'pairprogramming'

	}); 
	global.data
	connection.connect();
	var query = connection.query('select * from users', function(err, result){
		if(err){
			// console.error(err);
			return err;
		}
		// data = JSON.stringify(result); //result;
		data = result
	});

	return data;

}