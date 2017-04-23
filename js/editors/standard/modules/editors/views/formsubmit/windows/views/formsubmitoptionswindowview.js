var FormSubmitOptionsWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view formsubmitoptionswindow-view editor-window',

    template: _.template($('#formsubmitoptionswindow-template').html()),

    // events: function(){
    //     return _.extend({},WindowView.prototype.events,{
    //         'click input[name="revertobjects"]' : 'changeRevertObjects',
    //         'click input[name="feedbacks"]' : 'changeFeedbacks',
    //         'click input[name="disableongooddrop"]' : 'changeDisableOnGoodDrop'
    //     });
    // },

    bindings: {
        '.feedbacks': 'feedbacks'
    },

	initialize: function( data ) {
        this.model = data.componentModel;
        this.windowModel = new WindowModel();
  	},

    afterRender: function() {
        this.stickit();
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});