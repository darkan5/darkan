var InfoPointSoundControlComponentView = LoadedComponentView.extend({

	className : 'component infopointsoundcontrol-component',

	template: _.template($('#infopointsoundcontrol-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

//    addComponentListeners :function(){
//
//    },

//    makeResizable: function() {
//        return false;
//    }



    getSound: function() {
        var actionkey = this.model.get('actionkey');

        // get component sound file
        var componentSound = this.model.get('sound');
        if (componentSound.length) {
            var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/audio/'+ actionkey +'/'+ componentSound;
            return audioSrc;
        }
        return false;
    },

    getSwfLocation: function() {
        var swfLocation = __meta__.directLocation + 'js/libs/jplayer';
        return swfLocation;
    },

    onNoSkin: function() {
        this.render();
        this.unselectComponent();
        this.selectComponent();
    },

    afterRender: function() {
        var _that = this;
        // this.$el.find('audio').on('ended', function() {
     //        _that.animateStop();
        // });

        this.listenTo(this.model, 'change:noskin', this.onNoSkin);

        var actionkey = this.model.get('actionkey');
        var playerId = actionkey.split('-')[1];

        this.$el.find('#audio-player-' + playerId).jPlayer({
            ready: function (event) {
                $(this).jPlayer("setMedia", {
                    mp3: _that.getSound(),
                });
            },
            supplied: "mp3",
            cssSelectorAncestor: '#jp-container-' + playerId,
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });

    },

    uploadOnSoundFileDrop: function(e, resizeImage) {

        if(!StageView.instance.canEdit) { return; }

        this.model.setComponentAsSound();

        this.resizeImage = resizeImage;
        this.$el.find('.loaded-dropzone').fadeOut(500);
        var properties = this.getDropProperties(e);

        var imageUrl = properties.imageUrl;

        if(imageUrl != undefined){
            this.uploadOnLink(imageUrl, resizeImage);
        }else{
            this.runUploadProcess( properties );
        }

    },

    onComponentAdded: function(data){

        var _that = this;

        setTimeout(function(){
            _that.renderPath();
        }, 200);
    }


});

var InfoPointSoundControlComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointSoundControlComponentView);