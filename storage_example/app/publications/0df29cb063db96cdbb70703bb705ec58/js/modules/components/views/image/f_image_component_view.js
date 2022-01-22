var ImageComponentView = ComponentView.extend({

    className : 'component image-component',

    template: _.template($('#image-component-template').html()),


//    events: function(){
//        return _.extend({},ComponentView.prototype.events,{
//
//        });
//    },

    getPrivateAssets: function() {
        var componentAssets = [ ];

        var actionkey = this.model.get('actionkey');

        // get component image file
        var imageFile = this.model.get('imageFileName');
        var fileExtension = imageFile.split('.').pop();
        if (imageFile && imageFile.length) {
            var randomval = __meta__.randomval;
            var imageSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/images/'+ actionkey +'/min.'+ fileExtension + '?r=' + randomval;
            componentAssets.push(imageSrc);
        }
        return componentAssets;
    }
});