var SoundController = Backbone.View.extend({

	tagName: 'div',
	className: 'sounds-container',

	courseVolume: 1,

	initialize: function() {

		this.componentSoundsContainer = $('<div></div>', {
			class: 'components-sounds'
		});

		// this.componentSound = $('<audio></audio>',{
		// 	controls: 'false',
		// 	class: 'component-sound'
		// });

		this.pageSound = $('<audio></audio>',{
			controls: 'false',
			class: 'page-sound'
		});

		this.projectSound = $('<audio></audio>',{
			controls: 'false',
			class: 'project-sound'
		});

		this.render();
	},

	render: function() {
		$(__meta__.darkanContainer).append(this.$el);
		this.$el.append(this.componentSoundsContainer);
		this.$el.append(this.pageSound);
		this.$el.append(this.projectSound);

		return this;
	},

	unmuteAllSounds: function() {
		this.courseVolume = 1;
		this.componentSoundsContainer.find('audio').each(function() {

			try {

	        	this.volume = 1;

			} catch(msg) {
				_log('ERROR unmut sound', msg);
			}

			
		});

		try {

        	this.pageSound[0].volume = 1;
        	this.projectSound[0].volume = 1;

		} catch(msg) {
			_log('ERROR unmut sound', msg);
		}

		
	},

	muteAllSounds: function() {
		this.courseVolume = 0;
		this.componentSoundsContainer.find('audio').each(function() {

			try {

	        	this.volume = 0;

			} catch(msg) {
				_log('ERROR mute sound', msg);
			}

			
		});

		try {

        	this.pageSound[0].volume = 0;
        	this.projectSound[0].volume = 0;

		} catch(msg) {
			_log('ERROR mute sound', msg);
		}
		
		
	},

	stopAllComponentsSounds: function() {

		var infoPointsSoundComponents = ProjectModel.instance.getInfoPointsSoundComponents();

		infoPointsSoundComponents.each(function(cModel){

			if(cModel.view){
				cModel.view.setComponentAudioAsPause();
			}
			
		});

		_log('stopAllComponentsSounds');

		var audios = this.componentSoundsContainer.find('audio');
		
		for (var i = 0; i < audios.length; i++) {
			var componentSound = $(audios[i]);

			if(componentSound){
	        	componentSound[0].currentTime = 0;
	        	componentSound[0].pause();
			}
		}; 

		// this.componentSoundsContainer.find('audio').each(function() {

		// 	try {

	 //        	this.currentTime = 0;
		// 		this.pause();

		// 	} catch(msg) {
		// 		_log('ERROR pause sound', msg);
		// 	}
			
		// });
		
	},

	pauseAllComponentsSounds: function() {

		var infoPointsSoundComponents = ProjectModel.instance.getInfoPointsSoundComponents();

		infoPointsSoundComponents.each(function(cModel){

			if(cModel.view){
				cModel.view.setComponentAudioAsPause();
			}
			
		});

		this.componentSoundsContainer.find('audio').each(function() {

			try {

				this.pause();

			} catch(msg) {
				_log('ERROR pause sound', msg);
			}
			
		});
		
	},


	clearComponentsSounds: function() {

		// var audios = this.componentSoundsContainer.find('audio');
		
		// for (var i = 0; i < audios.length; i++) {
		// 	var componentSound = $(audios[i]);

		// 	if(componentSound){
	 //        	componentSound[0].currentTime = 0;
	 //        	componentSound[0].pause();
		// 	}
		// };

		this.componentSoundsContainer.html('');
	},

	prepareComponentSound: function(soundPath) {

		// alert(soundPath);

		var componentSound = $('<audio></audio>',{
			controls: 'false',
			class: 'component-sound',
			soundpath: soundPath
		});

		var sourceMP3, sourceOgg;
		// find and replace file source of point sound container
		sourceMP3 = $('<source/>', {
			type: 'audio/mpeg',
			src: soundPath
		});

		var soundPathOGG = soundPath.substring(0, soundPath.length - 3) + "ogg";
		sourceOGG = $('<source/>', {
			type: 'audio/ogg',
			src: soundPathOGG
		});

		

		
		sourceMP3.appendTo(componentSound);
		sourceOGG.appendTo(componentSound);

		this.componentSoundsContainer.append(componentSound);

    	try {

        	componentSound[0].load();
        	componentSound[0].currentTime = 0;
        	componentSound[0].play();
        	componentSound[0].pause();
        	//componentSound[0].buffered.end(0);

		} catch(msg) {
			_log('ERROR playing sound', msg);
		}

		return componentSound;

	},

	playComponentSound: function(soundPath, sender) {

		//this.stopAllComponentsSounds();
		this.pauseAllComponentsSounds();

		var componentAudioObject = this.componentSoundsContainer.find('audio[soundpath="'+soundPath+'"]')[0];

    	try {
    		var volume = sender.model.get('volume');
        	// this.componentSound[0].load();
        	componentAudioObject.currentTime = 0;
        	componentAudioObject.play();
        	if (this.courseVolume) {
		    	componentAudioObject.volume = volume/100;
		    }
		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	stopComponentSound: function(soundPath, sender) {

		this.stopAllComponentsSounds();

		var componentAudioObject = this.componentSoundsContainer.find('audio[soundpath="'+soundPath+'"]')[0];

    	try {
    		var volume = sender.model.get('volume');

        	// this.componentSound[0].load();
        	componentAudioObject.pause();
        	componentAudioObject.currentTime = 0;
        	if (this.courseVolume) {
		    	componentAudioObject.volume = volume/100;
		    }
		} catch(msg) {
			_log('ERROR pause sound', msg);
		}
	},

	pauseComponentSound: function(soundPath, sender) {

		//this.stopAllComponentsSounds();


		var componentAudioObject = this.componentSoundsContainer.find('audio[soundpath="'+soundPath+'"]')[0];

    	try {
        	// this.componentSound[0].load();
        	componentAudioObject.pause();
		} catch(msg) {
			_log('ERROR pause sound', msg);
		}
	},

	

	preparePageSound: function(soundPath) {
		this.pageSound.html('');
		var sourceMP3, sourceOgg;
		// find and replace file source of point sound container
		sourceMP3 = $('<source/>', {
			type: 'audio/mpeg',
			src: soundPath
		});

		var soundPathOGG = soundPath.substring(0, soundPath.length - 3) + "ogg";
		sourceOGG = $('<source/>', {
			type: 'audio/ogg',
			src: soundPathOGG
		});
		
		sourceMP3.appendTo(this.pageSound);
		sourceOGG.appendTo(this.pageSound);
    	try {
        	this.pageSound[0].load();
        	this.pageSound[0].play();
        	this.pageSound[0].pause();
		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	playPageSound: function(sender) {

    	try {
    		var volume = sender.model.get('options').get('volume');
    		_log('volume', volume)
        	this.pageSound[0].play();
        	if (this.courseVolume) {
		    	this.pageSound[0].volume = volume/100;	
        	}
        	// this.pageSound[0].volume = this.courseVolume;
		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	

	prepareProjectSound: function(soundPath) {
		this.projectSound.html('');
		var sourceMP3, sourceOgg;
		// find and replace file source of point sound container
		sourceMP3 = $('<source/>', {
			type: 'audio/mpeg',
			src: soundPath
		});

		var soundPathOGG = soundPath.substring(0, soundPath.length - 3) + "ogg";
		sourceOGG = $('<source/>', {
			type: 'audio/ogg',
			src: soundPathOGG
		});
		
		sourceMP3.appendTo(this.projectSound);
		sourceOGG.appendTo(this.projectSound);

		if (ProjectModel.instance.get('options').get('sound_loop')) {
			this.projectSound.attr('loop', 'true');
		}

    	try {
        	this.projectSound[0].load();
        	this.projectSound[0].play();
        	this.projectSound[0].pause();
		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	playProjectSound: function(sender) {

    	try {
    		var volume = sender.get('options').get('sound_vol');
    		_log('volume', volume);
        	this.projectSound[0].play();
        	if (this.courseVolume) {
		    	this.projectSound[0].volume = volume/100;	
        	}
        	// this.projectSound[0].volume = this.courseVolume;
		} catch(msg) {
			_log('ERROR playing sound', msg);
		}
	},

	stopAllSounds: function() {
		try {
			this.stopAllComponentsSounds();
			this.pageSound[0].pause();	

		} catch(e) { _log('Error...', e, _log.error) }
	}

});