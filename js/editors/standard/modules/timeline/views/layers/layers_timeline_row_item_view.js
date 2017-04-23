var LayersTimelineRowItemView = TimelineRowItemView.extend({

	tagName: "li",
	className: 'component-miniature timeline-item',

    multiSelectedComponentsModels: null,

//    events: function(){
//        return _.extend({},TimelineRowItemView.prototype.events,{
//            'drop': 'drop',
//            'remove-from' : 'removeFromCollection',
//            'add-to': 'addToCollection',
//            'add-to-multi': 'addToCollectionMulti',
//            'add-new-row': 'addNewRow'
//        });
//    },

    initialize :function(){
        //this.listenTo(this.model, 'change:active', this.renderActive );

        this.model.miniatureView = this;

        this.addEventsToModel();
    }

});