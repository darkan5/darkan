var DeletePageEventsVisitor = function(){

}

DeletePageEventsVisitor.prototype.visit = function(view) {
	var _that = this;

	view.undelegateEvents();

	for (var i = 0; i < view.capabilitiesParmasList.length; i++) {
		var param = view.capabilitiesParmasList[i];

		var ev = param.event == undefined ? 'click' : param.event;

		if(!param.value){

			if(_.isFunction(view.events)){
				var viewEvents = view.events();
				delete viewEvents[ev + ' ' + param.identifier];
				view.events = viewEvents;
			}

			if(_.isObject(view.events)){
				var viewEvents = view.events;
				delete viewEvents[ev + ' ' + param.identifier];
			}

			view.$el.find(param.identifier).addClass('element-disabled');

		}
	};

	delete view.capabilitiesParmasList;

    view.delegateEvents();
}

DeletePageEventsVisitor.getInstance = function (){
	
	return this.instance || (this.instance = new DeletePageEventsVisitor());
}