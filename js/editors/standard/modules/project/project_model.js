var ProjectOptions = Backbone.Model.extend({
	defaults:{
		name: '',
        move_grid: 1,
        copy_grid: 60,
        image_quality: 100,
		snapping: true,
		showsnaplines : true,
		show_titles : false,    // Jest
		draggable_snaptolerance: 10,
		scorm_score_required: false,
        require_score: false,
        require_score_points: 0,
        max_points_number: 0,
        require_pages: true,
        require_elements: false,
        continue_method: 'popup',
		help_title : "",
		sound_loop : true,
		sound_vol : 100,
		pagelisttype: 'thumbs',
		singlefile: true,
		orginal_images: false,
		convert_sound_to_ogg: true,
        dimentions: 'default',
        skin: 'sk00',
        lang: 'pl',
        thumb: '',
		toc_enabled: true,
		last_page_id: 0,
        projectVariables: [],
        pagesDraws: [ ],
        keep_dimensions: false,
        load_every_page_at_start: false,
        load_every_sound_at_start: false,
        soundfilename: '',
        autoScale: false,
        lessonLocationNavigation: '2',
        useLessonLocationDefaultPopupTitle: true,
        useLessonLocationDefaultPopupDescription: true,
        showLessonLocationCloseButtonPopup: true,
        lessonLocationPopupDescription: '',
        lessonLocationPopupTitle: '',
	},

    setFileName: function(data) {
        this.set('soundfilename', data.fileName);
    },

    initialize: function() {

        var width = this.get('width');
        if (!width) {
            var dimentions = __meta__.projectDimentions;
            var blankWidth = dimentions.split('x')[0];
            this.set('width', blankWidth, {silent:true});
        }

        var height = this.get('height');
        if (!height) {
            var dimentions = __meta__.projectDimentions;
            var blankHeight = dimentions.split('x')[1];
            this.set('height', blankHeight, {silent:true});
        }

        this.set('staticVariables', this.getStaticVariables());

        this.listenTo(this, 'change:max_points_number', this.changeMaxPointNumber);
    },

    changeMaxPointNumber: function(model) {

        var variable = this.getStaticVariableByName('_maxscore');

        if (variable !== false)
            variable.pvarvalue = this.get('max_points_number');
    },

    getStaticVariableByName: function(name) {

        var staticVariables = this.get('staticVariables');
        var ret = false;

        _.each(staticVariables, function(variable) {

            if (variable.pvarname === name) {
                ret = variable;
            }
        });

        return ret;
    },

    getStaticVariables: function() {
        return [
            {
                varhash: '00000000000000000000000000000000',
                pvarname: '_score',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000001',
                pvarname: '_maxscore',
                pvarvalue: this.get('max_points_number')
            },
            {
                varhash: '00000000000000000000000000000002',
                pvarname: '_percentscore',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000003',
                pvarname: '_diamonds',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000004',
                pvarname: '_slide_number',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000005',
                pvarname: '_all_slide_numbers',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000006',
                pvarname: '_time_spent_on_screen',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000007',
                pvarname: '_time_spent_on_course',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000008',
                pvarname: '_components_in_line_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000009',
                pvarname: '_components_in_page_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000010',
                pvarname: '_current_lines',
                pvarvalue: null
            },
            {
                varhash: '00000000000000000000000000000011',
                pvarname: '_lines_in_page_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000012',
                pvarname: '_passed_qiuz_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000013',
                pvarname: '_failed_qiuz_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000014',
                pvarname: '_qiuz_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000015',
                pvarname: '_passed_qiuz_on_stage_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000016',
                pvarname: '_failed_qiuz_on_stage_count',
                pvarvalue: 0
            },
            {
                varhash: '00000000000000000000000000000017',
                pvarname: '_qiuz_on_stage_count',
                pvarvalue: 0
            }
        ]
    }
});

var ProjectMap = Backbone.Model.extend({
    defaults:{
        pages : []
    }
});

var ProjectModel = Backbone.Model.extend({
        defaults:{
            options : new ProjectOptions(),
            collection: new PageCollection(),
            name: '...'
        },

    initialize :function(){

        
    },

    getAllComponents: function() {

        var componentCollection = new ComponentCollection();

        this.get('collection').each(function(pageModel){

            pageModel.get('lines').each(function(rowModel) {

                rowModel.get('objects').each(function(componentModel) {

                    componentCollection.add(componentModel);
                });
            });
        });

        return componentCollection;
    },

    getAllPages: function() {

        return this.get('collection');
    },

    loadProjectById :function(data, onLoadProject, onNotLoadProject){

        var _that = this;

       

        var projectId = _.clone(data.projectId);
        var userId = _.clone(data.userId);

        var collection = new PageCollection();

        DataAccess.loadProjectById(
            data,
            function(responseData){

                

                var options = responseData.options;
                var pages = responseData.pages;

                if(options != undefined){

                    var projectOptions = new ProjectOptions( options );

                    _that.set('options', projectOptions, { silent:true });
                }

                if(pages != undefined){
                    // petla po stronach
                    for (var i = 0; i < pages.length; i++) {
                        var page = pages[i];

                         _log('loadProjectById projectId', projectId);
                         _log('loadProjectById userId', userId);

                        var newPageModel = _that.createPageModel( page );
                        newPageModel.projectId = projectId;
                        newPageModel.userId = userId;
                        newPageModel.ownerId = userId;

                        collection.add(newPageModel);

                        _log('loadProjectById newPageModel', newPageModel);
                    };
                }

                _that.set('collection', collection, { silent:true })

                onLoadProject( _that );

            },
            function(respnseData){
                _log("respnseData", respnseData);
            }
        );
    },

    loadProject :function(onLoadProject, onNotLoadProject){

    	var _that = this;

        DataAccess.loadProject(
            { options:this.get('options') },
            function(responseData){

                _log('Load Project Result', responseData, _log.dataaccessOutResult);

	        	// zmienna ze stronami z serwera

                var collection = _that.onGetProjectData(responseData);

		        onLoadProject( _that );

            },
            function(respnseData){
                if(respnseData.code == 1){
                    _log('Error convert project', respnseData, _log.error);
                }
            }
        );



    },

    onGetProjectData: function(responseData){

        var _that = this;

        var collection = new PageCollection();

        var pages = responseData.pages;
        var options = responseData.options;
        var selectedPages = responseData.selectedPages;
        var selectedComponents = responseData.selectedComponents;

        var projectOptions;

        // stworzenie opcji projektu
        if(options != undefined){

            projectOptions = new ProjectOptions( options );

            _that.set('options', projectOptions);
        }

        if(pages != undefined){
            // petla po stronach
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];

                var newPageModel = _that.createPageModel( page );

                collection.add(newPageModel);
            };
        }

        _log('selectedComponents', selectedComponents);


        this.set('selectedPages', selectedPages);
        this.set('selectedComponents', selectedComponents);


        _that.get('options').on('change', function(model){
            _that.saveProjectOptions(model);
        });

        _that.set('collection', collection);

        //_that.updatePageOptions();

        ProjectModel.instance = this;

        return collection;
    },

    // updatePageOptions: function(){

    //     var projectOptions = this.get('options');

    //     DataAccess.saveProjectOptions(
    //         { projectOptions:projectOptions },
    //         function(data) {
    //             _log('Save project options result: ', data, _log.dataaccessOutResult);
    //         },
    //         function(data) {
    //             _log('Save project options fault: ', data, _log.dataaccessOutFault);
    //         }
    //     );
    // },

    createNewPageModel: function(){

        var singleRow = new TimelineRowModel( {
            objects: new TimelineItemCollection( [] ),
            options: new TimelineRowOptionsModel()
        });

        var	timeline = new TimelineRowCollection(singleRow);

        var newPageModel = new PageModel({
            lines:timeline,
            options: new PageOptions()
        });

        return newPageModel;
    },

    createPageModel : function( page ){

        // stworzenie kolekcji linii dla pojedynczej strony
        var	timelineRowCollection = new TimelineRowCollection();

        //var draw = page.draw;
        var lines = page.lines;
        var options = page.options;

        if(lines != undefined){

            // petla po liniach
            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];

                var singleRow = new TimelineRowModel( {
                    objects: new TimelineItemCollection( [] ),
                    options: new TimelineRowOptionsModel( line.options )
                });

                if (line.options.active) {
                    options.activeRow = singleRow;
                }

                var objects = line.objects;

                // petla po obiektach w linii
                for (var k = 0; k < objects.length; k++) {
                    var object = objects[k];

                    // ComponentFactory.createComponentByModel();
                    //var componentModel = new ComponentModel( object );

                    var componentModel = ComponentFactory.createComponentModelByType(object.type, object);

                    singleRow.get('objects').add( componentModel );
                };

                timelineRowCollection.add(singleRow);
            };

        }




        var pageOptions = new PageOptions(options);

        var newPageModel = new PageModel({
            lines:timelineRowCollection,
            options: pageOptions
        });

        return newPageModel;
    },

    createProjectOptionsModel : function( options ){

        var projectOptionsModel = new ProjectOptions( options );

        return projectOptionsModel;
    },

    setProjectOptionsModel : function( projectOptionsModel ){

        this.set('options', projectOptionsModel);
    },

    getProjectOptionsModel : function( ){

        return _that.get('options');
    },

	updatePage: function(pageModel) {

		DataAccess.updatePage(
            pageModel,
            function(data) { _log('Update page successed: ' , data, _log.dataaccessOutResult) },
            function(data) { _log('Update page failed: ' , data, _log.dataaccessOutResult) }
        );
	},

    saveProjectOptions: function(model){

        var projectOptions = this.get('options');

        DataAccess.saveProjectOptions(
            { projectOptions:projectOptions },
            function(data) { _log('Save project options successed: ' , data, _log.dataaccessOutResult) },
            function(data) { _log('Save project options: ' , data, _log.dataaccessOutFault) }
        );
    },

    getPageModelByPageId : function( pageId ){

        var pageModel = false;

        this.get('collection').each(function(model){
            if(model.get('options').get('pageid') == pageId){
                pageModel = model;
            }
        });

        return pageModel;
    },

    calculateAllScoreSuccessPoints: function() {

        var calcPointsAutomatically = this.get('options').get('calc_points_automatically');

        if(calcPointsAutomatically){

            var componentCollection = this.getAllComponents();
            var pagesCollection = this.getAllPages();

            var maxPoints = 0;

            maxPoints = this.calculateComponentsPoints(componentCollection, maxPoints, 'components');

            maxPoints = this.calculateComponentsPoints(pagesCollection, maxPoints, 'pages');

            this.get('options').set('max_points_number', maxPoints);
        }
    },

    calculateComponentsPoints: function(collection, maxPoints, collectionType) {

        collection.each(function(cModel) {

            var triggers;

            if (collectionType === 'components')
                triggers = cModel.get('triggers');
            else
                triggers = cModel.get('options').get('triggers');

            _.each(triggers, function(trigger) {

                var subtriggers = trigger.subtriggers;

                _.each(subtriggers, function(subtrigger) {

                    var objs = subtrigger.objs;

                    if (objs.varName === '00000000000000000000000000000000' && objs.varAction === 'add') {

                        var varValue = parseInt(objs.varValue);

                        maxPoints += varValue;
                    }
                });

            });
        });

        return maxPoints;
    },



    getQuestionsObject: function() {

        var pagesCollection = this.get('collection');

        var questionData = [ ];

        pagesCollection.each(function(pModel) {

            var lines = pModel.get('lines');

            lines.each(function(lModel) {

                var components = lModel.get('objects');

                components.each(function(cModel) {

                    var objectID = cModel.get('actionkey');

                    var componentType = cModel.get('type');

                    switch (componentType) {
                        case 'quiz':
                        case 'quiz-dnd':
                        case 'quiz-selectone':
                        case 'quiz-connectlines':
                        case 'quiz-inputtext':
                        case 'quiz-select':
                        case 'form-inputtext':
                        case 'form-textarea':
                        case 'form-select':
                        case 'form-radio':
                        case 'form-checkbox':
                            var questionObject = cModel.toJSON();

                            var strippedQuestionObject = _.pick(
                                                            questionObject, 
                                                            'actionkey', 
                                                            'type', 
                                                            'width', 
                                                            'height', 
                                                            'attempts', 
                                                            'answers', 
                                                            'scoreSuccess', 
                                                            'scoreFail', 
                                                            'scoreBadAnswer', 
                                                            'styles', 
                                                            'formData',
                                                            'reportName',
                                                            'contents',
                                                            'groupName'
                                                            );
                            questionData.push(strippedQuestionObject);
                            break;
                    }
                });
            });
        });

        return questionData;
    },

    updatePagesOptions: function(data){
        var pagesOptions = data.pagesOptions;

        if(!_.isArray(pagesOptions)){
            return;
        }

        var pagesIds = _.pluck(pagesOptions, 'pageid');

        this.get('collection').each(function(pageModel){

            var pageOptionsModel = pageModel.get('options');

            var pageId = pageOptionsModel.get('pageid');

            var index = pagesIds.indexOf(pageId);

            var options = pagesOptions[index];

            if(options){

                pageOptionsModel.onlyRefresh = true;

                for (var item in options) {
                    pageOptionsModel.set(item, options[item]);
                };

                pageOptionsModel.onlyRefresh = false;
            }

        });

    }

    //this.stageActivePage.activeLine.addComponent();

});

ProjectModel.instance = new ProjectModel();
