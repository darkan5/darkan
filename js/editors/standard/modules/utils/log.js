

_log.pageOptions = 'background: #E1D42D; color: black;';

_log.apidata = 'background: #5CF94A; color: black; border: 1px solid black;';
_log.apierror = 'background: red; color: black;';

_log.timeline = 'background: #2FE026; color: white; border: 1px solid black;';
_log.updateComingInStage = 'background: #E85E32; color: white; border: 1px solid black;';
_log.rightMenu = 'background: #2788E0; color: white; border: 1px solid black;';
_log.dataaccessOutResult = 'background: #9158E0; color: white; border: 1px solid black;';
_log.dataaccessOutFault = 'background: #810C29; color: white;';
_log.dataaccessIn = 'background: #9D0DFF; color: white;';
_log.error = 'background: red; color: white;';
_log.message = 'background: pink;';
_log.selector = 'background: #FF0EE8;';
_log.componentView = 'background: #5FE1D6;';
_log.stageView = 'background: #E0CD05;';
_log.imageComponetView = 'background: #0AE18B;';
_log.popup = 'background: #05E01C;';
_log.trigger = 'background: #E88134;';
_log.history = 'background: #000000; color: white;';
_log.historyBack = 'background: #FF000F; color: white;';
_log.api = 'background: #FF0DFF; color: white;';




function _log(message, object, css){

	var hostname = window.location.hostname;

	var islocalhost = 
			(hostname == 'pio.pl' || hostname == 'jerzy.pl' || hostname == 'localhost');
	
	var DEBUG = islocalhost ? true : false;


	if (DEBUG) {
		css = css || _log.message;
		if (console && console.log) {
			console.log("%c%s", css, message, object);
		}
	}
}

