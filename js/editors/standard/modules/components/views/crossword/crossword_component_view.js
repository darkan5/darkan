var CrosswordComponentView = ExerciseComponentView.extend({

    className : 'component crossword-component quiz',

	template: _.template($('#crossword-component-template').html()),

	cellValueTimeout: null,


    events: function(){
        return _.extend({},ComponentView.prototype.events,{
			// 'focusout .crossword-cell' : 'setDeactiveCell',
			'focusin .crossword-cell' : 'setActiveCell',
			'keyup .crossword-cell': 'changeCellValue',
            'click .edit-component-button': 'startEditing',
        });
    },

    addComponentListeners :function(){
        // this.listenTo(this.model, 'change:titleShow', this.renderTitleShow);
        this.listenTo(this.model, 'change:objs', this.render);
        this.model.on('upload-image', this.uploadImage, this);
        this.model.on('upload-sound', this.uploadSound, this);
    },

    afterOnComplete: function() {

    	this.dinamicRender();
    },

    dinamicRender: function() {

    	var _that = this;

		var objs = this.model.get('objs');

		var cellSize = this.$el.find('.crossword-cell-background').width();


    	_.each(objs, function(val, key) {


			_that.$el.find('.crossword-cell[cellid="' + key + '"]').parent().attr('gender', val.gender);

			_that.$el.find('.crossword-cell[cellid="' + key + '"]').attr('style', '');

			if (val.type === 'answer') {
				_that.$el.find('.crossword-cell[cellid="' + key + '"]').css('font-size', cellSize/1.5 + 'px').css('line-height', cellSize/0.95 + 'px');
				_that.$el.find('.crossword-cell[cellid="' + key + '"]').attr('maxlength', '1');
				_that.$el.find('.crossword-cell[cellid="' + key + '"]').removeClass('crossword-cell-question').attr('celltype', 'answer');
			} else {
				if (val.opts.questionType === 'text') {
					_that.$el.find('.crossword-cell[cellid="' + key + '"]').removeAttr('readonly');
				} else {
					_that.$el.find('.crossword-cell[cellid="' + key + '"]').attr('readonly', '');
				}
				_that.$el.find('.crossword-cell[cellid="' + key + '"]').css('font-size', cellSize/3.5 + 'px').css('line-height', cellSize/3.5 + 'px');
				_that.$el.find('.crossword-cell[cellid="' + key + '"]').removeAttr('maxlength');
				_that.$el.find('.crossword-cell[cellid="' + key + '"]').addClass('crossword-cell-question').attr('celltype', 'question');
			}

			_that.$el.find('.crossword-cell[cellid="' + key + '"]').val(val.text);

    	});

    	_that.$el.find('.crossword-cell[cellid="' + this.activeCellID + '"]').focus();

    	this.questions();
    },

    uploadImage: function(data) {
    	this.model.soundsExtensions = [];
    	this.model.imagesExtensions = ['jpg', 'png', 'jpeg'];

    	this.model.activeCellID = this.activeCellID;
    	
    	this.uploadOnClick();
    },

    uploadSound: function(data) {
    	this.model.soundsExtensions = ['mp3'];
    	this.model.imagesExtensions = [];


    	this.model.activeCellID = this.activeCellID;

    	this.uploadOnClick();
    },

    getSpecialProperties: function() {

        var objs = this.model.get('objs');
        var activeCellID = this.model.activeCellID

    	var specilaData = {
    		componentType: 'crossword',
            activeCellID: activeCellID,
            opts : objs[activeCellID].opts
    	};

        return specilaData;
    },

    changeCellValue: function(e) {

    	var _that = this;

    	clearTimeout(this.cellValueTimeout);

    	this.cellValueTimeout = setTimeout(function() {

	    	var cellValue = $(e.target).val();
	    	var cellID = $(e.target).attr('cellid');
	    	var objs = _that.model.get('objs');

	    	objs[cellID].text = cellValue;

	    	_that.model.set('objs', objs);
	    	_that.model.trigger('change');

	    }, 500);
    },

	setActiveCell: function(e) {
		var cellID = $(e.target).attr('cellid');
		// this.model.set('activeCellID', cellID);
		this.model.setActieCellID(cellID);

		this.activeCellID = cellID;
	},

	// setDeactiveCell: function(e) {
	// 	// this.model.set('activeCellID', '');
	// },

	questions: function() {

		var _that = this;
		var objs = this.model.get('objs');
		var actionkey = this.model.get('actionkey');


        _.each(objs, function(val, key) {

            if (val.type === 'question') {
                _that.$el.find('.crossword-cell[cellid="' + key + '"]').val(val.text).css('background-image', '');

                if (val.opts.questionType === 'image') {
                    var imageUrl = __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID +  '/pre/exported_view/' + actionkey.split('-').pop() + '/images/' + actionkey + '/' + val.opts.imageFile;
                    _that.$el.find('.crossword-cell[cellid="' + key + '"]').css('background', "url('" + imageUrl + "') no-repeat").css('background-size', 'contain');
                }

                if (val.opts.questionType === 'audio') {
                    var imageUrl = __meta__.APP_LINK + 'content_template/css/images/crossword/audioplay.png';
                    _that.$el.find('.crossword-cell[cellid="' + key + '"]').css('background-image', "url('" + imageUrl + "')");
                }
            }
        });
	},

	afterInitialize: function() {

        this.model.view = this;

		// this.model.set('activeCellID', '');
		this.calculateRowsAndCols();
	},

	afterRender: function() {

		this.calculateRowsAndCols();
		this.onCrosswordResize();

		this.questions();
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

	objectOnResize: function(event, obj) {

		this.onCrosswordResize();
	},

	onCrosswordResize: function() {
		var objectWrapperWidth = this.$el.width();
		var objectWrapperHeight = this.$el.height();


	    var qcrosswordWrapper = this.$el.find('.crossword-component-inner');
	    var crosswordHeight = qcrosswordWrapper.height();
	    var crosswordWidth = qcrosswordWrapper.width();

	    var newCrosswordWidth = objectWrapperWidth;
	    var newCrosswordHeight = ((crosswordHeight * newCrosswordWidth) / crosswordWidth);


	    if (newCrosswordHeight < 10) {
	        newCrosswordHeight = 10;
	    }

	    if (newCrosswordHeight > objectWrapperHeight) {
	        newCrosswordHeight = objectWrapperHeight;
	        newCrosswordWidth = (crosswordWidth * newCrosswordHeight) / crosswordHeight;
	    }

	    var row_count = this.model.get('rows').length;
	    var cell_size = (newCrosswordHeight / row_count);

	    this.$el.find('.crossword-row').css('height', cell_size + 'px');

	    this.$el.find('.crossword-cell-background').css({
	        height: cell_size + "px",
	        width: cell_size + "px",
	        'line-height': cell_size + "px"
	    });

	    this.$el.find('.crossword-cell[celltype="answer"]').css({
	        'line-height': cell_size*0.95 + "px",
	        'font-size': cell_size/1.5 + "px"
	    });

	    this.$el.find('.crossword-cell[celltype="question"]').css({
	        'line-height': cell_size/3.5 + "px",
	        'font-size': cell_size/3.5 + "px"
	    });

	    // if (instanceName == 'euroforum') {
	    //     obj.find('.crossword-cell[celltype="question"]').css({
	    //         'line-height': cell_size*0.95 + "px",
	    //         'font-size': cell_size/1.5 + "px"
	    //     });
	    // } else {
	    //     obj.find('.crossword-cell[celltype="question"]').css({
	    //         'line-height': cell_size/5 + "px",
	    //         'font-size': cell_size/5 + "px"
	    //     });
	    // }

	    this.$el.find('.crossword-cell-password').css({
	        height: cell_size*0.3 + "px",
	        width: cell_size*0.3 + "px",
	        'line-height': cell_size*0.3 + "px"
	    });
	},

    startEditing: function() {
        this.$el.find('.quiz-component-handle').hide();
    },

    unselect: function(){
        this.$el.find('.quiz-component-handle').show();
        // this.render();
    }

});

var CrosswordComponentViewNotEditable = ComponentView.createNotEditableComponentClass(CrosswordComponentView);