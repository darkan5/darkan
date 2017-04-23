var ReportEditorView = EditorView.extend({

    //el: '#botmenu-report',

    template: _.template($('#report-editor-template').html()),

//    events: function(){
//        return _.extend({},EditorView.prototype.events,{
//
//        });
//    },

    bindings: {

    },

    renderPanels: function(){

        var panel = MenuPanelsFactory.createReportsPanel();
        panel.setModel(this.model);
        this.$el.append(panel.render().$el);
        panel.afterRender();
    },

    onSetModel: function() {
        //this.render();
    },

});