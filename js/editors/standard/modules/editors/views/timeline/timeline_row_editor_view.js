var TimelineRowEditorView = TimelineMultiEditorView.extend({

    template: _.template($('#timeline-editor-row-template').html()),

    events: function(){
        return _.extend({},TimelineEditorView.prototype.events,{
            'change .timeline-editor-object-lifetime' : 'changeComponentsLifetime',
            'change .timeline-editor-line-delay' : 'changeRowDelay'
        });
    },

    bindings: {
    	'.timeline-editor-line-delay': {
    		observe: 'delay',
    		onSet: this.changeRowDelay
    	}
    },

    changeRowDelay: function() {
    	var _that = this;


        DataAccess.updateTimelineOptions(
            {
            	pageId:StageView.instance.model.getPageId(),
            	rowOptions: _that.model
            },
            function(data) { 
                _log('Update timeline options result: ', data, _log.dataaccessOutResult)  
            },
            function(data) {
             _log('Update timeline options fault: ', data, _log.dataaccessOutFault)  
         }
        );
        
        StageView.instance.timeline.render();
        StageView.instance.timeline.afterRender();
    }
});
