var TreeView = Backbone.View.extend({

	
    template: '#tree-template',

   
    initialize: function(){

    	var _that = this;
    },

    render: function(){

    	this.createHtmlTree();

        return this;
    },

    createHtmlTree: function(){

    	var _that = this;

        this.$el.html('');

        var foldersCollection = this.model.get('folders').toArray();


        var fArray = this.getFoldersTreeArray( foldersCollection, -1);

        var ul = $('<ul>',{
        	class: 'main-tree-item'
        });

        var tree = this.createTree(fArray, ul);

        _log('fArray', fArray);
        _log('tree', tree);

        this.$el.append(tree);


    },
 

    createTree: function(foldersArray, ul){

        var _that = this;

        _.each(foldersArray, function(fModel){

            var treeView = TreeFactory.createNormalTreeView( fModel );
            fModel.treeView = treeView;
            treeView.on('go-to-folder', _that.goToFolder, _that);
            treeView.on('on-folder-move', _that.onFolderMove, _that);
            ul.append(treeView.render().$el);

            var ul2 = $('<ul>');

            ul.append(ul2);

            _that.createTree(fModel.folders, ul2);

        });

        return ul;

    },

    onFolderMove: function(sourceFolderModel, targetFolderModel){

        this.trigger('on-folder-move', sourceFolderModel, targetFolderModel, this);
    },

    getFoldersTreeArray: function(foldersArray, folderID){

        var _that = this;

        var fArray = this.where(foldersArray, folderID );

        _.each(fArray, function(fModel){

            var folderID = fModel.get('folderID');

            fModel.folders = _that.getFoldersTreeArray(foldersArray, folderID);

        }, this);

        return fArray;
    },

    where: function(foldersArray, folderID){

        var tempArray = [];

        _.each(foldersArray, function(fModel){

            if(fModel.get('folder') == folderID){
                tempArray.push(fModel);
            }

        }, this);

        return tempArray;
    },

    goToFolder: function(folderModel){

        _log('backToFolder', folderModel);

        this.trigger('go-to-folder', folderModel, this);

    },

    update: function(activeFolderModel, folderModel){
        this.createHtmlTree();
    },

    makeFoldersDroppable: function(folderModel){

        var foldersCollection = this.model.get('folders').toArray();

        var droppableFoldersCollection = new FoldersCollection();

        //_log('makeFoldersDroppable tree', foldersCollection);

        _.each(foldersCollection, function(fModel){

            //_log('makeFoldersDroppable tree model', fModel);

            //if(fModel.cid == folderModel.cid){
                //fModel.treeView.makeDroppable();

                droppableFoldersCollection.add(fModel);
            //}

        }, this);

        //droppableFoldersCollection.remove(folderModel);

        this.removeDroppableModels(folderModel, droppableFoldersCollection);

        droppableFoldersCollection.each(function(fModel){

            fModel.treeView.makeFolderDroppable();

        }, this);


    },

    removeDroppableModels: function(folderModel, droppableFoldersCollection){

        var _that = this;

        droppableFoldersCollection.remove(folderModel);

        _log('removeDroppableModels tree model', folderModel, _log.timeline);

        _.each(folderModel.folders, function(fModel){

            _that.removeDroppableModels(fModel, droppableFoldersCollection);

        });
    },

    unmakeFoldersDroppable: function(folderModel){

        var foldersCollection = this.model.get('folders').toArray();

        //_log('unmakeFoldersDroppable tree', foldersCollection);

        _.each(foldersCollection, function(fModel){

            //_log('unmakeFoldersDroppable tree model', fModel);

            fModel.treeView.unmakeDroppable();

        }, this);
    },





    makeProjectsDroppable: function(folderModel){

        var foldersCollection = this.model.get('folders').toArray();

        _.each(foldersCollection, function(fModel){

            fModel.treeView.makeProjectDroppable();

        }, this);


    },

    unmakeProjectsDroppable: function(folderModel){

        var foldersCollection = this.model.get('folders').toArray();

        _.each(foldersCollection, function(fModel){

            fModel.treeView.unmakeDroppable();

        }, this);
    }

	
});