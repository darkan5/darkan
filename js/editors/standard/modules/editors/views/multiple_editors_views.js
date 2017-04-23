var MultipleEditorView = EditorView.extend({

    template: _.template($('#multiple-editor-template').html()),

    disableIfNotActive: function() {

        var menuBottomTabs = $('#menu-bottom-tabs')

        menuBottomTabs.tabs({
            disabled: [ 1, 2, 5, 6, 7, 8 ]
        });

        var active = menuBottomTabs.tabs( "option", "active");

        if(active != 0){
            menuBottomTabs.tabs( "option", "active", 0 );

            StageView.instance.timeline.afterRender();
        }
    }

});