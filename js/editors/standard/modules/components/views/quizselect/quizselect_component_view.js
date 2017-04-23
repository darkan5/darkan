var QuizSelectComponentView = LoadedComponentView.extend({

	className : 'component quizselect-component form',

	template: _.template($('#quizselect-component-template').html()),

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

var QuizSelectComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizSelectComponentView);