var AllContainerEditWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view containereditorwindow-view editor-window',

    template: _.template($('#containereditorwindow-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click input[name="dropandhide"]' : 'changeDropAndHide',
            'click input[name="onlygoodanswers"]' : 'changeOnlyGoodAnswers',
            'click input[name="forcegoodsequence"]' : 'changeForceGoodSequence',
            'click input[name="autoarrangeanswers"]' : 'changeAutoArrangeAnswers',
            'change .dnd-afterbadanswer-select' : 'changeRevertType',
            'change input[name="maxanswers"]' : 'changeMaxAnswers',
            'keyup input[name="maxanswers"]' : 'changeMaxAnswers',
            'change input[name="enoughanswers"]' : 'changeEnoughAnswers',
            'keyup input[name="enoughanswers"]' : 'changeEnoughAnswers'
        });
    },

    changeMaxAnswers: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {
            answers[key].opts.maxAnswers = $(e.target).val();
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },

    changeEnoughAnswers: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {
            answers[key].opts.enoughAnswers = $(e.target).val();
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },

    changeRevertType: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {
            answers[key].opts.revertType = $(e.target).val();
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },

    changeDropAndHide: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {
            answers[key].opts.dropandhide = $(e.target).is(':checked');
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },

    changeOnlyGoodAnswers: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {
            answers[key].opts.onlygoodanswers = $(e.target).is(':checked');
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },

    changeForceGoodSequence: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {
            answers[key].opts.forceGoodSequence = $(e.target).is(':checked');
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },

    changeAutoArrangeAnswers: function(e) {
        var answers = this.componentModel.get('answers');

        _.each(answers, function(object, key) {

            answers[key].opts.autoArrangeAnswers = $(e.target).is(':checked');
            
        });

        this.componentModel.set('answers', answers);
        this.componentModel.trigger('change');
    },


	initialize: function( data ) {

        this.componentModel = data.componentModel;
        this.containerActionkey = data.containerActionkey;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

    afterRender: function() {
        this.$el.css({
            left: '90px',
            top: '90px'
        });
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});