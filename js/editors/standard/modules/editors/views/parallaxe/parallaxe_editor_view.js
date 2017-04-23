var ParallaxeEditorView = EditorView.extend({

	//el: '#botmenu-parallaxe',

	template: _.template($('#parallaxe-editor-template').html()),

   events: function(){
       return _.extend({},EditorView.prototype.events,{
            'change #parallax-switcher-cursor' : 'onParallaxSwitcherCursorChanged',
            'change #parallax-direction-cursor' : 'onParallaxDirectionCursorChanged',
            'change #parallax-sensitivity-cursor' : 'onParallaxSensitivityCursorChanged',

            'change #parallax-switcher-scroll' : 'onParallaxSwitcherScrollChanged',
            'change #parallax-sensitivity-scroll' : 'onParallaxSensitivityScrollChanged'
       });
   },

    bindings: {

    },

    // Cursor
    onParallaxSwitcherCursorChanged: function(e) {

        var value = $(e.target).prop('checked');

        var parallax = this.model.get('parallax');
        parallax.cursor.on = value;

        this.model.set('parallax', parallax);

        this.model.trigger('change');

        this.render();
    },

    onParallaxDirectionCursorChanged: function(e) {

        var value = $(e.target).prop('checked');

        var parallax = this.model.get('parallax');
        parallax.cursor.dir = value;

        this.model.set('parallax', parallax);

        this.model.trigger('change');
    },

    onParallaxSensitivityCursorChanged: function(e) {

        var value = $(e.target).val();

        var parallax = this.model.get('parallax');
        parallax.cursor.sens = value;

        this.model.set('parallax', parallax);
        _log('parallax',this.model);

        this.model.trigger('change');
    },

    // Scroll
    onParallaxSwitcherScrollChanged: function(e) {

        var value = $(e.target).prop('checked');

        var parallax = this.model.get('parallax');
        parallax.scroll.on = value;

        this.model.set('parallax', parallax);

        this.model.trigger('change');

        this.render();
    },

    onParallaxSensitivityScrollChanged: function(e) {

        var value = $(e.target).val();

        var parallax = this.model.get('parallax');
        parallax.scroll.sens = value;

        this.model.set('parallax', parallax);

        this.model.trigger('change');
    },

    onSetModel: function() {

        this.render();

        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'top',
            width: 500,
            height: 200
        });
    },

    getJsonModel: function() {

        _log('render', this.model.toJSON());

         return this.model.toJSON();
    },
});