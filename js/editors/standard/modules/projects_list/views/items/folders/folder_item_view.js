var FolderItemView = ProjectListItemView.extend({

	className: 'projectlist-item project-item',

    template: _.template($('#projectslist-folder-item-template').html()),

    events:{
    	'click' : 'openFolder',
        'click .edit-folder-name-button': 'activeEditingName',
        
    	// 'click' : 'selectItem'
    },

    initialize: function(data){

        this.model.on('new-folder', this.renderIsNew, this);
    },


    openFolder:function(e){
        e.stopPropagation();

        this.trigger('open-folder', this.model);

    },

    renderIsNew:function(e){

        this.$el.addClass('new-folder');
    },


    beforRender: function(){


    },

    update: function(e){
        this.trigger('update-folder', this.model);
    },

    render: function(){

        this.beforRender();

        this.model.isSelected = false;

        var template = this.template(this.model.toJSON());
        this.$el.html(template);

        this.afterRender();

        return this;
    },

    

});