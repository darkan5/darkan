var FormInputTextComponentView = LoadedComponentView.extend({

	className : 'component forminputtext-component form',

	template: _.template($('#forminputtext-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'keyup input': 'changeValue'
        });
    },

    // bindings: {
    // 	'input': 'placeholder'
    // },

    addComponentListeners :function(){
  		this.listenTo(this.model, 'change:placeholder', this.changePlaceholder);
  		this.listenTo(this.model, 'change:defaultValue', this.changeDefaultValue);
  		this.listenTo(this.model, 'change:fontSize', this.changeFontSize);
    },

    // afterInitialize: function() {
  		// //this.stickit();
  		// this.listenTo(this.model, 'change:placeholder', changePlaceholder);
    // },

    changeFontSize: function(model) {
    	this.$el.find('input').css('font-size', model.get('fontSize') + 'px');
    },

    changePlaceholder: function(model) {
    	this.$el.find('input').attr('placeholder', model.get('placeholder'));
    },

    changeDefaultValue: function(model) {
    	this.$el.find('input').val(model.get('defaultValue'));
    }

});

var FormInputTextComponentViewNotEditable = ComponentView.createNotEditableComponentClass(FormInputTextComponentView);