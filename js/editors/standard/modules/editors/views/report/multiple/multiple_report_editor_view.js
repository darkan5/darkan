var MultipleReportEditorView = ReportEditorView.extend({

    template: _.template($('#multiple-editor-template').html()),

    onSetCollection: function( collection ) {
        //this.render();
    }

});