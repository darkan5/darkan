var TriggerWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window trigger-window',

    wrapperTemplate: _.template($('#trigger-wrapper-template').html()),

    triggerWhenDoIt : [],
    triggerWhatToDo : [],

    minimizeed : false,
    state : 1,
    isVisible : true,

    events:{
        'select-list-item': 'selectListItem',
        'update': 'update',
        'save-asda': 'update',
        'delete-trigger': 'deleteTrigger',
        'copy-trigger': 'copyTrigger',
        'click .trigger-create-new-interaction': 'creteNewInteraction',

        'click .window-close-button': 'minimize',
        'click .trigger-maximize-button': 'maximize',

        'hide-trigger': 'hideTrigger',
        'show-trigger': 'showTrigger',
        'resize': 'onResize'
    },

    afterInitialize: function() {

    },

    onResize: function() {
    },

    showTrigger: function(){
        this.isVisible = true;
        this.show();
    },

    hideTrigger: function(){
        this.isVisible = false;
        this.hide();
    },

    minimize: function() {

        var triggersCollection = this.model.get('triggers');

        if(this.minimizeed == false){

            if(triggersCollection.length > 0){

                this.stage.resetStage();
                this.list.resetList();

                if(this.state == 1 ){
                    this.minimizeWindow();
                }

                this.state = 1;

            }else{

                 this.minimizeWindow();
            }


        }
    },

    minimizeWindow: function(){
        //this.model = new TriggerModel();

        this.minimizeed = true;
        this.state = 0;

        this.$el.html('<div class="window-top-bar window-minimized-top-bar">\
            ...\
            </div>\
            <div type="button" class="trigger-maximize-button">\
                <div class="trigger-items-minimize-count"></div>\
            </div>');

        this.displayTriggerItemsCount();
    },

    maximize: function() {

        this.minimizeed = false;
        this.state = 1;

        this.run();

    },

    escape: function(){

        if(this.isVisible){
            this.minimize();
        }
    },

    creteNewInteraction: function(){

        var triggerInteractionModel = this.model.createNewInteractionModel();
        var triggersCollection = this.model.get('triggers');
        this.list.addNewInteraction(triggerInteractionModel);
        this.render();

        this.selectListItem('', triggerInteractionModel );

        this.saveInteraction();
    },

    copyTrigger: function(event, model){


        var triggerString =  JSON.stringify( model.toJSON());
        var triggerJson =  JSON.parse( triggerString);

        var copyModel = this.model.loadOnTriggerOption( triggerJson );

        var triggersCollection =  this.model.get('triggers');
        triggersCollection.add( copyModel );

        this.list.render();

        this.saveInteraction();
    },

    deleteTrigger: function(event, model){


        var triggersCollection =  this.model.get('triggers');
        var index = triggersCollection.indexOf(model);

        triggersCollection.remove( model );

        var triggerInteractionModel = triggersCollection.at(index);

        if(triggerInteractionModel != undefined){

            this.list.selectedItemModel = triggerInteractionModel;
            this.list.render();

            this.stage.setModel( triggerInteractionModel );
        }else{

            triggerInteractionModel = triggersCollection.last();

            if(triggerInteractionModel != undefined){

                this.list.selectedItemModel = triggerInteractionModel;
                this.list.render();

                this.stage.setModel( triggerInteractionModel );

            }else{

                //this.render();

                this.list.resetList();
                this.stage.resetStage();
            }
        }

        this.update();
    },

    update: function(event, model){

        //this.stage.resetStage( );

        this.list.render();

        this.saveInteraction();
    },

    selectListItem: function(event, model){

        this.state = 2;

        this.animateList();

        this.stage.setModel( model );


        this.$el.append( this.stage.render().$el );
    },

    animateList: function(data){

        var triggersList = this.$el.find('.trigger-list');

        triggersList.css({
            position: 'absolute',
            'border-width': '3px'
        });


        triggersList.animate({top: '-3px', left: "-" + (triggersList.width()+7) + "px"}, 500);
    },

    initialize: function(data){

        this.windowModel = data.windowModel;

        this.stageView = data.stageView;
        this.model = new TriggerModel();
        this.makeDraggable();

        this.list = new TriggerListView({ collection: new TriggerInteractionCollection });
        this.stage = new TriggerStageView({ model: new TriggerInteractionModel });
    },

    render : function(){

        var wrapperTemplate = this.wrapperTemplate(this.model.toJSON());
        this.$el.html(wrapperTemplate);

        this.$el.append( this.list.render().$el );
        //this.$el.append( this.stage.render().$el );

        this.delegateEvents();

        return this;
    },

    changeJsonModelToActionkeyArray : function(array){

        for (var j = 0; j < array.length; j++) {
            var item = array[j];
            var objs = item.objs;
            var actionkeys = _(objs).pluck('actionkey');


            if(actionkeys.length > 0){
                item.objs = actionkeys;
            }else{

                var lineIds = _(item.options).pluck('id');


                item.objs = lineIds;
            }

        }
    },

    saveInteraction: function(callChaneges){

        var _that = this;

        callChaneges == undefined ? false : callChaneges;

        var triggersCollection =  this.model.get('triggers');



        var contain =  triggersCollection.contains( this.triggerInteractionModel );
        if(!contain){
            triggersCollection.add(this.triggerInteractionModel);
        }

        var triggers = triggersCollection.toJSON();

        this.componentModel.set('triggers', triggers, { silent:true });

        if(this.componentModel.miniatureView != undefined){
            this.componentModel.miniatureView.renderTriggers();
        }

        this.componentModel.trigger('change', ['triggers']);

        //if(callChaneges){
            this.componentModel.triggerChanged();
        //}

    },

    getModelType: function( model ){

        var instance = model instanceof ComponentModel;

        if(instance == true){
            return _lang('TRIGGER_OBJECT');
        }else{
           return _lang('NEW_PAGE_TITLE');
        }

    },

    setTextToTopBar: function( model ){

        var modelType = this.getModelType( model );

        this.$el.find('.window-top-bar').html(modelType);
    },

    setModel: function(componentModel){

        if(!StageView.instance.canEdit){
            this.$el.hide();
        }else{

            this.setComponentTriggerArrayToTrigger(componentModel);
            this.displayTriggerItemsCount();

            if(this.isVisible){

                this.state = 1;

                if(!this.minimizeed){
                    this.run();
                }

                //this.run();

                this.$el.show();
            }
        }
    },



    displayTriggerItemsCount: function(componentModel){

        var triggers = this.model.get('triggers');

        if(triggers){
            var minimizeCount = this.$el.find('.trigger-items-minimize-count');

            var count =  triggers.length;

            minimizeCount.html(count);
        }

    },

    setComponentTriggerArrayToTrigger: function(componentModel){

        this.componentModel = componentModel;

        var componentTriggers = this.componentModel.get('triggers');

        this.triggerInteractionCollection = this.model.loadTrigger( componentTriggers, this.stageView );

        this.model.set('triggers', this.triggerInteractionCollection);
        //this.model.on('open-trigger', this.openTrigger, this);

        this.componentModel.off('change:scoreSuccess');
        this.componentModel.off('change:scoreFail');
        this.componentModel.off('change:scoreBadAnswer');
        this.listenTo(this.componentModel, 'change:scoreSuccess', this.onScoreSuccessChanged );
        this.listenTo(this.componentModel, 'change:scoreFail', this.onScoreFailChanged );
        this.listenTo(this.componentModel, 'change:scoreBadAnswer', this.onScoreBadAnswerChanged );
    },

    setCollection: function(collection){

        if(this.isVisible){

            this.state = 1;

            this.componentsCollection = collection;

            if(!this.minimizeed){

                this.list.$el.hide();
                //this.$el.find('.window-top-bar').html('&nbsp;');



            }

            this.$el.hide();
        }
    },



    run: function(){



        this.list = new TriggerListView( {collection:this.triggerInteractionCollection} );
        this.stage = new TriggerStageView({ model: this.triggerInteractionCollection.first(), componentModel:this.componentModel });
        //this.stage.setModel( triggerInteractionCollection.first() );

        this.list.$el.show();

        this.render();
        this.setTextToTopBar( this.componentModel );
    },

    openTrigger: function(){
        this.maximize();
    },

    onScoreSuccessChanged: function(model){

        var subtriggerOpts = this.findSubtriggerOpts('custom_questionpassed');

        var scoreSuccess = model.get('scoreSuccess');
        this.setScoreTrigger(subtriggerOpts, scoreSuccess, 'custom_questionpassed');

        ProjectModel.instance.calculateAllScoreSuccessPoints();
    },

    onScoreFailChanged: function(model){

        var subtriggerOpts = this.findSubtriggerOpts('custom_questionfailed');

        var scoreFail = model.get('scoreFail');
        this.setScoreTrigger(subtriggerOpts, scoreFail, 'custom_questionfailed');
    },

    onScoreBadAnswerChanged: function(model){

        var subtriggerOpts = this.findSubtriggerOpts('custom_questionbadanswer');

        var scoreBadAnswer = model.get('scoreBadAnswer');
        this.setScoreTrigger(subtriggerOpts, scoreBadAnswer, 'custom_questionbadanswer');
    },

    setScoreTrigger: function(subtriggerOpts, varValue, whendoit){



        var triggersCollection = this.model.get('triggers');

        if(subtriggerOpts != undefined && subtriggerOpts.objs != undefined){

            var objs = subtriggerOpts.objs;
            var triggerId = subtriggerOpts.triggerId;
            var subtriggerId = subtriggerOpts.subtriggerId;

            objs.varValue = varValue;


            var triggerModel = triggersCollection.at(triggerId);
            var subtriggerModel = triggerModel.get('subtriggers').at(subtriggerId);

            if(this.minimizeed == false){
                this.list.selectItem('change-list', triggerModel );
                this.selectListItem('change-list', triggerModel );
            }

            subtriggerModel.trigger('mark-for-a-while');

            this.saveInteraction(false);

        }else{

            objs = {};

            objs.varName = '00000000000000000000000000000000';
            objs.varAction = 'add';
            objs.varValue = varValue;

            var interactionModel = this.model.createNewInteractionModel();

            interactionModel.set('whendoit', whendoit);

            var subtriggers = interactionModel.get('subtriggers');

            var triggerSubtriggerModel = this.createNewSubtrigger();

            triggerSubtriggerModel.set('whattodo', 'changevarvalue');
            triggerSubtriggerModel.set('objs', objs);

            subtriggers.add(triggerSubtriggerModel);

            triggersCollection.add(interactionModel);

            this.list.collection = triggersCollection;

            this.list.render();

            if(this.minimizeed == false){
                this.list.selectItem('change-list', interactionModel );
                this.selectListItem('change-list', interactionModel );
            }

            this.model.set('triggers', triggersCollection);

            triggerSubtriggerModel.trigger('mark-for-a-while');

            this.saveInteraction(false);
        }

        this.displayTriggerItemsCount();
    },

    findSubtriggerOpts: function( whenDoItSearcher ){

        var triggers = this.componentModel.get('triggers');

        if(triggers == undefined){
            return undefined;
        }

        for (var i = 0; i < triggers.length; i++) {
            var trigger = triggers[i];

            var subtriggers = trigger.subtriggers;

            var whenDoIt = trigger.whendoit;

            if(whenDoIt == whenDoItSearcher){
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

    createNewSubtrigger: function(e){

        var triggerSubtriggerModel = new TriggerSubtriggerModel({
            //whendoit: '',
            whattodo: '',
            objs: [],
            opts:  new TriggerOptsModel({
                animationType: new TriggerAnimationTypeModel(),
                delay: 0,
                transition : {},
                notadded : true
            })
        });

        return triggerSubtriggerModel;
    },

});
