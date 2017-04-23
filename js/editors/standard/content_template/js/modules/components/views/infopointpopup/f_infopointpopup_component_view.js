var InfoPointPopupComponentView = ImageComponentView.extend({

	className : 'component infopointpopup-component md-trigger',

	template: _.template($('#infopointpopup-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click': 'openPopup'
        });
    },

    openPopup: function() {
        var _that = this;

		var windowData = {
			title: this.model.get('title'),
			content: this.model.get('text')
		};

		var windowModel = new WindowModel( { type:"modal", modal:true } );
		var windowView = new WindowView( { windowModel: windowModel } );
		$(__meta__.darkanContainer).append(windowView.render(windowData).$el);
        windowView.scaleWindow();
		windowView.centerWindow();
        windowView.on('close', function() {
            StageView.instance.selectLastActiveWcagElement();
        });
        windowView.$el.find('.window-close-button').attr({
            'aria-label': windowData.content + ', click to close.'
        });
        windowView.$el.find('.window-close-button').focus();
	
		this.markAsCompleted();
    },

	afterRender: function() {

	},

    renderAsCompleted: function() {
        this.$el.attr({
        	active: true
        })
    },

    renderCss: function() {
        this.$el.css('cursor', 'pointer');
    }

});