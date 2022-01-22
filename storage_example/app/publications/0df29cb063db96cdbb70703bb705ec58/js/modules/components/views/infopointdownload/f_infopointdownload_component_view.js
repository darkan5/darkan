var InfoPointDownloadComponentView = ImageComponentView.extend({

	className : 'component infopointdownload-component',

	template: _.template($('#infopointdownload-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click': 'markAsCompleted'
        });
    },

    renderAsCompleted: function() {
        this.$el.attr({
        	active: true
        })
    },

    renderCss: function() {
        this.$el.css('cursor', 'pointer');
    },

    afterInitialize: function() {

        var useNewDownloadFileName = this.model.get('useNewDownloadFileName');
        var newDownloadFileName = this.model.get('newDownloadFileName');

        if(useNewDownloadFileName == undefined){
            this.model.set('useNewDownloadFileName', useNewDownloadFileName);
        }

        if(newDownloadFileName == undefined){
            this.model.set('newDownloadFileName', newDownloadFileName);
        }
    },
});