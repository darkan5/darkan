var InfoPointGalleryComponentView = ImageComponentView.extend({

	className : 'component infopointgallery-component',

	template: _.template($('#infopointgallery-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click': 'openGallery'
        });
    },

	openGallery: function() {
		var galleryObjects = [ ];

		var galleryFiles = this.model.get('galleryFiles');
        var actionkey = this.model.get('actionkey');

		if (galleryFiles.length) {

			for (var file in galleryFiles) {
				var imageSrc = {href: __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/gallery/'+ actionkey +'/'+ galleryFiles[file]};
				galleryObjects.push(imageSrc);
			};

	   		$.fancybox.open(
		       	galleryObjects, 
		       	{
	   			helpers: {
		           thumbs: {
		               width: 75,
		               height: 50
		               }
		           }
	       });
		}

		this.markAsCompleted();
	},

    renderAsCompleted: function() {
        this.$el.attr({
        	active: true
        })
    },

    renderCss: function() {
        this.$el.css('cursor', 'pointer');
    }
});