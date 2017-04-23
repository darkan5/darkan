var UserInCourseItemDetailsView = ItemLayoutView.extend({

    className: 'dashboard-item',

    template: '#user-incourse-item-details-template',
    initialize: function(data){

        this.model = new UserInCourseDetailsItemModel(data);
        this.model.on('change', this.onModelChanged, this);
    },
});
