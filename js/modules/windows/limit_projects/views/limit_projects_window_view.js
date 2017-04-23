var LimitProjectsWindowView = WindowView.extend({

    className : 'window window-limit-projects-view',

    template: _.template($('#window-limit-projects-template').html()),


    events: function(){
        return _.extend({},WindowView.prototype.events,{
            
        });
    },

    afterInitialize : function(data) {

        var _that = this;

    },

});