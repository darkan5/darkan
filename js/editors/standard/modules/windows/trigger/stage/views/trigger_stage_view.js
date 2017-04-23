var TriggerStageView = Backbone.View.extend({

    tagName: "div",
    className: 'trigger-stage',

    template: _.template($('#trigger-stage-template').html()),
    normalTemplate: _.template($('#trigger-normal-stage-template').html()),
    keyboardTemplate: _.template($('#trigger-keyboard-stage-template').html()),
    videoTimeTemplate: _.template($('#trigger-video-time-stage-template').html()),


    events:{
        'change .trigger-on-select' : 'onTriggerOnChanged',
        'render-stage' : 'render',
        'show-condition-section' : 'showConditionSection',
        'show-elseaction-section' : 'showElseActionSection',
        'keydown .trigger-keyboard-input' : 'onTriggerKeyboardChanged',
        'change .trigger-video-time-1-input' : 'onTriggerTime1Changed',
        'change .trigger-video-time-2-input' : 'onTriggerTime2Changed'
    },

    showElseActionSection :function(){

        this.elseactionSection.$el.show();
    },

    showConditionSection :function(){

        this.conditionSection.$el.show();
    },

    update: function(){

        this.$el.trigger('save-asda', {}, this);
    },

    initialize: function(data){

        this.triggerWhenDoIt = new TriggerActionsCollection();
        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_MOUSE'), options: [
            { name: _lang('TRIGGER_EVENT_CLICK'), value: 'click' },
            { name: _lang('TRIGGER_EVENT_MOUSEOVER'), value: 'mouseenter' },
            { name: _lang('TRIGGER_EVENT_MOUSEOUT'), value: 'mouseleave' }
        ] });

        this.triggerWhenDoIt.add( triggerActionModel );

        this.componentModel = data.componentModel;

        

        this.model = new TriggerSubtriggerModel({
            defaults:{
                whendoit: '',
                whattodo: '',
                objs: new ComponentCollection(),
                opts:  new TriggerOptsModel({
                    animationType: new TriggerAnimationTypeModel(),
                    delay: 0
                })
            }
        });

        this.subtriggerSection = new TriggerSubtriggerSectionView( { collection:this.model.get('subtriggers') } );
        this.conditionSection = new TriggerConditionSectionView( { collection:this.model.get('conditions') } );
        this.elseactionSection = new TriggerElseActionSectionView( { collection:this.model.get('elseactions') } );
    },

    

    onTriggerTime1Changed: function(e){

        _log('onTriggerTime1Changed', e);

        var value = parseFloat($(e.target).val());

        var opts = this.model.get('opts');
        var video = opts.get('video') == undefined ? {} : opts.get('video');
        video.time1 = value;
        opts.set('video', video);
        this.model.set('opts', opts);

        this.$el.trigger('update', this.model, this);
    },

    onTriggerTime2Changed: function(e){

        _log('onTriggerTime2Changed', e);

        var value = parseFloat($(e.target).val());

        var opts = this.model.get('opts');
        var video = opts.get('video') == undefined ? {} : opts.get('video');
        video.time2 = value;
        opts.set('video', video);
        this.model.set('opts', opts);

        this.$el.trigger('update', this.model, this);
    },

    onTriggerKeyboardChanged: function(e){

        e.preventDefault();

        _log('onTriggerKeyboardChanged', e);

        var keyCode = e.keyCode;

        var mappedKeyCode = Utils.mapKeyCode(keyCode);

        $(e.target).val(mappedKeyCode);

        var opts = this.model.get('opts');
        var keyboard = opts.get('keyboard') == undefined ? {} : opts.get('keyboard');
        keyboard.key = keyCode;
        opts.set('keyboard', keyboard);
        this.model.set('opts', opts);

        this.$el.trigger('update', this.model, this);
    },

    getTemplate: function(){

        var whenDoIts = this.getTriggerWhenDoIt();

        var whenDoIt = this.model.get('whendoit');

        switch(whenDoIt){
            case 'keydown':

            _log('getTemplate this.model', this.model)

                var opts = this.model.get('opts');
                var keyboard = opts.get('keyboard') == undefined ? {} : opts.get('keyboard');
                var key = keyboard.key;

                return this.keyboardTemplate({ whendoit: whenDoIts, key: Utils.mapKeyCode( key ) });
            break;

            case 'onVideoTimeUpdate':

            _log('getTemplate this.model', this.model)

                var opts = this.model.get('opts');
                var video = opts.get('video') == undefined ? {} : opts.get('video');

                return this.videoTimeTemplate({ whendoit: whenDoIts, video:video });
            break;

            default:
                return this.normalTemplate({ whendoit: whenDoIts });
            break;
        }
    },

    renderOnAction: function(){

        var template = this.getTemplate();
        this.$el.find('.trigger-on-action-container').html(template);
    },

    render: function(){

        this.$el.show();

        var whenDoIt = this.model.get('whendoit');
        
        var template = this.template();
        this.$el.html(template);

        this.renderOnAction();


        this.$el.find('.trigger-on-select').val(whenDoIt);


        this.$el.append( this.subtriggerSection.render().$el);
        this.$el.append( this.conditionSection.render().$el);
        this.$el.append( this.elseactionSection.render().$el);

        this.delegateEvents();

        if(this.model.get('elseactions').length > 0){
            this.subtriggerSection.$el.show();
            this.showConditionSection();
            this.showElseActionSection();
        }

        if(this.model.get('conditions').length > 0){
            this.subtriggerSection.$el.show();
            this.showConditionSection();
            this.showElseActionSection();
        }

        if(this.model.get('subtriggers').length > 0){
            this.subtriggerSection.$el.show();
            this.showConditionSection();
        }

        if(whenDoIt != ''){
            this.subtriggerSection.$el.show();
        }

        this.addTitleToButtons();

//        if(whenDoIt != ''){
//            this.subtriggerSection.$el.show();
//        }
//
//        if(this.model.get('subtriggers').length > 0){
//            this.showConditionSection();
//        }
//
//        if(this.model.get('conditions').length > 0){
//            this.showConditionSection();
//        }
//
//        if(this.model.get('conditions').length > 0){
//            this.showElseActionSection();
//        }
//
//        if(this.model.get('elseactions').length > 0){
//            this.showConditionSection();
//            this.showElseActionSection();
//        }


        return this;
    },

    resetStage : function(){
        this.$el.html('');
        this.$el.hide();
    },

    getTriggerWhenDoIt :function(){


        var triggerWhenDoIt = this.componentModel.getTriggerWhenDoIt();

        var tempArr = this.triggerWhenDoIt.toJSON().concat( triggerWhenDoIt );

        return tempArr;
    },

    onTriggerOnChanged: function(e){
        var value = $(e.target).val();
        this.model.set('whendoit', value);

        this.$el.trigger('update', this.model, this);

        this.renderOnAction();

        if(value != ''){
            this.subtriggerSection.showItem();
        }

        this.$el.find('.trigger-on-select').val(value);

        this.addTitleToButtons();


        if(value == 'keydown'){

            var keyboardInput = this.$el.find('.trigger-keyboard-input');

            keyboardInput.focus();
            keyboardInput.trigger('mouseover');
            this.markForAWhile(keyboardInput);
        }

    },

    markForAWhile: function(element){

        var _that = this;

        element.attr('mark', true);

        setTimeout(function(){
            element.attr('mark', false);
        }, 3000);
    },


    setModel: function(model){

        this.model = model;


        this.subtriggerSection.setCollection( this.model.get('subtriggers'), this.componentModel );
        this.conditionSection.setCollection( this.model.get('conditions'), this.componentModel );
        this.elseactionSection.setCollection( this.model.get('elseactions'), this.componentModel );

        this.subtriggerSection.$el.hide();
        this.conditionSection.$el.hide();
        this.elseactionSection.$el.hide();



        this.render();
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

});