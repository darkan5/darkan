var DeleteProjectPopupView = PopupView.extend({

    className : 'window popup delete-project-popup',

    template: _.template($('#delete-popup-popup-template').html()),

    afterInitialize : function(data) {

        var _that = this;

        this.projectModel = data.data.projectModel;

    },

    okButtonClick :function(){

        var _that = this;

        this.disableButtons();

        DataAccess.deleteProject(
            { project:_that.projectModel.toJSON() },
            function(data){
                _log('deleteProject', data, _log.dataaccessOutResult);

                _that.enableButtons();

                if(!data.success){

                    _Notify('Fault');
                    return;
                }

                _that.trigger('on-project-deleted', _that.projectModel, this);

                _that.close();
            },
            function(data){
                _log('deleteProject', data, _log.dataaccessOutFault);

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
