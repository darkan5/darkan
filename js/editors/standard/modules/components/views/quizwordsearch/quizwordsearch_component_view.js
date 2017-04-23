var QuizWordsearchComponentView = ExerciseComponentView.extend({

    className : 'component quizwordsearch-component quiz',

	template: _.template($('#quizwordsearch-component-template').html()),

	imagesExtensions: [],
	soundsExtensions: [],

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
			// 'focusout .crossword-cell' : 'setDeactiveCell',
			// 'focusin .crossword-cell' : 'setActiveCell',
			'keyup .wordsearch-cell': 'changeCellValue',
            'click .edit-component-button': 'startEditing',
        });
    },

	afterInitialize: function() {

		this.model.view = this;
    },

    addComponentListeners :function(){
    	this.model.view = this;
        // this.listenTo(this.model, 'change:titleShow', this.renderTitleShow);
        this.listenTo(this.model, 'change:objs', this.render);
        this.model.on('upload-image', this.uploadImage, this);
        this.model.on('upload-sound', this.uploadSound, this);
    },


    getSpecialProperties: function() {
    	var specilaData = {
    		componentType: 'crossword'
    	};

        return specilaData;
    },



    changeCellValue: function(e) {

    	var cellValue = $(e.target).val();
    	var cellID = $(e.target).attr('cellid');
    	var objs = this.model.get('objs');

    	objs[cellID] = cellValue;

    	this.model.set('objs', objs);
    	this.model.trigger('change');
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

	afterInitialize: function() {

		// this.model.set('activeCellID', '');
		this.calculateRowsAndCols();
	},

	afterRender: function() {
		this.onWordsearchResize();
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
		this.onWordsearchResize();
	},

	onWordsearchResize: function() {


		var objectWrapperWidth = this.$el.width();
		var objectWrapperHeight = this.$el.height();


	    var qcrosswordWrapper = this.$el.find('.quizwordsearch-component-inner');
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

	    this.$el.find('.wordsearch-row').css('height', cell_size + 'px');

	    this.$el.find('.wordsearch-cell-background').css({
	        height: cell_size + "px",
	        width: cell_size + "px",
	        'line-height': cell_size + "px"
	    });

	    this.$el.find('.wordsearch-cell[celltype="answer"]').css({
	        'line-height': cell_size*0.95 + "px",
	        'font-size': cell_size/1.5 + "px"
	    });

	    this.$el.find('.wordsearch-cell[celltype="question"]').css({
	        'line-height': cell_size/3.5 + "px",
	        'font-size': cell_size/3.5 + "px"
	    });

	    // if (instanceName == 'euroforum') {
	    //     obj.find('.wordsearch-cell[celltype="question"]').css({
	    //         'line-height': cell_size*0.95 + "px",
	    //         'font-size': cell_size/1.5 + "px"
	    //     });
	    // } else {
	    //     obj.find('.wordsearch-cell[celltype="question"]').css({
	    //         'line-height': cell_size/5 + "px",
	    //         'font-size': cell_size/5 + "px"
	    //     });
	    // }

	    this.$el.find('.wordsearch-cell-password').css({
	        height: cell_size*0.3 + "px",
	        width: cell_size*0.3 + "px",
	        'line-height': cell_size*0.3 + "px"
	    });



	    
	},

    startEditing: function() {

        var canEditing = this.checkIfCanEditing();

        if(canEditing == false){
            return;
        }

        this.$el.find('.quiz-component-handle').hide();

        this.model.editingMode = true;

    },

    unselect: function(){

        this.$el.find('.quiz-component-handle').show();
        this.model.editingMode = false;
        // this.render();
    }

});

var QuizWordsearchComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizWordsearchComponentView);