var FormTextareaComponentView = LoadedComponentView.extend({

	className : 'component formtextarea-component form',

	template: _.template($('#formtextarea-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // // bindings: {
    // // 	'input': 'placeholder'
    // // },

    addComponentListeners :function(){
  		this.listenTo(this.model, 'change:defaultValue', this.changeDefaultValue);
  		this.listenTo(this.model, 'change:fontSize', this.changeFontSize);
    },

    // afterInitialize: function() {
  		// //this.stickit();
  		// this.listenTo(this.model, 'change:placeholder', changePlaceholder);
    // },

    changeFontSize: function(model) {
    	this.$el.find('textarea').css('font-size', model.get('fontSize') + 'px');
    },

    changeDefaultValue: function(model) {
    	this.$el.find('textarea').text(model.get('defaultValue'));
    }

});

var FormTextareaComponentViewNotEditable = ComponentView.createNotEditableComponentClass(FormTextareaComponentView);