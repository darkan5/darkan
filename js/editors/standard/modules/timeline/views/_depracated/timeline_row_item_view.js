var TimelineRowItemView = ComponentMiniatureView.extend({

	tagName: "li",
	className: 'component-miniature timeline-item',

    multiSelectedComponentsModels: null,

    events: function(){
        return _.extend({},ComponentMiniatureView.prototype.events,{
            'drop': 'drop',
            'remove-from' : 'removeFromCollection',
            'add-to': 'addToCollection',
            'add-to-multi': 'addToCollectionMulti',
            'add-new-row': 'addNewRow'
        });
    },

    initialize :function(){
        //this.listenTo(this.model, 'change:active', this.renderActive );

        var _that = this;

        this.$el.off('data-picker-picked-object');
        this.$el.on('data-picker-picked-object', function(){
            _that.dataPickerPicked();
        });

        //this.model.off("update-coming");
        this.model.on("update-coming", function( options ) {

            _that.render( );
        });

        this.listenTo(this.model, 'change:point-sound', this.renderPointSound );
        this.listenTo(this.model, 'change:triggers', this.renderTriggers );
        this.listenTo(this.model, 'change:locked', this.renderLocked );
        this.listenTo(this.model, 'change:wcag', this.renderWcag );


        _that.addEventsToModel();
    },

    renderLocked: function(){
        this.$el.attr('locked', this.model.get('locked'));
    },

    renderTriggers: function(){

        var triggers = this.model.get('triggers').length > 0 ? true : false;
        this.$el.attr('triggers', triggers);
    },

    renderPointSound: function(){

        var sound = this.model.get('point-sound') == '' ? false : true;
        this.$el.attr('sound', sound);
    },

    renderWcag: function(){

        var wcag = this.model.get('wcag') ? true : false;
        this.$el.attr('wcag', wcag);
    },

    dataPickerPicked : function(){

        this.$el.trigger('data-picker-picked-object1', this.model, this);
    },

    addEventsToModel: function(){

        var _that = this;

        this.model.on("set-active", function( active, multiSelectedModels ) {
            _that.multiSelectedComponentsModels = multiSelectedModels;
            _that.renderActive( active );
        });
    },

    renderActive :function( active ){

      this.$el.find('.timelineItem').attr('active', active );

    },

    mouseDown: function(e) {

        if(e.shiftKey){
            this.$el.trigger('select-comp', [this.model, e]);
            //this.unstickit();
        }else{
            if (this.multiSelectedComponentsModels == null) {
                this.$el.trigger('select-comp', [this.model, e]);
                //this.unstickit();
            }
        }
    },

    scroll: function(e) {
        this.showhideComponent();
    },

    showContextMenu: function(e) {

        var contextMenuView = new ComponentContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    showhideComponent: function() {
        var hidden = this.model.get('hidden');
        this.model.set('hidden', !hidden);
        this.render();

        this.model.forceRender();
    },

    

    addToCollectionMulti:function(event, index, componentsCollection){
        this.model.selectedByMiniature(false);
        this.$el.trigger('add-to-collection-multi', [componentsCollection, index]);
    },


    addToCollection:function(event, index){
        this.model.selectedByMiniature(false);
        this.$el.trigger('add-to-collection', [this.model, index]);
    },

    removeFromCollection:function(event, index, rowModel){

        //console.log("ROW MODEL W KOMPONENCIE: ", rowModel);
        this.model.selectedByMiniature(false);
        rowModel.get('objects').remove( this.model );

        this.$el.trigger('remove-from-collection', [this.model, index, rowModel]);
    },

	drop: function(event, index) {

        this.model.selectedByMiniature(false);
        this.$el.trigger('update-sort', [this.model, index]);

        //console.log("drop");
    },
    addNewRow :function(event, index){

        //console.log('** ADDING NEW ROW **');
        this.model.selectedByMiniature(false);
        this.$el.trigger('create-new-row', [this.model, index]);
    },

    render: function(){

        var _that = this;

        var timelineItemTemplate = this.template(this.model.toJSON());
        this.$el.html(timelineItemTemplate);

        if (this.model.get('hidden')) {
            this.$el.css({opacity: '.6'});
        } else {
            this.$el.css({opacity: '1'});
        }

        this.delegateEvents();

        this.renderPointSound( );
        this.renderWcag( );
        this.renderTriggers( );
        this.renderLocked( );
        this.renderActive( this.model.active );

        return this;
    }
});