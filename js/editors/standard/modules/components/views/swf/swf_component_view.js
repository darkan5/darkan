var SwfComponentView = LoadedComponentView.extend({

	className : 'component swf-component',

	template: _.template($('#swf-component-template').html()),


    putSwf: function() {
        var swfFileName = this.model.get('swfFileName');

        if (swfFileName.length) {
            var actionkey = this.model.get('actionkey');
            var swfPath = 'projects/'+__meta__.ownerID+'/'+__meta__.projectID+'/pre/exported_view/'+actionkey.split('-').pop()+'/swf/'+actionkey+'/'+swfFileName;
            
            this.$el.find('.swf-wrapper').text('')
            this.$el.find('.swf-wrapper').css({
                border: 'none',
                'vertical-align': 'middle',
                'text-align': 'center',
                'background-color': ''
            });

            this.$el.find('.swf-wrapper').flash({
                swf: swfPath,
                encodeParams: false,
                wmode: 'transparent',
                loop: false
            });

        } else {
            // this.$el.css({
            //     // display: 'table'
            // });
            this.$el.find('.swf-wrapper').text('swf')
            this.$el.find('.swf-wrapper').css({
                border: '1px dashed #ccc',
                'vertical-align': 'middle',
                'text-align': 'center',
                'background-color': '#D4E4EF'
            });
        }
        // var width = this.model.get('width');
        // var height = this.model.get('height');

        // this.$el.find('.swf-wrapper').css({
        //     width: width + 'px',
        //     height: height + 'px',
        // });
    },

    afterInitialize: function() {
        this.model.view = this;
    },

    afterRender: function() {
        this.putSwf();
    },

    objectOnResize: function(event, obj) {
        // var width = obj.css('width');
        // var height = obj.css('height');

        // this.$el.find('.swf-component-inner').css({
        //     width: width,
        //     height: height
        // });
    }
});

var SwfComponentViewNotEditable = ComponentView.createNotEditableComponentClass(SwfComponentView);