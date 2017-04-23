var TriggerElseActionSectionView = TriggerSubtriggerSectionView.extend({

    tagName: "div",
    className: 'trigger-elseaction-section',

    template: _.template($('#trigger-elseaction-section-template').html()),

    addNewTrigger: function(e){
        var triggerSubtriggerModel = new TriggerSubtriggerModel({
            whendoit: '',
            whattodo: '',
            objs: [],
            opts:  new TriggerOptsModel({
                animationType: new TriggerAnimationTypeModel(),
                delay: 0,
                transition: {}
            })
        });

        this.collection.add(triggerSubtriggerModel);

        this.render();

        this.update();
    },

    addTriggerItem: function( subreiggerItem ) {

        var triggerElseActionItemView = new TriggerElseActionItemView({ model: subreiggerItem, componentModel:this.componentModel });
        this.$el.find('.trigger-item-holder').append(triggerElseActionItemView.render().el);
    }



});
