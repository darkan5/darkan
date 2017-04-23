var DeleteEventsVisitor = function(){

}

DeleteEventsVisitor.prototype.visit = function(view) {
	var _that = this;

	view.undelegateEvents();

	for (var i = 0; i < view.capabilitiesParmasList.length; i++) {
		var param = view.capabilitiesParmasList[i];

		var ev = param.event == undefined ? 'click' : param.event;

		//_log('param', param);

		if(!param.value){

			//_log('param ev', ev);
			//_log('param identifier', param.identifier);


			if(_.isFunction(view.events)){
				var viewEvents = view.events();
				delete viewEvents[ev + ' ' + param.identifier];
				view.events = viewEvents;
			}

			if(_.isObject(view.events)){
				var viewEvents = view.events;
				delete viewEvents[ev + ' ' + param.identifier];
			}

			view.$el.find(param.identifier).click(function() {
				_that.openFunctionNotAvailableWindow();
			});

			view.$el.find(param.identifier).addClass('element-disabled');

		}
	};

	delete view.capabilitiesParmasList;

    view.delegateEvents();
}

DeleteEventsVisitor.prototype.openFunctionNotAvailableWindow = function (){
	var functionNotAvailableWindow = WindowFactory.createFunctionNotAvailableWindow();
	$('body').append(functionNotAvailableWindow.render().$el);
}

DeleteEventsVisitor.getInstance = function (){
	
	return this.instance || (this.instance = new DeleteEventsVisitor());
}