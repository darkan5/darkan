var PdfListItemModel = Backbone.Model.extend({
    defaults:{
        id: '',
        src: 'content_template/css/gif-load.gif',
        selected : true
    },

    updateComing: function(data){
        this.trigger('update-coming', data, this)
    }
});
