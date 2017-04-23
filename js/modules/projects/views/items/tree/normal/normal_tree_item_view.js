var NormalTreeItemView = TreeItemView.extend({

	className: 'tree-item normal-tree-item',
	tagName: 'li',

    template: _.template($('#projectslist-normal-tree-item-template').html()),

});