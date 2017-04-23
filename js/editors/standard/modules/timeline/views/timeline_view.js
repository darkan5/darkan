var TimelineView = Backbone.View.extend({
	//el: $('#botmenu-timeline'),
	tagName: 'div',
    className: 'timeline-classic-rows-wrapper',

    template: _.template($('#timeline-template').html()),

    events: {
        'sort-rows-back': 'sortRows',
        'data-picker-picked-object1': 'dataPickerPickedObject',
        'data-picker-picked-line1': 'dataPickerPickedLine'
    },

    dataPickerPickedObject: function(event, cModel) {

        this.trigger('data-picker-picked', cModel);
    },

    dataPickerPickedLine: function(event, rowModel) {

        this.trigger('data-picker-picked', rowModel);
    },

	initialize: function() {

  	},

    updateTimeline: function(){
        this.render();
        this.afterRender();
    },

    onWindowResize:function(e){

        this.collection.each(function(rowModel) {
            rowModel.view.onResize(e);
        });
    },

    sortRows :function(event, model, position){

        var _that = this;

        // position = this.collection.length - position;

        var rowId = model.get('options').get('id');

        // this.trigger('update-sort-sort-rows', null, position, line);

        // this.trigger('update-stage', this.collection);

        DataAccess.sortRows(
            { 
                rowId:rowId, 
                position:position,
                pageId:StageView.instance.model.getPageId() 
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

        this.render();
        this.afterRender();

        StageView.instance.renderZIndex();

    },

    updateRowOptionsResult: function(data){

        var rowModel = this.model.updateRowOptions(data);

        if(!rowModel){
            return;
        }

        rowModel.view.render();
        rowModel.view.afterRender();
    },

    addListenersToRow: function( rowItemView ) {

        var _that = this;

        // rowItemView.on('update-sort-in-one-line', function(model, position, line){

        //     _that.trigger('update-stage', _that.collection);

        //     _that.trigger('update-sort-in-one-line', model, position, line);

        //     User.getModel().get('activeComponent').setActive( true );

        //     var activeRow = _that.getSelectedRow();
        //     _that.selectRow( activeRow );
        // });

        // rowItemView.on('update-sort-in-two-line', function(model, position, line){

        //     _that.trigger('update-sort-in-two-line', model, position, line);

        //     _that.trigger('update-stage', _that.collection);

        //     User.getModel().get('activeComponent').setActive( true );

        //     _that.render();
        //     _that.afterRender();

        // });

        // rowItemView.on('update-sort-coming', function(model, position, line){

        //     _that.trigger('update-stage', _that.collection);

        // });

        rowItemView.on('select-row', function(selectedRowModel){

            _that.selectRow( selectedRowModel );

            //_that.selectComponentsInRow( selectedRowModel );

            selectedRowModel.view.render();
            selectedRowModel.view.afterRender();

            _that.trigger('select-row', selectedRowModel, this);

            //_that.trigger('save-changes', [_that.collection]);

        });

        rowItemView.on('select-component', function( selectedComponentModel, e){

            _that.trigger('select-component', selectedComponentModel, e);
        });

        rowItemView.on('unselect-model', function( componentModel, e){

            _that.trigger('unselect-model', componentModel, e);
        });

        rowItemView.on('move-components-to-layer', this.moveComponentsToLayer, this);

       

        rowItemView.on('render-timeline', function(){

            _log('render-timeline _that.model', _that.model);

            _that.render();
            _that.afterRender();
        });

        rowItemView.on('scroll-to-active-component', this.scrollToActiveComponent, this);

        
    },

    moveComponentsToLayer: function(rowId, position){

        var _that = this;

        _log('rowId', rowId);
        _log('position', position);

        var scc = StageView.instance.selectedComponentsCollection;

        _log('selectedComponentsCollection', scc);

        var actionkeys = _.pluck(scc.toJSON(), 'actionkey');

        _log('actionkeys', actionkeys);

        DataAccess.moveComponentsToLayer(
            { 
                rowId:rowId, 
                actionkeys:actionkeys, 
                position:position,
                pageId:StageView.instance.model.getPageId() 
            },
            function(data) { 
                _log('Move components to layer result: ', data, _log.dataaccessOutResult);

                _that.onMoveComponentsResult(data);

            },
            function(data) { 
                _log('Move components to layer fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    onMoveComponentsResult: function(data){

        var _that = this;

        _log('onMoveComponentsResult this.model', this.model);

        var cc = this.model.moveComponentsToLayer(data);

        this.render();
        this.afterRender();

        this.scrollToActiveComponent(cc.first());


        StageView.instance.renderZIndex();
    },

    removeLayersByIds: function(deletedLayersIds) {

        var _that = this;

        var emptyRowsToRemove = [];

        for (var i = 0; i < deletedLayersIds.length; i++) {
            var lineId = deletedLayersIds[i];

            var line = this.getRowModelByLineId(lineId);

            emptyRowsToRemove.push(line);
        };

        this.collection.remove(emptyRowsToRemove);
    },


    renderSingleRow: function(rowItem, i) {

    },

    updateSortAddNewLine : function(data){

        var line =  data.line;
        var lineFromRemove =  data.lineFromRemove;
        var component =  data.component;

        var componentModel = this.getComponentModelByActionkey( component.actionkey );

        var rowFromRemoveModel = this.getRowModelByComponentModel( componentModel );
        rowFromRemoveModel.get('objects').remove( componentModel );

        var rowModel = this.addNewLineComing(line);
        rowModel.get('objects').add( componentModel );

        this.render();
    },

    updateSortInTwoLineComing: function(data){


        var position =  data.position;
        var line =  data.line;
        var component =  data.component;

        for (var j = 0; j < component.length; j++) {
            var comp = component[j];

            var componentModel = this.getComponentModelByActionkey( comp.actionkey );

            var rowModel = this.getRowModelByLineId( line );
            var rowFromRemoveModel = this.getRowModelByComponentModel( componentModel );

            rowFromRemoveModel.get('objects').remove( componentModel );

            if(rowModel != undefined){
                rowModel.get('objects').add( componentModel, {at:position });
            }
        }


        this.render();
        this.afterRender();
    },

    updateSortInOneLineComing :function(data){


        var position =  data.position;
        var line =  data.line;
        var component =  data.component;

        var rowModel = this.getRowModelByLineId( line );

        for (var j = 0; j < component.length; j++) {
            var comp = component[j];

            var componentModel = this.getComponentModelByActionkey( comp.actionkey );

            var rowFromRemoveModel = this.getRowModelByComponentModel( componentModel );
            rowFromRemoveModel.get('objects').remove( componentModel );

//            if(rowModel == undefined){
//
//                var timelineRowModel = this.addNewLineComing( line );
//                timelineRowModel.addNewComponent( componentModel );
//                timelineRowModel.render();
//
//            }else{
//
//                rowModel.updateSortComing( componentModel, position );
//            }

            if(rowModel != undefined){
                rowModel.get('objects').add( componentModel, {at:position });
            }

        }

        //rowModel.updateSortComing( componentModel, position );

        this.render();
        this.afterRender();

        var activeRow = this.getSelectedRow();
        this.selectRow( activeRow );
    },

    updateSortSortRows : function(data){

        var position =  data.position;
        var lineId =  data.line;
        var rowModel =  this.getRowModelByLineId( lineId );

        this.collection.remove(rowModel);
        this.collection.add(rowModel, {at: position});

        this.render();
        this.afterRender();

        this.trigger('update-stage', this.collection);
    },

    getComponentModelByActionkey : function( actionkey ){

        return this.model.getComponentModelByActionkey(actionkey);

        // var componentModel;


        // this.collection.each(function(item) {
        //     var objects = item.get('objects');

        //     objects.each(function(model){

        //         if(model.get('actionkey') == actionkey  ){
        //             componentModel =  model;



        //         }
        //     });
        // });

        // return componentModel;
    },

    deleteComponentModel: function( componentModel ) {

        this.collection.each(function(item) {
            var objects =  item.get('objects');
            objects.remove( componentModel );
        });

        componentModel.isDeleted = true;
        componentModel.view.destroy();

    },

    removeComponentModelFromCollection: function( componentModel ) {

        this.collection.each(function(line) {
            var objects =  line.get('objects');

            var index = objects.indexOf(componentModel);

            if(index !== -1){
                objects.remove( componentModel );
                return line;
            }
        });

        return false;
    },

    getRowModelByLineId :function( rowId ){

        return this.model.getRowModelByLineId(rowId);

        // var finedRow;

        // var selectedRowId = parseInt(rowId);

        // this.collection.each(function(row) {
        //     if(row.get('options').get('id') == selectedRowId){
        //         finedRow = row;
        //     }
        // });

        // return finedRow;
    },

//     removeEmptyRows: function() {

//         var _that = this;

//         var emptyRowsToRemove = [ ];

//         if(this.collection.length > 1){

//             this.collection.each(function(item, i) {
//                 if (item.get('objects').length === 0 && i < _that.collection.length - 1) {
//                     emptyRowsToRemove.push(item)
//                 }
//             });
//         }

//         if(this.collection.length == 0){
//             this.addNewLine();
//         }


//         this.collection.remove(emptyRowsToRemove);

//         if(this.collection.length == 1){

//             this.selectRow( this.collection.first() );
//         }

// //        if(emptyRowsToRemove.length > 0){
// //            this.render();
// //        }

//     },

    renderEmptyRow :function(){


    },

    getRowModelByComponentModel :function( componentModel ){

        var actionkey = componentModel.get('actionkey');

        var rowModel;

        this.collection.each(function(row) {
            row.get('objects').each(function(model){
                 if(model.get('actionkey') == actionkey){
                     rowModel = row;
                 }
            });
        });

        return rowModel;
    },

    addNewLineComing : function( rowId ){



        var timelineRowModel = new TimelineRowModel({
            options: new TimelineRowOptionsModel({
                id: this.model.get('options').get('lastLineId')
            }),

            objects: new TimelineItemCollection()

        });

        this.collection.add(timelineRowModel);

        if(this.collection.length == 1){
            this.selectRow( timelineRowModel );
        }

        //this.render();

        return timelineRowModel;
    },

    addLine : function(newLine){

        var timelineRowOptionsModel = new TimelineRowOptionsModel(newLine.options);

        var timelineRowModel = new TimelineRowModel(newLine);
        timelineRowModel.set('options', timelineRowOptionsModel);
        timelineRowModel.set('objects', new ComponentCollection);
        this.collection.add(timelineRowModel);
    },

    // addNewLine : function(){

    //     var _that = this;

    //     var lastLineId = this.model.get('options').get('lastLineId') + 1;

    //     var nextLineId = this.getNextLineId(lastLineId);

    //     this.model.get('options').set('lastLineId', nextLineId);

    //     var timelineRowModel = new TimelineRowModel({
    //         options: new TimelineRowOptionsModel({
    //             id: nextLineId
    //         }),

    //         objects: new TimelineItemCollection()

    //     });

    //     this.collection.add(timelineRowModel);

    //     if(this.collection.length == 1){
    //         this.selectRow( timelineRowModel );
    //     }

    //     return timelineRowModel;

    // },

    getNextLineId :function(lastLineId){

        var rowModel = this.getRowModelByLineId(lastLineId);

        if(rowModel){

            return this.getNextLineId(lastLineId + 1);

        }else{
            
            return lastLineId;
        }
    },

    selectRow :function( selectedRowModel ){

        if(selectedRowModel != undefined){

            User.getModel().set('activeRowId', selectedRowModel.get('options').get('id') );

            this.collection.each(function(row) {
                row.setActive( false );
            });


            selectedRowModel.setActive( true );
        }
    },

    selectComponentsInRow :function( row ){

        this.collection.each(function(rowModel){

            if(rowModel.cid != row.cid){

                rowModel.get('objects').each(function(model){
                    model.setActive( false );
                });
            }
        });

        row.get('objects').each(function(model){
            model.setActive( true );
        })
    },

    getSelectedRow :function(){

        var activeRowId = User.getModel().get('activeRowId');

        var activeRow;

        this.collection.each(function(row) {
            if(row.get('options').get('id') == activeRowId){
                activeRow = row;
            }
        });

        if(activeRow == undefined){

            var index = this.collection.length - 2;

            if(index < 0){
                index = 0;
            }

            activeRow =  this.collection.at( index );
        }

        return activeRow;
    },

	setModel: function(pModel) {

        this.model = pModel;
		this.collection = pModel.get('lines');

        this.model.on('update-timeline', this.updateTimeline, this);

		this.render();
	},

    disableComponentModel: function(componentModel){
        componentModel.disable();
    },

    findNotLockedRow: function(activeRow){

        return this.model.findNotLockedRow(activeRow);
    },

    sortCollectionByRow: function( componentsCollection ) {

        var _that = this;

        var tempArray = [];

        componentsCollection.each(function(model){

            var rowModel = _that.getRowModelByComponentModel(model);

            var componentIndex = rowModel.get('objects').indexOf(model);

            var rowIndex = _that.collection.indexOf(rowModel);

            var tempString = _that.pad(rowIndex) + _that.pad(componentIndex);

            tempArray.push( { model:  model, id:tempString });

            tempArray.sort( function(a, b){
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            } );
        });

        var tempCollection = new ComponentCollection();

        for (var i = 0; i < tempArray.length; i++) {
            var model = tempArray[i].model;

            tempCollection.add(model);
        };

        return tempCollection;

    },

    pad : function(val, len) {
        val = String(val);
        len = len || 3;
        while (val.length < len) val = "0" + val;
        return val;
    },

    resetTimeline: function(){

        User.getModel().set('activeRowId', 0 );

        this.collection.reset();
        this.render();
    },

    renderComing:function(){
        this.render(true);
        this.afterRender();
    },

    renderEmptyRow :function(){

        var _that = this;

//        var emptyRowItemView = new TimelineEmptyRowView();
//
//        emptyRowItemView.on('create-new-row', function(componentModel){
//
//            var timelineRowModel = _that.addNewLine( );
//
//            var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;
//
//            if(selectedComponentsCollection.length > 1){
//
//                selectedComponentsCollection.each(function(model, i){
//                    timelineRowModel.addNewComponent( model );
//                });
//
//                _that.render();
//
//
//                var line = timelineRowModel.get('options').get('id');
//
//                if(_that.collection.length > 1){
//                    _that.trigger('update-sort-add-new-line', componentModel, 0, line);
//                }
//
//                selectedComponentsCollection.each(function(model, i){
//                    timelineRowModel.view.addToCollection('', model, i, false);
//                });
//
//                StageView.instance.render();
//
//
//            }else{
//
//                timelineRowModel.addNewComponent( componentModel );
//
//                _that.render();
//
//                var line = timelineRowModel.get('options').get('id');
//
//                if(_that.collection.length > 1){
//                    _that.trigger('update-sort-add-new-line', componentModel, 0, line);
//                }
//            }
//
//        });
//
//
//        this.$el.append(emptyRowItemView.render().el);
    },

    render: function(coming) {
        var _that = this;

        this.collection.each(function(rowModel){
            rowModel.get('objects').each(function(cModel){
                cModel.trigger('selected-by-miniature', false);
            });
        });
        

        var timelineTemplate = this.template();
        this.$el.html(timelineTemplate);

        //this.removeEmptyRows();

        this.lineShowtime = 0;

        this.collection.each(this.renderSingleRow, this);

        
        // for (var i = this.collection.length - 1; i >= 0; i--) {
        //     var rowModel = this.collection.at(i);
        //     this.renderSingleRow(rowModel, i);
        // };


        // if(this.collection != undefined){

        //     var lastRowModel = this.collection.last();

        //     if(lastRowModel != undefined){
        //         if(lastRowModel.get('objects').length > 0){

        //             if(coming){
        //                 this.addNewLineComing();
        //             }else{
        //                 this.addNewLine();
        //             }

        //             this.render();
        //         }
        //     }
        // }

        //this.renderEmptyRow();

        var activeRow = this.getSelectedRow();
        this.selectRow( activeRow );

        // this.$el.parent().perfectScrollbar();

        return this;
    },

    afterRender :function(){

        this.collection.each(function(rowModel){
            rowModel.view.afterRender();
        }, this);
    },

    renderRows: function(){
        this.collection.each(function(rowModel){
            rowModel.view.afterRender();
        }, this);
    },

    getAllComponents: function(){

        var componentsCollection = new ComponentCollection();

        this.collection.each(function(row) {
            row.get('objects').each(function(model){
                componentsCollection.add(model);
            });
        });

        return componentsCollection;
    },

    componentExist: function(actionkey){

        return this.model.componentExist(actionkey);
    },

    replaceComponentModel : function( oldComponentModel, newComponentModel ){

        return this.model.replaceComponentModel(oldComponentModel, newComponentModel);
    },

    scrollToActiveComponent: function(cModel) {




        //var activeMiniatureOffset = cModel.miniatureView.$el.offset().top;
        var activeMiniatureOffset = cModel.miniatureView.$el.offsetRelative('.botmenu-timeline-rows-wrapper').top;
        var activeMiniatureHeight = cModel.miniatureView.$el.height();
        var timelineHeight = this.$el.parent().height();
        this.$el.parent().scrollTop(activeMiniatureOffset - timelineHeight/2 - activeMiniatureHeight/2);   

        _log('scrollToActiveComponent', cModel);
        _log('activeMiniatureOffset', activeMiniatureOffset);
        _log('activeMiniatureHeight', activeMiniatureHeight);
        _log('timelineHeight', timelineHeight);

        _log('scrollTop', activeMiniatureOffset - timelineHeight/2 - activeMiniatureHeight/2);

        _log('this.$el', this.$el);

    },


});