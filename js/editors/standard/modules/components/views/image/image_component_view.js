var ImageComponentView = LoadedComponentView.extend({

    className : 'component image-component',

    template: _.template($('#image-component-template').html()),

    // events: {
    //     'click .add-image-file': 'addNewImage'
    // },

    // events: function(){
    //     return _.extend({},LoadedComponentView.prototype.events,{
    //         'click .upload': 'uploadOnClick',
    //         'dragenter': 'onFileDragOver',
    //         'dragleave .loaded-dropzone': 'onFileDragOut',
    //         'drop .loaded-dropzone': 'uploadOnFileDrop',
    //         'click .add-image-file': 'addNewImage'
    //     });
    // },

    resizeTimeOut: null,

    uploadOnFileDrop: function(e, resizeImage) {

        if(Utils.isDarkanExtension(e)){

            _log('is darkan extension true');

            return;
        };

         _log('is darkan extension false');

        if(!StageView.instance.canEdit) { return; }

        this.model.setComponentAsImage();

        this.resizeImage = resizeImage;
        this.$el.find('.loaded-dropzone').fadeOut(500);
        var properties = this.getDropProperties(e);

        var imageUrl = properties.imageUrl;

        _log('e', e);
        _log('properties', properties);

        if(imageUrl != undefined){
            this.uploadOnLink(imageUrl, resizeImage);
        }else{
            this.runUploadProcess( properties );
        }

    },

    uploadOnFileDrop2: function(e, resizeImage) {

        // if(Utils.isDarkanExtension(e)){

        //     _log('is darkan extension true');

        //     return;
        // };


         _log('is darkan extension false');

        if(!StageView.instance.canEdit) { return; }

        this.model.setComponentAsImage();

        this.resizeImage = resizeImage;
        this.$el.find('.loaded-dropzone').fadeOut(500);
        var properties = e;

        var imageUrl = properties.imageUrl;

        _log('e', e);
        _log('properties', properties);

        if(imageUrl != undefined){
            this.uploadOnLink(imageUrl, resizeImage);
        }else{
            this.runUploadProcess( properties );
        }

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

    uploadOnPaste: function(e, blob, resizeImage){

        var _that = this;

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        this.model.setComponentAsImage();

        this.resizeImage = resizeImage;

        var reader = new FileReader();
        reader.onload = function(e){

            var data = {
                name: 'copyimage.png',
                data : event.target.result,
                size: blob.size
            };

            _that.runUploadProcess( { file:blob, data:data } );

        }; // data url!
        reader.readAsDataURL(blob);
    },

    uploadOnLink: function(imageUrl, resizeImage){

        var _that = this;

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        this.model.setComponentAsImage();

        this.resizeImage = resizeImage;

        var _that = this;

        // this.$el.find('img')
        //                 .attr('src', 'content_template/css/gif-load.gif')
        //                 .css({
        //                     width: '50px',
        //                     height: '15px',
        //                     margin: '40%'
        //                 });

        this.showLoader();

        DataAccess.convertLinkToImage({
            imageUrl:imageUrl,
            pageId: StageView.instance.model.get('options').get('pageid'),
            page: StageView.instance.model,
            actionkey:this.model.get('actionkey') },
            function(data){

                _that.hideLoader();

                _that.model.set('imageFileName', data.fileName);
                _that.model.forceRender();

                if(_that.resizeImage){
                    _that.resizeImageToProperDimentions();
                }

                _that.createMiniature();

            },
            function(data){
                _that.hideLoader();
            }
        );
    },

    addComponentListeners :function(){
        this.listenTo(this.model, 'change:opacity', this.changeOpacity );
        this.listenTo(this.model, 'change:imageFileName', this.renderPath);
    },

    changeOpacity : function(){
        this.$el.find('.img-wrapper').css('opacity', this.model.get('opacity'));
    },

    resizeImageToProperDimentions: function() {
        var _that = this;


        var imageSrc = this.$el.find('img').attr('src');
        var img = new Image;
        img.onload = function() {

            var newWidth = img.width;
            var newHeight = img.height;
            var pageWidth = StageView.instance.model.get('options').get('width') - 20;
            var pageHeight = StageView.instance.model.get('options').get('height') - 20;

            if (newWidth > pageWidth) {

                newWidth = pageWidth;
                newHeight = (newWidth * img.height) / img.width;
            }

            if (newHeight > pageHeight) {

                newHeight = pageHeight;
                newWidth = (newHeight * img.width) / img.height;
            }

            _that.model.set({ width:newWidth, height: newHeight });
        }
        img.src = imageSrc;
    },

    onComplete: function(data) {

        this.hideProgressPercent(data);

        this.fileUploader.off();
        this.fileUploader = undefined;

        if(this.resizeImage){
            this.resizeImageToProperDimentions();
        }

        this.trigger('select-component', this.model);

        //this.createMiniature();
        StageView.instance.model.updateDinamicPageThumb();
    },

    createMiniature: function() {

        var _that = this;

        clearTimeout(this.resizeTimeOut);

        this.resizeTimeOut = setTimeout(function() {

            var pageID = StageView.instance.model.get('options').get('pageid');
            var actionkey = _that.model.get('actionkey');
            var fileName = _that.model.get('imageFileName');
            var width = _that.model.get('width');
            var height = _that.model.get('height');


            DataAccess.resizeImage(
                { pageID: pageID, actionkey: actionkey, action:"resizeImage", fileName: fileName, width: width, height: height },
                function(data) {

                    // udany resize

                },
                function(data) { _log('data', data) }
            );

        }, 1500);
    },

    afterInitialize: function() {
        this.model.view = this;
    },

    afterResize: function() {
        this.createMiniature();
    },

    renderPath: function() {

        //src="<?php echo $APP_LINK ?>/projects/<%= __meta__.userID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>"


        var appLink = __meta__.APP_LINK;

        var imageFileName = this.model.get('imageFileName');
        var type = this.model.get('type');

        if(imageFileName == ''){
            var src = 'images/buttons/' + type + '.png';
            this.$el.find('img').attr('src', src);
        }else{
            var userId = this.model.ownerId // __meta__.ownerID;
            var projectId = this.model.projectId;
            //var pageId = StageView.instance.model.get('options').get('pageid');
            
            var actionkey = this.model.get('actionkey');
            var pageId = parseInt(actionkey.split('-').pop());
            var r = '?r=' + this.model.get('rand');


         var src = __meta__.projects_link + userId + '/' + projectId + '/pre/exported_view/' + pageId + '/images/' + actionkey + '/' + imageFileName + r;
           
         //var src = './images/' + actionkey + '/' + imageFileName + r;
            this.$el.find('img').attr('src', src);
        }
    },

    createImageLibrary: function(data, input, resizeImage) {
        var _that = this;

        this.resizeImage = resizeImage;

        var itemDir = data.itemDir;
        var actionkey = this.model.get('actionkey');
        var pageID = StageView.instance.model.get('options').get('pageid');
        var oldFileName = this.model.get('imageFileName');

        _log('copyLibraryFileToImage', itemDir);

        this.showLoader();

        DataAccess.copyLibraryFileToImage(
            { itemDir: itemDir, actionkey:actionkey, pageID: pageID, oldFileName: oldFileName },
            function(data) {

                _that.hideLoader();

                _log('Copy library file to image result: ', data, _log.dataaccessOutResult);

                _that.model.set('library', itemDir, { silent:true });
                _that.model.set('imageFileName', data.fileName, { silent:true });

                _that.model.trigger('change', ['imageFileName', 'library']);

               var src = __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/' + pageID + '/images/' + actionkey + '/' + data.fileName;
               // var src = './' + pageID + '/images/' + actionkey + '/' + data.fileName;
                _that.$el.find('.img-wrapper img').attr('src', src);


                _that.trigger('select-component', _that.model);

                if(_that.resizeImage){
                    _that.resizeImageToProperDimentions();
                }

                //_that.createMiniature();

            },
            function(data) { 
                _log('Copy library file to image fault: ', data, _log.dataaccessOutResult);

                _that.hideLoader();
            }
        );
    },

    onPhotopeaSaved: function() {
        this.renderPath();
        this.resizeImageToProperDimentions();
        this.createMiniature();
        StageView.instance.model.updateDinamicPageThumb();
    },

    showCropWindow: function() {

        var _that = this;

        var pageID = StageView.instance.model.get('options').get('pageid');
        var actionkey = this.model.get('actionkey');
        var fileName = this.model.get('imageFileName');

        var imgSrc =  pageID + '/images/' + actionkey + '/' + fileName;

        if(this.cropWindowView == undefined){
            this.cropWindowView = new CropWindowView({ componentModel: this.model, imgSrc: imgSrc });
            this.cropWindowView.on('on-close', function(){
                _that.cropWindowView = undefined;
            });
            this.cropWindowView.on('on-crop-image', function(data){

                _log('cropWindowView', data);

                var imageFileName = data.newFileName;

                var rand = new Date().getTime();
                _that.model.set({ rand:rand, imageFileName:imageFileName });
                _that.resizableDestroy();
                _that.render();
                _that.makeResizable();
                _that.resizeImageToProperDimentions();
                _that.createMiniature();
                
            });


            var dataToRender = {  };

            $('body').append( this.cropWindowView.render(dataToRender).$el );
            // this.cropWindowView.setWindowPosition(windowPosition);
        }
    },

    showContextMenu: function(e) {

        if(StageView.instance.selectedComponentsCollection.length > 1){
            var contextMenuView = new MultiComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }else{
            var contextMenuView = new ImageComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }
    },

    showLoader: function(){
        this.imageLoader = new ImageLoader();
        this.$el.append(this.imageLoader.render().$el);
    },

    hideLoader: function(){
        if(this.imageLoader){
            this.imageLoader.remove();
        }
    }

});

var ImageLoader = Backbone.View.extend({

    className: 'image-loader',

    template: _.template($('#image-loader').html()),

    render: function(){
        var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
        return {};
    }

});

var ImageComponentViewNotEditable = ComponentView.createNotEditableComponentClass(ImageComponentView);