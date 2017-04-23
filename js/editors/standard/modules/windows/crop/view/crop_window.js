var CropWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view crop-window-view editor-window',

    template: _.template($('#crop-window-template').html()),

    imageSrc: '',

    cropCoords: {
        x: 0,
        y: 0,
        w: 100,
        h: 100
    },

    events: function(){
        return _.extend({},WindowView.prototype.events,{

            'click .image-crop-button-ok': 'cropImage',
            'click .image-crop-button-cancel': 'close'

        });
    },

    cropImage: function() {

        var _that = this;

         this.showLoader();

        DataAccess.cropImage(
            { cropCoords: _that.cropCoords, link: _that.link },
            function(data) {

                 _that.hideLoader();

                _that.trigger('on-crop-image', data); 
                _that.close();
            },
            function(data) { 
                _log('data', data);

                _that.hideLoader();
            }
        );
    },

	initialize: function( data ) {

        var path = __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/';

        this.link = data.imgSrc;

        this.imageSrc = path + data.imgSrc;

        this.componentModel = data.componentModel;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

    afterRender: function() {

        var _that = this;

        this.$el.find('.image-crop').attr('src', this.imageSrc + '?r=' + new Date().getTime()).hide();

        this.$el.find('.image-crop').Jcrop({
                boxWidth: ($(document).width()),
                boxHeight: ($(document).height()-130),
                bgColor:     'white',

                onSelect: function(c) {

                    _that.cropCoords = {
                        x: parseInt(c.x),
                        y: parseInt(c.y),
                        w: parseInt(c.w),
                        h: parseInt(c.h)
                    }

                }
            },function() {
                this.setSelect([0, 0, 200, 200]);
            }
        );
    },


    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    },

    showLoader: function(){
        this.windowLoader = PreloaderFactory.createCropWindowLoader();
        this.$el.append(this.windowLoader.render().$el);
    },

    hideLoader: function(){
        if(this.windowLoader){
            this.windowLoader.remove();
        }
    },
});

