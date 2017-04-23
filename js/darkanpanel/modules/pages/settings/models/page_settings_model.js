var PageSettingsModel = PageModel.extend({
    defaults: {
        state   :   0,
        login   :   0,
        savemail    :   1,
        paid    :   0,
        price    :   0
    },

    initialize: function(){

        this.getData();

    },

    onGetDataResult: function(data){

        var responce = JSON.parse(data);

        if(responce){
            if(responce.length){
                this.updateModel(responce[0]);
            }
        }
    },

    getData: function(){
        DataAccess.getPanelSettings(
            {userID: 0, userType: 'all'},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});