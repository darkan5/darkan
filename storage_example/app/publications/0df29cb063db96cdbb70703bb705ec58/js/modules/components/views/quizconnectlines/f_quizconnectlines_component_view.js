var QuizConnectLinesComponentView = ExerciseComponentView.extend({

    className : 'component quizconnectlines-component',

    template: _.template($('#quizconnectlines-component-template').html()),

    connections: [ ],

    tmpUserSelection: [ ],

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click' : 'validateQuestion',
        });
    },

  //   validateQuestion: function() {

  //   	var userSelection = this.model.get('userSelection');

		// var feedbackWindow = new FeedbackView();

		// var feedbackContent = '';

		// if ( !_.isObject(userSelection) ) {
		// 	feedbackContent = lang[language]['ANSWER_ALL_QUESTIONS_FIRST_QCL'];

		// } else {
		// 	var success = this.checkAnswers();
	 //    	feedbackContent = success ? 'GIT' : 'LIPA';
		// }

		// $(__meta__.darkanContainer).append(feedbackWindow.render({content: feedbackContent}).$el);
		// feedbackWindow.centerWindow();
  //   },

  	afterInitialize: function() {

        this._isDisabled = false;
    },

    afterAllInitialized: function() {

    	var userSelection = this.model.get('userSelection');

    	this.tmpUserSelection = [];

    	this.copyObject(userSelection, this.tmpUserSelection);

    	userSelection = [ ];

    	this.model.set('userSelection', userSelection);

		this.drawDots();
    	
    },

    hideAllDotsAndLines: function() {
    	_log('hiding', $('._jsPlumb_endpoint[actionkey="'+ this.qclInstance._obActionkey +'"], ._jsPlumb_connector[actionkey_id="'+ this.qclInstance._obActionkey +'"]'));

		if (this.qclInstance) {
			$('._jsPlumb_endpoint[actionkey="'+ this.qclInstance._obActionkey +'"], ._jsPlumb_connector[actionkey_id="'+ this.qclInstance._obActionkey +'"]').hide();
		}
    },

    showAllDotsAndLines: function() {

		if (this.qclInstance) {
			$('._jsPlumb_endpoint[actionkey="'+ this.qclInstance._obActionkey +'"], ._jsPlumb_connector[actionkey_id="'+ this.qclInstance._obActionkey +'"]').show();
		}
    },

    afterHide: function() {
    	this.hideAllDotsAndLines();
    },

    onShow: function() {
    	var _that = this;
    	// setTimeout(function() {
    		// _that.drawDots();
    	// }, 100);

    	this.showAllDotsAndLines();
		
    },

    copyObject: function(source, target) {

    	var _that = this;

    	_.each(source, function(val, key) {

    		if (_.isArray(val)) {

    			target[key] = Array();

    			_that.copyObject(source[key], target[key]);

    		} else if (_.isObject(val)) {

    			target[key] = { };

    			_that.copyObject(source[key], target[key]);
    		} else {

    			target[key] = val;
    		}
    	});
    },

	updateConnections: function(conn, remove) {
		var _that = this;

		var userSelection = this.model.get('userSelection');

		if (!remove) {
			this.connections.push(conn.connection);
		}
		else {
			var idx = -1;
			for (var i = 0; i < this.connections.length; i++) {
				if (this.connections[i] == conn.connection) {
					idx = i; break;
				}
			}
			if (idx != -1) {
				this.connections.splice(idx, 1);
			}
		}
	
		var isNew = true;
		if (remove == false) {

			for (var i in userSelection) {
				if ($(conn.connection.source).attr('actionkey') === userSelection[i][0] &&
					$(conn.connection.target).attr('actionkey') === userSelection[i][1] ||
					$(conn.connection.source).attr('actionkey') === userSelection[i][1] &&
					$(conn.connection.target).attr('actionkey') === userSelection[i][0]) {
					setTimeout(function() {
						jsPlumb.detach(conn);
					}, 50);
					isNew = false;
				}
			}
		}

		if (isNew) {
			userSelection = [];

			for (var i = 0; i < this.connections.length; i++) {
				var connection = this.connections[i];
				userSelection.push( [ $(connection.source).attr('actionkey'), $(connection.target).attr('actionkey') ] );
			};
		}
		_log('conn', conn);
		$(conn.connection.canvas).attr('actionkey_id', _that.qclInstance._obActionkey);
		this.model.set('userSelection', userSelection);
	},

	isGoodAnswer: function(connection) {
		var _that = this;

		var allGoodAnswers = [];
		var answers = this.model.get('answers');


		var connectionActionkeys = [ 
					$(connection.source).attr('actionkey'),
					$(connection.target).attr('actionkey')
				];

		for (var i = 0; i < answers.length; i++) {
			var answer = answers[i];
			var from = answer.from;

			for (var j = 0; j < answer.to.length; j++) {
				var to = answer.to[j];
				var goodAnswer = [from, to];
				goodAnswer.sort();
				allGoodAnswers.push(goodAnswer);
			};
		};

		for (var ga = 0; ga < allGoodAnswers.length; ga++) {
			var goodAnswer = allGoodAnswers[ga];

			if (Utils.arrayAreEqual(goodAnswer, connectionActionkeys.sort())) {
				return true;
			}
		}

		return false
	},

    drawDots: function() {
		var _that = this;

		var allObjs = this.model.get('objs');
		var actionkey = this.model.get('actionkey');
		var opts = this.model.get('opts');
		var userSelection = this.model.get('userSelection');
		var compl = !_.isUndefined(this.model.get('compl')) ? this.model.get('compl') : 0;

		this.connections = [];


		


		this.qclInstance = jsPlumb.getInstance({
			Scope: actionkey,
			//Container: $('#stage-content'),
			Container: $('#qcl-' + actionkey),
			logEnabled: true
		});	

		_log('this.qclInstance', this.qclInstance);

		// _that.qclInstance.setContainer(_that.L.scr.find('#divimg'));

		// var instance = _that.qclInstance;


		this.qclInstance.bind("connectionDetached", function(info, originalEvent) {
			_that.updateConnections(info, true);
		});
		
		this.qclInstance.bind("connectionMoved", function(info, originalEvent) {
			//  only remove here, because a 'connection' event is also fired.
			// in a future release of jsplumb this extra connection event will not
			// be fired.
			_that.updateConnections(info, true);
		});

		// this.qclInstance._isDisabled = false;
		this.qclInstance._obActionkey = actionkey;

	    this.qclInstance.bind("click", function(component, originalEvent) {
	    	if (!_that._isDisabled) {
	    		jsPlumb.detach(component);
	    	}
	    });

	    this.allEndpoints = { };

		for (var a in allObjs) {
			var ans = allObjs[a];

			var qclOb = TriggerController.instance.getComponentModelByActionkey([a]).at(0);




			var qclScreenOb = qclOb.view.$el;

			// var qclinit = qclOb.get('qclinit');

			// if ( !qclinit ) {
				var options = allObjs[a];

				var align = options.align;
				var color1 = options.color;
				var size1 = options.size;
				var lineWidth1 = options.lineWidth;
				var maxConnections1 = options.maxConnections;

				maxConnections1 = maxConnections1 == 0 ? maxConnections1 = -1 : maxConnections1;

				var objectIsSource = opts.onlySourceTarget ? options.isSource : true;
				var objectIsTarget = opts.onlySourceTarget ? options.isTarget : true;

				if (!objectIsSource && !objectIsTarget) {
					objectIsTarget = true;
				}

				if (compl != 0) {
					objectIsSource = false;
					objectIsTarget = false;
				}

				var endpointOptions = {
					endpoint: ["Dot", { radius:size1 }],
					paintStyle: { fillStyle:color1 },
					connectorStyle: { strokeStyle:color1, lineWidth:lineWidth1 },
					connector : "Straight",
					dropOptions : { tolerance:"touch" },
					maxConnections: maxConnections1,
					isSource: objectIsSource,
					isTarget: objectIsTarget,

					beforeDrop:function(params) { 
						return true;
					},
				}



				var elFix = false;
				if (qclScreenOb.css('display') == "none") {
					_log('Jest None!', qclScreenOb);
					elFix = true;
					qclScreenOb.css({
						visibility: 'hidden',
						display: 'block'
					});
				}

				var actionKey = qclOb.get('actionkey');

				_that.allEndpoints[actionKey] = _that.qclInstance.addEndpoint( qclScreenOb, { anchor:align }, endpointOptions);

				if (elFix === true) {
					(function(element){
						// setTimeout(function(){
							element.css({
								visibility: 'visible',
								display: 'none'
							});
						// }, 1);
					})(qclScreenOb);
					
				}	

				// add actionkey attributes to dots
				$(_that.allEndpoints[actionKey].canvas).attr('actionkey', _that.qclInstance._obActionkey);


				if(qclOb.get('hidden')) {
					$('._jsPlumb_endpoint[actionkey="'+ _that.qclInstance._obActionkey +'"]').hide();
				}

				_log('_that.allEndpoints[actionKey]', _that.allEndpoints[actionKey]);

				// qclOb.set('qclinit', true);
			// }
		}

	   // bind to connection/connectionDetached events, and update the list of connections on screen.
		this.qclInstance.bind("connection", function(info, originalEvent) {
			_that.updateConnections(info, false);


			if (!opts.allowBadAnswers) {
				if (!_that.isGoodAnswer(info.connection)) {
					setTimeout(function() {
						_that.qclInstance.detach(info.connection);
					}, 10);
				}	
			}
			
		});

		_.each(this.tmpUserSelection, function(connection) {

			if (Object.keys(connection).length === 2) {

				_that.qclInstance.connect({ source: _that.allEndpoints[connection[0]], target: _that.allEndpoints[connection[1]] });
			}
		});

    },

		// Get connection object by actionkeys in answer
	getConnectionByActionkeys: function(actionkeys) {
		var allConnections = this.qclInstance.getAllConnections();

		for (var i = allConnections.length - 1; i >= 0; i--) {
			var connection = allConnections[i];

			var connectionActionkeys = [ 
				$(connection.source).attr('actionkey'),
				$(connection.target).attr('actionkey')
			];

			if (Utils.arrayAreEqual(actionkeys.sort(), connectionActionkeys.sort())) {
				return connection;
			}
		};

		return false;
	},

    checkAnswers: function() {
		var _that = this;


		var userSelection = this.model.get('userSelection');
		var answers = this.model.get('answers');
		var opts = this.model.get('opts');
		

		var isCorrect = true;

		var allGoodAnswers = [];


		for (var i = 0; i < answers.length; i++) {
			var answer = answers[i];
			var from = answer.from;

			for (var j = 0; j < answer.to.length; j++) {
				var to = answer.to[j];
				var goodAnswer = [from, to];
				goodAnswer.sort();
				allGoodAnswers.push(goodAnswer);
			};
		};

		var userAnswersStatus = [ ];

		var allBadAnswers = [ ];

		if (_.isObject(userSelection)) {

			for (var us = 0; us < userSelection.length; us++) {
				var userAnswer = userSelection[us].sort();

				var answerStatus = false;

				for (var ga = 0; ga < allGoodAnswers.length; ga++) {
					var goodAnswer = allGoodAnswers[ga];

					if (Utils.arrayAreEqual(goodAnswer, userAnswer)) {
						answerStatus = true;
					}
				}

				if (!answerStatus) {
					allBadAnswers.push(userAnswer);
				}

				userAnswersStatus.push(answerStatus);
			};
		}

		// if length of user answers and good answers are not the same - its bad answer
		if (allGoodAnswers.length !== userSelection.length) {
			userAnswersStatus = [false];
		}

		var answers_status = {
			questionIsPassed:false
		}
	   
		if (userAnswersStatus.indexOf(false) === -1 && userAnswersStatus.length > 0) {
			answers_status.questionIsPassed = true;
		} else {
			answers_status.questionIsPassed = false;

			// after bad answer...
			switch (opts.afterBadAnswer) {
				case 'donothing':
					// doing nothing...
					break;
					
				case 'removebad':

					for (var i = allBadAnswers.length - 1; i >= 0; i--) {
						var singleBadAnswer = allBadAnswers[i].sort();
						var connection = this.getConnectionByActionkeys(singleBadAnswer);

						if (connection) {
							_that.qclInstance.detach(connection);
						}
					};
					break;
					
				case 'removeall':
					_that.qclInstance.detachEveryConnection();
					break;
			}
		}

		return answers_status.questionIsPassed;
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');
        var answers = this.model.get('answers');

        _log('userSelection QCL', userSelection);

        if (_.isUndefined(userSelection)) {

            userSelection = [];

            // for (var answer in answers) {

            //     userSelection[answer] = { c:false };
            // }

            this.model.set('userSelection', userSelection);
        }
    },

    renderAsFailed: function() {
    	var _that = this;

        this.$el.css({
            opacity: '.7'
        });
        this._isDisabled = true;
        this.disableAllDots()
    },

    renderAsCompleted: function() {
        this.$el.css({
            opacity: '.7'
        });
        this._isDisabled = true;
        this.disableAllDots()
    },

    renderAsReadyToUse: function() {
        this.$el.css({
            opacity: '1'
        });
    },

    resetExerciseApproachSpecial: function(){
        this.qclInstance.detachEveryConnection();
        this.drawDots();
    },

    disableAllDots: function() {
    	for (var endP in this.allEndpoints) {
    		var endpoint = this.allEndpoints[endP];
    		endpoint.isTarget = false;
    		endpoint.isSource = false;
    	}
    },


    beforeDestroy: function() {
    	$('._jsPlumb_endpoint, ._jsPlumb_connector').remove();
    },

    afterRender: function() {
    	var _that = this;

    	var actionkey = this.model.get('actionkey');

    	var stageOffset = StageView.instance.$el.offset();

    	var container = $('<div/>', {
			id:'qcl-' + actionkey,
			class: 'qcl-container',
			style:'top:-'+ stageOffset.top+'px;left:-'+ stageOffset.left+'px;'
		});



        StageView.instance.$el.append(container);


        setTimeout(function() {
    		var stageOffset = StageView.instance.$el.offset();

	    	$('.qcl-container').css({
	    		top: '-'+ stageOffset.top +'px',
	    		left: '-'+ stageOffset.left +'px'
	    	});

        }, 200);
    },


});