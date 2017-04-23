var PublishProjectListView = Backbone.View.extend({

    // tagName: 'ul',
    // className : 'publish-project-list',

    template: _.template($('#publish-project-list-template').html()),


    initialize: function() {
        
    },

    events: {
        'sort-rows-back': 'sortPublications',
        'keyup .published-projects-search': 'searchPublications'
    },

    searchPublications: function(e) {
        var searchValue = $(e.currentTarget).val();

        this.collection.each(function(pModel) {
            var name = pModel.get('name') || "";
            var summary = pModel.get('summary') || "";
            if (name.toLowerCase().indexOf(searchValue) !== -1 || summary.toLowerCase().indexOf(searchValue) !== -1) {
                pModel.renderShow();
            } else {
                pModel.renderHide();
            }
        });
    },

    render: function() {
        var _that = this;
    	// this.$el.html('');
        var projectList = this.template();
        this.$el.html(projectList);
        this.collection.each(this.addProjectItem, this);

        this.$el.find('.publish-project-list').sortable({
            handle: '.sortable-handle',

            stop: function(event, ui) {
                ui.item.trigger('sort-rows', ui.item.index());
            }
        });

    	return this;
    },

    sortPublications :function(event, model, position){

        this.collection.remove(model);
        this.collection.add(model, {at: position});

        this.collection.each(function(pModel, i) {
            pModel.set('ord', i+1);
        });

        this.render();
    },

    addProjectItem: function(projectModel) {
        var _that = this;
        var projectView = new PublishProjectItemView({model: projectModel});
        projectView.on('delete-publication', function(pModel) {
            _that.deletePublication(pModel);
        });
        projectView.on('get-published-data', function(pModel) {
            //_that.render();
            _that.trigger('get-published-data')
        });
        this.$el.find('.publish-project-list').append(projectView.render().$el);

        projectView.afterRender();
    }

});