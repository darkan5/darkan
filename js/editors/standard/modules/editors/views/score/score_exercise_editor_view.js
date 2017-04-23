var ScoreExerciseEditorView = EditorView.extend({
	//el: '#botmenu-scores-exercise',
	
    templateExercise: _.template($('#score-exercise-editor-template').html()),
	templateEmptyExercise: _.template($('#score-exercise-empty-editor-template').html()),



	bindings: {

//        '#scoring-reqire-exercise-points-aaccess-number': {
//            observe: 'scoreSuccess',
//            onSet: function(val){
//
////                if(_.isNaN(val)){
////                    return 0;
////                }
//
//                return parseInt(val);
//            }
//        },

        '.scoring-reqire-exercise-points-aaccess': 'scoreSuccess',
        '.scoring-reqire-exercise-points-fail': 'scoreFail',
	    '.scoring-reqire-exercise-points-bad-answer': 'scoreBadAnswer',
        'input[name="attempts"]' : {
            observe: 'attempts',
            onSet: function(val){
                return val == 0 ? '' : val;
            },
            onGet: function(val){
                return val == 0 ? '' : val;
            }
        }
	},

//    events: function(){
//        return _.extend({},EditorView.prototype.events,{
//
//        });
//    },

    initialize: function () {
        this.template = this.templateEmptyExercise;
    },


    beforeRender: function() {

    },

    afterRender: function () {

    },

    setModel: function( model ) {

        //this.unstickit();

        if (model instanceof Backbone.Model) {

            if(this.checkIfExercise(model)){
                this.template = this.templateExercise;

                //model.off('trigger-changed');
                model.on('trigger-changed', this.renderEditor, this );


            }else{
                this.template = this.templateEmptyExercise;
            }

            
        } else if (model instanceof Backbone.Collection) {
            this.template = this.templateEmptyExercise;
        }


        this.model = model;
        this.onSetModel();


        this.render();
        this.addTitleToButtons();

        //this.stickit();

    },

    checkIfExercise: function (model) {

        switch (model.get('type')) {

            case 'quiz':
            case 'quiz-selectone':
            case 'quiz-connectlines':
            case 'quiz-dnd':
            case 'quiz-inputtext':
            case 'quiz-select':
            case 'quiz-wordsearch':
            case 'crossword':

                return true;
                break;

            default:
                return false;
                break;
        }

        // if(model.view.$el.is('.quiz, .form')){
        //     return true;
        // }
        // else{
        //     return false;
        // }
    },

    renderEditor: function(model){

        if(model.changed.scoreSuccess != undefined ||
           model.changed.scoreFail != undefined ||
           model.changed.scoreBadAnswer != undefined){

        }else{
            this.render();
            this.addTitleToButtons();
        }
    },

    getTriggerChangeVarValueAction: function( ){

        if(!this.checkIfExercise(this.model)){
            return true;
        }

        var triggers = this.model.get('triggers');

        if(triggers == undefined){
            return true;
        }

        var changeValueActionPassed = [];
        var changeValueActionFailed = [];
        var changeValueActionBadAnswer = [];

        for (var i = 0; i < triggers.length; i++) {
            var trigger = triggers[i];

            var subtriggers = trigger.subtriggers;


            var whenDoIt = trigger.whendoit;

            if(whenDoIt == 'custom_questionpassed'){
                for (var j = 0; j < subtriggers.length; j++) {
                    var subtrigger = subtriggers[j];



                    var whattodo = subtrigger.whattodo;
                    var objs = subtrigger.objs;

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000'){
                        changeValueActionPassed.push(whattodo);

                        this.passedSubtrigger = subtrigger;
                    }

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000' && objs.varAction != 'add' && objs.varAction != ''){
                        changeValueActionPassed.push(whattodo);
                    }
                }
            }

            if(whenDoIt == 'custom_questionfailed'){
                for (var j = 0; j < subtriggers.length; j++) {
                    var subtrigger = subtriggers[j];

                    var whattodo = subtrigger.whattodo;
                    var objs = subtrigger.objs;

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000'){
                        changeValueActionFailed.push(whattodo);

                        this.failedSubtrigger = subtrigger;
                    }

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000' && objs.varAction != 'add' && objs.varAction != ''){
                        changeValueActionFailed.push(whattodo);
                    }
                }
            }

            if(whenDoIt == 'custom_questionbadanswer'){
                for (var j = 0; j < subtriggers.length; j++) {
                    var subtrigger = subtriggers[j];

                    var whattodo = subtrigger.whattodo;
                    var objs = subtrigger.objs;

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000'){
                        changeValueActionBadAnswer.push(whattodo);

                        this.badanswerSubtrigger = subtrigger;
                    }

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000' && objs.varAction != 'add' && objs.varAction != ''){
                        changeValueActionBadAnswer.push(whattodo);
                    }
                }
            }


        };

        var action = {
            changeValueActionPassed:changeValueActionPassed,
            changeValueActionFailed:changeValueActionFailed,
            changeValueActionBadAnswer:changeValueActionBadAnswer
        }

        if(changeValueActionPassed.length == 0){

            if(this.model.get('scoreSuccess') != 0){
                this.model.set('scoreSuccess', 0, {silent:true});
                this.model.trigger('change');
            }
        }

        if(changeValueActionFailed.length == 0){

            if(this.model.get('scoreFail') != 0){
                this.model.set('scoreFail', 0, {silent:true});
                this.model.trigger('change');
            }
        }

        if(changeValueActionBadAnswer.length == 0){

            if(this.model.get('scoreBadAnswer') != 0){
                this.model.set('scoreBadAnswer', 0, {silent:true});
                this.model.trigger('change');
            }
        }

        return action;
    },

    getJsonModel: function() {
        return { model: this.model.toJSON(), changeValueAction:this.getTriggerChangeVarValueAction() };
    },

    addTitleToButtons: function(){

        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });
    },

    findSubtriggerOpts: function( ){

        var triggers = this.model.get('triggers');

        if(triggers == undefined){
            return undefined;
        }

        for (var i = 0; i < triggers.length; i++) {
            var trigger = triggers[i];

            var subtriggers = trigger.subtriggers;

            var whenDoIt = trigger.whendoit;

            if(whenDoIt == 'custom_questionpassed'){
                for (var j = 0; j < subtriggers.length; j++) {
                    var subtrigger = subtriggers[j];



                    var whattodo = subtrigger.whattodo;
                    var objs = subtrigger.objs;

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000' && objs.varAction == 'add'){

                        return { objs:objs, triggerId:i, subtriggerId:j };
                    }

                }
            }
        }

        return undefined;
    },

});

