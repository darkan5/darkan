var QuizWordsearchEditorView = ExerciseEditorView.extend({
	template: _.template($('#quizwordsearch-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .wordsearch-options-add-new-row': 'addNewRow',
            'click .wordsearch-options-add-new-column': 'addNewColumn',
            'click .wordsearch-options-setting': 'showSetting',
            'click .wordsearch-letter-picker': 'runDataPicker',
            'click .wordsearch-delete-word': 'deleteWord',
            // 'click .wordsearch-add-new-word': 'addNewWord',
            'click .wordsearch-letter': 'deleteLetter',
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

	addNewWord: function() {
		var answers = this.model.get('answers');

		answers.push({ objs: [], opts: [] });

		this.model.set('answers', answers);
		this.model.trigger('change');

		// this.render();
	},

	deleteLetter: function(e) {
		var word = parseInt($(e.target).attr('word'));
		var letter = $(e.target).attr('letter');
		var answers = this.model.get('answers');

		var letterID = answers[word].objs.indexOf(letter);

		if (letterID !== -1) {
			answers[word].objs.splice(letterID, 1);
		}

		this.model.set('answers', answers);
		this.model.trigger('change');

		this.render();


	},

	deleteWord: function(e) {

		if ($(e.target).attr('word') !== 'new') {

			var wordID = parseInt($(e.target).attr('word'));
			var answers = this.model.get('answers');

			answers.splice(wordID, 1);

			this.model.set('answers', answers);
			this.model.trigger('change');

			this.render();
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

	showSetting: function(e) {
		var _that = this;

		var windowPosition = {
			top: e.pageY,
			left: e.pageX
		};

        if(this.containerSettingView == undefined){
            this.containerSettingView = new QuizWordsearchSettingWindow({ componentModel: this.model });
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
			objs[newRow + '-' + val] = '';
		});

		this.calculateRowsAndCols();

		this.model.set('objs', objs);
		this.model.trigger('change:objs');
		this.model.trigger('change');
		this.render();

		this.model.view.afterRender();
	},

	addNewColumn: function() {

		var cols = this.model.get('cols');
		var rows = this.model.get('rows');
		var objs = this.model.get('objs');
		var newCol = cols.length;

		_.each(rows, function(val) {
			objs[val + '-' + newCol] = '';
		});

		this.calculateRowsAndCols();

		this.model.set('objs', objs);
		this.model.trigger('change:objs');
		this.model.trigger('change');
		this.render();

		this.model.view.afterRender();
	},

	runDataPicker: function(e) {

		if (!this.model.editingMode) {
			this.model.view.startEditing();
		}

		var word = $(e.target).attr('word');



		this.showDataPicker(this.addLetter, $(e.target));

	},

    showDataPicker : function(callback, target, cells){
        var _that = this;

        if(this.dataPicker == undefined){
            this.dataPicker = new SimpleDataPickerView({ collection: cells, picker: 'wordsearch-cell', componentView: this.model.view });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;
            });
            this.dataPicker.on('data-picker-picked', function(model){
                callback.call(_that, model, target, _that);
            });

            $('body').append( this.dataPicker.render().$el );
        }else{
            this.dataPicker.closeDataPicker();
            this.showDataPicker(callback, target, cells);
        }
    },

    addLetter: function(model, sender) {

        _log('model', model);
        _log('sender', sender);

    	var word = sender.attr('word');
    	var cellID = model.attr('cellid');
    	var answers = this.model.get('answers');
    	var w;

    	if (word === 'new') {
    		this.addNewWord();
    		w = answers.length - 1;

            sender.attr('word', w);
    	} else {
    		w = parseInt(word);
    	}

    	var inArray;

    	if (typeof answers[w] === 'object') {
    		inArray = answers[w].objs.indexOf(cellID);

    		if (inArray === -1) {
    			answers[w].objs.push(cellID);
    		}
    	}

    	this.model.set('answers', answers);
    	this.model.trigger('change');

    	this.render();
    }

});