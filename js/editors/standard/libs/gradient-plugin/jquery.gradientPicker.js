/**
@author Matt Crinklaw-Vogt (tantaman)
*/
(function( $ ) {
	if (!$.event.special.destroyed) {
		$.event.special.destroyed = {
		    remove: function(o) {
		    	if (o.handler) {
		    		o.handler();
		    	}
		    }
		}
	}

	function ctrlPtComparator(l,r) {
		return l.position - r.position;
	}

	function bind(fn, ctx) {
		if (typeof fn.bind === "function") {
			return fn.bind(ctx);
		} else {
			return function() {
				fn.apply(ctx, arguments);
			}
		}
	}

        $.browser = {};
        $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
        $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

	var browserPrefix = "";
	if ($.browser.mozilla) {
		browserPrefix = "-moz-";
	} else if ($.browser.webkit) {
		browserPrefix = "-webkit-";
	} else if ($.browser.opera) {
		browserPrefix = "-o-";
	} else if ($.browser.msie) {
		browserPrefix = "-ms-";
	}

	function GradientSelection($el, opts) {
		this.$el = $el;
		this.$el.css("position", "relative");
		this.opts = opts;

		var $preview = $("<canvas class='gradientPicker-preview'></canvas>");
		this.$el.append($preview);
		var canvas = $preview[0];
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		this.g2d = canvas.getContext("2d");

		var $ctrlPtContainer = $("<div class='gradientPicker-ctrlPts'></div>");
		this.$el.append($ctrlPtContainer)
		this.$ctrlPtContainer = $ctrlPtContainer;

		this.updatePreview = bind(this.updatePreview, this);
		this.controlPoints = [];
		this.ctrlPtConfig = new ControlPtConfig(this.$el, opts);
		for (var i = 0; i < opts.controlPoints.length; ++i) {
			var ctrlPt = this.createCtrlPt(opts.controlPoints[i]);
			this.controlPoints.push(ctrlPt);
		}

		this.docClicked = bind(this.docClicked, this);
		this.destroyed = bind(this.destroyed, this);
		$(document).bind("click", this.docClicked);
		this.$el.bind("destroyed", this.destroyed);
		this.previewClicked = bind(this.previewClicked, this);
		$preview.click(this.previewClicked);

		this.updatePreview();
	}

	GradientSelection.prototype = {
		docClicked: function() {
			this.ctrlPtConfig.hide();
		},

		createCtrlPt: function(ctrlPtSetup) {
			return new ControlPoint(this.$ctrlPtContainer, ctrlPtSetup, this.opts.orientation, this, this.ctrlPtConfig)
		},

		destroyed: function() {
			$(document).unbind("click", this.docClicked);
		},

		updateOptions: function(opts) {
			$.extend(this.opts, opts);
			this.updatePreview();
		},

		updatePreview: function() {
			var result = [];
                         
			this.controlPoints.sort(ctrlPtComparator);
			if (this.opts.orientation == "horizontal") {
				var grad = this.g2d.createLinearGradient(0, 0, this.g2d.canvas.width, 0);
				for (var i = 0; i < this.controlPoints.length; ++i) {
					var pt = this.controlPoints[i];
                                        
                                        
                                        var color_for_canvas = Utils.rgb2hex(pt.color);
                                        
                                        
					grad.addColorStop(pt.position, color_for_canvas);
					result.push({
						position: pt.position,
						color: color_for_canvas
					});
				}
			} else {

			}
			this.g2d.fillStyle = grad;
			this.g2d.fillRect(0, 0, this.g2d.canvas.width, this.g2d.canvas.height);

			if (this.opts.generateStyles)
				var styles = this._generatePreviewStyles();

			this.opts.change(result, styles);
		},

		removeControlPoint: function(ctrlPt) {
			var cpidx = this.controlPoints.indexOf(ctrlPt);
                        
			if (cpidx != -1) {
				this.controlPoints.splice(cpidx, 1);
				ctrlPt.$el.remove();
			}
		},
                
                removeControlPointByID: function(ctrlPtID) {
                        var cpidx = this.controlPoints[ctrlPtID];
                        
                        this.controlPoints.splice(cpidx, 1);
                        cpidx.$el.remove();
                },
                
                changePointColorByID: function(ctrlPtID, color) {
                    var cp = this.controlPoints[ctrlPtID];
                    cp.color = color;
                    this.updatePreview();
                },

		previewClicked: function(e) {
			var offset = $(e.target).offset();
			var x = e.pageX - offset.left;
			var y = e.pageY - offset.top;

			var imgData = this.g2d.getImageData(x,y,1,1);
			var colorStr = "rgb(" + imgData.data[0] + "," + imgData.data[1] + "," + imgData.data[2] + ")";


			var cp = this.createCtrlPt({
				position: x / this.g2d.canvas.width,
				color: colorStr
			});

			this.controlPoints.push(cp);
			this.controlPoints.sort(ctrlPtComparator);
		},

		_generatePreviewStyles: function() {
			//linear-gradient(top, rgb(217,230,163) 86%, rgb(227,249,159) 9%)
			var str = this.opts.type + "-gradient(" + ((this.opts.type == "linear") ? (this.opts.fillDirection + ", ") : "");
			var first = true;
			for (var i = 0; i < this.controlPoints.length; ++i) {
				var pt = this.controlPoints[i];
				if (!first) {
					str += ", ";
				} else {
					first = false;
				}
				str += pt.color + " " + ((pt.position*100)|0) + "%";
			}

			str = str + ")"
			var styles = [str];//['-webkit-' + str, '-moz-' + str, '-o-' + str, '-ms-' + str];
			return styles;
		}
	};

	function ControlPoint($parentEl, initialState, orientation, listener, ctrlPtConfig) {
		this.$el = $("<div class='gradientPicker-ctrlPt'></div>");
		$parentEl.append(this.$el);
		this.$parentEl = $parentEl;
		this.configView = ctrlPtConfig;
                
                if (typeof initialState === "string") {
                
                        if (initialState.substr(0, 3) == 'rgb'){
                                initialState = initialState.split(")");
                                this.position = parseFloat(initialState[1])/100;
                                this.color = initialState[0] + ')';
                        } else {
                                initialState = initialState.split(" ");
                                this.position = parseFloat(initialState[1])/100;
                                this.color = initialState[0];
                        }
		} else {
			this.position = initialState.position;
			this.color = initialState.color;
		}

		this.listener = listener;
		this.outerWidth = this.$el.outerWidth();

		this.$el.css("background-color", this.color);
		if (orientation == "horizontal") {
			var pxLeft = ($parentEl.width() - this.$el.outerWidth()) * (this.position);
			this.$el.css("left", pxLeft);
		} else {
			var pxTop = ($parentEl.height() - this.$el.outerHeight()) * (this.position);
			this.$el.css("top", pxTop);
		}
		
		this.drag = bind(this.drag, this);
		this.stop = bind(this.stop, this);
		this.clicked = bind(this.clicked, this);
		this.colorChanged = bind(this.colorChanged, this);
		this.$el.draggable({
			axis: (orientation == "horizontal") ? "x" : "y",
			drag: this.drag,
			stop: this.stop,
			containment: $parentEl
		});
		this.$el.click(this.clicked);
	}

	ControlPoint.prototype = {
		drag: function(e, ui) {
			// convert position to a %
			var left = ui.position.left;
			this.position = (left / (this.$parentEl.width() - this.outerWidth));
			this.listener.updatePreview();
		},

		stop: function(e, ui) {
			this.listener.updatePreview();
			this.configView.show(this.$el.position(), this.color, this);
		},

		clicked: function(e) {
			this.configView.show(this.$el.position(), this.color, this);
			e.stopPropagation();
			return false;
		},

		colorChanged: function(c) {
			this.color = c;
			this.$el.css("background-color", this.color);
			this.listener.updatePreview();
		},

		removeClicked: function() {
			this.listener.removeControlPoint(this);
			this.listener.updatePreview();
		}
	};

	function ControlPtConfig($parent, opts) {
		//color-chooser
                var that = this;
		this.$el = $('<div class="gradientPicker-ptConfig" style="visibility: hidden"></div>');
		$parent.append(this.$el);
		var $cpicker = $('<div class="color-chooser"></div>');
		this.$el.append($cpicker);
		var $rmEl = $("<div class='gradientPicker-close'></div>");
		this.$el.append($rmEl);
		this.colorChanged = bind(this.colorChanged, this);
		this.removeClicked = bind(this.removeClicked, this);
                
		
		this.$cpicker = $cpicker;
		this.opts = opts;
		this.visible = false;

		$rmEl.click(this.removeClicked);
	}

	ControlPtConfig.prototype = {
		show: function(position, color, listener) {
                        var that = this;
			this.visible = true;
			this.listener = listener;
			this.$el.css("visibility", "visible");
                        
			this.$cpicker.spectrum({
                            color       : color,
                            showInput   : true,
                            showAlpha   : true,
                            move        : function(c){
                                    var hex = c.toRgbString();
                                    that.listener.colorChanged(hex);
                                    that.$cpicker.css("background-color", c);
                            },
                            change  : function(c){
                                    var hex = c.toRgbString();
                                    that.listener.colorChanged(hex);
                                    that.$cpicker.css("background-color", c);
                            }
                        });
                        
			this.$cpicker.css("background-color", color);
			if (this.opts.orientation === "horizontal") {
				this.$el.css("left", position.left);
			} else {
				this.$el.css("top", position.top);
			}
			//else {
			//	this.visible = false;
				//this.$el.css("visibility", "hidden");
			//}
		},

		hide: function() {
			if (this.visible) {
				this.$el.css("visibility", "hidden");
				this.visible = false;
			}
		},

		colorChanged: function(hsb, hex, rgb) {
			hex = "#" + hex;
			this.listener.colorChanged(hex);
			this.$cpicker.css("background-color", hex)
		},

		removeClicked: function() {
			this.listener.removeClicked();
			this.hide();
		}
	};

	var methods = {
		init: function(opts) {
			opts = $.extend({
				controlPoints: ["#FFF 0%", "#000 100%"],
				orientation: "horizontal",
				type: "linear",
				fillDirection: "left",
				generateStyles: true,
				change: function() {}
			}, opts);

			this.each(function() {
				var $this = $(this);
				var gradSel = new GradientSelection($this, opts);
				$this.data("gradientPicker-sel", gradSel);
			});
		},

		update: function(opts) {
			this.each(function() {
				var $this = $(this);
				var gradSel = $this.data("gradientPicker-sel");
				if (gradSel != null) {
					gradSel.updateOptions(opts);
				}
			});
		},
                
		removeControlPointByID: function(opts) {
			this.each(function() {
				var $this = $(this);
				var gradSel = $this.data("gradientPicker-sel");
				if (gradSel != null) {
					gradSel.removeControlPointByID(opts.pointid);
				}
			});
		},
                
                changePointColorByID:function(opts) {
                    this.each(function() {
				var $this = $(this);
				var gradSel = $this.data("gradientPicker-sel");
				if (gradSel != null) {
					gradSel.changePointColorByID(opts.pointid, opts.color);
				}
			});
                },
                
                destroy: function(opts) {
                        this.each(function() {
				var $this = $(this);
				var gradSel = $this.data("gradientPicker-sel");
				if (gradSel != null) {
					gradSel.destroyed();
				}
			});
                }
	};

	$.fn.gradientPicker = function(method, opts) {
		if (typeof method === "string" && method !== "init") {
			methods[method].call(this, opts);
		} else {
			opts = method;
			methods.init.call(this, opts);
		}
	};
})( jQuery );