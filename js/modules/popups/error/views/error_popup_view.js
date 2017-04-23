var ErrorPopupView = PopupView.extend({

    className : 'window popup error-popup',

    template: _.template($('#error-popup-template').html()),

    okButtonClick :function(){

        this.triggerOk();

        this.close();
    },

    cancelButtonClick :function(){

        this.close();
    },

    onClose : function(){
    }
});
