var QclOptionsWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view qcloptionswindow-view editor-window',

    template: _.template($('#qcloptionswindow-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click input[name="onlysourcetarget"]' : 'changeOnlySourceTarget',
            'click input[name="feedbacks"]' : 'changeFeedbacks',
            'click input[name="allowbadanswer"]' : 'changeAllowBadAnswer',
            'change .after-bad-answer' : 'changeAfterBadAnswer'
        });
    },

    changeOnlySourceTarget: function(e) {
        var opts = this.componentModel.get('opts');

        opts.onlySourceTarget = $(e.target).is(':checked');

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

    changeAllowBadAnswer: function(e) {
        var opts = this.componentModel.get('opts');

        opts.allowBadAnswer = $(e.target).is(':checked');

        this.componentModel.set('opts', opts);
        this.componentModel.trigger('change');
    },

    changeAfterBadAnswer: function(e) {
        var opts = this.componentModel.get('opts');

        opts.afterBadAnswer = $(e.target).val();

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