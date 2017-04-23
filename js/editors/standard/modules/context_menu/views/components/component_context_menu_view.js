var ComponentContextMenuView = ContextMenuView.extend({

    template: _.template($('#component-context-menu-template').html()),

    onItemClick: function(model){

        _log('model', model);

        var action = model.get('action');

        switch (action){
            case 'copy':
                StageView.instance.copyComponents();
                break;

            case 'cut':
                StageView.instance.cutComponents();
                break;

            case 'remove':
                StageView.instance.deleteActiveComponent();
                break;

            case 'hide':
                StageView.instance.hideComponents();
                break;

            case 'show':
                StageView.instance.showComponents();
                break;

            

            case 'copy-trigger':
                StageView.instance.copyTrigger();
                break;

            case 'paste-trigger':
                StageView.instance.pasteTrigger();
                break;

            case 'copy-position':
                StageView.instance.copyPosition();
                break;

            case 'paste-position':

                StageView.instance.pastePosition();
                break;

            case 'copy-dimension':
                StageView.instance.copyDimension();
                break;

            case 'paste-dimension':

                StageView.instance.pasteDimension();
                break;

            case 'copy-style':
                StageView.instance.copyStyle();
                break;

            case 'paste-style':

                StageView.instance.pasteStyle();
                break;

            case 'move-components-to-new-line':

                StageView.instance.moveSelectedComponentsToNewLine();
                break;

            case 'copy-components-to-new-line':

                StageView.instance.copySelectedComponentsToNewLine();
                break;

            case 'flip-x':
                this.flipX();
                break;

            case 'flip-y':
                this.flipY();
                break;

            case 'convert':

                var type = model.get('componentName');

                var cModel = StageView.instance.selectedComponentsCollection.first();

                cModel.set('type', type, {silent:true});

                var dModel = StageView.instance.getComponentModelByActionkey(cModel.get('actionkey'));

                var newComponentModel = ComponentFactory.createComponentModelByType(type, dModel.toJSON());

                var selectedRow = StageView.instance.replaceComponentModel(dModel, newComponentModel);

                cModel.view.remove();

                var componentView = StageView.instance.renderSingleComponent(newComponentModel);

                selectedRow.view.render();
                selectedRow.view.afterRender();

                var eModel = StageView.instance.getComponentModelByActionkey(cModel.get('actionkey'));

                StageView.instance.renderZIndex();

                StageView.instance.selectOneComponent(eModel);

                newComponentModel.trigger('change');

                break;


            case 'border':

                this.view.addBorder();
                break;

            case 'clean-actions-clipboard':
                StageView.instance.cleanActionsClipboard();
                break;

            case 'paste-one-trigger':

                var componentName = model.get('componentName');

                var trigger = StageView.instance.clipboardActions[componentName];

                if(trigger){
                    StageView.instance.pasteTrigger([ trigger ]);  
                }
                
                break;


        }

        this.specificAction(action);

        this.close();
    },

    checkIfModelIsHidden: function(){
        return this.model.get('hidden');
    },

    getPasteActionsTriggerName: function(trigger){

        var s = '';

        s += _lang('TRIGGER_LIST_' + trigger.whendoit) + ': ';

        var subtriggers = trigger.subtriggers;

        for (var j = 0; j < subtriggers.length; j++) {

            var whattodo = subtriggers[j].whattodo;

            s +=  _lang('TRIGGER_LIST_' + whattodo);

            if(j < subtriggers.length - 1){
                s += ', '
            }
        };

        return s;
    },

    createPasteActionsSubitems: function(){

        var _that = this;

        var subitems = new ContextMenuItemCollection();

        var clipboardActions = StageView.instance.clipboardActions;

        for (var i = 0; i < clipboardActions.length; i++) {
            var trigger = clipboardActions[i];

            

           var contextMenuItemModel = new ContextMenuItemModel({
                componentName: i,
                action: 'paste-one-trigger',
                prettyName: _that.getPasteActionsTriggerName(trigger),
                icon: 'text',
                className: 'big-btn'
            });

            subitems.add(contextMenuItemModel);
            
        };

        return subitems;
    },

    createMenuCollection: function(){

        var _that = this;

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'copy',
                action: 'copy',
                prettyName: _lang('CONTEXT_MENU_COPY'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'cut',
                action: 'cut',
                prettyName: _lang('CONTEXT_MENU_CUT'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'hide-or-show',
                action: this.checkIfModelIsHidden() ? 'show' : 'hide',
                prettyName: this.checkIfModelIsHidden() ? _lang('CONTEXT_MENU_SHOW') : _lang('CONTEXT_MENU_HIDE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'remove',
                action: 'remove',
                prettyName: _lang('CONTEXT_MENU_REMOVE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'border',
                action: 'border',
                prettyName: _lang('CONTEXT_MENU_BORDER'),
                icon: 'text',
                className: 'big-btn'
            }),
            new LeftMenuItemModel({
                componentName: 'separator',
                className: 'separator'
            }),




            // TRIGGER
            new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('TRIGGER'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-trigger',
                        action: 'copy-trigger',
                        prettyName: _lang('CONTEXT_MENU_COPY_COMPONENT_ACTIONS'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                    new ContextMenuItemModel({
                        componentName: 'clean-actions-clipboard',
                        action: 'clean-actions-clipboard',
                        prettyName: _lang('CONTEXT_MENU_CLEAN_ACTIONS_CLIPBOARD'),
                        icon: 'text',
                        className: 'big-btn',
                        disabled: StageView.instance.clipboardActions.length == 0 ? true : false
                    }),
                    new ContextMenuItemModel({
                        componentName: 'extend',
                        action: 'paste-trigger',
                        prettyName: _lang('CONTEXT_MENU_PASTE_COMPONENT_ACTIONS'),
                        icon: 'text',
                        className: 'big-btn extend',
                        disabled: StageView.instance.clipboardActions.length == 0 ? true : false,
                        subitems: _that.createPasteActionsSubitems()
                    }),
                    
                ]),
            }),


            // new LeftMenuItemModel({
            //     componentName: 'separator',
            //     className: 'separator'
            // }),

            // POSITION
           new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('POSITION'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-position',
                        action: 'copy-position',
                        prettyName: _lang('CONTEXT_MENU_COPY_POSITION'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                    new ContextMenuItemModel({
                        componentName: 'paste-position',
                        action: 'paste-position',
                        prettyName: _lang('CONTEXT_MENU_PASTE_POSITION'),
                        icon: 'text',
                        className: 'big-btn',
                        disabled: StageView.instance.copiedComponentPosition.length == 0 ? true : false
                    }),
                ]),
            }),

            // new LeftMenuItemModel({
            //     componentName: 'separator',
            //     className: 'separator'
            // }),

            // DIMENTIONS
           new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('AUTH_PROJECT_DIMENTIONS'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-dimension',
                        action: 'copy-dimension',
                        prettyName: _lang('CONTEXT_MENU_COPY_DIMENSION'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                    new ContextMenuItemModel({
                        componentName: 'paste-dimension',
                        action: 'paste-dimension',
                        prettyName: _lang('CONTEXT_MENU_PASTE_DIMENSION'),
                        icon: 'text',
                        className: 'big-btn',
                        disabled: StageView.instance.copiedComponentDimensions.length == 0 ? true : false
                    })
                ]),
            }),

            // new LeftMenuItemModel({
            //     componentName: 'separator',
            //     className: 'separator'
            // }),

            // STYLES
            new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('MENU_TOPSTYLES'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-style',
                        action: 'copy-style',
                        prettyName: _lang('CONTEXT_MENU_COPY_STYLE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                    new ContextMenuItemModel({
                        componentName: 'paste-style',
                        action: 'paste-style',
                        prettyName: _lang('CONTEXT_MENU_PASTE_STYLE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ]),
            }),

            // FLIP
            new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('MENU_FLIP'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'flip-x',
                        action: 'flip-x',
                        prettyName: _lang('CONTEXT_MENU_FLIP_X'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                    new ContextMenuItemModel({
                        componentName: 'flip-y',
                        action: 'flip-y',
                        prettyName: _lang('CONTEXT_MENU_FLIP_Y'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ]),
            }),

            // new LeftMenuItemModel({
            //     componentName: 'separator',
            //     className: 'separator'
            // }),

        ]);

        var infopointItemModel =  new ContextMenuItemModel({
                componentName: 'infopoint-popup',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_POPUP'),
                icon: 'text',
                className: 'big-btn'
            });

        var galleryItemModel =  new ContextMenuItemModel({
                componentName: 'infopoint-gallery',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_GALLERY'),
                icon: 'text',
                className: 'big-btn'
            });

        var linkItemModel =  new ContextMenuItemModel({
                componentName: 'infopoint-link',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_LINK'),
                icon: 'text',
                className: 'big-btn'
            });

        var downloadItemModel =  new ContextMenuItemModel({
                componentName: 'infopoint-download',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_DOWNLOAD'),
                icon: 'text',
                className: 'big-btn'
            });

        var soundItemModel =  new ContextMenuItemModel({
                componentName: 'infopoint-sound',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_SOUND'),
                icon: 'text',
                className: 'big-btn'
            });

        var textItemModel =  new ContextMenuItemModel({
                componentName: 'text',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_TEXT'),
                icon: 'text',
                className: 'big-btn'
            });

        var imageItemModel =  new ContextMenuItemModel({
                componentName: 'image',
                action: 'convert',
                prettyName: _lang('CONTEXT_MENU_CONVERT_TO_IMAGE'),
                icon: 'text',
                className: 'big-btn'
            });

        var contextMenuItemModel = new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('CHANGE_TO'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection()
            });


        var type = this.model.get('type');

        if(infopointItemModel.get('componentName') == type)infopointItemModel.set('disabled', true);
        if(galleryItemModel.get('componentName') == type)galleryItemModel.set('disabled', true);
        if(linkItemModel.get('componentName') == type)linkItemModel.set('disabled', true);
        if(downloadItemModel.get('componentName') == type)downloadItemModel.set('disabled', true);
        if(soundItemModel.get('componentName') == type)soundItemModel.set('disabled', true);
        if(imageItemModel.get('componentName') == type)imageItemModel.set('disabled', true);
        if(textItemModel.get('componentName') == type)textItemModel.set('disabled', true);

        switch(type){
            case 'infopoint-download':
            case 'infopoint-gallery':
            case 'infopoint-link':
            case 'infopoint-popup':
            case 'infopoint-sound':

                contextMenuItemModel.get('subitems').add(infopointItemModel);
                contextMenuItemModel.get('subitems').add(galleryItemModel);
                contextMenuItemModel.get('subitems').add(linkItemModel);
                contextMenuItemModel.get('subitems').add(downloadItemModel);
                contextMenuItemModel.get('subitems').add(soundItemModel);
                contextMenuItemModel.get('subitems').add(imageItemModel);

                var contents = this.model.get('contents');
                if(contents){

                    contextMenuItemModel.get('subitems').add(textItemModel);
                }

                contextMenuItemCollection.add(contextMenuItemModel);
                break;

            case 'image':

                contextMenuItemModel.get('subitems').add(infopointItemModel);
                contextMenuItemModel.get('subitems').add(galleryItemModel);
                contextMenuItemModel.get('subitems').add(linkItemModel);
                contextMenuItemModel.get('subitems').add(downloadItemModel);
                contextMenuItemModel.get('subitems').add(soundItemModel);
                contextMenuItemModel.get('subitems').add(imageItemModel);

                var contents = this.model.get('contents');

                _log('contents', contents);

                if(contents != undefined){

                    contextMenuItemModel.get('subitems').add(textItemModel);
                }

                contextMenuItemCollection.add(contextMenuItemModel);

                break;

            case 'text':



                var imageFileName = this.model.get('imageFileName');
                if(imageFileName != undefined){

                    contextMenuItemModel.get('subitems').add(infopointItemModel);
                    contextMenuItemModel.get('subitems').add(galleryItemModel);
                    contextMenuItemModel.get('subitems').add(linkItemModel);
                    contextMenuItemModel.get('subitems').add(downloadItemModel);
                    contextMenuItemModel.get('subitems').add(soundItemModel);
                    contextMenuItemModel.get('subitems').add(textItemModel);
                    contextMenuItemModel.get('subitems').add(imageItemModel);

                    contextMenuItemCollection.add(contextMenuItemModel);
                }


                break;

        }



            // LAYERS
        var contextMenuItemModel = new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('TIMELINE_ROW'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'move-components-to-new-line',
                        action: 'move-components-to-new-line',
                        prettyName: _lang('CONTEX_TMENU_MOVE_COMPONENTS_TO_NEW_LINE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),

                    new ContextMenuItemModel({
                        componentName: 'copy-components-to-new-line',
                        action: 'copy-components-to-new-line',
                        prettyName: _lang('CONTEX_TMENU_COPY_COMPONENTS_TO_NEW_LINE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ])
            });

        contextMenuItemCollection.add(contextMenuItemModel);

        this.addComponentSpecificMenu(contextMenuItemCollection);

        return contextMenuItemCollection;
    },

    flipX: function(){

        this.model.flipX();

    },

    flipY: function(){

        this.model.flipY();

    },

    addComponentSpecificMenu: function(contextMenuItemCollection){

        var contextMenuItemModel = this.getSpecificMenu();

        if(_.isUndefined(contextMenuItemModel)){
            return;
        }

        contextMenuItemCollection.add(this.getSepearator(), { at:0 });    
        contextMenuItemCollection.add(contextMenuItemModel.models, { at:0 });
        
    },

    getSepearator: function(){
        return new LeftMenuItemModel({
                componentName: 'separator',
                className: 'separator'
            });
    },

    getSpecificMenu: function(){
        return undefined;
    },

    specificAction: function(){
        // To override
    },

});
