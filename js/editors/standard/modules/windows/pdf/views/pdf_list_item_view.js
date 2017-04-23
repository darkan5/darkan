var PdfListItemView = Backbone.View.extend({


    tagName: 'li',
    className: 'pdf-list-item',
    template: _.template($('#pdf-list-item-template').html()),

    events: {
        'click': 'selectItem',
        'click .pdf-list-item-select-item-checkbox': 'selectItem'
    },

    bindings: {
        '.pdf-list-item-select-item-checkbox': 'selected'
    },

    initialize : function(){
        this.model.on(' update-coming', this.onUpdateComing, this);
    },

    selectItem: function(){
        var selected = this.model.get('selected');
        this.model.set('selected', !selected );
        this.render();

        this.$el.trigger('on-item-click');
    },

    onUpdateComing: function(data){

        var src = data.filePath;

        src = data.projectPath + data.index + data.extension;

        this.model.set('src', src);

        this.render();
    },

    render: function(){

        var pdfListItemTemplate = this.template(this.model.toJSON());
        this.$el.html(pdfListItemTemplate);

        this.$el.attr({
            selected: this.model.get('selected')
        });

        this.stickit();

        return this;
    }
});
