var MultipleSizeAndPositionEditorView = SizeAndPositionEditorView.extend({


    bindings: {
        '[name="type"]': 'type',
        '[name="position-x"]': 'x',
        '[name="position-y"]': 'y',
        '[name="width"]': 'width',
        '[name="height"]': 'height',
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

    onSetCollection: function( collection ) {

        this.model.off('change');
        this.model.on('change', this.onModelChanged, this);

        var arrX = [], arrY = [], arrW = [], arrH = [], arrFX = [], arrFY = [];

        collection.each(function(model){
            arrX.push(model.get('x'));
            arrY.push(model.get('y'));
            arrW.push(model.get('width'));
            arrH.push(model.get('height'));
            arrFX.push(model.get('flipX'));
            arrFY.push(model.get('flipY'));
        });

//        var arrX = _.pluck( collection.toJSON(), 'x' );
//        var arrY = _.pluck( collection.toJSON(), 'y' );
//        var arrW = _.pluck( collection.toJSON(), 'width' );
//        var arrH = _.pluck( collection.toJSON(), 'height' );


        var x = arrX.reduce(function(a, b){return (a === b)?a:"";});
        var y =  arrY.reduce(function(a, b){return (a === b)?a:"";});
        var width = arrW.reduce(function(a, b){return (a === b)?a:"";});
        var height = arrH.reduce(function(a, b){return (a === b)?a:"";});
        var flipX = arrFX.reduce(function(a, b){return (a === b)?a:"";});
        var flipY = arrFY.reduce(function(a, b){return (a === b)?a:"";});


        this.model.set('x', x, { silent:true });
        this.model.set('y', y, { silent:true });
        this.model.set('width', width, { silent:true });
        this.model.set('height', height, { silent:true });
        this.model.set('flipX', flipX, { silent:true });
        this.model.set('flipY', flipY, { silent:true });

        this.render();
    },

    onModelChanged: function(model){

        var _that = this;

        var x = this.model.get('x');
        var y = this.model.get('y');
        var width = this.model.get('width');
        var height = this.model.get('height');
        var flipX = this.model.get('flipX');
        var flipY = this.model.get('flipY');

        this.collection.each(function(model){
            if(x != "") model.set('x', x, { silent:true });
            if(y != "") model.set('y', y, { silent:true });
            if(width != "") model.set('width', width, { silent:true });
            if(height != "") model.set('height', height, { silent:true });
            if(flipX != "") model.set('flipX', flipX, { silent:true });
            if(flipY != "") model.set('flipY', flipY, { silent:true });

            model.view.unselectComponent();
            model.view.render();
            model.view.selectComponent();
            model.trigger('change', ['x', 'y', 'width', 'height', 'flipX', 'flipY']);
        });
    }



});