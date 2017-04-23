var DrawedInfoPointPopupComponentView = LoadedComponentView.extend({

	className : 'component drawedinfopointpopup-component',

	template: _.template($('#drawedinfopointpopup-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

    addComponentListeners :function(){

    },

    // afterInitialize: function() {
  		// //this.stickit();
  		// this.listenTo(this.model, 'change:placeholder', changePlaceholder);
    // },



});

var DrawedInfoPointPopupComponentViewNotEditable = ComponentView.createNotEditableComponentClass(DrawedInfoPointPopupComponentView);