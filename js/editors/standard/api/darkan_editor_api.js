function EventDispatcher()
{
	this.listeners = {};
}

EventDispatcher.prototype.dispatchEvent = function(type, params, sender)
{
	var action = this.listeners[type];

    if(action == undefined){
        return;
    }

    var fn = this.listeners[type].fn;
    var context = this.listeners[type].context;

    if(fn == undefined){
        return;
    }

    if(context){
        action.fn.call(context, params, sender);
    }else{
        action.fn(params, sender);
    }
}

EventDispatcher.prototype.addEventListener = function(type, callback, context)
{
	this.listeners[type] = {
        fn : callback,
        context : context
    };
}

EventDispatcher.prototype.removeEventListener = function(type)
{
	delete this.listeners[type];
}

EventDispatcher.prototype.removeAllListeners = function(type)
{
	this.listeners = {};
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



function DarkanEditorAPI(data){

	this.origin = DarkanEditorAPI.PREVENT_ORIGIN;
	this.credentials = {};
	this.iFrame = new FakeIFrame();
}

DarkanEditorAPI.ON_MESSAGE = 'on-message';
DarkanEditorAPI.ON_CONNECT = 'on-connect';
DarkanEditorAPI.ON_PAGE_ADDED = 'on-page-added';
DarkanEditorAPI.ON_PAGES_REMOVED = 'on-pages-removed';
DarkanEditorAPI.ON_PAGE_SELECTED = 'on-page-selected';
DarkanEditorAPI.ON_PROJECT_LOADED = 'on-project-loaded';
DarkanEditorAPI.ON_PAGES_COLLECTION_CHANGED = 'on-pages-collection-chenged';
DarkanEditorAPI.ON_PROJECT_CHANGED = 'on-project-chenged';

DarkanEditorAPI.PREVENT_ORIGIN = 'http://darkan.eu';
//DarkanEditorAPI.PREVENT_ORIGIN = 'http://pio.pl';

DarkanEditorAPI.DARKAN_SENDER = 'adapter';

DarkanEditorAPI.prototype = new EventDispatcher();

DarkanEditorAPI.prototype.setIframe = function(iFrame){

	var _that = this;

	this.iFrame = iFrame || this.iFrame;

	console.log('setIframe', this.iFrame);

	window.addEventListener('message', function(e){
        _that.onMessageApiComming(e);
    }, false);
}

DarkanEditorAPI.prototype.setCredentials = function(credentials){

	this.credentials = credentials || {};
}


DarkanEditorAPI.prototype.onMessageApiComming = function(e){

	// _log('MESSAGE TO CUSTOM API', e, _log.apidata);

	var jData = {};

	try {

		jData = JSON.parse(e.data);

	}catch(ex) {
		// _log('ex', ex, _log.apierror);
	}	

	var action = jData.action;
	var sender = jData.sender;

	if(sender == undefined || sender == DarkanEditorAPI.DARKAN_SENDER){
		// _log('Sender is undefined', {}, _log.apierror);
		return;
	}

	this.dispatchEvent(DarkanEditorAPI.ON_MESSAGE, jData, this);


    switch(action){
    	case DarkanEditorAPI.ON_CONNECT :

    		this.sendCredentials( this.credentials );

    		this.dispatchEvent(DarkanEditorAPI.ON_CONNECT, jData, this);

    		break;			
    } 

    this.dispatchEvent(action, jData, this); 

}

DarkanEditorAPI.prototype.connect = function(data){

	return this.execute('connect', data);
}

DarkanEditorAPI.prototype.goToPage = function(data){

	return this.execute('go-to-page', data);
}

DarkanEditorAPI.prototype.goToNextPage = function(data){

	return this.execute('go-to-next-page', data);
}

DarkanEditorAPI.prototype.goToPrewPage = function(data){

	return this.execute('go-to-prew-page', data);
}

DarkanEditorAPI.prototype.goToPrevPage = function(data){

	return this.execute('go-to-prev-page', data);
}

DarkanEditorAPI.prototype.sendCredentials = function(data){

	return this.execute('send-credentials', data);
}

DarkanEditorAPI.prototype.sortPages = function(data){

	return this.execute('sort-pages', data);
}

DarkanEditorAPI.prototype.loadProject = function(data){

	var _that = this;

	var darkanProjectId = parseInt(data.darkanProjectId);

	//var src = 'http://jerzy.pl/darkan2/app/2.0.0/' + darkanProjectId;
	var src = 'http://darkan.eu/editorexternal/' + darkanProjectId;
	//var src = 'http://pio.pl/darkan2/editorexternal/' + darkanProjectId;

    this.iFrame.setAttribute('src', src);
}


DarkanEditorAPI.prototype.execute = function(action, data){

	data = data == undefined ? {} : data;
	action = action == undefined ? 'no-action' : action;

	var e = {};

	e.action = action;
	e.sender = DarkanEditorAPI.DARKAN_SENDER;
	e.data = data;

	var se = JSON.stringify(e);

	this.iFrame.contentWindow.postMessage(se, this.origin);

	return e;
}

DarkanEditorAPI.prototype.execteCommand = function (data){

	return this.execute(data.action, data.data);
}

DarkanEditorAPI.getInstance = function (){
	
	return this.instance || (this.instance = new DarkanEditorAPI());
}


