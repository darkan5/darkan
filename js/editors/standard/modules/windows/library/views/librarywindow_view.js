var LibraryWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-library-view',

    template: _.template($('#window-library-template').html()),

    activeTab: '#library-search',

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .window-close-button': 'close',
            'click .avatar-folder': 'chooseFolder',
            'click .avatar-item': 'chooseImage',
            'change .library-search-select': 'chooseTag',
            'mouseenter .avatar-folder': 'avatarFolderMouseEnter',
            'mouseenter .avatar-item': 'avatarItemMouseEnter'
        });
    },

    avatarFolderMouseEnter: function(e) {

        var target = $(e.currentTarget);

        var f1 = target.attr('folder-lib');
        var f2 = target.attr('folder-name');

        if (typeof libraryTags[f1] !== 'undefined' && typeof libraryTags[f1][f2] !== 'undefined') {

            target.attr('data-original-title', 'Tags: ' + libraryTags[f1][f2].tags);
        }
    },

    avatarItemMouseEnter: function(e) {

        var target = $(e.currentTarget);
        var itemDir = target.attr('item-dir');

        var _itemDir = itemDir.split('/');

        if (typeof libraryInfo[_itemDir[0]] !== 'undefined' && typeof libraryInfo[_itemDir[0]][_itemDir[1]] !== 'undefined' && libraryInfo[_itemDir[0]][_itemDir[1]][_itemDir[2]] !== 'undefined') {

            target.attr('data-original-title', libraryInfo[_itemDir[0]][_itemDir[1]][_itemDir[2]].pl);
        }
    },

    chooseTag: function(e) {

        var _that = this;

        var searchString = $(e.currentTarget).val();

        var request = {
            request: 4,
            search: searchString
        };

        DataAccess.libraryRequest(
            { request: JSON.stringify(request) },
            function(data) {

                var dataJ = JSON.parse(data);

                var contener = _that.activeTab;
                if (contener === '#library-search') {
                    contener = '.library-search-content';
                }

                _that.$el.find(contener).html(dataJ.html);

            },
            function(data) { _log('data', data) }
        );
    },

    chooseImage: function(e) {

        var _that = this;

        var target = $(e.currentTarget);

        var itemDir = target.attr('item-dir');

        // var request = {
        //     request: 3,
        //     path: item,
        //     pageid: ACV.numerstrony.attr('pageid'),
        //     next_point_nuber: next_point_nuber
        // };

        this.trigger('imagelibrary-onclick', { itemDir: itemDir }, this);

        this.close();
    },

    chooseFolder: function(e) {

        var _that = this;

        var target = $(e.currentTarget);
        var id = target.attr('folder-name');
        var fo = target.attr('folder-lib');

        var request = {
            request: 2,
            path1: fo, //path_id[obj_click.replace('#', '')],
            path2: id
        };

        DataAccess.libraryRequest(
            { request: JSON.stringify(request) },
            function(data) {


                var dataJ = JSON.parse(data);

                var contener = _that.activeTab;
                if (contener === '#library-search') {
                    contener = '.library-search-content';
                }

                _that.$el.find(contener).html(dataJ.html);

                _that.$el.find('.avatar-item').tooltip({
                    html: true,
                    delay: 100
                });

            },
            function(data) { _log('data', data) }
        );
    },

    afterRender : function(){

        var _that = this;

        this.$el.find('.library-search-select').chosen({ width: '80%', 'margin-left': '10%' });

        this.$el.find('.darkan-tabs').tabs({
            event: 'mousedown',
            active: 0,
            activate: function(event, ui) {

                library = ui.newPanel.selector;

                _that.activeTab = library;

                selector = library.replace('#', '');

                if (path_id[selector] != undefined) {

                    var request = {
                        request: 1,
                        path: path_id[selector]
                    };

                    DataAccess.libraryRequest(
                        { request: JSON.stringify(request) },
                        function(data) {

                            var dataJ = JSON.parse(data);

                            _that.$el.find(library).html(dataJ.html);

                            _that.$el.find('.avatar-folder').tooltip({
                                html: true,
                                delay: 100
                            });

                        },
                        function(data) { _log('data', data) }
                    );
                }

                // handle_folder_clicks(library);

            }
        }).addClass('ui-tabs-vertical ui-helper-clearfix');


    }
});