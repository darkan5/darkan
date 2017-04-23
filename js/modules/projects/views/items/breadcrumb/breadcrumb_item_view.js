var BreadcrumbItemView = ProjectListItemView.extend({

	className: 'breadcrumb-item',

    template: _.template($('#projectslist-breadcrumb-item-template').html()),

    events:{
    	'click' : 'backToFolder'
    },

    backToFolder:function(e){

    	this.trigger('back-to-folder', this.model);
    }

});