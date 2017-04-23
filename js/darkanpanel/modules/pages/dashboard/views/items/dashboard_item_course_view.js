var DashboardItemCourseView = DashboardItemView.extend({

	className: 'dashboard-item',

    bindings:{
        '.huge number-of-courses': 'numberOfCourses'
    },

    template: '#dashboard-item-course-template',
    initialize: function(data){

    	this.model = new DashboardCourseItemModel(data.userType);
    	this.model.on('change', this.onModelChanged, this);

        _log('initialize dashboard-item-course', this.model);
    },
});
