var TextComponentView = LoadedComponentView.extend({

  	className : 'component text-component',

    template: _.template($('#text-component-template').html()),

    defaultContent: '<span style="font-size:18px">'+_lang('SIMPLETEXT_INSERTTEXT')+'</span>',
    defaultText: _lang('SIMPLETEXT_INSERTTEXT'),

    defaultStrings: [
        'Kliknij podwójnie, aby edytować.',
        'Double click to edit.'
    ],

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'dblclick .text-component-handle': 'startEditing',
            'set-text-editor': 'setTextEditor',
            'dragstart .note-editor': 'preventDragging'
        });
    },

    setTextEditor: function(editorEl) {
        // this.editorEl = editorEl;
        // alert('go')
    },

    addComponentListeners :function(){
        this.listenTo(this.model, "change:enable-scrollbar", this.renderScrollbar, this);
    },

    afterInitialize :function(){
    },

    afterRender: function() {

        if (this.isContentADefaultString()) {
            var contents = $(this.model.get('contents'));
            contents.text( this.defaultText );
            this.model.set('contents', contents[0].outerHTML);
            this.render();
        }

        this.renderScrollbar();
    },  

    isContentADefaultString: function() {
        var isStartingString = false;

        try {
            var contents = this.model.get('contents');
            var actualContent = $(contents);


            if ( actualContent.length === 1 ) {
                _.each(this.defaultStrings, function(val) {
                    if (actualContent.text() == val) {
                        isStartingString = true;
                    }
                });
            }
        } catch(err) { }
        
        return isStartingString;
    },

    renderPadding: function() {
        var padding = this.model.get('padding');
        this.$el.find('.component-inner, .note-editor').css({
            padding: padding + 'px'
        });
    },

    renderScrollbar: function() {
        var enableScrollbar = this.model.get('enable-scrollbar');
        this.$el.find('.component-inner').css({
            overflow: enableScrollbar ? 'auto' : 'hidden'
        });
    },

    renderBackgroundColor: function() {
        var color = this.$el.find('.component-inner').css('background');
        this.$el.find('.note-editor').css({
            background: color
        });
    },

    onRenderStyle: function() {

    },

    copyStylesToEditor: function() {
        var styles = this.model.get('styles');
        this.renderPadding();
        this.renderBackgroundColor();
        if (styles["component-inner"]) {
            this.$el.find('.note-editor').css(styles["component-inner"]);
        }
        
        if (styles["component-gradient"]) {
            this.$el.find('.note-editor').css(styles["component-gradient"]);
        }
    },

    startEditing: function(changeTab) {
        var _that = this;

        this.isEditing = true;

        changeTab = _.isUndefined(changeTab) ? true : changeTab;

        var canEditing = this.checkIfCanEditing();

        if(canEditing == false){
            return;
        }

        this.$el.find('.note-editor').remove();
        // $('.note-toolbar').remove();

        this.$el.find('.text-component-handle').hide();

        _layout.text_editor_image.hide();


        // this.textEditor = CKEDITOR.inline(
        //                 this.$el.find('.text-component-inner')[0],
        //                 {
        //                     extraPlugins: 'sharedspace'
        //                 }
        //                 );



        this.$el.find('.text-component-inner').summernote({

            onChange: function(contents, $editable) {

                _that.model.set('contents', contents, { silent:true });

                _that.onTextChanged(contents, $editable);

                clearTimeout(_that.contentsTimeout);

                _that.contentsTimeout = setTimeout(function(){
                    
                    _that.model.trigger('change', ['contents']);
                }, 1500); 
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
                    ['insert', ['link']],
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

        this.copyStylesToEditor();
        
    },

    onTextChanged: function(contents, $editable){
        // To override
    },

    select: function(){
        // To override
    },


    unselect: function() {

        // this.model.set('contents', this.textEditor.getData());

        if(!this.isEditing){
            return;
        }

        _log('unselect', this.model.toJSON(), _log.trigger) ;

        window.getSelection().removeAllRanges();
        this.$el.find('.note-editable').blur();
        this.$el.find('.note-editable').focusout();

        //$('#scene').focus();

        // this.textEditor.destroy();
        this.$el.find('.text-component-handle').show();

        if (this.$el.find('.note-editor').push() > 0) {
            this.$el.find('.note-editor').off();
            this.$el.find('.text-component-inner').destroySummernote();

            // this.draggableDestroy();
            // this.makeDraggable();
            // $('.note-toolbar.btn-toolbar').remove();
            // this.$el.find('.note-editor').hide();
            // $('.note-toolbar').hide();
            // this.render();

        }
        

        this.$el.find('.text-component-inner *').removeAttr('contenteditable');
        this.$el.find('.text-component-inner *').blur();
       
        _layout.text_editor_image.show();
        // _layout.menu_top_tabs.tabs("option", "active", 0);
    },


    specificUpdateComing: function() {
        this.endEditing();
    },

    endEditing: function(){

        if(this.isEditing){
            this.unselect();

            this.isEditing = false;
        }
    },

    setText: function(text){
        this.model.set('contents', '<span style="font-size:18px">'+text +'</span>');
        this.forceRender();
    }
});

var TextComponentViewNotEditable = ComponentView.createNotEditableComponentClass(TextComponentView);