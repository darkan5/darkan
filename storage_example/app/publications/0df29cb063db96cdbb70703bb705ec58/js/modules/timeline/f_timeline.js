var TimelineController = Backbone.Controller.extend({

	initialize: function() {
		
	},

	setModel: function(data) {
		this.model = data.model;
		this.stage = data.stage;
	},

	run: function() {
		var _that = this;

		var pageTimelineRows = this.model.get('lines');

		var rowDelay = 0;

		this.pageComponents = new ComponentsCollection();



		pageTimelineRows.each(function(rowModel, i){
			rowDelay += parseFloat(rowModel.get('options').get('delay'));

            var rowModel = pageTimelineRows.at(pageTimelineRows.length - i - 1);

			var rowComponents = rowModel.get('objects');

			rowComponents.each(function(cModel, j) {
				// create component view and screen element

                var cModel = rowComponents.at( rowComponents.length - j - 1);

				//_log('view timeline', cModel.view);

				//var componentView = ComponentFactory.createComponentByType(cModel.get('type'), cModel);
				


				var componentView = cModel.view;
				var screenComponent = componentView.render().$el;

				// append component to stage and hide it
				_that.stage.$el.append(screenComponent);
				screenComponent.hide();

				// fire preparation functions
				componentView.prepareComponent();
				componentView.afterRender();

				// bind view to model
				cModel.view = componentView;

				// push model to collection
				_that.pageComponents.add(cModel);

				// show component when its time comes
//				setTimeout(function() {
//					componentView.showComponent();
//				}, cModel.get('showtime')*1000);

                //componentView.showComponent();
			});
		});


		

        this.pageComponents.each(function(cModel) {
            cModel.view.delayAndShowComponent();
        });

        // after all are initialized
		this.pageComponents.each(function(cModel) {
			cModel.view.allObjectsAreInitialized();
		});

		return { components: this.pageComponents, lines:pageTimelineRows };
	},

    destroy :function(){
    	if (!this.model) { return; }

        var pageTimelineRows = this.model.get('lines');

        pageTimelineRows.each(function(rowModel, i){
        	try {
	            var rowComponents = rowModel.get('objects');

	            rowComponents.each(function(cModel) {
	                cModel.view.destroy();
	            });
        	}catch(err) {
        		_log('timeline destroy', err);
        	}
        });
    }




});