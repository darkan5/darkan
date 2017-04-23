var ProjectOptionsWindowView = WindowView.extend({

    tagName: 'div',
    className: 'window window-projectoptions-view',

    template: _.template($('#window-projectoptions-template').html()),

    events: function () {
        return _.extend({}, WindowView.prototype.events, {
            'click .window-close-button': 'close'
            //'change #keep-rigid-dimensions-of-the-project': 'keepRigidDimensionsOfTheProjectChanged'
        });
    },


    bindings: {
        // '': 'name',
        '#move-grid': 'move_grid',
        '#copy-grid': 'copy_grid',
        '.image-quality': 'image_quality',
        // '': 'snapping',
        // '': 'showsnaplines',
        '#show-titles': 'show_titles',
        '#draggable-snaptolerance': 'draggable_snaptolerance',
        // '': 'scorm_score_required',
        // '': 'require_score',
        // '': 'require_pages',
        // '': 'require_elements',
        '#show-help-title': 'help_title',
        '#sound-loop-val': 'sound_loop',
        '#sound-vol-val': 'sound_vol',
        // '': 'pagelisttype',
        '#orginal-images': 'orginal_images',
        '#convert-sound-to-ogg': 'convert_sound_to_ogg',
        '#enabletocbtn': 'toc_enabled',
        '#settings-project-width': 'width',
        '#settings-project-height': 'height',
        '#keep-rigid-dimensions-of-the-project': 'keep_dimensions',
        '#load-every-page-at-start': 'load_every_page_at_start',
        '#load-every-sound-at-start': 'load_every_sound_at_start',
        '#load-every-page-in-the-background': 'load_every_page_in_the_background',
        '#enable-auto-scale-project': 'autoScale',
        'input[name="lessonLocationNavigation"]': 'lessonLocationNavigation',
        '#useLessonLocationDefaultPopupDescription': 'useLessonLocationDefaultPopupDescription',
        '#useLessonLocationDefaultPopupTitle': 'useLessonLocationDefaultPopupTitle',
        '#showLessonLocationCloseButtonPopup': 'showLessonLocationCloseButtonPopup',
        'textarea[name="lessonLocationPopupDescription"]': 'lessonLocationPopupDescription',
        'textarea[name="lessonLocationPopupTitle"]': 'lessonLocationPopupTitle',
    },

    initialize: function (data) {

        this.projectModel = ProjectModel.instance;

        var optionsModel = this.projectModel.get('options');
        this.model = optionsModel;
        this.windowModel = data.windowModel;

        this.runListeners();
    },

    runListeners :function(){
        this.model.off('option-changes-coming', this.onProjectOptionChangesComing, this);
        this.model.on('option-changes-coming', this.onProjectOptionChangesComing, this);
    },

//    keepRigidDimensionsOfTheProjectChanged: function (e) {
//        var value = $(e.target).prop('checked');
//
//        this.model.set('keep_dimensions', value);
//
//        this.render();
//    },

    onProjectOptionChangesComing: function (projectOptions) {
        this.unstickit();
        this.stickit();
    },

    beforeRender: function() {
        this.unstickit();
    },

    afterRender: function () {
        this.$el.find('.darkan-tabs').tabs();
        this.drawPagesWindow = new DrawPagesWindowView({el: this.$el.find('#projectoptions-drawpages')});
        this.stickit();
    }
});