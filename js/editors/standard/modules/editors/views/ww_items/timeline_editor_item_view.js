var TimelineEditorItemView = EditorItemView.extend({

	className: 'timeline-editor-item-view',

	template: _.template($('#timeline-editor-item-view-template').html()),


	timelineType: 'classic',

	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.timelineEditor = function(){};
        this.timelineEditor.destroy = function(){};
        this.timelineEditor.setCollection = function(){};
        this.timelineEditor.setModel = function(){};


        this.timelineComponentsCollectionEditorView = EditorsFactory.createTimelineComponentsCollectionEditor();
        this.timelineComponentEditorView = EditorsFactory.createTimelineComponentEditor();
        this.timelineStageEditorView = EditorsFactory.createTimelineStageEditor();
        this.timelineRowEditorView = EditorsFactory.createTimelineRowEditor();

    	$(window).resize(function(e){

            if( e.target == window){
                _that.onWindowResize(e);
            }
        });
  	},

  	onWindowResize: function(e){
         this.timeline.onWindowResize();
    },

	afterRender: function(){

		this.timeline = new ClassicTimelineView();
        this.timeline.collection = new ComponentCollection();
        //this.timeline.model = this.model;

        this.addListenersToTimeline();

        this.$el.find('.botmenu-timeline-rows-wrapper').append(this.timeline.render().$el);
        this.timeline.afterRender();
	},

	setModelToEditor: function(model){

        _log('render timeline');

        this.model = model;

        if(this.editorItemModel.get('isBinding')){

            if(!this.isSelected){
                return;
            }
        }
        
        this.timeline.afterRender();


        this.timelineEditor.destroy();

        if(model instanceof ComponentModel){
            _log('ComponentModel', model);

            this.timelineEditor = this.timelineComponentEditorView;

            this.timelineEditor.setModel(model);
            this.$el.find('.botmenu-timeline-editor-wrapper').html(this.timelineEditor.render().$el);
            this.timelineEditor.afterRender();

            return;

        }

        if(model instanceof PageModel){
            _log('PageModel', model);

            this.timelineEditor = this.timelineStageEditorView;
            this.timelineEditor.on('change-timeline', this.changeTimeline, this);
            this.timelineEditor.setModel(model.get('options'));
            this.$el.find('.botmenu-timeline-editor-wrapper').html(this.timelineEditor.render().$el);
            this.timelineEditor.afterRender();

            return;

        }

        if(model instanceof ComponentCollection){
            _log('ComponentCollection', model);

            this.timelineEditor = this.timelineComponentsCollectionEditorView;

            this.timelineEditor.setCollection(model);
            this.$el.find('.botmenu-timeline-editor-wrapper').html(this.timelineEditor.render().$el);
            this.timelineEditor.afterRender();

            return;

        }

        if(model instanceof TimelineRowModel){
            _log('TimelineRowModel', model);

            if(model.cid != model.collection.last().cid){

                this.timelineEditor = this.timelineRowEditorView;

                this.timelineEditor.setCollection( model.get('objects') );
                this.timelineEditor.setRowModel( model.get('options') );

                this.$el.find('.botmenu-timeline-editor-wrapper').html(this.timelineEditor.render().$el);
                this.timelineEditor.afterRender();
            }

            return;
        }

	},


    changeTimeline: function(){

        this.timeline.remove();

        if(this.timelineType == 'layers'){

            this.timelineType = 'classic';
            this.timeline = new ClassicTimelineView();

        } else if(this.timelineType == 'classic'){
            this.timelineType = 'layers';
            this.timeline = new LayersTimelineView();
        }

        this.timeline.setModel(this.model);

        this.addListenersToTimeline();

        this.$el.find('.botmenu-timeline-rows-wrapper').html(this.timeline.render().$el);

        this.timeline.afterRender();
    },

	setStageModelToEditor: function(pModel){

		//this.model = pModel

		// this.timeline.collection = pModel.get('lines');
  //       this.timeline.model = pModel;

        this.timeline.setModel(pModel);

        this.timeline.render();
        this.timeline.afterRender();

        this.timeline.selectRow( pModel.get('lines').first() );
	},

	addListenersToTimeline: function(){

        var _that = this;

        this.timeline.off('data-picker-picked');
        this.timeline.on('data-picker-picked', function(cModel){

            _that.trigger('data-picker-picked', cModel);

        });
//
//        this.timeline.off('data-picker-picked-row1');
//        this.timeline.on('data-picker-picked-row1', function(rowModel){
//
//            _that.trigger('data-picker-picked', rowModel);
//
//        });

        this.timeline.on('update-stage', function() {
            //_that.render();
            _that.renderZIndex();
        });

        this.timeline.on('select-component', function(cModel, e) {

            _log('select-component', cModel, _log.error);

            //if(!cModel.get('locked') && !cModel.get('hidden')){
            if(!cModel.get('locked')){
                StageView.instance.selectOneComponent( cModel, e );
            }

        });

        this.timeline.on('select-row', function(rowModel) {
            _that.onRowSelected(rowModel);
        });

        this.timeline.on('update-sort-in-one-line', function(model, position, line, lineFromRemove){

            _that.saveTimeline('update-sort-in-one-line', model, position, line, lineFromRemove );
        });

        this.timeline.on('update-sort-in-two-line', function(model, position, line, lineFromRemove){

            _that.saveTimeline('update-sort-in-two-line', model, position, line, lineFromRemove );
        });

        this.timeline.on('update-sort-add-new-line', function(model, position, line){

            _that.saveTimeline('update-sort-add-new-line', model, position, line );
        });

        this.timeline.on('update-sort-sort-rows', function(model, position, line){

            _that.saveTimeline('update-sort-sort-rows', model, position, line );
        });

        this.timeline.on('unselect-model', function(model){
            StageView.instance.stageSelector.reset();
        });

    },

    changeTimeline: function(){

        this.timeline.remove();

        if(this.timelineType == 'layers'){

            this.timelineType = 'classic';
            this.timeline = new ClassicTimelineView();

        } else if(this.timelineType == 'classic'){
            this.timelineType = 'layers';
            this.timeline = new LayersTimelineView();
        }

        this.timeline.collection = this.model.get('lines');
        this.timeline.model = this.model;

        this.addListenersToTimeline();

        this.$el.find('.botmenu-timeline-rows-wrapper').html(this.timeline.render().$el);

        this.timeline.afterRender();
    },

    onRowSelected: function(rowModel){

        var _that = this;

        StageView.instance.stageSelector.reset();

        rowModel.get('objects').each( function(componentModel){

            StageView.instance.selectMultiComponentsSilent(componentModel);
        });

        this.trigger('on-row-selected', rowModel, this);
    },

    saveTimeline : function(action, componentModel, position, line, lineFromRemove ){

        var _that = this;

        DataAccess.updateTimeline(
            {page: _that.model, action:"UpdateTimeline", component: componentModel, position:position, line:line, lineFromRemove:lineFromRemove, action:action },
            function(data) { _log('Update timeline result: ', data, _log.dataaccessOutResult)  },
            function(data) { _log('Update timeline fault: ', data, _log.dataaccessOutFault)  }
        );

    },

});