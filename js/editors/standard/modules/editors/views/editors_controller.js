var EditorsController = Backbone.View.extend({

    className: 'editors-controller',
		
	template: _.template($('#editors-controller-template').html()),

    events: {
        
    },

    visible: true, 

    initialize: function() {
        // to override
    },

	render: function(){

        var _that = this;

        var template = this.template(this.serializeData());
        this.$el.html(template);

        this.$el.resizable({
            handles: 'n',
            resize: function(event, ui) {
                _that.onResize();
            }
        });


        return this;
    },

    afterRender: function(){

        this.editorsNavigation = new EditorsNavigation();

        this.openEditorsList = new OpenEditorsList();
        this.openEditorsList.on('data-picker-picked', this.dataPickerPicked, this);
        this.openEditorsList.on('go-to-tab', this.goToTab, this);
        this.openEditorsList.on('on-editor-window-close', this.onEditorWindowClose, this);
        this.$el.find('.open-editors-list-wrapper').append(this.openEditorsList.render().$el);
        this.openEditorsList.collection = this.editorsNavigation.collection;
        this.openEditorsList.afterRender();

        this.$el.find('.editors-navigation-wrapper').append(this.editorsNavigation.render().$el);
        this.editorsNavigation.on('on-editor-selected', this.onEditorSelected, this);
        this.editorsNavigation.on('on-editor-closed', this.onEditorClosed, this);
        this.editorsNavigation.on('toogle', this.toggleEditors, this);
        this.editorsNavigation.on('unbind-editor', this.unbindEditor, this);
        this.editorsNavigation.afterRender();

        if ($(document).width() <= 1366) {
            this.hideMenu();
        }   
    },

    onEditorWindowClose: function(){
        this.editorsNavigation.renderIsBindingList();
    },

    unbindEditor: function(model){
        this.openEditorsList.unbindEditor(model);
    },

    goToTab: function(params){
        this.editorsNavigation.goToTab(params);
    },

    dataPickerPicked: function(model){
        this.trigger('data-picker-picked', model);
    },

    toggleEditors: function( view ){

        var _that = this;

        tiggleIcon = view.$el;

        _log('tiggleIcon', tiggleIcon);
        _log('this.$el', this.$el);


        this.hideMenu() || this.showMenu();
    },

    serializeData: function(){
        return {};
    },

    onEditorSelected: function(editorItemModel){

        _log('onEditorSelected', editorItemModel);

        this.openEditorsList.selectEditor(editorItemModel, this.model);
        if (!this.visible) {
            this.showMenu();
        }
    },

    onEditorClosed: function(editorItemModel){

        _log('onEditorClosed', editorItemModel);

        this.openEditorsList.closeEditor(editorItemModel);
    },

    setModel: function(pageModel){
        this.model = pageModel;
        this.openEditorsList.setModel(pageModel);
    },

    setModelToOpenEditors: function( model){

        this.openEditorsList.setModelToOpenEditors( model );
    },

    setStageModel: function(pModel){
        this.openEditorsList.setStageModel(pModel);
    },

    changeTabEditor: function(params){

        this.editorsNavigation.changeTabEditor(params);
    },

    onResize: function() {
        var _that = this;

        this.$el.css('top', 'auto');

        this.changeToggleButonArrow();

        this.trigger('on-resize', this);
    },

    hideMenu: function(onComplete) {

        var _that = this;

        if(!this.visible) return false;

        this.visible = false;

        var _that = this;
        this.$el.animate({height: '40px'}, 300, function(){

            if(_.isFunction(onComplete)){
                onComplete();
            }

            _that.onResize();
        });

        return true;
    },

    showMenu: function() {

        var _that = this;

        if(this.visible) return false;

        this.visible = true;

        var _that = this;
        this.$el.animate({height: '210px'}, 300, function(){
            _that.onResize();
        });

        return true;
    },

    changeToggleButonArrow: function(onComplete) {


        var menuHeight = this.$el.height();

        this.toggleButton = this.toggleButton || this.$el.find('.toggle-button-editor-item-view');

        if (menuHeight > 45) {
            this.toggleButton.html('&#9660;');
            this.visible = true;
        } else {
            this.toggleButton.html('&#9650;');
            this.visible = false;
        }
    }
});