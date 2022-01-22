var TocWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window feedback-view toc-view',

    template: _.template($('#toc-window-template').html()),

    events: {
        'click .window-close-button': 'close',
    },

    afterRender: function() {
        var _that = this;

        var pages = this.model.get('pages');

        var tocList = this.$el.find('.window-content ul');

        _log('tocList',tocList);


        pages.each(function(pModel, order) {
        
            var pageName = pModel.get('options').get('pagename');
            var pageOrder = pModel.collection.indexOf(pModel) + 1;
            var pageID = pModel.get('options').get('pageid');
            var listItem = $('<li></li>', {
                ord: order,
                class: 'toc-item'
            });
            listItem.html('<span class="toc-order">[' + pageOrder + ']</span>  ' + pageName);
            listItem.click(function() {
                // tocList.hide();
                _that.trigger('go-to-page-order', parseInt($(this).attr('ord')));
                _that.close();
            })
            tocList.append(listItem);
        });


        setTimeout(function() {
            _that.$el.find('.window-content').css({
                overflow: 'auto'
            });
            // _that.$el.find('.window-content').perfectScrollbar();
        }, 500);
        
    },




});