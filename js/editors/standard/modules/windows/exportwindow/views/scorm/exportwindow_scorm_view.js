var ExportScormWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-export-scorm-view',

    template: _.template($('#window-export-scorm-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
        	'click .generate-package-button': 'generateScormPackage',
        	'click .download-package-button': 'startDownloading'
        });
    },
    generatingInProgress: false,
    downloadLink: undefined,

    renderScoreEditor : function(){

        var publishScoreEditorView = EditorsFactory.createPublishScoreEditor();

        var optionsScoreSection = this.$el.find('.options-score-section');
        optionsScoreSection.html(publishScoreEditorView.render().$el);
        publishScoreEditorView.afterRender();
    },

    afterRender: function() {
    	var projectName = ProjectModel.instance.get('options').get('name');
    	this.$el.find('.package-name').val(projectName);

        this.renderScoreEditor();
    },

    generateScormPackage: function() {
    	var _that = this;

    	if (!this.generatingInProgress) {
    		this.generatingInProgress = true;

    		this.$el.find('.package-name').attr({disabled: 'disabled'});

    		this.$el.find('.generate-package-button')
    							.addClass('redbutton')
    							.attr({disabled: 'disabled'})
    							.text(_lang('EXPORT_GENERATE_PACKAGE_PROGRESS'));

            var scormVersion = this.$el.find('.export-scorm-version').val();

            var request = {
                type: 'exportToScorm',
                projectID: __meta__.projectID,
                name: this.$el.find('.package-name').val(),
                title: this.$el.find('.package-name').val(),
                scormVersion: scormVersion,
                skin: ProjectModel.instance.get('options').get('skin')
            };


            DataAccess.publicationRequest(
                {
                    request: JSON.stringify(request)
                },
                function(data) {


                    var dataJ = JSON.parse(data);

                    _that.generatingCompleted(dataJ);
                },
                function(data) { _log('data', data) }
            );


			// setTimeout(function() {
			// 	var data = { downloadLink: 'http://www.onet.pl' };
			// 	_that.generatingCompleted(data);
			// }, 2500);

    	}
    },

    generatingCompleted: function(data) {

    	this.downloadLink = data.downloadLink;

    	this.$el.find('.generate-package-button')
    							.removeAttr('disabled')
    							.removeClass('redbutton')
    							.addClass('download-package-button')
    							.text(_lang('BUTTON_DOWNLOAD'));
    },

    startDownloading: function() {
    	window.open(this.downloadLink);
    }
});