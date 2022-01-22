var QuizWordsearchComponentView = ExerciseComponentView.extend({

    className : 'component quizwordsearch-component',

	template: _.template($('#quizwordsearch-component-template').html()),

    mouseDownTarget: false,

    wordsearchTimerID: null,

    wordsearchSecondToEnd: 0,

    events: function(){


        if(Utils.isMobile()){

            return _.extend({},ComponentView.prototype.events,{

                'touchmove': 'mouseMoveMobile',
                'touchstart .wordsearch-cell': 'mouseDown',
                'touchend .wordsearch-cell': 'mouseUpMobile'
            });

        }else{

           return _.extend({},ComponentView.prototype.events,{
                'mousemove .wordsearch-cell': 'mouseMove',
                'mousedown .wordsearch-cell': 'mouseDown',
                'mouseup .wordsearch-cell': 'mouseUp'
            }); 
        }

    },

    mouseMoveMobile: function(e) {

        e.stopPropagation();
        e.preventDefault();

        if (this.mouseDownTarget !== false) {

            var myLocation = e.originalEvent.changedTouches[0];
            var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);

            var target = $(realTarget);
            var cellID = target.attr('cellid');


            this.onControllerMove(this.mouseDownTarget, cellID);
        }
    },


    startTimer: function() {


        var _that = this;

        var timeLimitOption = this.model.get('timeLimitOption');
        var compl = this.model.get('compl') || 0;


        this.wordsearchSecondToEndStarted = parseInt(this.model.get('wordSearchTimeOut'));
        this.wordsearchSecondToEnd = parseInt(this.model.get('wordSearchTimeOut'));

        if (timeLimitOption && this.wordsearchSecondToEnd !== 0 && compl === 0) {

            clearInterval(this.wordsearchTimerID);

            this.wordsearchTimerID = setInterval(function() {

                if (_that.wordsearchSecondToEnd > 0) {


                    _that.wordsearchSecondToEnd--;

                } else {

                    _that.stopTimer();

                    _that.checkSelf();
                }

            }, 1000);
        }
    },

    stopTimer: function() {

        clearInterval(this.wordsearchTimerID);

        this.model.set('wordSearchTimeOut', this.wordsearchSecondToEnd);

    },

    resetTimer: function() {

        clearInterval(this.wordsearchTimerID);

        this.model.set('wordSearchTimeOut', this.wordsearchSecondToEndStarted);

    },

    mouseMove: function(e) {

        if (this.mouseDownTarget !== false) {

            var target = $(e.currentTarget);
            var cellID = target.attr('cellid');

            this.onControllerMove(this.mouseDownTarget, cellID);
        }
    },

    mouseDown: function(e) {

        var compl = this.model.get('compl') || 0;



        if (compl === 0) {

            var target = $(e.currentTarget);
            var cellID = target.attr('cellid');

            this.mouseDownTarget = cellID;
        }

    },

    mouseUpMobile: function(e) {

        var compl = this.model.get('compl') || 0;

        if (compl === 0 || this.mouseDownTarget) {

            var myLocation = e.originalEvent.changedTouches[0];
            var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);

            var target = $(realTarget);
            var cellID = target.attr('cellid');

            var selectedWord = this.onControllerMove(this.mouseDownTarget, cellID);

            this.$el.find('.wordsearch-cell').removeClass('qwordsearch-select');

            this.checkWord(selectedWord);
            //this.checkIsComplete();

            this.mouseDownTarget = false;

            this.checkSelf();
        }

    },

    mouseUp: function(e) {

        var compl = this.model.get('compl') || 0;

        if (compl === 0 || this.mouseDownTarget) {

            var target = $(e.currentTarget);
            var cellID = target.attr('cellid');

            var selectedWord = this.onControllerMove(this.mouseDownTarget, cellID);

            this.$el.find('.wordsearch-cell').removeClass('qwordsearch-select');

            this.checkWord(selectedWord);
            //this.checkIsComplete();

            this.mouseDownTarget = false;

            this.checkSelf();
        }

    },

    checkWord: function(word) {

        var _that = this;
        var answers = this.model.get('answers');

        _.each(answers, function(answer, index) {

            if (_.difference(answer.objs, word).length === 0 && _.difference(word, answer.objs).length === 0) {

                if(!answers[index].opts.isCorrect){

                    answers[index].opts.isCorrect = true;

                    _that.trigger('onWordSelectedCorrect', { model:_that.model, word:word, answer:answers[index] });
                }
            }
        });

        this.model.set('answers', answers);

        _that.colorizeGoodAnswers();

    },

//    checkIsComplete: function() {
//
//        var answers = this.model.get('answers');
//        var compl = true;
//        var goodAnswers = 0;
//
//        _.each(answers, function(answer, index) {
//
//            if (typeof answer.opts.isCorrect !== 'undefined' && answer.opts.isCorrect === true) {
//                goodAnswers++;
//            } else {
//                compl = false;
//            }
//
//        });
//
//        if (compl) {
//
//            this.model.set('compl', 1);
//            this.stopTimer();
//        }
//
//        var ret = {
//            compl: compl,
//            goodAnswers: goodAnswers
//        };
//
//        return ret;
//    },

    checkIsCompleteTimeOut: function() {


    },

    colorizeGoodAnswers: function() {

        var _that = this;
        var answers = this.model.get('answers');

        _.each(answers, function(answer, index) {

            if (typeof answer.opts.isCorrect !== 'undefined' && answer.opts.isCorrect === true) {

                _.each(answer.objs, function(letter) {

                    _that.$el.find('.wordsearch-cell[cellid="' + letter + '"]').addClass('qwordsearch-selected-word');

                });

            }

        });
    },

    onControllerMove: function(startCellID, endCellID) {

        var _that = this;

        var _startCellID = startCellID.split('-');
        var _endCellID = endCellID.split('-');

        var startCellX = parseInt(_startCellID[1]);
        var startCellY = parseInt(_startCellID[0]);
        var endCellX = parseInt(_endCellID[1]);
        var endCellY = parseInt(_endCellID[0]);

        var translateX = Math.abs(Math.abs(startCellX) - Math.abs(endCellX));
        var translateY = Math.abs(Math.abs(startCellY) - Math.abs(endCellY));

        var selectedCells = [];

        //_log_mobile('startCellID', startCellID);
        //_log_mobile('endCellID', endCellID);


        _that.$el.find('.wordsearch-cell').removeClass('qwordsearch-select');

        if ((translateX === translateY) || translateX === 0 || translateY === 0) {

            var translate = translateX > translateY ? translateX : translateY;

            var actualX = startCellX;
            var actualY = startCellY;

            for (var i = 0; i <= translate; i++) {

                if (translateX !== 0) {
                    if (startCellX < endCellX)
                        actualX = startCellX + i;
                    else
                        actualX = startCellX - i;
                }

                if (translateY !== 0) {
                    if (startCellY < endCellY)
                        actualY = startCellY + i;
                    else
                        actualY = startCellY - i;
                }

                var cell = actualY + '-' + actualX;

                selectedCells.push(cell);

                _that.$el.find('.wordsearch-cell[cellid="' + cell + '"]').addClass('qwordsearch-select');
            }
        }

        return selectedCells;
    },

    afterInitialize: function() {
        this.prepareWordsearch();
    },

	afterRender: function() {


        this.colorizeGoodAnswers();

        this.startTimer();

	},

    onShow: function() {
        this.onWordsearchResize();
    },

    prepareWordsearch: function() {

        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y', 'Z'];

        var objs = this.model.get('objs');

        _.each(objs, function(val, index) {

            if (val === '') {

                var letterID = Math.floor(Math.random() * (alphabet.length - 1));
                objs[index] = alphabet[letterID];
            }

        });

        this.model.get('objs', objs);

    },

    onWordsearchResize: function() {
        var objectWrapperWidth = this.$el.width();
        var objectWrapperHeight = this.$el.height();


        var qcrosswordWrapper = this.$el.find('.quizwordsearch-component-inner');
        var crosswordHeight = qcrosswordWrapper.height();
        var crosswordWidth = qcrosswordWrapper.width();

        var newCrosswordWidth = objectWrapperWidth;
        var newCrosswordHeight = ((crosswordHeight * newCrosswordWidth) / crosswordWidth);


        if (newCrosswordHeight < 10) {
            newCrosswordHeight = 10;
        }

        if (newCrosswordHeight > objectWrapperHeight) {
            newCrosswordHeight = objectWrapperHeight;
            newCrosswordWidth = (crosswordWidth * newCrosswordHeight) / crosswordHeight;
        }

        var row_count = this.model.get('rows').length;
        var cell_size = (newCrosswordHeight / row_count);

        this.$el.find('.wordsearch-row').css('height', cell_size + 'px');

        this.$el.find('.wordsearch-cell-background').css({
            height: cell_size + "px",
            width: cell_size + "px",
            'line-height': cell_size + "px"
        });

        this.$el.find('.wordsearch-cell[celltype="answer"]').css({
            'line-height': cell_size*0.95 + "px",
            'font-size': cell_size/1.5 + "px"
        });

        this.$el.find('.wordsearch-cell[celltype="question"]').css({
            'line-height': cell_size/3.5 + "px",
            'font-size': cell_size/3.5 + "px"
        });

        this.$el.find('.wordsearch-cell-password').css({
            height: cell_size*0.3 + "px",
            width: cell_size*0.3 + "px",
            'line-height': cell_size*0.3 + "px"
        });
    },

    onRemove: function() {

        this.stopTimer();
    },


    checkAnswers: function(){

        var answers = this.model.get('answers');
        var compl = true;
        var goodAnswers = 0;

        _.each(answers, function(answer, index) {

            if (typeof answer.opts.isCorrect !== 'undefined' && answer.opts.isCorrect === true) {
                goodAnswers++;
            } else {
                compl = false;
            }

        });

        if(this.model.get('wordSearchTimeOut') == 0){

            var requireAnswersToAllQuestions = this.model.get('requireAnswersToAllQuestions');
            var minAnswersNumber = this.model.get('minAnswersNumber');

            if (!requireAnswersToAllQuestions && minAnswersNumber <= goodAnswers) {

                // zaliczone
                compl = true;
            }
        }

        return compl;
    },

    checkSelf: function(e){



        //var checkSelf = this.model.get('checkSelf');
        //var checkSelf = true;

        //if(checkSelf){
        var success = this.validateQuestion();


        if(success){
            this.stopTimer();
        }


        //}
    },

    userHasMoreAttempts: function() {
        return true;
    },

    resetExerciseApproachSpecial: function(){

        this.resetTimer();

    },

    renderAsReadyToUse: function(){


        var answers = this.model.get('answers');

        _.each(answers, function(answer, index) {

            answer.opts.isCorrect = false;

        });

        this.model.set('answers', answers);

        this.render();
        this.onWordsearchResize();
    },

    initUserSelectionObject: function() {


    },

});