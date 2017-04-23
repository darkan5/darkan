var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-plan-option' : 'editPlanOption',
        'click .delete-plan-option' : 'deletePlanOption',
    },

    initialize: function( ) {

    },

    editPlanOption: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-plan-option-window');

        windowBootstrap.find('input[name="plan_option_id"]').val(sender.attr('plan_option_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
        windowBootstrap.find('input[name="description"]').val(sender.attr('description'));
        windowBootstrap.find('select[name="version_id"]').val(sender.attr('version_id'));
        windowBootstrap.find('textarea[name="options"]').text(sender.attr('options'));

    },

    deletePlanOption: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-plan-option-window');

        windowBootstrap.find('input[name="plan_option_id"]').val(sender.attr('plan_option_id'));
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