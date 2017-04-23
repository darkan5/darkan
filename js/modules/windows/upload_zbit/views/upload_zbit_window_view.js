var UploadZbitWindowView = WindowView.extend({

    className : 'window window-upload-zbit-view',

    template: _.template($('#window-upload-zbit-template').html()),

    isUploading: false,

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            
            'click .zbit-cancel': 'cancelUpload',
            'change #changeazbit': 'uploadZbit',

        });
    },

    afterInitialize : function(data) {

        var _that = this;

        this.projectsListModel = data.data.projectsListModel;

    },

    cancelUpload: function(e) {

        this.disableButtons(); 

        //this.close();
    },

    uploadZbit: function(e) {

        var _that = this;

        if(this.isUploading){
            return;
        }

        this.showLoader();
 
        //return;


        this.isUploading = true;

        setTimeout(function(){
            _that.startUplading();
        }, 120);
        
        //this.disableButtons(); 
    },

    startUplading: function(){

        var _that = this;

         var postData = new FormData(this.$el.find('#changeazbitform')[0]);

        DataAccess.uploadZbit(
            postData,
            function(data){

                _log('createNewProject', data, _log.dataaccessOutResult);

                _that.isUploading = false;
                _that.hideLoader();

                if(!data.success){

                    //_that.enableButtons();

                    switch(data.data.error){

                        case 0:
                            _that.showLimitProjectsWindow();
                            _that.close();
                            return;
                            break;

                        case 1:
                            _Notify('This is not zbit file format');
                            break;

                        case 2:
                            _Notify('Zbit format is wrong');
                            break;

                        case 3:
                            _Notify('Wrong extension');
                            break;

                        default:
                            _Notify('Fault');
                            break;
                    }

                    return;
                }

                _Notify('Success');

                var project = data.data.project;

                var newProjectModel = ProjectsFactory.createProjectModelByType(project.pType, project);

                _that.trigger('on-upload-zbit', newProjectModel, _that);

                _that.close();
            },
            function(data){
                _log('onFault', data);

                _that.isUploading = false;
                _that.hideLoader();

                //_that.enableButtons();
            },
            function(data){
                _log('onProgress', data);
            },
            function(data){
                _log('onComplete', data);
            }
        );
    },

    showLimitProjectsWindow: function() {

        var limitProjectsWindow = WindowFactory.createLimitProjectsWindow();
        limitProjectsWindow.setTitle('Limit project');
        $('body').append(limitProjectsWindow.render().$el);
    },

    disableButtons: function() {
         this.$el.find('#changeazbit').attr('disabled', 'disabled');
    },

    enableButtons: function() {
         this.$el.find('#changeazbit').removeAttr('disabled');
    },

    afterRender: function(){
        this.$el.find('.zbit-folder-id').val( this.projectsListModel.get('lastVisitedFolderID') );
    },

    hideLoader: function(){

        var loader = this.$el.find('.upload-zbit-loader');
        loader.hide();

        var submit = this.$el.find('#changeazbit');
        loader.css('opacity', '0.4');
    },

    showLoader: function(){

        var loader = this.$el.find('.upload-zbit-loader');
        loader.show();

        var submit = this.$el.find('#changeazbit');
        loader.css('opacity', '1');
    },



});