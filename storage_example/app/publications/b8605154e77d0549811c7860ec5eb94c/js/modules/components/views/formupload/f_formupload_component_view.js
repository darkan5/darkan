var FormUploadComponentView = ComponentView.extend({

	className : 'component formupload-component',

    template: _.template($('#formupload-component-template').html()),
	formTemplate: _.template($('#upload-file-form-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click .uploadfopointlink-component-inner': 'uploadOnClick',
            'change .changefile': 'uploadFile'
        });
    },

    bindings: {
        'input[name="pageid"]' : 'pageId',
        'input[name="bannerid"]' : 'bannerId',
        'input[name="actionkey"]' : 'actionkey',
    },

    isUploading: false,

    afterInitialize: function() {
        this.model.set('pageId', '');
        this.model.set('bannerId', '');

        this.stickit();
    },

    uploadOnClick: function() {

        var _that = this;

        var hash = $(window.top.document).find('.course-preview').attr('hash');

        var params = {
            hash : hash,
            acceptTypeFormat : this.getAcceptTypeFormat(),
            actionkey : this.model.get('actionkey'),
            goodExtensions : this.model.get('goodExtensions'),
        }

        this.addForm(params);
        
        var input = this.$el.find('.changefile');
        input.click();
        
    },

    getAcceptTypeFormat: function() {
        return '';
    },

    addForm: function(params) {
        var formTemplate = this.formTemplate(params);
        this.$el.find('.form-wrapper').html(formTemplate);
    },

    removeForm: function(e) {

        var form = this.$el.find('form').remove();
    },

    uploadFile: function(e) {

        var _that = this;

        _log('uploadFile e', e);

        if(this.isUploading){
            return;
        }

        this.showLoader();

        this.isUploading = true;

        this.startUplading();
    },

    startUplading: function(){

        var _that = this;

        var postData = new FormData(this.$el.find('.uploadfileform')[0]);

        var appLink =  window.location.origin + '/egzaminy/';

        DataAccess.uploadDocFile(
            postData,
            appLink,
            function(data){

                _that.removeForm();

                _log('uploadDocFile', data, _log.dataaccessOutResult);

                _that.isUploading = false;
                _that.hideLoader();

                if(!data.success){

                    

                    switch(data.data.error){

                        case -1:

                            _that.showFeedbackWindow('', 'Serwer zabrania przesłania pliku o podanym rozszerzeniu.', false);

                            break;

                        case 0:
                            _that.showFeedbackWindow('', 'Wystąpił błąd podczas wysyłania pliku.', false);
                            break;

                        case 1:
                            _that.showFeedbackWindow('', 'Nieprawidłowe rozszerzenie pliku.', false);
                            break;    

                        case 2:
                            _that.showFeedbackWindow('', 'Wystąpił błąd podczas przetwarzania pliku.', false);
                            break;    

                        case 3:
                            _that.showFeedbackWindow('', 'Rozszerzenie pliku jest nieprawidłoweu.', false);
                            break;   

                        case 4:

                            var count = Math.abs(data.data.count);

                            var massage = 'Przekroczono limit znaków w nazwie pliku o (' + count + ')';

                            _that.showFeedbackWindow('', massage, false);
                            break;     

                        default:
                            _that.showFeedbackWindow('', 'Wgrywanie pliku nie powiodło się.', false);
                            break;
                    }

                    return;
                }

                _that.showFeedbackWindow('', 'Plik przesłany prawidłowo!', true);

            },
            function(data){
                _log('onFault', data);

                _that.showFeedbackWindow('', 'Wystąpił błąd podczas wysyłania.', false);

                _that.removeForm();

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

    hideLoader: function(){

        var loader = this.$el.find('.upload-file-loader');
        loader.hide();

        var submit = this.$el;
        loader.css('opacity', '1');
    },

    showLoader: function(){

        var loader = this.$el.find('.upload-file-loader');
        loader.show();

        var submit = this.$el;
        loader.css('opacity', '0.4');
    },

    afterRender: function(){
        
    }

    

});