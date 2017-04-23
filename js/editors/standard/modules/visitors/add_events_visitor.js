var AddEventsVisitor = function(){

}

AddEventsVisitor.prototype.visit = function(view){

	view.undelegateEvents();

	for (var i = 0; i < view.capabilitiesParmasList.length; i++) {
		var param = view.capabilitiesParmasList[i];

		var ev = param.event == undefined ? 'click' : param.event;

		//_log('param', param);

		if(param.value){

			//_log('param ev', ev);
			//_log('param identifier', param.identifier);

			if(_.isFunction(view.events)){
				var viewEvents = view.events();
				viewEvents[ev + ' ' + param.identifier] = param.fun;
				view.events = viewEvents;
			}

			if(_.isObject(view.events)){
				var viewEvents = view.events;
				viewEvents[ev + ' ' + param.identifier] = param.fun;
			}

			view.$el.find(param.identifier).removeClass('element-disabled');

		}
	};

	delete view.capabilitiesParmasList;

    view.delegateEvents();
}

AddEventsVisitor.getInstance = function (){
	
	return this.instance || (this.instance = new AddEventsVisitor());
}