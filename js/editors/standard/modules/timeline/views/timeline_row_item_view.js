var TimelineRowItemView = ComponentMiniatureView.extend({

	tagName: "li",
	className: 'component-miniature timeline-item',

    multiSelectedComponentsModels: null,

    events: function(){
        return _.extend({},ComponentMiniatureView.prototype.events,{
            'drop-item': 'dropItem',
            'remove-from' : 'removeFromCollection',
            'add-to': 'addToCollection',
            'add-to-multi': 'addToCollectionMulti',
            'add-new-row': 'addNewRow',
            'data-picker-selected-by-miniature': 'dataPickerSelectedByMiniature',
            'data-picker-unselected-by-miniature': 'dataPickerUnSelectedByMiniature',
        });
    },

    initialize :function(){
        this.addEventsToModel();
    },

    onResize:function(e){
        // to override
    },

    addEventsToModel: function(){

        var _that = this;

        

        var _that = this;

        this.$el.off('data-picker-picked-object');
        this.$el.on('data-picker-picked-object', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-timer');
        this.$el.on('data-picker-picked-timer', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-exercise');
        this.$el.on('data-picker-picked-exercise', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-video');
        this.$el.on('data-picker-picked-video', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-text');
        this.$el.on('data-picker-picked-text', function(){
            _that.dataPickerPicked();
        });

        //this.model.off("update-coming");
        // this.model.on("update-coming", function( options ) {

        //     _that.render( );
        //     _that.afterRender( );
        // });

        //this.model.on("selected-by-miniature", this.renderSelectByMinaiture, this);

        

        //this.model.off("selected-by-trigger");
        this.model.on("selected-by-trigger", this.renderSelectByTrigger, this);

        this.listenTo(this.model, 'change:point-sound', this.renderPointSound );
        this.listenTo(this.model, 'change:triggers', this.renderTriggers );

        //this.listenTo(this.model, 'change:locked', this.renderLocked );

        this.listenTo(this.model, 'change:locked', this.renderLocked );
        this.listenTo(this.model, 'change:wcag', this.renderWcag );
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

    renderActive :function( active ){

        this.$el.find('.timelineItem').attr('active', active );

    },

    mouseDown: function(e) {

        if(e.shiftKey){
            this.$el.trigger('select-comp', [this.model, e]);
            //this.unstickit();
        }else{

            if(!StageView.instance.selectedComponentsCollection.contains(this.model)){
                this.$el.trigger('select-comp', [this.model, e]);
            }

        }
    },

    scroll: function(e) {

        this.$el.trigger('select-comp', [this.model, e]);

        this.showhideComponent();
    },

    showContextMenu: function(e) {

//        var contextMenuView = new ComponentContextMenuView({ model: this.getModel(), view: this});
//
//        ContextMenuContainer.addMenu(contextMenuView, e);

        if(StageView.instance.selectedComponentsCollection.length > 1){
            var contextMenuView = new MultiComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }else{
            var contextMenuView = new ComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }
    },

    showhideComponent: function() {
        var hidden = this.model.get('hidden');
        this.model.set('hidden', !hidden);
        this.render();
        this.afterRender();


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

        console.log("removeFromCollection", this.model);
    },

    dropItem: function(event, index) {

        this.model.selectedByMiniature(false);
        this.$el.trigger('update-sort', [this.model, index]);

        console.log("drop");
    },
    addNewRow :function(event, index){

        //console.log('** ADDING NEW ROW **');
        this.model.selectedByMiniature(false);
        this.$el.trigger('create-new-row', [this.model, index]);
    },

    onSetActive: function(active){

        var _that = this;

        _that.multiSelectedComponentsModels = StageView.instance.selectedComponentsCollection;
        _that.renderActive( active );

    },

    render: function(){

        var _that = this;

        this.model.off("set-active", this.onSetActive, this);
        this.model.on("set-active", this.onSetActive, this);

        this.model.off("selected-by-picker-miniature-2");
        this.model.on("selected-by-picker-miniature-2", this.renderSelectByPickerMinaiture, this);

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
        this.renderClassType();

        this.makeResizable();
        this.makeDraggable();

        return this;
    },

    makeDraggable: function() {
         // To override
    },


    makeResizable: function() {
        // To override
    },

    renderHandles: function() {
        // To override
    },

    afterRender : function(){
        // To override
    },

    renderSelectByMinaiture : function(value){
        this.$el.attr('selected-by-miniature', value);

        _log('renderSelectByMinaiture miniature', value, _log.error);

         
    },

    renderSelectByTrigger : function(value){

        this.$el.attr('selected-by-trigger', value);
    },

    dataPickerSelectedByMiniature: function(){

        this.model.selectedByPickerMiniature(true);
    },

    dataPickerUnSelectedByMiniature: function(){

        this.model.selectedByPickerMiniature(false);
    },

    renderClassType: function(){

        var type = this.model.get('type');

        this.$el.addClass( type + '-component-miniature');

        if(this.model.isExercise()){
            this.$el.addClass('quiz-component-miniature');
        }

    },

    renderSelectByPickerMinaiture : function(value){

        _log('renderSelectByPickerMinaiture', value);

        //this.$el.attr('selected-by-picker-miniature', value);
        this.$el.attr('selected-by-miniature', value);

        this.scrollToActiveComponent(value);
    },

    scrollToActiveComponent: function(value) {

        var dataPickerSelector =  $('body').find('.data-picker-selector');

        if(dataPickerSelector.length > 0){
            return;
        }

        if(value){
            this.trigger('scroll-to-active-component', this.model);
        }
    },

});