var TriggerView2 = WindowView.extend({

    tagName: 'div',
    className : 'window trigger2',

    wrapperTemplate: _.template($('#trigger-wrapper-template').html()),

    triggerWhenDoIt : [],
    triggerWhatToDo : [],

    minimizeed : false,

    events:{
        'select-list-item': 'selectListItem',
        'update': 'update',
        'delete-trigger': 'deleteTrigger',
        'click .trigger-create-new-interaction': 'creteNewInteraction',

        'click .window-close-button': 'minimize',
        'click .trigger-maximize-button': 'maximize',

        'hide-trigger': 'hideTrigger',
        'show-trigger': 'showTrigger'
    },

    showTrigger: function(){
        this.show();
    },

    hideTrigger: function(){
        this.hide();
    },

    minimize: function() {

        this.model = new TriggerModel();

        this.minimizeed = true;

        this.$el.html('<div class="window-top-bar window-minimized-top-bar">...</div><input type="button" class="trigger-maximize-button">');

    },

    maximize: function() {

        this.minimizeed = false;

        this.run();

    },

    escape: function(){
        this.minimize();
    },

    creteNewInteraction: function(){

        var triggerInteractionModel = this.model.createNewInteractionModel();
        var triggersCollection = this.model.get('triggers');
        this.list.addNewInteraction(triggerInteractionModel);
        this.render();

        this.selectListItem('', triggerInteractionModel );

        this.saveInteraction();
    },

    deleteTrigger: function(){

        this.list.render();
        this.stage.resetStage();

        this.update();
    },

    update: function(event, model){

        //this.stage.resetStage( );

        this.list.render();

        this.saveInteraction();
    },

    selectListItem: function(event, model){
        this.stage.setModel( model );

        var triggersList = this.$el.find('.trigger-list');

        triggersList.css({
            position: 'absolute',
            'border-width': '3px',
        });


        triggersList.animate({top: '-3px', left: "-" + (triggersList.width()+7) + "px"}, 500);


        this.$el.append( this.stage.render().$el );
    },

    initialize: function(data){

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

    saveInteraction: function(){

        var _that = this;

        var triggersCollection =  this.model.get('triggers');


        var contain =  triggersCollection.contains( this.triggerInteractionModel );
        if(!contain){
            triggersCollection.add(this.triggerInteractionModel);
        }

        var triggers = triggersCollection.toJSON();


        for (var i = 0; i < triggers.length; i++) {

            var trigger = triggers[i];
            var subtriggers = trigger.subtriggers;
            var elseactions = trigger.elseactions;

            this.changeJsonModelToActionkeyArray( subtriggers );
            this.changeJsonModelToActionkeyArray( elseactions );

        };


        this.componentModel.set('triggers', triggers);

    },

    getModelType: function( model ){

        var instance = model instanceof ComponentModel;

        if(instance == true){
            return 'Component';
        }else{
           return 'Stage';
        }

    },

    setTextToTopBar: function( model ){

        var modelType = this.getModelType( model );

        this.$el.find('.window-top-bar').text(modelType);
    },

    setModel: function(componentModel){

        this.componentModel = componentModel;


        if(!this.minimizeed){
            this.run();
        }
    },

    run: function(){

        var componentTriggers = this.componentModel.get('triggers');

        var triggerInteractionCollection = this.model.loadTrigger( componentTriggers, this.stageView );

        this.model.set('triggers', triggerInteractionCollection);

        this.list = new TriggerListView( {collection:triggerInteractionCollection} );
        this.stage = new TriggerStageView({ model: triggerInteractionCollection.first(), componentModel:this.componentModel });
        //this.stage.setModel( triggerInteractionCollection.first() );

        this.render();
        this.setTextToTopBar( this.componentModel );
    }

});
