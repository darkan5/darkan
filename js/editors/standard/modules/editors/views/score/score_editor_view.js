var ScoreEditorView = EditorView.extend({
	//el: '#botmenu-scores-page',
	
	template: _.template($('#score-editor-template').html()),

	bindings: {
	    '#scoring-reqire-pages': 'require_pages',
        '#scoring-reqire-points': 'require_score',
        '#scoring-reqire-points-percent': 'require_score_points',
        '#scoring-reqire-points-number': 'max_points_number',
        '#content-continue-popup': 'continue_method',
        '#content-continue-auto': 'continue_method',
        '#content-continue-none': 'continue_method',
        '#scoring-calculate_points-automatically': 'calc_points_automatically',
	},

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'change #scoring-reqire-pages': 'onChangeRequirePages',
            //'click .calculate-all-points': 'calculateAllPoints'
        });
    },

    initialize: function () {
        this.projectModel = ProjectModel.instance;

        var optionsModel = this.projectModel.get('options');
        this.model = optionsModel;



        // this.runListeners();
    },

    renderCalcPointsAutomatically: function(){

        var calcPointsAutomatically = this.model.get('calc_points_automatically');

        if(calcPointsAutomatically){
            this.$el.find('#scoring-reqire-points-number').attr('disabled', 'disabled');

            ProjectModel.instance.calculateAllScoreSuccessPoints();

        }else{
            this.$el.find('#scoring-reqire-points-number').removeAttr('disabled');
        }
    },


    onChangeRequirePages: function(e){
    	var value = $(e.target).prop('checked');
    	this.model.set('require_pages', value);
    },

    beforeRender: function() {
        this.unstickit();
    },

    afterRender: function () {
        this.stickit();
    },

    onProjectOptionChangesComing: function (projectOptions) {
        //this.unstickit();
        //this.stickit();

        this.renderEditor();
    },

    setModel: function() {

        this.model.off('change:calc_points_automatically', this.renderCalcPointsAutomatically, this);
        this.model.off('option-changes-coming', this.onProjectOptionChangesComing, this);

        this.projectModel = ProjectModel.instance;

        var optionsModel = this.projectModel.get('options');
        this.model = optionsModel;

        this.model.on('change:calc_points_automatically', this.renderCalcPointsAutomatically, this);
        this.model.on('option-changes-coming', this.onProjectOptionChangesComing, this);

        this.renderEditor();

    },

    renderEditor: function() {

        this.render();
        this.renderCalcPointsAutomatically();
    }

});

