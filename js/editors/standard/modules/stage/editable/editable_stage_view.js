var EditableStageView = StageView.extend({

    className: 'stage-view-wrapper stage-view-wrapper-main',

	events: {
        'mousedown': 'onMouseDown',
        'mouseup': 'onMouseUp',
        // 'dragenter': 'onFileDragOver',
        // 'dragleave': 'onFileDragOut',
        //'drop .stage-loaded-dropzone': 'uploadOnFileDrop'
    },

    copiedComponentTrigger : [],
    clipboardActions : [],




	addComponent : function( componentModel, onComponentAdded ){

        var _that = this;

        console.log("addComponents");
        console.log(componentModel.toJSON());


        var scrollTop = this.$el.scrollTop();

        componentModel.set('y', scrollTop + 10, {silent:true});


        var selectedRow = this.getSelectedRow();
        var notLockedRow = this.findNotLockedRow(selectedRow);

        var row = notLockedRow || selectedRow;

        var selectedRowId = row.get('options').get('id');

        var componentsCollection = new ComponentCollection();
        componentsCollection.add(componentModel);

        DataAccess.addComponents(
            { components: componentsCollection, action:"add", selectedRowId:selectedRowId, pageId:this.model.getPageId() },
            function(data) {

                _log('Add component result: ', data, _log.dataaccessOutResult);

                var result = _that.addComponentsToStage(data, onComponentAdded);

                _that.selectCopmponents(result.cc);

                if(_.isFunction(onComponentAdded)){
                    onComponentAdded(result.v);
                };
                
                _that.model.updateDinamicPageThumb();
            },
            function(data) {
                _log('Add component fault: ', data, _log.dataaccessOutFault);
                //_that.model.updateDinamicPageThumb();
            }
        );
    },

    addComponentsToStage: function(data){
        var _that = this;

        var cc = this.model.addComponents(data);

        var componentModel = cc.first();

        var componentViews = [];

        cc.each(function(cModel){
            var componentView = _that.renderSingleComponent( cModel );
            componentViews.push(componentView);
        });

        this.updateTimeline();

        this.renderZIndex();

        return { cc:cc, v:componentViews[0] };
    },

    deleteActiveComponent : function( ){

        var _that = this;

        if(!this.canEdit){ return; }

        if($(document.activeElement).is("input[type='text'], textarea, [contenteditable]")) { return; }

        if(_that.selectedComponentsCollection.length <= 0){ return; }

        var sortedCC = this.model.getSortedComponentsCollection(this.selectedComponentsCollection);


        DataAccess.deleteComponents(
            { components: sortedCC, action:"delete", pageId:this.model.getPageId()  },
            function(data) {

                _log('Delete components result: ', data, _log.dataaccessOutResult);

                _that.onDeleteComponentsResult(data);
                
                _that.model.updateDinamicPageThumb();
            },
            function(data) {
                _log('Delete components fault: ', data, _log.dataaccessOutFault);

                _that.model.updateDinamicPageThumb();
            }
        );

    },

    onDeleteComponentsResultComing : function(data){

        var _that = this;

        var cc = this.model.deleteComponents(data);

        cc.each(function(cModel){
            _that.selectedComponentsCollection.remove(cModel);
        });


        this.updateTimeline();
        this.selectStage();
    },

    onDeleteComponentsResult : function(data){

        var cc = this.model.deleteComponents(data);

        this.selectedComponentsCollection.reset();

        this.updateTimeline();
        this.selectStage();
    },

    cutComponents: function(){

        var _that = this;

        if(this.selectedComponentsCollection.length == 0){
            return;
        }

        var sortedCC = this.model.getSortedComponentsCollection(this.selectedComponentsCollection);

        DataAccess.cutComponents(
            { components: sortedCC, action:"delete", pageId:this.model.getPageId()  },
            function(data) {

                _log('Cut components result: ', data, _log.dataaccessOutResult);

                _that.onCutComponentsResult(data);
                
                _that.model.updateDinamicPageThumb();
            },
            function(data) {
                _log('Delete components fault: ', data, _log.dataaccessOutFault);

                _that.model.updateDinamicPageThumb();
            }
        );
    },

    onCutComponentsResult: function(data) {

        var hash = data.hash;

        this.hash = hash;

        var cc = this.model.cutComponents(data);

        this.selectedComponentsCollection.reset();

        this.updateTimeline();
        this.selectStage();
    },

    onCutComponentsResultComing: function(data) {

        var _that = this;

        var cc = this.model.cutComponents(data);

        cc.each(function(cModel){
            _that.selectedComponentsCollection.remove(cModel);
        });

        this.updateTimeline();
        this.selectStage();
    },

    pasteComponents: function(hash){

        var _that = this;

        if(!this.canEdit){ return; }

        var hash = hash || _that.hash;

        if(!_.isObject(hash)){
            return;
        }

        var selectedRow = this.getSelectedRow();
        var selectedRowId = selectedRow.get('options').get('id');

        DataAccess.pasteComponents(
            { hash:hash, selectedRowId:selectedRowId, pageId:this.model.getPageId() },
            function(data) {

                _log('Paste components result: ', data, _log.dataaccessOutResult);

                var cc = _that.onPasteComponentsResult(data);
                _that.selectCopmponents(cc);
                
                _that.model.updateDinamicPageThumb();
            },
            function(data) {
                _log('Paste components fault: ', data, _log.dataaccessOutFault);

                _that.model.updateDinamicPageThumb();
            }
        );
    },

    onPasteComponentsResult: function(data){

        var _that = this;

        var cc = this.model.pasteComponents(data);

        cc.each(function(cModel){
            var componentView = _that.renderSingleComponent( cModel );
        });


        this.updateTimeline();

        this.renderZIndex();

        return cc;
    },

    saveComponent :function( componentModel, params ){

        var _that = this;

        if(!this.canEdit){ return; }

        _log('saveComponent componentModel', componentModel, _log.error);

        if(componentModel.onlyRefresh){
            return;
        }

        var components = [];

        var cc = this.selectedComponentsCollection;

        if(!this.selectedComponentsCollection.contains(componentModel)){
            cc = new ComponentCollection();
            cc.add(componentModel);
        }


        cc.each(function(cModel) {


            var picked = [];

            var exist = false;

            if(_.isArray(params)){
                picked = _.clone(params);
                exist = true;
            }else{
                for(var item in cModel.changed){
                    picked.push(item);
                    exist = true;
                }
            }

           


            if(!exist){
                components.push( cModel );
            }else{

                picked.push('actionkey');

                 _log('picked', picked, _log.error);

                var c = _.pickFromArray(cModel.toJSON(), picked);

                var exist = false;

                for (var item in c) {
                    exist = true;
                    break;
                };

                _log('c', c, _log.error);

                if(exist){
                    components.push( c );
                }else{
                    components.push( cModel );
                }
            }
            
        });
        
        //_log('components' , components, _log.dataaccessIn);


        DataAccess.updateComponents(
            { components: components, action:"update", pageId:this.model.getPageId() },
            function(data) {
                _log('Update component result: ', data, _log.dataaccessOutResult); 
                _that.model.updateDinamicPageThumb();
            },
            function(data) { _log('Update component fault: ', data, _log.dataaccessOutFault)  }
        );
    },

    updateComponentsResultComing: function(data){

        var _that = this;

        var cscc = this.selectedComponentsCollection.clone();

        var cc = this.model.updateComponentsCollection(data);

        cc.each(function(cModel){
            cModel.view.endEditing();
            cModel.view.unselectComponent();
            cModel.view.render();

            // if(cModel.miniatureView){
            //     cModel.miniatureView.render();
            //     cModel.miniatureView.afterRender();
            // }

            if(_that.selectedComponentsCollection.contains(cModel)){

                cModel.view.selectComponent();
                
                //cModel.trigger('update-editor', cModel, _that);
            }
        });

        this.selectCopmponents(cscc);

        //this.trigger('select-multiple-components', this.selectedComponentsCollection, this );
    },

    duplicateComponents: function(onComponentAdded){

        if(this.selectedComponentsCollection.length == 0){
            return;
        }

        var _that = this;

        var selectedRow = this.getSelectedRow();
        var selectedRowId = selectedRow.get('options').get('id');

        var sortedCC = this.model.getSortedComponentsCollection(this.selectedComponentsCollection);

        var components = sortedCC;
        var sourcePageId = this.model.get('options').get('pageid');
        var sourceProjectId = this.model.get('options').get('projectId');
        var sourceUserId = this.model.get('options').get('userId');


        DataAccess.duplicateComponents(
            { 
                selectedRowId: selectedRowId,
                components: components,
                sourceProjectId:sourceProjectId, 
                sourceUserId:sourceUserId, 
                sourcePageId:sourcePageId, 
                pageId:this.model.getPageId() 
            },
            function(data) {
                _log('Duplicate components result: ', data, _log.dataaccessOutResult);

                // var hash = data.hash;
                // _that.hash = hash;

                var result = _that.addComponentsToStage(data);
                _that.selectCopmponents(result.cc);

                if(_.isFunction(onComponentAdded)){
                    onComponentAdded(data);
                };
                
                _that.model.updateDinamicPageThumb();
            },
            function(data) {
                _log('Duplicate components fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    copyComponents: function(){

        var _that = this;

        if(this.selectedComponentsCollection.length == 0){
            return;
        }

        _log('copyComponents this.model', this.model);

        var sortedCC = this.model.getSortedComponentsCollection(this.selectedComponentsCollection);

        var components = sortedCC;
        var sourcePageId = '' + this.model.get('options').get('pageid');
        var sourceProjectId = this.model.projectId;
        var sourceUserId = this.model.ownerId;


        DataAccess.copyComponents(
            { 
                components: components,
                sourceProjectId:sourceProjectId, 
                sourceUserId:sourceUserId, 
                sourcePageId:sourcePageId, 
                pageId:this.model.getPageId() 
            },
            function(data) {
                _log('Copy components result: ', data, _log.dataaccessOutResult);

                var hash = data.hash;

                _that.hash = hash;
            },
            function(data) {
                _log('Copy components fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    createPageThumb : function(onResult){

        var _that = this;

        var thumbedModel = this.model;

        if(_that.model.changesWereMade){

            var htmlToRender = _that.$el.find('.stage-view').clone();
            htmlToRender.find('.darkenComponent').remove();

            // Create page thumb!
            DataAccess.createPageThumb(
                {
                    html: htmlToRender.html(),
                    pageOptions: _that.model.get('options').toJSON()
                },
                function(data) {
                    //console.log('completed', data);
                    // var pageModel = ProjectModel.instance.getPageModelByPageId(data.pageID);

                    //alert('Przyszło z serwera: ' + data.pageID)

                    if(thumbedModel != undefined){

                        if(thumbedModel.updatePagethumb != undefined){
                            thumbedModel.updatePagethumb();
                        }
                    }

                    if(onResult != undefined){
                        onResult(data);
                    }

                    // thumbedModel.updatePagethumb();
                },
                function(data){
                    _log('createPageThumb FAILED', data)
                }
            );

        }else{
            if(onResult != undefined){
                onResult();
            }
        }
    },

    copyTriggerFromOtherProject: function(model){
        this.copiedComponentTrigger = JSON.stringify(model.toJSON().triggers);
    },

    copyPositionFromOtherProject: function(model){

        var x = model.get('x');
        var y = model.get('y');

        this.copiedComponentPosition = {x:x, y:y}
    },

    copyDimensionFromOtherProject: function(model){

        var width = model.get('width');
        var height = model.get('height');

        this.copiedComponentDimensions = {width:width, height:height}
    },

    copyStyleFromOtherProject: function(model){

        var style = model.get('styles');

        var type = model.get('type')

        if(style != undefined){
            this.copiedComponentStyle[type] = JSON.stringify( style );
        }
    },

    onFileDragOver: function(e) {

        e.stopPropagation();
        this.$el.find('.stage-loaded-dropzone').show();
    },

    onFileDragOut: function(e) {

        e.stopPropagation(e);
        this.$el.find('.stage-loaded-dropzone').hide();
    },

    uploadOnFileDrop: function(e) {

        if(Utils.isDarkanExtension(e)){
            return;
        };

        e.stopPropagation();
        e.preventDefault();

        if(!this.canEdit) { return; }

        this.$el.find('.stage-loaded-dropzone').fadeOut(200);


        var file = e.originalEvent.dataTransfer.files[0];

        _log('file', file, _log.trigger);
        _log('e', e);

        if(file != undefined){

            this.addComponentOnDrop( this.getDropProperties(e) );

        }else{

            this.addComponentOnLink(e);
        }
    },

    addComponentOnLink: function(e){

        var _that = this;

        var fileName =  e.originalEvent.dataTransfer.getData('text');

        var urlpattern = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
        
        if ( urlpattern.test(fileName) ){

            if(e.shiftKey){
                this.createComponentAndUpload( 'infopoint-link', function(componentView){
                    componentView.setLink(fileName);
                });

                return;
            }

            if(e.ctrlKey){

                this.createComponentAndUpload( 'infopoint-download', function(componentView){
                    componentView.uploadOnDownloadFileDrop(e, false);
                });

                return;
            }

            if(Utils.isYoutubeLink(fileName)){
                this.createComponentAndUpload( 'video', function(componentView){
                    componentView.setYoutubeVideoLink(fileName);
                });
                return;
            }

            if(Utils.isImageLink(fileName)){

                 this.createComponentAndUpload( 'image', function(componentView){
                        componentView.uploadOnLink(fileName, true);
                });
                return;
            }


            this.createComponentAndUpload( 'text', function(componentView){
                componentView.setText(fileName);    
            });
           

        }else{

            this.createComponentAndUpload( 'text', function(componentView){
                componentView.setText(fileName);    
            });
        }

        
    },

    addComponentOnDrop: function(e){

        var _that = this;

        var file = e.file;

        var fileName = file.name;

        var regSound = new RegExp("^.*\." + 'mp3' + "$");
        var regVideo = new RegExp("^.*\." + 'mp4' + "$");

        if(e.ctrlKey){

            this.createComponentAndUpload( 'infopoint-download', function(componentView){
                componentView.uploadOnDownloadFileDrop(e, false);
                componentView.setLink(fileName);
            });

            return;
        }

        if( regSound.test( fileName ) ){
            this.createComponentAndUpload( 'infopoint-sound', function(componentView){
                componentView.uploadOnSoundFileDrop(e, false);
            });

            return; 
        }

        if( regVideo.test( fileName ) ){
            this.createComponentAndUpload( 'video', function(componentView){
                componentView.uploadOnFileDrop2(e, false);
            });

            return; 
        }

        this.createComponentAndUpload( 'image', function(componentView){
            componentView.uploadOnFileDrop2(e, true);
        });
  
    },

    createComponentAndUpload : function( componentType, onComponentAdded ){

        var componentModel = ComponentFactory.createComponentModelByType(componentType);
        this.addComponent( componentModel, onComponentAdded );
    },

    getDropProperties: function(e){

        var imageUrl;

        var file = e.originalEvent.dataTransfer.files[0];

        var data;

        if(file != undefined){
            var imageName = file.name;
            var imageData = e.originalEvent.dataTransfer.result;

            data = {
                name: imageName,
                data : imageData,
                size: file.size
            };
        }else{

            imageUrl =  e.originalEvent.dataTransfer.getData('text');
        }

        return { file: file, data:data, imageUrl:imageUrl };
    },

    showContextMenu: function(e) {

        var contextMenuView = new StageContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    getSelectedRow :function(){

        var activeRowId = User.getModel().get('activeRowId');

        var activeRow;

        this.model.get('lines').each(function(row) {
            if(row.get('options').get('id') == activeRowId){
                activeRow = row;
            }
        });

        if(activeRow == undefined){

            var index = this.model.get('lines').length - 2;

            if(index < 0){
                index = 0;
            }

            activeRow =  this.model.get('lines').at( index );
        }

        return activeRow;
    },

    findNotLockedRow: function(activeRow){

        return this.model.findNotLockedRow(activeRow);
    },

    copySelectedComponentsToNewLine: function(){

        var _that = this;

        var lastRowModel = this.model.get('lines').last();
        this.selectRow(lastRowModel);

        this.duplicateComponents(function(data){

            var selectedRowId = data.selectedRowId;

            var rowModel = _that.model.getRowModelByLineId(selectedRowId);

            _that.sortRows("event", rowModel, 0);
        });
    },

    moveSelectedComponentsToNewLine: function(){

        var _that = this;

        if(this.selectedComponentsCollection.length == 0){
            return;
        }

        var lastRowModel = this.model.get('lines').last();
        this.selectRow(lastRowModel);

        this.moveComponentsToLayer(lastRowModel.get('options').get('id'), 0, function(data){

            var selectedRowId = data.rowId;

            var rowModel = _that.model.getRowModelByLineId(selectedRowId);

            _that.sortRows("event", rowModel, 0);
        });
    },

    selectRow :function( selectedRowModel ){

        if(selectedRowModel != undefined){

            User.getModel().set('activeRowId', selectedRowModel.get('options').get('id') );

            this.model.get('lines').each(function(row) {
                row.setActive( false );
            });


            selectedRowModel.setActive( true );
        }
    },

    sortRows :function(event, model, position){

        var _that = this;

        var rowId = model.get('options').get('id');

        DataAccess.sortRows(
            { 
                rowId:rowId, 
                position:position,
                pageId:this.model.getPageId()  
            },
            function(data) { 
                _log('Sort rows result: ', data, _log.dataaccessOutResult);

                _that.onSortRowsResult(data);
            },
            function(data) { 
                _log('Sort rows fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    onSortRowsResult: function( data ) {

        this.model.sortRows(data);
        StageView.instance.renderZIndex();

        this.model.trigger('update-timeline');

    },

    moveComponentsToLayer: function(rowId, position, onComponentMoved){

        var _that = this;

        if(this.selectedComponentsCollection.length == 0){
            return;
        }

        _log('rowId', rowId);
        _log('position', position);

        _log('selectedComponentsCollection', this.selectedComponentsCollection);

        var sortedCC = this.model.getSortedComponentsCollection(this.selectedComponentsCollection);

        var actionkeys = _.pluck(sortedCC.toJSON(), 'actionkey');

        _log('actionkeys', actionkeys);

        DataAccess.moveComponentsToLayer(
            { 
                rowId:rowId, 
                actionkeys:actionkeys, 
                position:position,
                pageId:this.model.getPageId() 
            },
            function(data) { 
                _log('Move components to layer result: ', data, _log.dataaccessOutResult);

                _that.onMoveComponentsResult(data);

                if(_.isFunction(onComponentMoved)){
                    onComponentMoved(data);
                };

            },
            function(data) { 
                _log('Move components to layer fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    onMoveComponentsResult: function(data){

        var _that = this;

        this.model.moveComponentsToLayer(data);
    },

    updateRowOptionsResult: function(data){

        var rowModel = this.model.updateRowOptions(data);

        if(!rowModel){
            return;
        }

        rowModel.view.render();
        rowModel.view.afterRender();
    },

    

    selectComponentsOnStart: function(){

        var selectedComponents = ProjectModel.instance.get('selectedComponents');

        _log('selectComponentsOnStart', selectedComponents);
        _log('ProjectModel.instance', ProjectModel.instance);

        if(_.isUndefined(selectedComponents)){
            return
        }

        this.stageSelector.onSelectComponentsByUser(selectedComponents);

        ProjectModel.instance.unset('selectedComponents');
    },





    copyTrigger: function(){

        var firstCopmonentModel = this.selectedComponentsCollection.first();
        var copiedTriggersAction = JSON.stringify(firstCopmonentModel.get('triggers'));

        this.clipboardActions = JSON.parse(copiedTriggersAction);
    },

    pasteTrigger: function(trigger){

        // var firstCopmonentModel = this.selectedComponentsCollection.first();
        // firstCopmonentModel.pasteTrigger( this.copiedComponentTrigger );

        trigger = trigger || this.clipboardActions;

        var _that = this;

        var scc = this.selectedComponentsCollection;

        scc.each(function(cModel){
            cModel.pasteTrigger( trigger, true );
        });

        var firstModel = scc.first();

        if(firstModel){
            firstModel.trigger('change', ['triggers']);

            scc.each(function(cModel){
                _that.selectOneComponent(cModel);
            });
        }
    },


    // pasteTriggers: function(){

    //     var _that = this;

    //     this.selectedComponentsCollection.each(function(cModel){
    //         cModel.pasteTrigger( _that.clipboardActions, true );
    //     });

    //     var firstComponentModel = this.selectedComponentsCollection.first();
    //     firstComponentModel.trigger('change', ['triggers']);

    // },

    copyThisActionToClipboard: function(triggerAction){

        var copiedTriggerAction = JSON.stringify(triggerAction);


        _log('copyActionsToClipboard', copiedTriggerAction);

        this.clipboardActions.push(JSON.parse(copiedTriggerAction));

        _log('clipboardActions', this.clipboardActions);
    },

    toPasteActionsFromTheClipboard: function(trigger){
        var _that = this;

        // _log('clipboardActions', this.clipboardActions);
        // return;

        trigger = trigger || this.clipboardActions;

        var scc = this.selectedComponentsCollection;

        scc.each(function(cModel){
            cModel.toPasteTrigger( trigger, true );
        });

        var firstModel = scc.first();

        if(firstModel){
            firstModel.trigger('change', ['triggers']);

            scc.each(function(cModel){
                _that.selectOneComponent(cModel);
            });
        }
    },

    cleanActionsClipboard: function(){
        this.clipboardActions = [];
    },

    addMultiComponents: function(data){

        var _that = this;
        
        var cData = data.cData;

        var values = cData.values || [];
        var width = cData.width || 50;
        var height = cData.height || 150;
        var componentType = data.type;

        var onComponentAdded = function(){

        }

        var scrollTop = this.$el.scrollTop();

        var componentsCollection = new ComponentCollection();

        var styles = {
            'component-inner':{
                'border-bottom-width':"1px",
                'border-color':"#000",
                'border-left-width':"1px",
                'border-right-width':"1px",
                'border-style':"solid",
                'border-top-width':"1px",
            }
        }

        for (var i = 0; i < values.length; i++) {
            var value = values[i];

            var componentModel = ComponentFactory.createComponentModelByType(componentType);
            componentModel.set('width', width);
            componentModel.set('height', height);
            componentModel.set('styles', styles);
            componentModel.set('contents', '<div style="text-align: center;"><span style="font-size: 18px; background-color: rgba(0, 0, 0, 0);">'+ value +'</span></div>');
            componentModel.set('y', scrollTop + 10, {silent:true});
            componentsCollection.add(componentModel);

            console.log("addComponents");
            console.log(componentModel.toJSON());
        };

        if(componentsCollection.length == 0){
            return;
        }

        var selectedRow = this.getSelectedRow();
        var notLockedRow = this.findNotLockedRow(selectedRow);

        var row = notLockedRow || selectedRow;

        var selectedRowId = row.get('options').get('id');

        DataAccess.addComponents(
            { components: componentsCollection, action:"add", selectedRowId:selectedRowId, pageId:this.model.getPageId() },
            function(data) {

                _log('Add component result: ', data, _log.dataaccessOutResult);

                var result = _that.addComponentsToStage(data, onComponentAdded);

                _that.selectCopmponents(result.cc);

                if(_.isFunction(onComponentAdded)){
                    onComponentAdded(result.v);
                };
                
                _that.model.updateDinamicPageThumb();
            },
            function(data) {
                _log('Add component fault: ', data, _log.dataaccessOutFault);
                //_that.model.updateDinamicPageThumb();
            }
        );

    }
});