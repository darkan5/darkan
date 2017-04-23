var ClassicTimelineRowItemView = TimelineRowItemView.extend({

    className: 'timeline-item timeline-item-classic',

    template: _.template($('#timelineitem-template-classic').html()),

    rowTime: 60,

    events: function(){
        return _.extend({},ComponentMiniatureView.prototype.events,{
            'save-model': 'saveModel',
            'drop': 'drop',
            'remove-from' : 'removeFromCollection',
            'add-to': 'addToCollection',
            'add-to-multi': 'addToCollectionMulti',
            'add-new-row': 'addNewRow'
        });
    },

    initialize :function(){

        var _that = this;

        this.model.miniatureView = this;

        this.addEventsToModel();

        //this.model.off("force-render");
        // this.model.on("force-render", function() {
        //     _that.render();
        //     _that.afterRender();

        // });
    },

    calculateTimelineGrid: function( ) {

        var width = parseInt(this.$el.find('.timeline-classic-block-wrapper').css('width'));

        var timelineGrid =  width / this.rowTime;

        return timelineGrid;
    },


    makeDraggable: function() {
        var _that = this;

        this.$el.find('.timeline-classic-block').draggable({
            containment: '.timeline-classic-block-wrapper',
            axis: 'x',
            // grid: [ _that.grid, 0 ],

            start: function(e) {

                e.stopPropagation();

                $(e.target).css({
                    cursor: 'grabbing',
                    cursor: '-ms-grabbing',
                    cursor: '-o-grabbing',
                    cursor: '-moz-grabbing',
                    cursor: '-webkit-grabbing'
                }).attr('is-draging', true);

            },
            stop: function(e) {

                e.stopPropagation();

                $(e.target).css({
                    cursor: 'grab',
                    cursor: '-ms-grab',
                    cursor: '-o-grab',
                    cursor: '-moz-grab',
                    cursor: '-webkit-grab'
                }).removeAttr('is-draging');

            },
            drag: function(e){

                e.stopPropagation();

            }
        });
    },


    makeResizable: function() {
        var _that = this;

        this.$el.find('.timeline-classic-block').resizable({
            containment: 'parent',
            handles: 'e, w',
            // grid: [ _that.grid, 0 ],
            minWidth: 25,
            //alsoResize : '.timeline-item[active="true"] .timeline-classic-block',

            resize: function(e){

                e.stopPropagation();

                _that.renderHandlesText();
            },

            start: function(e){

                e.stopPropagation();
            },

            stop: function(e){

                e.stopPropagation();

                _that.saveTime();
            }

        });
    },

    parseToPixels: function(val) {
        var pixels = val * this.rowTime;
        return pixels;
    },

    parseToTime: function(val) {
        var time = (parseFloat(val).toFixed(1)) / this.rowTime;
        return time.toFixed(1);
    },

    saveTime: function() {
        var block = this.$el.find('.timeline-classic-block');

        var lifetime = this.parseToTime( parseFloat(block.css('width')).toFixed(1) / this.rowTime );
        var showtime = this.parseToTime( parseFloat(block.css('left')) );

        this.model.set({ lifetime:lifetime, showtime:showtime });
        this.renderHandlesText();
    },

    saveModel: function() {

        // this.$el.find('.timeline-classic-block').css('left', showtimePx + 'px');
        // this.$el.find('.timeline-classic-block').css('width', (lifetimePx - showtimePx) + 'px' );
    },

    renderHandlesText: function() {
        var showtime = parseFloat(this.model.get('showtime'));
        var lifetime = parseFloat(this.model.get('lifetime'));

        this.$el.find('.ui-resizable-w').text(showtime);
        this.$el.find('.ui-resizable-e').text(showtime + lifetime);
    },

    renderBlockWidthAndPosition: function() {
        var showtimePx = this.parseToPixels(this.model.get('showtime'));
        var lifetimePx = this.parseToPixels(this.model.get('lifetime'));

        this.$el.find('.timeline-classic-block').css('left', showtimePx + 'px');
        this.$el.find('.timeline-classic-block').css('width', (lifetimePx - showtimePx) + 'px' );
    },

    renderActive :function( active ){
        this.$el.attr('active', active );
        this.$el.find('.timelineItem').attr('active', active );
    },

    afterRender : function(){
        this.renderHandlesText();
        this.renderBlockWidthAndPosition();
    },

    onResize: function(){
        this.afterRender();
    }

});