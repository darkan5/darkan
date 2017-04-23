var FormCheckboxComponentView = LoadedComponentView.extend({

	className : 'component formcheckbox-component form',

	template: _.template($('#formcheckbox-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click input': 'changeDefaultValue',
            'dblclick .text-component-handle': 'startEditing',
            'dragstart .note-editor': 'preventDragging'
        });
    },

    afterInitialize: function() {
        this.listenTo(this.model, 'change:inputSize', this.changeInputSize);
        this.listenTo(this.model, 'change:defaultValue', this.selectOrDeselectInputOnScreen);
    },

    changeDefaultValue: function() {
        this.model.set('defaultValue', !this.model.get('defaultValue'));
    },

    afterRender: function() {
        this.selectOrDeselectInputOnScreen();
    },

    changeInputSize: function() {
        var _that = this;
        this.$el.find('input[type="checkbox"]').css({
            width: _that.model.get('inputSize') + "px",
            height: _that.model.get('inputSize') + "px"
        });
    },

    selectOrDeselectInputOnScreen: function() {
        this.$el.find('input[type="checkbox"]').
                                prop('checked', this.model.get('defaultValue'));
    },

    startEditing: function(changeTab) {
        var _that = this;

        changeTab = _.isUndefined(changeTab) ? true : changeTab;

        var canEditing = this.checkIfCanEditing();

        if(canEditing == false){
            return;
        }

        this.$el.find('.note-editor').remove();
        // $('.note-toolbar').remove();

        this.$el.find('.text-component-handle').hide();

        _layout.text_editor_image.hide();


        this.$el.find('.text-wrapper').summernote({

            onChange: function(contents, $editable) {
                _that.model.set('contents', contents);
            },

            componentEl: _that.$el,
            componentModel: _that.model,
            editorWrapper: $('#menu-text'),
            toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['para', ['ul', 'ol']],
                    ['para', ['paragraph']],
                    ['table', ['table']],
                    ['height', ['height']],
                    ['fontname', ['fontname']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']]
                ]
        });

        if(changeTab) {
            _layout.menu_top_tabs.tabs("option", "active", 2);
        }

        Utils.placeCaretAtEnd(this.$el.find('.note-editable')[0]);

        if (this.model.get('contents') == this.defaultContent) {
            Utils.selectWholeText(this.$el.find('.note-editable')[0]);
        }

    },

    
    select: function(){

    },



    unselect: function() {

        window.getSelection().removeAllRanges();
        this.$el.find('.note-editable').blur();
        this.$el.find('.note-editable').focusout();

        this.$el.find('.text-component-handle').show();

        if (this.$el.find('.note-editor').push() > 0) {
            this.$el.find('.note-editor').off();
            this.$el.find('.text-wrapper').destroySummernote();

        }
        

        this.$el.find('.text-component-inner *').removeAttr('contenteditable');
        this.$el.find('.text-component-inner *').blur();
       
        _layout.text_editor_image.show();
    },


});

var FormCheckboxComponentViewNotEditable = ComponentView.createNotEditableComponentClass(FormCheckboxComponentView);