var DrawedInfoPointDownloadComponentView = LoadedComponentView.extend({

	className : 'component drawedinfopointdownload-component',

	template: _.template($('#drawedinfopointdownload-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

    addComponentListeners :function(){

    },

    getExtensionFilesArray : function(){
        // sound, folder: files
        return ['zip', 'rar', 'pdf', 'jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg', 'mp3',
            'doc', 'docx', 'xls' , 'xlsx', 'dot', 'ppt', 'pptx', 'assdb', 'mdb' , 'rtf' , 'odt', 'dot', 'mdt', 'accda', 'odt' , 'ods', 'odp'
        ];
    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionFilesArray();
        var _soundTypes = this.getExtensionSoundsArray();
        var acceptTypeString = '';

        _.each(_mainTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        _.each(_soundTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    // afterInitialize: function() {
  		// //this.stickit();
  		// this.listenTo(this.model, 'change:placeholder', changePlaceholder);
    // },



});

var DrawedInfoPointDownloadComponentViewViewNotEditable = ComponentView.createNotEditableComponentClass(DrawedInfoPointDownloadComponentView);