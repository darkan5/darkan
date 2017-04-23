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
        'click .timelinerow-block': 'blockLine'
	},

    scroll: function(e) {
         this.hideShowAllComponents();
    },

    showContextMenu: function(e) {

        var contextMenuView = new TimelineRowContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);

        this.selectRow();
    },

    blockLine: function(){

        var _that = this;

        var components = this.model.get('objects');
        var options = this.model.get('options');

        var isLocked = options.get('locked');
        options.set('locked', !isLocked);

        components.each(function(cModel) {
            cModel.set('locked', !isLocked);
            cModel.trigger('locked-render');

            if(!isLocked){
                _that.trigger('unselect-model', cModel);
            }
        });

        this.render();

        this.updateTimelineOptions( options );

    },

    hideShowAllComponents: function() {
        var components = this.model.get('objects');
        var options = this.model.get('options');

        var isHidden = options.get('hidden');
        options.set('hidden', !isHidden);

        components.each(function(cModel) {
            cModel.set('hidden', !isHidden);
            cModel.trigger('force-render');
            cModel.view.unselectComponent();
        });

        StageView.instance.unsetActiveComponents();

        this.render();

        this.updateTimelineOptions( options );
    },

    updateTimelineOptions: function(  timelineOptions ){

        DataAccess.updateTimelineOptions(
            {page: StageView.instance.model, timelineOptions:timelineOptions },
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

    },

    removeFromCollection:function(event, model, index, rowModel){

        //rowModel.get('objects').remove( model );

        this.rowFromRemove = rowModel;
    },

    addToCollection : function(event, model, position, canRender){


        canRender = canRender == undefined ? true : canRender;

        var collection = this.model.get('objects');

        collection.add(model, {at: position});

        if(canRender){
             this.render();
        }


        var line = this.model.get('options').get('id');
        //var lineFromRemove = this.rowFromRemove.get('options').get('id');
        //var lineFromRemove = this.rowFromRemove.get('options').get('id');

        this.trigger('update-sort-in-two-line',  model, position, line );

    },

	updateSort: function(event, model, position, canRender) {

        canRender = canRender == undefined ? true : canRender;

		var collection = this.model.get('objects');

		collection.remove(model);
        collection.add(model, {at: position});

        if(canRender){
            this.render();
        }

        var line = this.model.get('options').get('id');

      	this.trigger('update-sort-in-one-line',  model, position, line );
	},

    updateSortComing: function( model, position ) {

        var collection = this.model.get('objects');

        collection.remove( model );
        collection.add(model, {at: position});

        this.render();
    },

	initialize: function(data) {
        var _that = this;

        this.model.view = this;

        this.showtime = data.showtime;

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

        this.model.off("selected-by-trigger");
        this.model.on("selected-by-trigger", function(value) {
            _that.renderSelectByTrigger(value);
        });

        this.model.off("update-options-coming");
        this.model.on("update-options-coming", function(options) {
            _that.renderOptions(options);
        });

        //this.render();
  	},



    renderOptions : function( options ){

        this.$el.find('.timelinerow-showhide').attr('hide', this.model.get('options').get('hidden'));
        this.$el.find('.timelinerow-block').attr('block', this.model.get('options').get('locked'));
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

        this.$el.attr('active', active);
        this.$el.find('.timelinerow-label').attr('active', active);
    },

	render: function(){
        var _that = this;

        var renderData = this.model.toJSON();
        renderData.showtime = this.showtime;
        renderData.last = this.false;

        if(this.model.cid == this.model.collection.last().cid){
            renderData.last = true;

            this.$el.addClass('timeline-empty-row');
        }

	    var timelineRowTemplate = this.template(renderData);
	    this.$el.html(timelineRowTemplate);

	    this.model.get('objects').each(this.addItem, this);

        if(!this.model.get('options').get('locked')) {
            // Sortable for elements in lines
            this.$el.find('.timelinerow-items-holder').sortable({
                items: 'li',
                placeholder: "timeline-placeholder",
                connectWith: ".timelinerow-items-holder",
                delay: 150,
                tolerance: 'pointer',

                remove: function(event, ui) {
                    // usun komponent z kolekcji tej linii

                    var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

                    if(selectedComponentsCollection.length > 1){

                        selectedComponentsCollection.each(function(model){
                            StageView.instance.timeline.deleteComponentModel(model);
                        });

                    }else{
                        ui.item.trigger('remove-from', [ui.item.index(), _that.model]);
                    }

                },

                receive: function(event, ui) {


                    // dodaj komponent do kolekcji tej linii

                   var position = ui.item.index();

                   var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

                   if(selectedComponentsCollection.length > 1){

                       selectedComponentsCollection.each(function(model){
                           StageView.instance.timeline.deleteComponentModel(model);
                       });


                       selectedComponentsCollection.each(function(model, i){
                           _that.addToCollection('', model, position, false);
                       });

                       StageView.instance.render();



                       //ui.item.trigger('add-to-multi', [ui.item.index(), selectedComponentsCollection]);


                   }else{
                       ui.item.trigger('add-to', ui.item.index());
                   }

                    selectedComponentsCollection.each(function(model){
                        model.setActive(false);
                        model.setActive(true, selectedComponentsCollection);
                    });

                //ui.item.trigger('add-to', ui.item.index());

                },

                // stop: function(e, ui) {
                //     ui.item.trigger('drop', ui.item.index());
                // },

                start: function(e, ui) {
                    $(ui).find('.timelineItem').addClass('startedDragging');
                },


//                helper: function(e, item) {
//
//                    item.addClass('mainDragObject');
//
//                    //Clone the selected items into an array
//                    var elements = [ ];
//                    var elementsToDelete = [ ];
//
//                    var iterator = 0;
//                    $('#botmenu-timeline .timelineItem[active="true"]').each(function() {
//                        var originalLi = $(this).parent();
//                        var clonedLi = $(this).parent().clone(true);
//
//                        if (!originalLi.hasClass('mainDragObject')) {
//                            elementsToDelete.push(originalLi);
//                            // clonedLi.css({
//                            //     left: '0px',
//                            //     top: '0px'
//                            // })
//                        }
//
//                        clonedLi.css({
//                                left: (iterator * 10) + 'px',
//                                top: -(iterator * 10) + 'px',
//                                'z-index': 500 - iterator
//                            });
//                        iterator++;
//
//                        elements.push(clonedLi);
//                    });
//
//                    // item.data('multidrag', elements);
//
//                    //Create the helper
//                    var helper = $('<ul/>', {
//                        class: 'timeline-sortable-helper'
//                    });

//                    helper.css({
//                        position: 'absolute',
//                        top: item.offset().top + "px",
//                        left: item.offset().left + "px"
//                    })
//                    helper.append(elements);
//
//                    setTimeout(function() {
//                        _.each(elementsToDelete, function(element) {
//                            element.remove();
//                        });
//                    }, 2);
//

//                    return helper;
//                },

                helper: function(e, item) {


                    item.addClass('mainDragObject');

                    //Clone the selected items into an array
                    var elements = [ ];
                    var elementsToDelete = [ ];

                    var iterator = 0;
                    $('#botmenu-timeline .timelineItem[active="true"]').each(function() {
                        var originalLi = $(this).parent();
                        var clonedLi = $(this).parent().clone(true);

                        if (!originalLi.hasClass('mainDragObject')) {
                            elementsToDelete.push(originalLi);
                            // clonedLi.css({
                            //     left: '0px',
                            //     top: '0px'
                            // })
                        }

                        clonedLi.css({
                                left: (iterator * 10) + 'px',
                                top: -(iterator * 10) + 'px',
                                'z-index': 500 - iterator
                            });
                        iterator++;

                        elements.push(clonedLi);
                    });

                    // item.data('multidrag', elements);

                    //Create the helper
                    var helper = $('<ul/>', {
                        class: 'timeline-sortable-helper'
                    });

                    helper.css({
                        position: 'absolute',
                        top: item.offset().top + "px",
                        left: item.offset().left + "px"
                    })
                    helper.append(elements);

                    setTimeout(function() {
                        _.each(elementsToDelete, function(element) {
                            element.hide();
                        });
                    }, 2);

                    return helper;
                },

                
                stop: function(event, ui) {

                    var position = ui.item.index();

                    var collection = _that.model.get('objects');

                    var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

                    //var componentsCollection = StageView.instance.timeline.sortCollectionByRow(selectedComponentsCollection);

                    if(selectedComponentsCollection.length > 1){


                        selectedComponentsCollection.each(function(model, i){

                            var rowModel = StageView.instance.timeline.getRowModelByComponentModel(model);

                            if(rowModel.cid == _that.model.cid){

                                _that.updateSort('', model, position, false);
                            }

                            _that.render();

                        });
//
//                        selectedComponentsCollection.each(function(model, i){
//
//                           _that.updateSort('', model, position + i, false);
//                        });
//
//
//                        _that.render();

                        //var line = this.model.get('options').get('id');

                        //this.trigger('update-sort-in-one-line',  model, position, line );

                    }else{
                       ui.item.trigger('drop', ui.item.index());
                    }

                    selectedComponentsCollection.each(function(model){
                        model.setActive(false);
                        model.setActive(true, selectedComponentsCollection);
                    });
                }
            });
        }

        this.renderOptions();

        User.getModel().get('activeComponent').setActive( true );

        this.delegateEvents();


		return this;
	},

	addItem: function(rowItem) {

		var itemView = new TimelineRowItemView({ model: rowItem });
		this.$el.find('.timelinerow-items-holder').append(itemView.render().el);
	},

    sortableDestroy: function() {

        if(this.$el.find('.timelinerow-items-holder').is('.ui-sortable')){
            this.$el.find('.timelinerow-items-holder').sortable("destroy");
        }
    }
});