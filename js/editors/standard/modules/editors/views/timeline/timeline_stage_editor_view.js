var TimelineStageEditorView = TimelineEditorView.extend({

    template: _.template($('#timeline-editor-stage-template').html()),

    events: {
        'click .change-timeline-button': 'changeTimeline'
    },

    bindings: {
        '.timeline-editor-stage-lifetime': {
            observe: 'stageLifetime',
            onSet: function(val) {

                if(!$.isNumeric(val)){
                    val = 60;
                }

                //this.model.set('x', parseInt(val));
                return val;

            }
        }
    },

    changeTimeline: function(){
        //StageView.instance.changeTimeline();

        this.trigger('change-timeline');
    },

    changeStageLifetime:function(e){

        var stageLifetime = parseInt($(e.target).val());

        this.model.set('stageLifetime', stageLifetime);
    }
});
