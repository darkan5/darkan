var StageEditorView = EditorView.extend({

    template: _.template($('#stage-editor-template').html()),

//    <tr>
//    <td><label for="tage-editor-scroll-switcher"><?=_lang('SCROLLER_OPTS_TURN_OFF') ?>:</label></td>
//    <td><input class="page-prop-turn-off-scroll-input margin010" id="tage-editor-scroll-switcher" type="checkbox"></td>
//    </tr>

    bindings: {
        '[class="pagename"]': 'pagename',
        '.page-prop-lock-navi-input': 'locknavi',
        '.page-prop-turn-off-scroll-input': 'lockscroll',
        '.after-finish-page-goto-next': 'goToNextPage',
        '.after-finish-page-highlight-navigation-buttons': 'highlightButtons'
    },

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'keyup .pagename': 'onPagenameChanged',
            //'change .page-prop-lock-navi-input': 'changeLockNavi',
            //'change .page-prop-turn-off-scroll-input': 'changeTurnOffScroll',
            'click .add-image-background-to-page': 'getImage',
            'click .editor-delete-background-file': 'deleteBackground'
        });
    },

    onPagenameChanged: function(e){
        var value = $(e.target).val();
        this.model.set('pagename', value);
    },

    deleteBackground: function() {

        this.deleteFileImageOnServer();

    },

    afterRender: function() {

        var _that = this;

        var color = this.model.get('bgcolor') !== '' ? this.model.get('bgcolor') : '#FFF';

        this.colorPickerStageBackground = new ColorPickerView({ color: color });
        this.$el.find('.stage-background-color-picker').html(this.colorPickerStageBackground.render().$el);
        this.colorPickerStageBackground.on('move', function(data) {
            
            _that.model.set('bgcolor', data.color, { silent: true });
            StageView.instance.renderBackgroundColor(data.color);
            _that.model.trigger('update-dintamic-page-thumb');
        });
        this.colorPickerStageBackground.on('change', function(data) {
            
        });
        this.colorPickerStageBackground.on('hide', function(data) {
            _that.model.trigger('change');
            _that.model.trigger('update-dintamic-page-thumb');
        });

    },

    deleteFileImageOnServer: function() {

        var _that = this;

        DataAccess.updatePageOptions(
            {pageOptions: this.model, action: 'delete-page-background', pageId:StageView.instance.model.getPageId() },
            function(data) {


                _that.model.set('image', '');

                //StageView.instance.renderBackgroundColor();

                //_that.model.trigger('update-dintamic-page-thumb');

                // _that.renderBackgroundImage();
                // _that.render();

            },
            function(data) { _log('Update page options fault: ', data, _log.dataaccessOutFault)  }
        );
    },

//    changeLockNavi: function(e) {
//
//        var locknavi = $(e.target).is(':checked');
//
//        this.model.set('locknavi', locknavi);
//    },
//
//    changeTurnOffScroll: function(e) {
//
//        var lockscroll = $(e.target).is(':checked');
//
//        this.model.set('lockscroll', lockscroll);
//    },

    getImage: function() {

        //this.model.view.uploadOnClick();

        this.model.view.openImageWindow();
    },

    onSetModel: function() {
        var _that = this;
        this.render();

        // this.listenTo(this.model, 'change:image', function() {
        //     _that.renderBackgroundImage();
        //     // _that.model.trigger('update-dintamic-page-thumb');
        // });

        this.listenTo(this.model, 'change:image', this.render );
    },

    // renderBackgroundImage: function() {
    //     this.render();
    //     this.afterRender();
    //     StageView.instance.renderBackgroundImage();
    // },



});