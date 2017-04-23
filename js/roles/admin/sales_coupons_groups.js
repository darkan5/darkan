var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-sales-coupon-group' : 'editSalesCoupon',
        'click .delete-sales-coupon-group' : 'deleteSalesCoupon',
    },

    initialize: function( ) {

    },

    editSalesCoupon: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-sales-coupon-group-window');

        windowBootstrap.find('input[name="sales_coupon_group_id"]').val(sender.attr('sales_coupon_group_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
        windowBootstrap.find('textarea[name="description"]').val(sender.attr('description'));

    },

    deleteSalesCoupon: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-sales-coupon-group-window');
        windowBootstrap.find('input[name="sales_coupon_group_id"]').val(sender.attr('sales_coupon_group_id'));
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