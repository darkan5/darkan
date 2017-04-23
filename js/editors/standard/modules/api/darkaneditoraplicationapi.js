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


function DarkanEditorAplicationAPI(data){

	var _that = this;

	this.origin = DarkanEditorAplicationAPI.PREVENT_ORIGIN;
	this.controller = DarkanEditorController;

	window.addEventListener('message', function(e){
        _that.onMessageApiComming(e);
    }, false);
}
// Events
DarkanEditorAplicationAPI.ON_CONNECT = 'on-connect';
DarkanEditorAplicationAPI.ON_PAGE_ADDED = 'on-page-added';
DarkanEditorAplicationAPI.ON_PAGES_REMOVED = 'on-pages-removed';
DarkanEditorAplicationAPI.ON_PAGE_SELECTED = 'on-page-selected';
DarkanEditorAplicationAPI.ON_PROJECT_LOADED = 'on-project-loaded';
DarkanEditorAplicationAPI.ON_PAGES_COLLECTION_CHANGED = 'on-pages-collection-chenged';
DarkanEditorAplicationAPI.ON_COMPONENT_CHANGED = 'on-component-chenged';
DarkanEditorAplicationAPI.ON_PROJECT_CHANGED = 'on-project-chenged';

// Functions
DarkanEditorAplicationAPI.GO_TO_NEXT_PAGE = 'go-to-next-page';

DarkanEditorAplicationAPI.PREVENT_ORIGIN = '*';

DarkanEditorAplicationAPI.DARKAN_SENDER = 'darkan';

DarkanEditorAplicationAPI.prototype = new EventDispatcher();

DarkanEditorAplicationAPI.prototype.onMessageApiComming = function(e){

	_log('MESSAGE TO APPLICATION', e, _log.apidata);

	try {

		var jData = JSON.parse(e.data);

		var action = jData.action;
		var sender = jData.sender;

		if(sender == undefined || sender == DarkanEditorAplicationAPI.DARKAN_SENDER){
			return;
		}
	
		_log('DarkanEditorAplicationAPI data', jData);

		switch(action){

			case 'no-message' :
	    		_log('no-message', jData);
	    		break;

	    	case 'go-to-page' :
	    		this.controller.goToPage(jData.data, this);
	    		break;	

	    	case 'go-to-next-page' :
	    		this.controller.goToNextPage(jData.data, this);
	    		break;	

	    	case 'go-to-prew-page' :
	    		this.controller.goToPrewPage(jData.data, this);
	    		break;	

	    	case 'go-to-prev-page' :
	    		this.controller.goToPrevPage(jData.data, this);
	    		break;

	    	case 'send-credentials' :
	    		this.controller.sendCredentials(jData.data, this);
	    		break;

	    	case 'sort-pages' :
	    		this.controller.sortPages(jData.data, this);
	    		break;		

	    		


		}   
	}catch(ex) {
		_log('ex', ex, _log.apierror);
	}
	
}

DarkanEditorAplicationAPI.prototype.connect = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_CONNECT, data);
}

DarkanEditorAplicationAPI.prototype.pageSelected = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_PAGE_SELECTED, data);
}


DarkanEditorAplicationAPI.prototype.pageAdded = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_PAGE_ADDED, data);
}

DarkanEditorAplicationAPI.prototype.pagesRemoved = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_PAGES_REMOVED, data);
}

DarkanEditorAplicationAPI.prototype.projectLoaded = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_PROJECT_LOADED, data);
}

DarkanEditorAplicationAPI.prototype.pagesCollectionChanged = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_PAGES_COLLECTION_CHANGED, data);
}

DarkanEditorAplicationAPI.prototype.componentChanged = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_COMPONENT_CHANGED, data);
}

DarkanEditorAplicationAPI.prototype.projectChanged = function(data){

	this.execute(DarkanEditorAplicationAPI.ON_PROJECT_CHANGED, data);
}



DarkanEditorAplicationAPI.prototype.execute = function(action, data){

	data = data == undefined ? {} : data;
	action = action == undefined ? 'no-action' : action;

	var e = {};

	e.action = action;
	e.sender = DarkanEditorAplicationAPI.DARKAN_SENDER;
	e.data = data;

	var se = JSON.stringify(e);

	_log('try to send message ', se);

	top.postMessage(se, this.origin);
}

DarkanEditorAplicationAPI.prototype.setApiController = function (controller){

	this.controller = controller;
}

DarkanEditorAplicationAPI.getInstance = function (){

	return this.instance || (this.instance = new DarkanEditorAplicationAPI());
}