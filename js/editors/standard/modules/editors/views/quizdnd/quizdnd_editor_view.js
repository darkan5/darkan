var QuizDnDEditorView = ExerciseEditorView.extend({
	template: _.template($('#quizdnd-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'keyup .dnd-submit-btn-text' : 'changeButtonTitle',
            'click .dnd-picker-container[dndm]' : 'runDataPicker',
            'click .dnd-picker-goodanswer[dndm]' : 'runDataPicker',
            'click .dnd-editor-draggableobjs-addobjects' : 'runDataPicker',
            'click .dnd-container-delete' : 'deleteContainer',
            'click .dnd-object-good' : 'deleteGoodObject',
            'click .dnd-object' : 'deleteObject',
            'mouseenter .ex-object' : 'highlightOnStage',
            'mouseleave .ex-object' : 'unhighlightOnStage',
            'click .dnd-container-edit' : 'editContainer',
            'click .dnd-options-answers' : 'editDnDoptions',
            'click .dnd-container-editall-container' : 'editAllContainer',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

    bindings: {
        '#quiz-dnd-attempts': 'attempts'
    },

	initialize: function(data) {
		this.stageView = data.stageView;
	},

    highlightOnStage: function(e) {
        var actionkey = $(e.currentTarget).attr('actionkey');
        if (actionkey) {
            var cModel = StageView.instance.getComponentModelByActionkey(actionkey);

            if(cModel){
                cModel.selectedByPickerMiniature(true);
            }
        }
        
    },

    unhighlightOnStage: function(e) {
        var actionkey = $(e.currentTarget).attr('actionkey');
        if (actionkey) {
            var cModel = StageView.instance.getComponentModelByActionkey(actionkey);

            if(cModel){
                cModel.selectedByPickerMiniature(false);
            }
        }
        
    },

    editDnDoptions: function(e) {

        var windowOption = {
            left: e.pageX,
            top: e.pageY
        };

        this.showDnDOptionsWindow(windowOption);
    },

    editContainer: function(e) {
        this.showEditWindow(e);
    },

    editAllContainer: function(e) {
        var windowOption = {
            left: e.pageX,
            top: e.pageY
        };

        this.showEditAllWindow(windowOption);
    },

    changeButtonTitle: function(e) {
        var buttonTitle = $(e.target).val();
        this.model.set('buttonTitle', buttonTitle);
    },

    deleteObject: function(e) {
        var objActionkey = $(e.target).attr('dndb');
        var answers = this.model.get('answers');
        var draggableObjs = this.model.get('draggableObjs');

        var paID = draggableObjs.indexOf(objActionkey);

        // usuwanie z wszystkich odpowiedzi
        if (paID !== -1) {
            draggableObjs.splice(paID, 1);
        }

        _.each(answers, function(val, containerActionkey) {
            paID = val.pa.indexOf(objActionkey);
            if (paID !== -1) {
                val.pa.splice(paID, 1);
            }
        });

        this.model.set('answers', answers);
        this.model.trigger('change');

        this.unhighlightOnStage(e);

        this.render();
        this.afterRender();
    },

    deleteGoodObject: function(e) {
        var goodActionkey = $(e.target).attr('dndg');
        var containerActionkey = $(e.target).attr('dndm');
        var answers = this.model.get('answers');
        var objs = this.model.get('draggableObjs');

        if ( !_.isUndefined(answers[containerActionkey]) ) {

            this.deleteFromAllObjects(goodActionkey);
            
            var paID = answers[containerActionkey].pa.indexOf(goodActionkey);
            if (paID !== -1) {
                answers[containerActionkey].pa.splice(paID, 1);
            }
            
            this.model.set('answers', answers);
            this.model.set('objs', objs);
            this.model.trigger('change');

            this.unhighlightOnStage(e);

            this.render();
            this.afterRender();
        }
    },

    deleteContainer: function(e) {
        var _that = this;
        var container = $(e.target).attr('dndm');

        var answers = this.model.get('answers');

        if ( !_.isUndefined(answers[container]) ) {

            _.each(answers[container].pa, function(objActionkey) {
                _that.deleteFromAllObjects(objActionkey);
            });

            delete answers[container];

            this.model.set('answers', answers);
            this.model.trigger('change');

            this.render();
            this.afterRender();
        }
    },

    deleteFromAllObjects: function(actionkey) {
        var allObjects = this.model.get('draggableObjs');

        if (this.timesObjectExistsInEditor(actionkey) === 1) {
            var objID = allObjects.indexOf(actionkey);
            if (objID !== -1) {
                allObjects.splice(objID, 1);
            }
        }
    },

    timesObjectExistsInEditor: function(actionkey) {
        var existTimes = 0;

        var allAnswers = this.model.get('answers');

        _.each(allAnswers, function(container, containerActionkey) {
            _.each(container.pa, function(paActionkey) {
                if (paActionkey === actionkey) existTimes++;
            });
        });

        return existTimes;
    },

    runDataPicker : function(e){
        var _that = this;
        var button = $(e.target);
        var containerId = $(e.target).attr('dndm');
        var answers = this.model.get('answers');
        var objs = this.model.get('draggableObjs');

        var _array = [];

        if (button.hasClass('dnd-picker-container')) {

            _array = answers[containerId] == undefined ? _array : [containerId];
            this.showDataPicker(
                function(model) {
                    _array.push(model.get('actionkey'));
                    _that.updateContainer(model, button);
                }, 
                $(e.target), 
                _array
            );

        } else if (button.hasClass('dnd-picker-goodanswer')) {

            if (!_.isUndefined(answers[containerId])) {
                _.each(answers[containerId].pa, function(val) { 
                    _array.push(val); 
                });
            } 

            this.showDataPicker(
                function(model) {
                    _array.push(model.get('actionkey'));
                    _that.updateGoodAnswers(model, button);
                }, 
                $(e.target), 
                _array
            );

        } else if (button.hasClass('dnd-editor-draggableobjs-addobjects')) {

            _.each(objs, function(val) {
                _array.push(val);
            });

            this.showDataPicker(
                function(model) {
                    _array.push(model.get('actionkey'));
                    _that.updateAnswers(model, button);
                }, 
                $(e.target), 
                _array
            );

        }
    },

    showDataPicker : function(callback, target, actionKeyArray){
        var _that = this;

        if(this.dataPicker == undefined){
            this.dataPicker = new DataPickerView({ collection: actionKeyArray });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;
            });
            this.dataPicker.on('data-picker-picked', function(model){
                callback.call(_that, model, target, _that);
            });

            $('body').append( this.dataPicker.render().$el );
        }
    },

    showEditWindow : function(event){
        var _that = this;

        var target = $(event.target);

        var windowPosition = {
            top: event.pageY,
            left: event.pageX
        };

        var containerActionkey = target.attr('dndm');

        if(this.containerEditorView == undefined){
            this.containerEditorView = new ContainerEditWindowView({ componentModel: this.model, containerActionkey: containerActionkey });
            this.containerEditorView.on('on-close', function(){
                _that.containerEditorView = undefined;
            });

            var dataToRender = { componentModel: this.model.toJSON(), containerActionkey: containerActionkey };

            $('body').append( this.containerEditorView.render(dataToRender).$el );
            this.containerEditorView.setWindowPosition(windowPosition);
        }
    },

    showEditAllWindow: function(windowPosition) {
        var _that = this;

        // generownaie
        var answers = this.model.get('answers');

        var componentModel = {
            answers: {
                'all': {
                    opts: {
                        autoArrangeAnswers: false,
                        dropandhide: false,
                        enoughAnswers: 0,
                        forceGoodSequence: false,
                        maxAnswers: 0,
                        onlygoodanswers: false,
                        revertType: 'revertOnlyBad'
                    }
                }
            }
        }

        var iter = 0;
        _.each(answers, function(object, key) {
            if (iter === 0) {
                componentModel.answers['all'].opts.autoArrangeAnswers =  object.opts.autoArrangeAnswers;
                componentModel.answers['all'].opts.dropandhide =  object.opts.dropandhide;
                componentModel.answers['all'].opts.enoughAnswers =  object.opts.enoughAnswers;
                componentModel.answers['all'].opts.forceGoodSequence =  object.opts.forceGoodSequence;
                componentModel.answers['all'].opts.maxAnswers =  object.opts.maxAnswers;
                componentModel.answers['all'].opts.onlygoodanswers =  object.opts.onlygoodanswers;
                componentModel.answers['all'].opts.revertType =  object.opts.revertType;
            } else {
                if (object.opts.autoArrangeAnswers !== componentModel.answers['all'].opts.autoArrangeAnswers) {
                    componentModel.answers['all'].opts.autoArrangeAnswers = false;
                    componentModel.answers['all'].opts.autoArrangeAnswersAll = true;
                }
                if (object.opts.dropandhide !== componentModel.answers['all'].opts.dropandhide) {
                    componentModel.answers['all'].opts.dropandhide = false;
                    componentModel.answers['all'].opts.dropandhideAll = true;
                }
                if (object.opts.enoughAnswers !== componentModel.answers['all'].opts.enoughAnswers) {
                    componentModel.answers['all'].opts.enoughAnswers = 0;
                    componentModel.answers['all'].opts.enoughAnswersAll = true;
                }
                if (object.opts.forceGoodSequence !== componentModel.answers['all'].opts.forceGoodSequence) {
                    componentModel.answers['all'].opts.forceGoodSequence = false;
                    componentModel.answers['all'].opts.forceGoodSequenceAll = true;
                }
                if (object.opts.maxAnswers !== componentModel.answers['all'].opts.maxAnswers) {
                    componentModel.answers['all'].opts.maxAnswers = 0;
                    componentModel.answers['all'].opts.maxAnswersAll = true;
                }
                if (object.opts.onlygoodanswers !== componentModel.answers['all'].opts.onlygoodanswers) {
                    componentModel.answers['all'].opts.onlygoodanswers = false;
                    componentModel.answers['all'].opts.onlygoodanswersAll= true;
                }
                if (object.opts.revertType !== componentModel.answers['all'].opts.revertType) {
                    componentModel.answers['all'].opts.revertType = 'revertOnlyBad';
                    componentModel.answers['all'].opts.revertTypeAll = true;
                }
            }
            iter++;
        });

        if(this.containerEditorView == undefined){
            this.containerEditorView = new AllContainerEditWindowView({ componentModel: this.model });
            this.containerEditorView.on('on-close', function(){
                _that.containerEditorView = undefined;
            });

            var dataToRender = { componentModel: componentModel, containerActionkey: 'all' };

            $('body').append( this.containerEditorView.render(dataToRender).$el );
            this.containerEditorView.setWindowPosition(windowPosition);
        }
    },

    showDnDOptionsWindow : function(windowPosition){
        var _that = this;

        if(this.dndOptionsView == undefined){
            this.dndOptionsView = new DnDOptionsWindowView({ componentModel: this.model });
            this.dndOptionsView.on('on-close', function(){
                _that.dndOptionsView = undefined;
            });

            var dataToRender = this.model.toJSON();

            $('body').append( this.dndOptionsView.render(dataToRender).$el );
            this.dndOptionsView.setWindowPosition(windowPosition);
        }
    },

    updateContainer: function(model, target) {
    	var actionkey = model.get('actionkey');
        var dndm = target.attr('dndm');
        var answers = this.model.get('answers');
        var userSelection = this.model.get('userSelection');

        if (dndm === 'new') {
            // nowy kontener
            if ( _.isUndefined(answers[actionkey]) ) {
                answers[actionkey] = {
                    opts: {
                        autoArrangeAnswers: true,
                        dropandhide: false,
                        enoughAnswers: 0,
                        forceGoodSequence: false,
                        maxAnswers: 0,
                        onlygoodanswers: false,
                        revertType: 'revertOnlyBad'
                    },
                    pa: [],
                    userSelection: []
                }

                userSelection[actionkey] = [];

                this.model.set('answers', answers);
                this.model.set('userSelection', userSelection);
                this.model.trigger('change');

                this.render();
                this.afterRender();
            }
        } else {
            // zmiana kontenera
            answers[actionkey] = answers[dndm];
            delete answers[dndm];

            if(answers[actionkey]){
                if(answers[actionkey].pa){
                    var paID = answers[actionkey].pa.indexOf(actionkey);
                    if (paID !== -1) {
                        answers[actionkey].pa.splice(paID, 1);
                    }
                }
            }


            this.model.set('answers', answers);
            this.model.trigger('change');

            this.render();
            this.afterRender();
        }
    },

    updateGoodAnswers: function(model, target) {
    	var answerActionkey = model.get('actionkey');
        var container = target.attr('dndm');

        var answers = this.model.get('answers');

        if ( !_.isUndefined(answers[container]) && answerActionkey !== container) {
            if (answers[container].pa.indexOf(answerActionkey) === -1) {
                answers[container].pa.push(answerActionkey);
            }

            var draggableObjs = this.model.get('draggableObjs');

            // dodanie do wszystkich odpowiedzi jesli jeszcze sie tutaj nie znajduje
            if (draggableObjs.indexOf(answerActionkey) === -1) {
                draggableObjs.push(answerActionkey);

                this.model.set('draggableObjs', draggableObjs);
            }

            this.model.set('answers', answers);
            this.model.trigger('change');

            this.render();
            this.afterRender();
        }
    },

    updateAnswers: function(model, target) {
    	var actionkey = model.get('actionkey');

        var draggableObjs = this.model.get('draggableObjs');

        if (draggableObjs.indexOf(actionkey) === -1) {
            draggableObjs.push(actionkey);

            this.model.set('draggableObjs', draggableObjs);
            this.model.trigger('change');

            this.render();
            this.afterRender();
        }
    },

    beforeRender: function() {

        var allObjects = this.model.get('draggableObjs');

        var changedExist = false;

        for (var i = 0; i < allObjects.length; i++) {
            var actionkey = allObjects[i];

            var exist = StageView.instance.componentExist(actionkey);

            if (!exist) {
                changedExist = true;
                allObjects.splice(i, 1);
            }
        };

        this.model.set('draggableObjs', allObjects);

        var answers = this.model.get('answers');



        for (var item in answers) {
            var actionkey = item;
            var exist = StageView.instance.componentExist(actionkey);

            if (!exist) {
                changedExist = true;
                delete answers[item];
            }

            if(answers[item]){
                var pa = answers[item].pa;

                if(pa != undefined){
                    for (var j = 0; j < pa.length; j++) {
                        var actionkey = pa[j];

                        var exist = StageView.instance.componentExist(actionkey);

                        if (!exist) {
                            changedExist = true;
                            pa.splice(j, 1);
                        }
                    }
                }
            }
        };

        this.model.set('answers', answers);

        if(changedExist){
            this.model.trigger('change');
        }
    },

    afterRender: function() {
        var _that = this;

        var allObjects = this.model.get('draggableObjs');
        var userSelection = this.model.get('userSelection');
        userSelection = { };

        var answers = this.model.get('answers');
        _.each(answers, function(key, actionkey) {
            if (actionkey) {
                var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
                if(cModel){
                    _that.$el.find('div[actionkey="'+actionkey+'"]').attr('componenttype', cModel.get('type'));
                }
                userSelection[actionkey] = [ ];
            }
        });

        this.model.set('userSelection', userSelection);

        _.each(allObjects, function(actionkey) {
            if (actionkey) {
                var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
                if(cModel){
                    _that.$el.find('div[actionkey="'+actionkey+'"]').attr('componenttype', cModel.get('type'));
                }
            }
        });
    },


});