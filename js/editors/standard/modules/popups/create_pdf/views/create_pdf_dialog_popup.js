var CreatePdfDialogPopupView = PopupView.extend({

    className : 'window popup create-pdf-popup',

    template: _.template($('#create-pdf-popup-template').html()),

    okButtonClick :function(){

        this.triggerOk();

        this.close();
    },

    cancelButtonClick :function(){

        this.triggerCancel();

        this.close();
    },

    onClose : function(){
        this.trigger('close-popup');
    }
});

