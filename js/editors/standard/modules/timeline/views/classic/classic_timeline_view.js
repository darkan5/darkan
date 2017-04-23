var ClassicTimelineView = TimelineView.extend({
	//el: $('#botmenu-timeline'),
	tagName: 'div',


    initialize: function() {

        var _that = this;

        // Sortable for all layers
        this.$el.sortable({
            items: "> .timeline-main-list:not(.timeline-empty-row)",
            placeholder: "timeline-highlight-container",
            delay: 150,
            handle: '.timelinerow-label-classic',

            start: function(event, ui) {
                ui.item.trigger('forceCollapseRowItems');
            },
            stop: function(event, ui) {
                ui.item.trigger('forceUncollapseRowItems');
                ui.item.trigger('sort-rows', ui.item.index());
            }
        });

    },

//    render: function() {
//        var _that = this;
//
//        var timelineTemplate = this.template();
//        this.$el.html(timelineTemplate);
//
//        this.collection.each(this.renderSingleRow, this);
//
//
//        this.$el.parent().perfectScrollbar({
//            useKeyboard: false
//        });
//
//        return this;
//    },


    renderSingleRow: function(rowModel) {
        var _that = this;

        var rowItemView = new ClassicTimelineRowView({ model: rowModel, showtime: this.lineShowtime });

        this.addListenersToRow( rowItemView );

        this.$el.append(rowItemView.render().el);
        
    }

//    getSelectedRow :function(){
//
//        activeRow =  this.collection.at( 0 );
//
//        return activeRow;
//    },
//
//    findNotLockedRow: function(activeRow){
//        var _that = this;
//
//        var notLockedRow =  this.collection.at( 0 );
//
//        return notLockedRow;
//    },

});