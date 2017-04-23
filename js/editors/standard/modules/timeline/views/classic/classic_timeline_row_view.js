var ClassicTimelineRowView = TimelineRowView.extend({

    tagName: 'li',
    className: 'timeline-main-list timelinerow-classic',
    template: _.template($('#timelinerow-template-classic').html()),

    events: {
        'update-sort': 'updateSort',
        'add-to-collection': 'addToCollection',
        'remove-from-collection': 'removeFromCollection',
        'click .timelinerow-label-classic' : 'selectRow',
        'mousedown .timelinerow-label-classic' : 'onMouseDown',
        'select-comp': 'selectComponent',
        'sort-rows': 'sortRows',
        'click .timelinerow-showhide': 'hideShowAllComponents',
        'click .timelinerow-block': 'blockLine',
        'click .timeline-row-edit-name': 'activeEditingRowName',
        'click .timeline-collapse-classic': 'collapseUncollapseRowItems'
    },

    activeEditingRowName: function(e) {

        var _that = this;

        e.stopPropagation();

        var options = this.model.get('options');
        var rowName = this.getRowName();

        var rowInput = $('<input name="pagename" class="timeline-row-edit-name-input-classic"  type="text">');
        
        $(e.target).html('').append(rowInput);

        rowInput.focus();
        rowInput.val(rowName);

        rowInput.on('focusout', function(e2){

            var value = $(e2.target).val();
            $(e2.target).parent().html(value);
            $(e2.target).remove();

            options.set('rowName', value);

            _that.updateTimelineOptions(options);
        });

        rowInput.on('keyup', function(e2){
            if(e2.which  == 13){
                $(this).trigger('focusout');
            }
        });
    },

    initialize: function(data) {
        var _that = this;

        this.$el.off('forceCollapseRowItems');
        this.$el.on('forceCollapseRowItems', function(){
            _that.forceCollapseRowItems();
        });
        this.$el.off('forceUncollapseRowItems');
        this.$el.on('forceUncollapseRowItems', function(){
            _that.forceUncollapseRowItems();
        });

        this.model.view = this;

        this.showtime = data.showtime;

        this.addEventsToModel();
    },

    onResize:function(e){

        this.model.get('objects').each(function(componentModel){
            componentModel.miniatureView.onResize();
        }, this);
    },

    collapsed: false,

    collapseUncollapseRowItems: function(e) {
        var _that = this;

        e.stopPropagation();

        this.$el.find('.timelinerow-items-holder-classic').animate({
            height: "toggle"
        }, 300);

        this.collapsed = !this.collapsed;
        this.renderCollapseIcon();
    },

    forceCollapseRowItems: function() {
        var _that = this;

        // if (!this.collapsed) {
            this.$el.find('.timelinerow-items-holder-classic').animate({
                height: "toggle"
            }, 300);   
        // }

        this.collapsed = true;
        this.renderCollapseIcon();
    },

    forceUncollapseRowItems: function() {
        var _that = this;

        // if (this.collapsed) {
            this.$el.find('.timelinerow-items-holder-classic').animate({
                height: "toggle"
            }, 300);
        // }

        this.collapsed = false;
        this.renderCollapseIcon();
    },

    renderCollapseIcon: function() {
        var collapseIcon = this.$el.find('.timeline-collapse-classic');
        var rotation = this.collapsed ? '0deg' : '135deg';
        collapseIcon.css({
            transform: 'rotate('+rotation+')'
        });
    },


    render: function() {
        var _that = this;

        var renderData = this.model.toJSON();
        renderData.showtime = this.showtime;
        renderData.last = false;
        renderData.rowName = this.getRowName();

        if(this.model.cid == this.model.collection.last().cid){
            renderData.last = true;

            this.$el.addClass('timeline-empty-row');
        }

        var timelineRowTemplate = this.template(renderData);
        this.$el.html(timelineRowTemplate);

        this.model.get('objects').each(this.addItem, this);

//        var objects =  this.model.get('objects');
//
//        for (var i = objects.length - 1; i >= 0; i--) {
//            var componentModel = objects.at(i);
//
//            this.addItem(componentModel, i);
//        };

        if(!this.model.get('options').get('locked')) {


        this.$el.find('.timelinerow-items-holder-classic').sortable({
                items: 'li',
                placeholder: "timeline-placeholder-classic",
                connectWith: ".timelinerow-items-holder-classic",
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

                    // ui.item.trigger('add-to', ui.item.index());

                    // selectedComponentsCollection.each(function(model){
                    //     model.setActive(false);
                    //     model.setActive(true, selectedComponentsCollection);
                    // });

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
                        var originalLi = $(this).closest('li.timeline-item');
                        var clonedLi = $(this).closest('li.timeline-item').clone(true);

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

            this.renderCollapseIcon();

        }

        this.renderOptions();

        this.delegateEvents();

        // if (this.collapsed) {
        //     this.forceCollapseRowItems();
        // }

        return this;
    },


    addItem: function(rowItem) {
        var itemView = new ClassicTimelineRowItemView({ model: rowItem });
        itemView.on('scroll-to-active-component', this.scrollToActiveComponent, this);
        this.$el.find('.timelinerow-items-holder-classic').append(itemView.render().el);
    },


    renderActive :function( active ){

        this.$el.attr('active', active);
        this.$el.find('.timelinerow-label-classic').attr('active', active);
    }

});