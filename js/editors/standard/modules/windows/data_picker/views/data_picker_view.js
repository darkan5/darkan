var DataPickerView = WindowView.extend({

    tagName: 'div',
    className : 'window data-picker animated',

    template: _.template($('#data-picker-template').html()),
    selectorTemplate: _.template($('#data-picker-selector-template').html()),
    selectorPositionTemplate: _.template($('#data-picker-selector-position-template').html()),

    events: {
        'click': 'closeDataPicker',
        'close': 'closeDataPicker'
    },

    // onKeyUp: function(e) {
    //     switch(e.keyCode) {
    //         case 27:
    //             this.closeDataPicker();
    //             break;
    //     }
    // },

    afterRender: function() {
        
    },

    initialize: function( data ) {

        var _that = this;

        this.windowModel = new DataPickerModel();

        this.setOptions(data);

        this.hoveredObject = null;

        this.onPicked = data.onPicked;

        this.setObserver(data);

        this.runObServer();

        this.addEvents();

    },

    setObserver: function(data) {
        this.observer = StageView.instance;
    },

    setOptions: function(data) {
        this.classSelector =  this.getSelectorClass(data.picker);
        this.action =  this.getPickedAction(data.picker);
        this.selectObjects( data.collection );
    },

    addEvents: function() {
        var _that = this;

        this.selector = $(this.selectorTemplate());
        this.selectorPosition = $(this.selectorPositionTemplate());
        this.selector.on('click', function(e){ _that.onSelectorClick(e) });
        this.selectorPosition.on('click', function(e){ _that.onSelectorPositionClick(e) });

        this.selector.on('mouseover', function(e){ _that.onSelectorMouseOver(e) })
        this.selector.on('mouseout', function(e){ _that.onSelectorMouseOut(e) })

        $('body').append(this.selector);
        $('body').append(this.selectorPosition);

        $('body').on('mouseover', function(e){ _that.onMouseOver(e) } );
        $('body').on('mousemove', function(e){ _that.onMouseMove(e) } );
    },


    onSelectorPositionClick: function(e) {
        _log("onSelectorPositionClick", e);

        var stageView = StageView.instance;

        var offset = stageView.$el.offset()

        var sx = parseInt(offset.left);
        var sy = parseInt(offset.top);

        var x = e.clientX - sx - 12;
        var y = e.clientY - sy - 11;

        var data = {position:{x:x, y:y}, e:e};

        this.trigger('data-picker-picked', data, this);

        if(this.onPicked != undefined){
            this.onPicked( data );
        }

        this.closeDataPicker();

    },

    onMouseMove: function(e) {

        if(this.action == 'point'){

            var stageView = StageView.instance;

            var offset = stageView.$el.offset()

            var sx = parseInt(offset.left);
            var sy = parseInt(offset.top);

            var x = e.clientX - sx - 12;
            var y = e.clientY - sy - 11;

            this.selectorPosition.css({
                display: 'block',
                left: (e.clientX - 30) + "px",
                top: (e.clientY - 30) + "px"
            });

            var position = ('X: ' + x + 'px, Y: ' + y + 'px');

            this.selectorPosition.attr('position', position);
        }
    },

    runObServer: function() {
        var _that = this;

        this.observer.off('data-picker-picked');
        this.observer.on('data-picker-picked', function(componentModel){


                if(_that.objectsCollection != undefined){
                    componentModel.selectedByTrigger(true);
                }

               _that.onDataPickerPicked( componentModel );


        });
    },

    selectObjects: function( objectsCollection ) {

        var _that = this;

        this.objectsCollection = objectsCollection;

        if(objectsCollection != undefined){
            _.each(objectsCollection, function(key,value){
                var model = DataPickerView.findModel(key, _that.action);

                if(model != undefined){
                    if(model.selectedByTrigger != undefined){
                        model.selectedByTrigger(true);
                    }
                }
            });
        }
    },

    unselectObjects: function( objectsCollection ) {

        var _that = this;

        var objectsCollection = this.objectsCollection;

        if(objectsCollection != undefined){
            _.each(objectsCollection, function(key, value){
                var model = DataPickerView.findModel(key, _that.action);

                if(model != undefined){
                    if(model.selectedByTrigger != undefined){
                        model.selectedByTrigger(false);
                    }
                }
            });
        }
    },

    getPickedAction: function(picker){
          if(picker == undefined){
              return 'object';
          }else{
              return picker;
          }
    },

    getSelectorClass: function( picker ) {

        switch (picker){
            case 'object':
                return '.component, .component-miniature, .timeline-item';
                break;

            case 'line':
                return '.timelinerow, .timelinerow-classic';
                break;

            case 'page':
                return '.page';
                break;

            case 'exercise':
                return '.quiz-component-miniature, .quiz';
                break;

            case 'timer':
                return '.timer-component-miniature, .timer-component';
                break;

            case 'text':
                return '.text-component-miniature, .text-component';
                break;

            case 'video':
                return '.video-component-miniature, .video-component';
                break;    

            case 'point':
                return '';
                break;

            default :
                return '.component, .component-miniature, .timeline-item';
                break;
        }
    },

    onDataPickerPicked: function( componentModel ){

        this.trigger('data-picker-picked', componentModel );

        if(this.onPicked != undefined){
            this.onPicked( componentModel );
        }
    },

    onMouseOver: function(e){
        var elementSearch = document.elementFromPoint(e.clientX, e.clientY);//$(e.target).parents('.component');

        //var selector = '.component, .component-miniature, .page, .timelinerow-items-holder';
        var selector = this.classSelector ;


        var findedElement = null;

        if ($(elementSearch).is(selector)) {
            findedElement = $(elementSearch);
        } else {
            if ($(elementSearch).parents(selector).is(selector)) {
                findedElement = $(elementSearch).parents(selector);
            }
        }

        // _log('picker element over', document.querySelectorAll(':hover'));



        if ( findedElement != null ) {

            _log('ZINDEX', findedElement.css('z-index'));

            var zIndex = !isNaN(findedElement.css('z-index')) ? findedElement.css('z-index') : 6001;
            zIndex = zIndex == 0 ? 6001 : zIndex;
            // zIndex = zIndex != 0 ? zIndex : 999;
            this.selector.css({
                display: 'block',
                left: findedElement.offset().left + "px",
                top: findedElement.offset().top + "px",
                width: findedElement.width() + "px",
                height: findedElement.height() + "px",
                'z-index': zIndex
            });


            this.hoveredObject = findedElement;
        }

    },

    onSelectorClick : function( e ){

        var _that = this;

        if(this.hoveredObject != null){

            _log('this.action', this.action);
            _log('this.hoveredObject', this.hoveredObject.trigger);

            this.hoveredObject.trigger('data-picker-unselected-by-miniature', {}, this);

            this.hoveredObject.trigger('data-picker-picked-' + this.action, {}, this);

            if (!e.shiftKey) {
                this.closeDataPicker();
            }
        }
    },

    onSelectorMouseOver : function( e ){

        if(this.hoveredObject != null){
            this.hoveredObject.trigger('data-picker-selected-by-miniature', {}, this);
        }
    },

    onSelectorMouseOut : function( e ){

        if(this.hoveredObject != null){
            this.hoveredObject.trigger('data-picker-unselected-by-miniature', {}, this);
        }
    },

    closeDataPicker : function(){
        $('body').off('mouseover');
        $('body').off('mouseout');
        $('body').off('mousemove');
        this.selector.off('click');
        this.selector.off('mouseover');
        this.selector.off('mouseout');
        this.selector.remove();
        this.selectorPosition.off('click');
        this.selectorPosition.remove();

        this.unselectObjects();

        this.hoveredObject = null;

        this.trigger('data-picker-close');
        this.close();

    },

    makeDraggable: function(modal) {

    }

});

DataPickerView.findComponentModel = function(actionkey){

    var stageView = StageView.instance;

    var componentModel =  stageView.getComponentModelByActionkey( actionkey );

    return componentModel;
}

DataPickerView.findRowModel = function(lineId){

    var stageView = StageView.instance;

    var rowModel =  stageView.getRowModelByLineId( lineId );

    return rowModel;
}

DataPickerView.findPageModel = function(pageId){

    var pageModel = ProjectModel.instance.getPageModelByPageId(pageId);

    return pageModel;
}

DataPickerView.findModel = function( key, type ){

    var model;

    if(type != undefined){
        switch(type){
            case 'object':
                return DataPickerView.findComponentModel(key);
                break;

            case 'line':
                return DataPickerView.findRowModel(key);
                break;

            case 'page':
                return DataPickerView.findPageModel(key);
                break;
        }
    }

    model = DataPickerView.findComponentModel(key);

    if(model != undefined){
        return model;
    }

    model = DataPickerView.findRowModel(key);

    if(model != undefined){
        return model;
    }

    model = DataPickerView.findPageModel(key);

    if(model != undefined){
        return model;
    }

    return undefined


}
