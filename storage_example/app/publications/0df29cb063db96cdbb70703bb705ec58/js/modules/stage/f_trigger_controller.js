var TriggerController = Backbone.Controller.extend({

	initialize: function() {

	},

	setPageModel: function(model) {
		this.model = model;
	},

	setProjectModel: function(model) {
		this.projectModel = model;
        ProjectModel.instance = model;
	},

	execute: function(whattodo, sender, objs, opts, e, whenopts, whendoit) {

		var type = sender.model.get('type');

		// _log('objs', objs);
		// _log('opts', opts);
		// _log('whattodo', whattodo);
		// _log('whendoit', whendoit);

		switch(type){
			case 'video':


				switch(whendoit){
					case 'onVideoLoaded':

						if(this[whattodo]){
							this[whattodo](sender, objs, opts, e);
						}

						break;

					case 'onVideoEnded':

						if(this[whattodo]){
							this[whattodo](sender, objs, opts, e);
						}

						break;

					case 'onVideoTimeUpdate':
					
						var video = whenopts.video == undefined ? {} : whenopts.video;

						var time1 = parseFloat(video.time1);
						var time2 = parseFloat(video.time2);

						var currentTime = e.currentTarget.currentTime;


						// _log('time1', time1);
						// _log('time2', time2);
						// _log('currentTime', currentTime);
						

						if(currentTime >= time1 && currentTime <= time2){

							if(!opts.video.isExecuted){
								if(this[whattodo]){
									this[whattodo](sender, objs, opts, e);
								}
							}

							opts.video.isExecuted = true;
						}

						break;	

				default:

					if(this[whattodo]){
						this[whattodo](sender, objs, opts, e);
					}

					break;	
				}		


				break;

			default:

				if(this[whattodo]){
					this[whattodo](sender, objs, opts, e);
				}

				break;	
		}
	},

	checkConditions: function(sender, conditions) {
		var _that = this;


		// if we have no conditions - just return true
		_log('COND', conditions, _log.error);
		if (conditions.length === 0) { return true; }

		var resultArray = [ ];

		// for (var c in conditions) {
		for (var c = 0; c < conditions.length; c++) {
			
			var conditionPassed = true;

			// get right side compare value basing on input or variable
			var valueToCompare;
			if (conditions[c].actionType === "variable") {
				valueToCompare = _that.getVariableByHash(conditions[c].compareValue).pvarvalue;
			} else {
				valueToCompare = conditions[c].compareValue;
			}

			// if left side variable is not set - continue to next condition
			if (typeof _that.getVariableByHash(conditions[c].variable) === "object") {
				var variableLeftSide = _that.getVariableByHash(conditions[c].variable).pvarvalue;
			} else {
				continue;
			}

			// get compare action
			var compareAction = conditions[c].action.split('-');

			// debug.log("compareAction: " + compareAction[1]);
			switch (compareAction[1]) {
				case 'equals':
					// debug.log(variableLeftSide + " == " + valueToCompare);
					if (! (variableLeftSide == valueToCompare) ) {
						conditionPassed = false;
					}
					break;
				case 'lessthan':
				_log('LESSTHAN', parseFloat(variableLeftSide));
				_log('LESSTHAN', '<');
				_log('LESSTHAN', parseFloat(valueToCompare));
					// debug.log(variableLeftSide + " < " + valueToCompare);
					if (! (parseFloat(variableLeftSide) < parseFloat(valueToCompare)) ) {
						conditionPassed = false;
					}
					break;
				case 'greaterthan':
					// debug.log(variableLeftSide + " > " + valueToCompare);
					if (! (parseFloat(variableLeftSide) > parseFloat(valueToCompare)) ) {
						conditionPassed = false;
					}
				case 'greaterthanorequal':
					// debug.log(variableLeftSide + " >= " + valueToCompare);
					if (! (parseFloat(variableLeftSide) >= parseFloat(valueToCompare)) ) {
						conditionPassed = false;
					}
					break;
				case 'lessthanorequal':
					// debug.log(variableLeftSide + " <= " + valueToCompare);
					if (! (parseFloat(variableLeftSide) <= parseFloat(valueToCompare)) ) {
						conditionPassed = false;
					}
					break;
				case 'modulo':
					if (! (parseFloat(variableLeftSide)%2 == parseFloat(valueToCompare)) ) {
						conditionPassed = false;
					}
					break;
			}

			var andArray = [ ];

			if ( c !== 0 ){
				if (conditions[c-1].andor === "and" || conditions[c-1].andor === "" ) {
					andArray = resultArray[resultArray.length-1];
				}
			}

			andArray.push(conditionPassed);

			if (c === 0) {
				resultArray.push(andArray);
			} else {
				if (conditions[c-1].andor === "and") {
					resultArray[resultArray.length-1] = andArray;
				} else {
					resultArray.push(andArray);
				}
			}
		}

		var allOrConditions = [ ];

		for (var r in resultArray) {
			var orValue = true;
			for (var andR in resultArray[r]) {
				if (resultArray[r][andR] === false) {
					orValue = false;
				}
			}
			allOrConditions.push(orValue);
		}


		_log('CONDITIONS', allOrConditions);

		if (allOrConditions.indexOf(true) !== -1) {
			return true;
		} else {
			return false;
		}
	},

	showLine: function(sender, objs, opts) {
		var componentsModels = this.getLineComponentsModels(objs);
		componentsModels.each(function(cModel) {
			cModel.view.showComponentWithTrigger(opts);
		});


		var rowsModel = [];
		var linesNames = [];
		var linesId = objs;

		var pageTimelineRows = this.model.get('lines');

		pageTimelineRows.each(function(rowModel){
			var rowId = rowModel.get('options').get('id').toString();
			if (_.indexOf(linesId, rowId) !== -1) {
				rowsModel.push(rowModel);
			}

		});	

		for (var i = 0; i < rowsModel.length; i++) {
			var rowModel = rowsModel[i];

			var rOptions = rowModel.get('options');

			linesNames.push(rOptions.get('rowName') || rowModel.collection.indexOf(rowModel) + 1);
		};

		var lines = linesNames.join(',');


		ProjectModel.instance.changeProjectStaticVariable('_current_lines', '[' + lines + ']' );
	},

	hideLine: function(sender, objs, opts) {
		var componentsModels = this.getLineComponentsModels(objs);
		componentsModels.each(function(cModel) {
			cModel.view.hideComponentWithTrigger(opts);
		});
	},

	showObject: function(sender, objs, opts) {

		var componentsModels = this.getComponentModelByActionkey(objs);
		componentsModels.each(function(cModel) {
			cModel.view.showComponentWithTrigger(opts);
		});
	},

    makeTransition: function(sender, objs, opts) {

        // _log('makeTransition', sender);

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {

            cModel.view.makeTransition(opts);
        });
    },

    changeStyle: function(sender, objs, opts) {

        // _log('changeStyle', sender);

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {

            cModel.view.changeStyle(opts);
        });
    },

    

    playVideo: function(sender, objs, opts) {

        // _log('playVideo', sender);

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {

            cModel.view.playVideo(opts);
        });
    },

    stopVideo: function(sender, objs, opts) {

        // _log('stopVideo', sender);

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {

            cModel.view.stopVideo(opts);
        });
    },

    pauseVideo: function(sender, objs, opts) {

        // _log('pauseVideo', sender);

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {

            cModel.view.pauseVideo(opts);
        });
    },

    goToPositionVideo: function(sender, objs, opts) {

        // _log('goToPositionVideo', sender);

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {

            cModel.view.goToPositionVideo(opts);
        });
    },

	showObjectAndFocus: function(sender, objs, opts) {
		// TODO: dodać focus
		var componentsModels = this.getComponentModelByActionkey(objs);
		componentsModels.each(function(cModel) {
			cModel.view.showComponentWithTrigger(opts);
		});
	},

	hideObject: function(sender, objs, opts) {
		var componentsModels = this.getComponentModelByActionkey(objs);
		componentsModels.each(function(cModel) {
			cModel.view.hideComponentWithTrigger(opts);
		});
	},

	gotopage: function(sender, objs, opts) {
		var pageModel = this.getPageByID(objs);
		if (pageModel) {
			this.projectModel.trigger('go-to-page-model', pageModel);
		}
	},

	goToPage: function(data) {

		var pageIndex = parseInt(data.pageIndex);
		var pageModel = this.projectModel.get('pages').at(pageIndex);

		if (pageModel) {
			this.projectModel.trigger('go-to-page-model', pageModel);
		}
	},

	gotonextpage: function(sender, objs, opts) {
		this.projectModel.trigger("go-to-next-page");
	},

	gotoprevpage: function(sender, objs, opts) {
		this.projectModel.trigger("go-to-previous-page");
	},

	playobjectsound: function(sender, objs, opts) {
		var componentsModels = this.getComponentModelByActionkey(objs);
		componentsModels.each(function(cModel) {
			cModel.view.playComponentAudio();
		});
	},

	pauseobjectsound: function(sender, objs, opts) {
		var componentsModels = this.getComponentModelByActionkey(objs);
		componentsModels.each(function(cModel) {
			cModel.view.pauseComponentAudio();
		});
	},

	stopobjectsound: function(sender, objs, opts) {
		var componentsModels = this.getComponentModelByActionkey(objs);
		componentsModels.each(function(cModel) {
			cModel.view.stopComponentAudio();
		});
	},

	unlockpagenavigation: function(sender, objs, opts) {
        StageView.instance.unlockNavigationButtons();
	},

	resetquestions: function(sender, objs, opts) {

	},

	changevarvalue: function(sender, objs, opts, e) {

		if (e) {
			e.blockPoints = _.isUndefined(e.blockPoints) ? false : e.blockPoints;
			if (e.blockPoints) { return; }	
		}

		var variableData = objs;

		if ( _.isObject(variableData) ) {

			// get variable decimial places
			var decimalPlaces = 0;

			// get variable value
			var variableDataValue = variableData.varValue;

			// if variable value is a number - parse it to properly add and subtract
			var variable = this.getVariableByHash(variableData.varName);
			if (!isNaN(variable.pvarvalue)) {
				variable.pvarvalue = parseFloat(variable.pvarvalue);
			}
			// same thing to changing value
			if (!isNaN(variableData.varValue)) {
				decimalPlaces = this.getDecimalPlaces(variableData.varValue);
				variableDataValue = parseFloat(variableDataValue);
			}



			// save actual variable value to "pvarvaluePrevious" just in case
			// _that.course.opts.trigger[variableData.varName]['pvarvaluePrevious'] = _that.course.opts.trigger[variableData.varName]['pvarvalue'];


			switch (variableData.varAction) {

				// EVERY TIME
				case 'add':
					this.setProjectVariableValue(
							variableData.varName,
							variable.pvarvalue + variableDataValue,
							decimalPlaces
						); 
					break;

				case 'subtract':
					this.setProjectVariableValue(
							variableData.varName,
							variable.pvarvalue - variableDataValue,
							decimalPlaces
						);
					break;

				case 'changevalue':
					this.setProjectVariableValue(
							variableData.varName,
							variableDataValue,
							decimalPlaces
						);
					break;

				// ONCE
				case 'addonce':
					if (variableData.done !== true) {
						this.setProjectVariableValue(
							variableData.varName,
							variable.pvarvalue + variableDataValue,
							decimalPlaces
						);
						variableData.done = true;
					}
					
					break;

				case 'subtractonce':
					if (variableData.done !== true) {
						this.setProjectVariableValue(
							variableData.varName,
							variable.pvarvalue - variableDataValue,
							decimalPlaces
						);
						variableData.done = true;
					}
					break;

				case 'changevalueonce':
					if (variableData.done !== true) {
						this.setProjectVariableValue(
							variableData.varName,
							variableDataValue,
							decimalPlaces
						);
						variableData.done = true;
					}
					break;
			}

		}
	},

	getDecimalPlaces: function(n) {
		  // Make sure it is a number and use the builtin number -> string.
		  var s = n;//"" + (+n);
		  // Pull out the fraction and the exponent.
		  var match = /(?:\.(\d+))?(?:[eE]([+\-]?\d+))?$/.exec(s);
		  // NaN or Infinity or integer.
		  // We arbitrarily decide that Infinity is integral.
		  if (!match) { return 0; }
		  // Count the number of digits in the fraction and subtract the
		  // exponent to simulate moving the decimal point left by exponent places.
		  // 1.234e+2 has 1 fraction digit and '234'.length -  2 == 1
		  // 1.234e-2 has 5 fraction digit and '234'.length - -2 == 5
		  return Math.max(
		      0,  // lower limit.
		      (match[1] == '0' ? 0 : (match[1] || '').length)  // fraction length
		      - (match[2] || 0));  // exponent
	},


	setProjectVariableValue: function(varID, varValue, decimalPlaces) {
		var _that = this;

		var variable;

		if (varID.length === 32) {

			decimalPlaces = decimalPlaces || 0;

			variable = _that.getVariableByHash(varID);

			if (_.isObject(variable)) {
				
				if (!isNaN(varValue)) {
					varValue = varValue.toFixed(decimalPlaces);
					// _log('varValue', varValue);
					// _log('decimalPlaces', decimalPlaces);

					if (this.getDecimalPlaces(varValue) > 2) {
						varValue = varValue.toFixed(2);
					}	
				}
				variable.pvarvalue = varValue;
			}

			if (varID === '00000000000000000000000000000000') {
				_that.calculatePrecentScore();
			}

			if (varID === '00000000000000000000000000000003') {

				var darkanCourseAplicationAPI = DarkanCourseAplicationAPI.getInstance();
        		darkanCourseAplicationAPI.diamondsChanged({ variable:variable });
			}

		}

		// TriggerController.instance.projectModel.get('options').trigger('change');
		this.projectModel.get('options').trigger('change');
        this.trigger('check-course-status');
	},

	calculatePrecentScore: function() {

		var maxScore = parseInt(this.getVariableByHash('00000000000000000000000000000001').pvarvalue);
		var score = parseInt(this.getVariableByHash('00000000000000000000000000000000').pvarvalue);

		var percentScore = this.getVariableByHash('00000000000000000000000000000002');

		if (maxScore == 0) {
			percentScore.pvarvalue = 0;
		} else {
			percentScore.pvarvalue = (score / maxScore * 100).toFixed(0);
		}

		if (maxScore == 0 && score > maxScore) {
			percentScore.pvarvalue = 100;
		}

		if (percentScore.pvarvalue < 0) {
			percentScore.pvarvalue = 0;
		}

		if (percentScore.pvarvalue > 100) {
			percentScore.pvarvalue = 100;
		}


	},

	getVariableByHash: function(hash) {
		var _that = this;

		var staticVariables = this.projectModel.get('options').get('staticVariables');

		for (var i=0; i < staticVariables.length; i++) {
			if (staticVariables[i].varhash === hash) {
				return staticVariables[i];
			}	
		}

		var projectVariables = this.projectModel.get('options').get('projectVariables');

		for (var i=0; i < projectVariables.length; i++) {
			if (projectVariables[i].varhash === hash) {
				return projectVariables[i];
			}	
		}

		return false;
	},

	getComponentModelByActionkey: function(actionkeys) {
		var _that = this;

		var foundModels = new ComponentsCollection();

		var pageTimelineRows = this.model.get('lines');

		pageTimelineRows.each(function(rowModel){
			var rowComponents = rowModel.get('objects');
			rowComponents.each(function(cModel) {
				if (_.indexOf(actionkeys, cModel.get('actionkey')) !== -1) {
					foundModels.add(cModel);
				}
			});
		});	

		return foundModels;
	},

	getLineComponentsModels: function(linesId) {
		var _that = this;

		var foundModels = new ComponentsCollection();

		var pageTimelineRows = this.model.get('lines');

		pageTimelineRows.each(function(rowModel){
			var rowId = rowModel.get('options').get('id').toString();
			if (_.indexOf(linesId, rowId) !== -1) {
				var rowComponents = rowModel.get('objects');
				rowComponents.each(function(cModel) {
					foundModels.add(cModel);
				});
			}

		});	

		return foundModels;
	},

    getLineComponentsModelsByLineIndex: function(index) {
        var _that = this;

        var foundModels = new ComponentsCollection();

        var pageTimelineRows = this.model.get('lines');

        var rowModel = pageTimelineRows.at(index);

        if(rowModel){
            foundModels = rowModel.get('objects');
        }

        return foundModels;
    },

	getPageByID: function(pagesIdArray) {
		var _that = this;

		var foundModel = undefined;

		var pages = this.projectModel.get('pages');

		pages.each(function(pageModel){
			var _pageId = pageModel.get('options').get('pageid').toString();
			if (_.indexOf(pagesIdArray, _pageId) !== -1) {
				foundModel = pageModel;
				return;
			}
		});	

		return foundModel;
	},

	goToLink: function(sender, objs, opts) {

		var link = opts.link;

		link

		var _target = '_blank';
		var address = '';

		if(_.isObject(link)){
			
			_target = link._target || _target;
			address = link.link;
		}else{
			address = link;
		}

		address = Utils.validateUrl(address);

		window.open(address, _target);
	},

    checkExercise: function(sender, objs, opts) {

        var componentsModels = this.getComponentModelByActionkey(objs);

        componentsModels.each(function(cModel) {

            cModel.view.validateQuestion(sender);
        });
    },

    checkAllExercises: function(sender, objs, opts) {

        var componentsModels = ProjectModel.instance.getExercisesComponents();

        componentsModels.each(function(cModel) {

            cModel.view.validateQuestion(sender);
        });

        this.trigger('check-course-status');
    },

    resetAllExercises: function(sender, objs, opts) {

        var componentsModels = ProjectModel.instance.getExercisesComponents();

        componentsModels.each(function(cModel) {

            cModel.view.resetExerciseApproach(sender);
        });

        this.trigger('check-course-status');
    },

    

    startTimer: function(sender, objs, opts) {

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {
            cModel.view.startTimer();
        });
    },

    stopTimer: function(sender, objs, opts) {

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {
            cModel.view.stopTimer();
        });
    },

    resetTimer: function(sender, objs, opts) {

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {
            cModel.view.resetTimer();
        });
    },

    resetAllTimers: function(sender, objs, opts) {

        var componentsModels = ProjectModel.instance.getTimerComponents();
        componentsModels.each(function(cModel) {
            cModel.view.resetTimer();
        });
    },

    showNextLine: function(sender, objs, opts) {

        if(!sender.lineIndex){
            sender.lineIndex = 0;
        }

        var disableComponents = objs.disableComponents;

        this.showComponentsAtLine(sender.lineIndex);

        var lines = sender.model.get('lines');

        if(sender.lineIndex < lines.length){
            sender.lineIndex++;
        }
    },

    showComponentsAtLine: function(lineIndex) {

        var componentsModels = this.getLineComponentsModelsByLineIndex(lineIndex);
        componentsModels.each(function(cModel) {
            cModel.view.delayAndShowComponent();
        });
    },


    resetExerciseApproach: function(sender, objs, opts) {

        var componentsModels = this.getComponentModelByActionkey(objs);
        componentsModels.each(function(cModel) {
            //cModel.view.stopTimer();

            // _log('resetExerciseApproach', cModel);

            cModel.view.resetExerciseApproach();

        });
    },



	



	// switch (whattodo) {

	// 	case 'unlockpagenavigation':
	// 		_that.setPageOptions('unlockNavigationTrigger', _that.getPageByID(_that.course.opts.active.pageID));
	// 		break;

	// 	case 'resetquestions':
	// 		debug.log('resetquestions....');
	// 		for (var o in data) {
	// 			// get object
	// 			var ob = _that.getObjectByID(data[o]);
	// 			var screenObject = _that.getScreenObjectByActionkey(data[o]);

	// 			ob.question.attempts = ob.question.startAttempts;
	// 			ob.compl = 0;

	// 			_that.quiz_qtextPrepareQuestionToEdit(ob, screenObject);

	// 		}
	// 		break;

	// 	case 'changevarvalue':
	// 		if ( isObject(variableData) ) {
	// 			// if variable value is a number - parse it to properly add and subtract
	// 			var variable = _that.getVariableByHash(variableData.varName);
	// 			if (!isNaN(variable.pvarvalue)) {
	// 				variable.pvarvalue = parseFloat(variable.pvarvalue);
	// 			}
	// 			// same thing to changing value
	// 			if (!isNaN(variableData.varValue)) {
	// 				variableData.varValue = parseFloat(variableData.varValue);
	// 			}


	// 			// save actual variable value to "pvarvaluePrevious" just in case
	// 			// _that.course.opts.trigger[variableData.varName]['pvarvaluePrevious'] = _that.course.opts.trigger[variableData.varName]['pvarvalue'];


	// 			switch (variableData.varAction) {

	// 				// EVERY TIME
	// 				case 'add':
	// 					_that.setProjectVariableValue(
	// 							variableData.varName,
	// 							variable.pvarvalue + variableData.varValue
	// 						); 
	// 					break;

	// 				case 'subtract':
	// 					_that.setProjectVariableValue(
	// 							variableData.varName,
	// 							variable.pvarvalue - variableData.varValue
	// 						);
	// 					break;

	// 				case 'changevalue':
	// 					_that.setProjectVariableValue(
	// 							variableData.varName,
	// 							variableData.varValue
	// 						);
	// 					break;

	// 				// ONCE
	// 				case 'addonce':
	// 					if (variableData.done !== true) {
	// 						_that.setProjectVariableValue(
	// 							variableData.varName,
	// 							variable.pvarvalue + variableData.varValue
	// 						);
	// 						variableData.done = true;
	// 					}
						
	// 					break;

	// 				case 'subtractonce':
	// 					if (variableData.done !== true) {
	// 						_that.setProjectVariableValue(
	// 							variableData.varName,
	// 							variable.pvarvalue - variableData.varValue
	// 						);
	// 						variableData.done = true;
	// 					}
	// 					break;

	// 				case 'changevalueonce':
	// 					if (variableData.done !== true) {
	// 						_that.setProjectVariableValue(
	// 							variableData.varName,
	// 							variableData.varValue
	// 						);
	// 						variableData.done = true;
	// 					}
	// 					break;
	// 			}

	// 		}
			
			
	// 		// debug.log("changing ("+ variableData.varAction +": "+ variableData.varValue +") varID: " + variableData.varName + " | now value is: " + _that.course.opts.trigger[variableData.varName]['pvarvalue']);
			
	// 		break;

	// }





})

TriggerController.instance = new  TriggerController();