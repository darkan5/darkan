var TriggerModel = Backbone.Model.extend({
    defaults:{
        triggers: new TriggerInteractionCollection(),
        complete: false,
        draggable: true
    },

    loadOnTriggerOption: function( trigger ){
        var triggerIfOptionCollection = new TriggerIfOptionCollection();

        for (var i = 0; i < trigger.conditions.length; i++) {
            var condition = trigger.conditions[i];
            var triggerIfOptionModel =   new TriggerIfOptionModel(condition)
            triggerIfOptionCollection.add(triggerIfOptionModel);
        }

        var triggerElseOptionCollection = new TriggerElseOptionCollection();

        for (var i = 0; i < trigger.elseactions.length; i++) {
            var elseaction = trigger.elseactions[i];

            var triggerOptsModel = new TriggerOptsModel({
                animationType: new TriggerAnimationTypeModel(elseaction.opts.animationType),
                delay: elseaction.opts.delay,
                link: elseaction.opts.link,
                transition : elseaction.opts.transition,
                notadded : elseaction.opts.notadded,
                video : elseaction.opts.video,
                style : elseaction.opts.style,
            });

            var componentCollection = elseaction.objs;

//                    for (var k = 0; k < elseaction.objs.length; k++) {
//                        var actionkey = elseaction.objs[k];
//
//                        var componentModel = stageView.timeline.getComponentModelByActionkey( actionkey );
//                        componentCollection.add(componentModel);
//                    };

            var triggerElseActionModel =   new TriggerElseActionModel({
                whendoit: elseaction.whendoit,
                whattodo: elseaction.whattodo,
                objs: componentCollection,
                opts: triggerOptsModel
            });

            triggerElseOptionCollection.add(triggerElseActionModel);
        }

        var triggerSubtriggerCollection = new TriggerSubtriggerCollection();

        for (var i = 0; i < trigger.subtriggers.length; i++) {
            var subtrigger = trigger.subtriggers[i];

            var triggerOptsModel = new TriggerOptsModel({
                animationType: new TriggerAnimationTypeModel(subtrigger.opts.animationType),
                delay: subtrigger.opts.delay,
                link: subtrigger.opts.link,
                transition : subtrigger.opts.transition,
                notadded : subtrigger.opts.notadded,
                video : subtrigger.opts.video,
                style : subtrigger.opts.style,
            });

            var componentCollection = subtrigger.objs;

//                    for (var j = 0; j < subtrigger.objs.length; j++) {
//                        var actionkey = subtrigger.objs[j];
//
//
//                        var componentModel = stageView.timeline.getComponentModelByActionkey( actionkey );
//                        componentCollection.add(componentModel);
//
//                    };

            var triggerSubtriggerModel =   new TriggerSubtriggerModel({
                whendoit: subtrigger.whendoit,
                whattodo: subtrigger.whattodo,
                objs: componentCollection,
                opts: triggerOptsModel
            });

            triggerSubtriggerCollection.add(triggerSubtriggerModel);
        }

        var triggerInteractionOptsModel = new TriggerInteractionOptsModel(trigger.opts);

        var triggerInteractionModel = new TriggerInteractionModel({
            whendoit: trigger.whendoit,
            opts: triggerInteractionOptsModel,
            conditions: triggerIfOptionCollection,
            elseactions: triggerElseOptionCollection,
            subtriggers: triggerSubtriggerCollection
        });

        return triggerInteractionModel;
    },

    loadTrigger: function( componentTriggers ){

        var stageView = StageView.instance;

        var triggerInteractionCollection = new TriggerInteractionCollection();

        if(componentTriggers != undefined){

            for (var n = 0; n < componentTriggers.length; n++) {
                var trigger = componentTriggers[n];

                var triggerInteractionModel = this.loadOnTriggerOption( trigger );

                triggerInteractionCollection.add( triggerInteractionModel );
            };
        }

        return triggerInteractionCollection;
    },

    createNewInteractionModel : function(){

        return new TriggerInteractionModel({
            whendoit: '',
            opts : new TriggerInteractionOptsModel(),
            conditions: new TriggerIfOptionCollection(),
            elseactions: new TriggerElseOptionCollection(),
            subtriggers: new TriggerSubtriggerCollection()
        });
    }
});