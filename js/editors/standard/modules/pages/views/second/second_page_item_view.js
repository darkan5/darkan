var SecondPageItemView = PageItemView.extend({

    tagName: 'li',
    className: 'page',
    template: _.template($('#second-page-template').html()),

//    events: function(){
//        return _.extend({},PageItemView.prototype.events,{
//
//        });
//    },

    events: {
        'click .page-thumb': 'onClick',
        'click .dinamic-page-thumb-overlay': 'onClick',
        'mousedown': 'onMouseDown',
        'change .page-checkbox': 'selectPage'
    },


    showContextMenu: function(e) {

        var itemsSelectedNumb = 0;

        this.model.collection.each(function(model){
            if(model.isSelected){
                itemsSelectedNumb++;

            }
        });

        if(itemsSelectedNumb <= 1){

            this.unselectAllPages();

            this.model.isSelected = true;
            this.model.setCheckboxSelected(true);
        }

        var contextMenuView = new SecondPageContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    updateDinamicPageThumb: function() { return },
    createDinamicPageThumb: function() { return },
    destroyDinamicPageThumb: function() { return }



});
