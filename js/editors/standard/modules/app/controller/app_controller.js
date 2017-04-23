var AppController = Backbone.Controller.extend({

    editor: new EditorView(),
    styleEditor: new StyleEditorView(),

    isCreated: false,

    componentsCollection: new ComponentCollection(),
    cutComponentsCollection: new ComponentCollection(),
    sourcePageId : null,
    sourceProjectId : null,
    sourceUserId : null,
    copyStatus : '',


    keys : [],

    initialize: function() {

        var _that = this;

        // window._layout.scene_wrapper.perfectScrollbar({
        //     useKeyboard: false,
        //     wheelPropagation: true,
        //     useBothWheelAxes: true,
        // });

        // window.addEventListener("keydown", function(e) {
        //     // space and arrow keys
        //     if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        //         e.preventDefault();
        //     }
        // }, false);

        var darkanEditorAplicationAPI = DarkanEditorAplicationAPI.getInstance();
        darkanEditorAplicationAPI.connect();


        $(document).bind("contextmenu", function(e) {

            if(e.currentTarget.activeElement != undefined){

                if (e.currentTarget.activeElement.localName === "input" ||
                    e.currentTarget.activeElement.localName === "textarea" ||
                    e.currentTarget.activeElement.className === 'note-editable'
                    ) {
                    // pokaz menu kontekstowe przegladarki

                } else {

                    return false;
                }
            }else{
                return false;
            }
        });

        $(document).on('mousedown', function(e){

            if( !$(e.target).parents().is('.context-menu') && !$(e.target).is('.context-menu')){
                ContextMenuContainer.closeMenu();
            }
        });


        $(document.body).on('keyup paste', 'input[type="number"]', function(){
            var value = $(this).val();

            if(value == "") $(this).val('');
        });

        $(document).on('keydown', function(e){

            //e.stopPropagation();
            //e.preventDefault();

            console.log(e);

            //if(e.currentTarget.activeElement != undefined){

                if (e.currentTarget.activeElement.localName === "input" ||
                    e.currentTarget.activeElement.localName === "textarea" ||
                    e.currentTarget.activeElement.className === 'note-editable'
                    ) {

                        //return true;
                        _log('Zaznaczony input', {}, _log.error);

                } else {

                    _that.keydown(e);
                    //return false;
                }
            //}else{
               // _that.keydown(e);
            //}



            return true;
        } );

        $(document).on('keyup', function(e){

            //e.stopPropagation();
            //e.preventDefault();

            _that.keyup(e);

            //return false;
        });

        $(document).on('drop', function(e){

            var isDarkanExtension = Utils.isDarkanExtension(e);

            _log('isDarkanExtension', isDarkanExtension);

            if(isDarkanExtension){

                var importWindow = WindowFactory.createImportWindow();
                $('body').append(importWindow.render().$el);

                importWindow.importPsdOnDrop(e);
            }
        });

        $(window).unload( function(e){

            if(_that.stageView != undefined){

                _that.stageView.cleanBeforeClose();
            }
        });

        $('#scene-wrapper').mousedown( function(e){
            e.stopPropagation();
            _that.stageView.unsetActiveComponents();
            _that.setEditorsToStage( StageView.instance.model );
        });


        DataAccess.connect({}, function(){ _that.onConnect() }, function(){ _that.onNoConnect() });

        if (__meta__.userID != -1) {
            // keep session
            setInterval(function() {
                DataAccess.keepSession(
                    {},
                    function(data){ 
                        var dataJ = JSON.parse(data);

                        if (!dataJ.login) {
                            window.location.href = "http://" + __meta__.serverLink + "/auth/login";
                        }
                    },
                    function(data){ _log('data fault', data) });
            }, 60000);
        }


        //var mainPageView = new MainPageView({ windowModel: new WindowModel() });
         //$('body').append(mainPageView.render().$el);

    },

    keydown: function(e) {
        console.log('keydown ' + e.which);

        var _that = this;



        if(this.keys[e.keyCode] == undefined){
            this.keys[e.keyCode] = true;

            if(this.imageWindow != undefined) { return; }

            switch (e.which){

                case 65: // ctrl + a

                    if(e.ctrlKey){

                        this.stageView.selectAllComponents();
                    }
                    break;

                case 46: // delete

                    this.stageView.deleteActiveComponent();
                    break;

                case 27: // escape
                    this.triggerView.escape();
                    break;

                case 67: // c
                    // copy
                    if(e.ctrlKey){

                        var copyData =  this.stageView.copyComponents();

                        
                    }

                    break;

                case 86:
                    // paste
                    if(e.ctrlKey){

                        this.stageView.pasteComponents();
                    }

                    break;

                case 66:

                    if(e.ctrlKey){

                       _log('Show paste window');

                       this.imageWindow = WindowFactory.createPasteComponentsWindow();
                       this.imageWindow.on('paste-components', function(hash){
                            _that.stageView.pasteComponents(hash);
                       });
                       this.imageWindow.on('on-close', function(){
                            _that.imageWindow = undefined;
                       });
                       $('body').append(this.imageWindow.render().$el);
                    }

                    break;
                    

                case 88:
                    // cut
                    if(e.ctrlKey){

                        this.stageView.cutComponents();
                    }

                    break;

                case 81:

                    e.stopPropagation();
                    e.preventDefault();

                    if(e.ctrlKey){

                        this.stageView.duplicateComponents();
                    }

                    break;

                case 90:
                    // back
                    if(e.ctrlKey){

                        HistoryListView.instance.back();
                    }

                    break;

                case 89:
                    // prew
                    if(e.ctrlKey){

                        HistoryListView.instance.prev();
                    }

                    break;

                case 37:
                case 38:
                case 39:
                case 40:
                    this.stageView.moveActiveComponents(e);
                    break;

            }

        }

    },



    keyup: function(e) {
        //console.log('keyup ' + e.which);

        delete this.keys[e.keyCode];
    },

    addComponent : function( componentType, onComponentAdded ){

        var _that = this;
        var componentModel = ComponentFactory.createComponentModelByType(componentType);

        this.stageView.addComponent( componentModel, onComponentAdded );
    },


    openProjectVersionWindow: function(activeTab) {
        var _that = this;
        var projectVersionWindow = WindowFactory.createProjectVersionWindow();
        // saveProjectWindow.on('imageupload-ondrop', function(fileData) {
        //     var componentView = _that.addComponent( 'image', true );
        //     componentView.uploadOnFileDrop(fileData, true);
        // });

        // saveProjectWindow.on('imageupload-onclick', function(fileData, input) {
        //     var componentView = _that.addComponent( 'image', true );
        //     componentView.uploadOnInputData(fileData, input, true);
        // });
        
        $('body').append(projectVersionWindow.render().$el);
        // saveProjectWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);
    },

    openImageWindow: function(activeTab, sender) {
        var _that = this;
        var imageWindow = WindowFactory.createImageWindow(activeTab, sender);

        imageWindow.on('on-close', function(fileData) {
            _that.imageWindow = undefined;
        });

        imageWindow.on('imageupload-ondrop', function(fileData) {
            _that.addComponent( 'image', function(componentView){

                _log('fileData', fileData);

                componentView.uploadOnFileDrop2(fileData, true);
            }); 
        });

        imageWindow.on('imageupload-onclick', function(fileData, input) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnInputData(fileData, input, true);
            });
            
        });

        imageWindow.on('imageupload-link', function(imageUrl) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnLink(imageUrl, true);
            });   
        });

        imageWindow.on('imageupload-on-paste', function(event, blob) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnPaste(event, blob, true);
            });
        });
        
        $('body').append(imageWindow.render().$el);
        imageWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);

        this.imageWindow = imageWindow;
    },

    openVideoWindow: function(activeTab) {
        var _that = this;

        var videoWindow = WindowFactory.createVideoWindow();
        videoWindow.on('imageupload-ondrop', function(fileData) {
            _that.addComponent( 'video', function(componentView){
                componentView.uploadOnFileDrop2(fileData, true);
            });
        });

        videoWindow.on('imageupload-onclick', function(fileData, input) {
            _that.addComponent( 'video', function(componentView){
                componentView.uploadOnInputData(fileData, input, false);
            });
        });

        videoWindow.on('putvideolink', function(data) {
            _that.addComponent( 'video', function(componentView){
                componentView.putVideoLink(data);
            });
            
        });
        
        $('body').append(videoWindow.render().$el);
        videoWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);
    },

    openLibraryWindow: function(activeTab) {
        var _that = this;

        var libraryWindow = WindowFactory.createLibraryWindow();
        $('body').append(libraryWindow.render().$el);
        libraryWindow.on('imagelibrary-onclick', function(fileData, input) {
            _that.addComponent( 'image', function(componentView){
                componentView.createImageLibrary(fileData, input, true);
            });  
        });
        libraryWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);
    },

    onMessageApiComming:function(e){

        _log('onMessageApiComming', e, _log.api);

        if(e.origin == 'http://origin-domain.com') {
            // e.data is the string sent by the origin with postMessage.
        if(e.data == 'sizing?') {
          //e.source.postMessage('sizing:'+document.body.scrollHeight+','+document.body.scrollWidth, e.origin);
        }
      }
    },

    onConnect : function(){

        var _that = this;

        if(this.isCreated){
            return;
        }

        if(State.isTestDrive()){
            this.showTestDriveState();
        }



        // Project View and Model
        // ProjectModel.instance = new ProjectModel();
        // ProjectModel.instance = ProjectModel.instance;


        this.projectView = new ProjectView({model: ProjectModel.instance});

        // Stage View
        this.pageModel = new PageModel();
        this.stageView = new StageView({ model:this.pageModel });
        this.stageView.on('select-component', function(componentModel){

            _that.setEditorsToComponent(componentModel);
        });

        this.stageView.on('select-row', function(rowModel){

            _that.setEditorsToRow(rowModel);
        });

        this.stageView.on('select-multiple-components', function(componentsCollection){

            _that.setMultipleEditorToComponent(componentsCollection);
        });



        this.stageView.on('select-stage', function(stageModel){

            _that.setEditorsToStage( stageModel );
        });

        this.stageView.on('delete-from-cut-copy-collection', function(componetModel){
            _that.componentsCollection.remove(componetModel);
            _that.cutComponentsCollection.remove(componetModel);
        });

        this.stageView.on('imageupload-link', function(e) {

//            e.stopPropagation();
//            e.preventDefault();


            var imageUrl =  e.originalEvent.dataTransfer.getData('text');

            var urlpattern = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
            if ( urlpattern.test(imageUrl) ){

                if(e.shiftKey){
                    _that.addComponent( 'infopoint-link', function(componentView){
                        componentView.setLink(imageUrl);
                    });
                    

                }else{

                    if(e.ctrlKey){

                        _that.addComponent( 'infopoint-download', function(componentView){
                            componentView.uploadOnDownloadFileDrop(e, false);
                        });
                        

                    }else{
                        _that.addComponent( 'image', function(componentView){
                            componentView.uploadOnLink(imageUrl, true);
                        });
                    }
                }
            }else{
                _that.addComponent( 'text', function(componentView){
                    componentView.setText(imageUrl);    
                });
                
            }
        });

        this.stageView.on('imageupload-ondrop', function(e) {

            var file = e.file;

            var imageName = file.name;
            var ext = 'mp3';

            var re = new RegExp("^.*\." + ext + "$");

            if(e.shiftKey){

                _that.addComponent( 'infopoint-download', function(componentView){
                    componentView.uploadOnDownloadFileDrop(e, false);
                    componentView.setLink(imageName);
                });
                

            }else{

                if( re.test( imageName ) ){
                    _that.addComponent( 'infopoint-sound', function(componentView){
                        componentView.uploadOnSoundFileDrop(e, false);
                    });
                    
                }else{

                    if(e.ctrlKey){

                        _that.addComponent( 'infopoint-download', function(componentView){
                            componentView.uploadOnDownloadFileDrop(e, false);
                        });
                        

                    }else{
                        _that.addComponent( 'image', function(componentView){

                            _log('addComponent on drop', componentView);
                            _log('e', e);

                            componentView.uploadOnFileDrop2(e, true);
                        });
                        
                    }
                }
            }

        });

        this.stageView.on(' show-image-window', function(sender) {
            _that.openImageWindow(0, sender)
        });





        StageView.instance = this.stageView;




        // Left menu view
        this.leftMenuView = new LeftMenuView({collection: toolbarItemsCollection});

        // On Left Menu Item Click
        this.leftMenuView.on('menu-item-click', function(model){
            var componentType = model.get('componentName');

            // do action basing on clicked left menu element
            switch(componentType) {

                case 'image':
                    _that.openImageWindow(0);
                    break;


                case 'video':
                    _that.openVideoWindow(0);
                    break;

                case 'library':
                    _that.openLibraryWindow(0);
                    break;

                case 'shapes':
                    _that.openLibraryWindow(4);
                    break;

                case 'remove':
                    _that.stageView.deleteActiveComponent();
                    break;

                default: 
                    _that.addComponent( componentType );
                    break;
            }
        });

        // Bottom menu view
        this.bottomMenuView = new BottomMenuView();
        BottomMenuView.instance = this.bottomMenuView;


        // Right Menu View

        this.rightMenuView = new RightMenuView({model: ProjectModel.instance, collection: ProjectModel.instance.collection, stage: this.stageView});
        this.rightMenuView.on('set-page', function(pageModel){

            //_that.createPageThumb();

            _that.pageModel = pageModel;
            _that.stageView.setModel(pageModel);

            //_that.setEditorsToStage( pageModel );
        });

        this.rightMenuView.on('set-second-page', function(pageModel){



            _that.stageView.setSecondModel(pageModel);

        });

        this.rightMenuView.on('delete-page', function(){

            _that.stageView.deletePage();
        });

        this.rightMenuView.on('update-coming', function(pageModel){

            _that.stageView.updateComing(pageModel);
        });

        this.rightMenuView.on('update-component-coming', function(data){
            _that.stageView.updateComponentComing(data);
        });

        this.rightMenuView.on('update-timeline-coming', function(data){
            _that.stageView.updateTimelineComing(data);
        });

        this.rightMenuView.on('update-page-options-coming', function(data){
            _that.stageView.updatePageOptionsComing(data);
        });

        this.rightMenuView.on('update-add-components-coming', function(data){
            _that.stageView.updateAddComponentsComing(data);
        });



        this.rightMenuView.on('show-modal-window', function(){

            _that.stageView.clearStage();


            //var newPageWindow = WindowFactory.createNewpageWindow();
            var newPageWindow = WindowFactory.createStartingNewpageWindow();

            _that.createNewPage(newPageWindow);

        });

        this.rightMenuView.on('hide-modal-window', function(data){


            var pageModel = data.pageModel;
            var collection = data.collection;

            if(_that.newPageWindow != undefined){

                 if(collection.length == 1){
                     _that.stageView.setModel(pageModel);
                 }

                _that.newPageWindow.close();
                _that.newPageWindow = undefined;
            }
        });

        this.rightMenuView.on('data-picker-picked', function(model){

            _that.stageView.dataPickerPicked( model  );
        });

        RightMenuView.instance = this.rightMenuView;


        // Top menu
        this.topMenuView = TopMenuView.create({ projectModel:ProjectModel.instance });

        this.topMenuView.on('add-new-blank-page', function() {

            _that.createNewPage();

        });

        this.topMenuView.on('open-project-version-window', function() {
            _that.openProjectVersionWindow();
        });
        this.topMenuView.on('open-images-window', function() {
            _that.openImageWindow(2);
        });
        this.topMenuView.on('open-video-window', function() {
            _that.openVideoWindow(1);
        });

        this.topMenuView.on('imageupload-link', function(imageUrl) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnLink(imageUrl, true);
            });
            
        });

        this.topMenuView.on('clear-project-popup', function(){

            var popup = PopupFactory.createStandardPopup( {}, _that.topMenuView );
            popup.on('ok-button-click', function(){
                _that.topMenuView.clearProject(
                    function(){


                        _that.stageView.resetStage();
                        _that.rightMenuView.resetList();

                        _that.rightMenuView.loadProject();
                    },
                    function(){

                    });
            });

            $('body').append(popup.render({title: _lang('POPUP_DELPROJECT_TITLE'), content: _lang('POPUP_DELPROJECT_MESSAGE')}).$el);

        });

        this.topMenuView.render();


        this.createEditors();

        this.createTrigger();

        this.createStyles();

        _that.rightMenuView.loadProject();


        this.isCreated = true;

    },


    onNoConnect : function(data){
          _log('onNoConnect', data)
    },

    setEditorsToRow: function(rowModel){

        this.leftMenuView.turnOnDeleteButton();

        var componentsCollection = rowModel.get('objects');

        if(componentsCollection.length > 0) {

            this.timelineEditorView.destroy();
            this.timelineEditorView = EditorsFactory.createTimelineRowEditor();
            this.timelineEditorView.setCollection( componentsCollection );
            this.timelineEditorView.setRowModel( rowModel.get('options') );
            $('#botmenu-timeline-editor-wrapper').html(this.timelineEditorView.render().$el);
            this.timelineEditorView.afterRender();
        }else{
            this.timelineEditorView.destroy();
        }
    },

    setMultipleEditorToComponent: function(componentsCollection){

        if(componentsCollection.length > 0){

            if(componentsCollection.length == 1){
                this.setEditorsToComponent( componentsCollection.first() );
            }else{
                this.leftMenuView.turnOnDeleteButton();

                this.timelineEditorView.destroy();
                this.timelineEditorView = EditorsFactory.createTimelineComponentsCollectionEditor();
                this.timelineEditorView.setCollection( componentsCollection );
                $('#botmenu-timeline-editor-wrapper').html(this.timelineEditorView.render().$el);
                this.timelineEditorView.afterRender();

                this.multipleSizeAndPositionEditorView.setCollection( componentsCollection );

                this.alignEditorView.setCollection( componentsCollection );

                this.editor.destroy();
                this.editor = EditorsFactory.createMultipleEditor();
                this.editor.setCollection( componentsCollection );
                $('#botmenu-editors-container').html(this.editor.render().$el);

                this.styleEditor.destroy();
                this.styleEditor = EditorsFactory.createMultipleEditor();
                this.styleEditor.setCollection( componentsCollection );
                $('#botmenu-styles').html(this.styleEditor.render().$el);

                // this.multipleScoreEditorView.setCollection( componentsCollection );
                this.multipleWcagEditorView.setCollection( componentsCollection );
                this.multipleParallaxeEditor.setCollection( componentsCollection );

                this.triggerView.setCollection( componentsCollection );

                this.soundEditor.destroy();
                this.soundEditor = this.multipleSoundEditorView;
                this.soundEditor.setCollection( componentsCollection );
                $('#botmenu-sound').html(this.soundEditor.render().$el);


                if(this.reportEditor){
                    this.reportEditor.destroy();
                }

                
                this.reportEditor = this.multipleReportEditorView;
                this.reportEditor.setCollection( componentsCollection );
                $('#botmenu-report').html(this.reportEditor.render().$el);


                this.scoreExerciseEditorView.setModel( componentsCollection );
            }

        }else{
            //this.timelineEditorView.destroy();

            this.setEditorsToStage( this.stageView.model );

            this.scoreExerciseEditorView.setModel( componentsCollection );

        }
    },

    setEditorsToStage :function(stageModel){

        this.leftMenuView.turnOffDeleteButton();

        var pageOptions = stageModel.get('options');

        this.timelineEditorView.destroy();
        this.timelineEditorView = EditorsFactory.createTimelineStageEditor();
        this.timelineEditorView.setModel( pageOptions );
        $('#botmenu-timeline-editor-wrapper').html(this.timelineEditorView.render().$el);
        this.timelineEditorView.afterRender();

        this.sizeAndPositionEditorView.setModel( pageOptions );
        this.scoreEditorView.setModel();
        this.pagenoteEditorView.setModel( pageOptions );
        this.wcagEditorView.setModel( pageOptions );
        this.parallaxeEditorView.setModel( pageOptions );

        this.alignEditorView.deactivate();

        this.styleEditor.destroy();
        this.styleEditor = this.stageStyleEditor;
        this.styleEditor.setModel( pageOptions );
        $('#botmenu-styles').html(this.styleEditor.render().$el);
        this.styleEditor.afterRender();

        this.editor.destroy();
        this.editor = this.stageEditorView;
        this.editor.setModel( pageOptions );
        $('#botmenu-editors-container').html(this.editor.render().$el);
        this.editor.afterRender();

        this.triggerView.setModel( pageOptions );

        this.soundEditor.destroy();
        this.soundEditor = this.soundEditorView;
        this.soundEditor.setModel( stageModel );
        $('#botmenu-sound').html(this.soundEditor.render().$el);

        this.scoreExerciseEditorView.setModel( this.stageView.selectedComponentsCollection );

        if(this.reportEditor){
            this.reportEditor.destroy();
        }
    },

    setEditorsToComponent : function(componentModel){

        this.leftMenuView.turnOnDeleteButton();

        this.timelineEditorView.destroy();
        this.timelineEditorView = EditorsFactory.createTimelineComponentEditor();
        this.timelineEditorView.setModel( componentModel );
        $('#botmenu-timeline-editor-wrapper').html(this.timelineEditorView.render().$el);
        this.timelineEditorView.afterRender();

        this.sizeAndPositionEditorView.setModel( componentModel );
        // this.scoreEditorView.setModel( componentModel );
        this.wcagEditorView.setModel( componentModel );
        this.parallaxeEditorView.setModel( componentModel );




        this.alignEditorView.deactivate();

        this.triggerView.setModel( componentModel );

        var type = componentModel.get('type');

        var editor = this.editor;
        editor.destroy();

        this.styleEditor.destroy();

        if(this.reportEditor){
            this.reportEditor.destroy();
            this.reportEditor = undefined;
        }


        switch (type){
            case 'text':
            case 'quiz-result':
                editor = EditorsFactory.createTextEditor();
                this.textToolbarEditorView.setModel(componentModel);
                this.styleEditor = StyleEditorsFactory.createTextEditor();
                break;

            case 'timer':
                editor = EditorsFactory.createTimerEditor();
                this.textToolbarEditorView.setModel(componentModel);
                this.styleEditor = StyleEditorsFactory.createTimerEditor();
                break;

            case 'image':
                editor = EditorsFactory.createImageEditor();
                this.styleEditor = StyleEditorsFactory.createImageEditor();
                break;
            case 'video':
                editor = EditorsFactory.createVideoEditor();
                this.styleEditor = StyleEditorsFactory.createVideoEditor();
                break;
            case 'quiz':
                editor = EditorsFactory.createQuizEditor();
                this.styleEditor = StyleEditorsFactory.createQuizEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'quiz-selectone':
                editor = EditorsFactory.createQuizSelectOneEditor();
                this.styleEditor = StyleEditorsFactory.createQuizSelectOneEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'quiz-fillinblinds':
                editor = EditorsFactory.createQuizFillInBlanksEditor();
                this.styleEditor = StyleEditorsFactory.createQuizFillInBlanksEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'quiz-dnd':
                editor = EditorsFactory.createQuizDnDEditor(this.stageView);
                this.styleEditor = StyleEditorsFactory.createQuizDnDEditor(this.stageView);
                this.reportEditor = this.reportEditorView;
                break;
            case 'quiz-connectlines':
                editor = EditorsFactory.createQuizConnectLinesEditor(this.stageView);
                this.styleEditor = StyleEditorsFactory.createQuizConnectLinesEditor(this.stageView);
                this.reportEditor = this.reportEditorView;
                break;
            case 'quiz-wordsearch':
                editor = EditorsFactory.createQuizWordsearchEditor(this.stageView);
                this.styleEditor = StyleEditorsFactory.createQuizWordsearchEditor(this.stageView);
                this.reportEditor = this.reportEditorView;
                break;
            case 'scroller':
                editor = EditorsFactory.createScrollerEditor();
                this.styleEditor = StyleEditorsFactory.createScrollerEditor();
                break;
            case 'crossword':
                editor = EditorsFactory.createCrosswordEditor();
                this.styleEditor = StyleEditorsFactory.createCrosswordEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'form-inputtext':
                editor = EditorsFactory.createFormInputTextEditor();
                this.styleEditor = StyleEditorsFactory.createFormInputTextEditor();
                this.reportEditor = this.reportEditorView;
                break;

            case 'form-upload':
                editor = EditorsFactory.createFormUploadEditor();
                this.styleEditor = StyleEditorsFactory.createFormUploadEditor();
                break;
                    
            case 'form-textarea':
                editor = EditorsFactory.createFormTextareaEditor();
                this.styleEditor = StyleEditorsFactory.createFormTextareaEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'form-select':
                editor = EditorsFactory.createFormSelectEditor();
                this.styleEditor = StyleEditorsFactory.createFormSelectEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'form-checkbox':
                editor = EditorsFactory.createFormCheckboxEditor();
                this.styleEditor = StyleEditorsFactory.createFormCheckboxEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'form-radio':
                editor = EditorsFactory.createFormRadioEditor();
                this.styleEditor = StyleEditorsFactory.createFormRadioEditor();
                this.reportEditor = this.reportEditorView;
                break;
            case 'form-submit':
                editor = EditorsFactory.createFormSubmitEditor(this.stageView);
                this.styleEditor = StyleEditorsFactory.createFormSubmitEditor(this.stageView);
                break;
            case 'iframe':
                editor = EditorsFactory.createIframeEditor();
                this.styleEditor = StyleEditorsFactory.createIframeEditor();
                break;
            case 'swf':
                editor = EditorsFactory.createSwfEditor();
                this.styleEditor = StyleEditorsFactory.createSwfEditor();
                break;
            case 'drawedinfopoint-link':
                editor = EditorsFactory.createDrawedInfoPointLinkEditor();
                this.styleEditor = StyleEditorsFactory.createDrawedInfoPointLinkEditor();
                break;
            case 'drawedinfopoint-download':
                editor = EditorsFactory.createDrawedInfoPointDownloadEditor();
                this.styleEditor = StyleEditorsFactory.createDrawedInfoPointDownloadEditor();
                break;
            case 'drawedinfopoint-gallery':
                editor = EditorsFactory.createDrawedInfoPointGalleryEditor();
                this.styleEditor = StyleEditorsFactory.createDrawedInfoPointGalleryEditor();
                break;
            case 'drawedinfopoint-popup':
                editor = EditorsFactory.createDrawedInfoPointPopupEditor();
                this.styleEditor = StyleEditorsFactory.createDrawedInfoPointPopupEditor();
                break;
            case 'infopoint-popup':
                editor = EditorsFactory.createInfoPointPopupEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointPopupEditor();
                break;
            case 'infopoint-link':
                editor = EditorsFactory.createInfoPointLinkEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointLinkEditor();
                break;
            case 'infopoint-sound':
                editor = EditorsFactory.createInfoPointSoundEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointSoundEditor();
                break;
            case 'infopoint-sound-control':
                editor = EditorsFactory.createInfoPointSoundControlEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointSoundControlEditor();
                break;
            case 'infopoint-soundrecord':
                editor = EditorsFactory.createInfoPointSoundRecordEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointSoundRecordEditor();
                break;
            case 'infopoint-gallery':
                editor = EditorsFactory.createInfoPointGalleryEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointGalleryEditor();
                break;
            case 'infopoint-download':
                editor = EditorsFactory.createInfoPointDownloadEditor();
                this.styleEditor = StyleEditorsFactory.createInfoPointDownloadEditor();
                break;

            case 'quiz-inputtext':
                editor = EditorsFactory.createQuizInputTextEditor();
                this.styleEditor = StyleEditorsFactory.createQuizInputTextEditor();
                this.reportEditor = this.reportEditorView;
                break;   

            case 'quiz-select':
                editor = EditorsFactory.createQuizSelectEditor();
                this.styleEditor = StyleEditorsFactory.createQuizSelectEditor();
                this.reportEditor = this.reportEditorView;
                break;      

            default :
                editor = new EditorView();
                this.editor = editor;

                this.styleEditor = new StyleEditorView();

                console.log("No editor");
                break;
        }

        this.editor = editor;

        editor.setModel( componentModel );
        this.styleEditor.setModel( componentModel );

        this.scoreExerciseEditorView.setModel( componentModel );

        $('#botmenu-editors-container').html(this.editor.render().$el);
        this.editor.afterRender();
        $('#botmenu-styles').html(this.styleEditor.render().$el);
        this.styleEditor.afterRender();

        this.soundEditor.destroy();
        this.soundEditor = this.soundEditorView;
        this.soundEditor.setModel( componentModel );
        $('#botmenu-sound').html(this.soundEditor.render().$el);


        if(this.reportEditor){
            this.reportEditor.setModel( componentModel );
            $('#botmenu-report').html(this.reportEditor.render().$el);
        }

    },

    createStyles : function(){

        StylesFactory.createAllStyles();

        this.stageStyleEditor = StyleEditorsFactory.createStageEditor();
    },

    createEditors : function(componentModel){

        // this.textEditorView = EditorsFactory.createTextEditor();
        this.textToolbarEditorView = EditorsFactory.createTextToolbarEditor();
        // this.imageEditorView = EditorsFactory.createImageEditor();
        // this.videoEditorView = EditorsFactory.createVideoEditor();
        // this.quizEditorView = EditorsFactory.createQuizEditor();
        // this.quizFillInBlanksEditorView = EditorsFactory.createQuizFillInBlanksEditor();
        // this.quizDnDEditorView = EditorsFactory.createQuizDnDEditor(this.stageView);
        // this.quizConnectLinesEditorView = EditorsFactory.createQuizConnectLinesEditor(this.stageView);
        // this.crosswordEditorView = EditorsFactory.createCrosswordEditor();
        // this.forminputtextEditorView = EditorsFactory.createFormInputTextEditor();
        // this.formTextareaEditorView = EditorsFactory.createFormTextareaEditor();
        // this.formSelectEditorView = EditorsFactory.createFormSelectEditor();
        // this.infoPointPopupEditorView = EditorsFactory.createInfoPointPopupEditor();
        // this.infoPointLinkEditorView = EditorsFactory.createInfoPointLinkEditor();
        // this.infoPointSoundEditorView = EditorsFactory.createInfoPointSoundEditor();
        // this.infoPointSoundRecordEditorView = EditorsFactory.createInfoPointSoundRecordEditor();
        // this.infoPointGalleryEditorView = EditorsFactory.createInfoPointGalleryEditor();
        // this.infoPointDownloadEditorView = EditorsFactory.createInfoPointDownloadEditor();


        this.stageEditorView = EditorsFactory.createStageEditor();
        this.wcagEditorView = EditorsFactory.createWcagEditor();
        this.parallaxeEditorView = EditorsFactory.createParallaxeEditor();

        this.scoreEditorView = EditorsFactory.createScoreEditor();
        this.scoreExerciseEditorView = EditorsFactory.createScoreExerciseEditor();
        // this.scoreEditorView.setModel();
        // this.scoreEditorView.render();
        this.sizeAndPositionEditorView = EditorsFactory.createSizeAndPositionEditorView();
        this.alignEditorView = EditorsFactory.createAlignEditorView();
        this.alignEditorView.render();
        this.pagenoteEditorView = EditorsFactory.createPagenoteEditor();
        this.soundEditorView = EditorsFactory.createSoundEditor();
        this.reportEditorView = EditorsFactory.createReportEditor();

        this.timelineEditorView = EditorsFactory.createTimelineEditor();


        // Multiple
        this.multipleSizeAndPositionEditorView = EditorsFactory.createMultipleSizeAndPositionEditor();
        // this.multipleScoreEditorView = EditorsFactory.createMultipleScoreEditor();
        this.multipleWcagEditorView = EditorsFactory.createMultipleWcagEditor();
        this.multipleParallaxeEditor = EditorsFactory.createMultipleParallaxeEditor();
        this.multipleSoundEditorView = EditorsFactory.createMultipleSoundEditor();
        this.multipleReportEditorView = EditorsFactory.createMultipleReportEditor();

        this.soundEditor = this.soundEditorView;

        this.reportEditor = this.reportEditorView;
    },

    createTrigger : function(){
        var _that = this;


        this.triggerView = new WindowFactory.createTriggerWindow();
        $('body').append( this.triggerView.render().$el );
        this.triggerView.$el.css({
            top: '100px',
            left: 'calc(100% - 450px)'
        });

        if ($(document).width() < 1380) {
            this.triggerView.minimize();
        }
        

        $(window).resize(function(){
            if ((_that.triggerView.$el.offset().left + 200) > $(this).width()) {
                _that.triggerView.$el.css({left: $(this).width() - 200 + "px"});
            }
            BottomMenuView.instance.onResize();
            _that.stageView.renderScenePosition();
        });

    },

    showTestDriveState: function() {

        var _that = this;

        if(!this.getTestDriveAsVisited()){
            var testDriveWindow = WindowFactory.createTestDriveWindow();
            $('body').append(testDriveWindow.render().$el);
        }

        var timerWindow = WindowFactory.createTimerWindow();

        timerWindow.on('onTimerComplete', function(){
            _that.showRestartWindow();
        });


        $('body').append(timerWindow.render().$el);
    },

    showRestartWindow: function() {

         Utils.setModalText({
            main: _lang('YOU_HAVE_NO_ACCESS_2'),
            extra: _lang('YOU_HAVE_NO_ACCESS_EXTRA_4')
                    
        }, true);

         Utils.showNormalModal();

        setTimeout(function(){
            window.location.reload();
        }, 5000);
    },

    getTestDriveAsVisited: function () {

        return Utils.getCookie('testdrive');
    },
});