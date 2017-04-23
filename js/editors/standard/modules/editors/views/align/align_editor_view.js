var AlignEditorView = EditorView.extend({

	//el: '#align-container',

	template: _.template($('#align-editor-template').html()),

	alignTimeout: null,

	events: {
		// 'click #aspectRatio': 'enableDisableAspectRatio'
		// 'mouseenter .align-container': 'showAlignMenu',
		// 'mouseleave .align-container': 'hideAlignMenu',
		'click .align-li': 'alignComponents'
	},

	bindings: {

	},

	findEdge: function(direction) {

		var _that = this;
		var edge;
		var _edge;

		this.collection.each(function(model, index) {

			if (index === 0) {

				switch (direction) {

					case 'down':
						edge = parseInt(model.get('y')) + parseInt(model.get('height'));
						break;

					case 'top':
						edge = parseInt(model.get('y'));
						break;

					case 'right':
						edge = parseInt(model.get('x')) + parseInt(model.get('width'));
						break;

					case 'left':
						edge = parseInt(model.get('x'));
						break;

				}

			}

			switch (direction) {

				case 'down':
					_edge = parseInt(model.get('y')) + parseInt(model.get('height'));
					
					if (_edge > edge) {
						edge = _edge;
					}
					break;

				case 'top':
					_edge = parseInt(model.get('y'));
					
					if (_edge < edge) {
						edge = _edge;
					}
					break;

				case 'right':
					_edge = parseInt(model.get('x')) + parseInt(model.get('width'));
					
					if (_edge > edge) {
						edge = _edge;
					}
					break;

				case 'left':
					_edge = parseInt(model.get('x'));
					
					if (_edge < edge) {
						edge = _edge;
					}
					break;

			}

		});

		return edge;

	},

	setNewPosition: function(direction, edge) {

		var _edge;

		this.collection.each(function(model) {

			switch (direction) {

				case 'down':
					_edge = edge - parseInt(model.get('height'));
					model.set('y', _edge);
					break;

				case 'top':
					model.set('y', edge);
					break;

				case 'right':
					_edge = edge - parseInt(model.get('width'));
					model.set('x', _edge);
					break;

				case 'left':
					model.set('x', edge);
					break;

			}

		});

	},

	setMiddle: function(direction) {

		var minA, minB;

		this.collection.each(function(model, index) {

			if (index === 0) {
				switch (direction) {
					case 'middlex':
						minA = parseInt(model.get('y'));
						minB = parseInt(model.get('y')) + parseInt(model.get('height'));
						break;
					case 'middley':
						minA = parseInt(model.get('x'));
						minB = parseInt(model.get('x')) + parseInt(model.get('width'));
						break;
				}
			} else {
				switch (direction) {
					case 'middlex':
						if (parseInt(model.get('y')) < minA) {
							minA = parseInt(model.get('y'));
						}
						if (parseInt(model.get('y')) + parseInt(model.get('height')) > minB) {
							minB = parseInt(model.get('y')) + parseInt(model.get('height'));
						}
						break;
					case 'middley':
						if (parseInt(model.get('x')) < minA) {
							minA = parseInt(model.get('x'));
						}
						if (parseInt(model.get('x')) + parseInt(model.get('width')) > minB) {
							minB = parseInt(model.get('x')) + parseInt(model.get('width'));
						}
						break;
				}
			}
		});

		var middle = (minB - minA) / 2 + minA;

		this.collection.each(function(model, index) {

			var objW = parseInt(model.get('width'));
			var objH = parseInt(model.get('height'));

			switch (direction) {
				case 'middlex':
					var val = middle - (objH / 2);
					model.set('y', val);
					break;
				case 'middley':
					var val = middle - (objW / 2);
					model.set('x', val);
					break;
			}
		});

	},

	setRedistribute: function(direction) {

		var length = 0;
		var lengthAllObjects = 0;
		var min;
		var max;

		var sortedCollection = [];

		this.collection.each(function(model, index) {

			if (index === 0) {
				switch (direction) {

					case 'redistributex':
						min = parseInt(model.get('x'));
						max = parseInt(model.get('x')) + parseInt(model.get('width'));
						break;

					case 'redistributey':
						min = parseInt(model.get('y'));
						max = parseInt(model.get('y')) + parseInt(model.get('height'));
						break;

				}
			}

			switch (direction) {

				case 'redistributex':
					lengthAllObjects += parseInt(model.get('width'));
					if (parseInt(model.get('x')) < min) {
						min = parseInt(model.get('x'));
					}
					if (parseInt(model.get('x')) + parseInt(model.get('width')) > max) {
						max = parseInt(model.get('x')) + parseInt(model.get('width'));
					}

					sortedCollection.push({
						val: parseInt(model.get('x')),
						model: model
					});
					break;

				case 'redistributey':
					lengthAllObjects += parseInt(model.get('height'));
					if (parseInt(model.get('y')) < min) {
						min = parseInt(model.get('y'));
					}
					if (parseInt(model.get('y')) + parseInt(model.get('height')) > max) {
						max = parseInt(model.get('y')) + parseInt(model.get('height'));
					}

					sortedCollection.push({
						val: parseInt(model.get('y')),
						model: model
					});
					break;

			}

		});

		length = max - min;
		var space = (length - lengthAllObjects) / (this.collection.length - 1);

		sortedCollection.sort(function(a,b) {
			return a.val - b.val;
		});

		var lastPosition = min;

		_.each(sortedCollection, function(obj, index) {

			switch (direction) {

				case 'redistributex':
					obj.model.set('x', lastPosition);
					lastPosition += (parseInt(obj.model.get('width')) + space);
					break;

				case 'redistributey':
					obj.model.set('y', lastPosition);
					lastPosition += (parseInt(obj.model.get('height')) + space);
					break;

			}

		});

	},

	alignComponents: function(e) {

		if (this.collection) {

			var _that = this;
			var target = $(e.currentTarget);
			var alignDirection = target.attr('align');

			switch (alignDirection) {

				case 'top':
				case 'down':
				case 'left':
				case 'right':

					var edge = this.findEdge(alignDirection);


					this.setNewPosition(alignDirection, edge);
					break;

				case 'middlex':
				case 'middley':

					this.setMiddle(alignDirection);
					break;

				case 'redistributex':
				case 'redistributey':

					this.setRedistribute(alignDirection);
					break;

			}

			
		}

	},

    onSetCollection: function() {
    	this.$el.css('opacity', '1');
    },

    deactivate: function() {
    	this.$el.css('opacity', '.3');
    }

});