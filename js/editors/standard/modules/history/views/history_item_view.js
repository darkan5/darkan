var HistoryItemView = Backbone.View.extend({

    tagName: "li",
    className: 'history-item-view',

    template: _.template($('#history-item-template').html()),
    templateUpdateComponnets: _.template($('#history-item-update-components-template').html()),
    templateAddNewPage: _.template($('#history-item-add-new-page-template').html()),
    templateDeletePages: _.template($('#history-item-delete-pages-template').html()),
    templateUpdatePageOptions: _.template($('#history-item-update-page-options-template').html()),
    templateUpdatePageSort: _.template($('#history-item-update-page-sort-template').html()),
    templateUpdateProjectOptions: _.template($('#history-item-update-project-options-template').html()),
    templateMoveComponentsToLayers: _.template($('#move-components-to-layer-template').html()),
    templateSortRows: _.template($('#sort-rows-template').html()),

    selected: false,

    events:{
        'click': 'goToHistoryItem'
    },

    initialize :function(){
         this.model.view = this;
    },

    goToHistoryItem :function(){

        this.trigger('go-to-history-item', this.model, this);
    },

    select :function(){

        this.$el.attr('selected', 'selected');
        this.selected = true;
    },

    unselect :function(){

        this.$el.attr('selected', false);
        this.selected = false;
    },

    render :function(){

        var action = this.model.get('action');

        switch(action){
            case 'updateComponents': 
            case 'addComponents': 
            case 'deleteComponents': 

                var template = this.templateUpdateComponnets(this.model.toJSON());
                this.$el.html(template);

                break;

            case 'addNewPage':

                var template = this.templateAddNewPage(this.model.toJSON());
                this.$el.html(template);

                break; 

            case 'deletePages':

                var template = this.templateDeletePages(this.model.toJSON());
                this.$el.html(template);

                break;

            case 'updatePageOptions':

                var template = this.templateUpdatePageOptions(this.model.toJSON());
                this.$el.html(template);

                break;

            case 'updatePageSort':

                var template = this.templateUpdatePageSort(this.model.toJSON());
                this.$el.html(template);

                break;

            case 'updateProjectOptions':

                var template = this.templateUpdateProjectOptions(this.model.toJSON());
                this.$el.html(template);

                break;

             case 'moveComponentsToLayer':

                var template = this.templateMoveComponentsToLayers(this.model.toJSON());
                this.$el.html(template);

                break;   

            case 'sortRows':

                var template = this.templateSortRows(this.model.toJSON());
                this.$el.html(template);

                break; 

                


            default: 

                var template = this.template(this.model.toJSON());
                this.$el.html(template);

                break;
        }

        this.$el.attr('selected', this.selected);

        return this;
    }
});