var WindowModalView = WindowView.extend({

    className : 'window window-modal',

    template: _.template($('#window-modal-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .window-modal-create-new-project': 'createNewPage'
        });
    },

    createNewPage :function(){
        this.trigger('create-new-page');
        this.close();
    }

});