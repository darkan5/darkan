var PdfListView = Backbone.View.extend({

    tagName: 'div',
    className: 'pdf-list',
    template: _.template($('#pdf-list-template').html()),



    events: {
        'click .pdf-list-item-select-all-checkbox': 'selectAllItems',
        'click .pdf-list-convert-to-pages': 'convertToPages',
        'on-item-click': 'onItemClick'
    },

    onItemClick: function(){
         var ids = this.getSelectedItemsIds();

        var canConvert = ids.length <= 0 ? false : true;

        this.disableEnableConvertButton(canConvert);
    },

    render: function(){

        var pdfListTemplate = this.template({});
        this.$el.html(pdfListTemplate);

        this.collection.each(this.addPdfItem, this);

        return this;
    },

    selectAllItems: function(e){

        var selected = $(e.target).prop('checked');

        if(selected){
            this.collection.each(this.selectItem, this);
            this.setSelectedAttributeForAllItems(true);
        }else{
            this.collection.each(this.unselectItem, this);
            this.setSelectedAttributeForAllItems(false);
        }

        this.disableEnableConvertButton(selected);
    },

    disableEnableConvertButton: function(canConvert) {
        if(!canConvert){
            this.$el.find('.pdf-list-convert-to-pages').attr('disabled', 'disabled');
        }else{
            this.$el.find('.pdf-list-convert-to-pages').removeAttr('disabled');
        }
    },

    setSelectedAttributeForAllItems: function(selected) {
        this.$el.find('.pdf-list-item').attr({selected: selected});
    },

    selectItem: function(model){
        model.set('selected', true);
    },

    unselectItem: function(model){
        model.set('selected', false);
    },

    addPdfItem: function(pdfItemModel, index){

        var _that = this;
        var pdfListItemView = new PdfListItemView({ model: pdfItemModel });

        var itemEl = pdfListItemView.render().$el;
        itemEl.addClass('pdf-list-item-' + index);

        this.$el.find('.pdf-list-wrapper').append(itemEl);
    },

    updateComing: function(data){
        var index = data.index;

        var model = this.collection.at( parseInt( index ) );

        if (model) {
            model.updateComing( data );
        }
    },

    convertToPages: function(){

        this.$el.trigger('close-window', {}, this);
       
    },

    getSelectedItemsIds: function(){

        var results =  _.pluck( _.where(this.collection.toJSON(), {selected: true}),'id');
        console.log('id',results);
        return results;
    }

});