var BorderWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window border-window-view',

    template: _.template($('#border-window-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'change input[name="border"]': 'changeBorder',
            'change input[name="border-radius"]': 'changeBorderRadius',
            'change input[name="shadow"]': 'changeShadow',
            'change .border-style-type': 'changeBorderType',
            'click .show-border-option-extend': 'showExtendOptionsBorder',
            'click .show-border-radius-option-extend': 'showExtendOptionsBorderRadius'
        });
    },

    showExtendOptionsBorder: function() {

        var visible = this.$el.find('.option-extend-border').css('display');

        if (visible === 'none') {
            this.$el.find('.option-extend-border').show();
            this.$el.find('.show-border-option-extend').text('-');
        } else {
            this.$el.find('.option-extend-border').hide();
            this.$el.find('.show-border-option-extend').text('+');
        }

    },

    showExtendOptionsBorderRadius: function() {

        var visible = this.$el.find('.option-extend-border-radius').css('display');

        if (visible === 'none') {
            this.$el.find('.option-extend-border-radius').show();
            this.$el.find('.show-border-radius-option-extend').text('-');
        } else {
            this.$el.find('.option-extend-border-radius').hide();
            this.$el.find('.show-border-radius-option-extend').text('+');
        }

    },

    changeBorder: function(e) {

        var _that = this;
        var target = $(e.currentTarget);
        var targetValue = target.val();
        var action = target.attr('action');

        var componentCollection = StageView.instance.selectedComponentsCollection;

        componentCollection.each(function(model) {
            var styles = model.get('styles');

            if (typeof styles['component-inner'] === 'undefined') {
                styles['component-inner'] = { };
            }

            if (typeof styles['component-inner']['border-color'] === 'undefined') {
                styles['component-inner']['border-color'] = '#000';
            }

            if (typeof styles['component-inner']['border-style'] === 'undefined') {
                styles['component-inner']['border-style'] = 'solid';
            }

            var border = {
                'border-top-width': typeof styles['component-inner']['border-top-width'] !== 'undefined' ? styles['component-inner']['border-top-width'] : '0px',
                'border-left-width': typeof styles['component-inner']['border-left-width'] !== 'undefined' ? styles['component-inner']['border-left-width'] : '0px',
                'border-right-width': typeof styles['component-inner']['border-right-width'] !== 'undefined' ? styles['component-inner']['border-right-width'] : '0px',
                'border-bottom-width': typeof styles['component-inner']['border-bottom-width'] !== 'undefined' ? styles['component-inner']['border-bottom-width'] : '0px'
            }

            switch (action) {

                case 'top':
                    border['border-top-width'] = targetValue + 'px';
                    break;

                case 'left':
                    border['border-left-width'] = targetValue + 'px';
                    break;

                case 'right':
                    border['border-right-width'] = targetValue + 'px';
                    break;

                case 'bottom':
                    border['border-bottom-width'] = targetValue + 'px';
                    break;

                case 'all':
                    border['border-top-width'] = targetValue + 'px';
                    border['border-left-width'] = targetValue + 'px';
                    border['border-right-width'] = targetValue + 'px';
                    border['border-bottom-width'] = targetValue + 'px';
                    break;

            }

            _.extend(styles['component-inner'], border);

            model.trigger('change:border');

            model.set('styles', styles);
            model.trigger('change');

        });

        this.renderValues();
    },

    changeBorderType: function(e) {

        var _that = this;
        var target = $(e.currentTarget);
        var targetValue = target.val();

        var componentCollection = StageView.instance.selectedComponentsCollection;

        componentCollection.each(function(model) {
            var styles = model.get('styles');
            if (typeof styles['component-inner'] === 'undefined') {
                styles['component-inner'] = { };
            }
            
            styles['component-inner']['border-style'] = targetValue;

            model.set('styles', styles);
            model.trigger('change:border');
            model.trigger('change');

        });
    },

    changeBorderRadius: function(e) {

        var _that = this;
        var target = $(e.currentTarget);
        var targetValue = target.val();
        var action = target.attr('action');

        var componentCollection = StageView.instance.selectedComponentsCollection;

        componentCollection.each(function(model) {

            var styles = model.get('styles');

            if (typeof styles['component-inner'] === 'undefined') {
                styles['component-inner'] = { };
            }

            var borderRadius = {
                'border-top-right-radius': typeof styles['component-inner']['border-top-right-radius'] !== 'undefined' ? styles['component-inner']['border-top-right-radius'] : '0px',
                'border-top-left-radius': typeof styles['component-inner']['border-top-left-radius'] !== 'undefined' ? styles['component-inner']['border-top-left-radius'] : '0px',
                'border-bottom-right-radius': typeof styles['component-inner']['border-bottom-right-radius'] !== 'undefined' ? styles['component-inner']['border-bottom-right-radius'] : '0px',
                'border-bottom-left-radius': typeof styles['component-inner']['border-bottom-left-radius'] !== 'undefined' ? styles['component-inner']['border-bottom-left-radius'] : '0px'
            }

            switch (action) {

                case 'topLeft':
                    borderRadius['border-top-left-radius'] = targetValue + 'px';
                    break;

                case 'topRight':
                    borderRadius['border-top-right-radius'] = targetValue + 'px';
                    break;

                case 'bottomLeft':
                    borderRadius['border-bottom-left-radius'] = targetValue + 'px';
                    break;

                case 'bottomRight':
                    borderRadius['border-bottom-right-radius'] = targetValue + 'px';
                    break;

                case 'all':
                    borderRadius['border-top-right-radius'] = targetValue + 'px';
                    borderRadius['border-top-left-radius'] = targetValue + 'px';
                    borderRadius['border-bottom-right-radius'] = targetValue + 'px';
                    borderRadius['border-bottom-left-radius'] = targetValue + 'px';
                    break;

            }

            _.extend(styles['component-inner'], borderRadius);

            model.set('styles', styles);
            model.trigger('change:borderRadius');
            model.trigger('change');

        });

        this.renderValues();
    },

    changeShadow: function(e) {

        var _that = this;
        var target = $(e.currentTarget);
        var targetValue = target.val();
        var action = target.attr('action');

        var componentCollection = StageView.instance.selectedComponentsCollection;

        componentCollection.each(function(model) {

            var styles = model.get('styles');

            if (typeof styles['component-inner'] === 'undefined') {
                styles['component-inner'] = { };
            }

            var shadow = {
                color: '#CCC',
                size: 0,
                blur: 0,
                x: 0,
                y: 0
            };

            if (typeof styles['component-inner']['box-shadow'] !== 'undefined') {

                var _shadow = styles['component-inner']['box-shadow'].split(' ');

                shadow.x = parseInt(_shadow[1]);
                shadow.y = parseInt(_shadow[2]);
                shadow.blur = parseInt(_shadow[3]);
                shadow.size = parseInt(_shadow[4]);
                shadow.color = _shadow[0];

            }

            switch (action) {

                case 'size':
                    shadow.size = targetValue;
                    break;

                case 'blur':
                    shadow.blur = targetValue;
                    break;

                case 'x':
                    shadow.x = targetValue;
                    break;

                case 'y':
                    shadow.y = targetValue;
                    break;

            }

            styles['component-inner']['box-shadow'] = shadow.color + ' ' + shadow.x + 'px ' + shadow.y + 'px ' + shadow.blur + 'px ' + shadow.size + 'px';
            styles['component-inner']['-webkit-box-shadow'] = shadow.color + ' ' + shadow.x + 'px ' + shadow.y + 'px ' + shadow.blur + 'px ' + shadow.size + 'px';
            styles['component-inner']['-moz-box-shadow'] = shadow.color + ' ' + shadow.x + 'px ' + shadow.y + 'px ' + shadow.blur + 'px ' + shadow.size + 'px';

            model.set('styles', styles);
            model.trigger('change:shadow');
            model.trigger('change');

        });

        this.renderValues();
    },

    runListeners: function() {

        // var componentCollection = StageView.instance.selectedComponentsCollection;
        // this.renderValues();

    },

    renderValues: function() {


        this.$el.find('.border-window-overlay').hide();

        var border = {
            top: true,
            left: true,
            right: true,
            bottom: true,
            all: true
        };
        var borderRadius = {
            topLeft: true,
            topRight: true,
            bottomLeft: true,
            bottomRight: true,
            all: true
        };
        var shadow = {
            size: true,
            blur: true,
            x: true,
            y: true
        };

        var _border = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
        var _borderRadius = {
            topLeft: 0,
            topRight: 0,
            bottomLeft: 0,
            bottomRight: 0
        };
        var _shadow = {
            size: 0,
            blur: 0,
            x: 0,
            y: 0
        };

        var ___shadow = { };
        var b = { };
        var br = { };

        StageView.instance.selectedComponentsCollection.each(function(model, index) {

            var styles = model.get('styles');

            ___shadow = {
                color: '#FFF',
                size: 0,
                blur: 0,
                x: 0,
                y: 0
            };

            if (typeof styles['component-inner'] === 'undefined') {
                styles['component-inner'] = { };
            }

            if (typeof styles['component-inner']['box-shadow'] !== 'undefined') {

                var _shadowA = styles['component-inner']['box-shadow'].split(' ');

                ___shadow.x = parseInt(_shadowA[1]);
                ___shadow.y = parseInt(_shadowA[2]);
                ___shadow.blur = parseInt(_shadowA[3]);
                ___shadow.size = parseInt(_shadowA[4]);

            }

            b = {
                top: typeof styles['component-inner']['border-top-width'] !== 'undefined' ? parseInt(styles['component-inner']['border-top-width']) : 0,
                left: typeof styles['component-inner']['border-left-width'] !== 'undefined' ? parseInt(styles['component-inner']['border-left-width']) : 0,
                right: typeof styles['component-inner']['border-right-width'] !== 'undefined' ? parseInt(styles['component-inner']['border-right-width']) : 0,
                bottom: typeof styles['component-inner']['border-bottom-width'] !== 'undefined' ? parseInt(styles['component-inner']['border-bottom-width']) : 0,
                style: typeof styles['component-inner']['border-style'] !== 'undefined' ? styles['component-inner']['border-style'] : 'solid',
                color: typeof styles['component-inner']['border-color'] !== 'undefined' ? styles['component-inner']['border-color'] : '#000'
            };

            br = {
                topLeft: typeof styles['component-inner']['border-top-left-radius'] !== 'undefined' ? parseInt(styles['component-inner']['border-top-left-radius']) : 0,
                topRight: typeof styles['component-inner']['border-top-right-radius'] !== 'undefined' ? parseInt(styles['component-inner']['border-top-right-radius']) : 0,
                bottomLeft: typeof styles['component-inner']['border-bottom-left-radius'] !== 'undefined' ? parseInt(styles['component-inner']['border-bottom-left-radius']) : 0,
                bottomRight: typeof styles['component-inner']['border-bottom-right-radius'] !== 'undefined' ? parseInt(styles['component-inner']['border-bottom-right-radius']) : 0
            }

            if (index === 0) {
                _border.top = b.top;
                _border.left = b.left;
                _border.right = b.right;
                _border.bottom = b.bottom;

                _borderRadius.topLeft = br.topLeft;
                _borderRadius.topRight = br.topRight;
                _borderRadius.bottomLeft = br.bottomLeft;
                _borderRadius.bottomRight = br.bottomRight;

                _shadow.size = ___shadow[4];
                _shadow.blur = ___shadow[3];
                _shadow.x = ___shadow[1];
                _shadow.y = ___shadow[2];
            } else {
                b.top !== _border.top ? border.top = false : '';
                b.left !== _border.left ? border.left = false : '';
                b.right !== _border.right ? border.right = false : '';
                b.bottom !== _border.bottom ? border.bottom = false : '';

                br.topLeft !== _borderRadius.topLeft ? borderRadius.topLeft = false : '';
                br.topRight !== _borderRadius.topRight ? borderRadius.topRight = false : '';
                br.bottomLeft !== _borderRadius.bottomLeft ? borderRadius.bottomLeft = false : '';
                br.bottomRight !== _borderRadius.bottomRight ? borderRadius.bottomRight = false : '';

                ___shadow[4] !== _shadow.size ? shadow.size = false : '';
                ___shadow[3] !== _shadow.blur ? shadow.blur = false : '';
                ___shadow[1] !== _shadow.x ? shadow.x = false : '';
                ___shadow[2] !== _shadow.y ? shadow.y = false : '';
            }


            if ((b.top !== b.left ||
                b.left !== b.right ||
                b.right !== b.bottom) ||
                (border.top === false ||
                border.left === false ||
                border.right === false ||
                border.bottom === false)) {

                border.all = false;
            }

            if ((br.topLeft !== br.topRight ||
                br.topRight !== br.bottomLeft ||
                br.bottomLeft !== br.bottomRight) ||
                (borderRadius.topLeft === false ||
                borderRadius.topRight === false ||
                borderRadius.bottomLeft === false ||
                borderRadius.bottomRight === false)) {

                borderRadius.all = false;
            }

        });


        if (!border.all) { this.$el.find('.different-border-all').addClass('warning-icon'); } else { this.$el.find('.different-border-all').removeClass('warning-icon'); }
        if (!border.top) { this.$el.find('.different-border-top').addClass('warning-icon'); } else { this.$el.find('.different-border-top').removeClass('warning-icon'); }
        if (!border.left) { this.$el.find('.different-border-left').addClass('warning-icon'); } else { this.$el.find('.different-border-left').removeClass('warning-icon'); }
        if (!border.right) { this.$el.find('.different-border-right').addClass('warning-icon'); } else { this.$el.find('.different-border-right').removeClass('warning-icon'); }
        if (!border.bottom) { this.$el.find('.different-border-bottom').addClass('warning-icon'); } else { this.$el.find('.different-border-bottom').removeClass('warning-icon'); }

        if (!borderRadius.all) { this.$el.find('.different-border-radius-all').addClass('warning-icon'); } else { this.$el.find('.different-border-radius-all').removeClass('warning-icon'); }
        if (!borderRadius.topLeft) { this.$el.find('.different-border-radius-topleft').addClass('warning-icon'); } else { this.$el.find('.different-border-radius-topleft').removeClass('warning-icon'); }
        if (!borderRadius.topRight) { this.$el.find('.different-border-radius-topright').addClass('warning-icon'); } else { this.$el.find('.different-border-radius-topright').removeClass('warning-icon'); }
        if (!borderRadius.bottomLeft) { this.$el.find('.different-border-radius-bottomleft').addClass('warning-icon'); } else { this.$el.find('.different-border-radius-bottomleft').removeClass('warning-icon'); }
        if (!borderRadius.bottomRight) { this.$el.find('.different-border-radius-bottomright').addClass('warning-icon'); } else { this.$el.find('.different-border-radius-bottomright').removeClass('warning-icon'); }

        if (!shadow.size) { this.$el.find('.different-shadow-size').addClass('warning-icon'); } else { this.$el.find('.different-shadow-size').removeClass('warning-icon'); }
        if (!shadow.blur) { this.$el.find('.different-shadow-blur').addClass('warning-icon'); } else { this.$el.find('.different-shadow-blur').removeClass('warning-icon'); }
        if (!shadow.x) { this.$el.find('.different-shadow-x').addClass('warning-icon'); } else { this.$el.find('.different-shadow-x').removeClass('warning-icon'); }
        if (!shadow.y) { this.$el.find('.different-shadow-y').addClass('warning-icon'); } else { this.$el.find('.different-shadow-y').removeClass('warning-icon'); }

        // var firstModel = StageView.instance.selectedComponentsCollection.first();
        // var firstModelBorder = firstModel.get('border');
        // var firstModelBorderRadius = firstModel.get('borderRadius');
        // var firstModelShadow = firstModel.get('shadow');

        this.$el.find('.border-style-type').val(b.style);

        this.$el.find('input[name="border"][action="all"]').val(b.top);
        this.$el.find('input[name="border"][action="top"]').val(b.top);
        this.$el.find('input[name="border"][action="left"]').val(b.left);
        this.$el.find('input[name="border"][action="right"]').val(b.right);
        this.$el.find('input[name="border"][action="bottom"]').val(b.bottom);

        this.$el.find('input[name="border-radius"][action="all"]').val(br.topLeft);
        this.$el.find('input[name="border-radius"][action="topLeft"]').val(br.topLeft);
        this.$el.find('input[name="border-radius"][action="topRight"]').val(br.topRight);
        this.$el.find('input[name="border-radius"][action="bottomLeft"]').val(br.bottomLeft);
        this.$el.find('input[name="border-radius"][action="bottomRight"]').val(br.bottomRight);

        this.$el.find('input[name="shadow"][action="size"]').val(___shadow.size);
        this.$el.find('input[name="shadow"][action="blur"]').val(___shadow.blur);
        this.$el.find('input[name="shadow"][action="x"]').val(___shadow.x);
        this.$el.find('input[name="shadow"][action="y"]').val(___shadow.y);

        var colorBorder = b.color;
        var colorShadow = ___shadow[0];

        this.colorPickerBorder.updateColorPicker({ color: colorBorder });
        this.colorPickerShadow.updateColorPicker({ color: colorShadow });

    },

    afterRender: function() {
        // to override

        this.$el.find('.darkan-tabs').tabs();
        
        this.colorPickerBorder = new ColorPickerView({ color: '#CCC' });
        this.$el.find('.border-color-picker').html(this.colorPickerBorder.render().$el);
        this.colorPickerBorder.on('move', function(data) {
            StageView.instance.selectedComponentsCollection.each(function(model) {

                var styles = model.get('styles');

                if (typeof styles['component-inner'] === 'undefined') {
                    styles['component-inner'] = { };
                }

                styles['component-inner']['border-color'] = data.color;


                model.set('styles', styles);

                model.view.renderBorder();
            });
        });
        this.colorPickerBorder.on('change', function(data) {
        });
        this.colorPickerBorder.on('hide', function(data) {
            StageView.instance.selectedComponentsCollection.each(function(model) {

                model.trigger('change:border');
                model.trigger('change');

            });
        });


        this.colorPickerShadow = new ColorPickerView({ color: '#CCC' });
        this.$el.find('.shadow-color-picker').html(this.colorPickerShadow.render().$el);
        this.colorPickerShadow.on('move', function(data) {

            StageView.instance.selectedComponentsCollection.each(function(model) {

                var styles = model.get('styles');

                if (typeof styles['component-inner'] === 'undefined') {
                    styles['component-inner'] = { };
                }

                var ___shadow = {
                    color: '#CCC',
                    size: 0,
                    blur: 0,
                    x: 0,
                    y: 0
                };

                if (typeof styles['component-inner']['box-shadow'] !== 'undefined') {

                    var _shadowA = styles['component-inner']['box-shadow'].split(' ');
                    function rgb2hex(rgb) {
                        var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
                        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        function hex(x) {
                            return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                        }
                        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                    }


                    ___shadow.x = parseInt(_shadowA[1]);
                    ___shadow.y = parseInt(_shadowA[2]);
                    ___shadow.blur = parseInt(_shadowA[3]);
                    ___shadow.size = parseInt(_shadowA[4]);
                    ___shadow.color = rgb2hex(data.color);

                }

                styles['component-inner']['box-shadow'] = ___shadow.color + ' ' + ___shadow.x + 'px ' + ___shadow.y + 'px ' + ___shadow.blur + 'px ' + ___shadow.size + 'px';
                styles['component-inner']['-webkit-box-shadow'] = ___shadow.color + ' ' + ___shadow.x + 'px ' + ___shadow.y + 'px ' + ___shadow.blur + 'px ' + ___shadow.size + 'px';
                styles['component-inner']['-moz-box-shadow'] = ___shadow.color + ' ' + ___shadow.x + 'px ' + ___shadow.y + 'px ' + ___shadow.blur + 'px ' + ___shadow.size + 'px';

                model.view.renderShadow();
            });
        });
        this.colorPickerShadow.on('change', function(data) {
        });
        this.colorPickerShadow.on('hide', function(data) {

            StageView.instance.selectedComponentsCollection.each(function(model) {

                model.trigger('change:shadow');
                model.trigger('change');

            });
        });

        this.renderValues();

        this.listenTo(StageView.instance.selectedComponentsCollection, 'add', this.renderValues);
        this.listenTo(StageView.instance.selectedComponentsCollection, 'reset', this.resetCollection);


        //StageView.instance.selectedComponentsCollection
    },

    resetCollection: function() {


        this.$el.find('.border-window-overlay').show();



        // if (StageView.instance.selectedComponentsCollection.length !== 0) {
        //     this.renderValues();
        // }
    },

    setWindowPosition: function() {

        var firstModel = StageView.instance.selectedComponentsCollection.first();
        var firstModelPosition = $(firstModel.view.$el).offset();

        var top = firstModelPosition.top;
        var left = firstModelPosition.left + firstModel.get('width');

        this.$el.css('top', top + 'px').css('left', left + 'px');
    }

});