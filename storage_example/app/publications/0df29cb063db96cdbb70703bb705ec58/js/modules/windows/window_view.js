var WindowView = Backbone.View.extend({

    tagName: 'div',
    className : 'window window-view',

    template: _.template($('#window-template').html()),

    events: {
        'click .window-close-button': 'close'
    },

	initialize: function( data ) {
        this.windowModel = data.windowModel;
		this.runListeners();
        this.afterInitialize();
  	},
    
    accept: function(visitor) {
        visitor.visit(this);
    },

    afterInitialize: function() {
        // to override
    },

    render : function(dataModel) {

        this.beforeRender();

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

    scaleWindow: function() {
        var autoScale = ProjectModel.instance.isAutoScale();
        if (autoScale) {
            
            var ratio = StageView.instance.getSmallerRatio();
            var scaledFontSize = parseInt(this.$el.css('font-size')) * ratio;
            this.$el.css('font-size', scaledFontSize + 'px');
            this.$el.find('.window-content').css({
                'padding-left': 30*ratio+'px',
                'padding-top': 20*ratio+'px',
                'padding-right': 30*ratio+'px',
                'padding-bottom': 30*ratio+'px',
            });
            this.$el.find('.window-top-bar').css({
                'height': 45*ratio+'px',
                'line-height': 40*ratio+'px',
                'padding-right': 75*ratio+'px',
                'font-size': parseInt(this.$el.find('.window-top-bar').css('font-size')) * ratio
            });
            this.$el.find('.window-close-button').css({
                'height': 20*ratio+'px',
                'width': 20*ratio+'px',
                'top': 12*ratio+'px',
                'right': 10*ratio+'px',
                'background-size': 100+'%'
            });
        }
    },

    beforeRender: function() {
        // to override
    },

    afterRender: function() {
        // to override
    },

    close : function(){
        this.trigger('close');
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
        var sceneWidth = StageView.instance.$el.width();

        if (width > sceneWidth) {
            width = sceneWidth-50;
            this.$el.css('width', width-50 + 'px');
        }

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
        $(__meta__.darkanContainer).append(modal);
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

WindowView.instance = new WindowView(new WindowModel());