function EventDispatcher()
{
	this.listeners = {};
}

EventDispatcher.prototype.dispatchEvent = function(type, params, sender)
{
	if(this.listeners[type] != null)
	this.listeners[type](params, sender);
}

EventDispatcher.prototype.addEventListener = function(type, callback)
{
	this.listeners[type] = callback;
}

EventDispatcher.prototype.removeEventListener = function(type)
{
	delete this.listeners[type];
}

function FakeIFrame()
{
	var _that = this;

	var  ContentWindow = function(){

	};

	ContentWindow.prototype = new EventDispatcher();

	this.contentWindow = new ContentWindow();

	this.contentWindow.postMessage = function(data, origin){

    	// _log('Not found iframe - FakeIFrame', data, _log.apierror);
	}
}

FakeIFrame.prototype = new EventDispatcher();



function DarkanCourseAPI(data){

	this.listeners = {};

	this.origin = DarkanCourseAPI.PREVENT_ORIGIN;
}

DarkanCourseAPI.ON_MESSAGE = 'on-message';
DarkanCourseAPI.ON_CONNECT = 'on-connect';
DarkanCourseAPI.ON_PAGE_SELECTED = 'on-page-selected';
DarkanCourseAPI.ON_PROJECT_LOADED = 'on-project-loaded';
DarkanCourseAPI.ON_DIAMONDS_CHANGED = 'on-diamonds-changed';
DarkanCourseAPI.ON_COMPLETE_LOADING_PAGE = 'on-complete-loading-page';


DarkanCourseAPI.PREVENT_ORIGIN = '*';
//DarkanCourseAPI.PREVENT_ORIGIN = 'http://jerzy.pl';

DarkanCourseAPI.DARKAN_SENDER = 'adapter';

DarkanCourseAPI.prototype = new EventDispatcher();

DarkanCourseAPI.prototype.setIframe = function(iFrame){

	var _that = this;

	this.iFrame = this.findIframe(iFrame);

	console.log('setIframe', this.iFrame);

	window.addEventListener('message', function(e){
        _that.onMessageApiComming(e);
    }, false);
}

DarkanCourseAPI.prototype.findIframe = function(iFrame){

	return iFrame == undefined ? new FakeIFrame() : iFrame; 
}

DarkanCourseAPI.prototype.onMessageApiComming = function(e){

	// _log('MESSAGE TO CUSTOM COURSE API', e, _log.apidata);

	var jData = {};

	try {

		jData = JSON.parse(e.data);

	}catch(ex) {
		// _log('ex', ex, _log.apierror);
	} 	

	var action = jData.action;
	var sender = jData.sender;

	if(sender == undefined || sender == DarkanCourseAPI.DARKAN_SENDER){
		// _log('Sender is undefined', {}, _log.apierror);
		return;
	}

	this.dispatchEvent(DarkanCourseAPI.ON_MESSAGE, jData, this);

    // switch(action){
    // 	case DarkanCourseAPI.ON_CONNECT :
    // 		this.dispatchEvent(DarkanCourseAPI.ON_CONNECT, jData, this);
    // 		break;

    // 	case DarkanCourseAPI.ON_PAGE_SELECTED :
    // 		this.dispatchEvent(DarkanCourseAPI.ON_PAGE_SELECTED, jData, this);
    // 		break;	
		
    // }  

    this.dispatchEvent(action, jData, this);

}

DarkanCourseAPI.prototype.connect = function(data){

	this.execute('connect', data);
}

DarkanCourseAPI.prototype.goToPage = function(data){

	this.execute('go-to-page', data);
}

DarkanCourseAPI.prototype.goToNextPage = function(data){

	this.execute('go-to-next-page', data);
}

DarkanCourseAPI.prototype.goToPrewPage = function(data){

	this.execute('go-to-prew-page', data);
}

DarkanCourseAPI.prototype.goToPrevPage = function(data){

	this.execute('go-to-prev-page', data);
}

DarkanCourseAPI.prototype.saveScorm = function(data){

	this.execute('save-scorm', data);
}



DarkanCourseAPI.prototype.execute = function(action, data){

	data = data == undefined ? {} : data;
	action = action == undefined ? 'no-action' : action;

	var e = {};

	e.action = action;
	e.sender = DarkanCourseAPI.DARKAN_SENDER;
	e.data = data;

	var se = JSON.stringify(e);

	this.iFrame.contentWindow.postMessage(se, this.origin);
}


DarkanCourseAPI.getInstance = function (){
	
	return this.instance || (this.instance = new DarkanCourseAPI());
}

DarkanCourseAPI.createApi = function (){
	
	return new DarkanCourseAPI();
}


