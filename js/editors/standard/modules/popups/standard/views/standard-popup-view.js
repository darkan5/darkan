var StandardPopupView = PopupView.extend({

    className : 'window popup standard-popup',

    template: _.template($('#standard-popup-template').html()),

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
