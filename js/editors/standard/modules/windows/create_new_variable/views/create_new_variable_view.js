var CreateNewVariableWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-create-new-variable-view',

    template: _.template($('#window-create-new-variable-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
              'click .create-new-variable-add-button': 'createNewVariable',
              'delete-variable': 'deleteVariable',
              'update-changes': 'saveChanges',
              'update-sort': 'updateSort'
        });
    },

    updateSort: function(event, model, position) {

        var collection = this.collection;

        collection.remove(model);
        collection.add(model, {at: position});

        this.saveChanges();
    },

    deleteVariable: function(event , model){
        this.collection.remove(model);
        this.afterRender();

        this.saveChanges();
    },

    afterRender: function(){

        this.$el.find('.darkan-tabs').tabs();

        this.$el.find('.user-variables-list').html('');

        if(this.collection != undefined && this.collection.length > 0){
            this.collection.each(this.addVariableItem, this);
        }

        this.$el.find('.user-variables-list').sortable({
            delay: 50,
            update: function(event, ui) {
                ui.item.trigger('drop-item', ui.item.index());
            }
        });

        this.$el.find('.project-variables-list').html('');

        if(this.collection2 != undefined && this.collection2.length > 0){
            this.collection2.each(this.addVariableItemStatic, this);
        }
    },


    addVariableItem: function( variableItem ){

        var createNewVariableItemView = new CreateNewVariableItemView({ model: variableItem });
        this.$el.find('.user-variables-list').append(createNewVariableItemView.render().$el);

    },

    addVariableItemStatic: function( variableItem ){

        var createNewVariableStaticVariableItemView = new CreateNewVariableStaticVariableItemView({ model: variableItem });
        this.$el.find('.project-variables-list').append(createNewVariableStaticVariableItemView.render().$el);

    },

    createNewVariable: function(e){

        var varhash = Utils.generateUniqueHash();

        var newVariable = new CreateNewVariableItemModel({ varhash:varhash });

        this.collection.add(newVariable);

        this.afterRender();

        this.saveChanges();
    },

    runListeners :function(){

        this.collection =  new CreateNewVariableCollection();

        var projectVariables = ProjectModel.instance.get('options').get('projectVariables');

        for (var i = 0; i < projectVariables.length; i++) {

            var projectVariable = projectVariables[i];

            var variableModel = new CreateNewVariableItemModel(projectVariable);

            this.collection.add(variableModel);
        };

        this.collection2 =  new CreateNewVariableCollection();

        var staticVariables = ProjectModel.instance.get('options').get('staticVariables');

        for (var i = 0; i < staticVariables.length; i++) {

            var projectVariable = staticVariables[i];

            var variableModel = new CreateNewVariableItemModel(projectVariable);

            this.collection2.add(variableModel);
        };
    },

    saveChanges: function(){

        var options = ProjectModel.instance.get('options');
        options.set('projectVariables', this.collection.toJSON());
    },

    onClose : function(){

        this.trigger('on-close', this, this);
    }

});
