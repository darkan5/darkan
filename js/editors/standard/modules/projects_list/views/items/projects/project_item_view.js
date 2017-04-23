var ProjectItemView = ProjectListItemView.extend({

	className: 'projectlist-item project-item',

    template: _.template($('#projectslist-project-item-template').html()),

    events: function(){
        return _.extend({},ProjectListItemView.prototype.events,{
            'click .share-project-button': 'showShareeProjectWindow',
            'click .open-project-href': 'openProject',
        });
    },

    initialize: function(data){

        this.model.on('new-shared-user-project', this.renderIsNewSharedUserProject, this);
    },



    renderPType:function(){

        var pType = this.model.get('pType');

        this.$el.attr('ptype', pType);
    },

    renderIsNew:function(e){

        this.$el.addClass('new-project');
    },

    renderIsNewSharedUserProject:function(e){

        this.$el.addClass('new-shared-user-project');
    },

    openProject:function(e){

    	this.trigger('open-project', this.model);
    },



    


    update: function(e){

        this.trigger('update-project', this.model);
    },


    showShareeProjectWindow: function(e){

        var shareProjectWindow = WindowFactory.createShareProjectWindow({ projectModel:this.model });
        shareProjectWindow.setTitle('Share project');
        //shareProjectWindow.on('ok-button-click', this.deleteProject, this);
        $('body').append(shareProjectWindow.render().$el);
    },


    afterRender: function(){
        this.renderPType();
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