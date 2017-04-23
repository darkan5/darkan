var ExportHtmlWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-export-html5-view',

    template: _.template($('#window-export-html5-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
        	'click .generate-package-button': 'generateHtmlPackage',
        	'click .download-package-button': 'startDownloading'
        });
    },

    generatingInProgress: false,
    downloadLink: undefined,

    generateHtmlPackage: function() {
    	var _that = this;

    	if (!this.generatingInProgress) {
    		this.generatingInProgress = true;

    		this.$el.find('.generate-package-button')
    							.addClass('redbutton')
    							.attr({disabled: 'disabled'})
    							.text(_lang('EXPORT_GENERATE_PACKAGE_PROGRESS'));



            var request = {
                type: 'exportToHTML',
                projectID: __meta__.projectID,
                name: __meta__.projectName,
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
			// 	var data = { downloadLink: 'http://www.wp.pl' };
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