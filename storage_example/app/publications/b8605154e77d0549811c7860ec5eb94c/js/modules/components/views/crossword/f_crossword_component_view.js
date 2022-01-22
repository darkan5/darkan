var CrosswordComponentView = ExerciseComponentView.extend({

    className : 'component crossword-component',

	template: _.template($('#crossword-component-template').html()),

    wordDirection: 'left',

    crosswordTimerID: null,

    crosswordSecondToEnd: 0,

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            //'click .crossword-cell': 'findWordDirection',
            'click .crossword-cell[celltype="question"]': 'findWordDirectionQuestion',
            'click .crossword-cell[celltype="answer"]': 'findWordDirectionAnswer',
            //'touchstart .crossword-cell': 'findWordDirection',
            'keyup .crossword-cell': 'insertLetter'
        });
    },

    findWordDirectionQuestion: function(e) {

        var target = $(e.target);

        var targetCell = target.attr('cellid');
        var cellTarget = this.clickOnQuestion(targetCell, target.parent().attr('gender'));

        this.selectAnswerCell(cellTarget);

        this.playQuestionAudio(targetCell);

        _log('targetQuestion', target);
    },

    findWordDirectionAnswer: function(e) {

        var target = $(e.target);

        var targetCell = target.attr('cellid');
        this.clickOnAnswer(targetCell, target.parent().attr('gender'));

        _log('targetAnswer', target);
        _log('targetCell', targetCell);

        this.selectAnswerCell(target);
    },

    selectAnswerCell: function(target) {

        target.focus().select();
        target[0].setSelectionRange(0, 9999);

        this.$el.find('.crossword-cell[celltype="answer"]').removeClass('crossword-cell-background-color-mobile');
        target.addClass('crossword-cell-background-color-mobile');
    },

    playQuestionAudio: function(questionCell){

        var objs = this.model.get('objs');

        if (objs[questionCell].opts.questionType === 'audio') {

            var soundFile = __meta__.directLocation + 'exported_view/' + actionkey.split('-').pop() + '/sounds/' + actionkey + '/' + objs[questionCell].opts.soundFile;

            this.$el.trigger('play-component-audio', soundFile);
        }
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        //_log('initUserSelectionObject', this.model);

        if (_.isUndefined(userSelection)) {
            
            this.model.set('userSelection', {});
        }
    },

    startTimer: function() {

        var _that = this;

        var timeLimitOption = this.model.get('timeLimitOption');
        var compl = this.model.get('compl') || 0;

        this.crosswordSecondToEndStarted = this.model.get('qcrosswordTimeout');
        this.crosswordSecondToEnd = this.model.get('qcrosswordTimeout');

        //if (timeLimitOption && this.crosswordSecondToEnd !== 0 && compl === 0) {
        if (timeLimitOption && this.crosswordSecondToEnd !== 0) {

            clearInterval(this.crosswordTimerID);

            this.crosswordTimerID = setInterval(function() {

                if (_that.crosswordSecondToEnd > 0) {

                    _that.crosswordSecondToEnd--;

                } else {

                    _that.checkIsCompleteTimeOut();

                    _that.stopTimer();

                    _that.validateQuestion();
                }

            }, 1000);
        }
    },

    stopTimer: function() {

        clearInterval(this.crosswordTimerID);

        this.model.set('qcrosswordTimeout', this.crosswordSecondToEnd);

    },

    resetTimer: function() {

        clearInterval(this.crosswordTimerID);

        this.model.set('qcrosswordTimeout', this.crosswordSecondToEndStarted);

    },

    colorizeGoodAnswer: function() {


        var _that = this;
        var objs = this.model.get('objs');
        var userSelection = this.model.get('userSelection');
        var divisionCrossword = this.model.get('divisionCrossword');
        var colorizeGoodAnswer = this.model.get('colorizeGoodAnswer');
        var colorizeGoodWord = this.model.get('colorizeGoodWord');
        var colorizeCrosswordAfterWriteLastWord = this.model.get('colorizeCrosswordAfterWriteLastWord');
        var compl = this.model.get('compl') || 0;
        var cellDOM;
        var allLetter = true;

        _.each(objs, function(cellVal, cellKey) {

            if (cellVal.type === 'answer' && cellVal.text !== '') {

                if (typeof userSelection[cellKey] !== 'undefined' && userSelection[cellKey] !== '') {

                } else {

                    allLetter = false;
                }

            }
        });

        //_log_mobile('userSelection', userSelection);

        _.each(userSelection, function(val, key) {

            //_log_mobile('val', val);
            //_log_mobile('key', key);

            cellDOM = _that.$el.find('.crossword-cell[cellid="' + key + '"]');

            cellDOM.removeClass('crossword-answer-select').removeClass('qcrossword-word-is-good');

            //_log_mobile('text', objs[key].text.toUpperCase());

            if (val.toUpperCase() === objs[key].text.toUpperCase()) {

                if (colorizeGoodAnswer) {

                    cellDOM.addClass('crossword-answer-select');
                }
            }

        });

        _.each(divisionCrossword.answersStatus, function(goodWord, wordID) {

            _.each(divisionCrossword.answers[wordID], function(letterID) {

                if ((goodWord && colorizeGoodWord) || (goodWord && colorizeCrosswordAfterWriteLastWord && allLetter)) {
                    _that.$el.find('.crossword-cell[cellid="' + letterID + '"]').removeClass('crossword-cell-background-color-mobile').removeClass('crossword-answer-select').addClass('qcrossword-word-is-good');
                }

            });

        });

        if (compl !== 0) {
            this.blockExercise();
        }
    },

    insertLetter: function(e) {

        
        switch(e.which){
            case 9: // tab
            case 17: // ctrl
            case 18: // alt
            case 16: // shift
            case 20: // capslock

                return;

                break;  
        }

        var target = $(e.currentTarget);
        var cellID = target.attr('cellid');
        var userSelection = this.model.get('userSelection');

        var newCellID = this.checkNextCell(cellID);


        userSelection[cellID] = target.val();

        this.model.set('userSelection', userSelection);

        
        this.checkGoodWords();

        this.colorizeGoodAnswer();

        this.validateQuestion();

        if (e.keyCode !== 8 &&      // BACKSPACE
            e.keyCode !== 46) {     // DEL

            if (newCellID !== false) {

                var crosswordCell = this.$el.find('.crossword-cell[cellid="' + newCellID + '"]');
                this.selectAnswerCell(crosswordCell);
            }
        }
    },

    checkGoodWords: function() {

        var _that = this;
        var objs = this.model.get('objs');
        var userSelection = this.model.get('userSelection');
        var divisionCrossword = this.model.get('divisionCrossword');
        var allWordsIsGood = true;
        var countGoodWords = 0;

        _.each(divisionCrossword.answers, function(wordVal, wordKey) {

            var goodWord = true;

            _.each(wordVal, function(letterID) {

                if (typeof userSelection[letterID] !== 'undefined' && userSelection[letterID].toUpperCase() === objs[letterID].text.toUpperCase()) {
                } else {
                    goodWord = false;
                    allWordsIsGood = false;
                }

            });

            if (goodWord) {
                countGoodWords++;
            }

            divisionCrossword.answersStatus[wordKey] = goodWord;

        });

        if (allWordsIsGood) {
            this.stopTimer();
            //this.model.set('compl', 1);
        }

        this.model.set('divisionCrossword', divisionCrossword);

        return countGoodWords;
    },

    checkIsCompleteTimeOut: function() {

        var requireAnswersToAllQuestions = this.model.get('requireAnswersToAllQuestions');
        var minAnswersNumber = this.model.get('minAnswersNumber');
        var compl = this.model.get('compl') || 0;
        var goodWords = this.checkGoodWords();

        this.colorizeGoodAnswer();


        var success = false;


        if(requireAnswersToAllQuestions){
           if(goodWords == this.getAllAnswersCount()){
                success = true;
           }
        }else{
            if(minAnswersNumber <= goodWords ){
                success = true;
           }
        }

        if (success) {
            this.blockExercise();
        }

        return success

        // if (!requireAnswersToAllQuestions && (minAnswersNumber <= goodWords)) {
            
        //     return true;
        // } else {

        //      return false;
        // }

        
    },

    blockExercise: function() {
        this.$el.find('.crossword-component-overlay').show();
    },

    checkNextCell: function(cellID) {

        var cols = this.model.get('cols').length;
        var rows = this.model.get('rows').length;
        var objs = this.model.get('objs');
        var _cellID = cellID.split('-');
        var position = {
            x: _cellID[1],
            y: _cellID[0]
        };

        switch (this.wordDirection) {

            case 'left':
                position.x++;
                break;

            case 'down':
                position.y++;
                break;
        }

        if (position.x >= 0 && position.y >= 0 && position.x < cols && position.y < rows ) {

            var key = position.y + '-' + position.x;

            _log('newCellID', key);

            if (objs[key].type === 'answer') {

                var newCellID = position.y + '-' + position.x;



                return newCellID;
            }
        }



        return false;
    },

    clickOnQuestion: function(questionCell, gender) {

        var _questionCell = questionCell.split('-');
        var questionCellY = parseInt(_questionCell[0]);
        var questionCellX = parseInt(_questionCell[1]);
        var startWordCell;
        var objs = this.model.get('objs');
        var actionkey = this.model.get('actionkey');

        switch (parseInt(gender)) {

            case 1:
                startWordCell = (questionCellY + 1) + '-' + questionCellX;
                this.wordDirection = 'down';
                break;

            case 2:
                startWordCell = questionCellY + '-' + (questionCellX + 1);
                this.wordDirection = 'down';
                break;

            case 3:
                startWordCell = questionCellY + '-' + (questionCellX - 1);
                this.wordDirection = 'down';
                break;

            case 4:
                startWordCell = questionCellY + '-' + (questionCellX + 1);
                this.wordDirection = 'left';
                break;

            case 5:
                startWordCell = (questionCellY + 1) + '-' + questionCellX;
                this.wordDirection = 'left';
                break;

            case 6:
                startWordCell = (questionCellY - 1) + '-' + questionCellX;
                this.wordDirection = 'left';
                break;

            default:
                break;
        }

        var crosswordCell = this.$el.find('.crossword-cell[cellid="' + startWordCell + '"]');

        return crosswordCell;
    },

    clickOnAnswer: function(answerCell, gender) {

        var _answerCell = answerCell.split('-');
        var answerCellY = parseInt(_answerCell[0]);
        var answerCellX = parseInt(_answerCell[1]);
        var startWordCell;
        var objs = this.model.get('objs');
        var actionkey = this.model.get('actionkey');

        var allQuestionCells = this.$el.find('.crossword-cell[celltype="question"]');

        var crossedQuestionCells = [];

        for (var i = 0; i < allQuestionCells.length; i++) {
            var questionCell = $(allQuestionCells[i]);

            if(questionCell.attr('cellx') == answerCellX || questionCell.attr('celly') == answerCellY){
                crossedQuestionCells.push(questionCell);
            }
        };

        _log('allQuestionCells', allQuestionCells);

        var finddedCell;

        var lastD = 0;
        
        //for (var i = crossedQuestionCells.length - 1; i >= 0; i--) {
        for (var i = 0; i < crossedQuestionCells.length; i++) {
               
            var crossedQuestionCell = crossedQuestionCells[i];

            var dX = parseInt(crossedQuestionCell.attr('cellx')) + answerCellX  ;
            var dY = parseInt(crossedQuestionCell.attr('celly')) + answerCellY  ;

            var dX1 = answerCellX - parseInt(crossedQuestionCell.attr('cellx'))    ;
            var dY1 = answerCellY - parseInt(crossedQuestionCell.attr('celly'))    ;
            _log('cellx', parseInt(crossedQuestionCell.attr('cellx')));
            _log('answerCellX', answerCellX);
            _log('answerCellY', answerCellY);

            _log('dX', dX);
            _log('dY', dY);
            _log('dX1', dX1);
            _log('dY1', dY1);

            if (dX1 >= 0 && dY1 >= 0){
                var newD = dX + dY;

                if(newD > lastD){
                 
                    finddedCell = crossedQuestionCell;
                }

                lastD = newD;
            }
                
            // if (dX >= 0 && dY >= 0){
            //    finddedCell.push(crossedQuestionCell);
            // }

        };

        if(finddedCell.length){
            this.clickOnQuestion(finddedCell.attr('cellid'), finddedCell.parent().attr('gender'));
        }

        _log('finddedCell', finddedCell);

    },

    // findWordDirection: function(e) {

    //     //_log('e', e);
    //     //_log_mobile('e', e);

    //     var target = $(e.currentTarget);
    //     var targetX = parseInt(target.attr('cellx'));
    //     var targetY = parseInt(target.attr('celly'));
    //     var targetCell = target.attr('cellid');
    //     var objs = this.model.get('objs');
    //     var found = false;

    //     if (objs[targetCell].type !== 'answer') {

    //         this.clickOnQuestion(targetCell, objs[targetCell].gender);
    //         return;
    //     }

    //     var position = {
    //         x: 0,
    //         y: 0
    //     };
    //     var key;

    //     this.wordDirection = 'left';

    //     position.x = targetX - 1;
    //     position.y = targetY;

    //     key = position.y + '-' + position.x;

    //     if (this.checkQuestionCell(position)) {

    //         if (objs[key].gender == 2) {
    //             this.wordDirection = 'down';
    //             found = true;
    //         }

    //         if (objs[key].gender == 4) {
    //             this.wordDirection = 'left';
    //             found = true;
    //         }
    //     }

    //     position.x = targetX;
    //     position.y = targetY - 1;

    //     key = position.y + '-' + position.x;

    //     if (!found && this.checkQuestionCell(position)) {

    //         if (objs[key].gender == 1) {
    //             this.wordDirection = 'down';
    //             found = true;
    //         }

    //         if (objs[key].gender == 5) {
    //             this.wordDirection = 'left';
    //             found = true;
    //         }
    //     }

    //     position.x = targetX + 1;
    //     position.y = targetY;

    //     key = position.y + '-' + position.x;

    //     if (!found && this.checkQuestionCell(position)) {

    //         if (objs[key].gender == 3) {
    //             this.wordDirection = 'down';
    //             found = true;
    //         }
    //     }

    //     position.x = targetX;
    //     position.y = targetY + 1;

    //     key = position.y + '-' + position.x;

    //     if (!found && this.checkQuestionCell(position)) {

    //         if (objs[key].gender == 6) {
    //             this.wordDirection = 'left';
    //             found = true;
    //         }
    //     }

    //     //_log_mobile('targetCell', targetCell);
    //     //_log_mobile('gender', objs[targetCell].gender);

    //     var crosswordCell = this.$el.find('.crossword-cell[cellid="' + targetCell + '"]');
        
    //     crosswordCell.focus().select();
    //     crosswordCell[0].setSelectionRange(0, 9999);

    //     this.$el.find('.crossword-cell[celltype="answer"]').removeClass('crossword-cell-background-color-mobile');
    //     crosswordCell.addClass('crossword-cell-background-color-mobile');

        
    // },

    // checkQuestionCell: function(position) {

    //     var cols = this.model.get('cols').length;
    //     var rows = this.model.get('rows').length;
    //     var objs = this.model.get('objs');

    //     if (position.x >= 0 && position.y >= 0 && position.x < cols && position.y < rows ) {

    //         var key = position.y + '-' + position.x;

    //         if (objs[key].type === 'question') {
    //             return true;
    //         }
    //     }

    //     return false;

    // },

    prepareAnswers: function() {

        var _that = this;

        var objs = this.model.get('objs');

        var divisionCrossword = {
            answers: {},
            questions: {},
            answersStatus : {}
        };

        var direction;

        _.each(objs, function(val, key) {

            if (val.type === 'question') {

                var _questionCell = key.split('-');
                var questionCellX = parseInt(_questionCell[1]);
                var questionCellY = parseInt(_questionCell[0]);
                var startWordCell;
                var OK = true;

                switch (parseInt(val.gender)) {

                    case 1:
                        startWordCell = (questionCellY + 1) + '-' + questionCellX;
                        direction = 'down';
                        break;

                    case 2:
                        startWordCell = questionCellY + '-' + (questionCellX + 1);
                        direction = 'down';
                        break;

                    case 3:
                        startWordCell = questionCellY + '-' + (questionCellX - 1);
                        direction = 'down';
                        break;

                    case 4:
                        startWordCell = questionCellY + '-' + (questionCellX + 1);
                        direction = 'left';
                        break;

                    case 5:
                        startWordCell = (questionCellY + 1) + '-' + questionCellX;
                        direction = 'left';
                        break;

                    case 6:
                        startWordCell = (questionCellY - 1) + '-' + questionCellX;
                        direction = 'left';
                        break;

                    default:
                        OK = false;
                        break;
                }

                if (OK) {
                    divisionCrossword.answers[key] = _that.prepareFindWord(startWordCell, direction);
                    divisionCrossword.answersStatus[key] = false;
                }
            }

        });

        this.model.set('divisionCrossword', divisionCrossword);

    },

    prepareFindWord: function(startWordCell, direction) {

        var objs = this.model.get('objs');
        var word = [];
        var _startWordCell = startWordCell.split('-');
        var startWordCellX = _startWordCell[1];
        var startWordCellY = _startWordCell[0];
        var letter;

        for (var i = 0; i < 100; i++) {

            if (direction === 'left' && i !== 0) {
                startWordCellX++;
            } else if (direction === 'down' && i !== 0) {
                startWordCellY++
            }

            letterID = startWordCellY + '-' + startWordCellX;

            if (typeof objs[letterID] !== 'undefined' && objs[letterID].type === 'answer' && objs[letterID].text !== '') {
                
                word.push(letterID);

            } else {
                break;
            }
        }

        return word;
    },

    replaceLetters: function() {

        var _that = this;
        var userSelection = this.model.get('userSelection');
        var objs = this.model.get('objs');
        var actionkey = this.model.get('actionkey');

        _.each(userSelection, function(letterVal, letterID) {

            _that.$el.find('.crossword-cell[cellid="' + letterID + '"]').val(letterVal);

        });


        _.each(objs, function(val, key) {

            if (val.type === 'question') {

                var crosswordCell = _that.$el.find('.crossword-cell[cellid="' + key + '"]');

                //_log('key', key);
                //_log('crosswordCell', crosswordCell);
                //_log('val.text', val.text);

                crosswordCell.val(val.text);

                if (val.opts.questionType === 'image') {
                    var imageUrl = __meta__.directLocation + 'exported_view/' + actionkey.split('-').pop() + '/images/' + actionkey + '/' + val.opts.imageFile;
                    _that.$el.find('.crossword-cell[cellid="' + key + '"]').css('background', "url('" + imageUrl + "') no-repeat").css('background-size', 'contain');
                }

                if (val.opts.questionType === 'audio') {
                    _that.$el.find('.crossword-cell[cellid="' + key + '"]').addClass('crossword-cell-audio');
                }
            }
        });

    },

	afterRender: function() {

        var _that = this;

        var divisionCrossword = this.model.get('divisionCrossword');

        if (typeof divisionCrossword === 'undefined') {

            this.prepareAnswers();
        }

        setTimeout(function(){
            _that.replaceLetters();
        });

        this.colorizeGoodAnswer();

        this.startTimer();
	},

    onShow: function() {
        this.onCrosswordResize();
    },

    onCrosswordResize: function() {
        var objectWrapperWidth = this.$el.width();
        var objectWrapperHeight = this.$el.height();


        var qcrosswordWrapper = this.$el.find('.crossword-component-inner');
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

        this.$el.find('.crossword-row').css('height', cell_size + 'px');

        this.$el.find('.crossword-cell-background').css({
            height: cell_size + "px",
            width: cell_size + "px",
            'line-height': cell_size + "px"
        });

        this.$el.find('.crossword-cell[celltype="answer"]').css({
            'line-height': cell_size*0.95 + "px",
            'font-size': cell_size/1.5 + "px"
        });

        this.$el.find('.crossword-cell[celltype="question"]').css({
            'line-height': cell_size/3.5 + "px",
            'font-size': cell_size/3.5 + "px"
        });

        this.$el.find('.crossword-cell-password').css({
            height: cell_size*0.3 + "px",
            width: cell_size*0.3 + "px",
            'line-height': cell_size*0.3 + "px"
        });
    },

    onRemove: function() {

        this.stopTimer();
    },

    checkAnswers: function(){

        return this.checkIsCompleteTimeOut();
    },

    resetExerciseApproachSpecial: function(){
        this.resetTimer();
    },

    renderAsReadyToUse: function(){
        this.render();
        this.onCrosswordResize();
    },


    getAllAnswersCount: function() {

        var divisionCrossword = this.model.get('divisionCrossword');

        var count = Utils.ObjectLength(divisionCrossword.answers);

        return count;
    },
});