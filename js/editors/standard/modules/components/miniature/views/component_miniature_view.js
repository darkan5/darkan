var ComponentMiniatureView = ItemView.extend({

    tagName: "li",
    className: 'component-miniature timeline-item component-miniature-delete-option',

    template: _.template($('#timelineitem-template').html()),

    events: {
        'mousedown': 'onMouseDown',
        'mouseover' : 'onMouseOver',
        'mouseout' : 'onMouseOut',
        'click' : 'onMouseClick'
    },

    onMouseClick : function(e){

        //this.model.selectedByMiniature(false);
        //this.trigger('remove-miniature', this.model);

        if(!e.shiftKey){
            this.$el.trigger('select-comp', [this.model, e]);
        }
    },

    onMouseOver: function(e){
        this.model.selectedByMiniature(true);
    },

    onMouseOut: function(e){
        this.model.selectedByMiniature(false);
    },

    mouseDown: function(e){

        this.model.selectedByMiniature(false);
        this.model.selectedByTrigger(false);
    },

    addEventsToModel: function(){

        var _that = this;

    },

    initialize :function(){

        var _that = this;

        _that.addEventsToModel();
    },

    render: function(){

        var _that = this;

        var timelineItemTemplate = this.template(this.model.toJSON());
        this.$el.html(timelineItemTemplate);

        this.delegateEvents();

        return this;
    }
});