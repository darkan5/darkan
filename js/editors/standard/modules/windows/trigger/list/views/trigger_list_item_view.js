var TriggerListItemView = ItemView.extend({

    tagName: "li",
    className: 'trigger-list-item',

    template: _.template($('#trigger-list-item-template').html()),

    events:{
        'drop-item': 'dropItem',
        'click': 'onMouseClick',
        'click .trigger-delete-trigger-button': 'deleteTrigger',
        'click .trigger-copy-button': 'copyTrigger',

        'mousedown': 'onMouseDown',
    },

    copyTrigger: function(e){
        e.stopPropagation();

        this.$el.trigger('copy-trigger', this.model);
    },

    deleteTrigger: function(e){

        e.stopPropagation();


        this.$el.trigger('delete-trigger', this.model);
    },

    initialize :function(){

        var _that = this;

        this.model.on('select-item', this.selectItem, this)

        _that.addEventsToModel();
    },

    addEventsToModel: function(){

        var _that = this;
    },

    onMouseClick :function(e){

        this.$el.trigger('select-list-item', this.model, this);
    },

    selectItem :function(value){

         this.$el.attr('selected-item', value);
    },

    dropItem: function(event, index) {

        this.$el.trigger('update-sort', [this.model, index]);
    },

    render: function(){

        var _that = this;

        var template = this.template(this.model.toJSON());
        this.$el.html(template);

        this.addTitleToButtons();

        this.delegateEvents();

        return this;
    },

    addTitleToButtons: function(){

        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'left',
            width: 300,
            height: 200
        });
    },

    mouseDown: function(e) {

    },

    scroll: function(e) {
        
    },

    showContextMenu: function(e) {

        var contextMenuView = new TriggerItemListContextMenuView({ model: this.getModel(), view: this });

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    getModel: function() {
        return this.model;
    },
});
