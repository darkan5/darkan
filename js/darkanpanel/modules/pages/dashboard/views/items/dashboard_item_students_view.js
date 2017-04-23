var DashboardItemStudentsView = DashboardItemView.extend({

	className: 'dashboard-item',

    bindings:{
       '.huge number-of-users': 'numberOfUsers'
    },

    template: '#dashboard-item-students-template',
    initialize: function(){

    	this.model = new DashboardStudentsItemModel();
    	this.model.on('change', this.onModelChanged, this);
    },
});
