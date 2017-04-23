var DeletePagesWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view page-name-window-view editor-window',

    template: _.template($('#delete-pages-window-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .delete-page-confirm': 'deletePages',
            'click .delete-page-cancel': 'close'
        });
    },


	initialize: function( data ) {

        // this.componentModel = data.componentModel;
        //this.pageCollection = data.pageCollection;
        //this.rMenu = data.rMenu;
        this.windowModel = new WindowModel();
		this.runListeners();

  	},

    deletePages: function() {
        var _that = this;

        // var tmpPagesCollection = new PageCollection();

        // var selectedPageModel;

        // this.pageCollection.each(function(model) {
        //     if (model.isSelected) {
        //         tmpPagesCollection.add(model);

        //         if(selectedPageModel == undefined){

        //             var index = _that.pageCollection.indexOf(model);
        //             selectedPageModel = _that.pageCollection.at(index-1);
        //         }

        //     }
        // });



        //_that.rMenu.deletePage(tmpPagesCollection, selectedPageModel);

        this.trigger('delete-pages');

        this.close();
    },


    afterRender: function() {
        // to override
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});