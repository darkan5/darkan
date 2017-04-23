var QclGoodAnswerContextMenuView = QclContextMenuView.extend({

    template: _.template($('#qcl-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'edit':
                this.view.showEditWindowForOneObject(this.e);
                break;

            case 'delete':
                this.view.deleteGoodObject(this.e);
                break;
        }

        this.close();
    }

});
