
_log.error = 'background: red; color: white;';
_log.message = 'background: pink;';


function _log(message, object, css){

	css = css || _log.message;

	console.log("%c%s", css, message, object);
}





