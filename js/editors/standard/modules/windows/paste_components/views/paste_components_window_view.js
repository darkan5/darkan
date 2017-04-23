var PasteComponentsWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-paste-components-view',

    template: _.template($('#window-paste-components-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
              // 'click .create-new-variable-add-button': 'createNewVariable',
              // 'delete-variable': 'deleteVariable',
              // 'update-changes': 'saveChanges',
              // 'update-sort': 'updateSort'
        });
    },

    onClose : function(){

        this.trigger('on-close', this, this);
    },

    afterRender: function(){

      var _that = this;

        this.$el.find('.darkan-tabs').tabs();

        DataAccess.getComponentsListToPaste(
            {},
            function(data) { 
                _log('getComponentsListToPaste result: ', data, _log.dataaccessOutResult);

                var copyHash = data.copyHash;
                var cutHash = data.cutHash;
                var deleteHash = data.deleteHash;

                
                _that.addCopyItems(copyHash.list);
                _that.addCutItems(cutHash.list);
                _that.addDeleteItems(deleteHash.list);


            },
            function(data) { 
                _log('getComponentsListToPaste fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    addCopyItems: function(list){

      if(_.isArray(list)){

          for (var i = list.length - 1; i >= 0; i--) {

            var components = list[i];
            var pasteComponentsItemModel = new PasteComponentsItemModel({ components:components, hashId:i, hashName:"copy" });
            var pasteComponentsItemView = new PasteComponentsItemView({ model:pasteComponentsItemModel });
            pasteComponentsItemView.on('paste-components', this.pasteComponents, this);

            this.$el.find('.paste-components-copy-list').append(pasteComponentsItemView.render().$el);
          };
 
      }
    },

    addCutItems: function(list){

      if(_.isArray(list)){

          for (var i = list.length - 1; i >= 0; i--) {

            var components = list[i];
            var pasteComponentsItemModel = new PasteComponentsItemModel({ components:components, hashId:i, hashName:"cut" });
            var pasteComponentsItemView = new PasteComponentsItemView({ model:pasteComponentsItemModel });
            pasteComponentsItemView.on('paste-components', this.pasteComponents, this);

            this.$el.find('.paste-components-cut-list').append(pasteComponentsItemView.render().$el);
          };
 
      }
    },

    addDeleteItems: function(list){

      if(_.isArray(list)){

          for (var i = list.length - 1; i >= 0; i--) {

            var components = list[i];
            var pasteComponentsItemModel = new PasteComponentsItemModel({ components:components, hashId:i, hashName:"delete" });
            var pasteComponentsItemView = new PasteComponentsItemView({ model:pasteComponentsItemModel });
            pasteComponentsItemView.on('paste-components', this.pasteComponents, this);

            this.$el.find('.paste-components-delete-list').append(pasteComponentsItemView.render().$el);
          };
 
      }
    },

    pasteComponents: function(model){

        var hash = {
            hashName:model.get('hashName'),
            hashId:model.get('hashId')
        }

        this.trigger('paste-components', hash);
        this.close();
    }

});
