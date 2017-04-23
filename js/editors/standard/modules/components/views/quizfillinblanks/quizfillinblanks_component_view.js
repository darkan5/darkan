var QuizFillInBlanksComponentView = TextComponentView.extend({

   className : 'component quizfillinblanks-component quiz',

   template: _.template($('#quizfillinblanks-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'dblclick .text-component-handle': 'startEditing',
            'set-text-editor': 'setTextEditor',
            'dragstart .note-editor': 'preventDragging',
            'mouseup .note-editor': 'showInputOptions',
            'click .change-to-interactive': 'changeSelectionToInteractive',
            'click select': 'openQuizfillInBlanksOptionsWindow',
            'click input': 'openQuizfillInBlanksOptionsWindow',
            'click textarea': 'openQuizfillInBlanksOptionsWindow',
        });
    },

    possibleInteractionTypes: ['input', 'select', 'textarea'],

    lastContents: '',

    afterInitialize :function(){
        this.lastContents = this.model.get('contents');
    },

    onTextChanged: function(contents, $editable){


        // _log('this.lastContents', this.lastContents);
        // _log('contents', contents);

        // var diff = this.diffString( contents, this.lastContents);

        // _log('diff', diff);

        // var html = '';

        // var insert = $(diff).find('ins');

        // _log('insert', insert);

        // for (var i = 0; i < insert.length; i++) {

        //     var innerText =  $(insert[i]).text();
            
        //      _log('ins html', innerText);

        //      html += innerText;
        // };

        // _log('html', html);

        // var component = $(html);

        // var components = component.find('input, textarea, select');

        // if(components.length == 0){

        // }

        // _log('component', component);
        // _log('components', components);

        // //_log('input', input);


        // //_log('onTextChanged contents', contents);
        // //_log('onTextChanged $editable', $editable);

        // this.lastContents = contents;
    },

    openQuizfillInBlanksOptionsWindow: function(e) {
        e.preventDefault();
        var _that = this;
        var answerId = $(e.currentTarget).attr('aid');

        if (answerId) {
            var answers = this.model.get('answers');
            var answerData = answers['#' + answerId];

            if (answerData) {

                var dataForWindow = {
                    answerData:answerData,
                    componentModel: this.model,
                    componentView: this,
                    answerId: answerId
                };
                if (this.optionsWindow) {
                    this.optionsWindow.close();
                }
                this.optionsWindow = WindowFactory.createQuizfillInBlanksOptionsWindow(dataForWindow);
                this.optionsWindow.on('answerChange', function(answerDataChanged) {
                    answerData = answerDataChanged;
                    var answerObject = _that.model.get('answers');
                    answerObject['#' + answerId] = answerDataChanged;
                    _that.model.set('answers', answerObject, {silent: true});
                    _that.model.trigger('change', ['answers']);
                });
                $('body').append(this.optionsWindow.render().$el);


                var left = e.clientX + this.optionsWindow.$el.width()+60;
                var top = e.clientY + this.optionsWindow.$el.height();
                var windowPosition = {
                    left: left,
                    top: top
                };

                this.optionsWindow.setWindowPosition(windowPosition);
                this.optionsWindow.initTags();
            }
        }
    },

    showInputOptions: function(e) {
        var selectedText = this.getSelectionText();
        if (selectedText && selectedText.length > 0) {

            this.showOptionsWrapper(e);
        } else {
            this.hideOptionsWrapper();
        }
    },
    hideOptionsWrapper: function() {
        var optionsWrapper = this.$el.find('.input-options-wrapper');
        optionsWrapper.hide();
    },
    showOptionsWrapper: function(e) {
        var optionsWrapper = this.$el.find('.input-options-wrapper');

        var left = e.clientX - this.$el.offset().left - optionsWrapper.width()/2;
        var top = e.clientY - this.$el.offset().top - optionsWrapper.height()-20;
        optionsWrapper.css({
            left: left + 'px',
            top: top + 'px'
        });

        optionsWrapper.show();
    },

    changeSelectionToInteractive: function(e) {
        var clickedObject = $(e.currentTarget);
        var interactionType = clickedObject.attr('inter');

        this.hideOptionsWrapper();

        if (this.possibleInteractionTypes.indexOf(interactionType) === -1) { return; }

        var selectedText = this.getSelectionText();

        var answerId = this.addNewInputToAnswersObject(selectedText, interactionType);

        var contents = this.replaceSelectedText(interactionType, selectedText, answerId);

        this.model.set('contents', contents, { silent:true });
        this.model.trigger('change', ['incrementQuestion', 'contents', 'answers']);
        this.onTextChanged( this.model.get('contents') );
    },

    addNewInputToAnswersObject: function(replacedText, inputType) {
        var answerId = this.model.get('incrementQuestion');

        var answersObject = this.model.get('answers');

        var goodanswers = [];
        goodanswers.push({
            text: replacedText,
            iscorrect: true
        });

        answersObject['#' + answerId] = {
                                    placeholder : replacedText,
                                    type : inputType,
                                    goodanswers: goodanswers
                                };
        this.model.set('answers', answersObject);

        this.model.set('incrementQuestion', answerId + 1, { silent:true });

        return answerId;
    },

    replaceSelectedText: function(elementType, selectedText, answerId) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var inputElement = document.createElement(elementType);
                // var inputElement = $(elementType, {
                //     placeholder: selectedText
                // });
                $(inputElement).attr({
                    placeholder: selectedText,
                    aid: answerId
                });
                if (elementType == 'select') {
                    $(inputElement).append('<option value="'+ selectedText +'">'+ selectedText +'</option>');
                }

                range.insertNode(inputElement);
            }
        } else if (document.selection && document.selection.createRange) {
            //range = document.selection.createRange();
            // range.text = replacementText;
        }

        return this.$el.find('.note-editable').html();
    },

    getSelectionText: function() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    },


    // acceptNewLineAnswer: function(e) {
    //     this.$el.find('.accept-new-line-answer').css('display', 'none');
    //     this.$el.find('.add-new-line-answer').css('display', 'inline-block');

    //     this.$el.find('.new-line-answer-input').remove();
    // },

    // addNewLineAnswer: function(e) {

    //     this.$el.find('.quiz-body').append('<input class="new-line-answer-input" type="text">');

    //     this.$el.find('.accept-new-line-answer').css('display', 'inline-block');
    //     this.$el.find('.add-new-line-answer').css('display', 'none');
    // },

    // addComponentListeners :function(){
    //     // this.listenTo(this.model, 'change:titleShow', this.renderTitleShow);
    //     this.listenTo(this.model, 'change:multiselect', this.render);
    //     this.listenTo(this.model, 'change:buttonShow', this.renderButtonShow);
    // },

    // renderTitleShow: function(model) {
    //     var display = this.model.get('titleShow') ? 'block' : 'none';
    //     this.$el.find('.quiz-head span').css('display', display);
    // },

    // renderButtonShow: function(model) {
    //     var display = this.model.get('buttonShow') ? 'inline-block' : 'none';
    //     this.$el.find('.quiz-submit-button').css('display', display);
    // },

    // checkGoodAnswer: function(e) {
    //     var it = $(e.target).attr('it');
    //     var answers = this.model.get('answers');
    //     var multiselect = this.model.get('multiselect');

    //     // jesli to singleselect to uwtaw wszystkie odpowiedzi na false
    //     if (!multiselect) {
    //         _.each(answers, function(option, i) {
    //             answers[i].goodAnswer = false;
    //         });
    //     }

    //     answers[it].goodAnswer = $(e.target).is(':checked');

    //     this.model.set('answers', answers);
    //     this.model.trigger('change');
    // },

    // changeAnswerText: function(e) {
    //     var it = $(e.target).attr('it');


    //     var answers = this.model.get('answers');

    //     answers[it].text = $(e.target).val();

    //     this.model.set('answers', answers);
    //     this.model.trigger('change');
    // },

    // addNewAnswer: function(e) {
    //     var answers = this.model.get('answers');
    //     var incrementQuestion = this.model.get('incrementQuestion');

    //     answers['#' + incrementQuestion] = {
    //         text : '',
    //         goodAnswer : false,
    //     };

    //     this.model.set('answers', answers);
    //     this.model.set('incrementQuestion', incrementQuestion + 1);
    //     this.model.trigger('change');

    //     this.unselect();
    //     this.render();
    //     this.startEditing();
    // },

    // answerRemove: function(e) {
    // 	var it = $(e.target).attr('it');


    // 	var answers = this.model.get('answers');

    // 	delete answers[it];

    // 	this.model.set('answers', answers);
    //     this.model.trigger('change');

    //     if (Object.keys(answers).length === 0) {
    //         this.addNewAnswer();
    //     }

    //     this.unselect();
    //     this.render();
    //     this.startEditing();

    // },

    // startEditing: function() {

    //     var canEditing = this.checkIfCanEditing();

    //     if(canEditing == false){
    //         return;
    //     }


    //     this.$el.find('.quizfillinblanks-component-handle').hide();
    //     this.$el.find('.add-new-line-answer').css('display', 'inline-block');

        // var answers = this.$el.find('.answer-text').push();
        // var i = 0;
        // this.$el.find('.answer-text').each(function() {
        //     i++;

        //     var it = $(this).attr('it');

        //     if (i === answers)
        //     	$(this).hide().parent().append('<input class="answer-input" type="text" value="' + $(this).text() + '" it="' + it + '"><div class="answer-remove" it="' + it + '">X</div><div class="add-new-answer">(add)</div>');
        //     else
        //         $(this).hide().parent().append('<input class="answer-input" type="text" value="' + $(this).text() + '" it="' + it + '"><div class="answer-remove" it="' + it + '">X</div>');
        // });
    // },

    beforeUnselect: function(){
        if (this.optionsWindow) {
            this.optionsWindow.close();
        }
        this.hideOptionsWrapper();
    },


    /*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 */

    // escape: function(s) {
    //     var n = s;
    //     n = n.replace(/&/g, "&amp;");
    //     n = n.replace(/</g, "&lt;");
    //     n = n.replace(/>/g, "&gt;");
    //     n = n.replace(/"/g, "&quot;");

    //     return n;
    // },

    // diffString: function( o, n ) {
    //   o = o.replace(/\s+$/, '');
    //   n = n.replace(/\s+$/, '');

    //   var out = this.diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
    //   var str = "";

    //   var oSpace = o.match(/\s+/g);
    //   if (oSpace == null) {
    //     oSpace = ["\n"];
    //   } else {
    //     oSpace.push("\n");
    //   }
    //   var nSpace = n.match(/\s+/g);
    //   if (nSpace == null) {
    //     nSpace = ["\n"];
    //   } else {
    //     nSpace.push("\n");
    //   }

    //   if (out.n.length == 0) {
    //       for (var i = 0; i < out.o.length; i++) {
    //         str += '<del>' + this.escape(out.o[i]) + oSpace[i] + "</del>";
    //       }
    //   } else {
    //     if (out.n[0].text == null) {
    //       for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
    //         str += '<del>' + this.escape(out.o[n]) + oSpace[n] + "</del>";
    //       }
    //     }

    //     for ( var i = 0; i < out.n.length; i++ ) {
    //       if (out.n[i].text == null) {
    //         str += '<ins>' + this.escape(out.n[i]) + nSpace[i] + "</ins>";
    //       } else {
    //         var pre = "";

    //         for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
    //           pre += '<del>' + this.escape(out.o[n]) + oSpace[n] + "</del>";
    //         }
    //         str += " " + out.n[i].text + nSpace[i] + pre;
    //       }
    //     }
    //   }
      
    //   return str;
    // },

    // randomColor: function() {
    //     return "rgb(" + (Math.random() * 100) + "%, " + 
    //                     (Math.random() * 100) + "%, " + 
    //                     (Math.random() * 100) + "%)";
    // },

    // diffString2: function( o, n ) {
    //   o = o.replace(/\s+$/, '');
    //   n = n.replace(/\s+$/, '');

    //   var out = this.diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );

    //   var oSpace = o.match(/\s+/g);
    //   if (oSpace == null) {
    //     oSpace = ["\n"];
    //   } else {
    //     oSpace.push("\n");
    //   }
    //   var nSpace = n.match(/\s+/g);
    //   if (nSpace == null) {
    //     nSpace = ["\n"];
    //   } else {
    //     nSpace.push("\n");
    //   }

    //   var os = "";
    //   var colors = new Array();
    //   for (var i = 0; i < out.o.length; i++) {
    //       colors[i] = this.randomColor();

    //       if (out.o[i].text != null) {
    //           os += '<span style="background-color: ' +colors[i]+ '">' + 
    //                 this.escape(out.o[i].text) + oSpace[i] + "</span>";
    //       } else {
    //           os += "<del>" + this.escape(out.o[i]) + oSpace[i] + "</del>";
    //       }
    //   }

    //   var ns = "";
    //   for (var i = 0; i < out.n.length; i++) {
    //       if (out.n[i].text != null) {
    //           ns += '<span style="background-color: ' +colors[out.n[i].row]+ '">' + 
    //                 this.escape(out.n[i].text) + nSpace[i] + "</span>";
    //       } else {
    //           ns += "<ins>" + this.escape(out.n[i]) + nSpace[i] + "</ins>";
    //       }
    //   }

    //   return { o : os , n : ns };
    // },

    // diff: function( o, n ) {
    //   var ns = new Object();
    //   var os = new Object();
      
    //   for ( var i = 0; i < n.length; i++ ) {
    //     if ( ns[ n[i] ] == null )
    //       ns[ n[i] ] = { rows: new Array(), o: null };
    //     ns[ n[i] ].rows.push( i );
    //   }
      
    //   for ( var i = 0; i < o.length; i++ ) {
    //     if ( os[ o[i] ] == null )
    //       os[ o[i] ] = { rows: new Array(), n: null };
    //     os[ o[i] ].rows.push( i );
    //   }
      
    //   for ( var i in ns ) {
    //     if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
    //       n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
    //       o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
    //     }
    //   }
      
    //   for ( var i = 0; i < n.length - 1; i++ ) {
    //     if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
    //          n[i+1] == o[ n[i].row + 1 ] ) {
    //       n[i+1] = { text: n[i+1], row: n[i].row + 1 };
    //       o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
    //     }
    //   }
      
    //   for ( var i = n.length - 1; i > 0; i-- ) {
    //     if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
    //          n[i-1] == o[ n[i].row - 1 ] ) {
    //       n[i-1] = { text: n[i-1], row: n[i].row - 1 };
    //       o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
    //     }
    //   }
      
    //   return { o: o, n: n };
    // }


});

var QuizFillInBlanksComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizFillInBlanksComponentView);