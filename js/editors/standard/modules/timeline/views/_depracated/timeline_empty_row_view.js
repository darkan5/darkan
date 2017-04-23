var TimelineEmptyRowView = ItemView.extend({

    tagName: 'li',
    className: 'timeline-main-list timelinerow timeline-empty-row',
    template: _.template($('#timeline-empty-row-template').html()),

    events: {
        'create-new-row': 'createNewRow',
        'mousedown': 'onMouseDown'
    },

    initialize: function() {
        this.render();
    },

    mouseDown: function(e){

    },

    showContextMenu: function(e) {

        //var contextMenuView = new TimelineEmptyRowContextMenuView({ model: this.getModel(), view: this});

        //ContextMenuContainer.addMenu(contextMenuView, e);
    },

    checkCondition: function(e) {
        return false;
    },

    getModel: function() {
        return new Backbone.Model();
    },

    createNewRow: function(event, model, position){
        var _that = this;

        this.trigger('create-new-row',  model);
    },

    render :function(){
        var timelineRowTemplate = this.template();
        this.$el.html(timelineRowTemplate);

        this.$el.find('.timelinerow-items-holder').sortable({

            placeholder: "timeline-placeholder",
            connectWith: ".timelinerow-items-holder",
            revert: true,
            delay: 150,
            tolerance: 'pointer',

            receive: function(event, ui) {
                //console.log("Dostałem nowy obiekt na pustej linii...");
                // dodaj nowa linie i wrzuc do niej komponent zrzucony

                ui.item.trigger('add-new-row', ui.item.index());

            },

            stop: function(event, ui) {

//                console.log("Zrzucam na pusta linie");
//                console.log(ui.item);

                //ui.item.trigger('add-new-row', ui.item.index());
            }
        });


        return this;
    }
});
