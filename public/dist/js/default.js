// CodeMirror.fromTextArea(document.getElementById('maintextarea'), {
//     lineNumbers: true,
//     mode: 'python',
// }).on('keyup', editor => {
// 	var word = { id: 'room', user: 'user', value: editor.getValue()}
// 	socket.emit('main textarea', word);
//     console.log(word.value);
//     return false;

// });
var editor = CodeMirror.fromTextArea(document.getElementById('maintextarea'),{
	lineNumbers: true,
	modde: 'python',

});

editor.on('keyup', function(){
	var word = { id: 'room', user: 'user', value: editor.getValue()}
	socket.emit('main textarea', word);
    console.log(word.value);
    return false;

});



socket.on('main textarea', function(word){
	editor.getDoc().setValue("");
	editor.getDoc().setValue(word.value);
	editor.setCursor(current_pos);

});

function run(){
	codevalue = editor.getValue()
	socket.emit('code to run', codevalue)
	console.log(codevalue)
	
}



