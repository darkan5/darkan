var TriggerConditionSectionView = TriggerSubtriggerSectionView.extend({

    tagName: "div",
    className: 'trigger-condition-section',

    template: _.template($('#trigger-condition-section-template').html()),

    events: function(){
        return _.extend({},TriggerSubtriggerSectionView.prototype.events,{
            'click .trigger-create-new-variable': 'openCreateNewVariableWindow'
        });
    },

    openCreateNewVariableWindow: function(){

        _that = this;

        var createNewVariableWindow = WindowFactory.createCreateNewVariableWindow();
        createNewVariableWindow.on('on-close', function(){
            _that.$el.trigger('render-stage', _that, _that);
        });

        $('body').append(createNewVariableWindow.render().$el);
    },

    addNewTrigger: function(e){
        var triggerIfOptionModel = new TriggerIfOptionModel();

        this.collection.add(triggerIfOptionModel);

        this.render();

        this.update();

        this.$el.trigger('show-elseaction-section', {}, this);
    },

    addTriggerItem: function( subreiggerItem, i ) {

        var triggerConditionItemView = new TriggerConditionItemView({ model: subreiggerItem, componentModel:this.componentModel });
        this.$el.find('.trigger-item-holder').append(triggerConditionItemView.render().el);


        if(this.collection.length == 1){
            triggerConditionItemView.$el.find('.condition-andor-action').css('display', 'none');
        }else{
            if(i == this.collection.length - 1){
                triggerConditionItemView.$el.find('.condition-andor-action').css('display', 'none');
            }
        }
    }



});
