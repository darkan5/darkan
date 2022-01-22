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


function DarkanCourseAplicationAPI(data){

	var _that = this;

	this.listeners = {};

	this.origin = DarkanCourseAplicationAPI.PREVENT_ORIGIN;
	this.controller = DarkanCourseController;

	window.addEventListener('message', function(e){
        _that.onMessageApiComming(e);
    }, false);
}
// Events
DarkanCourseAplicationAPI.ON_CONNECT = 'on-connect';
DarkanCourseAplicationAPI.ON_PAGE_ADDED = 'on-page-added';
DarkanCourseAplicationAPI.ON_PAGES_REMOVED = 'on-pages-removed';
DarkanCourseAplicationAPI.ON_PAGE_SELECTED = 'on-page-selected';
DarkanCourseAplicationAPI.ON_PROJECT_LOADED = 'on-project-loaded';
DarkanCourseAplicationAPI.ON_PAGES_COLLECTION_CHANGED = 'on-pages-collection-chenged';
DarkanCourseAplicationAPI.ON_DIAMONDS_CHANGED = 'on-diamonds-changed';
DarkanCourseAplicationAPI.ON_COMPLETE_LOADING_PAGE = 'on-complete-loading-page';

// Functions
DarkanCourseAplicationAPI.GO_TO_NEXT_PAGE = 'go-to-next-page';

DarkanCourseAplicationAPI.PREVENT_ORIGIN = '*';

DarkanCourseAplicationAPI.DARKAN_SENDER = 'darkan';

DarkanCourseAplicationAPI.prototype = new EventDispatcher();

DarkanCourseAplicationAPI.prototype.onMessageApiComming = function(e){


	_log('MESSAGE TO COURSE', e, _log.apidata);

	try {

		var jData = JSON.parse(e.data);

		var action = jData.action;
		var sender = jData.sender;


		if(sender == DarkanCourseAplicationAPI.DARKAN_SENDER){
			return;
		}


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

	    	case 'save-scorm' :
	    		this.controller.saveScorm(jData.data, this);
	    		break;	

	    		
			

		}  

	}catch(ex) {
		_log('ex', ex, _log.apierror);
	} 
}

DarkanCourseAplicationAPI.prototype.connect = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_CONNECT, data);
}

DarkanCourseAplicationAPI.prototype.pageSelected = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_PAGE_SELECTED, data);
}


DarkanCourseAplicationAPI.prototype.pageAdded = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_PAGE_ADDED, data);
}

DarkanCourseAplicationAPI.prototype.pagesRemoved = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_PAGES_REMOVED, data);
}

DarkanCourseAplicationAPI.prototype.projectLoaded = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_PROJECT_LOADED, data);
}

DarkanCourseAplicationAPI.prototype.pagesCollectionChanged = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_PAGES_COLLECTION_CHANGED, data);
}

DarkanCourseAplicationAPI.prototype.diamondsChanged = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_DIAMONDS_CHANGED, data);
}

DarkanCourseAplicationAPI.prototype.onCompleteLoadingPage = function(data){

	this.execute(DarkanCourseAplicationAPI.ON_COMPLETE_LOADING_PAGE, data);
}





DarkanCourseAplicationAPI.prototype.execute = function(action, data){

	data = data == undefined ? {} : data;
	action = action == undefined ? 'no-action' : action;

	var e = {};

	e.action = action;
	e.sender = DarkanCourseAplicationAPI.DARKAN_SENDER;
	e.data = data;

	var se = JSON.stringify(e);

	//_log('try to send message ', se);

	top.postMessage(se, this.origin);
}

DarkanCourseAplicationAPI.prototype.setApiController = function (controller){

	this.controller = controller;
}

DarkanCourseAplicationAPI.getInstance = function (){

	return this.instance || (this.instance = new DarkanCourseAplicationAPI());
}