var TriggerSubtriggerItemView = TriggerSectionView.extend({

    //http://matthewlein.com/ceaser/

    tagName: "li",
    className: 'trigger-subtrigger-item',

    template: _.template($('#trigger-subtrigger-item-template').html()),
    templateVariables: _.template($('#trigger-subtrigger-item-variables-template').html()),
    templateLink: _.template($('#trigger-subtrigger-item-link-template').html()),


    templateStandard: _.template($('#trigger-item-standard-template').html()),
    templateObjects: _.template($('#trigger-item-objects-template').html()),
    templateLayers: _.template($('#trigger-item-layers-template').html()),
    templatePages: _.template($('#trigger-item-pages-template').html()),
    templateChangeVariables: _.template($('#trigger-item-variables-template').html()),
    templatePlaySound: _.template($('#trigger-item-play-sound-template').html()),
    templateGoToLink: _.template($('#trigger-item-go-to-link-template').html()),
    templateCheckExercise: _.template($('#trigger-item-check-exercise-template').html()),
    templateCheckAllExercises: _.template($('#trigger-item-standard-template').html()),
    templateResetExercise: _.template($('#trigger-item-reset-exercise-template').html()),
    templateShowNextLayer: _.template($('#trigger-item-show-next-line-template').html()),
    templateTimer: _.template($('#trigger-item-timer-template').html()),
    templateVideo: _.template($('#trigger-item-video-template').html()),
    templateVideoPosition: _.template($('#trigger-item-video-position-template').html()),
    templateTransition: _.template($('#trigger-item-transition-template').html()),
    templateChangeStyle: _.template($('#trigger-item-change-style-template').html()),


    events:{
        'drop-item' : 'dropItem',
        'change .trigger-action-select' : 'onTriggerActionChanged',
        'keyup .trigger-link-input' : 'onTriggerLinkChanged',
        'paste .trigger-link-input' : 'onTriggerLinkChanged',
        'change .trigger-delay-input' : 'onTriggerDelayChanged',
        'keyup .trigger-delay-input' : 'onTriggerDelayChanged',
        'paste .trigger-delay-input' : 'onTriggerDelayChanged',
        'click .trigger-delete-trigger-button' : 'deleteTrigger',
        'click .trigger-add-animation-to-trigger' : 'addAnimationToTrigger',
        'click .trigger-data-picker-icon' : 'showDataPicker',
        'click .trigger-data-picker-text' : 'showDataPicker',
        'mouseover .ex-object' : 'selectObject',
        'mouseout .ex-object' : 'unselectObject',
        'click .ex-object' : 'deleteObject',
        'change .trigger-varpicker' : 'onVarpickerChanged',
        'change .trigger-varactionpicker' : 'onVaractionpickerChanged',
        'keyup .trigger-varchange-input' : 'onVarchangeChanged',
        //'change .trigger-disable-components-on-the-stage-checkbox' : 'onDisableComponentsOnTheStageChanged'

        'change .trigger-x-input' : 'onXPositionChanged',
        'change .trigger-y-input' : 'onYPositionChanged',
        'change .trigger-width-input' : 'onWidthChanged',
        'change .trigger-height-input' : 'onHeightChanged',
        'change .trigger-rotate-angle-input' : 'onRotateAngleChanged',
        'change .trigger-time-input' : 'onTimeChanged',
        'change .trigger-easeing-type-select' : 'onAnimationTypeChanged',
        'change .trigger-scale-input' : 'onScaleChanged',
        'change .trigger-opacity-input' : 'onOpacityChanged',

        'keyup .trigger-x-input' : 'onXPositionChanged',
        'keyup .trigger-y-input' : 'onYPositionChanged',
        'keyup .trigger-width-input' : 'onWidthChanged',
        'keyup .trigger-height-input' : 'onHeightChanged',
        'keyup .trigger-rotate-angle-input' : 'onRotateAngleChanged',
        'keyup .trigger-time-input' : 'onTimeChanged',
        'keyup .trigger-easeing-type-select' : 'onAnimationTypeChanged',
        'keyup .trigger-scale-input' : 'onScaleChanged',
        'keyup .trigger-opacity-input' : 'onOpacityChanged',

        'paste .trigger-x-input' : 'onXPositionChanged',
        'paste .trigger-y-input' : 'onYPositionChanged',
        'paste .trigger-width-input' : 'onWidthChanged',
        'paste .trigger-height-input' : 'onHeightChanged',
        'paste .trigger-rotate-angle-input' : 'onRotateAngleChanged',
        'paste .trigger-time-input' : 'onTimeChanged',
        'paste .trigger-easeing-type-select' : 'onAnimationTypeChanged',
        'paste .trigger-scale-input' : 'onScaleChanged',
        'paste .trigger-opacity-input' : 'onOpacityChanged',

        'mousewheel .trigger-x-input' : 'onXPositionChanged',
        'mousewheel .trigger-y-input' : 'onYPositionChanged',
        'mousewheel .trigger-width-input' : 'onWidthChanged',
        'mousewheel .trigger-height-input' : 'onHeightChanged',
        'mousewheel .trigger-rotate-angle-input' : 'onRotateAngleChanged',
        'mousewheel .trigger-time-input' : 'onTimeChanged',
        'mousewheel .trigger-easeing-type-select' : 'onAnimationTypeChanged',
        'mousewheel .trigger-scale-input' : 'onScaleChanged',
        'mousewheel .trigger-opacity-input' : 'onOpacityChanged',





        'click .triggeraxis' : 'onAxisChanged',

        'mouseover .trigger-animation-button-play' : 'animationPreviewPlay',
        'mouseout .trigger-animation-button-play' : 'animationPreviewStop',

        'change .trigger-aspect-ratio' : 'onTriggerAspectRatioChange',

        'click .trigger-data-picker-icon-select-one-object' : 'setObjectParameters',
        'mouseover .trigger-data-picker-icon-select-one-object' : 'onPickerMouseover',
        'mouseout .trigger-data-picker-icon-select-one-object' : 'onPickerMouseout',

        'click .trigger-data-picker-icon-select-xy-position' : 'setPoint',

        'click .trigger-graph-baizer-previev' : 'showGraphBaizerPreviev',

        'change .trigger-video-position-input' : 'onVideoPositionChanged',
        'keyup .trigger-video-position-input' : 'onVideoPositionChanged',
        'paste .trigger-video-position-input' : 'onVideoPositionChanged',
        'mousewheel .trigger-video-position-input' : 'onVideoPositionChanged',

        'change .trigger-video-position-playing-input' : 'onVideoPositionPlayingChanged',


        'change .trigger-border-weight-input' : 'onBorderWeightChanged',
        'keyup .trigger-border-weight-input' : 'onBorderWeightChanged',
        'paste .trigger-border-weight-input' : 'onBorderWeightChanged',
        'mousewheel .trigger-border-weight-input' : 'onBorderWeightChanged',

        'change .trigger-border-type-select' : 'onBorderTypeChanged',

        'change .trigger-go-to-link-target-select' : 'onGoToLinkTargetChanged',


    },

    proportions : null,
    sectionName: 'subtrigger',

    onGoToLinkTargetChanged: function(e){
        var value = $(e.target).val();

         var opts = this.model.get('opts');

         _log('opts', opts);

        var link = opts.get('link') || {};

        if(_.isString(link)){

            var newLink = {};
            newLink.link = link;

            link = newLink;
        }

        link._target = value;

        _log('link', link);

        opts.set('link', link);
        this.model.set('opts', opts);

        this.saveChanges();
    },

    onBorderTypeChanged: function(e){
        var value = $(e.target).val();

         var opts = this.model.get('opts');

         _log('opts', opts);

        var style = opts.get('style') || {};

        style.borderType = value;

        opts.set('style', style);
        this.model.set('opts', opts);

        this.saveChanges();
    },

    onBorderWeightChanged: function(e){

        var value = parseFloat($(e.target).val());

        var opts = this.model.get('opts');

         _log('opts', opts);

        var style = opts.get('style') || {};

        style.borderWeight = value;

        opts.set('style', style);
        this.model.set('opts', opts);

        this.saveChanges();
    },

    onVideoPositionPlayingChanged: function(e){

        var value = $(e.target).prop('checked');
        var opts = this.model.get('opts');

        var video = opts.get('video') == undefined ? {} : opts.get('video');
        video.play = value;

        opts.set('video', video);
        this.model.set('opts', opts);
        this.saveChanges();
    },

    onVideoPositionChanged: function(e){

        var value = parseInt($(e.target).val());
        var opts = this.model.get('opts');

        var video = opts.get('video') == undefined ? {} : opts.get('video');
        video.position = value;

        opts.set('video', video);
        this.model.set('opts', opts);
        this.saveChanges();
    },

    getSelectedEase: function(){
        var triggerEaseingInput = this.$el.find('.trigger-easeing-type-select');

        return triggerEaseingInput.val();
    },

    showGraphBaizerPreviev: function(e){

        var _that = this;

        if(this.baizerWindowView == undefined){

            this.baizerWindowView = WindowFactory.createGraphBaizerPrevievWindow({ triggerItem:this });
            this.baizerWindowView.on('on-close', function() {
                _that.baizerWindowView = undefined;
            });

            this.baizerWindowView.on('on-animation-selected', function( ) {

            });

            $('body').append( this.baizerWindowView.render({title: "Baizer" }).$el);

            var windowPosition = {
                top: e.pageY,
                left: e.pageX
            };
            this.baizerWindowView.setWindowPosition( windowPosition );
        }
    },

    setPoint: function(e){

        var _that = this;

        if(this.dataPicker == undefined){
            this.dataPicker = new DataPickerView({ picker:'point' });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;

                _that.$el.trigger('show-trigger', {}, this);
            });
            this.dataPicker.on('data-picker-picked', function( data ){

                var position = data.position;

                var x = position.x;
                var y = position.y;

                var opts = _that.model.get('opts');
                var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

                transition.x = x;
                transition.y = y;

                opts.set('transition', transition);
                _that.model.set('opts', opts);
                _that.saveChanges();

                _that.renderTransitionTemplate();

            });

            $('body').append( this.dataPicker.render().$el );
        }
    },

    onPickerMouseover: function(e){

        var _that = this;

        var selectedParams = $(e.currentTarget).attr('selectedparams');

        var triggerXInput = this.$el.find('.trigger-x-input');
        var triggerYInput = this.$el.find('.trigger-y-input');
        var triggerWidthInput = this.$el.find('.trigger-width-input');
        var triggerHeightInput = this.$el.find('.trigger-height-input');

        switch(selectedParams){
            case 'positions':
                triggerXInput.addClass('trigger-highligh-input');
                triggerYInput.addClass('trigger-highligh-input');
                break;

            case 'dimensions':
                triggerWidthInput.addClass('trigger-highligh-input');
                triggerHeightInput.addClass('trigger-highligh-input');
                break;

            case 'all':
                triggerXInput.addClass('trigger-highligh-input');
                triggerYInput.addClass('trigger-highligh-input');
                triggerWidthInput.addClass('trigger-highligh-input');
                triggerHeightInput.addClass('trigger-highligh-input');
                break;
        }
    },

    onPickerMouseout: function(e){

        var _that = this;

        var triggerXInput = this.$el.find('.trigger-x-input');
        var triggerYInput = this.$el.find('.trigger-y-input');
        var triggerWidthInput = this.$el.find('.trigger-width-input');
        var triggerHeightInput = this.$el.find('.trigger-height-input');

        triggerXInput.removeClass('trigger-highligh-input');
        triggerYInput.removeClass('trigger-highligh-input');
        triggerWidthInput.removeClass('trigger-highligh-input');
        triggerHeightInput.removeClass('trigger-highligh-input');
    },

    setObjectParameters: function(e){

        var _that = this;

        var selectedParams = $(e.currentTarget).attr('selectedparams');

        if(selectedParams == 'none'){
            return;
        }

        if(this.dataPicker == undefined){
            this.dataPicker = new DataPickerView({ stageView: this.stageView, picker:'object' });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;

                _that.$el.trigger('show-trigger', {}, this);
            });
            this.dataPicker.on('data-picker-picked', function( model ){

                var x = model.get('x');
                var y = model.get('y');
                var width = model.get('width');
                var height = model.get('height');
                var radians = model.get('rotate');

                var opts = _that.model.get('opts');
                var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

                switch(selectedParams){
                    case 'positions':
                        transition.x = x;
                        transition.y = y;
                        break;

                    case 'dimensions':
                        transition.width = width;
                        transition.height = height;

                        _that.calculateProportion(width, height);

                        break;

                    case 'all':
                        transition.x = x;
                        transition.y = y;
                        transition.width = width;
                        transition.height = height;

                        _that.calculateProportion(width, height);
                        break;
                }

//                opts.set('transition', transition);
//                _that.model.set('opts', opts);
//                _that.saveChanges();

                _that.renderTransitionTemplate();
            });

            $('body').append( this.dataPicker.render().$el );
        }
    },

    animationPreviewPlay: function(){

        var opts = this.model.get('opts');
        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        var model = this.componentModel;


        var x = transition.x == undefined ? model.get('x') : parseInt(transition.x);
        var y = transition.y == undefined ? model.get('y') : parseInt(transition.y);
        var width = transition.width == undefined ? model.get('width') : parseInt(transition.width);
        var height = transition.height == undefined ? model.get('height') : parseInt(transition.height);
        var rotate = (!$.isNumeric( transition.rotate )) ? 0 : parseInt(transition.rotate);
        var time = transition.time == undefined ? 1.3 : parseFloat(transition.time);
        var ease = transition.ease == undefined ? '0.250, 0.250, 0.750, 0.750' : transition.ease;
        var axis = transition.axis == undefined ? 'center-center' : transition.axis;
        var scale = (!$.isNumeric( transition.scale )) ? 1 : transition.scale;
        var opacity = (!$.isNumeric( transition.scale )) ? 1 : transition.opacity;

        ease = 'cubic-bezier('+ ease +')';

        // var animation = 'all time ease';
        var animation = 'opacity time ease, top time ease, left time ease, width time ease, height time ease, transform time ease';

        animation = animation.replace(/time/g, (time +'s'));
        animation = animation.replace(/ease/g, ease);

        var objs = this.model.get('objs');

        for (var i = 0; i < objs.length; i++) {
            var actionkey = objs[i];

            var componentModel = DataPickerView.findModel(actionkey, 'object');

            var view = componentModel.view;

            var copiedStyle = view.$el.attr('style');

            view.$el.attr('copiedstyle', copiedStyle);

            view.$el.css('-webkit-transition', animation);
            view.$el.css('-moz-transition', animation);
            view.$el.css('-o-transition', animation);
            view.$el.css('transition', animation);

//            view.$el.css("animation-duration", 2 + "s");
//            view.$el.css("-webkit-animation-duration", 2 + "s");

            view.$el.css('left', x + 'px');
            view.$el.css('top', y + 'px');
            view.$el.css('width', width + 'px');
            view.$el.css('height', height + 'px');

            view.$el.css('opacity', opacity);


            view.$el.css('-webkit-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale + ')');
            view.$el.css('-moz-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale + ')');
            view.$el.css('-o-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale + ')');
            view.$el.css('-ms-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale + ')');
            view.$el.css('transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale + ')');

//            view.$el.css('-webkit-transform', 'scale('+ scale + ')');
//            view.$el.css('transform', 'scale('+ scale + ')');

            view.$el.css('transform-style:', 'preserve-3D');

            var axisX = axis.split('-')[0];
            var axisY = axis.split('-')[1];

            view.$el.css('-webkit-transform-origin', axisY + ' ' + axisX);
            view.$el.css('-ms-transform-origin', axisY + ' ' + axisX);
       };


    },

    onScaleChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');
        transition.scale = value;


        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();
    },

    onOpacityChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');
        transition.opacity = value;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();
    },




    animationPreviewStop: function(){

        var objs = this.model.get('objs');

        for (var i = 0; i < objs.length; i++) {
            var actionkey = objs[i];

            var componentModel = DataPickerView.findModel(actionkey, 'object');

            var view = componentModel.view;

            var copiedStyle = view.$el.attr('copiedstyle');

            view.$el.attr('style', copiedStyle);
        }
    },

    onTriggerAspectRatioChange: function(e){

        var value = $(e.target).prop('checked');
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');
        transition.aspectRatio = value;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();
    },

    onAxisChanged: function(e){

        var axis = $(e.target).val();

        var value = parseInt($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');
        transition.axis = axis;

        var width = transition.width == undefined ? this.componentModel.get('width') : transition.width;
        var height = transition.height == undefined ? this.componentModel.get('height') : transition.height;

        this.calculateProportion(width, height);

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();
    },

    onXPositionChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');
        transition.x = value;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();
    },

    onYPositionChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        transition.y = value;
        opts.transition = transition;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();

    },

    onWidthChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        var aspectRatio = transition.aspectRatio == undefined ? true : transition.aspectRatio;

        var triggerWidthInput = this.$el.find('.trigger-width-input');
        var triggerHeightInput = this.$el.find('.trigger-height-input');

        var width = transition.width == undefined ? this.componentModel.get('width') : transition.width;
        var height = transition.height == undefined ? this.componentModel.get('height') : transition.height;

        if (aspectRatio) {

            var proportions = this.proportions;

            if (value > 0) {
                transition.height =  parseInt((parseFloat($(e.target).val())*proportions)/100);

                triggerHeightInput.val(transition.height);
            }
        } else {
           this.calculateProportion(width, height);
        }

        transition.width = value;
        opts.transition = transition;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();

    },

    calculateProportion: function(width, height) {

        return this.proportions = (parseInt(height)*100) / parseInt(width);

    },

    onHeightChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        var aspectRatio = transition.aspectRatio == undefined ? true : transition.aspectRatio;

        var triggerWidthInput = this.$el.find('.trigger-width-input');
        var triggerHeightInput = this.$el.find('.trigger-height-input');

        var width = transition.width == undefined ? this.componentModel.get('width') : transition.width;
        var height = transition.height == undefined ? this.componentModel.get('height') : transition.height;

        if (aspectRatio) {

            var proportions = this.proportions;

            if (value > 0) {
                transition.width =  parseInt((value*100)/proportions);

                triggerWidthInput.val(transition.width);
            }
        } else {
            this.calculateProportion(width, height);
        }


        transition.height = value;
        opts.transition = transition;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();

    },

    onRotateAngleChanged: function(e){

        var value = parseInt($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        transition.rotate = value;
        opts.transition = transition;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();

    },

    onTimeChanged: function(e){

        var value = parseFloat($(e.target).val());
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        transition.time = value;
        opts.transition = transition;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();

    },

    onAnimationTypeChanged: function(e){

        var value = $(e.target).val();
        var opts = this.model.get('opts');

        var transition = opts.get('transition') == undefined ? {} : opts.get('transition');

        transition.ease = value;
        opts.transition = transition;

        opts.set('transition', transition);
        this.model.set('opts', opts);
        this.saveChanges();

        if(this.baizerWindowView){
            this.baizerWindowView.setBaizer(this);
        }

    },

    initialize: function(data ) {
        this.componentModel = data.componentModel;
        this.initializeTriggerOption();

        this.model.on('mark-for-a-while', this.markForAWhile, this)
    },

    markForAWhile: function(){

        var _that = this;

        this.$el.attr('mark', true);

        setTimeout(function(){
            _that.$el.attr('mark', false);
        }, 1000);
    },

    onTriggerDelayChanged: function(e){
        var value = parseFloat($(e.target).val());
        this.model.get('opts').set('delay', value);

        this.saveChanges();
    },

    onVarpickerChanged: function(e){

        //var variable = this.$el.find('.trigger-varpicker').val();

        var variable = $(e.target).val();

        var action = this.$el.find('.trigger-varactionpicker').val();
        var varValue = this.$el.find('.trigger-varchange-input').val();

        var options = {};
        options.varName = variable;
        options.varAction = action;
        options.varValue = varValue;

        this.model.set('objs', options);
        //this.model.trigger('change');
    },

    onVaractionpickerChanged: function(e){

        var value = $(e.target).val();

        var options = this.model.get('objs');
        options.varAction = value;
        this.model.trigger('change');

    },

    onVarchangeChanged: function(e){
        var value = $(e.target).val();

        var whenDoIt = $('.trigger-on-select').val();
        var calculatePoints = false;

        if(whenDoIt == 'custom_questionpassed'){
            var disabled = $('.scoring-reqire-exercise-points-aaccess').attr('disabled');

            if(disabled != 'disabled'){
                 this.componentModel.set('scoreSuccess', value, { silent:true });

                $('.scoring-reqire-exercise-points-aaccess').val(value);

                calculatePoints = true;
            }
        }

        if(whenDoIt == 'custom_questionfailed'){
            var disabled = $('.scoring-reqire-exercise-points-fail').attr('disabled');

            if(disabled != 'disabled'){
                this.componentModel.set('scoreFail', value, { silent:true });

                $('.scoring-reqire-exercise-points-fail').val(value);
            }
        }

        if(whenDoIt == 'custom_questionbadanswer'){
            var disabled = $('.scoring-reqire-exercise-points-bad-answer').attr('disabled');

            if(disabled != 'disabled'){
                this.componentModel.set('scoreBadAnswer', value, { silent:true });

                $('.scoring-reqire-exercise-points-bad-answer').val(value);
            }
        }

        var options = this.model.get('objs');
        options.varValue = value;
        this.model.trigger('change');

        if(calculatePoints){
            ProjectModel.instance.calculateAllScoreSuccessPoints();
        }

    },

    onDisableComponentsOnTheStageChanged: function(e){

        var value = $(e.target).prop('checked');

        var options = {};
        options.disableComponents = value;
        this.model.set('objs', options, {silent:true});
        this.model.trigger('change');
    },



    deleteObject: function(e){
        var sender = $(e.target);
        var actionkey = sender.attr('actionkey');
        var actionType = sender.attr('action');

        var componentsCollection = this.model.get('objs');

        var index = componentsCollection.indexOf(actionkey);

        if(index != -1){

            componentsCollection.splice(index, 1);

            var componentModel = DataPickerView.findModel(actionkey, actionType);
            componentModel.selectedByPickerMiniature(false);

            this.renderItem();
            this.saveChanges();
        }

    },

    selectObject: function(e){
        var sender = $(e.target);
        var actionkey = sender.attr('actionkey');
        var actionType = sender.attr('action');

        sender.addClass('delete-on-hover');

        var componentModel = DataPickerView.findModel(actionkey, actionType);
        componentModel.selectedByPickerMiniature(true);
    },

    unselectObject: function(e){
        var sender = $(e.target);
        var actionkey = sender.attr('actionkey');
        var actionType = sender.attr('action');

        sender.removeClass('delete-on-hover');

        var componentModel = DataPickerView.findModel(actionkey, actionType);
        componentModel.selectedByPickerMiniature(false);
    },

    dropItem: function(event, index) {


        this.$el.trigger('update-sort', [this.model, index]);
    },

    showDataPicker : function(e){

        var _that = this;

        var sender = $(e.target);
        var picker = sender.attr('picker');

        this.$el.trigger('hide-trigger', {}, this);

        var componentsCollection = _that.model.get('objs');

        if(this.dataPicker == undefined){
            this.dataPicker = new DataPickerView({ stageView: this.stageView, collection:componentsCollection, picker:picker });
            this.dataPicker.on('data-picker-close', function(){
                _that.dataPicker = undefined;

                _that.$el.trigger('show-trigger', {}, this);
            });

            this.dataPicker.on('data-picker-picked', function( model ){

                var type = model.get('type');
                var key;

                var whatToDo = _that.model.get('whattodo');

                if(whatToDo == 'checkExercise'){
                    if(model.cid == _that.componentModel.cid){

                        model.selectedByTrigger(false);
                        return;
                    }
                }

                if(whatToDo == 'startTimer' || whatToDo == 'stopTimer' || whatToDo == 'resetTimer'){
                    if(model.cid == _that.componentModel.cid){

                        model.selectedByTrigger(false);
                        return;
                    }
                }

                switch (type){
                    case 'line':
                        key = model.get('options').get('id');
                        break;

                    case 'page':
                        key = '' + model.get('options').get('pageid');
                        break;

                    default :
                        key = model.get('actionkey');
                        break;
                }

                if(type == 'page') {

                    _that.dataPicker.unselectObjects();
                    componentsCollection = [];
                    componentsCollection.push( key );
                    _that.model.set('objs', componentsCollection);
                    _that.dataPicker.selectObjects( componentsCollection );

                    _that.renderItem( );
                    _that.saveChanges();

                }else{

                    var exist = componentsCollection.indexOf( '' + key );

                    if(exist == -1){  // Nie ma
                        componentsCollection.push( '' + key );

                    }else{


                        _that.dataPicker.unselectObjects();
                        var index = componentsCollection.indexOf(key);
                        componentsCollection.splice(index, 1);
                        _that.model.set('objs', componentsCollection);
                        _that.dataPicker.selectObjects( componentsCollection );

                    }

                    _that.renderItem( );
                    _that.saveChanges();
                }




            });

            $('body').append( this.dataPicker.render().$el );
        }
    },

    saveChanges: function(){

        this.$el.trigger('save-changes', this.model, this);
    },

    clearComponentContainer : function( ){

        var triggerComponentsContainer = this.$el.find('.trigger-components-container');
        triggerComponentsContainer.html( '' );
    },


    addAnimationToTrigger: function(e) {
        var _that = this;

        var sender = $(e.target);

        if(this.animationView == undefined){

            var actionValue = this.$el.find('.trigger-action-select').val();

            var windowType = ""; // animIn, animOut

            if(actionValue == 'showObject' || actionValue == 'showLine'){
                windowType = "animIn";
            }

            if(actionValue == 'hideObject'  || actionValue == 'hideLine'){
                windowType = "animOut";
            }

            if(windowType ==""){
                return;
            }


            var triggerOptsModel = this.model.get('opts');
            var triggerOptsObject = triggerOptsModel.get('animationType').toJSON();

            this.animationView = WindowFactory.createAnimateWindow(triggerOptsObject);
            this.animationView.on('on-close', function(){
                _that.animationView = undefined;
            });

            this.animationView.on('on-animation-selected', function( animationType ){
                triggerOptsModel.set('animationType', new TriggerAnimationTypeModel(animationType) );

                sender.val(_lang('ANIMATION_'+ animationType.animationName ));

                _that.saveChanges();
            });


            $('body').append( this.animationView.render({title: _lang('ANIMATIONWINDOW_TITLE_'+windowType), animations: window._layout.animations[windowType], animationMainType: windowType}).$el );

            var windowPosition = {
                top: e.pageY,
                left: e.pageX
            }

            this.animationView.setWindowPosition( windowPosition );
        }
    },

    deleteTrigger: function(){

        if(this.baizerWindowView){
            this.baizerWindowView.close();
        }

        this.model.unset('opts');

        this.$el.trigger('delete-one-trigger', this.model, this);


    },

    update :function(){

    },

    initializeTriggerOption :function(){

        this.triggerWhatToDo = new TriggerActionsCollection();

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_TRANSITION'), options: [
            { name: _lang('TRIGGER_WTD_MAKE_TRANSITION'), value: 'makeTransition', picker:'object' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_OBJS'), options: [
            { name: _lang('TRIGGER_WTD_SHOWOBJ'), value: 'showObject', picker:'object' },
            { name: _lang('TRIGGER_WTD_HIDEOBJ'), value: 'hideObject', picker:'object' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_LINES'), options: [
            { name: _lang('TRIGGER_WTD_SHOWLINE'), value: 'showLine', picker:'line' },
            { name: _lang('TRIGGER_WTD_HIDELINE'), value: 'hideLine', picker:'line' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_WTD_PAGES'), options: [
            { name: _lang('TRIGGER_WTD_GOTOPAGE'), value: 'gotopage', picker:'page' },
            { name: _lang('TRIGGER_WTD_NEXTPAGE'), value: 'gotonextpage', picker:'none' },
            { name: _lang('TRIGGER_WTD_PREVPAGE'), value: 'gotoprevpage', picker:'none' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_WTD_VARS'), options: [
            { name: _lang('TRIGGER_WTD_CHANGEVARVALUE'), value: 'changevarvalue', picker:'none' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_WTD_STYLE'), options: [
            { name: _lang('TRIGGER_WTD_CHANGE_STYLE'), value: 'changeStyle', picker:'object' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_SOUND'), options: [
            { name: _lang('TRIGGER_WTD_ETC_PLAYAUDIO'), value: 'playobjectsound', picker:'object' },
            { name: _lang('TRIGGER_WTD_ETC_PAUSEAUDIO'), value: 'pauseobjectsound', picker:'object' },
            { name: _lang('TRIGGER_WTD_ETC_STOPAUDIO'), value: 'stopobjectsound', picker:'object' },
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_WTD_ETC'), options: [
            { name: _lang('TRIGGER_WTD_ETC_UNLOCKNAVI'), value: 'unlockpagenavigation', picker:'none' },
            { name: _lang('TRIGGER_WTD_ETC_RESETQUESTIONS'), value: 'resetExerciseApproach', picker:'none' },
            { name: _lang('TRIGGER_WTD_ETC_GO_TO_LINK'), value: 'goToLink', picker:'none' },
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group:  _lang('TRIGGER_EXERCISE'), options: [
            { name: _lang('TRIGGER_EXERCISE_CHECK_EXERCISE'), value: 'checkExercise', picker:'object' },
            { name: _lang('TRIGGER_EXERCISE_CHECK_All_EXERCISES'), value: 'checkAllExercises', picker:'none' },
            { name: _lang('TRIGGER_EXERCISE_RESET_All_EXERCISES'), value: 'resetAllExercises', picker:'none' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_TIMER'), options: [
            { name:_lang('TIMER_START_TIMER'), value:'startTimer' },
            { name:_lang('TIMER_STOP_TIMER'), value:'stopTimer' },
            { name:_lang('TIMER_RESET_TIMER'), value:'resetTimer' },
            { name:_lang('TIMER_RESET_ALL_TIMERS'), value:'resetAllTimers' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_VIDEO'), options: [
            { name:_lang('VIDEO_PLAY'), value:'playVideo' },
            { name:_lang('VIDEO_PAUSE'), value:'pauseVideo' },
            { name:_lang('VIDEO_STOP'), value:'stopVideo' },
            { name:_lang('VIDEO_GO_TO_POSITION'), value:'goToPositionVideo' }
        ] });
        this.triggerWhatToDo.add( triggerActionModel );

    },

    onTriggerLinkChanged :function(e){

        var value = $(e.target).val();

        var opts = this.model.get('opts');
        var link = opts.get('link') || {};

        if(_.isString(link)){
            link = {};
        }

        link.link = value;

        this.model.get('opts').set('link', link, {silent:true});

        this.saveChanges();
    },

    onTriggerActionChanged: function(e){

        var value = $(e.target).val();

        this.model.get('opts').set('notadded', true);

        this.model.get('opts').set('animationType', new TriggerAnimationTypeModel());

        var animationName = this.model.get('opts').get('animationType').get('animationName');
        this.$el.find('.trigger-add-animation-to-trigger').val(_lang('ANIMATION_'+ animationName ));

        this.model.set('whattodo', value, { silent:true });

        if(((this.lastActionValue == 'showObject' && value == 'hideObject') ||
            (this.lastActionValue == 'hideObject' && value == 'showObject')) ||

            ((this.lastActionValue == 'showLine' && value == 'hideLine') ||
                (this.lastActionValue == 'hideLine' && value == 'showLine'))){


        }else{

            this.model.set('objs', [], { silent:true });

            this.renderItem();

            this.showConditionSection();


        }

        this.lastActionValue = value;

        this.saveChanges();

    },



    getSubtriggerObjectsTemplateOptions: function(addFirstComponent){

        var options = {};
        options.whattodo = this.getTriggerWhatToDo();
        options.objects = [];

        var actionkeys = this.model.get('objs');


        this.addAndSaveFirstComponent(options, addFirstComponent);


        options.model = this.model.toJSON();

        var index = this.model.collection.indexOf(this.model);

        options.index = index
        options.prefix = this.sectionName + index;

        return options;
    },

    addAndSaveFirstComponent: function(options, addFirstComponent){

        var actionkeys = this.model.get('objs');

         addFirstComponent = addFirstComponent == undefined ? false : addFirstComponent;

        if(addFirstComponent){

            var opts = this.model.get('opts');
            var notadded = opts.get('notadded') == undefined ? true : opts.get('notadded');

            if(notadded && actionkeys.length == 0){

                var actionkey = this.componentModel.get('actionkey');
                actionkeys.push(actionkey);

                opts.set('notadded', false);
                this.model.set('opts', opts);
                this.saveChanges();
            }

        }

        for (var i = 0; i < actionkeys.length; i++) {
            var actionkey = actionkeys[i];
            var componentModel = StageView.instance.getComponentModelByActionkey(actionkey);

            if(componentModel){
                options.objects.push(componentModel.toJSON());
            }else{
                var index = actionkeys.indexOf(actionkey);
                actionkeys.splice(index, 1);
            }
        };
    },

    getSubtriggerLayersTemplateOptions : function(){

        var options = {};
        options.whattodo = this.getTriggerWhatToDo();

        var lineIds = this.model.get('objs');

        options.objects = [];

        for (var i = 0; i < lineIds.length; i++) {
            var lineId = lineIds[i];
            var rowModel = StageView.instance.getRowModelByLineId(lineId);
            if (rowModel) {
                var rowId = rowModel.get('options').get('id');
                options.objects.push( { lineId: rowId});   
            }
        };

        options.model = this.model.toJSON();

        return options;
    },

    getSubtriggerPagesTemplateOptions : function(){

        var options = {};
        options.whattodo = this.getTriggerWhatToDo();

        var pageIds = this.model.get('objs');

        options.objects = [];

        for (var i = 0; i < pageIds.length; i++) {
            var pageId = parseInt(pageIds[i]);
            var pageModel = ProjectModel.instance.getPageModelByPageId(pageId);

            if(pageModel){
                options.objects.push( { pageId:pageModel.get('options').get('pageid') });
            }else{
                this.model.set('objs', [], { silent:true });
            }

            
        };

        options.model = this.model.toJSON();

        return options;
    },

    getSubtriggerVariablesTemplateOptions : function(){

        var options = {};
        options.whattodo = this.getTriggerWhatToDo();

        var lineIds = this.model.get('objs');

        options.projectVariables = ProjectModel.instance.get('options').get('projectVariables');
        options.staticVariables = ProjectModel.instance.get('options').get('staticVariables');

        options.model = this.model.toJSON();

        return options;
    },



    getSubtriggerTemplateOptions: function(){

        var options = {};
        options.whattodo = this.getTriggerWhatToDo();
        options.components = [];
        options.model = this.model.toJSON();

        return options;
    },

    render: function(){

        this.renderItem();

        this.showConditionSection();

        this.delegateEvents();

        return this;
    },

    showConditionSection :function(){
        this.$el.trigger('show-condition-section', {}, this);
    },

    renderVariablesContainer: function(){

        var objs = this.model.get('objs');

        var variable = this.$el.find('.trigger-varpicker');
        var action = this.$el.find('.trigger-varactionpicker');
        var varValue = this.$el.find('.trigger-varchange-input');

        variable.val( objs.varName );
        action.val(objs.varAction);
        varValue.val(objs.varValue);
    },

    renderGoToLinkContainer: function(){

        var opts = this.model.get('opts');

        var link = opts.get('link');

        if(_.isString(link)){
            return;
        }

        if(!link._target ){
            return;
        }

        var linkTargetSelect = this.$el.find('.trigger-go-to-link-target-select');
        linkTargetSelect.val( link._target );
    },
    

    renderTransitionContainer: function(){



        var opts = this.model.get('opts');

        var transition =  opts.get('transition') == undefined ? {} : opts.get('transition');

        var triggerXInput = this.$el.find('.trigger-x-input');
        var triggerYInput = this.$el.find('.trigger-y-input');
        var triggerWidthInput = this.$el.find('.trigger-width-input');
        var triggerHeightInput = this.$el.find('.trigger-height-input');
        var triggerRotateAngleInput = this.$el.find('.trigger-rotate-angle-input');
        var triggerTimeInput = this.$el.find('.trigger-time-input');
        var triggerEaseingInput = this.$el.find('.trigger-easeing-type-select');
        var triggerAspectRatioCheckbox = this.$el.find('.trigger-aspect-ratio');
        var triggerScaleInput = this.$el.find('.trigger-scale-input');
        var triggerOpacityInput = this.$el.find('.trigger-opacity-input');

        var radians = this.componentModel.get('rotate');
        var degrees = parseInt((radians > 0 ? radians : (2*Math.PI + radians)) * 360 / (2*Math.PI))

        var x = transition.x == undefined ? this.componentModel.get('x') : transition.x;
        var y = transition.y == undefined ? this.componentModel.get('y') : transition.y;
        var width = transition.width == undefined ? this.componentModel.get('width') : transition.width;
        var height = transition.height == undefined ? this.componentModel.get('height') : transition.height;
        var rotate = transition.rotate == undefined ? degrees : transition.rotate;
        var time = transition.time == undefined ? 1.3 : transition.time;
        var ease = transition.ease == undefined ? '0.250, 0.250, 0.750, 0.750' : transition.ease;
        var axis = transition.axis == undefined ? 'center-center' : transition.axis;
        var aspectRatio = transition.aspectRatio == undefined ? true : transition.aspectRatio;
        var scale = transition.scale == undefined ? 1 : transition.scale;
        var opacity = transition.opacity == undefined ? 1 : transition.opacity;


        var triggerAxis = this.$el.find('.triggeraxis[value="'+ axis +'"]');

        triggerXInput.val(x);
        triggerYInput.val(y);
        triggerWidthInput.val(width);
        triggerHeightInput.val(height);
        triggerRotateAngleInput.val(rotate);
        triggerTimeInput.val(time);
        triggerEaseingInput.val(ease);
        triggerAxis.prop('checked', true);
        triggerAspectRatioCheckbox.prop('checked', aspectRatio);
        triggerScaleInput.val(scale);
        triggerOpacityInput.val(opacity);

        transition.x = x;
        transition.y = y;
        transition.width = width;
        transition.height = height;
        transition.rotate = rotate;
        transition.time = time;
        transition.ease = ease;
        transition.axis = axis;
        transition.scale = scale;
        transition.opacity = opacity;



//        var width = parseInt(triggerWidthInput.val());
//        var height = parseInt(triggerHeightInput.val());
//
//        if (!aspectRatio) {
//            this.calculateProportion(width, height);
//        }

        var width = transition.width;
        var height = transition.height;

        this.calculateProportion(width, height);

        if(triggerEaseingInput.val() == null){
            var optgroup = $('<optgroup class="trigger-custom-group" label="custom">\
                <option value="'+ transition.ease +'">custom</option>\
            </optgroup> ');

            triggerEaseingInput.append(optgroup);
            triggerEaseingInput.val(transition.ease);
        }

        opts.set('transition', transition);
        this.saveChanges();

    },

    renderVideoContainer: function(){

        var opts = this.model.get('opts');

        _log('renderVideoContainer', opts);

        var video =  opts.get('video') == undefined ? {} : opts.get('video');

        var videoPositionInput = this.$el.find('.trigger-video-position-input');
        var videoPlayInput = this.$el.find('.trigger-video-position-playing-input');

        var videoPosition = video.position == undefined ? 0 : video.position;
        var videoPlay = video.play == undefined ? 0 : video.play;

        videoPositionInput.val(videoPosition);
        videoPlayInput.prop('checked', videoPlay)
       
    },

    renderStyleContainer: function(){

        var opts = this.model.get('opts');
        var style =  opts.get('style') || {}

        var borderTypeSelect = this.$el.find('.trigger-border-type-select');
        var borderType = style.borderType || '';

        borderTypeSelect.val(borderType);

    },

    getTriggerWhatToDo :function(){

        var triggerWhatToDo = this.componentModel.getTriggerWhatToDo();

        var tempArr = this.triggerWhatToDo.toJSON().concat( triggerWhatToDo );

        return tempArr;
    },

    renderItem: function(){

        var whatToDo = this.model.get('whattodo');


        switch (whatToDo){
            case 'showObjects':
                this.renderObjectsTemplate();
                break;

            case 'showObject':
            case 'hideObject':
                this.renderObjectsTemplate();
                break;

            case 'showLine':
            case 'hideLine':
                this.renderLayersTemplate();
                break;

            case 'gotopage':
                this.renderPagesTemplate();
                break;

            case 'gotonextpage':
                this.renderStandardTemplate();
                break;

            case 'gotoprevpage':
                this.renderStandardTemplate();
                break;

            case 'changevarvalue':
                this.renderChangeVariableTemplate();
                break;

            case 'playobjectsound':
            case 'pauseobjectsound':
            case 'stopobjectsound':
                this.renderPlaySoundTemplate();
                break;

            case 'unlockpagenavigation':
                this.renderStandardTemplate();
                break;

            case 'resetExerciseApproach':
                this.renderResetExerciseTemplate();
                break;

            case 'goToLink':
                this.renderGoToLinkTemplate();
                break;

            case 'checkExercise':
                this.renderCheckExerciseTemplate();
                break;

            case 'checkAllExercises':
            case 'resetAllExercises':
                this.renderCheckAllExercisesTemplate();
                break;   

            case 'showNextLine':
                this.renderShowNextLayerTemplate();
                break;

            case 'startTimer':
            case 'stopTimer':
            case 'resetTimer':
                this.renderTimerTemplate();
                break;

            case 'playVideo':
            case 'stopVideo':
            case 'pauseVideo':
                this.renderVideoTemplate();
                break; 

            case 'goToPositionVideo':
                this.renderVideoPositionTemplate();
                break;        

            case 'makeTransition':
                this.renderTransitionTemplate();
                break;

            case 'changeStyle':
                this.renderStyleTemplate();
                break;



            default :
                this.renderStandardTemplate();
                break;
        }

        this.addTitleToButtons();

    },



    renderStandardTemplate: function(){

        var options = this.getSubtriggerTemplateOptions();

        var template = this.templateStandard( options );
        this.$el.html(template);
    },

    renderObjectsTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions(true);

        var template = this.templateObjects( options );
        this.$el.html(template);
    },

    renderLayersTemplate: function(){

        var options = this.getSubtriggerLayersTemplateOptions();

        var template = this.templateLayers( options );
        this.$el.html(template);
    },

    renderPagesTemplate: function(){

        var options = this.getSubtriggerPagesTemplateOptions();

        var template = this.templatePages( options );
        this.$el.html(template);
    },

    renderChangeVariableTemplate: function(){

        var options = this.getSubtriggerVariablesTemplateOptions();

        var template = this.templateChangeVariables( options );
        this.$el.html(template);

        this.renderVariablesContainer();
    },

    renderPlaySoundTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templatePlaySound( options );
        this.$el.html(template);
    },

    renderGoToLinkTemplate: function(){

        var options = this.getSubtriggerTemplateOptions();

        _log('renderGoToLinkTemplate options', options)

        var template = this.templateGoToLink( options );
        this.$el.html(template);

        this.renderGoToLinkContainer();
    },

    renderCheckExerciseTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templateCheckExercise( options );
        this.$el.html(template);
    },

    renderCheckAllExercisesTemplate: function(){

        var options = this.getSubtriggerTemplateOptions();

        var template = this.templateCheckAllExercises( options );
        this.$el.html(template);
    },


    

    renderResetExerciseTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templateResetExercise( options );
        this.$el.html(template);
    },

    renderTimerTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templateTimer( options );
        this.$el.html(template);
    },

    renderVideoTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templateVideo( options );
        this.$el.html(template);
    },

    renderVideoPositionTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templateVideoPosition( options );
        this.$el.html(template);

        this.renderVideoContainer();
    },

    


    renderShowNextLayerTemplate: function(){

        var options = this.getSubtriggerTemplateOptions();

        var template = this.templateShowNextLayer( options );
        this.$el.html(template);
    },

    renderTransitionTemplate: function(){

        var options = this.getSubtriggerObjectsTemplateOptions(true);

        var template = this.templateTransition( options );
        this.$el.html(template);

        this.renderTransitionContainer();
    },

    renderStyleTemplate: function(){

        var _that = this;

        var options = this.getSubtriggerObjectsTemplateOptions();

        var template = this.templateChangeStyle( options );
        this.$el.html(template);

        setTimeout(function(){
            _that.createColorPicker('background', '.text-color-picker-container');
            _that.createGradientColorPicker('borderColor', '.border-color-picker-container');
        });

        this.renderStyleContainer();

    },



    addTitleToButtons: function(){
        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });
    },

    createColorPicker: function(colorType, containerClass) {

        var _that = this;

        var opts = this.model.get('opts');

         _log('opts', opts);

        var style = opts.get('style') || {};

        _log('createColorPicker style', style);


        var gradientSaveTimeout = null;

        var background = '#FFF';

        if ( !_.isUndefined(style[colorType] ) ) {
            background = style[colorType];
        }

        this.textBgColorPicker = new GradientPickerView({ color: background });
        this.$el.find(containerClass).html(this.textBgColorPicker.render().$el);
        this.textBgColorPicker.afterRender();
        this.textBgColorPicker.on('move', function(data) {

            background = data.color;

            _that.$el.find('.picker-container').css('background', data.color);

            _log('background', background);

            style[colorType] = background;
            opts.set('style', style);
            _that.model.set('opts', opts);
            

        });
        this.textBgColorPicker.on('gradient-change', function(data) {

            clearTimeout(gradientSaveTimeout);
            background = data.color;

            gradientSaveTimeout = setTimeout(function() {
                _log('background', background);

                style[colorType] = background;
                opts.set('style', style);
                _that.model.set('opts', opts);
                _that.saveChanges();

            }, 500);
        });
        this.textBgColorPicker.on('hide', function(data) {
            _log('textBgColorPicker hide', data);

            _that.saveChanges();
        });

    },

    createGradientColorPicker: function(colorType, containerClass) {

        var _that = this;

        var opts = this.model.get('opts');

        var style = opts.get('style') || {};

        var background = '#FFF';

        if ( !_.isUndefined(style[colorType] ) ) {
            background = style[colorType];
        }

        this.borderBgColorPicker = new ColorPickerView({ color: background });
        this.$el.find(containerClass).html(this.borderBgColorPicker.render().$el);
        this.borderBgColorPicker.on('move', function(data) {
            
            background = data.color;

            style[colorType] = background;
            opts.set('style', style);
            _that.model.set('opts', opts);



        });
        this.borderBgColorPicker.on('change', function(data) {

            // background = data.color;

            //  _log('background', background);

            // style[colorType] = background;
            // opts.set('style', style);
            // _that.model.set('opts', opts);
            // _that.saveChanges();

            // 



        });
        this.borderBgColorPicker.on('hide', function(data) {
            _that.saveChanges();

        });

    },



    

});
