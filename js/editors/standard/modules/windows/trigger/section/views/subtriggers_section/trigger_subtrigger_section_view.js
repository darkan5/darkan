var TriggerSubtriggerSectionView = Backbone.View.extend({

    tagName: "div",
    className: 'trigger-subtrigger-section',

    template: _.template($('#trigger-subtrigger-section-template').html()),

    events:{
        'save-changes': 'update',
        'update-sort': 'updateSort',
        'change .trigger-action-select' : 'onTriggerActionChanged',
        'delete-one-trigger' : 'deleteTrigger',
        'click .trigger-add-new-trigger-button' : 'addNewTrigger'
    },

    initialize: function( data ) {
        this.collection = data.collection;
    },

    updateSort: function(event, model, position) {

        var collection = this.collection;

        collection.remove(model);
        collection.add(model, {at: position});

        this.render();

        this.update();
    },

    addNewTrigger: function(e){

        var triggerSubtriggerModel = new TriggerSubtriggerModel({
            //whendoit: '',
            whattodo: '',
            objs: [],
            opts:  new TriggerOptsModel({
                animationType: new TriggerAnimationTypeModel(),
                delay: 0
            })
        });

        this.collection.add(triggerSubtriggerModel);

        this.render();

        this.update();
    },

    deleteTrigger: function(event, model){

        this.collection.remove( model );

        this.render();

        this.update();
    },

    update: function(event, model){

        this.$el.trigger('update', model, this);
    },

    render: function(){

        var template = this.template();
        this.$el.html(template);

        if(this.collection != undefined && this.collection.length > 0){
            this.collection.each(this.addTriggerItem, this);
        }

        this.$el.find('.trigger-item-holder').sortable({
            delay: 50,
            update: function(event, ui) {
                ui.item.trigger('drop-item', ui.item.index());
            }
        });

        this.delegateEvents();

        return this;
    },

    setCollection: function(collection, componentModel){
        this.collection = collection;
        this.componentModel = componentModel;

        this.collection.off('change');
        this.collection.on('change', this.update, this);
    },

    addTriggerItem: function( subreiggerItem ) {

        var _that = this;

        var triggerSubtriggerItemView = new TriggerSubtriggerItemView({ model: subreiggerItem, componentModel:this.componentModel });
        this.$el.find('.trigger-item-holder').append(triggerSubtriggerItemView.render().el);
    },

    showItem: function( ) {

        this.$el.show();

        _log('onTriggerOnChanged', this.collection);

        if(this.collection.length == 0){
           this.addNewTrigger();
        }
    }



});
