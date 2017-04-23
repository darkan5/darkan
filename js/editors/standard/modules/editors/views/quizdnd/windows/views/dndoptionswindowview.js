var DnDOptionsWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view dndoptionswindow-view editor-window',

    template: _.template($('#dndoptionswindow-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click input[name="revertobjects"]' : 'changeRevertObjects',
            'click input[name="feedbacks"]' : 'changeFeedbacks',
            'click input[name="disableongooddrop"]' : 'changeDisableOnGoodDrop',
            'click input[name="mark-questions"]' : 'markQuestions'
        });
    },

    

    markQuestions: function(e) {
        var opts = this.componentModel.get('opts');

        opts.markQuestions = $(e.target).is(':checked');

        this.componentModel.set('opts', opts);
        this.componentModel.trigger('change');
    },

    changeRevertObjects: function(e) {
        var opts = this.componentModel.get('opts');

        opts.revertObjects = $(e.target).is(':checked');

        this.componentModel.set('opts', opts);
        this.componentModel.trigger('change');
    },

    changeFeedbacks: function(e) {
//        var opts = this.componentModel.get('opts');
//
//        opts.feedbacks = $(e.target).is(':checked');
//
//        this.componentModel.set('opts', opts);
//        this.componentModel.trigger('change');

        var feedbackShow = $(e.target).is(':checked');
        this.componentModel.set('feedbackShow', feedbackShow);
    },

    changeDisableOnGoodDrop: function(e) {
        var opts = this.componentModel.get('opts');

        opts.disableOnGoodDrop = $(e.target).is(':checked');

        this.componentModel.set('opts', opts);
        this.componentModel.trigger('change');
    },


	initialize: function( data ) {

        this.componentModel = data.componentModel;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

    afterRender: function() {
        // to override
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});