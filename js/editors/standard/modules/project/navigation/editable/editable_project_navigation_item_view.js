var EditableProjectNavigationItemView = ProjectNavigationItemView.extend({

	className: 'project-navigation-item-view editable-project-navigation-item-view',

	template: _.template($('#project-navigation-item-template').html()),

	showContextMenu: function(e) {

        var contextMenuView = new NavigationItemViewContextMenuView({ model: this.model, view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },


});