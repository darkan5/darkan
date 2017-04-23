var BreadcrumbView = Backbone.View.extend({

	
    template: '#breadcrumb-template',

   
    breadcrumbsCollection : new BreacrumbsCollection(),

    initialize: function(data){

    	this.model = data.model;
    },

    render: function(){

        this.$el.html('');

        _log('this.breadcrumbsCollection', this.breadcrumbsCollection);

        for (var i = this.breadcrumbsCollection.length - 1; i >= 0; i--) {

            var breadcrumbItem = this.breadcrumbsCollection.at(i);

            this.addItemBreadcrumbView(breadcrumbItem);
        };

        return this;
    },

    addItemBreadcrumbView: function( listItem ) {

        var breadcrumbView = BreadcrumbsFactory.createBreadcrumbByType( listItem.get('pType'), listItem );
        breadcrumbView.on('back-to-folder', this.backToFolder, this);
        this.$el.append(breadcrumbView.render().$el);
    },


    refreshBreadcrumbs: function(folderModel){

        var _that = this;

        folderModel = folderModel == undefined ? this.model.get('folders').findWhere({ folderID:0 }) : folderModel;

        this.breadcrumbsCollection.reset();
        this.breadcrumbsCollection.add(folderModel);

        this.breadcrumbsCollection = this.getParentFolders(folderModel, this.breadcrumbsCollection);


        this.render();
        
    },

    getParentFolders: function(folderModel, breadcrumbsCollection){
        
        var foldersCollection = this.model.get('folders');

        var folder = folderModel.get('folder');

        var parentFlderModel = foldersCollection.findWhere({ folderID:folder });

        if(parentFlderModel){

            breadcrumbsCollection.add(parentFlderModel);

            if(parentFlderModel.get('folder') != -1){
                this.getParentFolders(parentFlderModel, breadcrumbsCollection);
            }
        }

        return breadcrumbsCollection;

    },

    backToFolder: function(folderModel){
        _log('backToFolder', folderModel);

        this.refreshBreadcrumbs(folderModel);

        this.trigger('back-to-folder', folderModel, this);

        this.render();
    },

    setAsSearch: function(value){

        var foldersCollection = this.model.get('folders');

        var firstFolderModel = foldersCollection.findWhere({ folderID:0 });

        var folderModel = new FolderItemModel();
        folderModel.set('name', Lang.get('projects.breadcrumbSearch') + ': [' + value + ']');
        folderModel.set('pType', 'search-folder');

        this.breadcrumbsCollection.reset();
        this.breadcrumbsCollection.add(folderModel);
        this.breadcrumbsCollection.add(firstFolderModel);

        this.render();
    }


	
});