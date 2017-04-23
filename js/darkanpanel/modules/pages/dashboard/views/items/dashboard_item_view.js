var DashboardItemView = ItemLayoutView.extend({
    template: '#dashboard-item-template',
    initialize: function(){

        this.model = new DashboardItemModel();
        this.model.on('change', this.onModelChanged, this);
    },
});