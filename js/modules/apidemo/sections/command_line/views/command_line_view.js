var CommandLineView = Backbone.View.extend({

	template: _.template($('#command-line-template').html()),

    events: {
        'change .command-line': 'deleteErrorParse',
        'click .command-line': 'deleteErrorParse',
        'keypress .command-line': 'onCommandLineKeypress'

    },

    bindings: {
        '.command-line': 'command',
    },

    initialize: function(){

    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        this.$el.find('.command-line').focus();

        this.stickit();

        return this;
    },

    serializeData: function(){
    	return {};
    },

    onCommandLineKeypress: function(e){

        switch(e.which){
            case 13:

                e.preventDefault();
                this.trigger('execte-command', this.model);

                break;
        }
    },

    onCommandLineChange: function(){
        this.deleteErrorParse();
    },

    setAsErrorParse: function(){
        this.$el.find('.command-line').attr('error-parse', true);
    },

    deleteErrorParse: function(){
        this.$el.find('.command-line').removeAttr('error-parse');
    }
});