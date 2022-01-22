var ExerciseComponentView = ComponentView.extend({

    checkExercise: function(){

        return false;
    },

    checkSelfEnter: function(e){

        switch (e.which){

            case 13:

                var checkSelf = this.model.get('checkSelf');

                if(checkSelf){
                    this.validateQuestion();
                }

                break;
        }
    },

    checkSelf: function(e){

        var checkSelf = this.model.get('checkSelf');

        if(checkSelf){
            this.validateQuestion();
        }
    },
});
