var TimelineEditorView = EditorView.extend({

    tagName: 'div',

	template: _.template($('#timeline-editor-template').html()),

    events: {
        'click .timeline-editor-add-animation-in' : 'addAnimationIn',
        'click .timeline-editor-add-animation-out' : 'addAnimationOut',
        'click .timeline-editor-add-animation-over' : 'addAnimationOver',
        'click .timeline-editor-add-animation-endless' : 'addAnimationEndless',
        'force-refresh-editor-view': 'forceRefreshEditorView'
    },

    addAnimationIn: function(e) {
        var animationType = 'animIn';
        this.openAnimationWindow(e, animationType);
    },

    addAnimationOut: function(e) {
        var animationType = 'animOut';
        this.openAnimationWindow(e, animationType);
    },

    addAnimationOver: function(e) {
        var animationType = 'animOver';
        this.openAnimationWindow(e, animationType);
    },

    addAnimationEndless: function(e) {
        var animationType = 'animEndless';
        this.openAnimationWindow(e, animationType);
    },

});