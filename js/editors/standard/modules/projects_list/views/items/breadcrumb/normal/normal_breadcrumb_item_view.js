var NormalBreadcrumbItemView = BreadcrumbItemView.extend({

	className: 'normal-breadcrumb-item',

    template: _.template($('#projectslist-normal-breadcrumb-item-template').html()),

});

var SharedTemplateBreadcrumbItemView = BreadcrumbItemView.extend({

	className: 'normal-breadcrumb-item shared-template-breadcrumb-item',

    template: _.template($('#projectslist-shared-template-breadcrumb-item-template').html()),

});

