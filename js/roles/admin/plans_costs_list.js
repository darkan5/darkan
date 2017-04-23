var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-plan-cost' : 'editPlanCost',
        'click .delete-plan-cost' : 'deletePlanCost',
    },

    initialize: function( ) {

    },

    editPlanCost: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-plan-cost-window');

        windowBootstrap.find('input[name="plan_cost_id"]').val(sender.attr('plan_cost_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
        windowBootstrap.find('input[name="description"]').val(sender.attr('description'));
        windowBootstrap.find('test[name="costs"]').text(sender.attr('costs'));
        windowBootstrap.find('select[name="plan_id"]').val(sender.attr('plan_id'));
        windowBootstrap.find('select[name="currency_id"]').val(sender.attr('currency_id'));
        windowBootstrap.find('select[name="version_id"]').val(sender.attr('version_id'));

    },

    deletePlanCost: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-plan-cost-window');

        windowBootstrap.find('input[name="plan_cost_id"]').val(sender.attr('plan_cost_id'));
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