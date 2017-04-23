var NotEditableStageView = StageView.extend({

	className: 'stage-view-wrapper not-editable-stage-view-wrapper',

	template: _.template($('#not-editable-stage-empty-template').html()),

	events: {
        'mousedown': 'onMouseDown',
        'mouseup': 'onMouseUp',
    },

    initialize: function() {
        var _that = this;

        this.selectedComponentsCollection = new ComponentCollection();

        this.stageSelector = new StageSelector();
        this.stageSelector.$el = this.$el;
        this.stageSelector.scc = this.selectedComponentsCollection;
        this.stageSelector.model = this.model;
        this.stageSelector.start();

        this.timeout = function(){};

        // $(window).resize(function(e){

        //     if( e.target == window){
        //         _that.onWindowResize(e);
        //     }
        // });
    },

    showContextMenu: function(e) {

        var contextMenuView = new NotEditableStageContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    renderSingleComponent :function( componentModel ){

        var _that = this;

        componentModel.ownerId = this.model.ownerId;
        componentModel.projectId = this.model.projectId;

        var componentView = ComponentFactoryNotEditable.createComponentByModel( componentModel );
        this.$el.find('.stage-view').append(componentView.render().$el);
        componentView.afterRender();

        componentView.on('select-component', function(cModel, e){

            //if(!cModel.get('locked') && !cModel.get('hidden')){
            // if(!cModel.get('locked') && !cModel.get('hidden')){
            //     _that.setActiveModel( cModel, e );
            // }

            _that.selectOneComponent(cModel, e);
        });


        componentView.on('multi-select', function(cModel){

            // if(!cModel.get('locked') && !cModel.get('hidden')){
            //     _that.addToSelectedComponentsCollection(cModel);
            // }

            _that.stageSelector.selectMultiComponents(cModel);

        });

        componentView.on('copy-components-from-other-project', function(cModel){

            _that.copyComponentsFromOtherProject(cModel);
        
        });

    
        return componentView;
    },

    copyComponentsFromOtherProject: function(model){

        var _that = this;

        _log('copyComponents this.model', model);
        _log('stage model', this.model);

        var cc = new ComponentCollection();
        cc.add(model);

        var sortedCC = this.model.getSortedComponentsCollection(this.selectedComponentsCollection);

        var components = sortedCC;
        var sourcePageId = '' + this.model.get('options').get('pageid');
        var sourceProjectId = this.model.projectId;
        var sourceUserId = this.model.ownerId;

        DataAccess.copyComponentsFromOtherProject(
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

                StageView.instance.hash = hash;
            },
            function(data) {
                _log('Copy components fault: ', data, _log.dataaccessOutFault);
            }
        );
    },
});