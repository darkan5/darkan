var DashboardItemStudentsMailingView = DashboardItemView.extend({

	className: 'dashboard-item',

    bindings:{
       '.huge .number-of-users': 'numberOfMilingUsers'
    },

    template: '#dashboard-item-students-mailing-template',
    initialize: function(){

    	this.model = new DashboardStudentsItemModel();
    	this.model.on('change', this.onModelChanged, this);
    },
});
