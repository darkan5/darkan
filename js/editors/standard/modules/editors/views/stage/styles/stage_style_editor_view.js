var StageStyleEditorView = StyleEditorView.extend({

    events: function(){
        return _.extend({},StyleEditorView.prototype.events,{
        	'click .avatar-item': 'changeStageBackground',
        	'click .avatar-folder': 'getFolderData',
        	'click .background-back': 'runStylesFactory'
        });
    },

    changeStageBackground: function(e) {

    	var _that = this;

    	var target = $(e.currentTarget);

        var itemDir = target.attr('item-dir');
        var pageID = StageView.instance.model.get('options').get('pageid');
        var oldFileName = this.model.get('image');

        DataAccess.changeStageBackgroundLibrary(
            { itemDir: itemDir, pageID: pageID, oldFileName: oldFileName },
            function(data) {

            		_that.model.set('image', data.fileName);

                    setTimeout(function(){
                        StageView.instance.model.updateDinamicPageThumb();
                    }, 100);

          //       var dataJ = JSON.parse(data);

          //       var backBackgroundButton = '<div class="background-back"></div>';

		        // backgroundsContainer.html(backBackgroundButton + dataJ.html);
		        // _that.$el.html(backgroundsContainer);


            },
            function(data) { _log('data', data) }
        );
    },


    getFolderData: function(e) {

    	var _that = this;

        var backgroundsContainer = $('<div>', {
        	class: 'template-styles-container2'
        });


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

                var backBackgroundButton = '<div class="background-back"></div>';

		        backgroundsContainer.html(backBackgroundButton + dataJ.html);
		        _that.$el.html(backgroundsContainer);


            },
            function(data) { _log('data', data) }
        );
    },


    runStylesFactory: function() {

    	var _that = this;

        var backgroundsContainer = $('<div>', {
        	class: 'template-styles-container2'
        });


        var request = {
            request: 1,
            path: 'backgrounds'
        };

        DataAccess.libraryRequest(
            { request: JSON.stringify(request) },
            function(data) {


                var dataJ = JSON.parse(data);

		        backgroundsContainer.html(dataJ.html);
		        _that.$el.html(backgroundsContainer);


            },
            function(data) { _log('data', data) }
        );
    }
});
