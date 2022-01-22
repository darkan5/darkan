var AudioManager = Backbone.View.extend({

	className: 'audio-manager',

	template: _.template($('#audio-manager-template').html()),

	componentsAudios : [],
	pagesAudios : [],
	projectAudio : [],
	courseVolume : 1,


	allAudiosLength : 0,
	progressLength : 0,

	initialize: function() {

	},

	render: function() {

		var template = this.template(this.serializeData());
        this.$el.html(template);

		return this;
	},

	serializeData: function() {
		return {};
	},

	unmuteAllAudios: function() {

		this.courseVolume = 1;

		var allAudios = this.$el.find('audio');

		for (var i = 0; i < allAudios.length; i++) {
			var audio = $(allAudios[i]);

			if(audio[0]){
				try {

		        	audio[0].volume = 1;

				} catch(msg) {
					_log('ERROR unmut sound', msg);
				}
			}
		};
	},

	muteAllAudios: function() {

		this.courseVolume = 0;

		var allAudios = this.$el.find('audio');

		for (var i = 0; i < allAudios.length; i++) {
			var audio = $(allAudios[i]);

			if(audio[0]){
				try {

		        	audio[0].volume = 0;

				} catch(msg) {
					_log('ERROR unmut sound', msg);
				}
			}
		};
	},

	// Components

	createComponetsAudios: function() {

		var _that = this;
		
		var cc = ProjectModel.instance.getAllComponents();

		var componentsAudiosContainer = this.$el.find('.components-audios-container');

		cc.each(function(cModel){

			var audio = _that.createComponentAudio(cModel);

			if(audio){

				var actionkey = cModel.get('actionkey');
				audio.attr('actionkey', actionkey);
				
				_that.addAudioToContainer(audio, componentsAudiosContainer);
			}
        });

	},

	getComponentAudioSrcPath: function(cModel) {

        var actionkey = cModel.get('actionkey');
        var type = cModel.get('type');

		var audioSrc = false;

		switch(type){
			
			case 'infopoint-sound':
				fileName = cModel.get('sound');

				if(!fileName || fileName == ''){
					return false;
				}

				var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/audio/'+ actionkey +'/'+ fileName;

				break;

			default:
				fileName = cModel.get('point-sound');

				if(!fileName || fileName == ''){
					return false;
				}

				var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/sounds/'+ actionkey +'/'+ fileName;
				break;
		}

		return audioSrc;

    },

    getPageAudioSrcPath: function(pModel) {

        var fileName = pModel.get('options').get('soundfilename');

        if(!fileName || fileName == ''){
			return false;
		}

        var audioSrc = __meta__.directLocation + 'exported_view/'+ pModel.get('options').get('pageid') +'/audio/page/'+ fileName;

		return audioSrc;
    },

    createComponentAudio: function(cModel) {

    	var audioPath = this.getComponentAudioSrcPath(cModel);

    	return this.createAudio(audioPath);
    },

	playComponentAudio: function(cModel) {

		this.pauseAllComponentsAudios();

        var audio = this.getComponetAudio(cModel);

        if (!audio) {
        	return false;
        }

        var volume = cModel.get('volume');

        try {

        	audio[0].currentTime = 0;
        	audio[0].play();
        	if (this.courseVolume) {
		    	audio[0].volume = volume/100;
		    }

		} catch(msg) {
			_log('ERROR playing sound', msg);
		}

    },

    stopComponentAudio: function(cModel) {

    	this.stopAllComponentsAudios();

    	var audio = this.getComponetAudio(cModel);

    	if (!audio) {
    		return false;
    	}

    	try {
    		var volume = sender.model.get('volume');

        	audio[0].pause();
        	audio[0].currentTime = 0;
        	if (this.courseVolume) {
		    	audio[0].volume = volume/100;
		    }
		} catch(msg) {
			_log('ERROR pause sound', msg);
		}
    },

    pauseComponentAudio: function(cModel) {

    	var audio = this.getComponetAudio(cModel);

    	if (!audio) {
    		return false;
    	}

    	try {
        	audio[0].pause();
		} catch(msg) {
			_log('ERROR pause sound', msg);
		}
    },

    stopAllComponentsAudios: function(cView) {

    	var infoPointsSoundComponents = ProjectModel.instance.getInfoPointsSoundComponents();

		infoPointsSoundComponents.each(function(cModel){

			if(cModel.view){
				cModel.view.setComponentAudioAsPause();
			}
			
		});

		var audios = this.getAllComponetsAudios();

		for (var i = 0; i < audios.length; i++) {
			
			var audio = $(audios[i]);

			try {

				if(audio[0].duration > 0 && !audio[0].paused){
					audio[0].pause();
					audio[0].currentTime = 0;
				}
				

			} catch(msg) {
				_log('ERROR pause sound', msg);
			}
		};
    },

    pauseAllComponentsAudios: function() {

		var infoPointsSoundComponents = ProjectModel.instance.getInfoPointsSoundComponents();

		infoPointsSoundComponents.each(function(cModel){

			if(cModel.view){
				cModel.view.setComponentAudioAsPause();
			}
			
		});

		var audios = this.getAllComponetsAudios();

		for (var i = 0; i < audios.length; i++) {

			var audio = $(audios[i]);

			try {

				if(audio[0].duration > 0 && !audio[0].paused){
					audio[0].pause();
				}

			} catch(msg) {
				_log('ERROR pause sound', msg);
			}
		};
	},

    getComponetAudio: function(cModel) {

    	var actionkey = cModel.get('actionkey');

    	var componentsAudiosContainer = this.$el.find('.components-audios-container');
    	var audio = componentsAudiosContainer.find('audio[actionkey="'+ actionkey +'"]');

		return audio.length ? audio : false;
	},


	getAllComponetsAudios: function() {

    	var componentsAudiosContainer = this.$el.find('.components-audios-container');
    	var audios = componentsAudiosContainer.find('audio');

		return audios.length ? audios : false;
	},


	// Pages

	createPagesAudios: function() {

		var _that = this;
		
		var pages = ProjectModel.instance.get('pages');

		var pagesAudiosContainer = this.$el.find('.pages-audios-container');

		pages.each(function(pModel){

			var audio = _that.createPageAudio(pModel);

			if(audio){

				var pageId = pModel.get('options').get('pageid');
				audio.attr('pageid', pageId);
				
				_that.addAudioToContainer(audio, pagesAudiosContainer);
			}
        });
	},

	createPageAudio: function(cModel) {

    	var audioPath = this.getPageAudioSrcPath(cModel);

    	return this.createAudio(audioPath);
    },

	getPageAudio: function(pModel) {

    	var pageId = pModel.get('options').get('pageid');

    	var pagesAudiosContainer = this.$el.find('.pages-audios-container');
    	var audio = pagesAudiosContainer.find('audio[pageid="'+ pageId +'"]');

		return audio.length ? audio : false;
	},

	playPageAudio: function(pModel) {

        var audio = this.getPageAudio(pModel);

        if (!audio) {
        	return false;
        }

        var volume = pModel.get('options').get('volume');

        try {

        	audio[0].currentTime = 0;
        	audio[0].play();
        	if (this.courseVolume) {
		    	audio[0].volume = volume/100;
		    }

		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	stopAllPagesAudios: function() {

		var audios = this.getAllPagesAudios();

		for (var i = 0; i < audios.length; i++) {
			
			var audio = $(audios[i]);

			try {

				if(audio[0].duration > 0 && !audio[0].paused){
					audio[0].pause();
					audio[0].currentTime = 0;
				}

			} catch(msg) {
				_log('ERROR pause sound', msg);
			}
		};
	},

	getAllPagesAudios: function() {

    	var pagesAudiosContainer = this.$el.find('.pages-audios-container');
    	var audios = pagesAudiosContainer.find('audio');

		return audios.length ? audios : false;
	},

	


	// Project

	createProjectAudios: function() {
		
		var _that = this;

		var projectModel = ProjectModel.instance;

		var projectAudioContainer = this.$el.find('.project-audio-container');

		var audio = _that.createProjectAudio(ProjectModel.instance);

		if(audio){

			if (projectModel.get('options').get('sound_loop')) {
				audio.attr('loop', 'true');
			}
			
			_that.addAudioToContainer(audio, projectAudioContainer);
		}
	},

	createProjectAudio: function(projectModel) {

    	var audioPath = this.getProjectAudioSrcPath(projectModel);

    	return this.createAudio(audioPath);
    },

    getProjectAudioSrcPath: function(projectModel) {

		return projectModel.getProjectSoundPath();
    },

    playProjectAudio: function(projectModel) {

    	var projectModel = ProjectModel.instance;

        var audio = this.getProjectAudio();

        if (!audio) {
        	return false;
        }

        var volume = projectModel.get('options').get('sound_vol');

        try {

        	audio[0].currentTime = 0;
        	audio[0].play();
        	if (this.courseVolume) {
		    	audio[0].volume = volume/100;
		    }

		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	getProjectAudio: function() {

    	var projectAudioContainer = this.$el.find('.project-audio-container');
    	var audio = projectAudioContainer.find('audio');

		return audio.length ? audio : false;
	},


	stopAllAudios: function() {
		
		this.stopAllComponentsAudios();
		this.stopAllPagesAudios();
	},

	

	// Start Adapter

	playComponentSound: function(path, cView) {
		this.playComponentAudio(cView.model);
	},

	stopComponentSound: function(path, cView) {
		this.stopComponentAudio(cView.model);
	},

	pauseComponentSound: function(path, cView) {
		this.pauseComponentAudio(cView.model);
	},

	playPageSound: function(view) {
		this.playPageAudio(view.model);
	},

	playProjectSound: function() {
		this.playProjectAudio();
	},

	stopAllSounds: function() {
		this.stopAllAudios();
	},

	clearComponentsSounds: function() {
		
	},

	prepareComponentSound: function(path, view) {

		return this.getComponetAudio(view.model);
	},

	preparePageSound: function() {
		
	},

	prepareProjectSound: function() {
		
	},

	muteAllSounds: function() {
		this.muteAllAudios();
	},

	unmuteAllSounds: function() {
		this.unmuteAllAudios();
	},

	// End Adapter



	
	createAudio: function(audioPath) {

		var _that = this;

		if(!audioPath){
			return false;
		}

		if(audioPath == ''){
			return false;
		}

		var audio = $('<audio></audio>',{
			controls: 'false',
			class: 'component-sound',
			soundpath: audioPath
		});

		var sourceMP3, sourceOgg;
		// find and replace file source of point sound container
		sourceMP3 = $('<source/>', {
			type: 'audio/mpeg',
			src: audioPath
		});

		// var audioPathOGG = audioPath.substring(0, audioPath.length - 3) + "ogg";
		// sourceOGG = $('<source/>', {
		// 	type: 'audio/ogg',
		// 	src: audioPathOGG
		// });

		sourceMP3.appendTo(audio);
		//sourceOGG.appendTo(audio);

    	try {

    		audio[0].addEventListener('canplaythrough', function(e){

    			_that.progressLength++;

				_that.trigger('on-proggress', { e:e, progress:_that.progressLength, total:_that.allAudiosLength });

				//_log('e', e);

				if(_that.progressLength == _that.allAudiosLength){
					_that.trigger('on-complete', { e:e, progress:_that.progressLength, total:_that.allAudiosLength });
				}



			}, false);

   //      	audio[0].load();
   //      	audio[0].play();
        	
			// audio[0].pause();
			// audio[0].currentTime = 0;

			

			// audio[0].onprogress = function(e){

			// 	if(audio[0].buffered.length > 0){

			// 		var position = audio[0].buffered.length - 1;
			// 		position = position < 0 ? 0 : position;
			// 		audio[0].buffered.end(position);

			// 		audio[0].onprogress = null;
			// 	} 
			// }
		
        	//audio[0].buffered.end(1);

		} catch(msg) {
			_log('ERROR playing sound', msg);

		}

		return audio;
	},

	addAudioToContainer: function(audio, container) {
		container.append(audio);
		this.allAudiosLength ++;
	},

	playAndPauseAllAudiosForMobile: function() {

		var audios = this.getAllComponetsAudios();

		for (var i = 0; i < audios.length; i++) {
			
			var audio = $(audios[i]);

			audio[0].load();
        	audio[0].play();
        	
			audio[0].pause();
			audio[0].currentTime = 0;

		}

		var audios = this.getAllPagesAudios();

		for (var i = 0; i < audios.length; i++) {
			
			var audio = $(audios[i]);

			audio[0].load();
        	audio[0].play();
        	
			audio[0].pause();
			audio[0].currentTime = 0;

		}

		var audio = this.getProjectAudio();

		if(audio){
			
			audio[0].load();
	    	audio[0].play();
	    	
			audio[0].pause();
			audio[0].currentTime = 0;
		}

		


	},


	
});