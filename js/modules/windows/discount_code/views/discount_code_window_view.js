var DiscountCodeWindowView = WindowView.extend({

    className : 'window window-discount-code-view',

    template: _.template($('#window-discount-code-template').html()),


    events: function(){
        return _.extend({},WindowView.prototype.events,{
            // 'submit .new-folder-form': 'createNewFolder',
            'click .new-folder-name-cancel': 'close',
        });
    },

    afterInitialize : function(data) {
        _log('data.data', data.data);
        this.windowData = data.data;
    },

    afterRender: function() {
        var _that = this;

        $('#invoice_selected').prop('checked', false);

    },

    getRenderData: function() {
        return this.windowData;
    },

    // disableButtons: function() {
    //      this.$el.find('.new-folder-name-submit').attr('disabled', 'disabled');
    // },

    // enableButtons: function() {
    //      this.$el.find('.new-folder-name-submit').removeAttr('disabled');
    // }

});