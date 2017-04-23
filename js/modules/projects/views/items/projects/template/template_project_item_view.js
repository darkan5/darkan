var TemplateProjectItemView = ProjectItemView.extend({

	className: 'projectlist-item template-project-item',

    template: _.template($('#projectslist-template-project-item-template').html()),

});