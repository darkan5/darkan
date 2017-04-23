var CrosswordEditorView = ExerciseEditorView.extend({
	template: _.template($('#crossword-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .qcrossword-options-change-to-question' : 'changeToQuestion',
            'click .qcrossword-options-change-to-answer' : 'changeToAnswer',
            'click .qcrossword-options-add-new-row': 'addNewRow',
            'click .qcrossword-options-add-new-column': 'addNewColumn',
            'click .qcrossword-options-setting': 'showSetting',
            'click .qcrossword-options-arrow': 'setArrow',
            'change .qcrossword-field-type': 'changeFieldType',
            'click .qcrossword-upload-image-button': 'uploadImage',
            'click .qcrossword-upload-audio-button': 'uploadAudio',
            'click .qcrossword-options-remove-arrow': 'removeArrow',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

	render: function(){
		return this.newRender();
	},

    newRender: function() {
    	var options = { activeCellID: this.activeCellID };
    	var toSend = $.extend({}, this.model.toJSON(), options);

		// var modelJson = this.model.toJSON();
	    var editorTemplate = this.template(toSend);
	    this.$el.html(editorTemplate);
		this.stickit();
		return this;
    },

	onSetModel: function() {
		this.model.off('set-active-cell-id');
		this.model.on('set-active-cell-id', this.setActiveCellID, this);
		// this.listenToOnce(this.model, 'change:activeCellID', this.render);
	},

	uploadImage: function() {
		var objs = this.model.get('objs');
		var files = {
			soundFile: objs[this.activeCellID].opts.soundFile,
			imageFile: objs[this.activeCellID].opts.imageFile
		};

		this.model.uploadImage(files);
	},

	uploadAudio: function() {
		var objs = this.model.get('objs');
		var files = {
			soundFile: objs[this.activeCellID].opts.soundFile,
			imageFile: objs[this.activeCellID].opts.imageFile
		};
		
		this.model.uploadSound(files);
	},

	changeFieldType: function(e) {

		var _that = this;
		var fieldType = $(e.target).val();
		var objs = this.model.get('objs');


		//objs[this.activeCellID].text = '';
		objs[this.activeCellID].opts.questionType = fieldType;

		this.model.set('objs', objs);
		this.model.trigger('change');

		this.model.view.questions();
		this.model.view.dinamicRender();

		this.render();

		var fileName = '';
		var type;
		var actionkey = this.model.get('actionkey');

		if (objs[this.activeCellID].opts.imageFile !== '') {

			fileName = objs[this.activeCellID].opts.imageFile;
			type = 'image';

		} else {

			fileName = objs[this.activeCellID].opts.soundFile;
			type = 'sound';
		}



		if (fileName !== '') {

			DataAccess.updateComponents(
				{
					components:[_that.model],
	                actionkey: actionkey,
	                fileName: fileName,
	                type: type,
	                page: StageView.instance.model,
	                activeCellID: _that.activeCellID,
	                action: 'delete-file-crossword',
	                pageId:StageView.instance.model.getPageId()
				},
				function(data) {

					var objsx = _that.model.get('objs');

					if (type === 'image') {
						objsx[_that.activeCellID].opts.imageFile = '';
					} else {
						objsx[_that.activeCellID].opts.soundFile = '';
					}

					_that.model.set('objs', objsx);
				},
				function(data) {}
			);
		}



	},

	setActiveCellID: function(cellID) {
		// var param = { abc: 'abc' };
		// var toSend = $.extend({}, this.model.toJSON(), param);
		this.activeCellID = cellID;
		this.render();
	},

	onBeforeInitialize: function() {
		this.activeCellID = '';
	},

	setArrow: function(e) {
		var arrowID = $(e.target).attr('arrow-id');
		var objs = this.model.get('objs');

		objs[this.activeCellID].gender = arrowID;

		this.model.set('objs', objs);

		// this.model.trigger('change:objs');
		this.model.trigger('change');

		this.render();
		this.model.view.dinamicRender();
	},

	removeArrow: function() {

		var objs = this.model.get('objs');

		objs[this.activeCellID].gender = '';
		this.model.trigger('change');

		this.render();
		this.model.view.dinamicRender();
	},

	showSetting: function(e) {
		var _that = this;

		var windowPosition = {
			top: e.pageY,
			left: e.pageX
		};

        if(this.containerSettingView == undefined){
            this.containerSettingView = new CrosswordSettingWindow({ componentModel: this.model });
            this.containerSettingView.on('on-close', function(){
                _that.containerSettingView = undefined;
            });

            var dataToRender = { componentModel: this.model.toJSON() };

            $('body').append( this.containerSettingView.render(dataToRender).$el );
            this.containerSettingView.setWindowPosition(windowPosition);
        }
	},

	calculateRowsAndCols: function() {
		var objs = this.model.get('objs');
		var _rows = [];
		var _cols = [];
		var _tmp;
		var cols;
		var rows;

		_.each(objs, function(val, key) {
			_tmp = key.split('-');
			_rows.push(_tmp[0]);
			_cols.push(_tmp[1]);
		});

		cols = _.uniq(_cols);
		rows = _.uniq(_rows);

		this.model.set('cols', cols);
		this.model.set('rows', rows);
	},


	addNewRow: function() {

		var cols = this.model.get('cols');
		var rows = this.model.get('rows');
		var objs = this.model.get('objs');
		var newRow = rows.length;

		_.each(cols, function(val) {
			objs[newRow + '-' + val] = {
    			type: 'answer',
    			text: '',
    			gender: '',
    			opts: {
					questionType: 'text',
					soudFile: '',
					imageFile: ''
    			}
			};
		});

		this.calculateRowsAndCols();

		this.model.set('objs', objs);
		this.model.trigger('change:objs');
		this.model.trigger('change');
		// this.render();

		this.model.forceRender();
		this.model.view.$el.find('.quiz-component-handle').hide();
		this.model.view.afterRender();

		// this.model.view.afterRender();
	},

	addNewColumn: function() {
		var cols = this.model.get('cols');
		var rows = this.model.get('rows');
		var objs = this.model.get('objs');
		var newCol = cols.length;

		_.each(rows, function(val) {
			objs[val + '-' + newCol] = {
    			type: 'answer',
    			text: '',
    			gender: '',
    			opts: {
					questionType: 'text',
					soudFile: '',
					imageFile: ''
    			}
			};
		});

		this.calculateRowsAndCols();

		this.model.set('objs', objs);
		this.model.trigger('change:objs');
		this.model.trigger('change');
		// this.render();

		//this.model.view.afterRender();
		this.model.forceRender();
		this.model.view.$el.find('.quiz-component-handle').hide();
		this.model.view.afterRender();
	},

	changeToAnswer: function(e) {
		var objs = this.model.get('objs');

		if (this.activeCellID !== '') {

			objs[this.activeCellID].type = 'answer';
			objs[this.activeCellID].gender = '';
			objs[this.activeCellID].text = '';

			this.model.set('objs', objs);
			// this.model.trigger('change:objs');
			this.model.trigger('change');
			this.render();

			this.model.view.dinamicRender();
		}

	},

	changeToQuestion: function(e) {
		var objs = this.model.get('objs');

		if (this.activeCellID !== '') {
			objs[this.activeCellID].type = 'question';

			objs[this.activeCellID].text = '';

			this.model.set('objs', objs);
			// this.model.trigger('change:objs');
			this.model.trigger('change');
			this.render();

			this.model.view.dinamicRender();

			// this.model.forceRender();
			// this.model.view.$el.find('.quiz-component-handle').hide();
			// this.model.view.afterRender();
		}
	}

});