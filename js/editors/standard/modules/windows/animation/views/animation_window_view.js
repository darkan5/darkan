var AnimationView = WindowView.extend({

    tagName: 'div',
    className : 'window animation-window',

    template: _.template($('#window-animation-template').html()),

    events: function(){
         return _.extend({},WindowView.prototype.events, {
             'click .animation-block': 'addAnimation',
             'mouseover .animation-block': 'previewAnimation',
             'mouseout .animation-block': 'stopAnimation',
             'change .animation-time': 'changeAnimationTime',
             'dblclick .animation-block': 'close'
         });
    },

    initialize: function( data ) {
        this.windowModel = new AnimationWindowModel();
        this.runListeners();

        this.animtionData = data.animtionData;
    },

    stopAnimation: function(e){

        var componentsCollection  = StageView.instance.selectedComponentsCollection;

        var clickedAnimation = $(e.target);


        var animationName =  clickedAnimation.attr('value');
        var animationPrettyName = clickedAnimation.text();
        var animationTime = this.$el.find('.animation-time').val();


        componentsCollection.each(function(cModel){

            var oldStyle = cModel.view.$el.attr('style');

            cModel.view.$el.removeClass(animationName);
            cModel.view.$el.attr(oldStyle);
        });

    },

    previewAnimation: function(e){

        var componentsCollection  = StageView.instance.selectedComponentsCollection;

        var clickedAnimation = $(e.target);

        var animationName =  clickedAnimation.attr('value');
        var animationPrettyName = clickedAnimation.text();
        var animationTime = this.$el.find('.animation-time').val();

        componentsCollection.each(function(cModel){

            cModel.oldStyle = cModel.view.$el.attr('style');

            cModel.view.$el.addClass(animationName);

            cModel.view.$el.css("animation-duration", animationTime + "s");
            cModel.view.$el.css("-webkit-animation-duration", animationTime + "s");
        });

    },

    onClose: function(){
        this.trigger('on-close');
    },

    changeAnimationTime: function() {
        var animationData = {
            animationName: this.animtionData.animationName,
            animationPrettyName: this.animtionData.animationPrettyName,
            animationTime: this.$el.find('.animation-time').val()
        };
        
        this.trigger('on-animation-selected', animationData);
    },

    addAnimation: function(e){

        this.stopAnimation(e);

        var clickedAnimation = $(e.target);

        var animationData = {
            animationName: clickedAnimation.attr('value'),
            animationPrettyName: clickedAnimation.text(),
            animationTime: this.$el.find('.animation-time').val()
        };

        this.trigger('on-animation-selected', animationData);

        this.close();
    },

    afterRender: function() {
        var activeAnimation = this.$el.find('.animation-block[value="'+ this.animtionData.animationName +'"]');
            activeAnimation.addClass('activeAnimation');

        // set input animation time
        this.$el.find('.animation-time').val(this.animtionData.animationTime);

        this.$el.find('.animation-block').tooltip({
            html: true,
            animated: 'fade'
        });
    }
});