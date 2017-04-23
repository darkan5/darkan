var StageView = ItemView.extend({

	//el: '#scene',

    className: 'stage-view-wrapper',

    template: _.template($('#stage-view-template').html()),

    
    canEdit : true,

    // copyComponentsCollection: new ComponentCollection(),
    // cutComponentsCollection: new ComponentCollection(),
    // duplaicateComponentsCollection: new ComponentCollection(),
    // sourcePageId : null,
    // sourcePageIdFromCutElement : null,
    // sourceProjectId : null,
    // sourceUserId : null,
    // copyStatus : '',
    // cutClonedComponentsCollection: new ComponentCollection(),

    
    copiedComponentPosition : [],
    copiedComponentDimensions : [],
    copiedComponentStyle : {},


    events: {

    },

    bindings: {
        //'[name="lines"]': 'lines'
    },

    initialize: function() {
        var _that = this;

        this.selectedComponentsCollection = new ComponentCollection();

        this.stageSelector = new StageSelector();
        this.stageSelector.on('change', this.onSelectionChanged, this);
        this.stageSelector.$el = this.$el;
        this.stageSelector.scc = this.selectedComponentsCollection;
        this.stageSelector.model = this.model;
        this.stageSelector.start();

        this.timeout = function(){};
    },

    selectAllComponents: function(){

        var _that = this;

        this.selectedComponentsCollection.reset();

        this.model.get('lines').each(function(rowModel){
            rowModel.get('objects').each(function(cModel){

                _that.stageSelector.selectMultiComponents(cModel);

            });
        });
    },

    selectOneComponent: function(cModel, e){

        this.stageSelector.selectOneComponent(cModel, e);

        //this.trigger('select-multiple-components', scc, this );
    },

    selectMultiComponents: function(cModel){
        this.stageSelector.selectMultiComponents(cModel);
    },

    selectMultiComponentsSilent: function(cModel){
        this.stageSelector.selectMultiComponentsSilent(cModel);
    },

    selectCopmponents: function(cc){

        this.stageSelector.reset();
        cc.each(this.stageSelector.selectMultiComponents, this.stageSelector);
    },

    unsetActiveComponents: function(){
        this.stageSelector.reset();
    },

    onSelectionChanged: function(scc, params){

        var _that = this;

        clearTimeout(this.selectorTimeout);

        this.selectorTimeout = setTimeout(function(){
            // _log('selectedComponentsCollection', _that.selectedComponentsCollection);
            // _log('scc', scc);

            params = params || {};

            if(params.s == true){
                return;
            }


            if(scc.length == 0){
                _that.trigger('on-stage-selected', _that.model);
                _that.stageSelector.selectComponentsByUser(scc);
                return;
            }

            if(scc.length == 1){
                _that.trigger('on-component-selected', scc.first());
                _that.stageSelector.selectComponentsByUser(scc);
                return;
            }

            if(scc.length > 1){
                _that.trigger('on-components-selected', scc);
                _that.stageSelector.selectComponentsByUser(scc);
                return;
            }



        }, 50);

        
    },

    mouseDown: function(e, componentModel) {

        switch(e.button) {

            case 0:

                this.stageSelector.createSelector(e);

                break;
        }
    },

    

    

    renderZIndex: function(){

        var zIndex = 1;

        var lines = this.model.get('lines');

        for (var i = this.model.get('lines').length - 1; i >= 0; i--) {
            var rowModel = lines.at(i);
            var objects = rowModel.get('objects');

            for (var j = objects.length - 1; j >= 0; j--) {
                var componentModel = objects.at(j);

                componentModel.setZIndex( zIndex );

                zIndex++;
            }

        };
    },

    afterRender: function(){

    },

    renderStage: function(){

        var template = this.template(this.model.toJSON());
        this.$el.html(template);

        return this;
    },

	render: function(){

        var _that = this;

    
        _log('this.model', this.model);

        var template = this.template(this.model.toJSON());
        this.$el.html(template);


        this.renderBackgroundImage();
        this.renderDimentions();
        this.renderScenePosition();

        this.model.get('lines').each(this.renderSingleLine, this);

        this.renderStyle();

        // var bgColor = this.model.get('options').get('bgcolor') !== '' ? this.model.get('options').get('bgcolor') : '#FFF';

        // this.$el.find('.stage-view').css('background-color', bgColor);

        this.updateTimeline();

        this.selectComponentsOnStart();

        this.trigger('on-stage-render', this.model);

		return this;
	},


    updateTimeline: function(){
        this.trigger('update-timeline');
    },

    renderBackgroundImage: function(  ){

        _log('renderBackgroundImage', '', _log.timeline);


        if (this.model.get('options').get('image') !== '') {


            var appLink = __meta__.APP_LINK;

            var userId = this.model.ownerId;
            //var userId = __meta__.ownerID;
            var projectId = this.model.projectId;
            var pageId = this.model.get('options').get('pageid');
            var image = this.model.get('options').get('image');
            var r = '?r=' + new Date().getUTCMilliseconds();

            //var path = __meta__.APP_LINK + 'projects/' + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/' + this.model.get('options').get('pageid') +'/imgpage/' + this.model.get('options').get('image') + '?r=' + new Date().getUTCMilliseconds();

            var path = __meta__.projects_link + userId + '/' + projectId + '/pre/exported_view/' + pageId + '/imgpage/' + image;

            this.$el.find('.stage-view').css({
                'background-image': 'url(\'' + path + '\')',
                'background-repeat': 'no-repeat',
                'background-position': '50% 50%',
                'background-size': '100% 100%'
            });
        } else {
            
             this.$el.find('.stage-view').css('background', '');
        }

        this.renderBackgroundColor();

    },

    renderDimentions: function() {
        this.$el.find('.stage-view').css({
            width: this.model.get('options').get('width') + "px",
            height: this.model.get('options').get('height') + "px",
        });
    },

    renderScenePosition: function() {
        var sceneHeight = this.model.get('options').get('height');
        var top = 'calc(50% - ' + sceneHeight/2 + 'px)';
        if (sceneHeight >= _layout.scene_wrapper.height()) { 
            top = 0; 
        }
        this.$el.css({
            top: top
        });
    },

    renderBackgroundColor: function(color) {

        var bgColor;

        if (color) {
            bgColor = color;
        } else {
            bgColor = this.model.get('options').get('bgcolor') != '' ? this.model.get('options').get('bgcolor') : '#FFF';
        }

        _log('bgColor1', bgColor);
        _log('bgColor2', this.model.get('options').get('bgcolor'));
        
        this.$el.find('.stage-view').css('background-color', bgColor);

    },


	renderSingleLine: function( lineCollection ){

		lineCollection.get('objects').each(this.renderSingleComponent, this);

	},

	renderSingleComponent :function( componentModel ){

        var _that = this;

        componentModel.ownerId = this.model.ownerId;
        componentModel.projectId = this.model.projectId;

		var componentView = ComponentFactory.createComponentByModel( componentModel );
		this.$el.find('.stage-view').append(componentView.render().$el);
        componentView.afterRender();

        componentView.on('select-component', function(cModel, e){

            //if(!cModel.get('locked') && !cModel.get('hidden')){
            // if(!cModel.get('locked') && !cModel.get('hidden')){
            //     //_that.setActiveModel( cModel, e );


            //     _that.selectOneComponent(cModel, e);
            // }

            _that.selectOneComponent(cModel, e);

            //_that.selectedComponentsCollection.remove(cModel);
            //_that.addToSelectedComponentsCollection(cModel);
        });

        componentView.on('save-changes', function(cModel, params){

            _that.saveComponent( cModel, params );
        });

        componentView.on('multi-select', function(cModel){

            // if(!cModel.get('locked') && !cModel.get('hidden')){
            //     _that.addToSelectedComponentsCollection(cModel);
            // }

            _that.selectMultiComponents(cModel);

        });

        componentView.off('data-picker-picked-object');
        componentView.on('data-picker-picked-object', function(cModel){

            _that.dataPickerPicked( cModel );

        });

        componentView.on('show-popup', function(data, sender){

             _that.showPupup(data, sender);
        });

        componentView.on('show-image-window', function(sender){

            _that.trigger('show-image-window', sender);
        });


        return componentView;
	},

    showPupup :function(data, sender){

        var popup = PopupFactory.createStandardPopup( data, sender );

        console.log("showPupup", popup);

        $('body').append(popup.render().$el);
    },

    // unselectModels :function( cmodel ){

    //     this.timeline.collection.each(function(item) {
    //         var objects = item.get('objects');

    //         objects.each(function(model){

    //             if(cmodel != undefined){
    //                 if(model.cid != cmodel.cid){
    //                     model.setActive( false );
    //                 }
    //             }else{
    //                 model.setActive( false );
    //             }
    //         });

    //     });

    //     //User.getModel().get('activeComponent').setActive( false );
    // },

    // setActiveModelAfterRender : function(){

    //     this.selectedComponentsCollection.each( function(componentModel){
    //         componentModel.setActive( true );
    //     } );
    // },

    // setActiveModels :function( model, triggerUp ){

    //     var _that = this;

    //     this.selectedComponentsCollection = model;

    //     this.unselectModels( model );

    //     this.selectedComponentsCollection.each( function(componentModel){
    //         componentModel.setActive( true, _that.selectedComponentsCollection);
    //     } );


    //     if(triggerUp == true){
    //         this.trigger('select-multiple-components', this.selectedComponentsCollection, this );
    //     }
    // },

    // unsetActiveModels :function(){

    // },

    // selectCopmponents :function( cc ){

    //     this.selectedComponentsCollection.each(function(cModel){
    //         cModel.view.endEditing();
    //         cModel.setActive( false );
    //     });

    //     this.selectedComponentsCollection.reset();
    //     this.selectedComponentsCollection = cc;

    //     cc.each(function(cModel){
    //         cModel.setActive( true, cc);
    //     });

    //     this.trigger('select-multiple-components', this.selectedComponentsCollection, this);

        
    // },

    // setActiveModel :function( model, e ){

    //     var _that = this;

    //     this.selectedComponentsCollection.each(function(cModel){

    //         if(cModel.view){
    //             cModel.view.endEditing();
    //         }

    //     });


    //     if(e != undefined && e.shiftKey){

    //         if(this.selectedComponentsCollection.contains( model )){
    //             if (!$(e.target).hasClass('ui-resizable-handle')) {
    //                 this.selectedComponentsCollection.remove(model);
    //                 model.setActive( false );
    //             }
    //         }else{

    //             if(!model.get('locked') && !model.get('hidden')){
    //                 this.addToSelectedComponentsCollection( model );
    //             }

    //             model.setActive( true, _that.selectedComponentsCollection );
    //         }

    //     }else{

    //         this.selectedComponentsCollection.reset();

    //         this.unselectModels( model );
    //         model.setActive( true, this.selectedComponentsCollection );
    //         //User.getModel().set('activeComponent', model);

    //         //if(!model.get('locked') && !model.get('hidden')){
    //         if(!model.get('locked')){
    //             this.addToSelectedComponentsCollection( model );
    //         }
    //     }

    //     //this.trigger('select-component', model);

    //     this.trigger('select-multiple-components', this.selectedComponentsCollection, this );
    // },


    cleanBeforeClose :function(){

        this.createPageThumb();

        // this.deleteCutComponentsCollection();
        this.unsetPageSelectionBy();
    },

    unsetPageSelectionBy :function(){

        RightMenuView.instance.pageListView.unsetSelectionBy();
    },


    moveActiveComponents: function(e){

        if (this.selectedComponentsCollection.length) {
            var firstComponentModel = this.selectedComponentsCollection.first();
            firstComponentModel.view.moveComponent(e);
        }
        

    },

    hideComponents: function(){

        this.selectedComponentsCollection.each(function(componentModel){
            componentModel.set('hidden', true);
            componentModel.view.forceRender();
            componentModel.miniatureView.render();
            componentModel.miniatureView.afterRender();
        });
    },

    showComponents: function(){

        this.selectedComponentsCollection.each(function(componentModel){
            componentModel.set('hidden', false);
            componentModel.view.forceRender();
            componentModel.miniatureView.render();
            componentModel.miniatureView.afterRender();
        });
    },


    copyPosition: function(){
        var firstCopmonentModel = this.selectedComponentsCollection.first();
        var x = firstCopmonentModel.get('x');
        var y = firstCopmonentModel.get('y');

        this.copiedComponentPosition = {x:x, y:y}
    },

    pastePosition: function(){
        // var firstCopmonentModel = this.selectedComponentsCollection.first();
        // firstCopmonentModel.pastePosition( this.copiedComponentPosition );

        var _that = this;

        this.selectedComponentsCollection.each(function(cModel){
            cModel.pastePosition( _that.copiedComponentPosition, true);
        });

        var firstModel = this.selectedComponentsCollection.first();

        if(firstModel){
            firstModel.trigger('change', ['x', 'y']);
        }
    },

    copyDimension: function(){
        var firstCopmonentModel = this.selectedComponentsCollection.first();
        var width = firstCopmonentModel.get('width');
        var height = firstCopmonentModel.get('height');

        this.copiedComponentDimensions = {width:width, height:height}
    },

    pasteDimension: function(){

        var _that = this;

        this.selectedComponentsCollection.each(function(cModel){
            cModel.pasteDimension( _that.copiedComponentDimensions, true );
        });

        var firstModel = this.selectedComponentsCollection.first();

        if(firstModel){
            firstModel.trigger('change', ['width', 'height']);
        }
    },

    copyStyle: function(){
        var firstCopmonentModel = this.selectedComponentsCollection.first();
        var style = firstCopmonentModel.get('styles');

        var type = firstCopmonentModel.get('type')

        if(style != undefined){
            this.copiedComponentStyle[type] = JSON.stringify( style );
        }
    },

    pasteStyle: function(){
        // var firstCopmonentModel = this.selectedComponentsCollection.first();
        // firstCopmonentModel.pasteStyle( this.copiedComponentStyle );

        var _that = this;

        this.selectedComponentsCollection.each(function(cModel){
            cModel.pasteStyle( _that.copiedComponentStyle, true );
        });

        var firstModel = this.selectedComponentsCollection.first();

        if(firstModel){
            firstModel.trigger('change', ['styles']);
        }
    },



    pastePositions: function(){

        var _that = this;

        this.selectedComponentsCollection.each(function(cModel){
            cModel.pastePosition( _that.copiedComponentPosition, true );
        });

        var firstComponentModel = this.selectedComponentsCollection.first();
        firstComponentModel.trigger('change');

    },

    pasteDimensions: function(){

        var _that = this;

        this.selectedComponentsCollection.each(function(cModel){
            cModel.pasteDimension( _that.copiedComponentDimensions, true );
        });

        var firstComponentModel = this.selectedComponentsCollection.first();
        firstComponentModel.trigger('change');
    },

    pasteStyles: function(){

        var _that = this;

        this.selectedComponentsCollection.each(function(cModel){
            cModel.pasteStyle( _that.copiedComponentStyle, true );
        });

        var firstComponentModel = this.selectedComponentsCollection.first();
        firstComponentModel.trigger('change');
    },


    deleteActiveComponent : function( ){

        // To override
    },



    // unselectComponentsAndSelectStage : function( e, componentModel ){


    //     this.mouseDown(e, componentModel);

    //     this.unselectModels();

    //     this.trigger('on-stage-selected', this.model, this);
    // },

    selectStage : function( componentModel ){

        this.trigger('on-stage-selected', this.model, this);
    },

    deleteFromCutCopyComponents : function( componentModel ){

        this.trigger('delete-from-cut-copy-collection', componentModel, this);
    },

    addComponent : function( componentModel, onComponentAdded ){
        // To override
    },
    
    
	setModel: function( model ) {

        var _that = this;

        this.canEdit = true;



        if(model != undefined){  


            this.createPageThumb();

            this.stageSelector.reset();

            this.model = model;
            this.stageSelector.model = model;

            if(model.view){
                model.view.reloadEvents();
            }

            //this.model.get('options').off("change:premade-style");
            this.model.get('options').on("change:premade-style", this.renderStyle, this);

            this.listenTo(this.model.get('options'), 'change:width', this.renderDimentions );
            this.listenTo(this.model.get('options'), 'change:height', this.renderDimentions );
            this.listenTo(this.model.get('options'), 'change:bgcolor', this.renderBackgroundColor );
            this.listenTo(this.model.get('options'), 'change:image', this.renderBackgroundImage );
        }


        this.render();
        this.renderZIndex();

        

        clearTimeout(this.TO);
        this.TO = setTimeout(function() {
            _that.turnOnMenus();

            var textModel = new TextModel( { x:-999, y:-999, width:0, height:0 } );
            var textComponent = new TextComponentView( { model: textModel } );
            _that.$el.append(textComponent.render().$el);
            textComponent.startEditing(false);
            textComponent.endEditing();

            //_that.trigger('on-stage-render', _that.model);

        }, 100);
  	},

    // setSecondModel: function(model){

    //     this.canEdit = false;

    //     if(model != undefined){

    //         this.unsetActiveModels();

    //         this.timeline.collection = model.get('lines');
    //         this.model = model;
    //         this.timeline.model = model;
    //     }

    //     this.render();
    //     this.renderZIndex();

    //     this.turnOffMenus();
    // },


    turnOffMenus: function(){


        BottomMenuView.instance.hideMenu(function(){
            _layout.menu_bottom.css('display', 'none');
        });


        _layout.menu_bottom.trigger('hideMenu');
        $('.trigger-window').css('display', 'none');
        $('#menu-left').css('disabled', 'disabled');
    },

    turnOnMenus: function(){
        $('#menu-bottom').css('display', 'block');
        $('.trigger-window').css('display', 'block');
        $('#menu-left').css('disabled', 'enabled');
    },

    renderStyle: function( className ){

        this.$el.attr('class', this.model.get('options').get('premade-style'));
    },


    saveComponent :function( componentModel, params ){

        // To overide
    },

    getAllComponentsModels: function(){

        var componentsModels = [];

        this.model.get('lines').each(function(lineCollection){
            lineCollection.get('objects').each(function(componentModel){
                componentsModels.push(componentModel);
            }, this);
        }, this);

        return componentsModels;
    },

    dataPickerPicked: function( model ){

        this.trigger('data-picker-picked', model);
    },

    getComponentModelByActionkey : function( actionkey ){
        return this.model.getComponentModelByActionkey(actionkey);
    },

    replaceComponentModel : function( oldComponentModel, newComponentModel ){
        return this.model.replaceComponentModel(oldComponentModel, newComponentModel);
    },

    getRowModelByLineId: function(lineId){
        return this.model.getRowModelByLineId(lineId);
    },

    // clearStage: function(){

    //     if(this.timeline.collection != undefined){
    //         this.timeline.resetTimeline();
    //         this.render();
    //     }
    // },

    // resetStage: function(){

    //     this.clearStage();

    //     // this.selectedComponentsCollection.reset();
    //     // this.copyComponentsCollection.reset();
    //     // this.cutComponentsCollection.reset();
    //     // this.sourcePageId = null;
    //     // this.sourceProjectId = null;
    //     // this.sourceUserId = null;
    //     // this.copyStatus = '';

    //     this.copiedComponentTrigger = [];
    //     this.copiedComponentPosition = [];
    // },

    cutComponents: function(){

        // To override
    },

    duplicateComponents: function(){

        // To override
    },

    copyComponents: function(){

        // To override
    },

    // duplicateComponents: function(){

    //     var componentsCollection = new ComponentCollection();

    //     this.selectedComponentsCollection.each(function(model){
    //         componentsCollection.add(model);
    //     });

    //     this.duplaiateComponentsCollection =  this.getSortedComponentsFromTimeLine(componentsCollection);
    //     this.sourcePageId = '' + this.model.get('options').get('pageid');
    //     this.sourceProjectId = this.model.get('options').get('projectId');
    //     this.sourceUserId = this.model.get('options').get('userId');
    //     this.copyStatus = 'copy';

    // },


    getSortedComponentsFromTimeLine: function(componentsCollection, reverse){

        reverse = reverse == undefined ? true : reverse;

        var sortedComponentsCollection = new ComponentCollection();
        var allComponentsCollection = this.getAllComponentsModels();

        if(reverse){
            for (var i = allComponentsCollection.length - 1; i >= 0; i--) {
                var tModel  = allComponentsCollection[i];

                if(componentsCollection.contains(tModel))  {
                    sortedComponentsCollection.add(tModel);
                }
            };
        }else{
            for (var i = 0; i < allComponentsCollection.length; i++) {
                var tModel  = allComponentsCollection[i];

                if(componentsCollection.contains(tModel))  {
                    sortedComponentsCollection.add(tModel);
                }
            };
        }

        return sortedComponentsCollection;
    },

    pasteComponents: function(hash){
        // To overide
    },

    // disabledActiveComponents: function(){

    //     var _that = this;

    //     if(!this.canEdit){ return; }

    //     if(_that.selectedComponentsCollection.length <= 0){ return; }

    //     this.selectedComponentsCollection.each(function(componentModel){
    //         _that.timeline.disableComponentModel( componentModel );
    //     });
    // },

//     enabledActiveComponents: function(){

// //        var _that = this;
// //
// //        if(!this.canEdit){ return; }
// //
// //        if(_that.selectedComponentsCollection.length <= 0){ return; }
// //
// //        this.selectedComponentsCollection.each(function(componentModel){
// //            _that.timeline.deleteComponentModel( componentModel );
// //        });
//     },

    deleteAllComponents: function(){

        this.model.get('lines').each(function(rowModel){
            rowModel.get('objects').each(function(componentModel){
                componentModel.view.destroy();
            });
        });
    },

    createPageThumb : function(onResult){
        // To override
    },

    componentExist: function(actionkey){
        return this.model.componentExist(actionkey);
    },

    // addToSelectedComponentsCollection: function(componentModel){


    //     if(!this.selectedComponentsCollection.contains(componentModel)){
    //         this.selectedComponentsCollection.add(componentModel);
    //     }

    //     // this.selectedComponentsCollection.add(componentModel);

    //     // var allComponents = this.getAllComponentsModels();

    //     // var componentsCollection = new ComponentCollection();


    //     // for (var i = allComponents.length - 1; i >= 0; i--) {
    //     //     var aModel = allComponents[i];

    //     //     //_log('aModel', aModel);

    //     //     for (var j = this.selectedComponentsCollection.length - 1; j >= 0; j--) {
    //     //         var cModel = this.selectedComponentsCollection.at(j);

    //     //         //_log('cModel', cModel);

    //     //         if(aModel.cid == cModel.cid){
    //     //             componentsCollection.add(cModel);
    //     //         }
    //     //     };
    //     // };

    //     // _log('getSortedSelectedComponentsCollection', componentsCollection)


    //     // this.selectedComponentsCollection = componentsCollection
    // },

    showContextMenu: function(e) {

        // To override
    },

    onWindowResize: function(){

    },

    selectComponentsOnStart: function(){
        // To override
    },

    addMultiComponents: function(){
        // To override
    }

    

    

});

StageView.instance = {};