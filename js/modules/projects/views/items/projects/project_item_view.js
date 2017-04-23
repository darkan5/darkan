var ProjectItemView = ProjectListItemView.extend({

	className: 'projectlist-item project-item',

    template: _.template($('#projectslist-project-item-template').html()),

    events: function(){
        return _.extend({},ProjectListItemView.prototype.events,{
            'click .delete-project-button': 'showDeleteProjectWindow',
            'click .copy-project-button': 'copyProject',
            'click .share-project-button': 'showShareeProjectWindow',
            'click .download-project-button': 'downloadProject',
            'click .template-project-button': 'templateProject',
            'click .edit-project-name': 'activeEditingName',
            'drop-project-item': 'dropProjectItem',
        });
    },

    initialize: function(data){

        this.model.on('new-project', this.renderIsNew, this);
        this.model.on('new-shared-user-project', this.renderIsNewSharedUserProject, this);

        this.model.on('change:pType', this.renderPType, this);
    },

    dropProjectItem: function(event, targetFolderModel) {

        this.trigger('on-project-move', this.model, targetFolderModel);
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

    downloadProject: function(e){

        this.trigger('download-project', this.model);
    },

    templateProject: function(e){

        this.trigger('template-project', this.model);
    },

    copyProject: function(e){

        this.trigger('copy-project', this.model);
    },

    showShareeProjectWindow: function(e){

        var shareProjectWindow = WindowFactory.createShareProjectWindow({ projectModel:this.model });
        shareProjectWindow.setTitle('Share project');
        //shareProjectWindow.on('ok-button-click', this.deleteProject, this);
        $('body').append(shareProjectWindow.render().$el);
    },

    showDeleteProjectWindow: function(e){

        var deleteProjectPopup = PopupFactory.createDeleteProjectPopup({ projectModel:this.model });
        deleteProjectPopup.setTitle('Delete project');
        deleteProjectPopup.on('on-project-deleted', this.deleteProject, this);
        $('body').append(deleteProjectPopup.render().$el);
    },

    deleteProject: function(e){

        var _that = this;

        this.trigger('delete-project', this.model);
    },

    afterRender: function(){
        this.renderPType();
    },

    render: function(){

        this.beforRender();

        this.model.isSelected = false;

        var template = this.template(this.model.toJSON());
        this.$el.html(template);

        this.makeDraggable();


        this.afterRender();

        return this;
    },

    makeDraggable: function(){
        if (this.$el.is('.ui-draggable')) {
            this.$el.draggable('destroy');
        }

        var _that = this;

        this.$el.draggable({

            revert: true,
            delay: 100,

            cursorAt: {top: 2, left: 2},

            start: function(e, ui){
               //$(this).attr('oldzindex', $(this).css('z-index'));
               //$(this).css('z-index', 2000);
               //  $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
               //  $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
               _that.$el.attr('isdragging', true);
               
               _that.trigger('make-projects-droppable', _that.model);
            },

            stop: function(e){
                //$(this).css('z-index', $(this).attr('oldzindex'));

                _that.$el.attr('isdragging', false);

                _that.trigger('unmake-projects-droppable', _that.model);
            },

            helper: function(e) {
                var helperWrapper = $('<div>', {
                    class: 'drawproject-draggablehelper'
                });

                var image = $('<div>', {
                    class: 'helper-image',
                    style: 'background-image:url("' + _that.$el.find('.image-container img').attr('src') + '")'
                });

                var text = $('<div>', {
                    class: 'helper-text'
                });
                text.text( _that.model.get('name'));

                helperWrapper.append(image);
                helperWrapper.append(text);

                return helperWrapper;
            }
        });
    },

});