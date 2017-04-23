var UserInfoModel = Backbone.Model.extend({
    defaults:{
        activeLine: null,
        activeComponent: new ComponentModel(),
        activePage: new PageModel( new PageOptions({ pageid:1 }) ),
        activePageId: 1,
        activeRowId: 1
    }

});
