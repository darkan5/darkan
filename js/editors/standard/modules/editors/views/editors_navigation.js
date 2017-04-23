var EditorsNavigation = Backbone.View.extend({

	tagName: 'ul',
	className: 'editors-navigation',

	template: _.template($('#editors-navigation-template').html()),

	events:{
		'update-sort': 'updateSort',
	},

	initialize: function(){
		this.collection = new EditorsNavigationCollection();

		this.collection.add(new EditorNavigationItemModel({ type:'timeline', name: Lang.get('editor.MENU_TIMELINE') }));
		this.collection.add(new EditorNavigationItemModel({ type:'properties', name: Lang.get('editor.MENU_PROPERTIES') }));
		this.collection.add(new EditorNavigationItemModel({ type:'styles', name: Lang.get('editor.MENU_STYLES') }));
		this.collection.add(new EditorNavigationItemModel({ type:'score', name: Lang.get('editor.MENU_SCORES') }));
		this.collection.add(new EditorNavigationItemModel({ type:'parallax', name: Lang.get('editor.MENU_PARALLAX') }));
		this.collection.add(new EditorNavigationItemModel({ type:'note', name: Lang.get('editor.MENU_NOTE') }));
		this.collection.add(new EditorNavigationItemModel({ type:'wcag', name:Lang.get('editor.MENU_WCAG') }));
		this.collection.add(new EditorNavigationItemModel({ type:'sounds', name: Lang.get('editor.MENU_POINT_SOUNDS') }));
		this.collection.add(new EditorNavigationItemModel({ type:'reaports', name: Lang.get('editor.MENU_REAPORTS') }));

		_log('EditorsNavigationCollection', this.collection);
	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.makeSortable();

        this.renderEditorssList();

		return this;
	},

	renderEditorssList: function(){

		this.addToggleButton();

		this.collection.each(this.renderOneItem, this);

		if(this.collection.length > 0){
			this.addPlusButton();
		}
	},

	renderIsBindingList: function(){

		this.collection.each(this.renderIsBindingOneItem, this);
	},

	renderIsBindingOneItem: function(model){

		model.view2.renderIsBinding();
	},

	renderOneItem: function(model){

		

		var editorNavigationItemView = new EditorNavigationItemView({model:model});
		model.view2 = editorNavigationItemView;
		editorNavigationItemView.on('close-editor', this.closeEditor, this);
		editorNavigationItemView.on('select-editor', this.selectEditor, this);
		editorNavigationItemView.on('unbind-editor', this.unbindEditor, this);

		this.$el.append(editorNavigationItemView.render().$el);


		_log('editorNavigationItemView', editorNavigationItemView);
		_log('model', model);

		if(!model.get('isBinding')){
			editorNavigationItemView.$el.hide();
		}
	},

	unbindEditor: function(model){
    	this.trigger('unbind-editor', model);
    	this.renderIsBindingList();
    },

	afterRender: function(){

		this.selectFirstEditor();
	},

	serializeData: function(){
		return {};
	},

	selectFirstEditor: function(){


		var first = this.collection.first();

		if(first){
			first.view2.selectEditor(first);
		}
	},

	addPlusButton: function(){

		// var plusButtonView = new ProjectViewPlusButton();
		// plusButtonView.on('open-new-project', this.openNewProject, this);
		// this.$el.append(plusButtonView.render().$el);
	},

	addToggleButton: function(){
		var toggelButtonView = new ToogelButtonnEditorItemView();
		toggelButtonView.on('toogle', this.toggleEditors, this);
		this.$el.append(toggelButtonView.render().$el);
	},

	toggleEditors: function(view){
		this.trigger('toogle', view);
	},

	makeSortable: function(){

        this.$el.sortable({
            delay: 100,
            items: ".editor-navigation-item-view",
            update: function(event, ui) {
                ui.item.trigger('drop-item', ui.item.index());
            }
        });
    },

	closeEditor: function(model){

		this.collection.remove(model);
		this.render();
		this.trigger('on-editor-closed', model);
	},

	selectEditor: function(model){

		this.trigger('on-editor-selected', model);
	},

	updateSort: function(event, model, position) {

        this.collection.remove( model );
        this.collection.add(model, {at: position});

    },

    changeTabEditor: function(params){

    	var params = params || {};
		var tabName = params.tabName;

		var editorItemModel = this.collection.findWhere({ 'type':tabName });

		_log('this.collection', this.collection);
		_log('editorItemModel', editorItemModel);

		if(!editorItemModel){
			return;
		}

		this.selectEditor(editorItemModel);
    },

    goToTab: function(params){
    	params = params || {};
    	var tabName = params.tabName;

    	if(_.isUndefined(tabName)){
    		return;
    	}

    	var editorModel = this.collection.findWhere({ type:tabName });

    	_log('editorModel', editorModel);

    	if(_.isUndefined(editorModel)){
    		return;
    	}

    	editorModel.view2.selectEditor();
    }

});
