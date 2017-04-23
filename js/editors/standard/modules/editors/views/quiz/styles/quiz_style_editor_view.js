var QuizStyleEditorView = StyleEditorView.extend({

    template: _.template($('#have-style-editor-template').html()),

    // events: function(){
    //     return _.extend({},StyleEditorView.prototype.events,{
    //     	'click .style-template': 'setStyle'
    //     });
    // },

  //   setStyle: function(e) {

  //       // this.model.set('backgroundColor', '');
  //       // this.model.set('textColor', '');
  //       // this.model.set('buttonBackgroundColor', '');
  //       // this.model.set('buttonTextColor', '');

  //       this.model.view.$el.find('.quiz-body').css('color', '').css('background', '');
  //       this.model.view.$el.find('.quiz-body').css('color', '').css('background', '');


  //   	this.setStyleToComponentModel(e);

  //   	var templateStyle = $(e.currentTarget).attr('templatestyle');

  //   	this.model.set('premade-style', templateStyle);

		// this.stylesOwnContainer.find('.quiz-own-container-template').css('background', '').css('color', '');

  //   	this.stylesOwnContainer.find('.quiz-own-container-template').attr('class', 'quiz-own-container-template ' + templateStyle);

  //   },

    runStylesFactory: function() {

    	var _that = this;

        var styles = StylesFactory.getQuestionsStyles();
        this.$el.find('.template-styles-container').append(styles);

        var stylesOwn = this.createOwnTempate();
        this.stylesOwnContainer = $('<div>', {
        	class: 'template-styles-container2'
        });

        this.stylesOwnContainer.append(stylesOwn);

        this.$el.append(this.stylesOwnContainer);

        this.$el.find('.template-styles-container, .template-styles-container2').css({
        	width: '50%',
        	float: 'left'
        });
        
        this.listenTo(this.model, 'change', this.colorPicker);

        this.colorPicker();

    },

    colorPicker: function() {
        var styles = _that.model.get('styles');

        var backgroundColor = '#FFF';
        var textColor = '#FFF';
        var buttonBackgroundColor = '#FFF';
        var buttonTextColor = '#FFF';

        if (typeof styles['quiz-body'] === 'undefined') {
            styles['quiz-body'] = { };
        }

        if (typeof styles['quiz-body']['background'] !== 'undefined') {
            backgroundColor = styles['quiz-body']['background'];
        }

        if (typeof styles['quiz-body']['color'] !== 'undefined') {
            textColor = styles['quiz-body']['color'];
        }

        if (typeof styles['quiz-submit-button'] === 'undefined') {
            styles['quiz-submit-button'] = { };
        }

        if (typeof styles['quiz-submit-button']['background'] !== 'undefined') {
            buttonBackgroundColor = styles['quiz-submit-button']['background'];
        }

        if (typeof styles['quiz-submit-button']['color'] !== 'undefined') {
            buttonTextColor = styles['quiz-submit-button']['color'];
        }


        this.colorPickerBackground = new ColorPickerView({ color: backgroundColor });
        this.$el.find('.quiz-background-color-picker').html(this.colorPickerBackground.render().$el);
        this.colorPickerBackground.on('move', function(data) {

            styles['quiz-body']['background'] = data.color;

            _that.model.set('styles', styles, { silent: true });

            _that.model.view.$el.find('.quiz-body').css('background', data.color);
            _that.stylesOwnContainer.find('.quiz-body').css('background', data.color);
        });
        this.colorPickerBackground.on('hide', function(data) {

            _that.model.trigger('change');

            _that.colorPickerBackground.updateColorPicker({ color: _that.model.get('styles')['quiz-body']['background'] });
        });

        this.colorPickerText = new ColorPickerView({ color: textColor });
        this.$el.find('.quiz-text-color-picker').html(this.colorPickerText.render().$el);
        this.colorPickerText.on('move', function(data) {

            styles['quiz-body']['color'] = data.color;

            _that.model.set('styles', styles, { silent: true });

            _that.model.view.$el.find('.quiz-body').css('color', data.color);
            _that.stylesOwnContainer.find('.quiz-body').css('color', data.color);
        });
        this.colorPickerText.on('hide', function(data) {

            _that.model.trigger('change');

            _that.colorPickerText.updateColorPicker({ color: _that.model.get('styles')['quiz-body']['color'] });
        });

        this.colorPickerButtonBackground = new ColorPickerView({ color: buttonBackgroundColor });
        this.$el.find('.quiz-button-background-color-picker').html(this.colorPickerButtonBackground.render().$el);
        this.colorPickerButtonBackground.on('move', function(data) {

            styles['quiz-submit-button']['background'] = data.color;

            _that.model.set('styles', styles, { silent: true });

            _that.model.view.$el.find('.quiz-submit-button').css('background', data.color);
            _that.stylesOwnContainer.find('.quiz-own-button').css('background', data.color);
        });
        this.colorPickerButtonBackground.on('hide', function(data) {

            _that.model.trigger('change');

            _that.colorPickerButtonBackground.updateColorPicker({ color: _that.model.get('styles')['quiz-submit-button']['background'] });
        });

        this.colorPickerButtonText = new ColorPickerView({ color: buttonTextColor });
        this.$el.find('.quiz-button-text-color-picker').html(this.colorPickerButtonText.render().$el);
        this.colorPickerButtonText.on('move', function(data) {

            styles['quiz-submit-button']['color'] = data.color;

            _that.model.set('styles', styles, { silent: true });

            _that.model.view.$el.find('.quiz-submit-button').css('color', data.color);
            _that.stylesOwnContainer.find('.quiz-own-button').css('color', data.color);
        });
        this.colorPickerButtonText.on('hide', function(data) {

            _that.model.trigger('change');

            _that.colorPickerButtonText.updateColorPicker({ color: _that.model.get('styles')['quiz-submit-button']['color'] });
        });
    },

    createOwnTempate: function() {

    	var background = this.model.get('backgroundColor') !== '' ? 'background:' + this.model.get('backgroundColor') + ';' : '';
    	var text = this.model.get('textColor') !== '' ? 'color:' + this.model.get('textColor') + ';' : '';
    	var buttonBackground = this.model.get('buttonBackgroundColor') !== '' ? 'background:' + this.model.get('buttonBackgroundColor') + ';' : '';
    	var buttonText = this.model.get('buttonTextColor') !== '' ? 'color:' + this.model.get('buttonTextColor') + ';' : '';

    	var html = '<div class="quiz-own-container-template ' + this.model.get('premade-style') + '">';
    	html += '<div class="quiz-body" style="' + background + text + '">';
    	html += '<div class="quiz-own-answer-wrapper">';
    	html += '<label>';
    	html += '<input class="quiz-own-answer-checkbox" type="checkbox">';
    	html += '<span class="quiz-own-answer-text">Answer 1</span>';
    	html += '</label>';
    	html += '</div>';
    	html += '<div class="quiz-own-answer-wrapper">';
    	html += '<label>';
    	html += '<input class="quiz-own-answer-checkbox" type="checkbox">';
    	html += '<span class="quiz-own-answer-text">Answer 2</span>';
    	html += '</label>';
    	html += '</div>';
    	html += '<div class="quiz-own-button" style="' + buttonBackground + buttonText + '">OK</div>';
    	html += '</div>';
    	html += '</div>';

    	html += '<div class="quiz-color-picker-container">';
    	html += '<div class="quiz-background-color-picker"></div>';
    	html += '<div class="quiz-text-color-picker"></div>';
    	html += '<div class="quiz-button-background-color-picker"></div>';
    	html += '<div class="quiz-button-text-color-picker"></div>';
    	html += '</div>';

    	return html;
    }
});
