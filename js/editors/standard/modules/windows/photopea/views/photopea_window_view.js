var PhotopeaWindowView = WindowView.extend({

    className : 'window window-photopea-view',

    template: _.template($('#window-photopea-template').html()),

    

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .photopea-close': 'close',
            'click .photopea-save-image': 'saveImage'
        });
    },

    afterInitialize : function(data) {

        this.componentModel = data.data.componentModel;
    },

    saveToServer: function(){


        var _that = this;

        var photopeaIFrame = this.getPhotopeaIfarame();

        photopeaIFrame[0].contentWindow.postMessage('savetoserver', '*');

        var request = this.getPhotopeaSaveRequest();

        _log('SavePhotopeaImage', request, _log.dataaccessIn);

        var loop = 0;

        var interval = setInterval(function() {
            loop++;

            DataAccess.editPhotopeaImage(
                { request: JSON.stringify(request) },
                function(data) {
                    _log('SavePhotopeaImage result', data, _log.dataaccessOutResult);

                    if (_that.fileMD5 != data.md5) {

                        clearInterval(interval);

                        _that.componentModel.view.onPhotopeaSaved();

                        _that.close();
                     }

                },
                function(data) {
                    _log('SavePhotopeaImage fault', data, _log.dataaccessOutFault);
                }
            );

            if (loop == 10) {
                clearInterval(interval);
            }

        }, 1000);
    },

    openEditor: function() {
        var _that = this;
        
        var request = this.getPhotopeaOpenRequest();


        DataAccess.editPhotopeaImage(
            { request: JSON.stringify(request) },
            function(data) {

                _that.openPhotopeaInIframe(data);

                _log('EditPhotopeaImage result', data, _log.dataaccessOutResult);
            },
            function(data) {
                _log('EditPhotopeaImage fault', data, _log.dataaccessOutFault);
            }
        );
    },

    getPhotopeaIfarame: function() {
        return this.$el.find('iframe');
    },

    openPhotopeaInIframe: function(data) {

        this.fileMD5 = data.md5;

        var photopeaJson = this.getPhotopeaJson(data);

        var photopeaIFrame = this.getPhotopeaIfarame();
        var src = 'https://www.photopea.com?p=' + JSON.stringify(photopeaJson);

        photopeaIFrame.attr('src', src);
        console.log(src);
    },

    afterRender: function() {

        this.openEditor();

    },

    getPhotopeaJson: function(data) {

        
        var componentModel = this.componentModel;
        var stageView = StageView.instance;
        var imageFileName = componentModel.get('imageFileName');
        var actionkey = componentModel.get('actionkey');
        var pageId = stageView.model.get('options').get('pageid'); 
        var extt = imageFileName.split('.').pop().toLowerCase();

        var token = __meta__.APP_URL + "storage/app/projects/" + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/' + pageId + '/images/' + actionkey + '/' + imageFileName;

        var photopeaJson = {
            files: [
                token
            ],
            server: {
                url: __meta__.APP_LINK + "server/php/photopea.php",
                formats: [extt]
            }
        }

        return photopeaJson;
    },


    getPhotopeaOpenRequest: function() {

        var componentModel = this.componentModel;
        var stageView = StageView.instance;
        var projectModel = ProjectModel.instance;
        var imageFileName = componentModel.get('imageFileName');
        var actionkey = componentModel.get('actionkey');
        var pageId = stageView.model.get('options').get('pageid'); 


        var request = {
            request: 1,
            project: __meta__.projectID,
            userID: __meta__.ownerID,
            page: pageId,
            actionkey: actionkey,
            filename: imageFileName
        }

        return request;
    },

    getPhotopeaSaveRequest: function() {

        var componentModel = this.componentModel;
        var stageView = StageView.instance;
        var projectModel = ProjectModel.instance;
        var imageFileName = componentModel.get('imageFileName');
        var actionkey = componentModel.get('actionkey');
        var pageId = stageView.model.get('options').get('pageid'); 


        var request = {
            request: 2,
            project: __meta__.projectID,
            userID: __meta__.ownerID,
            page: pageId,
            actionkey: actionkey,
            filename: imageFileName
        }

        return request;
    },

    saveImage: function() {
        console.log("save");
        this.saveToServer();
    },

});