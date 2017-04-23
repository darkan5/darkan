var QuizDnDComponentView = TextComponentView.extend({

    className : 'component quizdnd-component quiz',

    template: _.template($('#quizdnd-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'click .edit-component-button': 'startEditing',
    //         'click .answer-remove' : 'answerRemove',
    //         'click .add-new-answer' : 'addNewAnswer',
    //         'keyup .answer-input' : 'changeAnswerText',
    //         'click .answer-checkbox' : 'checkGoodAnswer'
    //     });
    // },

    addComponentListeners :function(){
        this.listenTo(this.model, 'change:buttonTitle', this.renderButtonShow);
    },

    renderButtonShow: function(model) {
        this.$el.find('.quiz-dnd-component-inner').text(model.get('buttonTitle'));
    },

    afterRender: function() {
        this.objectOnResize();
    },

    // objectOnResize: function() {
        // change font size
        // var fontSize = (this.$el.height()/6) < 15 ? 15 : (this.$el.height()/6);
        // this.$el.find('.quiz-dnd-component-inner').css({
        //     'font-size': fontSize + "px"
        // });

        // change line-height
        // var elHeight = this.$el.find('.component-styles').height();
        // this.$el.find('.component-styles').css({
        //     'line-height': elHeight + "px"
        // });

    // },

    onRenderStyle: function() {
        this.objectOnResize();
    }

});

var QuizDnDComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizDnDComponentView);