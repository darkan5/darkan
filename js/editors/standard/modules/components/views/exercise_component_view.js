var ExerciseComponentView = LoadedComponentView.extend({


    startEditing: function() {
        // To override
    },

    endEditing: function(){
        this.$el.find('.quiz-component-handle').show();

        this.$el.find('.answer-text').show();
        this.$el.find('.answer-input').remove();
        this.$el.find('.answer-remove').remove();
        this.$el.find('.add-new-answer').remove();
    }


});
