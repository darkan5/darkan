var PageOptions = Backbone.Model.extend({

    pdfSelected: true,
    pdfNoteSelected: true,

	defaults:{
		pagename: "",
		name: "",
		bgcolor: "",
		width : 860,
		height : 500,
		bg_pos_x: 0,
		bg_pos_y: 0,
		active: 1,
        pageid: 0,
		order : 0,
		soundfilename : "",
        volume: 100,
		locknavi : false,
		locknavitrigger: false,
		lockscroll: false,
		'page-end-action': "none",
        image: "",
		note: "",
        lastLineId: 0,
        lastComponentId: 0,
        slideTime: 60,
        //activeRow: null,
        activeComponent: null,
        triggers: [],
        title : '',
        wcag : '',
        stageLifetime : 60,
        selectedBy: [],
        timeOnPage: 0,
        goToNextPage: false,
        highlightButtons: true
	},

    initialize: function(){

        var parallaxExsists = this.get('parallax');
        if (!parallaxExsists) {
            var blankParallaxObject =  this.createParallaxObject();
            this.set('parallax', blankParallaxObject, {silent:true});
        }

    },

    createParallaxObject: function() {
        var parallax = {
            cursor:{
                sens:0,
                dir:false,
                on:false
            },
            scroll:{
                sens:0,
                on:false
            }
        }
        return parallax;
    },

    getTriggerWhenDoIt :function(){

        var triggerWhenDoIt = new TriggerActionsCollection();

        var triggerActionModel = new TriggerActionModel({ group: _lang('NEW_PAGE_TITLE'), options: [
            { name: _lang('TRIGGER_PAGE_LOAD'), value:'onPageLoaded' }
        ] });

        triggerWhenDoIt.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_KEYBOARD'), options: [
            { name: _lang('TRIGGER_ON_KEY_DOWN'), value:'keydown' }
        ] });

        triggerWhenDoIt.add( triggerActionModel );

        return triggerWhenDoIt.toJSON();
    },

    getTriggerWhatToDo :function(){

        var triggerWhatToDo = new TriggerActionsCollection();

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_LINE'), options: [
            { name: _lang('TRIGGER_SHOW_NEXT_LINE'), value:'showNextLine' }
        ] });

        triggerWhatToDo.add( triggerActionModel );

        return triggerWhatToDo.toJSON();
    },

    setProportions: function() {
        return;
    },

    setFileName: function(data) {
        this.set('soundfilename', data.fileName);
    },

    setImageFileName: function(data){

        this.set('image', data.fileName);


        // this.set('image', data.fileName, { silent: true });

        // this.trigger('change:image');
        // this.trigger('change');

        //this.trigger('imege-changed');

    },

    getExtensionPageSoundArray : function(){
        // sound, folder: audio
        return ['mp3'];
    },

    getExtensionPageImageArray: function(){
        return ['png', 'jpg', 'jpeg'];
    },

    getExtensionFilesArray : function(){
        // sound, folder: files
        return [];
    },

    getExtensioAudioArray : function(){  // Punkt z dzwiekiem
        // sound, folder: audio
        return [];
    },

    getExtensionImagesArray : function(){
        return [];
    },

    getExtensionSoundsArray : function(){ // Wszystkie komponenty
        // point-sound, folder: sounds
        return [];
    },

    getExtensionVideosArray : function(){
        return [];
    },

    getExtensionSwfArray : function(){
        return [];
    },

    getExtensionGalleryArray : function(){
        return [];
    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionPageImageArray();
        var _soundTypes = this.getExtensionPageSoundArray();
        var acceptTypeString = '';

        _.each(_mainTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        _.each(_soundTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    setStyle: function(templateStyle){
        this.set('premade-style', templateStyle );
    },

    triggerChanged: function() {
        this.trigger('trigger-changed', this);
    },

    isDndElement: function() {
        return false;
    },


});

var PageModel = Backbone.Model.extend({

    isSelected: false,

    projectId : __meta__.projectID,
    userId : __meta__.userID,
    ownerId : __meta__.ownerID,

	defaults:{
		options : new PageOptions(),
		lines: new TimelineRowCollection(),
		draw : [],
        type: 'page'
	},
    initialize :function(){
        this.ownerId = __meta__.ownerID;
    },

    setCheckboxSelected: function(value) {
        this.trigger('checkbox-selected', value, this);
    },

    updateComing :function( m ){

        this.trigger('update-coming', m);
    },

    setActive :function( value ){

       this.trigger('set-active', value);
    },

    selectedByMiniature: function(value){

        this.trigger('selected-by-miniature', value);
    },

    selectedByPickerMiniature: function(value){
        this.trigger('selected-by-picker-miniature-1', value);
    },

    selectedByTrigger : function(value){
        this.trigger('selected-by-trigger', value);
    },

    addNewLine : function(){


    },

    updateDinamicPageThumb: function() {
        this.trigger('update-dintamic-page-thumb');
    },

    setActiveComponent: function(componentModel){

        this.get('options').set('activeComponent', componentModel);

    },

    getActiveComponent: function(){

        var activeComponent = this.get('options').get('activeComponent');

        return activeComponent;
    },

//    deleteComponent : function( componentModel ){
//
//        clearTimeout( this.timeout );
//
//        DataAccess.updatePage(
//            this,
//            function(data) { console.log('Update page successed: ' , data) },
//            function(data) { console.log('Update page failed: ' , data) }
//        );
//    },

//    addComponent : function( componentModel ){
//
//        //this.get('lines').at(0).addNewComponent(componentModel);
//
//        var activeRow = this.get('options').get('activeRow');
//
//
//        activeRow.addNewComponent(componentModel);
//
//        //console.log("activeRow");
//        //console.log(activeRow);
//
////        DataAccess.updatePage(
////            this,
////            function(data) { console.log('Update page successed: ' , data) },
////            function(data) { console.log('Update page failed: ' , data) }
////        );
//    },

    saveChanges :function(){

        var _that = this;

        DataAccess.updatePage(
            _that,
            function(data) { console.log('Update page successed: ' , data) },
            function(data) { console.log('Update page failed: ' , data) }
        );

    },


    getAllComponentsCollection: function(){

        var componentCollection = new ComponentCollection();

        var linesCollection = this.get('lines');

        linesCollection.each(function(rowModel){

            var objects = rowModel.get('objects');

            objects.each(function(cModel){
                componentCollection.add(cModel);
            });
        });


        return componentCollection;
    },

    updateComponentsCollection: function(data){

        var cc = new ComponentCollection();

        var components = data.components;

        if(!_.isArray(components)){
            return cc;
        }

        var actionkeys = _.pluck(components, 'actionkey');

        //_log(actionkeys, actionkeys, _log.error);

        var linesCollection = this.get('lines');

        

        linesCollection.each(function(rowModel){

            var objects = rowModel.get('objects');


            objects.each(function(cModel){

                var actionkey = cModel.get('actionkey');

                var index = actionkeys.indexOf(actionkey);

                if(index !== -1){
                    var component = components[index];

                    cModel.onlyRefresh = true;

                    for (var item in component) {

                        cModel.set(item, component[item]);
                    };

                    cModel.onlyRefresh = false;

                    cc.add(cModel);
                }
            });
        });

        return cc;
    },

    actionkeyExists: function(actionkey) {
        var allComponentsCollection = this.getAllComponentsCollection();
        var findExistingActionkey = allComponentsCollection.where({actionkey: actionkey}); 

        if (findExistingActionkey.length > 0) return true;

        return false;
    },

    createActionkey :function(){
        //return __meta__.loginHashed - licznikKomponentow - numerstrony;

        var loginHashed = __meta__.loginHashed;
        var lastComponentId = this.get('options').get('lastComponentId');
        var pageid = this.get('options').get('pageid');

        var actionkey = loginHashed + '-' + lastComponentId + '-' + pageid;

        
        // actionkey not exists yet, go along
        if (!this.actionkeyExists(actionkey)) {
            _log('THIS ACTIONKEY NOT EXISTS YET, GO ALONG', actionkey);
            this.get('options').set('lastComponentId', lastComponentId + 1);
            return actionkey;

        // whoa! this actionkey already exists on stage, make new one
        } else {
            _log('WHOA! this actionkey already exists on stage, make new one', actionkey, _log.error);
            this.get('options').set('lastComponentId', lastComponentId + 1);
            return this.createActionkey();
        }
    },


    updatePagethumb: function() {
        this.trigger('update-pagethumb');
    },


    getLineById: function(lineId) {

    },

    getComponentsByType : function(type){

        var componentCollection = new ComponentCollection();

        var linesCollection = this.get('lines');

        linesCollection.each(function(rowModel){

            var objects = rowModel.get('objects');

            objects.each(function(cModel){

                if(cModel.get('type') == type){
                    componentCollection.add(cModel);
                }
            });
        });


        return componentCollection;
    },

    getDndsComponents : function(){

        return this.getComponentsByType('quiz-dnd');
    },

    getPageId: function(){
        return this.get('options').get('pageid');
    },















    getComponentModelByActionkey : function( actionkey ){

        var componentModel;

        this.get('lines').each(function(item) {
            var objects = item.get('objects');

            objects.each(function(model){

                if(model.get('actionkey') == actionkey  ){
                    componentModel =  model;
                }
            });
        });

        return componentModel;
    },

    componentExist: function(actionkey){

        var exist = false;

        this.get('lines').each(function(row) {
            row.get('objects').each(function(model){
                if(model.get('actionkey') == actionkey){
                    exist = true;
                }
            });
        });

        return exist;
    },

    getSortedComponentsCollection: function(cc) {

        var sortedCC = new ComponentCollection();

        this.get('lines').each(function(item) {
            var objects = item.get('objects');

            objects.each(function(model){

                cc.each(function(fCModel){
                    if(model.cid == fCModel.cid){
                        sortedCC.add(fCModel);
                    }
                });
            });
        });

        return sortedCC;
    },

    findNotLockedRow: function(activeRow){

        var _that = this;

        var notLockedRow;

        var lines = this.get('lines');

        var activeRowIndex = lines.indexOf(activeRow);

        lines.each(function(row) {

            if(notLockedRow == undefined){

                var options = row.get('options');

                var rowIndex = lines.indexOf(row);

                if( rowIndex >= activeRowIndex && options.get('locked') == false ){
                    notLockedRow = row;
                }
            }
        });

        return notLockedRow;
    },

    replaceComponentModel : function( oldComponentModel, newComponentModel ){

        var selectedRow;

        var actionkey = oldComponentModel.get('actionkey');

        var lines = this.get('lines');

        lines.each(function(row) {

            var objects = row.get('objects');

            objects.each(function(model){
                if(model.get('actionkey') == actionkey){

                    var position = objects.indexOf(model);

                    objects.remove( model );
                    objects.add(newComponentModel, {at: position});

                    selectedRow = row;
                }
            });
        });

        return selectedRow;
    },


    deleteComponentModel: function( componentModel ) {

        this.get('lines').each(function(item) {
            var objects =  item.get('objects');
            objects.remove( componentModel );
        });

        componentModel.isDeleted = true;

        if(componentModel.view){
            componentModel.view.destroy();
        }
    },

    removeComponentModelFromCollection: function( componentModel ) {

        this.get('lines').each(function(line) {
            var objects =  line.get('objects');

            var index = objects.indexOf(componentModel);

            if(index !== -1){
                objects.remove( componentModel );
                return line;
            }
        });

        return false;
    },

    removeLayersByIds: function(deletedLayersIds) {

        var _that = this;

        var emptyRowsToRemove = [];

        for (var i = 0; i < deletedLayersIds.length; i++) {
            var lineId = deletedLayersIds[i];

            var line = this.getRowModelByLineId(lineId);

            emptyRowsToRemove.push(line);
        };

        this.get('lines').remove(emptyRowsToRemove);
    },

    getRowModelByLineId :function( rowId ){

        var finedRow;

        var selectedRowId = parseInt(rowId);

        this.get('lines').each(function(row) {
            if(row.get('options').get('id') == selectedRowId){
                finedRow = row;
            }
        });

        return finedRow;
    },

    addLine : function(newLine){

        var timelineRowOptionsModel = new TimelineRowOptionsModel(newLine.options);

        var timelineRowModel = new TimelineRowModel(newLine);
        timelineRowModel.set('options', timelineRowOptionsModel);
        timelineRowModel.set('objects', new ComponentCollection);
        this.get('lines').add(timelineRowModel);
    },


    deleteComponents : function(data){

        var cc = new ComponentCollection();

        var components = data.components;
        var deletedLayersIds = data.deletedLayersIds;

        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            var componentModel = this.getComponentModelByActionkey(component.actionkey);
            cc.add(componentModel);

            if(componentModel){
                this.deleteComponentModel( componentModel );
            }
        };

        this.removeLayersByIds(deletedLayersIds);

        return cc;
    },

    addComponents: function(data){
        var _that = this;

        var selectedRow = _that.getRowModelByLineId(data.selectedRowId);
        var newLine = data.newLine;
        var lastLineId = data.lastLineId;
        var lastComponentId = data.lastComponentId;
        var newProjectVariables = data.newProjectVariables;

        this.get('options').set('lastLineId', lastLineId, {silent:true});
        this.get('options').set('lastComponentId', lastComponentId, {silent:true});

        var components = data.components;

        var cc = new ComponentCollection();

        for (var i = 0; i < components.length; i++) {

            var component = components[i];

            var componentModel = ComponentFactory.createComponentModelByType(component.type, component);
            cc.add(componentModel);

            selectedRow.addNewComponent( componentModel );
        };

        if(newLine){
            this.addLine( newLine );
        }

        if(newProjectVariables){
            ProjectModel.instance.get('options').set('projectVariables', newProjectVariables, { silent:true });
        }

        return cc;
    },

    cutComponents: function(data) {

        var components = data.components;
        var deletedLayersIds = data.deletedLayersIds;

        var cc = new ComponentCollection();

        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            var componentModel = this.getComponentModelByActionkey(component.actionkey);
            cc.add(componentModel);

            if(componentModel){
                this.deleteComponentModel( componentModel );
            }
        };

        this.removeLayersByIds(deletedLayersIds);

        return cc;
    },

    pasteComponents: function(data){
        return this.addComponents(data);
    },

    moveComponentsToLayer: function(data){
        var _that = this;

        var selectedRow = this.getRowModelByLineId(data.rowId);
        var newLine = data.newLine;
        var lastLineId = data.lastLineId;
        var lastComponentId = data.lastComponentId;
        var position = data.position;
        var deletedLayersIds = data.deletedLayersIds;

        _log('selectedRow', selectedRow);

        this.get('options').set('lastLineId', lastLineId, {silent:true});
        this.get('options').set('lastComponentId', lastComponentId, {silent:true});

        var components = data.components;

        var cc = new ComponentCollection();

        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            var componentModel = this.getComponentModelByActionkey(component.actionkey);
            cc.add(componentModel);
        };

        var objects = selectedRow.get('objects');

        var dIndex = 0;

        cc.each(function(m1){
            objects.each(function(m2){

                if(m1.cid == m2.cid){
                    var index = objects.indexOf(m2);

                    if(index < position){
                        dIndex++;
                    }
                }
            });
        });

        dIndex = dIndex > 0 ? dIndex - 1 : 0;

        var newPosition = position - dIndex;

        _log('dIndex', dIndex, _log.error);
        _log('oldPosition', position, _log.error);
        _log('newPosition', newPosition, _log.error);

        var sortedCC = this.getSortedComponentsCollection(cc);

        for (var i = 0; i < cc.length; i++) {
            var cModel = cc.at(i);
            this.removeComponentModelFromCollection(cModel);
        };

        for (var i = sortedCC.length - 1; i >= 0; i--) {
            var cModel = sortedCC.at(i);
            selectedRow.get('objects').add(cModel, {at:newPosition});
        };

        // if(selectedRow.view){
        //     selectedRow.view.render();
        //     selectedRow.view.afterRender();
        // }

        this.removeLayersByIds(deletedLayersIds);

        if(newLine){
            this.addLine( newLine );
        }

        return cc;
    },

    sortRows: function(data) {

        var rowId = parseInt(data.rowId);
        var position = parseInt(data.position);

        if(!_.isNumber(rowId)){
            return false;
        }

        if(!_.isNumber(position)){
            return false;
        }

        var rowModel = this.getRowModelByLineId(rowId);

        if(!rowModel){
            return false;
        }

        _log('sortRows rowModel', rowModel);

        this.get('lines').remove(rowModel);
        this.get('lines').add(rowModel, {at: position});

        return true;
    },

    updateRowOptions: function(data){

        var rowOptions = data.rowOptions;

        var id = rowOptions.id;

        var rowModel = this.getRowModelByLineId(id);

        if(!rowModel){
            return false;
        }

        for (var item in rowOptions) {
            var options = rowModel.get('options');
            options.set(item, rowOptions[item], { silent:true });
        };

        return rowModel;
    },

    updatePageOptions: function(data){

        var pageOptions =  data.pageOptions;

        if(!_.isObject(pageOptions)){
            return false;
        }

        var pageOptionsModel = this.get('options');

        _log('updatePageOptions', pageOptionsModel, _log.timeline);

        var changed = [];

        pageOptionsModel.onlyRefresh = true;

        for(var item in pageOptions){

            if(pageOptionsModel.get(item) != pageOptions[item]){

                _log('changed ' + item, pageOptions[item]);

                changed.push(item);

                pageOptionsModel.set(item, pageOptions[item]);
            }
        }

        pageOptionsModel.onlyRefresh = false;

        _log('updatePageOptions', pageOptionsModel, _log.error);


        return changed;

        
        
    },

//    deleteCopiedComponents: function(componentsCollection){
//
//
//        DataAccess.updateComponent(
//            {page: this, component: componentsCollection, action:"delete" },
//            function(data) { _log('Delete component result: ', data, _log.dataaccessOutResult)  },
//            function(data) { _log('Delete component fault: ', data, _log.dataaccessOutFault)  }
//        );
//    }


});

var PageCollection = Backbone.Collection.extend({
    model: PageModel,

    getPageModelByPageId: function(pageId){
        var pageModel = false;
        this.each(function(model){
             if(model.get('options').get('pageid') == pageId){
                 pageModel =  model;
             }
        });
        return pageModel;
    }
});
