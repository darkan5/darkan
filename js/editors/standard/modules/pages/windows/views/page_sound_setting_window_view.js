var PageSoundSettingWindow = LoadedWindowView.extend({

    tagName: 'div',
    className : 'window window-view pagesoundsettingwindow-view editor-window',

    template: _.template($('#pagesoundsettingwindow-template').html()),

    events: function(){
         return _.extend({},LoadedWindowView.prototype.events,{
             'click .upload': 'uploadOnClick',
             'click .delete-page-sound-button': 'deleteSound',
             'dragenter': 'onFileDragOver',
             'dragleave .loaded-dropzone': 'onFileDragOut',
             'drop .loaded-dropzone': 'uploadOnFileDrop'
         });
    },




	initialize: function( data ) {
        this.componentModel = data.componentModel;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

    deleteSound: function(){

        this.model.setFileName( { fileName:'' } );
        this.render({pageModel:this.model});

        this.trigger('delete-sound', this.model, this);
    },

    afterRender: function() {
        // to override
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    },

    renderAfterComplete: function() {
        this.render({ pageModel: this.model.toJSON() });
    },
});