var TimelineComponentEditorView = TimelineEditorView.extend({

    template: _.template($('#timeline-editor-template').html()),

    bindings: {
        '.timeline-editor-object-lifetime': {
            observe: 'lifetime',
            // onSet: function(val) {
            //      val = parseInt(val);
            //      return val === 0 ? '' : val;
            // },
            onGet: function(val) {
                 val = parseInt(val);
                 return val === 0 ? '' : val;
            }
        },
        '.timeline-editor-object-showtime': {
            observe: 'showtime'
            // onSet: function(val) {

            //     val = parseInt(val);

            //     return val === 0 ? '' : val;
            // }
        }
    },

    events: function(){
        return _.extend({},TimelineEditorView.prototype.events,{
            'change .timeline-editor-object-lifetime': 'renderComponent',
            'keyup .timeline-editor-object-lifetime': 'renderComponent',
            'paste .timeline-editor-object-lifetime': 'renderComponent',
            'mousewheel .timeline-editor-object-lifetime': 'renderComponent',

            'change .timeline-editor-object-showtime': 'renderComponent',
            'keyup .timeline-editor-object-showtime': 'renderComponent',
            'paste .timeline-editor-object-showtime': 'renderComponent',
            'mousewheel .timeline-editor-object-showtime': 'renderComponent'
        });
    },

    openAnimationWindow: function(e, windowType) {
        var _that = this;


        if(this.animationWindowView == undefined){
            var animationData = this.model.get('animations')[windowType];

            this.animationWindowView = WindowFactory.createAnimateWindow(animationData);
            this.animationWindowView.on('on-close', function() {
                _that.animationWindowView = undefined;
            });

            this.animationWindowView.on('on-animation-selected', function( choosenAnimationData ) {
                _that.animationWindowView = undefined;
                _that.model.get('animations')[windowType] = choosenAnimationData;
                _that.model.trigger('change');
                _that.render();
                _that.afterRender();
            });

            $('body').append( this.animationWindowView.render({title: _lang('ANIMATIONWINDOW_TITLE_'+windowType), animations: window._layout.animations[windowType], animationMainType: windowType}).$el );

            var windowPosition = {
                top: e.pageY,
                left: e.pageX
            };
            this.animationWindowView.setWindowPosition( windowPosition );
        }
    },
    
    afterRender: function() {
        this.$el.find('.timeline-editor-add-animation-in').attr('value', this.model.get('animations').animIn.animationPrettyName);
        this.$el.find('.timeline-editor-add-animation-out').attr('value', this.model.get('animations').animOut.animationPrettyName);
        this.$el.find('.timeline-editor-add-animation-over').attr('value', this.model.get('animations').animOver.animationPrettyName);
        this.$el.find('.timeline-editor-add-animation-endless').attr('value', this.model.get('animations').animEndless.animationPrettyName);
    },
    onSetModel: function() {
        var _that = this;

        this.model.off('refresh-timeline-editor-numbers');
        this.model.on('refresh-timeline-editor-numbers', function() {
            _that.refreshNumberFields();
        });
    },

    refreshNumberFields: function() {
        var lifetime = parseInt(this.model.get('lifetime'));
        var lifetimeVal= lifetime === 0 ? '' : lifetime;
        this.$el.find('.timeline-editor-object-lifetime').val(lifetimeVal);
        this.$el.find('.timeline-editor-object-showtime').val(this.model.get('showtime'));
    },

    renderComponent: function(){

        //this.model.forceRender();
        this.model.miniatureView.afterRender();
    }

});
