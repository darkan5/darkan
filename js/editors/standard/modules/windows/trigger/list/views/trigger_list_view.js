var TriggerListView = Backbone.View.extend({

    tagName: 'div',
    className: 'trigger-list',
    template: _.template($('#trigger-list-template').html()),

    selectedItemModel : null,

    events: {
        'update-sort': 'updateSort',
        'select-list-item': 'selectItem'
    },

    selectItem: function(event, model){

        this.collection.each( this.unselectItem, this );
        this.selectedItemModel = model;
        model.selectItem(true);
    },

    unselectItem: function(model){
        model.selectItem(false);
    },

    deleteTrigger: function(event, model){

        this.collection.remove( model );

        this.render();

        this.update();
    },

    resetList: function(){
       this.$el.removeAttr('style');
    },

    update:function(){
        this.$el.trigger('update');
    },

    saveTriggers:function(){


    },

    initialize: function( data ) {
        this.collection = data.collection;
    },

    addNewInteraction:function( triggerInteractionModel ){
        this.collection.add( triggerInteractionModel );

        this.selectedItemModel = triggerInteractionModel;
    },

    updateSort: function(event, model, position) {

        var collection = this.collection;

        collection.remove(model);
        collection.add(model, {at: position});

        this.update();
    },

    render: function(){

        var _that = this;

        var template = this.template( { collection: this.collection.toJSON() } );
        this.$el.html(template);

        this.collection.each(this.addListItem, this);


        this.$el.find('.trigger-list-holder').sortable({
            delay: 50,
            update: function(event, ui) {
                ui.item.trigger('drop-item', ui.item.index());
            }
        });

        if(this.selectedItemModel != undefined){
            this.selectedItemModel.selectItem(true);
        }

        this.delegateEvents();



        return this;
    },

    addListItem: function( listItem ) {

        var triggerListItemView = new TriggerListItemView({ model: listItem });
        triggerListItemView.on('render-list', this.render, this);
        this.$el.find('.trigger-list-holder').append(triggerListItemView.render().el);
        triggerListItemView.selectItem(false);
    }
});
