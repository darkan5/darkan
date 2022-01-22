var ProjectOptions = Backbone.Model.extend({
	defaults:{
		userScore: 0,
		courseStatus: 'incomplete',
		autoScale: false,
		showLessonLocationPopup: 1,
        useLessonLocationDefaultPopupDescription: true,
        showLessonLocationCloseButtonPopup: true,
        lessonLocationPopupDescription: '',
	}
});

var ProjectModel = Backbone.Model.extend({
	defaults:{
		options : new ProjectOptions(),
		pages: new PageCollection()
	},

	exercisesComponents : null,

	initialize: function(data) {
		this.loadProject();
	},

	isAutoScale: function() {
		return this.get('options').get('autoScale');
	},

	initFromJSON: function(data) {

	},

	loadProject :function(data){

		var data = ProjectObject;

		var pagesCollection = new PageCollection();
		var projectOptions = new ProjectOptions( data.options );

		var pages = data.pages;

		// stworzenie opcji projektu
		this.set('options', projectOptions);

		var pagesDraws = projectOptions.get('pagesDraws');


		if(pages != undefined){
			// petla po stronach
			for (var i = 0; i < pages.length; i++) {
				var page = pages[i];

				var newPageModel = this.createPageModel( page );

				pagesCollection.add(newPageModel);
			};
		}

		this.set('pages', pagesCollection);


		if(pagesDraws && pagesDraws.length > 0){

			if(pages != undefined){

				for (var item in pagesDraws) {
					var pagesDraw = pagesDraws[item];

					var opts = pagesDraw.opts;
					var amountToDraw = parseInt(opts.amountToDraw);
					var pagesToDraw = pagesDraw.pagesToDraw;

					if(amountToDraw > pagesToDraw.length){
						amountToDraw = pagesToDraw.length;
					}

					var pickedPages = Utils.getRandomArrayElements(pagesToDraw, amountToDraw);

					_log('pages', pages);
					_log('pickedPages', pickedPages);

					var difference = _.difference(pagesToDraw, pickedPages);

					_log('difference', difference);

					for (var i = 0; i < difference.length; i++) {
						var pageId = difference[i];

						var newPageModel = this.getPageModelByPageId(pageId);

						if(newPageModel){
							pagesCollection.remove(newPageModel);
						}
					};

				}
			}

		}

		this.changeProjectStaticVariable('_all_slide_numbers', pagesCollection.length);

		var quizComponents = ProjectModel.instance.getExercisesComponents();
		var passedQuizComponents = ProjectModel.instance.getPassedQiuzComponents();
        var failedQuizComponents = ProjectModel.instance.getFailedQiuzComponents();
       

        ProjectModel.instance.changeProjectStaticVariable('_qiuz_count', quizComponents.length);
        ProjectModel.instance.changeProjectStaticVariable('_passed_qiuz_count', passedQuizComponents.length);
        ProjectModel.instance.changeProjectStaticVariable('_failed_qiuz_count', failedQuizComponents.length);


		delete ProjectObject;
	},

	getPageModelByPageId : function( pageId ){

		var pages = this.get('pages');

		var newPageModel = false;

		pages.each(function(pModel){

			if(pModel.get('options').get('pageid') == pageId){
				newPageModel = pModel;
			}
		});

		return newPageModel;
	},


	createPageModel : function( page ){

		TriggerController.instance.setProjectModel(this);

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
					objects: new ComponentsCollection( [] ),
					options: new TimelineRowOptionsModel( line.options )
				});

				if (line.options.active) {
					options.activeRow = singleRow;
				}

				var objects = line.objects;

				// petla po obiektach w linii
				for (var k = 0; k < objects.length; k++) {
					var object = objects[k];

					//ComponentFactory.createComponentByModel();
					var componentModel = new ComponentModel( object );
					//console.log('adding conponent', componentModel);
					//var componentModel = ComponentFactory.createComponentModelByType(object.type, object);

					

					var componentView = ComponentFactory.createComponentByType(componentModel.get('type'), componentModel);

					componentModel.view = componentView;

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

	getAssetsToLoad : function(){
		var pagesCollection = this.get('pages');

		var assets = [];

		pagesCollection.each(function(pageModel){

			assets.push( pageModel.getAssetsToLoad() );

		});

		return assets;
	},

	getAllComponents : function(){

       var componentsCollection = new ComponentsCollection();

        var pagesCollection = this.get('pages');

        pagesCollection.each(function(pageModel){

            var linesCollection = pageModel.get('lines');

            linesCollection.each(function(rowModel){

                var objects = rowModel.get('objects');

                objects.each(function(cModel){

                	componentsCollection.add(cModel);
                });
            });
        });

        return componentsCollection;
    },

    getComponentsByType : function(type){

       var componentsCollection = new ComponentsCollection();

        var pagesCollection = this.get('pages');

        pagesCollection.each(function(pageModel){

            var linesCollection = pageModel.get('lines');

            linesCollection.each(function(rowModel){

                var objects = rowModel.get('objects');

                objects.each(function(cModel){

                	if( _.isString(type) ){
                		if(cModel.get('type') == type){
	                        componentsCollection.add(cModel);
	                    }
                	}else{
                		if( _.isArray(type) ){
                			for (var i = type.length - 1; i >= 0; i--) {
                				var t = type[i];

                				if(cModel.get('type') == t){
			                        componentsCollection.add(cModel);
			                        break;
			                    }
                			};
                		}
                	}

                    
                });
            });
        });

        return componentsCollection;
    },

    getTimerComponents : function(){

        return this.getComponentsByType('timer');
    },

    getInfoPointsSoundComponents : function(){

        return this.getComponentsByType('infopoint-sound');
    },

    getExercisesComponents : function(){

        return this.exercisesComponents || (this.exercisesComponents = this.getComponentsByType(['quiz',
				                         'quiz-dnd',
				                         'quiz-selectone',
				                         'quiz-connectlines',
				                         'quiz-inputtext',
				                         'quiz-select',
				                         'form-inputtext',
				                         'form-textarea',
				                         'form-select',
				                         'form-radio',
				                         'form-checkbox',
				                         'crossword',
				                         'quiz-wordsearch'
				                         ]));
    },

    getPassedQiuzComponents: function(){

    	var componentsCollection = new ComponentsCollection();

    	var exercisesComponents = this.getExercisesComponents();

    	exercisesComponents.each(function(cModel){

            if(cModel.get('compl') == 1){
                componentsCollection.add(cModel);
            }
        });

        return componentsCollection;
    },

    getFailedQiuzComponents: function(){

    	var componentsCollection = new ComponentsCollection();

    	var exercisesComponents = this.getExercisesComponents();

    	exercisesComponents.each(function(cModel){

            if(cModel.get('compl') == 2){
                componentsCollection.add(cModel);
            }
        });

        return componentsCollection;
    },

    getTimerComponentsById : function(timerId){

        var timerComponentsCollection = this.timerComponentsCollection = this.timerComponentsCollection == undefined ?  this.getTimerComponents() : this.timerComponentsCollection;

        var componentsCollection = new ComponentsCollection();

        timerComponentsCollection.each(function(cModel){

            if(cModel.get('timerId') == timerId){
                componentsCollection.add(cModel);
            }
        });

        return componentsCollection;
    },

    getProjectVariableByHash : function(hash){

    	var projectVariables = this.get('options').get('projectVariables');

    	var variables =  _.where(projectVariables, {varhash: hash} );

    	if(variables.length == 0){

    		var staticVariables = this.get('options').get('staticVariables');

    		variables =  _.where(staticVariables, {varhash: hash} );
    	}

    	_log('variables', variables);

    	return _.first(variables);
    },

    getScoreVariable : function(){

    	return this.getProjectVariableByHash( '00000000000000000000000000000000' );
    },

    changeProjectStaticVariable : function(pvarname, value){

    	if(pvarname == undefined){
    		return false;
    	}

    	if(value == undefined){
    		return false;
    	}

    	var options = this.get('options');

    	var staticVariables = options.get('staticVariables');

    	variables =  _.where(staticVariables, {pvarname: pvarname} );

    	var variable = _.first(variables);

    	if(!variable){
    		return false;
    	}

    	variable.pvarvalue = value;

    	options.trigger('change');

    	return variable;
    },

    getProjectSoundPath : function(){
        var projectSound = this.get('options').get('soundfilename');
        if (projectSound && projectSound != '') {
            var audioSrc = __meta__.directLocation + 'exported_view/projectsound/'+ projectSound;
            return audioSrc;
        }
        return false;
    }

});