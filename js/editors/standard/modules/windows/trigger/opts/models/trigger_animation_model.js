var TriggerOptsModel = Backbone.Model.extend({
    defaults:function(){
        return {
            animationType: new TriggerAnimationTypeModel(),
            delay: 0,
            link: '',
            transition: {},
            notadded: true,
            keybord: {},
            video : {},
            style : {}
        }
    }
});
