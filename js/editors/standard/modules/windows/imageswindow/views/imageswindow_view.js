var ImagesWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-images-view',

    template: _.template($('#window-images-template').html()),

    searchTimeout: null,

    events: {
        'close': 'close',
        'click .window-close-button': 'close',
        'dragenter .drop-image-area': 'onFileDragOver',
        'dragleave .loaded-dropzone': 'onFileDragOut',
        'drop .loaded-dropzone': 'onFileChoose',
        'click .upload': 'uploadOnClick',
        'keyup .image-window-search-input': 'checkWord',
        'click .images-img-results': 'chooseImage',
        'click .upload-from-link': 'uploadFromLinkClick',
        'keyup .image-window-link-input': 'uploadFromLinkEnter'
    },


    initialize: function( data ) {

        var _that = this;

        this.windowModel = data.windowModel;
        this.activeTab = data.activeTab;
        this.sender = data.sender;

        this.runListeners();

        document.onpaste = function(event){
            var items = (event.clipboardData  || event.originalEvent.clipboardData).items;

            var blob = null;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") === 0) {
                    blob = items[i].getAsFile();
                }
            }
            // load image if there is a pasted image
            if (blob !== null) {


                if(_that.sender != undefined){
                    _that.sender.uploadOnPaste(event, blob, false);
                }else{
                    _that.trigger('imageupload-on-paste', event, blob);
                }


                _that.close();
            }
        }
    },


    validateText:function(){

        var imageUrl =  StringTools.trim( this.$el.find('.image-window-link-input').val()  );

//        if(StringTools.startsWith(imageUrl, 'http://') || StringTools.startsWith(imageUrl, 'https://')){
//
//        }else{
//
//            imageUrl = undefined;
//
//            // var popup = PopupFactory.createStandardPopup();
//            // $('body').append(popup.render().$el);
//        }

        var urlpattern = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
        if ( urlpattern.test(imageUrl) ){

        }else{
            imageUrl = undefined;
        }

        return imageUrl;
    },

    uploadFromLinkEnter:function(e){
        if(e.key == 13){
            this.uploadFromLinkClick();
        }
    },

    uploadFromLinkClick: function(){

        var imageUrl = this.validateText();
        if (imageUrl) {
            this.convertLinkToImage( imageUrl );
        } else {
            var input = this.$el.find('.image-window-link-input');
            input.addClass('animated float error');
            input.focus();
            clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(function() {
                input.removeClass('animated float error');
            }, 1000);
        }
    },

    convertLinkToImage: function(imageUrl) {


        if(this.sender != undefined){
            this.sender.uploadOnLink(imageUrl, false);
        }else{
            this.trigger('imageupload-link', imageUrl);
        }

        this.close();
    },

    chooseImage: function(e) {

        var imageUrl = $(e.target).parent().attr('imagefile');

        if(this.sender != undefined){
            this.sender.uploadOnLink(imageUrl, false);
        }else{
            this.trigger('imageupload-link', imageUrl);
        }


        this.close();

    },

    checkWord: function(e) {

        var _that = this;

        var words = this.$el.find('.image-window-search-input').val();

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(function() {
            _that.searchImages(words);
        }, 1000);

    },

    showLoadGif: function() {
        this.$el.find('.image-window-search-results').html('<img src="content_template/css/gif-load.gif">');
    },

    searchImages: function(words) {

        var _that = this;

        this.showLoadGif();

        var request = {
            request: 5,
            searchVal: words
        };

        DataAccess.searchImages(
            { request: JSON.stringify(request) },
            function(data) {

                var dat = JSON.parse(data);

                _that.showImages(dat, words);

            },
            function(data) { _log('data', data) }
        );
    },

    showImages: function(data, words) {

        var _that = this;

        var results;
        var resultDiv = '';
        var rData;

        this.$el.find('.image-window-search-results').html('');

        try{

            rData = JSON.parse(data.google);
            if (rData.responseData) {

                results = rData.responseData.results;

                this.$el.find('.image-window-search-results').html('').append('<div class="imagesearch-title">Google</div><hr>');

                _.each(results, function(imageData, i) {

                    resultDiv = $('<div imagefile="'+ imageData.url +'" class="all-img-result images-img-results"><img src="' + imageData.tbUrl + '" /></div>' );
                    _that.$el.find('.image-window-search-results').append(resultDiv);

                });   
            }


            rData = JSON.parse(data.iconfinder);

            if (rData.searchresults) {
                results = rData.searchresults.icons;
                this.$el.find('.image-window-search-results').append('<div class="imagesearch-title">Iconfinder</div><hr>');

                _.each(results, function(imageData, i) {

                    resultDiv = $('<div imagefile="'+ imageData.image +'" class="all-img-result images-img-results"><img src="' + imageData.image + '" /></div>' );
                    _that.$el.find('.image-window-search-results').append(resultDiv);

                });
            }


            rData = JSON.parse(data.pixabay);

            if (rData.hits) {
                this.$el.find('.image-window-search-results').append('<div class="imagesearch-title">Pixabay</div><hr>');

                results = rData.hits;
                _.each(results, function(imageData, i) {

                    resultDiv = $('<div imagefile="'+ imageData.webformatURL +'" class="all-img-result images-img-results"><img src="' + imageData.previewURL + '" /></div>' );
                    _that.$el.find('.image-window-search-results').append(resultDiv);

                });
            }



            var query = words.replace(" ", "+");
            
            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&extras=original_format,o_dims,url_o,url_b&api_key=5f3f0b0d935c5a7be67f6af3f2dfbc20&tags="+query+"&safe_search=1";
            var src, thumb;
            $.getJSON(url + "&format=json&jsoncallback=?", function(data){
                
                if ( data.photos.photo.length > 0 ) {

                    _that.$el.find('.image-window-search-results').append('<div class="imagesearch-title">Flickr</div><hr>');
                    $.each(data.photos.photo, function(i,item){
                        var format = 'jpg';
                        var secret = item.secret;
                        var size = 'b';

                        if (typeof item.originalsecret !== "undefined") {
                            if (parseInt(item.width_o) < 1600) {
                                size = 'o';
                                secret = item.originalsecret;
                                format = item.originalformat;
                            }
                        }

                        src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ secret +"_" + size + "." + format;
                        thumb = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_t.jpg";

                        var result_img = $('<div imagefile="'+ src +'" class="images-img-results flickr-img-result"><img src="' + thumb + '" /></div>' );
                        _that.$el.find('.image-window-search-results').append(result_img);

                    });
                }
            });
        } catch(err) {
            _log('imagesearch error', err, _log.error);
        }


    },

    uploadOnClick: function() {
        var _that = this;

        var input = $('<input type="file" name="files[]" accept="image/*">');
        input.css({
            //display: 'none'
            //visibility : 'hidden'
        });

        _log('uploadOnClick window', input);

        this.$el.append(input);


        //input.show().trigger('click').hide();



        input.change(function(e) {

            _log('uploadOnClick window', e);

            if(_that.sender != undefined){
                _that.sender.uploadOnInputData(e, this, false);
            }else{
                _that.trigger('imageupload-onclick', e, this);
            }


            $(this).remove();
            _that.close();
        });

        input.click();
    },

    onFileDragOver: function(e) {
        e.stopPropagation();
        this.$el.find('.loaded-dropzone').fadeIn(200);
    },

    onFileDragOut: function(e) {
        e.stopPropagation(e);
        this.$el.find('.loaded-dropzone').fadeOut(200);
    },

    onFileChoose : function(e){

        if(this.sender != undefined){
            this.sender.uploadOnFileDrop(e, false);
        }else{
            this.trigger('imageupload-ondrop', this.getDropProperties(e));
        }



        this.close();
    },

    getDropProperties: function(e){

        var imageUrl;

        var file = e.originalEvent.dataTransfer.files[0];

        var data;

        if(file != undefined){
            var imageName = file.name;
            var imageData = e.originalEvent.dataTransfer.result;

            data = {
                name: imageName,
                data : imageData,
                size: file.size
            };
        }else{

            imageUrl =  e.originalEvent.dataTransfer.getData('text');
        }

        return { file: file, data:data, imageUrl:imageUrl };
    },

    afterRender : function(){
        this.$el.find('.darkan-tabs').tabs();
    },

    onClose : function(){
        delete document.onpaste;

        this.trigger('on-close');
    }
});