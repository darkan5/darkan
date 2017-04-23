var StageController = Backbone.Controller.extend({

	initialize: function(data) {

		this.stageModel = data.stageModel;
        this.stageView = data.stageView;
        this.timelineView = data.timelineView;

        console.log("StageController");
        console.log(data.stageView);

	},
	addComponent : function( componentType ){

		var componentView = ComponentFactory.createComponentByType( componentType );
        this.stageView.$el.append( componentView.$el );
		this.updateTimeline( this.stageModel, componentView.getModel(), this.timelineView );

	},
	updateTimeline: function(stageModel, componentModel, timelineView) {

		var lines = stageModel.get('lines');

		if(lines.at(0) == undefined){
			var newLine = new TimelineRowModel();
			lines.add(newLine);
			newLine.get('objects').add(componentModel);

		}else{
			lines.at(0).get('objects').add( componentModel );
		}
	}
}); 