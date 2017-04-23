var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-sales-coupon' : 'editSalesCoupon',
        'click .delete-sales-coupon' : 'deleteSalesCoupon',
    },

    initialize: function( ) {
        
    },

    editSalesCoupon: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-sales-coupon-window');

        windowBootstrap.find('input[name="sales_coupon_id"]').val(sender.attr('sales_coupon_id'));
        windowBootstrap.find('select[name="plan_id"]').val(sender.attr('plan_id'));
        windowBootstrap.find('select[name="sales_coupon_group_id"]').val(sender.attr('sales_coupon_group_id'));
        windowBootstrap.find('textarea[name="description"]').val(sender.attr('description'));
        windowBootstrap.find('input[name="cost"]').val(sender.attr('cost'));
        windowBootstrap.find('select[name="active"]').val(sender.attr('active'));

    },

    deleteSalesCoupon: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-sales-coupon-window');
        windowBootstrap.find('input[name="sales_coupon_id"]').val(sender.attr('sales_coupon_id'));
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