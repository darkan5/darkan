var PageAddUserMailingView = PageAddUserElearningView.extend({
    template: '#page-add-user-view-mailing-template',


    initialize: function(){
        this.userList = {};
        this.model = new PageAddUserMailingModel();
        this.model.on('change', this.onModelChanged, this);
    },

});