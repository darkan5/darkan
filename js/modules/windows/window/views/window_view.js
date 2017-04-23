var WindowView = Backbone.View.extend({

    tagName: 'div',
    className : 'window window-view',

    template: _.template($('#window-template').html()),

    modalExists: false,

    processingModal: {
        el: undefined,
        exists: false
    },

    events: {
        'click .window-close-button': 'close'
    },

    bindings: {
        '.window-top-bar': 'title'
    },

	initialize: function( data ) {
        this.windowModel = data.windowModel;
		this.runListeners();
        this.afterInitialize(data);
  	},

    afterInitialize : function(data) {
        
    },

    render : function(dataModel) {

        this.beforeRender();

        dataModel = dataModel != undefined ? dataModel : this.getRenderData();


        var componentTemplate = this.template(dataModel);
        this.$el.html(componentTemplate);

        var modal = this.windowModel.get('modal');

        if (modal) {
            var windowID = new Date().getUTCMilliseconds();
            this.$el.attr('windowid', windowID);
            this.addModal(windowID);
        }

        this.makeDraggable(modal);

        this.afterRender();

        return this;
    },

    getRenderData: function() {
        return this.windowModel.toJSON();
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

    makeDraggable: function(modal) {

        // alert(this.model.get('draggable'));

        if (this.windowModel.get('draggable')) {
            var _that = this;

            // if(modal){

                // var content = this.$el.find('.window-wrapper');

                // content.draggable({
                //     cursor: 'move',
                //     handle: ".window-top-bar"
                // });

                // content.css({ position:'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px'});

            // }else{

                this.$el.draggable( {
                    cursor: 'move',
                    handle: ".window-top-bar",
                    containment: $('body')
                });
            // }
        }


    },

    showModalWindowView: function() {

        if (!this.processingModal.exists) {

            this.processingModal.el = $('<div>', {
                class: 'processing-modal'
            });
            this.processingModal.el.css({
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                position: 'absolute',
                opacity: '0.4',
                background: '#ccc'
            });

            this.$el.append(this.processingModal.el);

            this.processingModal.exists = true;
        }

    },

    hideModalWindowView: function() {

        if (this.processingModal.exists) {
            this.processingModal.el.remove();
            this.processingModal.exists = false;
        }

    },

    addModal: function(windowID) {

        

        if (!this.modalExists) {

            var zIndex = this.windowModel.get('zIndex');

            //_log('this.model', this.windowModel);

            var modal = $('<div></div>', {
                    class: 'modal-block',
                });

            modal.css('z-index', zIndex);

            this.modalWindowEl = modal;
            $('body').append(modal);

            this.modalExists = true;
        }
    },

    removeModal: function() {
        if (this.windowModel.get('modal')) {
            this.modalWindowEl.remove();
            // $('body').find('> .modal-block[for="' + this.$el.attr('windowid') +'"]').remove();
        }
    },

    hide: function(){
        this.$el.hide();
    },

    show: function(){
        this.$el.show();
    },

    runListeners :function(){
        // To override
    },

    onClose : function(){
    	// To override
    },

    accept: function(visitor) {
        visitor.visit(this);
    },

    getCapabilities: function() {
        var capabilities = Capabilities.getInstance();
        capabilities.on('change', this.onCapabilitiesChanged, this);
        capabilities.getCapabilities();
    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        // To override
    },

    setTitle: function(title) {
        this.windowModel.set('title', title);
    },

    disableButtons: function() {
        // To override
    },

    enableButtons: function() {
        // To override
    }
   
});