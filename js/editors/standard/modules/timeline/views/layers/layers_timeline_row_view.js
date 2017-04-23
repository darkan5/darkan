var LayersTimelineRowView = TimelineRowView.extend({

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

        var _that = this;

        e.stopPropagation();

        var options = this.model.get('options');
        var rowName = this.getRowName();

        var rowInput = $('<input name="pagename" class="timeline-row-edit-name-input-layers"  type="text">');
        
        var timelinerowLabel = this.$el.find('.timelinerow-label');

        


        timelinerowLabel.html('').append(rowInput);

        rowInput.focus();
        rowInput.val(rowName);

        rowInput.on('focusout', function(e2){

            var value = $(e2.target).val();

            var rowEditName = $('<div class="edit-name timeline-row-edit-name"></div>\
                                    <div class="timeline-row-edit-name-layers">'+ value +'</div>\
                                </div>');


            timelinerowLabel.html(rowEditName);
            $(e2.target).remove();

            options.set('rowName', value);

            _that.updateTimelineOptions(options);

            _that.delegateEvents();
        });

        rowInput.on('keyup', function(e2){
            if(e2.which  == 13){
                $(this).trigger('focusout');
            }
        });

        rowInput.on('click mousedown mouseup', function(e2){
            e2.stopPropagation(); 
            e2.stopImmediatePropagation(); 
        });


    },



	initialize: function(data) {
        var _that = this;

        this.model.view = this;

        this.showtime = data.showtime;

        this.addEventsToModel();

        //this.render();
  	},


    renderOptions : function( options ){

        this.$el.find('.timelinerow-showhide').attr('hide', this.model.get('options').get('hidden'));
        this.$el.find('.timelinerow-block').attr('block', this.model.get('options').get('locked'));
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
        renderData.rowName = this.getRowName();

        if(this.model.cid == this.model.collection.last().cid){
            renderData.last = true;

            this.$el.addClass('timeline-empty-row');
        }

        //var lineName = this.$el.find('.timelinerow-label').html();

	    var timelineRowTemplate = this.template(renderData);
	    this.$el.html(timelineRowTemplate);

        //this.$el.find('.timelinerow-label').html(lineName);

	    this.model.get('objects').each(this.addItem, this);

//        var objects =  this.model.get('objects');
//
//        for (var i = objects.length - 1; i >= 0; i--) {
//            var componentModel = objects.at(i);
//
//            this.addItem(componentModel, i);
//        };

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

                    // var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

                    // if(selectedComponentsCollection.length > 1){

                    //     selectedComponentsCollection.each(function(model){
                    //         StageView.instance.timeline.removeComponentModelFromCollection(model);
                    //     });

                    // }else{
                    //     ui.item.trigger('remove-from', [ui.item.index(), _that.model]);
                    // }

                },

                receive: function(event, ui) {

                    // dodaj komponent do kolekcji tej linii

                   // var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

                   // if(selectedComponentsCollection.length > 1){

                   // }

                   //  ui.item.trigger('add-to', ui.item.index());

                   //  selectedComponentsCollection.each(function(model){
                   //      model.setActive(false);
                   //      model.setActive(true, selectedComponentsCollection);
                   //  });

                //ui.item.trigger('add-to', ui.item.index());

                },

                stop: function(event, ui) {

                    var position = ui.item.index();

                    // var collection = _that.model.get('objects');

                    // var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

                    ui.item.trigger('drop-item', ui.item.index());

                    // selectedComponentsCollection.each(function(model){
                    //     model.setActive(false);
                    //     model.setActive(true, selectedComponentsCollection);
                    // });
                },

                start: function(e, ui) {
                    $(ui).find('.timelineItem').addClass('startedDragging');
                },

                helper: function(e, item) {

                    item.addClass('mainDragObject');

                    //Clone the selected items into an array
                    var elements = [ ];
                    var elementsToDelete = [ ];

                    var iterator = 0;
                    $('.botmenu-timeline-rows-wrapper .timelineItem[active="true"]').each(function() {
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
                }
            });
        }

        

        this.renderOptions();

        this.delegateEvents();


		return this;
	},

	addItem: function(rowItem) {

		var itemView = new LayersTimelineRowItemView({ model: rowItem });
        itemView.on('scroll-to-active-component', this.scrollToActiveComponent, this);
		this.$el.find('.timelinerow-items-holder').append(itemView.render().el);
	},

    sortableDestroy: function() {

        if(this.$el.find('.timelinerow-items-holder').is('.ui-sortable')){
            this.$el.find('.timelinerow-items-holder').sortable("destroy");
        }
    }
});