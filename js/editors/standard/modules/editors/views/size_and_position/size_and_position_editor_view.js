var SizeAndPositionEditorView = EditorView.extend({

	//el: '#size-and-position-container',

	template: _.template($('#size-and-position-editor-template').html()),

	events: {
		'click .flip-x-button': 'flipX',
		'click .flip-y-button': 'flipY'
	},


	bindings: {
	    '[name="type"]': 'type',
	    '[name="position-x"]': {
	    	observe: 'x',
	    	onSet: function(val) {

	    		//this.model.set('x', parseInt(val));
	    		return parseInt(val);

	    	}
	    },
	    '[name="position-y"]': {
	    	observe: 'y',
	    	onSet: function(val) {

	    		//this.model.set('y', parseInt(val));
	    		return parseInt(val);

	    	}
	    },
	    '[name="width"]': {
	    	observe: 'width',
	    	onSet: function(val) {
	    		if (this.model.get('aspectRatio')) {
	    			var proportions = parseFloat(this.model.get('aspectRatioProportions'));

	    			if (parseInt(val) > 0) {
	    				this.model.set('height', parseInt((parseFloat(val)*proportions)/100));
	    			}
	    		} else {
	    			if (this.model) {
	    				this.model.setProportions();
	    			}
	    		}
	    		return parseInt(val);
	    	}
	    },
	    '[name="height"]': {
	    	observe: 'height',
	    	onSet: function(val) {
	    		if (this.model.get('aspectRatio')) {
	    			var proportions = parseFloat(this.model.get('aspectRatioProportions'));

	    			if (parseInt(val) > 0) {
	    				this.model.set('width', parseInt((parseFloat(val)*100)/proportions));
	    			}
	    		} else {
	    			if (this.model) {
		    			this.model.setProportions();
		    		}
	    		}
	    		return parseInt(val);
	    	}
	    },
	    '#rotateAngle': {
	    	observe: 'rotate',
	    	onSet: function(degrees) {
	    		var radians = degrees * (Math.PI/180);

		        var elementToRotate = this.model.view.getElementToRotate();
		        elementToRotate.rotatable('angle', radians);
	    		return radians;
	    	},
	    	onGet: function(radians) {
	    		return parseInt((radians > 0 ? radians : (2*Math.PI + radians)) * 360 / (2*Math.PI));
	    	}
	    },
	    '#aspectRatio': 'aspectRatio'
	},

	// afterRender: function() {
	// 	var aspectRatioActive = this.model.get('aspectRatio');
	// 	if (aspectRatioActive) {
	// 		this.$el.find('#aspectRatio').addClass('aspectRatioActive');
	// 	} else {
	// 		this.$el.find('#aspectRatio').removeClass('aspectRatioActive');
	// 	}	
	// },

	// enableDisableAspectRatio: function() {
	// 	this.model.set('aspectRatio')
	// },

    onSetModel: function() {

    	//_log('tttt', this.model.get('rotate'));

        this.model.off('on-component-drag');
        this.model.on('on-component-drag', this.onComponentDrag, this);
        this.model.off('on-component-resize');
        this.model.on('on-component-resize', this.onComponentResize, this);
        this.model.off('on-component-rotate');
        this.model.on('on-component-rotate', this.onComponentRotate, this);
        this.model.off('on-component-flip');
        this.model.on('on-component-flip', this.onComponentFlip, this);

        this.render();
        this.addTooltips();
    },

    onComponentDrag: function(data){
        this.$el.find('input[name="position-x"]').val(data.left);
        this.$el.find('input[name="position-y"]').val(data.top);
    },

    onComponentResize: function(data){
        this.$el.find('input[name="width"]').val(data.width);
        this.$el.find('input[name="height"]').val(data.height);
    },

    onComponentRotate: function(data){
        this.$el.find('#rotateAngle').val(this.radiansToDegrees(data));
    },

    onComponentFlip: function(data){
        
    },

    radiansToDegrees: function(val) {
    	return parseInt((val > 0 ? val : (2*Math.PI + val)) * 360 / (2*Math.PI));
    },

    flipX: function(){

    	if(this.model instanceof PageModel){
    		return;
    	}

    	this.model.flipX();

    },

    flipY: function(){

    	if(this.model instanceof PageModel){
    		return;
    	}

    	this.model.flipY();

    },

    addTooltips: function() {
    	this.$el.find('.flip-button').tooltip({
    		placement: 'bottom'
    	});
    }


});