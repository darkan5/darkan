var VideoEditorView = EditorView.extend({

	template: _.template($('#video-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            // 'change input[name="video-autoplay-chck"]': 'changeAutoplay',
            // 'change input[name="video-controls-chck"]': 'changeControls',
            // 'change input[name="video-loop-chck"]': 'changeLoop',
            'click .editor-video-add-file': 'addVideo',
            'click .editor-video-delete-file': 'deleteVideo'
        });
    },

	bindings: {
		'.video-editor-link-holder': 'videoLink',
		'input[name="video-autoplay-chck"]': 'videoAutoplay',
		'input[name="video-controls-chck"]': 'videoControls',
		'input[name="video-loop-chck"]': 'videoLoop',

	},

	deleteVideo: function() {

		var actionkey = this.model.get('actionkey');
		var fileName = this.model.get('videoFileName');

		this.deleteFileVideoOnServer(actionkey, fileName);

	},

	deleteFileVideoOnServer: function(actionkey, fileName) {


        var _that = this;

        DataAccess.updateComponents(
            {
            	components:[_that.model],
            	action:"delete-file-video", 
            	fileName:fileName, 
            	actionkey:actionkey,
            	pageId:StageView.instance.model.getPageId()
            },
            function(data) {

            	_that.model.set('videoFileName', '', { silent:true });
                _that.render();

            },
            function(data) { _log('Update component fault: ', data, _log.dataaccessOutFault)  }
        );
	},

	addVideo: function() {
		this.model.view.uploadOnClick();
	},

	// changeAutoplay: function(e) {

	// 	var videoAutoplay = $(e.target).is(':checked');

	// 	this.model.set('videoAutoplay', videoAutoplay);
		
	// },

	// changeControls: function(e) {

	// 	var videoControls = $(e.target).is(':checked');

	// 	this.model.set('videoControls', videoControls);
		
	// },

	// changeLoop: function(e) {

	// 	var videoLoop = $(e.target).is(':checked');

	// 	this.model.set('videoLoop', videoLoop);

	// },

	onSetModel: function() {
		this.listenTo(this.model, 'change:videoFileName', this.render);
	}

});