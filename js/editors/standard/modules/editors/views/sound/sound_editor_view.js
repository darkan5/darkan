var SoundEditorView = EditorView.extend({
	//el: '#botmenu-sound',
	
	template: _.template($('#sound-editor-template').html()),

	bindings: {
	    '.autoplay-sound': 'autoplaySound',
	},

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .add-sound-file-to-component': 'addSoundToComponent',
            'click .add-sound-file-to-page': 'addSoundToPage',
            'click .editor-delete-page-sound-file': 'deleteSoundToPage',
            'click .editor-delete-component-sound-file': 'deleteSoundToComponent',
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

    changeSoundVolume: function(e) {
        var val = $(e.currentTarget).val();
        this.model.set('volume', val);
    },

    deleteSoundToComponent: function() {

        var fileName = this.model.get('sound');
        var actionkey = this.model.get('actionkey');

        if (fileName === '') {
            fileName = this.model.get('point-sound');
        }


        this.deleteFileSoundOnServer(actionkey, fileName);
    },

    deleteFileSoundOnServer: function(actionkey, fileName) {


        var _that = this;

        DataAccess.updateComponents(
            {
                components:[_that.model],
                action:"delete-file-sound", 
                fileName:fileName, 
                actionkey:actionkey,
                pageId:StageView.instance.model.getPageId()
            },
            function(data) {

                _log('Update component result: ', data, _log.dataaccessOutResult);  

                _that.model.set('sound', '', { silent:true });
                _that.model.set('point-sound', '', { silent:true });
                _that.render();

            },
            function(data) { 
                _log('Update component fault: ', data, _log.dataaccessOutFault);  
            }
        );
    },

    deleteSoundToPage: function() {
        this.model.setFileName( { fileName: '' } );
        this.render();

        this.model.view.deleteSound(this.model);
    },

    addSoundToPage: function() {
        this.model.view.uploadOnClick();
    },

    addSoundToComponent: function() {
        this.model.view.uploadOnClick();
    },

    setModel: function( model ) {

        var options = model.get('options');

        this.unstickit();

        if (options === undefined) {
            this.model = model;
        } else {
            this.model = options;
            this.pageModel = this.model;
        }

        this.onSetModel();
    },

    onSetModel: function() {


        //this.stickit();

        //this.render();
        if (this.model.get('sound') !== undefined) {
            this.listenTo(this.model, 'change:sound', this.render);
        } else
        if (this.model.get('point-sound') !== undefined) {
            this.listenTo(this.model, 'change:point-sound', this.render);
        } else
        if (this.model.get('soundfilename') !== undefined) {
            this.listenTo(this.model, 'change:soundfilename', this.render);
        }


    }

});

