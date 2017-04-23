var PageReportsElaarningView = PageView.extend({
    template: '#reports-elearning-view-template',

    initialize: function(){

        this.model = new PageReportseElaarningModel();
        this.model.on('change', this.onModelChanged, this);
    },

    events: {
        
    },

    regions: {
    	
    },

    
});