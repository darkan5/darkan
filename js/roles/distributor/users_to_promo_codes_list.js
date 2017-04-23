var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-user-to-promo_code' : 'editUserToPromocode',
        'click .delete-user-to-promo_code' : 'deleteUserToPromocode',
    },

    initialize: function( ) {

    },

    editUserToPromocode: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-user-to-promo_code-window');

        windowBootstrap.find('input[name="user_to_promo_code_id"]').val(sender.attr('user_to_promo_code_id'));
        windowBootstrap.find('select[name="user_id"]').val(sender.attr('user_id'));
        windowBootstrap.find('select[name="promo_code_id"]').val(sender.attr('promo_code_id'));

    },

    deleteUserToPromocode: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-to-promo_code-window');

        windowBootstrap.find('input[name="user_to_promo_code_id"]').val(sender.attr('user_to_promo_code_id'));
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