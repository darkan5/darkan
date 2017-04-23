var TimelineMultiEditorView = TimelineEditorView.extend({

    setCollection: function(componentsCollection){
    	this.componentsCollection = componentsCollection;
    },

    afterRender: function() {
    	// make arrays with animation names
    	var objectsData = {
    		animIn: [ ],
    		animOut: [ ],
    		animOver: [ ],
    		animEndless: [ ],
            lifetime: [ ]
    	};

    	// populate arrays with animations
    	this.componentsCollection.each(function(cModel) {
    		objectsData.animIn.push(cModel.get('animations').animIn.animationPrettyName);
    		objectsData.animOut.push(cModel.get('animations').animOut.animationPrettyName);
    		objectsData.animOver.push(cModel.get('animations').animOver.animationPrettyName);
    		objectsData.animEndless.push(cModel.get('animations').animEndless.animationPrettyName);
            objectsData.lifetime.push(cModel.get('lifetime'));
    	});

    	// get animation names if all are equal
    	var valuesToPopulate = {
    		animIn: objectsData.animIn.reduce(function(a, b){return (a === b)?a:"----";}),
    		animOut: objectsData.animOut.reduce(function(a, b){return (a === b)?a:"----";}),
    		animOver: objectsData.animOver.reduce(function(a, b){return (a === b)?a:"----";}),
    		animEndless: objectsData.animEndless.reduce(function(a, b){return (a === b)?a:"----";}),
            lifetime: objectsData.lifetime.reduce(function(a, b){return (a === b)?a:0;})
    	}

    	// write animation names on buttons
        this.$el.find('.timeline-editor-add-animation-in').attr('value', valuesToPopulate.animIn);
        this.$el.find('.timeline-editor-add-animation-out').attr('value', valuesToPopulate.animOut);
        this.$el.find('.timeline-editor-add-animation-over').attr('value', valuesToPopulate.animOver);
        this.$el.find('.timeline-editor-add-animation-endless').attr('value', valuesToPopulate.animEndless);
        this.$el.find('.timeline-editor-object-lifetime').val(valuesToPopulate.lifetime);

    },


    openAnimationWindow: function(e, windowType) {
        var _that = this;

        if(this.animationWindowView == undefined){
            var animationData = this.componentsCollection.at(0).get('animations')[windowType];

            this.animationWindowView = WindowFactory.createAnimateWindow(animationData);
            this.animationWindowView.on('on-close', function() {
                _that.animationWindowView = undefined;
            });

            this.animationWindowView.on('on-animation-selected', function( choosenAnimationData ) {
                _that.animationWindowView = undefined;

		    	_that.componentsCollection.each(function(cModel) {
	                cModel.get('animations')[windowType] = choosenAnimationData;
	                cModel.trigger('change');
		    	});
                _that.render();
                _that.afterRender();
            });

            $('body').append( this.animationWindowView.render({title: _lang('ANIMATIONWINDOW_TITLE_'+windowType), animations: window._layout.animations[windowType], animationMainType: windowType}).$el );

            var windowPosition = {
                top: e.pageY,
                left: e.pageX
            }
            this.animationWindowView.setWindowPosition( windowPosition );
        }
    },

    changeComponentsLifetime: function(e) {
    	var lifetimeValue = parseInt($(e.target).val());
    	this.componentsCollection.each(function(cModel) {
            cModel.set('lifetime', lifetimeValue);
    	});
    },

    setRowModel: function(rowModel) {
        this.model = rowModel;
    }
});
