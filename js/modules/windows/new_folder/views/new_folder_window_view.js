var NewFolderWindowView = WindowView.extend({

    className : 'window window-new-folder-view',

    template: _.template($('#window-new-folder-template').html()),


    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'submit .new-folder-form': 'createNewFolder',
            'click .new-folder-name-cancel': 'close',
        });
    },

    afterInitialize : function(data) {

        var _that = this;

        this.projectsListModel = data.data.projectsListModel;

    },

    createNewFolder : function(e) {

        var _that = this;

        e.preventDefault();

        var name = this.$el.find('.new-folder-name-input').val();

        if(name == ''){
            // _Notify("Folder name can't be empty");
            return;
        }

        var folderModel = new FolderItemModel();

        folderModel.set('name', name);

        

        var lastFolderID = this.projectsListModel.get('lastFolderID');
        lastFolderID++;
        var lastVisitedFolderID = this.projectsListModel.get('lastVisitedFolderID');
        folderModel.set('folderID', lastFolderID);
        folderModel.set('folder', lastVisitedFolderID);

        _log('lastFolderID', lastFolderID);
        _log('lastVisitedFolderID', lastVisitedFolderID);


        this.disableButtons();

        DataAccess.createNewFolder(
            { folder:folderModel.toJSON(), lastFolderID:lastFolderID },
            function(data){
                _log('createNewFolder', data, _log.dataaccessOutResult);

                if(!data.success){

                    _that.enableButtons();

                    _Notify('Fault');
                    return;
                }

                if(!data.data.folder){

                    _that.enableButtons();

                    _Notify('Fault');
                    return;
                }

                _Notify('Success');

                var folder = data.data.folder;
                var lastFolderID = data.data.lastFolderID;

                var newFolderModel = FoldersFactory.createFolderModelByType(folder.pType, folder);

                _that.projectsListModel.set('lastFolderID', lastFolderID);

                _that.trigger('create-new-folder', folderModel, _that);

                _that.close();


            },
            function(data){
                _log('createNewFolder', data, _log.dataaccessOutFault);

                _that.enableButtons();
            }
        );
    },

    afterRender: function() {
        var _that = this;
        setTimeout(function() {
            _that.$el.find('.new-folder-name-input').focus();
            _that.$el.find('.new-folder-name-input').select();
        }, 2);
    },

    disableButtons: function() {
         this.$el.find('.new-folder-name-submit').attr('disabled', 'disabled');
    },

    enableButtons: function() {
         this.$el.find('.new-folder-name-submit').removeAttr('disabled');
    }

});