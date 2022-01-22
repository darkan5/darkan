var QuizDnDComponentView = ExerciseComponentView.extend({

    className : 'component quizdnd-component',

    template: _.template($('#quizdnd-component-template').html()),

    dndtimeouts: [ ],

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click' : 'validateQuestion',
        });
    },

    afterAllInitialized: function(params) {
    	var _that = this;

    	params = params || {};
    	var prepareDraggable = _.isUndefined(params.prepareDraggable) ? true : params.prepareDraggable;


        var draggableObjects = this.model.get('draggableObjs');
        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

    	this.setSpecialScormData();


        draggableObjectsModels.each(function(cModel) {
        	_that.setEndPositionToComponent(cModel.view, cModel);
        });


        var componentStatus = parseInt(this.model.get('compl'));
        // if ( componentStatus != 0 ) { 

		    var containers = _.keys(this.model.get('answers'));
		    
	    	var answers = this.model.get('answers');
	    	var userSelection = this.model.get('userSelection');
			for (var ans in answers) {

				var containerObject = TriggerController.instance.getComponentModelByActionkey([ans]);
				_that.refreshContainers(userSelection[ans], answers[ans], containerObject.at(0));
			}

        if ( componentStatus != 0 ) { 
        	return; 
        }

       
        var fontSize = (this.$el.height()/6) < 15 ? 15 : (this.$el.height()/6);
        this.$el.find('.quiz-dnd-component-inner').css({
            'font-size': fontSize + "px"
        });

        if(prepareDraggable){

	        draggableObjectsModels.each(function(cModel) {
	        	_that.prepareDraggableObject(cModel.view, cModel);
	        });
	    }


        draggableObjectsModels.each(function(cModel) {
        	_that.setDraggable(cModel.view, cModel);
        });


        var containers = _.keys(this.model.get('answers'));
        var containersModels = TriggerController.instance.getComponentModelByActionkey(containers);
        containersModels.each(function(cModel) {
        	// _that.prepareDraggableObject(cModel.view, cModel);
        	_that.setDroppable(cModel.view, cModel);
        });

        _log('userSelection 1', JSON.stringify(userSelection));

        var isEmpty = this.userSelectionIsEmpty();

        _log('isEmpty', isEmpty);

        if(isEmpty){
        	this.distributeAllAnswersInContainerOnStart();
        }


        _log('userSelection 2', JSON.stringify(userSelection));

        //this.refreshContainers();
    },

    refreshDraggableObject: function(cView, cModel) {

    	var ratio = this.getSmallerRatio();

		var originalStartPos = cModel.get('originalStartPos');

		if (originalStartPos) {

			_log('originalStartPos', originalStartPos);
			_log('top i left', cModel.get('x') + ', y: ' + cModel.get('x'));
			_log('-------------------');

			var startPos = {
				leftStartPos: cModel.get('x')*ratio,
				topStartPos: cModel.get('y')*ratio
			};
			cModel.set('startPos', startPos);
		}
    },

	specialRenderDimentions: function() {
		var _that = this;

		try {
			var draggableObjects = this.model.get('draggableObjs');
	        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

	        draggableObjectsModels.each(function(cModel) {
	        	_that.refreshDraggableObject(cModel.view, cModel);
	        });

	        setTimeout(function() {

		        var containers = _.keys(_that.model.get('answers'));
			    
		    	var answers = _that.model.get('answers');
		    	var userSelection = _that.model.get('userSelection');
				for (var ans in answers) {
					var containerObject = TriggerController.instance.getComponentModelByActionkey([ans]);
					_that.refreshContainers(userSelection[ans], answers[ans], containerObject.at(0), false);
				}
	        }, 1);
		} catch(err) {
			_log('error', err, _log.error);
		}
        
	},

    setEndPositionToComponent: function(cView, cModel) {

    	var endPosition = cModel.get('endPosition');

    	_log('setEndPositionToComponent', endPosition);

    	if(endPosition){
    		cView.$el.css('left', endPosition.left + 'px');
    		cView.$el.css('top', endPosition.top + 'px');
    	}
    },

    userSelectionIsEmpty: function() {

    	var userSelection = this.model.get('userSelection');

    	var isEmpty = true;

    	for (var answers in userSelection) {
    		if(userSelection[answers].length > 0){
    			isEmpty = false;
    			break;
    		}
		}	

		return isEmpty;
    },

    setDroppable: function(cView, cModel) {
    	var _that = this;

    	var actionkey = this.model.get('actionkey');

		cView.$el.droppable({

			tolerance: "pointer",
			scope: actionkey,

			// hoverClass: "div-point",

			drop: function(evt, objDropped) {
				var droppedObject = objDropped.draggable[0];
				var droppedObjectModel = TriggerController.instance.getComponentModelByActionkey([$(droppedObject).attr('name')]);
				_that.objectDropped(cModel, droppedObjectModel.at(0));
			}
		});
    },

    isGoodAnswer: function(containerID, droppedID) {
    	var answers = this.model.get('answers');
		if (answers[containerID].pa.indexOf(droppedID) !== -1) {
			return true;
		}
		return false;
    },

    distributeAllAnswersInContainerOnStart: function() {
    	var _that = this;
    	var allAnswers = this.model.get('answers');

    	_log('dnd model', this.model);

    	for (var container in allAnswers) {
    		var goodAnswers = allAnswers[container].pa;

    		var answersModels = TriggerController.instance.getComponentModelByActionkey(goodAnswers);
    		var containerModel = TriggerController.instance.getComponentModelByActionkey([container]).at(0);

    		answersModels.comparator = 'x';
    		answersModels.sort();

    		answersModels.each(function(aModel) {
    			if (_that.objectIsOnContainer(aModel, containerModel)) {
	    			_that.objectDropped(containerModel, aModel);
	    			_that.setEndPosition(aModel, aModel.view.$el);
    			}
    		});
    	}
    },

    objectIsOnContainer: function(objectModel, containerModel) {
        var _that = this;

        if(!containerModel || !objectModel) { return false; }

        var containerEl = containerModel.view.$el;
        var objectEl = objectModel.view.$el;

        var x1 = parseInt(containerModel.get('x'));
        var y1 = parseInt(containerModel.get('y'));
        var x2 = parseInt(containerModel.get('width')) + x1;
        var y2 = parseInt(containerModel.get('height')) + y1;

        var htmlObjectsArray = [];



	    var actualX1 = parseInt(objectModel.get('x'));
	    var actualY1 = parseInt(objectModel.get('y'));
	    var actualX2 = parseInt(objectModel.get('width')) + actualX1;
	    var actualY2 = parseInt(objectModel.get('height')) + actualY1;

	    var allObject = true;

	    var corner1 = _that.checkPosition(actualX1, actualY1, x1, y1, x2, y2);
	    var corner2 = _that.checkPosition(actualX2, actualY1, x1, y1, x2, y2);
	    var corner3 = _that.checkPosition(actualX2, actualY2, x1, y1, x2, y2);
	    var corner4 = _that.checkPosition(actualX1, actualY2, x1, y1, x2, y2);

	    if (corner1 && corner2 && corner3 && corner4) {

	        return true;

	    } else {

	        if (_that.checkRect(x1, y1, x2, y2, actualX1, actualY1, actualX2, actualY2)) {
	            return true;
	        }
	    }

	    return false;
    },

    checkRect: function(firstX1, firstY1, firstX2, firstY2, secondX1, secondY1, secondX2, secondY2) {
        if (firstX1 < secondX2 && firstX2 > secondX1 && firstY1 < secondY2 && firstY2 > secondY1) {
            return true;
        }

        return false;
    },

    checkPosition : function(pointX, pointY, x1, y1, x2, y2) {
        if (pointX >= x1 && pointX <= x2 && pointY >= y1 && pointY <= y2) {
            return true;
        }

        return false;
    },

    sortUserSelectionByObjectsPosition: function() {
    	var _that = this;
    	var allAnswers = this.model.get('answers');
    	var userSelection = this.model.get('userSelection');

    	for (var container in userSelection) {
    		var userAnswers = userSelection[container];

    		if (userAnswers.length) {

	    		var answersModels = TriggerController.instance.getComponentModelByActionkey(userAnswers);


	    		answersModels.each(function(aModel) {
	    			var objectScreenX = parseInt(aModel.view.$el.css('left'));
	    			aModel.set('screenx', objectScreenX);
	    		});

	    		answersModels.comparator = 'screenx';
	    		answersModels.sort();

				var _userSelection = [ ];
				_log('answersModels', answersModels);
				answersModels.each(function(aModel) {
					_log('PUSHING:', aModel.get('actionkey'));
					_userSelection.push(aModel.get('actionkey'));
				});

				userSelection[container] = _userSelection;

				_log('przejście... ilość: ', _userSelection.length);
    		}


    	}

    	this.model.set('userSelection', userSelection);

    	return userSelection;
    },


    setEndPosition: function(cModel, cEl) {
		cModel.set('endPosition', { 
				left: parseInt(cEl.css('left')), 
				top: parseInt(cEl.css('top')) 
			 });

		this.createSpecialScormData();

		_log('stop drag seve end position ', cModel.get('endPosition'));
    },

    objectDropped: function(containerModel, droppedObjectModel) {
    	var _that = this;

		var droppedID = droppedObjectModel.get('actionkey');
		var droppedObject = droppedObjectModel.view.$el;
		var droppableID = containerModel.get('actionkey');

		var success = false;
		var reverted = false;

		var answers = this.model.get('answers');
		var userSelection = this.model.get('userSelection');
		var opts = this.model.get('opts');

		// [onlygoodanswers] - if it's not a good answer - revert object
		if (answers[droppableID].opts.onlygoodanswers === true) {
			if (!(_that.isGoodAnswer(containerModel.get('actionkey'), droppedID))) {
				droppedObject.animate({
					left: droppedObjectModel.get('startPos').leftStartPos + "px",
					top: droppedObjectModel.get('startPos').topStartPos + "px"
				}, 500);
				success = false;
				reverted = true;


			}
		}


		if (!reverted) {
			// check for max answers
			var maxAnswers = parseInt(answers[droppableID].opts.maxAnswers);
			if (typeof maxAnswers === "number") {
				// if (maxAnswers > answers[droppableID].userSelection.length || maxAnswers <= 0) {
				// 	answers[droppableID].userSelection.push(droppedID);
				if (userSelection[droppableID] && (maxAnswers > userSelection[droppableID].length || maxAnswers <= 0)) {
					userSelection[droppableID].push(droppedID);
					success = true;
				} else {
					droppedObject.animate({
						left: droppedObjectModel.get('startPos').leftStartPos + "px",
						top: droppedObjectModel.get('startPos').topStartPos + "px"
					}, 500);	
					success = false;
				}
			} else {
				// push object id to user selection when dropped
				// answers[droppableID].userSelection.push(droppedID);
				userSelection[droppableID].push(droppedID);
				success = true;
			}
		}

		if (success) {
			if (answers[droppableID].opts.autoArrangeAnswers === false) {
				this.setEndPosition(droppedObjectModel, droppedObject);
			}	
		}



		if (success && opts.disableOnGoodDrop && answers[droppableID].opts.onlygoodanswers) {
			droppedObject.draggable("disable");
			var containerLabel = containerModel.view.$el.attr('aria-label');
			var objectLabel = droppedObject.attr('aria-label');
			containerModel.view.$el.attr('aria-label-org', containerLabel);
			containerModel.view.$el.attr('aria-label', "Upuszczono prawidłowo, " + containerLabel + ", " + objectLabel);
			containerModel.view.$el.focus();

			if (typeof droppedObject.attr('tabindex') !== "undefined") {
				droppedObject.attr('tabindexorg', droppedObject.attr('tabindex'));
				droppedObject.removeAttr('tabindex');
			}
		}

		containerModel.view.trigger('onDropToObject');

		if (_that.isGoodAnswer(containerModel.get('actionkey'), droppedID)) {
			droppedObjectModel.view.trigger('onDropGoodAnswer');
		} else {
			droppedObjectModel.view.trigger('onDropWrongAnswer');
		}

		_that.refreshContainers(userSelection[droppableID], answers[droppableID], containerModel);
    },

    setDraggable: function(cView, cModel) {
    	var _that = this;

    	var actionkey = this.model.get('actionkey');


		var pointerX;
		var pointerY;
		cView.$el.draggable({

			scope: actionkey,
			disabled: false,

			revert: function(droppedOn) {
				_that.revertObject(droppedOn, cView.$el, cModel);
			},

			drag: function(evt, ui) {
				evt.stopPropagation();
				// evt.preventDefault();
			},

			start: function(evt, ui) {
				evt.stopPropagation();
				// evt.preventDefault();
				_that.startDragging(cView.$el, cModel);
				cView.$el.css({'z-index': 990});
				cView.trigger('onStartDrag');
			},

			stop: function(evt) {
				evt.stopPropagation();
				// evt.preventDefault();
				cView.$el.css({'z-index': ''});
				cView.trigger('onStopDrag');
			}
		});
		
    	cView.$el.on('mousedown', function(e) {e.preventDefault(); e.stopPropagation(); });
    	cView.$el.on('touchmove', function(e) { e.stopPropagation(); });
    	cView.$el.on('touchstart', function(e) { e.stopPropagation(); });
    },

    startDragging: function(draggedObject, draggedObjectModel) {
    	var _that = this;

		// draggedObject.css('z-index', 990);
		draggedObject.attr('aria-grabbed', 'true');

		var draggedObjectID = draggedObjectModel.get('actionkey');

		var answers = this.model.get('answers');
		var userSelection = this.model.get('userSelection');


		for (var ans in answers) {
			// var indexOfObject = answers[ans].userSelection.indexOf(draggedObjectID);
			var indexOfObject = userSelection[ans].indexOf(draggedObjectID);
			var containerObject = TriggerController.instance.getComponentModelByActionkey([ans]);
			if (indexOfObject !== -1) {
				// answers[ans].userSelection.splice(indexOfObject, 1);
				userSelection[ans].splice(indexOfObject, 1);
				_that.refreshContainers(userSelection[ans], answers[ans], containerObject.at(0));
			}
		}
    },

    revertObject: function(droppedOn, droppedObject, droppedObjectModel) {
    	var revertObject = this.model.get('opts').revertObjects;
		if (droppedOn === false && revertObject === true) {
			droppedObject.animate({
				left: droppedObjectModel.get('startPos').leftStartPos + "px",
				top: droppedObjectModel.get('startPos').topStartPos + "px"
			}, 500);
		}

		if (droppedOn === false){
			droppedObjectModel.unset('endPosition');
			this.createSpecialScormData();
		}
    },

    prepareDraggableObject: function(cView, cModel) {
    	var actionkey = cModel.get('actionkey');
    	cView.$el.attr('name', actionkey);
    	cView.$el.css('cursor', 'pointer');

		if (typeof cView.$el.attr('tabindexorg') !== "undefined") {
			cView.$el.attr('tabindex', cView.$el.attr('tabindexorg'));
		}

		var startPos = cModel.get('startPos');
		if (_.isObject(startPos)) {
			cView.$el.css({
				left: startPos.leftStartPos,
				top: startPos.topStartPos,
				opacity: 1
			});
		}

		startPos = {
			leftStartPos: parseInt(cView.$el.css('left')),
			topStartPos: parseInt(cView.$el.css('top'))
		};
		cModel.set('startPos', startPos);
		cModel.set('originalStartPos', startPos);

		cView.$el.removeClass('bounceOut');
    },

	refreshContainers: function(userSelection, dndObject, containerModel, animate) {
		var _that = this;

		animate = _.isUndefined(animate) ? true : animate;

        if(containerModel == undefined || userSelection == undefined) {
            return;
        }

		var containerScreenObject = containerModel.view.$el;

		var position = {
			leftPos : parseInt(containerScreenObject.css('left')),
			topPos  : parseInt(containerScreenObject.css('top'))
		}

		var containerID = containerModel.get('actionkey');

		var previousElem;

		var highestElemValue = 0;

		for (var i = 0; i < userSelection.length; i++) {
			var answerID = userSelection[i];

			var answerObjectModels = TriggerController.instance.getComponentModelByActionkey([answerID]);
			var answerObjectModel = answerObjectModels.at(0);
			var answerObject = answerObjectModel.view.$el;

			if (dndObject.opts.dropandhide === true) {

				if (!answerObject.hasClass('bounceOut')) {

					// change animation time for bounce
					var actualAnimationTime = answerObject.css("animation-duration");
					answerObject.attr('animation-time', actualAnimationTime);
				    answerObject.css("animation-duration", "1s");
			        answerObject.css("-webkit-animation-duration", "1s");

					answerObject.addClass('animated');
					answerObject.addClass('bounceOut');

					answerObject.attr( 'tabindex-b', answerObject.attr('tabindex') );
					answerObject.removeAttr( 'tabindex');


					var answerObjectTimeout = setTimeout(function() {
											answerObject.removeClass('bounceOut');
											answerObject.removeClass('animated');
											answerObject.hide();
											answerObject.css( "animation-duration", answerObject.attr('animation-time') );
										}, 1000);

					(function(answerObject) {
						setTimeout(function() {
							answerObject.attr( 'tabindex', answerObject.attr('tabindex-b') );
						}, 1000);
					})(answerObject);

					_that.dndtimeouts.push(answerObjectTimeout);
				}

			} else {
				// answerObject.css('z-index', 900 + i );
				if (dndObject.opts.autoArrangeAnswers || typeof dndObject.opts.autoArrangeAnswers === 'undefined') {
					if (typeof previousElem !== "undefined") {
						if (highestElemValue < previousElem.height()) {
							highestElemValue = previousElem.height();
						}


						if ( (position.leftPos + previousElem.width() + answerObject.width() ) > (parseInt(containerScreenObject.css('left')) + containerScreenObject.width() ) ) {
							position.leftPos = parseInt(containerScreenObject.css('left'));
							position.topPos += highestElemValue;
						} else {
							position.leftPos += previousElem.width();
						}
					}

					if (position.topPos >= (containerScreenObject.height() + parseInt(containerScreenObject.css('top'))) ){
						position.topPos = parseInt(containerScreenObject.css('top'));
					}
					if (animate) {
						answerObject.animate({
							left: position.leftPos + "px",
							top: position.topPos + "px"
						}, 500);	
					} else {
						answerObject.css({
							left: position.leftPos + "px",
							top: position.topPos + "px"
						});	
					}
				}else{
					
				}
			}

			previousElem = answerObject;

		};

	},

  //   validateQuestion: function() {
		// var success = this.checkAnswers();

  //   	var feedbackWindow = new FeedbackView();
  //   	var content = success ? 'GIT' : 'LIPA';

		// $(__meta__.darkanContainer).append(feedbackWindow.render({content: content}).$el);
		// feedbackWindow.centerWindow();
  //   },

    checkAnswers: function() {
		var _that = this;


		var containersStatus = { };

		var allUserAnswers = { };

		var badAnswers = { };

		var atLeastOneAnswerHasBennDrawed = false;

		var allAnswers = this.model.get('answers');
		var userSelection = this.model.get('userSelection');

		for (var container in allAnswers) {

			containersStatus[container] = true;

			var iteratedOnlyOnce = false;
			if (!allAnswers[container].opts.autoArrangeAnswers && allAnswers[container].opts.forceGoodSequence) {
				if (!iteratedOnlyOnce) {
					userSelection = _that.sortUserSelectionByObjectsPosition();
					iteratedOnlyOnce = true;
				}
			}


			var userAnswers = userSelection[container];
			var goodAnswers = allAnswers[container].pa;

			allUserAnswers[container] = [ ];
			for (var ua = userAnswers.length - 1; ua >= 0; ua--) {
				allUserAnswers[container].push(userAnswers[ua]);
			};

			badAnswers[container] = [ ];

			// if (userAnswers.length === goodAnswers.length) {




				for (var a = userAnswers.length - 1; a >= 0; a--) {
					if ( goodAnswers.indexOf(userAnswers[a]) === -1 ) {
						containersStatus[container] = false;
						badAnswers[container].push(userAnswers[a]);
					} else {

						if (allAnswers[container].opts.forceGoodSequence) {
							if (a !== goodAnswers.indexOf(userAnswers[a])) {
								containersStatus[container] = false;
								badAnswers[container].push(userAnswers[a]);
							}
						}

					}
					atLeastOneAnswerHasBennDrawed = true;
				};
			// } else {
			// 	containersStatus[container] = false;
			// }
			// jesli nie zgadza sie ilosc dobrych odpowiedzi z usera odpowiedziami
			if (userAnswers.length !== goodAnswers.length) {
				containersStatus[container] = false;
			}

			// if (allAnswers[container].opts.forceGoodSequence) {
			// 	alert('forcing good sequence');
			// }

			// jesli ilosc sie nie zgadza, ale jest ustawione enoughAnswers 
			if (parseInt(allAnswers[container].opts.enoughAnswers) !== 0) {
				if ((allUserAnswers[container].length - badAnswers[container].length) >= allAnswers[container].opts.enoughAnswers) {
					containersStatus[container] = true;
				}
			}
		}


		var answersStatus = {
			questionIsPassed: true
		};

		for (var stat in containersStatus) {
			if (!containersStatus[stat]) {
				answersStatus.questionIsPassed = false;
			}
		}



		if (answersStatus.questionIsPassed) {
			// _that.quiz_dndMarkQuestionAsPassed(ob, screenOb);
		} else {

			for (var container in allAnswers) {
				// if revertType is not none...
				// _log(allAnswers[container]);
				if (allAnswers[container].opts.revertType != "revertNone") {

					// Revert only bad answers
					if (allAnswers[container].opts.revertType === "revertOnlyBad") {
						for (var ba = badAnswers[container].length - 1; ba >= 0; ba--) {

								var badAnswerID = badAnswers[container][ba];
								var indexOfBadAnswer = userSelection[container].indexOf(badAnswerID);

								userSelection[container].splice(indexOfBadAnswer, 1);

								var cModel = TriggerController.instance.getComponentModelByActionkey([badAnswerID]).at(0);
								var screenObject = cModel.view.$el;

								for (var i = _that.dndtimeouts.length - 1; i >= 0; i--) {
									clearTimeout(_that.dndtimeouts[i]);
								};

								screenObject.removeClass('bounceOut');
								screenObject.removeClass('animated');

								if (typeof screenObject.attr('tabindex-b') !== "undefined") {
									screenObject.attr( 'tabindex', screenObject.attr('tabindex-b') );
								}

								screenObject.show();


								screenObject.animate({
										left: cModel.get('startPos').leftStartPos + "px",
										top: cModel.get('startPos').topStartPos + "px"
								}, 500);

						};
					}

					// Revert all user answers from container
					if (allAnswers[container].opts.revertType === "revertAll") {
						for (var aua = allUserAnswers[container].length - 1; aua >= 0; aua--) {

							var cModel = TriggerController.instance.getComponentModelByActionkey([allUserAnswers[container][aua]]).at(0);
							var screenObject = cModel.view.$el;

							for (var i = _that.dndtimeouts.length - 1; i >= 0; i--) {
								clearTimeout(_that.dndtimeouts[i]);
							};

							screenObject.removeClass('bounceOut');
							screenObject.removeClass('animated');

							if (typeof screenObject.attr('tabindex-b') !== "undefined") {
								screenObject.attr( 'tabindex', screenObject.attr('tabindex-b') );
							}

							screenObject.show();

							screenObject.animate({
								left: cModel.get('startPos').leftStartPos + "px",
								top: cModel.get('startPos').topStartPos + "px"
							}, 500);

							screenObject.draggable("enable");
						};


						userSelection[container] = [ ];
						_that.distributeAllAnswersInContainerOnStart();
					}
				}
			}
		}


		return answersStatus.questionIsPassed;
    },

    renderAsFailed: function() {

    	var _that = this;

        this.$el.css({
            opacity: '.7'
        });

        var draggableObjects = this.model.get('draggableObjs');
        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

        draggableObjectsModels.each(function(cModel) {
        	cModel.view.$el.draggable({ disabled: true })/*.css({opacity: '.7'})*/;
        });

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-failed');
        }



    },

    renderAsCompleted: function() {

    	var _that = this;

        this.$el.css({
            opacity: '.7'
        });

        var draggableObjects = this.model.get('draggableObjs');
        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

        draggableObjectsModels.each(function(cModel) {
        	cModel.view.$el.draggable({ disabled: true })/*.css({opacity: '.7'})*/;
        });

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-passed');
        }


    },

    renderAsReadyToUse: function() {
        this.$el.css({
            opacity: '1'
        });

        var draggableObjects = this.model.get('draggableObjs');
        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

        draggableObjectsModels.each(function(cModel) {
        	cModel.view.$el.draggable().css({opacity: '1'});

        });

        this.$el.removeClass('mark-questions-passed');
        this.$el.removeClass('mark-questions-failed');
    },

    revertAllAnswers: function(){

    	var _that = this;

		var allUserAnswers = { };

		var badAnswers = { };

		var allAnswers = this.model.get('answers');
		var userSelection = this.model.get('userSelection');

		for (var container in allAnswers) {

			var userAnswers = userSelection[container];
			var goodAnswers = allAnswers[container].pa;

			allUserAnswers[container] = [ ];
			for (var ua = userAnswers.length - 1; ua >= 0; ua--) {
				allUserAnswers[container].push(userAnswers[ua]);
			};
		

	    	// Revert all user answers from container
			for (var aua = allUserAnswers[container].length - 1; aua >= 0; aua--) {

				var cModel = TriggerController.instance.getComponentModelByActionkey([allUserAnswers[container][aua]]).at(0);
				var screenObject = cModel.view.$el;

				for (var i = _that.dndtimeouts.length - 1; i >= 0; i--) {
					clearTimeout(_that.dndtimeouts[i]);
				};

				screenObject.removeClass('bounceOut');
				screenObject.removeClass('animated');

				if (typeof screenObject.attr('tabindex-b') !== "undefined") {
					screenObject.attr( 'tabindex', screenObject.attr('tabindex-b') );
				}

				screenObject.show();

				screenObject.animate({
					left: cModel.get('startPos').leftStartPos + "px",
					top: cModel.get('startPos').topStartPos + "px"
				}, 500);

				screenObject.draggable("enable");
			};


			userSelection[container] = [ ];

		}

		this.model.set('userSelection', userSelection);

    },

    resetExerciseApproach: function(){

    	this.resetPoints();

        this.resetAttempts();
        this.resetCompl();

        this.resetExerciseApproachSpecial();
        
        this.initUserSelectionObject();

        this.renderAsReadyToUse();

        _log('resetExerciseApproach', this.model);

    },

    resetExerciseApproachSpecial: function(){
        this.revertAllAnswers();

        this.afterAllInitialized({ prepareDraggable:false });
    },


    createSpecialScormData: function(){

    	var objects = {};

    	var draggableObjects = this.model.get('draggableObjs');
        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

        draggableObjectsModels.each(function(cModel) {

        	var splittedObjectID = cModel.get('actionkey').split("-");

        	var endPosition = cModel.get('endPosition');

        	if(endPosition){
        		var x = endPosition.left;
	        	var y = endPosition.top;

	        	objects[splittedObjectID[1]] = {
	        		x:x,
	        		y:y
	        	} 
        	}
        });


        if(Utils.ObjectLength(objects)){

        	this.model.set('scormSpecialData', { o:objects });
        }

        return this.model.get('scormSpecialData');

    },

    setSpecialScormData: function(){

    	var scormSpecialData = this.model.get('scormSpecialData');

    	 _log('scormSpecialData', scormSpecialData);


    	if(!scormSpecialData){ return }

    	
        var objects = scormSpecialData.o;

    	var draggableObjects = this.model.get('draggableObjs');
        var draggableObjectsModels = TriggerController.instance.getComponentModelByActionkey(draggableObjects);

        _log('setSpecialScormData draggableObjectsModels', draggableObjectsModels);

        draggableObjectsModels.each(function(cModel) {

        	var splittedObjectID = cModel.get('actionkey').split("-");

        	var cIndex = splittedObjectID[1];

        	var oneObject = objects[cIndex];

        	_log('oneObject', oneObject);

        	if(oneObject){
        		var left = oneObject.x;
        		var top = oneObject.y;

        		cModel.set('endPosition', { left:left, top:top });
        	}
        });
    },

});