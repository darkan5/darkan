var VideoWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-video-view',

    template: _.template($('#window-video-template').html()),

    searchTimeout: null,

    events: {
        'close': 'close',
        'click .window-close-button': 'close',
        'dragenter .drop-video-area': 'onFileDragOver',
        'dragleave .loaded-dropzone': 'onFileDragOut',
        'drop .loaded-dropzone': 'onFileChoose',
        'click .upload': 'uploadOnClick',
        'keyup .video-window-youtube-search-input': 'checkWordYoutube',
        'keyup .video-window-vimeo-search-input': 'checkWordVimeo',
        'paste .video-window-youtube-search-input, .video-window-vimeo-search-input': 'pasteLink',
        // 'paste .video-window-vimeo-search-input': 'pasteLinkVimeo',
        'click .v': 'chooseVideo'
    },

    pasteLink: function(e) {

        var videoLink = e.originalEvent.clipboardData.getData('Text');
        var videoType = 2;
        var prefixLink = videoLink.substring(0, 16);

        if (prefixLink == 'http://www.youtu' || prefixLink == 'https://www.yout') {

            videoType = 2;
            this.trigger('putvideolink', { videoLink: videoLink, videoType: videoType }, this);

            this.close();

        }

        if (prefixLink == 'http://vimeo.com' || prefixLink == 'https://vimeo.co') {

            videoType = 3;
            this.trigger('putvideolink', { videoLink: videoLink, videoType: videoType }, this);

            this.close();

        }
    },

    chooseVideo: function(e) {

        var videoDiv = $(e.currentTarget).find('.video-link-container');
        var videoLink = videoDiv.attr('href');
        var videoType = 2;

        if (videoDiv.hasClass('video-youtube')) {
            videoType = 2;
        } else if (videoDiv.hasClass('video-vimeo')) {
            videoType = 3;
        }


        this.trigger('putvideolink', { videoLink: videoLink, videoType: videoType }, this);

        this.close();
    },

    checkWordYoutube: function(e) {

        var _that = this;

        var words = this.$el.find('.video-window-youtube-search-input').val();

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(function() {
            _that.searchYoutubeVideo(words);
        }, 1000);

    },

    showYTLoadGif: function() {
        this.$el.find('.video-window-youtube-search-results').html('<img src="content_template/css/gif-load.gif">');
    },

    showVimeoLoadGif: function() {
        this.$el.find('.video-window-vimeo-search-results').html('<img src="content_template/css/gif-load.gif">');
    },

    searchYoutubeVideo: function(words) {

        var _that = this;

        this.showYTLoadGif();

        var request = {
            searchVal: words
        };

        DataAccess.searchYoutube(
            { request: JSON.stringify(request) },
            function(data) {


                var dat = JSON.parse(data);

                _that.showYoutube(dat);

            },
            function(data) { _log('data', data) }
        );
    },

    showYoutube: function(data) {

        var _that = this;
        var dataJ = data;

        _that.$el.find('.video-window-youtube-search-results').html('');

        $.each(dataJ, function(i, item) {
            var code = '<div class="v"> <span class="details"> <h3>'+dataJ[i].title+'</h3> <div class="video-link-container video-youtube" href="https://www.youtube.com/watch?v='+dataJ[i].url+'" target="_blank" class="wrapping"><img src="'+dataJ[i].thumbnail+'" alt="'+dataJ[i].title+' video thumbnail" class="thumbnail"></div> </div>';
            
            $("#loader").remove();
            _that.$el.find('.video-window-youtube-search-results').append(code);
        }); // end each loop
    },

    checkWordVimeo: function(e) {

        var _that = this;

        var words = this.$el.find('.video-window-vimeo-search-input').val();

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(function() {
            _that.searchVimeoVideo(words);
        }, 1000);

    },

    searchVimeoVideo: function(words) {

        var _that = this;

        this.showVimeoLoadGif();


        var request = {
            searchVal: words
        };

        DataAccess.searchVimeo(
            { request: JSON.stringify(request) },
            function(data) {


                var dat = JSON.parse(data);

                _that.showVimeo(dat, words);

            },
            function(data) { _log('data', data) }
        );
    },

    showVimeo: function(data) {

        var _that = this;

        _that.$el.find('.video-window-vimeo-search-results').html('');

        $.each(data, function(i, item) {
            var code = '<div class="v"> <span class="details"><img src="'+data[i].userpic+'" class="userpic"> <h3>'+data[i].title+'</h3> <span class="user">uploaded by <div href="'+data[i].userurl+'" target="_blank">'+data[i].username+'</div></span></span> <div class="video-link-container video-vimeo" href="'+data[i].url+'" target="_blank" class="wrapping"><img src="'+data[i].thumbnail+'" alt="'+data[i].title+' video thumbnail" class="thumbnail"></div> </div>';
            
            $("#loader").remove();
            _that.$el.find('.video-window-vimeo-search-results').append(code);
        }); // end each loop
    },

    uploadOnClick: function() {
        var _that = this;

        var input = $('<input type="file" name="files[]" accept="video/*">');
        input.css({
            display: 'none'
        });

        this.$el.append(input);
        input.click();

        input.change(function(e) {
            _that.trigger('imageupload-onclick', e, this);
            $(this).remove();
            _that.close();
        });
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
        this.trigger('imageupload-ondrop', this.getDropProperties(e));
        this.close();
    },

    afterRender : function(){
        this.$el.find('.darkan-tabs').tabs();
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
});