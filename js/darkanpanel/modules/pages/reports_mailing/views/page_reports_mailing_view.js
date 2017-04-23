var PageReportsMailingView = PageView.extend({
    template: '#page-reports-mailing-view-template',

    initialize: function(){

        this.model = new PageReportsMailingModel();
        this.model.on('change', this.onModelChanged, this);
    },

    events: {
        
    },

    regions: {
    	
    },
    
});