var IframeComponentView = LoadedComponentView.extend({

	className : 'component iframe-component',

	template: _.template($('#iframe-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

    addComponentListeners :function(){
        this.listenTo(this.model, 'change:link', this.renderIframe);
    },

    renderIframe: function(model) {
        var link = model.get('link')
        this.$el.find('iframe').attr('src', link);
    }

});

var IframeComponentViewNotEditable = ComponentView.createNotEditableComponentClass(IframeComponentView);