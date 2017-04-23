var FolderItemView = ProjectListItemView.extend({

	className: 'projectlist-item project-item',

    template: _.template($('#projectslist-folder-item-template').html()),

    events:{
    	'dblclick' : 'openFolder',
        'click .edit-folder-name-button': 'activeEditingName',
        'drop-folder-item': 'dropFolderItem',
        
    	// 'click' : 'selectItem'
    },

    initialize: function(data){

        this.model.on('new-folder', this.renderIsNew, this);
    },

    dropFolderItem: function(event, targetFolderModel) {

        _log('dropProjectItem source', this.model);
        _log('dropProjectItem target', targetFolderModel);

        this.trigger('on-folder-move', this.model, targetFolderModel);
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

            start: function(e){
               //$(this).attr('oldzindex', $(this).css('z-index'));
               //$(this).css('z-index', 2000);

               _that.$el.attr('isdragging', true);

               _that.trigger('make-folders-droppable', _that.model);

            },

            stop: function(e){
                //$(this).css('z-index', $(this).attr('oldzindex'));

                _that.$el.attr('isdragging', false);

                _that.trigger('unmake-folders-droppable', _that.model);
            },

            helper: function(e) {

                var helperWrapper = $('<div>', {
                    class: 'drawfolder-draggablehelper'
                });

                var image = $('<div>', {
                    class: 'helper-icon',
                });
                image.html( '<i class="fa folder-icon fa-folder fa-2x"></i>' );

                var text = $('<div>', {
                    class: 'helper-text'
                });
                text.text( _that.model.get('name'));

                helperWrapper.append(image);
                helperWrapper.append(text);

                //helperWrapper.css('top', e.offsetX + 'px');
                //helperWrapper.css('left', e.offsetY + 'px');

                return helperWrapper;
            }
        });
    },

    makeFolderDroppable: function(){

        var _that = this;

        this.$el.droppable({
            greedy: true,
            activeClass: "folder-state-hover",
            hoverClass: "folder-state-active",

            drop: function( event, ui ) {

                _log('ui folder', ui);

                $(ui.draggable).trigger('drop-folder-item', _that.model);
            }
        });
    },

    makeProjectDroppable: function(){

        var _that = this;

        this.$el.droppable({
            greedy: true,
            activeClass: "project-state-hover",
            hoverClass: "project-state-active",

            drop: function( event, ui ) {

                _log('ui project', ui);

                $(ui.draggable).trigger('drop-project-item', _that.model);
            }
        });
    },

    unmakeDroppable: function(){
        if(this.$el.hasClass('ui-droppable')){
            this.$el.droppable('destroy');
        }
    }

    

});