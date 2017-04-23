var TimelineComponentsCollectionEditorView = TimelineMultiEditorView.extend({

    template: _.template($('#timeline-editor-collection-template').html()),

    events: function(){
        return _.extend({},TimelineEditorView.prototype.events,{
            'change .timeline-editor-object-lifetime' : 'changeComponentsLifetime',
        });
    }
});
