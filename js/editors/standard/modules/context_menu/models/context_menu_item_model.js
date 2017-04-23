var ContextMenuItemModel = Backbone.Model.extend({
    defaults:{
        componentName: 'componentName',
        prettyName: '',
        action: '',
        className: 'big-btn',
        subitems: [ ],
        title : '',
        disabled : false
    }
});
