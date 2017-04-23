var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-plan-to-plan_option' : 'editPoliticianToPartie',
        'click .delete-plan-to-plan_option' : 'deletePoliticianToPartie',
    },

    initialize: function( ) {

    },

    editPoliticianToPartie: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-plan-to-plan_option-window');

        windowBootstrap.find('input[name="plan_to_plan_option_id"]').val(sender.attr('plan_to_plan_option_id'));
        windowBootstrap.find('select[name="plan_id"]').val(sender.attr('plan_id'));
        windowBootstrap.find('select[name="plan_option_id"]').val(sender.attr('plan_option_id'));

    },

    deletePoliticianToPartie: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-plan-to-plan_option-window');

        windowBootstrap.find('input[name="plan_to_plan_option_id"]').val(sender.attr('plan_to_plan_option_id'));
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