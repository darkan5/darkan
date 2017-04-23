var TimelineRowView = ItemView.extend({

	tagName: 'li',
	className: 'timeline-main-list timelinerow',
	template: _.template($('#timelinerow-template').html()),

    rowFromRemove: null,

	events: {
		'update-sort': 'updateSort',
        'add-to-collection': 'addToCollection',
        'remove-from-collection': 'removeFromCollection',
        'click .timelinerow-label' : 'selectRow',
        'mousedown .timelinerow-label' : 'onMouseDown',
        'select-comp': 'selectComponent',
        'sort-rows': 'sortRows',
        'click .timelinerow-showhide': 'hideShowAllComponents',
        'click .timelinerow-block': 'blockLine',
        'click .timelinerow-block': 'blockLine',
        'click .timeline-row-edit-name': 'activeEditingRowName'
	},

    activeEditingRowName: function(e) {

    },

    onResize:function(e){
    },

    addEventsToModel : function( options ){

        var _that = this;

        this.model.off('update-sort-coming');
        this.model.on('update-sort-coming', function(model, position){

            _that.updateSortComing( model, position );
        });

        this.model.off('remove-coming');
        this.model.on('remove-coming', function(model, position){

            //_that.render();
        });

        this.model.off('set-active');
        this.model.on("set-active", function( active ) {

            _that.renderActive( active );
        });

        this.$el.off('data-picker-picked-line');
        this.$el.on('data-picker-picked-line', function(){
            _that.dataPickerPicked();
        });

        this.model.off('selected-by-miniature');
        this.model.on('selected-by-miniature', function(value){
            _that.renderSelectByMinaiture(value);
        });

        this.model.off('selected-by-picker-miniature-1');
        this.model.on('selected-by-picker-miniature-1', function(value){
            _that.renderSelectByMinaiture(value);
        });

        this.model.off("selected-by-trigger");
        this.model.on("selected-by-trigger", function(value) {
            _that.renderSelectByTrigger(value);
        });

        this.model.off("update-options-coming");
        this.model.on("update-options-coming", function(options) {
            _that.renderOptions(options);
        });

        this.model.get('objects').off("add");
        this.model.get('objects').off("remove");
        this.model.get('objects').on("add remove", function() {

            // var last = _that.model.collection.last();

            // if(last && _that.model.cid == last.cid){
            //     setTimeout(function(){
            //         _that.trigger('render-timeline');
            //     }, 5);
            // }else{
            //     _that.render();
            //     _that.afterRender();
            // }

            setTimeout(function(){
                _that.trigger('render-timeline');

                // _that.render();
                // _that.afterRender();
            }, 5);

        });
    },

    scroll: function(e) {
        this.hideShowAllComponents();
    },

    showContextMenu: function(e) {

        var isEmpty = $(e.target).parent().hasClass('timeline-empty-row');

        if(isEmpty){
            var contextMenuView = new TimelineEmptyRowContextMenuView({ model: this.getModel(), view: this});
            ContextMenuContainer.addMenu(contextMenuView, e);
        } else{
            var contextMenuView = new TimelineRowContextMenuView({ model: this.getModel(), view: this});
            ContextMenuContainer.addMenu(contextMenuView, e);
        }



        this.selectRow();
    },

    blockLine: function(e){

        e.stopPropagation();

        var _that = this;

        var components = this.model.get('objects');
        var options = this.model.get('options');

        var isLocked = options.get('locked');
        options.set('locked', !isLocked);

        components.each(function(cModel) {
            cModel.set('locked', !isLocked, { silent:true });
            cModel.trigger('locked-render');

            if(!isLocked){
                _that.trigger('unselect-model', cModel);
            }
        });

        this.render();
        this.afterRender();

        this.updateTimelineOptions( options );
        this.updateComponents( components );

    },

    hideShowAllComponents: function(e) {

        e.stopPropagation();

        var components = this.model.get('objects');
        var options = this.model.get('options');

        var isHidden = options.get('hidden');
        options.set('hidden', !isHidden);

        components.each(function(cModel) {
            cModel.set('hidden', !isHidden, { silent:true });

            cModel.view.unselectComponent();
            cModel.view.render();
            cModel.view.afterRender();
        });


        StageView.instance.unsetActiveComponents();


        this.render();
        this.afterRender();

        this.updateTimelineOptions( options );
        this.updateComponents( components );
    },

    updateComponents: function(  components ){

        DataAccess.updateComponents(
            { components: components, action:"update", pageId:StageView.instance.model.getPageId() },
            function(data) { _log('Update component result: ', data, _log.dataaccessOutResult)  },
            function(data) { _log('Update component fault: ', data, _log.dataaccessOutFault)  }
        );
    },

    updateTimelineOptions: function(  rowOptions ){

        DataAccess.updateTimelineOptions(
            { rowOptions:rowOptions, pageId:StageView.instance.model.getPageId()  },
            function(data) { _log('Update timeline result: ', data, _log.dataaccessOutResult)  },
            function(data) { _log('Update timeline fault: ', data, _log.dataaccessOutFault)  }
        );
    },

    sortRows: function(event, position){

        this.$el.trigger('sort-rows-back', [this.model, position]);
    },

    selectComponent : function(event, componentModel, e){

        this.trigger('select-component', componentModel, e);

    },

    selectRow : function(){

        this.trigger('select-row', this.model);

        this.$el.find('.timelinerow-label-classic').attr('active', true);
        this.$el.find('.timelinerow-label').attr('active', true);

    },



    removeFromCollection:function(event, model, index, rowModel){

        //rowModel.get('objects').remove( model );

        this.rowFromRemove = rowModel;
    },

    addToCollection : function(event, model, position, canRender){

        // var rowId = this.model.get('options').get('id');

        // this.moveComponentsToLayer(rowId, position);


        // canRender = canRender == undefined ? true : canRender;



        // var componentsCollection = StageView.instance.selectedComponentsCollection;

        // var collection = this.model.get('objects');

        // componentsCollection.each(function(cModel){
        //     collection.remove(cModel);
        //     collection.add(cModel, {at: position});
        // });

        // //collection.add(model, {at: position});

        // this.render();
        // this.afterRender();

        // var line = this.model.get('options').get('id');
        // //var lineFromRemove = this.rowFromRemove.get('options').get('id');
        // //var lineFromRemove = this.rowFromRemove.get('options').get('id');

        // this.trigger('update-sort-in-two-line',  componentsCollection, position, line );

    },

    addToCollectionNewLine : function(event, model, position, canRender){

        // var rowId = this.model.get('options').get('id');

        // this.moveComponentsToLayer(rowId, position);


        // canRender = canRender == undefined ? true : canRender;



        // var componentsCollection = StageView.instance.selectedComponentsCollection;

        // var collection = this.model.get('objects');

        // // componentsCollection.each(function(cModel){
        // //     collection.remove(cModel);
        // //     collection.add(cModel, {at: position});
        // // });

        // for (var j = StageView.instance.selectedComponentsCollection.length - 1; j >= 0; j--) {

        //     var cModel = StageView.instance.selectedComponentsCollection.at(j);

        //     collection.remove(cModel);
        //     collection.add(cModel, {at: position});
        // };

        // //collection.add(model, {at: position});

        // this.render();
        // this.afterRender();

        // var line = this.model.get('options').get('id');
        // //var lineFromRemove = this.rowFromRemove.get('options').get('id');
        // //var lineFromRemove = this.rowFromRemove.get('options').get('id');

        // this.trigger('update-sort-in-two-line',  componentsCollection, position, line );

    },

    updateSort: function(event, model, position, canRender) {

        var rowId = this.model.get('options').get('id');

        this.moveComponentsToLayer(rowId, position);

        // canRender = canRender == undefined ? true : canRender;

        // var componentsCollection = StageView.instance.selectedComponentsCollection;

        // var collection = this.model.get('objects');

        // componentsCollection.each(function(cModel){
        //     collection.remove(cModel);
        //     collection.add(cModel, {at: position});
        // });


        // this.render();
        // this.afterRender();

        // var line = this.model.get('options').get('id');

        // this.trigger('update-sort-in-one-line',  componentsCollection, position, line );
    },

    updateSortComing: function( model, position ) {

        var collection = this.model.get('objects');

        collection.remove( model );
        collection.add(model, {at: position});

        this.render();
        this.afterRender();
    },

	initialize: function(data) {
        //this.model.view = this;
  	},

    moveComponentsToLayer: function(rowId, position){

        this.trigger('move-components-to-layer', rowId, position);
    },

    renderOptions : function( options ){


    },

    renderSelectByMinaiture : function(value){
        this.$el.attr('selected-by-miniature', value);
    },

    renderSelectByTrigger : function(value){
        this.$el.attr('selected-by-trigger', value);
    },

    dataPickerPicked : function(){

        this.$el.trigger('data-picker-picked-line1', this.model);
    },

    renderActive :function( active ){


    },

	render: function(){

	},

	addItem: function(rowItem) {


	},

    sortableDestroy: function() {

    },

    afterRender :function(){

        this.model.get('objects').each(function(componentModel){
            componentModel.miniatureView.afterRender();
        }, this);
    },

    getRowName :function( ){

        var rowName = this.model.get('options').get('rowName') || _lang('TIMELINE_LINE_NAME_PREFIX') + ' ' + (this.model.collection.indexOf(this.model) + 1);

        return rowName;
    },

    scrollToActiveComponent: function(cModel) {
        this.trigger('scroll-to-active-component', cModel);  
    },
});