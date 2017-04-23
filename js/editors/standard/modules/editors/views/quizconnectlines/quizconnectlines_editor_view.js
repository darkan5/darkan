var QuizConnectLinesEditorView = ExerciseEditorView.extend({
	template: _.template($('#quizconnectlines-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'keyup .qcl-submit-btn-text' : 'changeButtonTitle',
            'click .connectlines-editor-draggableobjs-addobjects' : 'runDataPicker',
            'click .connectlines-picker-target[dndm]' : 'runDataPicker',
            'click .connectlines-picker-source[dndm]' : 'runDataPicker',
            'click .connectlines-object' : 'showContextMenu',
            'mouseenter .ex-object' : 'highlightOnStage',
            'mouseleave .ex-object' : 'unhighlightOnStage',
            'click .connectlines-object-good' : 'showContextMenuGoodAnswer',
            'click .connectlines-container-delete' : 'deleteContainer',
            'click .connectlines-container-edit' : 'editLine',
            'click .connectlines-options-answers' : 'editQclOptionis',
            'click .connectlines-editall-objs' : 'editAllObjs',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad',
            'click .ex-object-container': 'showContextMenuContainer'
        });
    },

    bindings: {
        '#quiz-qcl-attempts': 'attempts'
    },

	initialize: function(data) {
		this.stageView = data.stageView;
	},

    highlightOnStage: function(e) {
        var actionkey = $(e.currentTarget).attr('actionkey');
        if (actionkey) {
            var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
            cModel.selectedByPickerMiniature(true);
        }
        
    },

    unhighlightOnStage: function(e) {
        var actionkey = $(e.currentTarget).attr('actionkey');
        if (actionkey) {
            var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
            cModel.selectedByPickerMiniature(false);
        }
        
    },

    editQclOptionis: function(e) {

        var windowOption = {
            top: e.pageY,
            left: e.pageX
        };

        this.showQclOptionsWindow(windowOption);
    },

    editLine: function(e) {
        this.showEditWindow(e);
    },

    editAllObjs: function(e) {
        var windowOption = {
            top: e.pageY,
            left: e.pageX
        };
        
        this.showEditAllWindow(windowOption);
    },

    changeButtonTitle: function(e) {
        var buttonTitle = $(e.target).val();
        this.model.set('buttonTitle', buttonTitle);
    },

    showContextMenu: function(e) {

        var contextMenuView = new QclContextMenuView({ model: this.model, view: this, e:e});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    showContextMenuGoodAnswer: function(e) {

        var contextMenuView = new QclGoodAnswerContextMenuView({ model: this.model, view: this, e:e});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    showContextMenuContainer: function(e) {

        var contextMenuView = new QclContainerContextMenuView({ model: this.model, view: this, e:e});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },



    deleteObject: function(e) {
        var objActionkey = $(e.target).attr('dndb');
        var answers = this.model.get('answers');
        var objs = this.model.get('objs');

        delete objs[objActionkey];

        _.each(answers, function(ob, key) {
            if (ob.from === objActionkey) {
                // usuwanie zrodla
                ob.from = '';
            } else {
                // usuwnie targetu
                var toID = ob.to.indexOf(objActionkey);
                if (toID !== -1) {
                    ob.to.splice(toID, 1);
                }
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
        var line = $(e.target).attr('line');

        this.deleteFromAllObjects(goodActionkey);

        var toID = answers[line].to.indexOf(goodActionkey);
        if (toID !== -1) {
            answers[line].to.splice(toID, 1);
        }

        this.model.set('answers', answers);
        this.model.trigger('change');

        this.unhighlightOnStage(e);

        this.render();
        this.afterRender();
    },

    deleteContainer: function(e) {
        var _that = this;
        var container = $(e.target).attr('dndm');
        var answers = this.model.get('answers');
        var line = $(e.target).attr('line');

        var objs = this.model.get('objs');
        _.each(answers[line].to, function(objActionkey) {
            // usuwanie z wszystkich odpowiedzi
            _that.deleteFromAllObjects(objActionkey);
        });
        // delete objs[answers[line].from];

        answers.splice(line, 1);

        this.model.set('answers', answers);
        this.model.trigger('change');

        this.render();
        this.afterRender();
    },

	runDataPicker : function(e){
        var _that = this;
        var button = $(e.target);
        var line = $(e.target).attr('line');
        var answers = this.model.get('answers');
        var objs = this.model.get('objs');

        var _array = [];

        if (button.hasClass('connectlines-picker-source')) {

            _array = answers[line] == undefined ? _array : [answers[line].from];
            this.showDataPicker(
                function(model) {
                    _array.push(model.get('actionkey'));
                    _that.updateSource(model, button);
                }, 
                $(e.target), 
                _array
            );

        } else if (button.hasClass('connectlines-picker-target')) {
            _.each(answers[line].to, function(val, key) {
                _array.push(val);
            });

            this.showDataPicker(
                function(model) {
                    _array.push(model.get('actionkey'));
                    _that.updateTarget(model, button);
                }, 
                $(e.target), 
                _array
            );

        } else if (button.hasClass('connectlines-editor-draggableobjs-addobjects')) {

            _.each(objs, function(val, key) {
                _array.push(key);
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

    showEditWindowForOneObject : function(event){

        var _that = this;

        var actionkey = $(event.target).attr('actionkey');
        var line = actionkey;
        var objs = this.model.get('objs');
        var oneObject = objs[line];

        var componentModel = {
            objs: {
                'all': oneObject
            }
        }

        var windowPosition = {
            top: event.pageY,
            left: event.pageX
        };

        if(this.qclConnectionEditorView == undefined){
            this.qclConnectionEditorView = new QclOneConnectionsEditWindowView({ actionkey:actionkey, componentModel: this.model, line: line });
            this.qclConnectionEditorView.on('on-close', function(){
                _that.qclConnectionEditorView = undefined;


            });

            var dataToRender = { componentModel: componentModel, line: 'all' };

            $('body').append( this.qclConnectionEditorView.render(dataToRender).$el );
            this.qclConnectionEditorView.setWindowPosition(windowPosition);
        }else{
            this.qclConnectionEditorView.close();
            this.showEditWindowForOneObject(event);
        }
    },

    showEditWindow : function(event){
        var _that = this;

        var target = $(event.target);
        var line = target.attr('line');
        var objs = this.model.get('objs');
        var answers = this.model.get('answers');

        var windowPosition = {
            top: event.pageY,
            left: event.pageX
        };

        // generownaie

        var componentModel = {
            objs: {
                'all': {
                    align: false,
                    color: false,
                    lineWidth: 0,
                    maxConnections: false,
                    size: 0
                }
            }
        }

        var iter = 0;

        var _objs = [];
        if (answers[line].form !== '')
            _objs.push(answers[line].from);

        _.each(answers[line].to, function(actionkey, index) {
            _objs.push(actionkey);
        });

        _.each(_objs, function(object, key) {
            if (iter === 0) {
                componentModel.objs['all'].align = objs[object].align;
                componentModel.objs['all'].color = objs[object].color;
                componentModel.objs['all'].lineWidth = objs[object].lineWidth;
                componentModel.objs['all'].maxConnections = objs[object].maxConnections;
                componentModel.objs['all'].size = objs[object].size;
            } else {
                if (objs[object].align !== componentModel.objs['all'].align) {
                    componentModel.objs['all'].align = 'None';
                }
                if (objs[object].color !== componentModel.objs['all'].color) {
                    componentModel.objs['all'].color = '';
                }
                if (objs[object].lineWidth !== componentModel.objs['all'].lineWidth) {
                    componentModel.objs['all'].lineWidth = '';
                }
                if (objs[object].maxConnections !== componentModel.objs['all'].maxConnections) {
                    componentModel.objs['all'].maxConnections = '';
                }
                if (objs[object].size !== componentModel.objs['all'].size) {
                    componentModel.objs['all'].size = '';
                }
            }
            iter++;
        });

        if(this.qclConnectionEditorView == undefined){
            this.qclConnectionEditorView = new QclConnectionEditWindowView({ componentModel: this.model, line: line });
            this.qclConnectionEditorView.on('on-close', function(){
                _that.qclConnectionEditorView = undefined;
            });

            var dataToRender = { componentModel: componentModel, line: 'all' };

            $('body').append( this.qclConnectionEditorView.render(dataToRender).$el );
            this.qclConnectionEditorView.setWindowPosition(windowPosition);
        }else{
            this.qclConnectionEditorView.close();
            this.showEditWindow(event);
        }
    },

    showEditAllWindow: function(windowOption) {
        var _that = this;

        // generownaie
        var answers = this.model.get('answers');
        var objs = this.model.get('objs');

        var componentModel = {
            objs: {
                'all': {
                    align: false,
                    color: false,
                    lineWidth: 0,
                    maxConnections: false,
                    size: 0
                }
            }
        }

        var iter = 0;
        _.each(objs, function(object, key) {
            if (iter === 0) {
                componentModel.objs['all'].align =  object.align;
                componentModel.objs['all'].color =  object.color;
                componentModel.objs['all'].lineWidth =  object.lineWidth;
                componentModel.objs['all'].maxConnections =  object.maxConnections;
                componentModel.objs['all'].size =  object.size;
            } else {
                if (object.align !== componentModel.objs['all'].align) {
                    componentModel.objs['all'].align = 'None';
                }
                if (object.color !== componentModel.objs['all'].color) {
                    componentModel.objs['all'].color = '';
                }
                if (object.lineWidth !== componentModel.objs['all'].lineWidth) {
                    componentModel.objs['all'].lineWidth = '';
                }
                if (object.maxConnections !== componentModel.objs['all'].maxConnections) {
                    componentModel.objs['all'].maxConnections = '';
                }
                if (object.size !== componentModel.objs['all'].size) {
                    componentModel.objs['all'].size = '';
                }
            }
            iter++;
        });

        if(this.qclConnectionEditorView == undefined){
            this.qclConnectionEditorView = new QclAllConnectionsEditWindowView({ componentModel: this.model });
            this.qclConnectionEditorView.on('on-close', function(){
                _that.qclConnectionEditorView = undefined;
            });

            var dataToRender = { componentModel: componentModel, line: 'all' };

            $('body').append( this.qclConnectionEditorView.render(dataToRender).$el );
            this.qclConnectionEditorView.setWindowPosition(windowOption);
        }else{
            this.qclConnectionEditorView.close();
            this.showEditAllWindow(event);
        }
    },

    showQclOptionsWindow : function(windowOption){
        var _that = this;

        if(this.qclOptionsView == undefined){
            this.qclOptionsView = new QclOptionsWindowView({ componentModel: this.model });
            this.qclOptionsView.on('on-close', function(){
                _that.qclOptionsView = undefined;
            });

            var dataToRender = this.model.toJSON();

            $('body').append( this.qclOptionsView.render(dataToRender).$el );
            this.qclOptionsView.setWindowPosition(windowOption);
        }
    },

    updateSource: function(model, target) {
    	var actionkey = model.get('actionkey');
        var dndm = target.attr('dndm');
        var answers = this.model.get('answers');
        var objs = this.model.get('objs');

        if (typeof objs[actionkey] === 'undefined') {
            objs[actionkey] = {
                align: 'TopCenter',
                color: '#67ABD6',
                isSource: true,
                isTarget: false,
                lineWidth: 4,
                maxConnections: 0,
                size: 20
            };
        } else {
            objs[actionkey].isSource = true;
        }

        if (dndm === 'new') {
            // nowy linia

            var ob = {
                from: actionkey,
                to: []
            };

            answers.push(ob);
        } else {
            // zmiana source
            var line = target.attr('line');
            answers[line].from = actionkey;

            var toID = answers[line].to.indexOf(actionkey);
            if (toID !== -1) {
                answers[line].to.splice(toID, 1);
            }
        }

        this.model.set('answers', answers);
        this.model.trigger('change');

        this.render();
        this.afterRender();
    },

    updateTarget: function(model, target) {
    	var targeetActionkey = model.get('actionkey');
        var sourceActionkey = target.attr('dndm');
        var line = target.attr('line');
        var objs = this.model.get('objs');

        var answers = this.model.get('answers');

        if (answers[line].to.indexOf(targeetActionkey) === -1) {

            if (answers[line].from !== targeetActionkey) {
                answers[line].to.push(targeetActionkey);

                // dodanie do wszystkich

                if (typeof objs[targeetActionkey] === 'undefined') {
                    objs[targeetActionkey] = {
                        align: 'TopCenter',
                        color: '#67ABD6',
                        isSource: false,
                        isTarget: true,
                        lineWidth: 4,
                        maxConnections: 0,
                        size: 20
                    };
                } else {
                    objs[targeetActionkey].isTarget = true;
                }

                this.model.set('answers', answers);
                this.model.trigger('change');

                this.render();
                this.afterRender();
            }
        }
    },

    updateAnswers: function(model, target) {
    	var actionkey = model.get('actionkey');

        var objs = this.model.get('objs');

        if (typeof objs[actionkey] === 'undefined') {
            objs[actionkey] = {
                align: 'TopCenter',
                color: '#67ABD6',
                isSource: false,
                isTarget: false,
                lineWidth: 4,
                maxConnections: 0,
                size: 20
            };

            this.model.set('objs', objs);
            this.model.trigger('change');

            this.render();
            this.afterRender();
        }
    },

    deleteFromAllObjects: function(actionkey) {
        var allObjects = this.model.get('objs');

        if (this.timesObjectExistsInEditor(actionkey) === 1) {
            delete allObjects[actionkey];
        }
    },

    timesObjectExistsInEditor: function(actionkey) {
        var existTimes = 0;

        var allAnswers = this.model.get('answers');

        _.each(allAnswers, function(answerObject) {
            if (answerObject.from === actionkey) existTimes++;
            _.each(answerObject.to, function(paActionkey) {
                if (paActionkey === actionkey) existTimes++;
            });
        });

        return existTimes;
    },


    resetDots: function() {
        jsPlumb.deleteEveryEndpoint();
    },

    paintDots: function() {
        this.model.view.paintDots();
    },

    afterRender: function() {
        var _that = this;

        this.paintDots();

        var objs = this.model.get('objs');
        _.each(objs, function(key, actionkey) {
            if (actionkey) {
                var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
                _that.$el.find('div[actionkey="'+actionkey+'"]').attr('componenttype', cModel.get('type'));
            }
        });
    }


});