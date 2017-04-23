var ClassicTimelineRowItemView = TimelineRowItemView.extend({

    className: 'timeline-item timeline-item-classic',

    template: _.template($('#timelineitem-template-classic').html()),

    grid: 10,

    singleMove : 1,
    //rowTime : 60,

    minBlockWidth: 25,

    events: function(){
        return _.extend({},ComponentMiniatureView.prototype.events,{
            'save-model': 'saveModel',
            'drop-item': 'dropItem',
            'remove-from' : 'removeFromCollection',
            'add-to': 'addToCollection',
            'add-to-multi': 'addToCollectionMulti',
            'add-new-row': 'addNewRow',
            'data-picker-selected-by-miniature': 'dataPickerSelectedByMiniature',
            'data-picker-unselected-by-miniature': 'dataPickerUnSelectedByMiniature'
        });
    },

    tempPositionObject : {},
    others : [],

    initialize :function(){

        var _that = this;

        this.model.miniatureView = this;

        this.addEventsToModel();

        //this.model.off("force-render");
//        this.model.on("force-render", function() {
//            _that.render();
//            _that.afterRender();
//
//        });

        this.listenTo(StageView.instance.model.get('options'), 'change:stageLifetime', this.onStageLifetimeChange);
    },

    onStageLifetimeChange: function(model){

        this.render();
        this.afterRender();
    },

    saveModel: function(event, params) {

        this.model.set( params, {silent:true} );
    },

    rememberPositions:function( sender, direction ){

        var _that = this;


        var draggingObjectsData = [ ];


        // var selectedObjectsWithoutDraggedOne = _that.$el.closest('#botmenu-timeline').find('.timeline-item[active="true"] .timeline-classic-block[is-draging!="true"]');
        var selectedObjectsWithoutDraggedOne = StageView.instance.selectedComponentsCollection;


        // for (var i = 0; i < selectedObjectsWithoutDraggedOne.length; i++) {
        selectedObjectsWithoutDraggedOne.each(function(model) {

            // var other = $(selectedObjectsWithoutDraggedOne[i]);

            if (model.cid != _that.model.cid) {
                draggingObjectsData.push({
                    left: parseInt(model.miniatureView.$el.find('.timeline-classic-block').css('left')),
                    width: parseInt(model.miniatureView.$el.find('.timeline-classic-block').css('width')),
                    lifetime: parseInt(model.get('lifetime')),
                    showtime: parseInt(model.get('showtime')),
                    ob: model.miniatureView.$el,
                    model: model
                });
            }

            // other.trigger('set-', draggingObjectsData);
        });

        this.tempPositionObject = {
            left: parseInt(sender.css('left')),
            width: parseInt(sender.css('width')),
            draggingObjectsData: draggingObjectsData,
            selectedObjectsWithoutDraggedOne: selectedObjectsWithoutDraggedOne,
            lifetime: this.model.get('lifetime'),
            showtime: this.model.get('showtime')
        };

        // var arrayComponents = [];
        // var arrayWidthComponents = [];

        // var others = _that.$el.closest('#botmenu-timeline').find('.timeline-item[active="true"] .timeline-classic-block[is-draging!="true"]');

        // this.others = others;

        // for (var i = 0; i < others.length; i++) {
        //     var other = $(others[i]);

        //     if(direction == 'left'){
        //         arrayComponents.push( parseInt(other.css('left')) );
        //     } else if(direction == 'right'){
        //         arrayComponents.push( parseInt(other.css('left')) + parseInt(other.css('width')) );
        //     }

        //     arrayWidthComponents.push( parseInt(other.css('width')) );
        // };

        // if(direction == 'left'){
        //     _that.tempPositionObject = { startingX: parseInt(sender.css('left')), arrayComponents:arrayComponents };
        // } else if(direction == 'right'){


        //     _that.tempPositionObject = {
        //         startingX: parseInt(sender.css('left')) + parseInt(sender.css('width')),
        //         arrayComponents:arrayComponents,
        //         arrayWidthComponents:arrayWidthComponents
        //     };
        // }
    },



    setPositions:function(sender, direction){

        var _that = this;

        var actualPositionX = parseInt(this.$el.find('.timeline-classic-block').css('left'));


        var others = this.tempPositionObject.draggingObjectsData;

        for (var i = 0; i < others.length; i++) {
            var other = others[i].ob.find('.timeline-classic-block');

            if(direction == 'left') {

                var delta = actualPositionX - _that.tempPositionObject.left;
                var positionX =_that.tempPositionObject.draggingObjectsData[i].left + delta;

                var width = _that.tempPositionObject.draggingObjectsData[i].width - delta;

                if(positionX >= 0 && width > _that.minBlockWidth){
                    other.css({
                        left: positionX + 'px',
                        width: width + 'px'
                    });
                    _that.saveTime( other, others[i].model, true);
                    _that.renderHandles(others[i].model, other);
                    // _that.displayTime(other);
                }


            } else if(direction == 'right'){

                var width =  parseInt(this.$el.find('.timeline-classic-block').css('width'));

                var delta = width - _that.tempPositionObject.width;

                var w =  _that.tempPositionObject.draggingObjectsData[i].width + delta;

                var maxWidth = parseInt(others[i].ob.find('.timeline-classic-block-wrapper').css('width'));

                if(w >= 0 && w <= maxWidth) {
                    other.css('width', w + 'px' );
                    _that.saveTime( other, others[i].model, true);
                    _that.renderHandles(others[i].model, other);
                }


            } else if(direction == 'drag'){

                var delta = actualPositionX - _that.tempPositionObject.left;
                var positionX =_that.tempPositionObject.draggingObjectsData[i].left + delta;

                if(positionX >= 0){
                    other.css('left', positionX + 'px' );
                    
                } else {
                    other.css('left', 0 + 'px' );
                }
                _that.saveTime( other, others[i].model, true);
                _that.renderHandles(others[i].model, other);
            }
        };

        // _that.displayTime( sender );
    },

    makeDraggable: function() {
        var _that = this;

        if(this.model.get('locked')){
            return;
        }

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

                _that.rememberPositions( $(e.target), 'left' );



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

                _that.saveTime( $(this), _that.model, false);
                _that.setPositions( $(e.target), 'drag' );
                _that.model.trigger('change');

            },
            drag: function(e){

                e.stopPropagation();

                _that.setPositions( $(e.target), 'drag' );

                _that.saveTime( $(this), _that.model, true);
                _that.renderHandles(_that.model, _that.$el);

            }
        });
    },


    makeResizable: function() {
        var _that = this;

        if(this.model.get('locked')){
            this.$el.find('.timeline-classic-block').resizable({
                containment: 'parent',
                handles: 'e, w',
                minWidth: _that.minBlockWidth
            });
            this.$el.find('.timeline-classic-block').resizable('disable');
        }else{


        this.$el.find('.timeline-classic-block').resizable({
            containment: 'parent',
            handles: 'e, w',
            // grid: [ _that.grid, 0 ],
            minWidth: _that.minBlockWidth,
            //alsoResize : '.timeline-item[active="true"] .timeline-classic-block',

            resize: function(e){

                e.stopPropagation();

                //_that.displayTime( $(this) );

                //_that.setPositions( $(e.target) );

                if( _that.handler == 'e'){
                    _that.setPositions( $(e.target), 'right' );
                } else if( _that.handler == 'w'){
                    _that.setPositions( $(e.target), 'left' );
                }

                _that.saveTime( $(this), _that.model, true);
                _that.renderHandles(_that.model, _that.$el);
            },

            start: function(e){

                e.stopPropagation();

                $(e.target).attr('is-draging', true);

                // w <-
                // e ->

                if($(e.toElement).hasClass('ui-resizable-e')){
                    _that.rememberPositions( $(e.target), 'right' );

                    _that.handler = 'e';

                } else{
                    _that.rememberPositions( $(e.target), 'left' );

                    _that.handler = 'w';
                }
            },

            stop: function(e){

                e.stopPropagation();

                $(e.target).removeAttr('is-draging', true);

                _that.saveTime( $(this), _that.model, false );
                _that.model.trigger('change');
            }

        });

        }
    },

    renderHandles: function(model, el) {

        var showtime = parseInt(model.get('showtime'));
        var lifetime = parseInt(model.get('lifetime'));

        var timelineGrid =  this.calculateTimelineGrid();


        var hidetime = (parseInt(showtime) + parseInt(lifetime));

        this.rowTime = StageView.instance.model.get('options').get('stageLifetime');

        if((lifetime+showtime) >= this.rowTime || lifetime == 0) {
            hidetime = '&infin;';
            this.model.set('lifetime', 0);
        }

        el.find('.ui-resizable-w').text(showtime);
        el.find('.ui-resizable-e').html(hidetime);
    },

    renderWidth: function() {

        var x1 = this.model.get('showtime');
        var x2 = this.model.get('lifetime');

        var timelineGrid =  this.calculateTimelineGrid();


        var showtime = parseInt(x1 * timelineGrid) + 'px';
        var hidetime = parseInt(x2 * timelineGrid) + 'px';

        if(x1 == 0 && x2 == 0){
            hidetime = '100%';
        }

        if(x2 == 0){
            hidetime = parseInt(this.$el.find('.timeline-classic-block-wrapper').css('width')) - parseInt( showtime ) + 'px';
        }

        this.$el.find('.timeline-classic-block').css('left', showtime);
        this.$el.find('.timeline-classic-block').css('width', hidetime);
    },

    calculateTimelineGrid: function( ) {

        var width = this.$el.find('.timeline-classic-block-wrapper').css('width');

        this.rowTime = StageView.instance.model.get('options').get('stageLifetime');

        var timelineGrid =  (parseInt(width) * this.singleMove) / this.rowTime;

        return parseInt(timelineGrid);
    },

    displayTime: function( sender ) {

        var _that = this;

        var timelineGrid =  this.calculateTimelineGrid();


       //  var x1 = parseInt( sender.css('left') );
       //  var x2 = parseInt( sender.css('width'));


       //  var showtime = parseInt(x1 / timelineGrid);
       //  var hidetime = parseInt((((x1 + x2) / timelineGrid) - this.singleMove));

        var showtime = this.model.get('showtime');
        var hidetime = parseInt(this.model.get('showtime')) + parseInt(this.model.get('lifetime'));


        sender.find('.ui-resizable-w').text(showtime);
        sender.find('.ui-resizable-e').text(hidetime);
    },

    saveTime: function( sender, model, silent) {

        // var others = this.others;

        // var selectedObjectsWithoutDraggedOne = this.tempPositionObject.selectedObjectsWithoutDraggedOne;

        // _.each(selectedObjectsWithoutDraggedOne, function(model){
        //     model.set({ lifetime:  , showtime: }, { silent:true });
        // });

        var timelineGrid =  this.calculateTimelineGrid();

        // for (var i = 0; i < others.length; i++) {
        //     var other = $(others[i]);

        //     var width = parseInt( other.css('width'));
        //     var x1 = parseInt( other.css('left')  / timelineGrid);
        //     var x2 = parseInt(width / timelineGrid);
        //     other.parent().trigger('save-model', { lifetime:x2, showtime:x1 }, this );
        // }

        var width = parseInt( sender.css('width'));
        var showtime = parseInt(parseInt( sender.css('left') ) / timelineGrid);
        var lifetime = parseInt(width / timelineGrid);

        if((lifetime+showtime) >= this.rowTime) {

            lifetime = 0;
        }

        model.set({ lifetime:lifetime, showtime:showtime }, {silent: silent});
        if (silent) {
            model.refreshTimelineEditor();
        }
        // this.model.trigger('change');
    },

    renderActive :function( active ){
        this.$el.attr('active', active );
        this.$el.find('.timelineItem').attr('active', active );
    },

    afterRender : function(){

        this.renderHandles(this.model, this.$el);
        this.renderWidth();
    },

    onResize: function(){
        //this.render();
        this.afterRender();
    }

});