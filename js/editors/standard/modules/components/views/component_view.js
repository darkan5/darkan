var ComponentView = ItemView.extend({

    tagName: 'div',
    className : 'component test-component',

    multiSelectedComponentsModels: null,

    isRotatable: false,

    transformTool: {
        el: undefined,
        exists: false
    },

    events: {
        'mousedown': 'onMouseDown',
        'mouseup': 'onMouseUp',
        'multi-select' : 'multiSelect',
        'click' : 'onMouseClick',
        'dragenter': 'onFileDragOver',
        'dragleave .loaded-dropzone': 'onFileDragOut',
        'drop .loaded-dropzone': 'uploadOnFileDrop'

    },
    bindings: {
        '[name="type"]': 'type',
        '[name="position-x"]': 'x',
        '[name="position-y"]': 'y',
        '[name="width"]': 'width',
        '[name="height"]': 'height'
    },

    template: _.template($('#component-template').html()),

    isEditing: false,

	initialize: function( data ) {

        var _that = this;

        this.model.view = this;

        this.addListeners();
	    this.addComponentListeners();

        this.addEventsToModel();
        this.addEventsToView();

        this.$el.off('data-picker-picked-object');
        this.$el.on('data-picker-picked-object', function(){
             _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-exercise');
        this.$el.on('data-picker-picked-exercise', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-timer');
        this.$el.on('data-picker-picked-timer', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-video');
        this.$el.on('data-picker-picked-video', function(){
            _that.dataPickerPicked();
        });

        this.$el.off('data-picker-picked-text');
        this.$el.on('data-picker-picked-text', function(){
            _that.dataPickerPicked();
        });

        this.afterInitialize();
  	},

    onMouseClick : function(e){

//        if(!e.shiftKey){
//            this.trigger('select-component', this.model, e);
//
//        }
    },

    darkenComponent: function() {
        this.$el.css({
            opacity: '.5'
        });
        this.$el.addClass('darkenComponent');
    },

    unDarkenComponent: function() {
        this.$el.css({
            opacity: '1'
        });
        this.$el.removeClass('darkenComponent');
    },

    addBorder: function() {

        var borderWindow = WindowFactory.createBorderWindow();
        $('body').append(borderWindow.render().$el);
        borderWindow.setWindowPosition();
    },

    onMouseDown :function(e){

        e.stopPropagation();

        ContextMenuContainer.closeMenu();

        if(document.activeElement != undefined){
            if (document.activeElement.localName === 'input' ||
                document.activeElement.localName === 'textarea') {

                document.activeElement.blur();
            }
        }

        switch(e.button) {

            case 0:
                this.mouseDown(e);
                break;

            case 1:

                this.scroll(e);
                break;

            case 2:

                if(this.model.get('locked')){

                    StageView.instance.showContextMenu(e);
                    return;
                }

                this.mouseDown(e);
                this.showContextMenu(e);
                break;
        }
    },

    afterInitialize: function() {
      // TO OVERRIDE
      return false;
    },

    addEventsToView :function(){

        var _that = this;

        this.$el.off("multi-select");
        this.$el.on("multi-select", function( ) {

            _that.multiSelect();
        });
    },


    addEventsToModel: function(){

        var _that = this;

        this.model.off("change");
        this.model.on("change", function(e) {
            _that.trigger('save-changes', _that.model, e);

            StageView.instance.model.updateDinamicPageThumb();

            //console.log("save changes", e);

        });

        this.model.off("set-active");
        this.model.on("set-active", function( active, multiSelectedModels, params ) {
            _that.multiSelectedComponentsModels = multiSelectedModels;

            if(_that.multiSelectedComponentsModels != undefined){
                _that.multiSelectedComponentsModels.each(function(componetModel){
                    componetModel.startX = componetModel.get('x');
                    componetModel.startY = componetModel.get('y');
                });
            }

            _that.renderActive( active, params );

            _that.active = active;
        });

        this.model.off("set-zindex");
        this.model.on("set-zindex", function( zIndex ) {
            _that.renderZIndex( zIndex );
        });

        this.model.off("update-coming");
        this.model.on("update-coming", function( options ) {

            //TEMP: usuń po dodaniu dobrego resie

            _that.updateComing();

        });


        this.model.off("selected-by-miniature");
        this.model.on("selected-by-miniature", this.renderSelectByMinaiture, this);

        this.model.off("selected-by-picker-miniature-1");
        this.model.on("selected-by-picker-miniature-1", this.renderSelectByPickerMinaiture, this);



        this.model.off("selected-by-trigger");
        this.model.on("selected-by-trigger", function(value) {
            _that.renderSelectByTrigger(value);
        });

        this.model.off("force-render");
        this.model.on("force-render", function() {
            _that.forceRender();
        });

        this.model.off("locked-render");
        this.model.on("locked-render", function() {
            _that.renderLocked();
        });

        this.model.off("disable-component");
        this.model.on("disable-component", function() {
            _that.renderDisabled();
        });

    },


    updateComing: function() {
        var _that = this;

        if(_that.$el.is('.ui-resizable')){
            _that.$el.resizable("destroy");
        }

        _that.specificUpdateComing();

        _that.model.trigger('update-editor', _that.model, this);

        _that.render( );
    },

    specificUpdateComing: function() {
        // to override
    },

    forceRender: function(){
        this.render();
        this.afterRender();
        this.unselectComponent();
        this.selectComponent();
    },

    renderLocked: function(){

        var locked = this.model.get('locked');
        this.$el.attr('locked', locked);

        if(locked){

            this.resizableDestroy();
            this.draggableDestroy();
        }else{
            this.makeDraggable();
        }
    },

    renderDisabled: function(){
        this.$el.css('opacity', '0.5');
    },

    renderStyle: function( className ){

        var _that = this;
        var styles = this.model.get('styles');

        _.each(styles, function(style, className) {

            _that.$el.find('.' + className).css(styles[className]);

        });

        this.onRenderStyle();
    },

    changeRenderStyles: function() {

        this.renderStyle();

        this.render();
        this.afterRender();
        this.resizableDestroy();
        this.makeResizable();
    },

    onRenderStyle: function() {
        // to override
    },

    renderSelectByTrigger : function(value){
        this.$el.attr('selected-by-trigger', value);
    },

    renderSelectByPickerMinaiture : function(value){
        //this.$el.attr('selected-by-picker-miniature', value);
        this.$el.attr('selected-by-miniature', value);
    },

    renderSelectByMinaiture : function(value){
        this.$el.attr('selected-by-miniature', value);

        _log('renderSelectByMinaiture component', value, _log.error);
    },

    renderSelectedBy: function( selectedBy, user ){

        var selected = selectedBy.length > 0 ? true : false;

        if(selected){
            this.$el.attr('selected-by', true);
            this.$el.attr('user', selectedBy);
        }else{
            this.$el.attr('selected-by', false);
            this.$el.attr('user', selectedBy);
        }

        _log('renderSelectedBy c selectedBy', selectedBy);

    },

    multiSelect: function(){

        this.trigger('multi-select', this.model);

    },

    dataPickerPicked : function(){

        this.trigger('data-picker-picked-object', this.model, this);
    },

    mouseDown: function(e) {

        _log('mouseDown e', e)

        if($(e.target).is('.ui-resizable-handle')){
            return;
        }

        if(this.model.get('locked')){

            StageView.instance.onMouseDown(e, this.model);

            return;
        }

        if(e.shiftKey){
            this.trigger('select-component', this.model, e);
            this.unstickit();
        }else{
            if (this.multiSelectedComponentsModels == null) {
                this.trigger('select-component', this.model, e);
                this.unstickit();
            }
        }

        //this.makeResizable();
    },

    showContextMenu: function(e) {

        if(StageView.instance.selectedComponentsCollection.length > 1){
            var contextMenuView = new MultiComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }else{
            var contextMenuView = new ComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }
    },


    selectComponent: function() {

        this.makeResizable();
        this.select();
    },

    unselectComponent: function() {

        this.resizableDestroy();
        this.beforeUnselect();
        this.unselect();
    },

    select: function(){
        // To override
    },

    beforeUnselect: function(){
        // To override
    },

    unselect: function(){
        // To override
    },

    onMouseUp :function(e){

        if(e.which == 3){
            return;
        }

        if(StageView.instance.selectedComponentsCollection.length == 1){
            return;
        }

        if(this.model.get('x') != this.model.startX || this.model.get('y') != this.model.startY ){

        }else{
            if(!e.shiftKey){
                this.trigger('select-component', this.model, e);
            }
        }

        StageView.instance.selectedComponentsCollection.each(function(cModel) {

            if(!cModel.get('locked') && !cModel.get('hidden')){

                cModel.startX = cModel.get('x');
                cModel.startY = cModel.get('y');
            }
        });
    },
    addListeners :function(){
        this.listenTo(this.model, 'change:x', this.renderXPosition );
        this.listenTo(this.model, 'change:y', this.renderYPosition );
        this.listenTo(this.model, 'change:width', this.renderWidth );
        this.listenTo(this.model, 'change:height', this.renderHeight );
        this.listenTo(this.model, 'change:styles', this.changeRenderStyles );
        this.listenTo(this.model, 'change:point-sound', this.renderPointSound );
        //this.listenTo(this.model, 'change:triggers', this.renderTriggers );
        //this.listenTo(this.model, 'change:active', this.renderActive );
        this.listenTo(this.model, 'change:locked', this.renderLocked );
        this.listenTo(this.model, 'change:border', this.renderBorder );
        this.listenTo(this.model, 'change:borderRadius', this.renderRadius );
        this.listenTo(this.model, 'change:shadow', this.renderShadow );
        this.listenTo(this.model, 'change:flipX', this.renderFlipX );
        this.listenTo(this.model, 'change:flipY', this.renderFlipY );
    },
    renderBorder :function(){
        var styles = this.model.get('styles');
        var border = {
            'border-top-width': typeof styles['component-inner']['border-top-width'] !== 'undefined' ? styles['component-inner']['border-top-width'] : '0px',
            'border-left-width': typeof styles['component-inner']['border-left-width'] !== 'undefined' ? styles['component-inner']['border-left-width'] : '0px',
            'border-right-width': typeof styles['component-inner']['border-right-width'] !== 'undefined' ? styles['component-inner']['border-right-width'] : '0px',
            'border-bottom-width': typeof styles['component-inner']['border-bottom-width'] !== 'undefined' ? styles['component-inner']['border-bottom-width'] : '0px',
            'border-color': typeof styles['component-inner']['border-color'] !== 'undefined' ? styles['component-inner']['border-color'] : '#000',
            'border-style': typeof styles['component-inner']['border-style'] !== 'undefined' ? styles['component-inner']['border-style'] : 'solid'
        };

        this.$el.find('.component-inner').css(border);
    },
    renderRadius :function(){
        var styles = this.model.get('styles');

        var borderRadius = {
            'border-top-right-radius': typeof styles['component-inner']['border-top-right-radius'] !== 'undefined' ? styles['component-inner']['border-top-right-radius'] : '0px',
            'border-top-left-radius': typeof styles['component-inner']['border-top-left-radius'] !== 'undefined' ? styles['component-inner']['border-top-left-radius'] : '0px',
            'border-bottom-right-radius': typeof styles['component-inner']['border-bottom-right-radius'] !== 'undefined' ? styles['component-inner']['border-bottom-right-radius'] : '0px',
            'border-bottom-left-radius': typeof styles['component-inner']['border-bottom-left-radius'] !== 'undefined' ? styles['component-inner']['border-bottom-left-radius'] : '0px'
        };

        this.$el.find('.component-inner').css(borderRadius);
    },
    renderShadow :function(){

        var styles = this.model.get('styles');

        if (typeof styles['component-inner']['box-shadow'] !== 'undefined') {
            this.$el.find('.component-inner').css('box-shadow', styles['component-inner']['box-shadow']);
        }

        if (typeof styles['component-inner']['-webkit-box-shadow'] !== 'undefined') {
            this.$el.find('.component-inner').css('-webkit-box-shadow', styles['component-inner']['-webkit-box-shadow']);
        }

        if (typeof styles['component-inner']['-moz-box-shadow'] !== 'undefined') {
            this.$el.find('.component-inner').css('-moz-box-shadow', styles['component-inner']['-moz-box-shadow']);
        }

    },
    addComponentListeners :function(){
        // To override
    },

    renderZIndex :function(zIndex){
        this.$el.css('z-index', zIndex);
    },

    renderTriggers: function(){

        var triggers = this.model.get('triggers').length > 0 ? true : false;
        this.$el.attr('triggers', triggers);
    },

    renderPointSound: function(){

        var sound = this.model.get('point-sound') == '' ? false : true;
        this.$el.attr('sound', sound);
    },

    renderActive :function( active, params ){

        var display = active == true ? 'block' : 'none';
        this.$el.attr('active', active);

        this.$el.find('.ui-resizable-handle, .ui-rotatable-handle').css('display', display);


        //if(this.active != active){

            if(active == true){
                this.selectComponent(params);
            }else{
                this.unselectComponent();
            }
        //}
    },

    renderWidth :function(){
        this.$el.css('width', this.model.get('width') +'px');
    },
    renderHeight :function(){
        this.$el.css('height', this.model.get('height') +'px');
    },
    renderXPosition :function(){
        this.$el.css('left', this.model.get('x') +'px');
    },
    renderYPosition :function(){
        this.$el.css('top', this.model.get('y') + 'px');
    },

    beforeRender: function(){
        // To override
    },

    renderForNotEditing: function(){
        // To override
    },

  	render: function(){

        _that = this;

        
        this.endEditing();
        this.beforeRender();

        this.model.setProportions();

        this.$el.html("");

        var componentTemplate = this.template(this.model.toJSON());
        this.$el.html(componentTemplate);

        var hidden = this.model.get('hidden');
        hidden ? this.$el.attr('hidden', 'hidden') : this.$el.removeAttr('hidden');

        this.setPositionToComponent();

        this.makeDraggable();
        // this.makeResizable();

        this.renderStyle( );
        this.renderPointSound( );
        this.renderTriggers( );
        this.renderPath( );
        this.renderFlip( );
        this.renderRotate( );

        // this.renderBorder( );
        // this.renderRadius( );
        // this.renderShadow( );
        this.renderLocked( );
        this.renderSelectedBy(this.model.selectedBy || []);
        

        this.stickit();


        this.renderForNotEditing();

        return this;
  	},

    getElementToRotate: function() {
        var elementToRotate = this.$el.find('.component-inner');

        // if component-styles exists - take it as rotatable container
        if (this.$el.find('.component-styles').push() > 0) {
            elementToRotate = this.$el.find('.component-styles');
        }

        return elementToRotate;
    },

    renderRotate: function() {
        var angle = this.model.get('rotate') || 0;
        var elementToRotate = this.getElementToRotate();
        elementToRotate.css('transform','rotate(' + angle + 'rad)');
        elementToRotate.css('-moz-transform','rotate(' + angle + 'rad)');
        elementToRotate.css('-webkit-transform','rotate(' + angle + 'rad)');
        elementToRotate.css('-o-transform','rotate(' + angle + 'rad)');
    },

    afterRender: function() {
        // to overide
    },

    renderPath: function() {

    },

    setPositionToComponent: function() {

        this.$el.css('position', 'absolute');
        this.$el.css('top', this.model.get('y') + 'px');
        this.$el.css('left', this.model.get('x') + 'px');
        this.$el.css('width', this.model.get('width') + 'px');
        this.$el.css('height', this.model.get('height') + 'px');
    },

    makeRotatable: function() {
        var _that = this;

        var elementToRotate = this.getElementToRotate();

        elementToRotate.rotatable({
            angle: _that.model.get('rotate'),
            rotate: function(e, rotateData) {
                _that.model.set('rotate', rotateData.angle.current, {silent: true});
                _that.model.onComponentRotate(rotateData.angle.current);
            },
            stop: function(e, rotateData) {
                _that.model.set('rotate', rotateData.angle.current);
                _that.model.onComponentRotate(rotateData.angle.current);
                _that.model.trigger('change');
            }
        });
    },

    rotatableDestroy: function() {
        if(this.$el.is('.ui-rotatable')) {
            var elementToRotate = this.getElementToRotate();
            this.$el.rotatable("destroy");
        }
    },

    makeDraggable: function(data) {

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        var _that = this;

        this.draggableTimeout = null;

        data = typeof data === 'undefined' ? {} : data;

        var axis = typeof data.axis !== undefined ? data.axis : false;
        // SET HANDLE FOR OBJECT TYPE
        var handle = '';
        switch(this.model.get('type')) {
            case 'text':
            case 'timer':
            case 'quiz-result':
            case 'form-checkbox':
            case 'form-radio':
            case 'form-submit':
            case 'quiz-connectlines':
            case 'quiz-dnd':
            case 'quiz-fillinblanks':
            case 'infopoint-sound-control':
                handle = '.text-component-handle';
                break;

            default:
                handle = '';
                break;
        }

        this.$el.draggable( {
            // snap: true,
            cursor: 'move',
            axis: axis,
            handle: handle,

            start: function(e, obj) {
                e.stopPropagation();

//                if(e.ctrlKey){
//
//                    var cloneComponentEl = _that.$el.clone();
//
//                    StageView.instance.$el.append(cloneComponentEl);
//
//                    cloneComponentEl.draggable( {
//                        // snap: true,
//                        cursor: 'move',
//                        axis: axis,
//                        handle: handle
//                    });
//
//                    return false;
//                }

                var $this = $(this);
                StageView.instance.selectedComponentsCollection.each(function(cModel) {

                    if(!cModel.get('locked') && !cModel.get('hidden')){

                        cModel.startX = cModel.get('x');
                        cModel.startY = cModel.get('y');
                    }
                });
            },

            stop: function(){
                var $this = $(this);

                var left = parseInt($this.css('left'));
                var top = parseInt($this.css('top'));

                _that.calculatePosition(left, top);
                _that.setPositionChanges(left, top);

                StageView.instance.selectedComponentsCollection.each(function(cModel) {

                    if(!cModel.get('hidden')){
                        cModel.startX = cModel.get('x');
                        cModel.startY = cModel.get('y');
                    }
                });
            },

            drag: function(e) {
                e.stopPropagation();
                var $this = $(this);

                var left = parseInt($this.css('left'));
                var top = parseInt($this.css('top'));

                _that.calculatePosition(left, top);

                _that.model.onComponentDrag({left:left, top:top });
            }
        });

    },

    moveComponent : function( e ){

        var left = this.model.get('x');
        var top = this.model.get('y');

        var moveGrid = parseInt( ProjectModel.instance.get('options').get('move_grid') );

        switch (e.which){

            case 37:
                left -= moveGrid;
                break;

            case 39:
                left += moveGrid;
                break;

            case 38:
                top -= moveGrid;
                break;

            case 40:
                top += moveGrid;
                break;
        }

        this.calculatePosition(left, top, true);
        this.setPositionChanges(left, top);

        this.model.onComponentDrag({left:left, top:top });

    },

    setPositionChanges : function( left, top ){

        this.model.set( { x: left, y: top } , { silent: true });

        if (StageView.instance.selectedComponentsCollection != null) {
            StageView.instance.selectedComponentsCollection.each(function(cModel) {

                if(!cModel.get('locked') && !cModel.get('hidden')){

                    cModel.set({ x: cModel.get('x'), y: cModel.get('y')} );
                    //cModel.set('y', cModel.get('y'), { silent: true });
                }


            });
        }

        this.model.trigger('change', ['x', 'y']);
    },

    calculatePosition : function( left, top, takeSelf ){

        var _that = this;

        if (StageView.instance.selectedComponentsCollection != null) {
            StageView.instance.selectedComponentsCollection.each(function(cModel) {

                if(!cModel.get('locked') && !cModel.get('hidden')){

                    var calculatedX = cModel.startX + (left - _that.model.startX);
                    var calculatedY = cModel.startY + (top - _that.model.startY);
                    cModel.set('x', calculatedX, { silent: true });
                    cModel.set('y', calculatedY, { silent: true });

                    if(cModel.cid != _that.model.cid ){
                        cModel.view.setPositionToComponent();
                    }
                }


            });

            if(takeSelf == true){
                this.setPositionToComponent();
            }
        }
    },

    makeResizable: function() {

        var _that = this;

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        // if (!this.transformTool.exists) {

        //     this.transformTool.el = $('<div>', {
        //         class: 'transform-tool'
        //     });
        //     this.transformTool.el.css({
        //         width: _that.$el.css('width'),
        //         height: _that.$el.css('height'),
        //         top: _that.$el.css('top'),
        //         left: _that.$el.css('left'),
        //         position: 'absolute'
        //     });
        //     StageView.instance.$el.append(this.transformTool.el);

        //     this.transformTool.el.resizable({

        //         alsoResize: _that.$el,

        //         handles: "n, e, s, w, nw, ne, sw, se",

        //         start: function() {
        //             var aspectRatio = _that.model.get('aspectRatio');
        //             $(this).resizable( "option", "aspectRatio", aspectRatio );
        //         },

        //         resize: function(event, obj){
        //             _that.objectOnResize(event, $(obj.element));
        //         },

        //         stop: function() {
        //             _that.model.set('width', parseInt( $(this).css('width') ) );
        //             _that.model.set('height', parseInt( $(this).css('height') ) );
        //             _that.model.set('x', parseInt( $(this).css('left') ) );
        //             _that.model.set('y', parseInt( $(this).css('top') ) );

        //             _that.afterResize();
        //         }
        //     });

        //     this.transformTool.exists = true;
        // }




        this.$el.resizable({
            handles: "n, e, s, w, nw, ne, sw, se",

            start: function(e) {

                var aspectRatio = _that.model.get('aspectRatio');
                $(this).resizable( "option", "aspectRatio", aspectRatio );
            },

            resize: function(event, obj){
                _that.objectOnResize(event, $(obj.element));

                var width = parseInt( $(this).css('width'));
                var height = parseInt( $(this).css('height'));

                _that.model.onComponentResize({width:width, height:height })
            },

            stop: function() {

                var width = parseInt( $(this).css('width'));
                var height = parseInt( $(this).css('height'));
                var x = parseInt( $(this).css('left') );
                var y = parseInt( $(this).css('top') );

                _that.model.set({ width:width, height:height, x:x, y:y }, {silent:true} );


                _that.model.setProportions();

                _that.model.trigger('change', ['width', 'height', 'aspectRatioProportions']);

                _that.afterResize();
            }
        });

        
        this.makeRotatable();

        // this.$el.find('.ui-resizable-handle').hide();
    },

    afterResize: function() {
        // to override
    },

    resizableDestroy: function() {

        // if (this.transformTool.exists) {
        //     this.transformTool.el.remove();
        //     this.transformTool.exists = false;
        // }


        if(this.$el.is('.ui-resizable')) {
            this.$el.resizable("destroy");
        }
        this.rotatableDestroy();
    },

    draggableDestroy: function() {

        if(this.$el.is('.ui-draggable')){
            this.$el.draggable("destroy");
        }
    },

    objectOnResize: function(event, obj) {
        // to override
    },

  	getModel: function() {
    	return this.model;
  	},

    destroy: function(){

        _log('destroy', this);

        this.model.off();
        this.beforeDestroy();
        this.unselect();
        this.unbind();
        this.draggableDestroy();
        this.resizableDestroy();
        this.remove();
    },

    othersComponentsDestroyed: function(allComponentsCollection){
        this.model.trigger('other-components-destroyed');
    },

    beforeDestroy: function(){
        // To overrode
    },

    checkIfCanEditing: function() {
        if(StageView.instance.selectedComponentsCollection.length > 1 || this.model.get('locked') || !StageView.instance.canEdit){
            return false;
        }else{
            return true;
        }
    },

    startEditing: function(){

    },

    endEditing: function(){

    },

    preventDragging: function(e) {
        e.preventDefault();
    },

    renderFlipX: function(){
        this.renderFlip();
    },

    renderFlipY: function(){
        this.renderFlip();
    },

    renderFlip: function(){

        var flipX = this.model.get('flipX');
        var flipY = this.model.get('flipY');

        var componentInner = this.$el.find('.component-inner');

        componentInner.removeClass('xnormal-ynormal xflip-ynormal xnormal-yflip xflip-yflip');
        componentInner.addClass(flipX+'-'+flipY);
    },

    onComponentAdded: function(data){
        // To override
    },

    copyComponentsFromOtherProject: function(){
        this.trigger('copy-components-from-other-project', this.model);
    },

});


ComponentView.createNotEditableComponentClass = function(Class){

    var component = Class.extend({

        makeDraggable: function(){

        },

        makeResizable: function(){
            
        },

        startEditing: function(){

        },

        endEditing: function(){

        },

        renderForNotEditing: function(){
            this.$el.find('.loaded-dropzone').remove();
            this.$el.find('.edit-component-button').remove();
        },

        renderActive :function( active ){

            var display = active == true ? 'block' : 'none';
            this.$el.attr('active', active);

            this.$el.attr('selected-second', active);

            if(active == true){
                this.selectComponent();
            }else{
                this.unselectComponent();
            }
        },

        showContextMenu: function(e) {

            if(this.multiSelectedComponentsModels.length > 1){
                var contextMenuView = new MultiComponentContextMenuViewNotEditable({ model: this.getModel(), view: this });
                ContextMenuContainer.addMenu(contextMenuView, e);
            }else{
                var contextMenuView = new ComponentContextMenuViewNotEditable({ model: this.getModel(), view: this });
                ContextMenuContainer.addMenu(contextMenuView, e);
            }
        },

    });

    return component;
}


