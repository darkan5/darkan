var ImageStyleEditorView = StyleEditorView.extend({

    template: _.template($('#have-style-editor-template').html()),

    events: function(){
        return _.extend({},StyleEditorView.prototype.events,{
        	'click .avatar-item': 'changeImageLibrary'
        });
    },

    disableIfNotActive: function() {

    },

    onSetModel: function() {
        // this.runStylesFactory();

        this.listenTo(this.model, 'change:library', this.runStylesLibrary);
    },

    changeImageLibrary: function(e) {

    	var _that = this;

    	var target = $(e.currentTarget);
    	var itemDir = target.attr('item-dir');

        var actionkey = this.model.get('actionkey');
        var pageID = StageView.instance.model.get('options').get('pageid');
        var oldFileName = this.model.get('imageFileName');

        DataAccess.copyLibraryFileToImage(
            { itemDir: itemDir, actionkey:actionkey, pageID: pageID, oldFileName: oldFileName },
            function(data) {

                var sizeW = parseInt(data.size.split('x')[0]);
                var sizeH = parseInt(data.size.split('x')[1]);
                var oldW = parseInt(_that.model.get('width'));
                var oldH = parseInt(_that.model.get('height'));

                var newWidth = (parseInt(_that.model.get('height')) * sizeW) / sizeH;

                _that.model.set('width', newWidth);

                _that.model.set('library', itemDir, { silent: true });
                _that.model.set('imageFileName', data.fileName);

                var src = __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/' + pageID + '/images/' + actionkey + '/' + data.fileName;
                _that.$el.find('.img-wrapper img').attr('src', src);

                _that.model.forceRender();
                _that.model.view.createMiniature();


            },
            function(data) { _log('data', data) }
        );

    },

    runStylesLibrary: function() {

        var _that = this;

        var library = this.model.get('library');

        if (library != '') {

            var _library = library.split('/');

            var id = _library[1];
            var fo = _library[0];

            var request = {
                request: 2,
                path1: fo,
                path2: id
            };

            var libraryContainer = $('<div>', {
                class: 'template-styles-container2'
            });

            DataAccess.libraryRequest(
                { request: JSON.stringify(request) },
                function(data) {

                    var dataJ = JSON.parse(data);

                    libraryContainer.html(dataJ.html);
                    _that.$el.append(libraryContainer);


                    _that.$el.find('.template-styles-container, .template-styles-container2').css({
                        width: '50%',
                        float: 'left'
                    });

                },
                function(data) { _log('data', data) }
            );
        }

    },

    runStylesFactory: function() {

    	var _that = this;

        var styles = StylesFactory.getImageStyles();
        this.$el.find('.template-styles-container').append(styles);

        var library = this.model.get('library');

        _log('runStylesFactory', library);
        _log('this.model', this.model);

        if (library != '') {

            this.runStylesLibrary();

        }
    }
});
