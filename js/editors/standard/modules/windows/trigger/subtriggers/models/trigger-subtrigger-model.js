var TriggerSubtriggerModel = Backbone.Model.extend({
    defaults:{
        //whendoit: '',
        whattodo: '',
        objs: [],
        opts:  new TriggerOptsModel()
    }
});
