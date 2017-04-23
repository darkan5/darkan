var DeleteFolderPopupView = PopupView.extend({

    className : 'window popup delete-folder-popup',

    template: _.template($('#delete-folder-popup-template').html()),

    afterInitialize : function(data) {

        var _that = this;

        this.folderModel = data.data.folderModel;

    },

    okButtonClick :function(){

        var _that = this;

        this.disableButtons();

        DataAccess.deleteFolder(
            { folder:_that.folderModel.toJSON() },
            function(data){
                _log('deleteFolder', data, _log.dataaccessOutResult);

                _that.enableButtons();

                if(!data.success){

                    _Notify('Fault');
                    return;
                }

                var foldersStructure = data.data.foldersStructure;

                _that.trigger('on-folder-deleted', foldersStructure, this);

                _that.close();
                
            },
            function(data){
                _log('deleteFolder', data, _log.dataaccessOutFault);

                _that.enableButtons();
            }
        );
    },

    cancelButtonClick :function(){

        this.close();
    },

    onClose : function(){
    },

    disableButtons: function() {
         this.$el.find('.popup-ok-button').attr('disabled', 'disabled');
    },

    enableButtons: function() {
         this.$el.find('.popup-ok-button').removeAttr('disabled');
    }
});
