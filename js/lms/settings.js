var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-setting' : 'editSetting',
    },

    initialize: function( ) {
        
    },

    editSetting: function(e) {

        var sender = $(e.target);

        var key = sender.attr('key');
        var value = sender.attr('value');

        _log('key', key);
        _log('value', value);

        
        var windowBootstrap = $('#edit-setting-'+ key +'-window');

        windowBootstrap.find('.form-control[name="'+ key +'"]').val(value);

    },


    render: function(){

    },

    serializeData: function(){
        return {};
    },

    afterRender: function(){
        
    },

});

var bodyView = new BodyView();