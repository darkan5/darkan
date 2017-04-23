var FormSubmitEditorView = ExerciseEditorView.extend({
	template: _.template($('#formsubmit-editor-template').html()),

    initialize: function(data) {
        this.stageView = data.stageView;
    },

    bindings: {
        'input[name="feedback-show"]' : 'feedbackShow'
    },

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .formsubmit-editor-addobjects' : 'runDataPicker',
            'click .formsubmit-options-answers': 'showOptionsWindow',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad',
            'mouseenter .form-object' : 'highlightOnStage',
            'mouseleave .form-object' : 'unhighlightOnStage',
            'click .form-object' : 'deleteObject'
        });
    },

    highlightOnStage: function(e) {
        var actionkey = $(e.currentTarget).attr('formob');
        if (actionkey) {
            var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
            cModel.selectedByTrigger(true);
        }
        
    },

    unhighlightOnStage: function(e) {
        var actionkey = $(e.currentTarget).attr('formob');
        if (actionkey) {
            var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
            cModel.selectedByTrigger(false);
        }
        
    },

    startEditFeedbackGood: function() {
        var _that = this;
        try {
            this.feedbackGoodEditor = CKEDITOR.replace( this.$el.find('.feedback-good')[0], { height: '100px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo'});
            this.$el.find('.feedback-good-edit').attr('class', 'feedback-save feedback-good-save').text(_lang('SAVE'));
        } catch(msg) {
        }
    },

    startEditFeedbackBad: function() {
        var _that = this;
        try {
            this.feedbackBadEditor = CKEDITOR.replace( this.$el.find('.feedback-bad')[0], { height: '100px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo'});
            this.$el.find('.feedback-bad-edit').attr('class', 'feedback-save feedback-bad-save').text(_lang('SAVE'));
        } catch(msg) {
        }
    },
    
    changeFeedbackGood: function() {
        var feedback = this.feedbackGoodEditor.getData();
        this.model.set('feedbackGood', feedback);
        this.render();
        this.afterRender();
    },

    changeFeedbackBad: function(feedback) {
        var feedback = this.feedbackBadEditor.getData();
        this.model.set('feedbackBad', feedback);
        this.render();
        this.afterRender();
    },

    deleteObject: function(e) {
        var objActionkey = $(e.target).attr('formob');
        var formFields = this.model.get('formFields');

        var formFieldID = formFields.indexOf(objActionkey);

        if (formFieldID !== -1) {
            formFields.splice(formFieldID, 1);
        }

        this.model.set('formFields', formFields);
        this.model.trigger('change');

        this.unhighlightOnStage(e);

        this.render();
        this.afterRender();
    },

    showDataPicker : function(callback, target, actionKeyArray){
        var _that = this;

        if(this.dataPicker == undefined){
            this.dataPicker = new DataPickerView({ collection: actionKeyArray });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;
            });
            this.dataPicker.on('data-picker-picked', function(model){
                callback.call(_that, model, target, _that);
            });

            $('body').append( this.dataPicker.render().$el );
        }
    },

    runDataPicker : function(e){
        var _that = this;
        var button = $(e.target);
        var objs = this.model.get('formFields');

        var _array = [ ];
        _.each(objs, function(val) {
            _array.push(val);
        });

        this.showDataPicker(
            function(model) {
                _array.push(model.get('actionkey'));
                _that.updateElementsToCheck(model, button);
            }, 
            $(e.target), 
            _array
        );
    },

    updateElementsToCheck: function(model, target) {

        if(model.cid == this.model.cid){
            return;
        }

        var actionkey = model.get('actionkey');

        var formFields = this.model.get('formFields');

        if (formFields.indexOf(actionkey) === -1) {
            formFields.push(actionkey);

            this.model.set('formFields', formFields);
            this.model.trigger('change');

            this.render();
            this.afterRender();
        }
    },

    showOptionsWindow : function(e){
        var _that = this;

        var windowPosition = {
            left: e.pageX,
            top: e.pageY
        };

        if(this.optionsWindowView == undefined){
            this.optionsWindowView = new FormSubmitOptionsWindowView({ componentModel: this.model });
            this.optionsWindowView.on('on-close', function(){
                _that.optionsWindowView = undefined;
            });

            var dataToRender = this.model.toJSON();

            $('body').append( this.optionsWindowView.render(dataToRender).$el );
            this.optionsWindowView.setWindowPosition(windowPosition);
        }
    },

    onSetModel: function() {
        this.feedbackBadEditor = null;
        this.feedbackGoodEditor = null;
    },

    afterRender: function() {
        var _that = this;

        var objs = this.model.get('formFields');
        _.each(objs, function(actionkey) {

            if (actionkey) {
                var cModel = StageView.instance.getComponentModelByActionkey(actionkey);
                _that.$el.find('div[formob="'+actionkey+'"]').attr('componenttype', cModel.get('type'));
            }
        });
    }

});