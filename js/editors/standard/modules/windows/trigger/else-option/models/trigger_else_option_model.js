var TriggerElseActionModel = Backbone.Model.extend({
    defaults:{
        //whendoit: 'none',
        whattodo: '',
        objs: [],
        opts: new TriggerOptsModel()
    }
});
