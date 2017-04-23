var SoundUploaderEditorView = LoadedSoundUploaderView.extend({
	//el: '#botmenu-sound',
	
	template: _.template($('#sound-uploader-editor-template').html()),

	bindings: {
	    '#loop-sound-project-checkbox': 'sound_loop',
	},

    events: function(){
        return _.extend({},LoadedSoundUploaderView.prototype.events,{
            'click .add-sound-to-project': 'addSoundToProject',
            // 'click .add-sound-file-to-page': 'addSoundToPage',
            // 'click .editor-delete-page-sound-file': 'deleteSoundToPage',
            'click .editor-delete-project-sound-file': 'deleteProjectSound',
            'click #loop-sound-project-checkbox': 'changeSoundLoop',
            'change [name="sound-volume"]': 'changeSoundVolume'
        });
    },
    // onRequireCreditChanged: function(e){

    // 	var value = $(e.target).prop('checked');
    // 	this.model.set('require-credit', value);
    // },
    // onCreditPointsChanged: function(e){

    // 	var value = $(e.target).val();
    // 	this.model.set('credit-points', value);
    // },

    addSoundToProject: function(e) {
        var _that = this;

        var acceptTypeFormat = '.mp3';

        var input = $('<input type="file" name="files[]" accept="'+ acceptTypeFormat +'">');
        input.css({
            display: 'none'
        });

        this.$el.append(input);
        input.click();

        input.change(function(e) {

            _that.uploadOnInputData(e, this, false);

            $(this).remove();
        });
    },

    changeSoundVolume: function(e) {
        var val = $(e.currentTarget).val();
        this.model.set('sound_vol', val);
    },

    changeSoundLoop: function(e) {
        var val = $(e.currentTarget).prop('checked');
        this.model.set('sound_loop', val);
    },

    deleteProjectSound: function(actionkey, fileName) {
        this.model.set('soundfilename', '');
        this.render();
    },

    setModel: function( model ) {

        this.model = model;

        // var options = model.get('options');

        // this.unstickit();

        // if (options === undefined) {
        //     this.model = model;
        // } else {
        //     this.model = options;
        //     this.pageModel = this.model;
        // }

        // this.onSetModel();
    },
});

