var TimerEditorView = TextEditorView.extend({

	template: _.template($('#timer-editor-template').html()),

	bindings: {
        '[class="enable-scrollbar"]': 'enable-scrollbar',
        '#text-editor-padding': 'padding',

        '.counter-hourstocount': 'hours',
        '.counter-minutestocount': 'minutes',
        '.counter-secondstocount': 'seconds',
        '.counter-hoursenabled': 'hoursEnabled',
        '.counter-minutesenabled': 'minutesEnabled',
        '.counter-secondsenabled': 'secondsEnabled',
        '.counter-autostart': 'counterAutostart',
        '.counter-id': 'timerId'
	},

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'change .enable-scrollbar': 'onEnableScrollbar',
            'click .editor-add-border-button': 'showBorderWindow'
        });
    },

    showBorderWindow: function() {
        this.model.view.addBorder();
    },

    onSetModel: function() {
        var _that = this;
        this.model.off('refresh-bottom-editor');
        this.model.on('refresh-bottom-editor', function() {
            _that.afterRender();
        });
    },

    forceRefreshEditorView: function() {
        this.afterRender();
    },

    afterRender: function() {

        var _that = this;


        this.colorPicker();

        this.listenTo(this.model, 'change:padding', this.onPaddingChange);

        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200,
            'container':'body'
        });

        // this.listenTo(this.model, 'change', this.colorPicker);

    },

    colorPicker: function() {

        var _that = this;
        var styles = _that.model.get('styles');

        var gradientSaveTimeout = null;

        var background = '#FFF';

        if ( _.isUndefined(styles['component-gradient']) ) {
            styles['component-gradient'] = { };
        }

        if ( !_.isUndefined(styles['component-gradient']['background'] ) ) {
            background = styles['component-gradient']['background'];
        }

        this.textBgColorPicker = new GradientPickerView({ color: background });
        this.$el.find('.text-color-picker-container').html(this.textBgColorPicker.render().$el);
        this.textBgColorPicker.afterRender();
        this.textBgColorPicker.on('move', function(data) {

            styles['component-gradient']['background'] = data.color;

            _that.model.set('styles', styles, { silent: true });
            _that.model.view.$el.find('.component-inner').css('background', data.color);
            _that.$el.find('.picker-container').css('background', data.color);
        });
        this.textBgColorPicker.on('gradient-change', function(data) {
            _that.model.view.$el.find('.component-inner').css('background', data.color);
            clearTimeout(gradientSaveTimeout);
            styles['component-gradient']['background'] = data.color;
            _that.model.set('styles', styles, { silent: true });
            gradientSaveTimeout = setTimeout(function() {
                _that.model.trigger('change');
            }, 500);
        });
        this.textBgColorPicker.on('hide', function(data) {
            _that.model.trigger('change');
        });

    },

    onPaddingChange: function() {
        this.model.view.renderPadding();
    },

    onEnableScrollbar: function(e){

    	var value = $(e.target).prop('checked');
    	this.model.set('enable-scrollbar', value);
    }

});