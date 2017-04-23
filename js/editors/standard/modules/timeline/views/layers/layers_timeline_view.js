var LayersTimelineView = TimelineView.extend({
	//el: $('#botmenu-timeline'),
	tagName: 'div',

    dataPickerPickedObject: function(event, cModel) {

        this.trigger('data-picker-picked', cModel);
    },

    dataPickerPickedLine: function(event, rowModel) {

        this.trigger('data-picker-picked', rowModel);
    },

	initialize: function() {


        // Sortable for all lines
        this.$el.sortable({
            items: "> .timeline-main-list:not(.timeline-empty-row)",
            placeholder: "timeline-highlight-container",
            delay: 150,
            handle: '.timelinerow-label',

            stop: function(event, ui) {
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
//        this.removeEmptyRows();
//
//        this.lineShowtime = 0;
//
//		this.collection.each(this.renderSingleRow, this);
//        this.renderEmptyRow();
//
//
//        var activeRow = this.getSelectedRow();
//        this.selectRow( activeRow );
//
//
//
//        this.$el.parent().perfectScrollbar({
//            useKeyboard: false
//        });
//
//
//		return this;
//	},


    renderSingleRow: function(rowItem, i) {
        var _that = this;

        this.lineShowtime += parseFloat(rowItem.get('options').get('delay'));

        var rowItemView = new LayersTimelineRowView({ model: rowItem, showtime: this.lineShowtime });

        this.addListenersToRow( rowItemView );

        this.$el.append(rowItemView.render().el);

        // var lineName =_lang('TIMELINE_LINE_NAME_PREFIX');

        // if(i < this.collection.length - 1){
        //     lineName = lineName + " " + (i + 1);
        // }

        // rowItemView.$el.find('.timelinerow-label').html(lineName);

    }



//    render: function(coming) {
//        var _that = this;
//
//        var timelineTemplate = this.template();
//        this.$el.html(timelineTemplate);
//
//        this.removeEmptyRows();
//
//        this.lineShowtime = 0;
//
//        this.collection.each(this.renderSingleRow, this);
//
//        if(this.collection != undefined){
//
//            var lastRowModel = this.collection.last();
//
//            if(lastRowModel != undefined){
//                if(lastRowModel.get('objects').length > 0){
//
//                    if(coming){
//                        this.addNewLineComing();
//                    }else{
//                        this.addNewLine();
//                    }
//
//                    this.render();
//                }
//            }
//        }
//
//        //this.renderEmptyRow();
//
//        var activeRow = this.getSelectedRow();
//        this.selectRow( activeRow );
//
//        this.$el.parent().perfectScrollbar();
//
//        return this;
//    }

});