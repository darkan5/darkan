var DrawedInfoPointLinkComponentView = LoadedComponentView.extend({

	className : 'component drawedinfopointlink-component',

	template: _.template($('#drawedinfopointlink-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

    addComponentListeners :function(){
    }

    // afterInitialize: function() {
  		// //this.stickit();
  		// this.listenTo(this.model, 'change:placeholder', changePlaceholder);
    // },



});

var DrawedInfoPointLinkComponentViewNotEditable = ComponentView.createNotEditableComponentClass(DrawedInfoPointLinkComponentView);