var PageOptions = Backbone.Model.extend({
	defaults:function(){
        return {
            opacity: 1,
            pagename: "",
			name: "",
			bgcolor: "",
			width : 860,
			height : 500,
			bg_pos_x: 0,
			bg_pos_y: 0,
			active: 1,
	        pageid: 0,
			order : 0,
			soundfilename : "",
	        volume: 100,
			locknavi : false,
			locknavitrigger: false,
			lockscroll: false,
			'page-end-action': "none",
	        image: "",
			note: "",
	        lastLineId: 0,
	        lastComponentId: 0,
	        slideTime: 60,
	        //activeRow: null,
	        activeComponent: null,
	        triggers: [],
	        title : '',
	        wcag : '',
	        stageLifetime : 60,
	        selectedBy: [],
	        timeOnPage: 0,
	        goToNextPage: false,
	        highlightButtons: true
        }
	},
});


var PageModel = Backbone.Model.extend({

	isLoaded: false,

	defaults: {
		options: new PageOptions(),
		lines: new TimelineRowCollection(),
		draw: []
	},

	exercisesComponents: null,

	initialize: function () {

	},

	getPageBackgroundPath: function() {
        var path = false;
        if (this.get('options').get('image') !== '') {
            path = __meta__.directLocation + 'exported_view/' + this.get('options').get('pageid') +'/imgpage/' + this.get('options').get('image');
        }
        return path;
    },

    getPageSoundPath: function() {
        var pageSound = this.get('options').get('soundfilename');
        if (pageSound.length) {
            var audioSrc = __meta__.directLocation + 'exported_view/'+ this.get('options').get('pageid') +'/audio/page/'+ pageSound;
            return audioSrc;
        }
        return false;
	},

	getAssetsToLoad: function() {
		var _that = this;

		var assets = [ ];

		var allPageComponents = this.getAllPageComponents();

		allPageComponents.each(function(componentModel) {
            //var componentView = ComponentFactory.createComponentByType(componentModel.get('type'), componentModel);
			var componentView = componentModel.view;


			var componentAssets = componentView.getAssets();

            //componentModel.view = componentView;

			if (componentAssets) {
				assets = assets.concat(componentAssets);
			}
			
		});

        // var pageSound = this.getPageSoundPath();
        // if (pageSound) {
        //     assets.push(pageSound);
        // }

        var pageBackground = this.getPageBackgroundPath();
        if (pageBackground) {
            assets.push(pageBackground);
        }

		return assets;
	},

	getAllPageComponents: function() {
		var pageComponents = new ComponentsCollection();
		var pageTimelineRows = this.get('lines');

		pageTimelineRows.each(function(rowModel){

            var objects = rowModel.get('objects');

            objects.each(function(cModel){
                pageComponents.add(cModel);
            });
			
		});	
		return pageComponents;
	},

	getComponentsByType : function(type){

       var componentsCollection = new ComponentsCollection();

        var linesCollection = this.get('lines');

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

        return componentsCollection;
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


});

var PageCollection = Backbone.Collection.extend({
	model: PageModel
});
