var ImageComponentContextMenuView = ComponentContextMenuView.extend({

    getSpecificMenu: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([

          new ContextMenuItemModel({
             componentName: 'change-image',
             prettyName: _lang('CONTEXT_MENU_CHANGE_IMAGE'),
             icon: 'text',
             action: 'change-image',
             className: 'big-btn',
          }),
          new ContextMenuItemModel({
             componentName: 'crop-image',
             prettyName: _lang('CONTEXT_MENU_CROP_IMAGE'),
             icon: 'text',
             action: 'crop-image',
             className: 'big-btn',
          })

        ]);

        return contextMenuItemCollection;
    },

    specificAction: function(action){
       switch (action){
            case 'change-image':
                this.model.setComponentAsImage();
                this.view.showImageWindow();
                break;

            case 'crop-image':
                this.view.showCropWindow();
                break;
        }
    }
});

var AudioComponentContextMenuView = ComponentContextMenuView.extend({

    getSpecificMenu: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([

          new ContextMenuItemModel({
             componentName: 'change-audio',
             prettyName: _lang('CONTEXT_MENU_CHANGE_AUDIO'),
             icon: 'text',
             action: 'change-audio',
             className: 'big-btn',
          }),

          new ContextMenuItemModel({
             componentName: 'change-image',
             prettyName: _lang('CONTEXT_MENU_CHANGE_IMAGE'),
             icon: 'text',
             action: 'change-image',
             className: 'big-btn',
          })

        ]);

        return contextMenuItemCollection;
    },

    specificAction: function(action){
       switch (action){
            case 'change-image':
                this.model.setComponentAsImage();
                this.view.showImageWindow();
                break;

            case 'change-audio':
                this.view.uploadOnClick();
                break;
        }
    }
});
