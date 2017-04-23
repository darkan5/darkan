var TriggerSubtriggerItemView = TriggerSectionView.extend({

    tagName: "li",
    className: 'trigger-subtrigger-item',

    template: _.template($('#trigger-subtrigger-item-template').html()),
    templateVariables: _.template($('#trigger-subtrigger-item-variables-template').html()),
    templateLink: _.template($('#trigger-subtrigger-item-link-template').html()),

    events:{
        'drop-item' : 'dropItem',
        'change .trigger-action-select' : 'onTriggerActionChanged',
        'keyup .trigger-link-input' : 'onTriggerLinkChanged',
        'paste .trigger-link-input' : 'onTriggerLinkChanged',
        'change .trigger-delay-input' : 'onTriggerDelayChanged',
        'keyup .trigger-delay-input' : 'onTriggerDelayChanged',
        'paste .trigger-delay-input' : 'onTriggerDelayChanged',
        'click .trigger-delete-trigger-button' : 'deleteTrigger',
        'click .trigger-add-animation-to-trigger' : 'addAnimationToTrigger',
        'click .trigger-data-picker-icon' : 'showDataPicker',
        'click .trigger-data-picker-text' : 'showDataPicker',
        'mouseover .ex-object' : 'selectObject',
        'mouseout .ex-object' : 'unselectObject',
        'click .ex-object' : 'deleteObject',
        'change .trigger-varpicker' : 'onVarpickerChanged',
        'change .trigger-varactionpicker' : 'onVaractionpickerChanged',
        'keyup .trigger-varchange-input' : 'onVarchangeChanged'
    },

    initialize: function(data ) {
        this.componentModel = data.componentModel;
        this.initializeTriggerOption();

    },

    onTriggerDelayChanged: function(e){
        var value = parseInt($(e.target).val());
        this.model.get('opts').set('delay', value);

        this.saveChanges();
    },

    onVarpickerChanged: function(e){

        //var variable = this.$el.find('.trigger-varpicker').val();

        var variable = $(e.target).val();

        var action = this.$el.find('.trigger-varactionpicker').val();
        var varValue = this.$el.find('.trigger-varchange-input').val();

        var options = {};
        options.varName = variable;
        options.varAction = action;
        options.varValue = varValue;

        this.model.set('objs', options);
        //this.model.trigger('change');
    },

    onVaractionpickerChanged: function(e){

        var value = $(e.target).val();

        var options = this.model.get('objs');
        options.varAction = value;
        this.model.trigger('change');

    },

    onVarchangeChanged: function(e){
        var value = $(e.target).val();

        var options = this.model.get('objs');
        options.varValue = value;
        this.model.trigger('change');

    },

    deleteObject: function(e){
        var sender = $(e.target);
        var actionkey = sender.attr('actionkey');
        var actionType = sender.attr('action');

        var componentsCollection = this.model.get('objs');

        var index = componentsCollection.indexOf(actionkey);

        if(index != -1){

            componentsCollection.splice(index, 1);
            //this.model.set('objs', componentsCollection);

            var componentModel = DataPickerView.findModel(actionkey, actionType);
            componentModel.selectedByMiniature(false);

            this.renderComponentContainer( actionType );

            this.saveChanges();
        }


    },

    selectObject: function(e){
        var sender = $(e.target);
        var actionkey = sender.attr('actionkey');
        var actionType = sender.attr('action');

        sender.addClass('delete-on-hover');

        var componentModel = DataPickerView.findModel(actionkey, actionType);
        componentModel.selectedByMiniature(true);
    },

    unselectObject: function(e){
        var sender = $(e.target);
        var actionkey = sender.attr('actionkey');
        var actionType = sender.attr('action');

        sender.removeClass('delete-on-hover');

        var componentModel = DataPickerView.findModel(actionkey, actionType);
        componentModel.selectedByMiniature(false);
    },

    dropItem: function(event, index) {


        this.$el.trigger('update-sort', [this.model, index]);
    },

    onObjsChanged : function(model){

    },

    showDataPicker : function(e){

        var sender = $(e.target);
        var picker = sender.attr('picker');

        this.$el.trigger('hide-trigger', {}, this);

        var _that = this;

        var componentsCollection = _that.model.get('objs');


        if(this.dataPicker == undefined){
            this.dataPicker = new DataPickerView({ stageView: this.stageView, collection:componentsCollection, picker:picker });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;

                _that.$el.trigger('show-trigger', {}, this);
            });

            this.dataPicker.on('data-picker-picked', function( model ){

//                var whenDoIt = $('.trigger-on-select').val();
//                var whatToDo = _that.model.get('whattodo');
//
//                if((whenDoIt == 'custom_questionpassed' || whenDoIt == 'custom_questionfailed' ) && whatToDo == 'checkExercise'){
//
//                    if(model.cid = StageView.instance.selectedComponentsCollection.first().cid){
//
//                        _that.dataPicker.unselectObjects();
//                        _that.dataPicker.close();
//
//                        _that.dataPicker = undefined;
//                        _that.$el.trigger('show-trigger', {}, this);
//
//                        return;
//                    }
//
//                }

                var type = model.get('type');
                var key;


                switch (type){
                    case 'line':
                        key = model.get('options').get('id');
                        break;

                    case 'page':
                        key = '' + model.get('options').get('pageid');
                        break;

                    default :
                        key = model.get('actionkey');
                        break;
                }

                if(type == 'page') {

                    _that.dataPicker.unselectObjects();
                    componentsCollection = [];
                    componentsCollection.push( key );
                    _that.model.set('objs', componentsCollection);
                    _that.dataPicker.selectObjects( componentsCollection );

                    _that.renderComponentContainer( type );
                    _that.saveChanges();

                }else{

                    var exist = componentsCollection.indexOf( '' + key );

                    if(exist == -1){  // Nie ma
                        componentsCollection.push( '' + key );

                    }else{


                        _that.dataPicker.unselectObjects();
                        var index = componentsCollection.indexOf(key);
                        componentsCollection.splice(index, 1);
                        _that.model.set('objs', componentsCollection);
                        _that.dataPicker.selectObjects( componentsCollection );

                    }

                    _that.renderComponentContainer( type );
                    _that.saveChanges();
                }



            });

            $('body').append( this.dataPicker.render().$el );
        }
    },

    saveChanges: function(){


        this.$el.trigger('save-changes', this.model, this);
    },

    clearComponentContainer : function( ){

        var triggerComponentsContainer = this.$el.find('.trigger-components-container');
        triggerComponentsContainer.html( '' );
    },

    renderComponentContainer : function( pickerType  ){

        var _that = this;


        var componentsCollection = _that.model.get('objs');

        var triggerComponentsContainer = this.$el.find('.trigger-components-container');
        triggerComponentsContainer.html( '' );

        var triggerVariablesContainer = this.$el.find('.trigger-variables-container');
        triggerVariablesContainer.html( '' );

        var triggerLinkContainer = this.$el.find('.trigger-link-container');
        triggerLinkContainer.html( '' );

        if(componentsCollection.length > 0){


            _.each(componentsCollection, function( key ){

                var componentModel = DataPickerView.findModel( key, pickerType );

                if(componentModel != undefined){

                    var componentType = componentModel.get('type');

                    var actionType = _that.getActionType(componentModel);


                    var miniature = $('<div>', {
                        class: 'ex-object',
                        componenttype : componentType,
                        actionkey :  key,
                        action: actionType
                    });

                    triggerComponentsContainer.append(miniature);
                }

            });

        }else{

            var pType = this.$el.find('.trigger-data-picker-icon').attr('picker');

            var textSelector = $('<div>', {
                text: _lang('TRIGGER_SELECTOBJECTSTITLE'),
                class:'trigger-data-picker-text',
                picker: pType
            });

            triggerComponentsContainer.html( textSelector );
        }
    },

    getActionType: function(model){

        var instance1 = model instanceof ComponentModel;
        var instance2 = model instanceof TimelineRowModel;
        var instance3 = model instanceof PageModel;

        if(instance1) {
            return 'object';
        }else if(instance2){
            return 'line';
        }else if(instance3){
            return 'page';
        }else{
            return '';
        }

    },

    addAnimationToTrigger: function(e) {
        var _that = this;



        var sender = $(e.target);

        if(this.animationView == undefined){



            var actionValue = this.$el.find('.trigger-action-select').val();

            var windowType = ""; // animIn, animOut

            if(actionValue == 'showObject' || actionValue == 'showLine'){
                windowType = "animIn";
            }

            if(actionValue == 'hideObject'  || actionValue == 'hideLine'){
                windowType = "animOut";
            }

            if(windowType ==""){
                return;
            }


            var triggerOptsModel = this.model.get('opts');
            var triggerOptsObject = triggerOptsModel.get('animationType').toJSON();

            this.animationView = WindowFactory.createAnimateWindow(triggerOptsObject);
            this.animationView.on('on-close', function(){
                _that.animationView = undefined;
            });

            this.animationView.on('on-animation-selected', function( animationType ){
                triggerOptsModel.set('animationType', new TriggerAnimationTypeModel(animationType) );

                sender.val(_lang('ANIMATION_'+ animationType.animationName ));

                _that.saveChanges();
            });


            $('body').append( this.animationView.render({title: _lang('ANIMATIONWINDOW_TITLE_'+windowType), animations: window._layout.animations[windowType], animationMainType: windowType}).$el );

            var windowPosition = {
                top: e.pageY,
                left: e.pageX
            }

            this.animationView.setWindowPosition( windowPosition );
        }
    },

    deleteTrigger: function(){

        this.$el.trigger('delete-one-trigger', this.model, this);
    },

    update :function(){

    },

    initializeTriggerOption :function(){

        this.triggerWhatToDo = new TriggerActionsCollection();
        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_OBJS'), options: [
            { name: _lang('TRIGGER_WTD_SHOWOBJ'), value: 'showObject', picker:'object' },
            { name: _lang('TRIGGER_WTD_HIDEOBJ'), value: 'hideObject', picker:'object' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_LINES'), options: [
            { name: _lang('TRIGGER_WTD_SHOWLINE'), value: 'showLine', picker:'line' },
            { name: _lang('TRIGGER_WTD_HIDELINE'), value: 'hideLine', picker:'line' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_PAGES'), options: [
            { name: _lang('TRIGGER_WTD_GOTOPAGE'), value: 'gotopage', picker:'page' },
            { name: _lang('TRIGGER_WTD_NEXTPAGE'), value: 'gotonextpage', picker:'none' },
            { name: _lang('TRIGGER_WTD_PREVPAGE'), value: 'gotoprevpage', picker:'none' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_WTD_VARS'), options: [
            { name: _lang('TRIGGER_WTD_CHANGEVARVALUE'), value: 'changevarvalue', picker:'none' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_WTD_ETC'), options: [
            { name: _lang('TRIGGER_WTD_ETC_PLAYAUDIO'), value: 'playobjectsound', picker:'object' },
            { name: _lang('TRIGGER_WTD_ETC_UNLOCKNAVI'), value: 'unlockpagenavigation', picker:'none' },
            { name: _lang('TRIGGER_WTD_ETC_RESETQUESTIONS'), value: 'resetExerciseApproach', picker:'none' },
            { name: _lang('TRIGGER_WTD_ETC_GO_TO_LINK'), value: 'goToLink', picker:'none' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_EXERCISE'), options: [
            { name: _lang('TRIGGER_EXERCISE_CHECK_EXERCISE'), value: 'checkExercise', picker:'object' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

    },

    onTriggerLinkChanged :function(e){

        var value = $(e.target).val();

        this.model.get('opts').set('link', value, {silent:true});

        this.saveChanges();
    },

    onTriggerActionChanged: function(e){

        var sender = $(e.target);
        var value = sender.val();
        var picker = sender.find(':selected').attr('picker');
        sender.attr('picker', picker);

        this.model.get('opts').set('animationType', new TriggerAnimationTypeModel());

        var animationName = this.model.get('opts').get('animationType').get('animationName');
        this.$el.find('.trigger-add-animation-to-trigger').val(_lang('ANIMATION_'+ animationName ));

        this.model.set('whattodo', value, { silent:true });

        if(((this.lastActionValue == 'showObject' && value == 'hideObject') ||
            (this.lastActionValue == 'hideObject' && value == 'showObject')) ||

            ((this.lastActionValue == 'showLine' && value == 'hideLine') ||
             (this.lastActionValue == 'hideLine' && value == 'showLine'))){


        }else{

            this.model.set('objs', [], { silent:true });

            switch (value){
                case 'changevarvalue':
                    this.renderVariablesContainer();
                    break;

                case 'goToLink':
                    this.renderLinkContainer();
                    break;

                default :
                    this.renderComponentContainer( picker );
                    this.validateControls( picker );
                    break;
            }

            this.showConditionSection();


        }

        this.lastActionValue = value;

        this.saveChanges();

    },

    validateControls: function( picker ){

        var triggerAddAnimationToTrigger = this.$el.find('.trigger-add-animation-to-trigger');
        var triggerComponentsContainer = this.$el.find('.trigger-components-container');
        var triggerActionSelect = this.$el.find('.trigger-action-select');
        var dataPickerIcon = this.$el.find('.trigger-data-picker-icon');
        var dataPickerText = this.$el.find('.trigger-data-picker-text');
        dataPickerIcon.attr('picker', picker);
        dataPickerText.attr('picker', picker);


        if(picker == 'none' || picker == 'page' ||  picker == undefined || triggerActionSelect.val() == 'playobjectsound' ){
            triggerAddAnimationToTrigger.attr('disabled', 'disabled');
        }else{
            triggerAddAnimationToTrigger.removeAttr('disabled');
        }

        if(picker == 'none' || picker == undefined){

            dataPickerIcon.attr('disabled', 'disabled');
            triggerComponentsContainer.attr('disabled', 'disabled');
        } else{

            dataPickerIcon.removeAttr('disabled');
            triggerComponentsContainer.removeAttr('disabled');
        }
    },

    getSubtriggerOptions: function(){

        var options = {};
        //options.whendoit = this.getTriggerWhenDoIt();
        options.whattodo = this.getTriggerWhatToDo();
        options.components = [];

        return options;
    },

    render: function(){

        var options = this.getSubtriggerOptions();

        var template = this.template( options );
        this.$el.html(template);

        this.setValues();

        this.delegateEvents();

        return this;
    },

    showConditionSection :function(){
        this.$el.trigger('show-condition-section', {}, this);
    },


    setValues :function(){

        var whattodo = this.model.get('whattodo');
        this.$el.find('.trigger-action-select').val(whattodo);

        this.lastActionValue = whattodo;

        var triggerActionSelect = this.$el.find('.trigger-action-select');
        var triggerDataPickerIcon = this.$el.find('.trigger-data-picker-icon');
        var triggerDataPickerText = this.$el.find('.trigger-data-picker-text');

        var triggerDelayInput = this.$el.find('.trigger-delay-input');
        triggerDelayInput.val( this.model.get('opts').get('delay'));

        var picker = this.getPickerTypeByActionFunction( whattodo );
        triggerActionSelect.val(whattodo);
        triggerActionSelect.attr('picker', picker);
        triggerDataPickerIcon.attr('picker', picker);
        triggerDataPickerText.attr('picker', picker);

        this.validateControls( picker );

        switch (whattodo){
            case 'changevarvalue':
                this.renderVariablesContainer();
                break;

            case 'goToLink':
                this.renderLinkContainer();
                break;

            default :
                this.renderComponentContainer( picker );
                break;
        }

        var animationName = this.model.get('opts').get('animationType').get('animationName')
        this.$el.find('.trigger-add-animation-to-trigger').val(  _lang('ANIMATION_'+ animationName ) );


        this.showConditionSection();
    },

    renderLinkContainer: function(){

        var triggerDataPickerIcon = this.$el.find('.trigger-data-picker-icon');
        var triggerAddAnimationToTrigger = this.$el.find('.trigger-add-animation-to-trigger');
        var triggerComponentsContainer = this.$el.find('.trigger-components-container');
        triggerComponentsContainer.html( '' );
        triggerComponentsContainer.attr('disabled', 'disabled');

        var triggerVariablesContainer = this.$el.find('.trigger-variables-container');
        triggerVariablesContainer.html('');

        var triggerLinkContainer = this.$el.find('.trigger-link-container');

        var template = this.templateLink( this.model.toJSON() );
        triggerLinkContainer.html( template );

        triggerAddAnimationToTrigger.attr('disabled', 'disabled');
        triggerDataPickerIcon.attr('disabled', 'disabled');
    },

    renderVariablesContainer: function(){

        var triggerDataPickerIcon = this.$el.find('.trigger-data-picker-icon');
        var triggerAddAnimationToTrigger = this.$el.find('.trigger-add-animation-to-trigger');
        var triggerComponentsContainer = this.$el.find('.trigger-components-container');
        triggerComponentsContainer.html( '' );
        triggerComponentsContainer.attr('disabled', 'disabled');

        var triggerLinkContainer = this.$el.find('.trigger-link-container');
        triggerLinkContainer.html( '' );

        var triggerVariablesContainer = this.$el.find('.trigger-variables-container');

        var options = {};
        options.projectVariables = ProjectModel.instance.get('options').get('projectVariables');

        var template = this.templateVariables( options );
        triggerVariablesContainer.html( template );


        var objs = this.model.get('objs');

        var variable = this.$el.find('.trigger-varpicker');
        var action = this.$el.find('.trigger-varactionpicker');
        var varValue = this.$el.find('.trigger-varchange-input');

        variable.val( objs.varName );
        action.val(objs.varAction);
        varValue.val(objs.varValue);

        triggerAddAnimationToTrigger.attr('disabled', 'disabled');
        triggerDataPickerIcon.attr('disabled', 'disabled');

    },

    getTriggerWhatToDo :function(){

        var triggerWhatToDo = this.componentModel.getTriggerWhatToDo();

        var tempArr = this.triggerWhatToDo.toJSON().concat( triggerWhatToDo );

        return tempArr;
    },

    getPickerTypeByActionFunction: function( whatToDo ){
        switch (whatToDo){
            case 'showObjects':
                return 'object';
                break;

            case 'showObject':
            case 'hideObject':
                return 'object';
                break;

            case 'showLine':
            case 'hideLine':
                return 'line';
                break;

            case 'gotopage':
                return 'page';
                break;

            case 'gotonextpage':
                return 'none';
                break;

            case 'gotoprevpage':
                return 'none';
                break;

            case 'changevarvalue':
                return 'none';
                break;

            case 'playobjectsound':
                return 'object';
                break;

            case 'unlockpagenavigation':
                return 'none';
                break;

            case 'resetExerciseApproach':
                return 'object';
                break;

            case 'goToLink':
                return 'none';
                break;

            case 'checkExercise':
                return 'object';
                break;

            default :
                return 'none';
                break;
        }
    },






    renderStandardTemplate: function(){

    },

    renderObjectsTemplate: function(){

    },

    renderLayersTemplate: function(){

    },

    renderPagesTemplate: function(){

    },

    renderPagesTemplate: function(){

    },

    renderChangeVariableTemplate: function(){

    },

    renderChangeVariableTemplate: function(){

    },

    renderPlaySoundTemplate: function(){

    },

    renderPlaySoundTemplate: function(){

    },

    renderGoToLinkTemplate: function(){

    },

    renderCheckExerciseTemplate: function(){

    }

});
