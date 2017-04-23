var TreeItemView = ProjectListItemView.extend({

	className: 'tree-item',
	tagName: 'li',

    template: _.template($('#projectslist-tree-item-template').html()),

    events:{
    	'click' : 'goToFolder',
    	'select-parents' : 'selectParents',
        'drop-folder-item': 'dropFolderItem',
    },

    initialize: function(data){

    	this.model.on('is-not-showing', this.renderShowingFalse, this);
        this.model.on('is-showing', this.renderShowingTrue, this);
        this.model.on('select-childs', this.selectChilds, this);
        this.model.on('change:name', this.render, this);
    },

    dropFolderItem: function(event, targetFolderModel) {

        this.trigger('on-folder-move', this.model, targetFolderModel);
    },

    goToFolder:function(e){

    	this.trigger('go-to-folder', this.model);
    },

    renderShowingTrue: function(model){

    	_log('renderShowingTrue', model);

	    this.$el.find('.folder-icon').attr('class', 'fa folder-icon fa-folder-open fa-2x');
    },

    renderShowingFalse: function(model){

    	this.$el.removeClass('select-parents');
    	// this.$el.removeClass('is-showing');
        this.$el.find('.folder-icon').attr('class', 'fa folder-icon fa-folder fa-2x');
    	
    },

    selectParents: function(){

    	_log('selectParents', this.model);

    	this.$el.addClass('select-parents');
    },

    selectChilds: function(){

  //   	_log('selectParents', this.model);

  //   	var parents = this.$el.parentsUntil('.main-tree-item');

		// _log('model.treeView.$el', this.$el);
		// _log('parents', parents);

		// for (var i = 0; i < parents.length; i++) {
		// 	var parent = $(parents[i]).prev();
		// 	parent.trigger('select-parents');
		// };

		// var childs = this.$el.next().find('> .tree-item');

		// _log('childs', childs);

		// for (var i = 0; i < childs.length; i++) {
		// 	var child = $(childs[i]);
		// 	child.trigger('select-parents');
		// };

  //   	this.$el.addClass('select-parents');




  //   	var siblings = this.$el.siblings('.tree-item');

		// _log('siblings', siblings);

		// for (var i = 0; i < siblings.length; i++) {
		// 	var child = $(siblings[i]);
		// 	child.trigger('select-parents');
		// };

    },

    render: function(){

        var _that = this;

        this.beforRender();

        this.model.isSelected = false;

        var template = this.template(this.model.toJSON());
        this.$el.html(template);



        this.afterRender();

        return this;
    },

    makeFolderDroppable: function(){

        var _that = this;

        this.$el.droppable({
            greedy: true,
            activeClass: "tree-folder-state-hover",
            hoverClass: "tree-folder-state-active",

            drop: function( event, ui ) {

                //$(this).addClass( "ui-state-highlight" )

                _log('ui', ui);

                $(ui.draggable).trigger('drop-folder-item', _that.model);
            }
        });
    },

    makeProjectDroppable: function(){

        var _that = this;

        this.$el.droppable({
            greedy: true,
            activeClass: "tree-project-state-hover",
            hoverClass: "tree-project-state-active",

            drop: function( event, ui ) {

                //$(this).addClass( "ui-state-highlight" )

                _log('ui', ui);

                $(ui.draggable).trigger('drop-project-item', _that.model);
            }
        });
    },

    unmakeDroppable: function(){

        _log('is droppable', this.$el.hasClass('ui-droppable'));

        if(this.$el.hasClass('ui-droppable')){
            this.$el.droppable('destroy');
        }

        
    }

    

});