var TextComponentView = ComponentView.extend({

  	className : 'component text-component',

    template: _.template($('#text-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
        });
    },

    afterRender: function() {
    	this.initProjectVarDefautBindings();
		this.listenTo(TriggerController.instance.projectModel.get('options'), 'change', this.showVariableValue);
		this.removeHandle();
		this.renderScrollbar();
    },

	removeHandle: function() {
		this.$el.find('.text-component-handle').remove();
	},

	specialRenderDimentions: function() {
		var _that = this;

		var fontRatio = this.getSmallerRatio();
		try {

			var tempContainer = $('<span></span>');

			tempContainer.html(this.model.get('contents'));

			// tempContainer.each(function() {
			// 	var elFontSize = parseInt($(this).css('font-size'));
			// 	// var lineHeight = parseInt($(this).css('line-height'));
			// 	$(this).css({
			// 		'font-size': elFontSize*fontRatio + 'px',
			// 	});
			// });
			tempContainer.find('*').each(function() {
				console.log('lineHeight', $(this).css('line-height'));
				console.log('lineHeightorg', $(this).html());
				var elFontSize = parseInt($(this).css('font-size'));
				var lineHeight = parseFloat($(this).css('line-height'));
				console.log('lineHeight', lineHeight);
				lineHeight = isNaN(lineHeight) ? 1.2 : lineHeight;

				if(Utils.isIE()) {
					lineHeight = '1.2em';

					$(this).css({
						'font-family': ''
					});
				}

				if (parseInt($(this).find('span').css('font-size'))*fontRatio < 11) {
					lineHeight = 0.1;
				}


				$(this).css({
					'font-size': elFontSize*fontRatio + 'px',
					'line-height': lineHeight,
					'border-top-width': parseFloat($(this).css('line-height'))
				});
			});

			_log('this.model', this.model);

			var componentInner = this.$el.find('.component-inner');

			var padding = this.model.get('padding');

			componentInner.html(tempContainer.html());

			componentInner.css({
				padding: padding*fontRatio + 'px'
			});

		} catch(err) {
			_log('error', err, _log.error);
		}
	},

    showVariableValue: function() {


    	var courseOptions = TriggerController.instance.projectModel.get('options');
    	var courseVariables = courseOptions.get('projectVariables');
    	courseVariables = courseVariables.concat(courseOptions.get('staticVariables'));

		for (var varID in courseVariables) {

			this.$el
				.find('*[pvarbind="'+ courseVariables[varID].varhash +'"]')
				.text(courseVariables[varID].pvarvalue);
		}
    },

    initProjectVarDefautBindings: function() {
    	var _that = this;

    	var courseOptions = TriggerController.instance.projectModel.get('options');
    	var courseVariables = courseOptions.get('projectVariables');

    	courseVariables = courseVariables.concat(courseOptions.get('staticVariables'));

		for (var varID in courseVariables) {

			var elems = this.findElementsDirectlyContainingText(this.el, '{%'+ courseVariables[varID].pvarname +'%}');

			$(elems)
					.html(function() {
						var oldText = this.textContent;
						searchFor = "{%"+ courseVariables[varID].pvarname + "%}";
						var reg = new RegExp(searchFor, "g");
						var newText = oldText.replace(reg, '<span pvarbind="'+ courseVariables[varID].varhash +'">' + courseVariables[varID].pvarvalue + '</span>');
						return newText;
					});
		}
    },

    findElementsDirectlyContainingText: function(ancestor, text) {
	    var elements= [];
	    walk(ancestor);
	    return elements;

	    function walk(element) {
	        var n= element.childNodes.length;
	        for (var i= 0; i<n; i++) {
	            var child= element.childNodes[i];
	            if (child.nodeType===3 && child.data.indexOf(text)!==-1) {
	                elements.push(element);
	                break;
	            }
	        }
	        for (var i= 0; i<n; i++) {
	            var child= element.childNodes[i];
	            if (child.nodeType===1)
	                walk(child);
	        }
	    }
	},

	renderScrollbar: function() {
        var enableScrollbar = this.model.get('enable-scrollbar');
        this.$el.find('.component-inner').css({
            overflow: enableScrollbar ? 'auto' : 'hidden'
        });
    },


// CourseManager.prototype.initProjectVarDefautBindings = function() {
// 	var _that = this;

// 	for (var varID in _that.course.opts.trigger) {

// 		var elems = _that.findElementsDirectlyContainingText(_that.L.scr[0], '{%'+ _that.course.opts.trigger[varID].pvarname +'%}');

// 		$(elems)
// 				.html(function() {
// 					var oldText = this.textContent;
// 					searchFor = "{%"+ _that.course.opts.trigger[varID].pvarname + "%}";
// 					var reg = new RegExp(searchFor, "g");
// 					var newText = oldText.replace(reg, '<span pvarbind="'+ _that.course.opts.trigger[varID].varhash +'">' + _that.course.opts.trigger[varID].pvarvalue + '</span>');
// 					return newText;
// 				});

				
// 	}
// };

// CourseManager.prototype.refreshAllProjectVariablesOnScreen = function() {
// 	var _that = this;

// 	for (var varID in _that.course.opts.trigger) {

// 		debug.log(_that.course.opts.trigger[varID]);

// 		_that.L.scr
// 			.find('*[pvarbind="'+ _that.course.opts.trigger[varID].varhash +'"]')
// 			.text(_that.course.opts.trigger[varID].pvarvalue);
				
// 	}
// };
	





});