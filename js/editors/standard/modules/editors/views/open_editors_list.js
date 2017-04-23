var OpenEditorsList = Backbone.View.extend({

	tagName: 'ul',
	className: 'open-editors-list',

	template: _.template($('#open-editors-list-template').html()),

	events: {

	},

	initialize: function( ) {
    	this.collection = new EditorsNavigationCollection();
    	this.constanceEditorsViews = [];
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

		return this;
	},

	serializeData: function(){
		return {};
	},

	afterRender: function(){

		this.createEditors();
	},

	createEditors: function(){

		var _that = this;

		this.collection.each(function(eModel){
			_that.createEditorView(eModel);
		});

		this.createConstanceEditors();
	},

	createEditorConatinerWindow: function(model) {

        var editorContainerWindow = WindowFactory.createEditorConatinerWindow({ editorModel:model });
        editorContainerWindow.on('on-close', this.onEditorWindowClose, this);

        var type = model.get('type').toUpperCase();
        var title = Lang.get('editor.MENU_' + type);

        $('body').append(editorContainerWindow.render({ title:title }).$el);

        return editorContainerWindow;
    },

    

	createEditorView: function(editorItemModel){


		var container = this.$el;

		switch(editorItemModel.get('type')){
			case 'timeline':

				var editorItemView = new TimelineEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('on-row-selected', this.onRowSelected, this);
				editorItemView.on('data-picker-picked', this.dataPickerPicked, this);
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;

			case 'properties':

				var editorItemView = new PropertiesEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;


			case 'styles':

				var editorItemView = new StylesEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;

			case 'reaports':

				var editorItemView = new ReaportsEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;	

			case 'sounds':

				var editorItemView = new SoundsEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;	

			case 'wcag':

				var editorItemView = new WcagEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;	


			case 'note':

				var editorItemView = new NoteEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;	

			case 'parallax':

				var editorItemView = new ParallaxEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;	

			case 'score':

				var editorItemView = new ScoreEditorItemView();
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();

					break;


			default:

				var editorItemView = new EditorItemView({ model:pageModel });
				editorItemView.editorItemModel = editorItemModel;
				editorItemView.on('go-to-tab', this.goToTab, this);
				editorItemView.hide();
				editorItemModel.view = editorItemView;
				container.append(editorItemView.render().$el);
				editorItemView.afterRender();	

					break;
		}	

	},

	goToTab: function(params){
        this.trigger('go-to-tab', params);
    },

	dataPickerPicked: function(model){
		this.trigger('data-picker-picked', model);
	},

	selectEditor: function(editorItemModel){

		this.collection.each(function(pm){
			pm.view.hide();
		});

		editorItemModel.view.show();
	},

	createConstanceEditors: function(){


		var editorItemView = new SizeAndPositionEditorItemView();
		$('#size-and-position-container').html(editorItemView.render().$el);
		editorItemView.afterRender();

		this.constanceEditorsViews.push(editorItemView);

		var editorItemView = new AlignEditorItemView();
		$('#align-container').html(editorItemView.render().$el);
		editorItemView.afterRender();

		this.constanceEditorsViews.push(editorItemView);

	},

	closeEditor: function(editorItemModel){

		var index = this.collection.indexOf(editorItemModel);

		this.collection.remove(editorItemModel);
		editorItemModel.view.remove();

		var nexteditorItemModel = this.collection.at(index-1) || this.collection.first();

		this.selectEditor(nexteditorItemModel);
	},

	setModel: function(pageModel){
		this.model = pageModel;

		this.collection.each(function(model){
			model.view.setModel(pageModel);
		});
	},

	setModelToOpenEditors: function(model){

		this.collection.each(function(eModel){
			eModel.view.setModelToEditor(model);
		});

		for (var i = 0; i < this.constanceEditorsViews.length; i++) {
			var view = this.constanceEditorsViews[i];
			view.setModelToEditor(model);
		};
	},

	setStageModel: function(pModel){

		this.collection.each(function(eModel){
			eModel.view.setStageModelToEditor(pModel);
		});
	},

	onRowSelected: function(rowModel){
		this.setModelToOpenEditors(rowModel);
	},

	unbindEditor: function(editorItemModel){
        _log('unbindEditor', editorItemModel);

        editorItemModel.set('isBinding', false);

        _log('this.collection', this.collection);
        
		var editorContainerWindow = this.createEditorConatinerWindow(editorItemModel);
		editorContainerWindow.appendEditor(editorItemModel);


    },

    onEditorWindowClose: function(sender, editorItemModel){

    	_log('onEditorWindowClose', editorItemModel);

    	editorItemModel.view.remove();
        editorItemModel.set('isBinding', true);

    	this.$el.append(editorItemModel.view.render().$el);
		editorItemModel.view.afterRender();

		
		this.selectEditor(editorItemModel);

		editorItemModel.view.setStageModelToEditor( StageView.instance.model );
		editorItemModel.view.setModelToEditor( editorItemModel.view.model );


		this.trigger('on-editor-window-close');



    },


});