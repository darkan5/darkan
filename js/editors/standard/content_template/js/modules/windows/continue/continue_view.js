var ContinueWindowView = Backbone.View.extend({

    tagName: 'div',
    className : 'window continue-view',

    template: _.template($('#continue-window-template').html()),

    events: {
        'click .window-close-button': 'close',
        'click .popup-cancel-button': 'close',
        'click .popup-ok-button': 'openLastVisitedPage'
    },

    openLastVisitedPage: function() {
        this.trigger('open-last-visited-page');
        this.close();
    },

	initialize: function( data ) {
        this.windowModel = new FeedbackModel();
		this.runListeners();
  	},

    render : function(data) {

        this.beforeRender();

        var dataModel = this.serializeData(data);

        var componentTemplate = this.template(dataModel);
        this.$el.html(componentTemplate);

        // change animation time property
        this.$el.addClass('animated expandUp');
        this.$el.css("animation-duration", ".5s");
        this.$el.css("-webkit-animation-duration", ".5s");

        var modal = this.windowModel.get('modal');

        if (modal) {
            var windowID = new Date().getUTCMilliseconds();
            this.$el.attr('windowid', windowID);
            this.addModal(windowID);
        }

        this.afterRender();

        // this.setWindowPosition();

        return this;
    },

    serializeData: function(data) {

        var data = data || {};
        
        var options = ProjectModel.instance.get('options').toJSON();

        return $.extend(data, options);
    },

    beforeRender: function() {
        // to override
    },

    afterRender: function() {
        // to override
    },

    close : function(){
    	this.onClose();
        this.removeModal();
        this.unbind();
        this.remove();
    },

    setWindowPosition: function(position) {
        var width = this.$el.width();
        var height = this.$el.height();

        var left = position.left - width;
        var top = position.top - height;


        if (left < 0)
            left = 0;

        if (top < 0)
            top = 0;

        this.$el.css('top', top + 'px').css('left', left + 'px');
    },

    centerWindow: function() {
        var width = this.$el.width();
        var height = this.$el.height();

        this.$el.css({
            top: 'calc(50% - ' + height/2 + 'px)',
            left: 'calc(50% - ' + width/2 + 'px)'
        });


        if (this.$el.find('.window-content').height() > this.$el.height() - 45) {
            this.$el.css('height', 'inherit');
        }
    },

    addModal: function(windowID) {
        var modal = $('<div></div>', {
                class: 'modal-block'
            });
        this.modalWindowEl = modal;
        $(__meta__.darkanContainer.find('#skin')).append(modal);
    },

    removeModal: function() {
        if (this.windowModel.get('modal')) {
            this.modalWindowEl.remove();
            // $(__meta__.darkanContainer).find('> .modal-block[for="' + this.$el.attr('windowid') +'"]').remove();
        }
    },

    hide: function(){
        this.$el.hide();
    },

    show: function(){
        this.$el.show();
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	// To overide
    }
});