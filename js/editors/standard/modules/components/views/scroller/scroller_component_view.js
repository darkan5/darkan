var ScrollerComponentView = ComponentView.extend({

	className : 'component scroller-component',

	template: _.template($('#scroller-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

    afterInitialize: function() {
        this.stageView = StageView.instance;


        var stageHeight = this.stageView.model.get('options').get('height');
    },

    render: function(){

        that = this;

        this.$el.html("");

        var componentTemplate = this.template(this.model.toJSON());
        this.$el.html(componentTemplate);

        this.setPositionToComponent();

        this.makeDraggable({ axis: 'y' });
        //this.makeResizable();

        this.renderSelectedBy( this.model.get('selected-by') );

        this.stickit();
        return this;
    }

    // afterInitialize: function() {
  		// //this.stickit();
  		// this.listenTo(this.model, 'change:placeholder', changePlaceholder);
    // },



});

var ScrollerComponentViewNotEditable = ComponentView.createNotEditableComponentClass(ScrollerComponentView);