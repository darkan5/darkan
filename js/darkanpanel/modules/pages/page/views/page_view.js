var PageView = ItemLayoutView.extend({


    template: '#page-view-template',

    
    initialize: function(){

    	this.model = new PageModel();
    	this.model.on('change', this.onModelChanged, this);
    },

//    onModelChanged: function(){
//
//    	_log('onModelChanged', this.model.toJSON());
//
//    	this.render();
//    },
//
//    onBeforeDestroy: function(arg1, arg2){
//        this.model.onBeforeDestroy();
//    }
});