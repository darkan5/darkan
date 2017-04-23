var TimelineView = Backbone.View.extend({
	el: $('#botmenu-timeline'),
	tagName: 'li',

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

        // Sortable for all lines
        this.$el.sortable({
            items: "> .timeline-main-list:not(.timeline-empty-row)",
            placeholder: "timeline-highlight-container",
            delay: 150,
            handle: '.timelinerow-label',

            stop: function(event, ui) {
                ui.item.trigger('sort-rows', ui.item.index());
            }
        });

  	},

    sortRows :function(event, model, position){

        this.collection.remove(model);
        this.collection.add(model, {at: position});


        var line = model.get('options').get('id');

        this.trigger('update-sort-sort-rows', null, position, line);

        this.trigger('update-stage', this.collection);

        //this.render();
    },


    render: function() {
        var _that = this;

		this.$el.html('');

        this.removeEmptyRows();

        this.lineShowtime = 0;

		this.collection.each(this.renderSingleRow, this);
        this.renderEmptyRow();


        var activeRow = this.getSelectedRow();
        this.selectRow( activeRow );



        this.$el.parent().perfectScrollbar({
            useKeyboard: false
        });


		return this;
	},


    renderSingleRow: function(rowItem) {
        var _that = this;

        this.lineShowtime += parseFloat(rowItem.get('options').get('delay'));


        var rowItemView = new TimelineRowView({ model: rowItem, showtime: this.lineShowtime });


        rowItemView.on('update-sort-in-one-line', function(model, position, line){

            _that.trigger('update-stage', _that.collection);

            _that.trigger('update-sort-in-one-line', model, position, line);

            User.getModel().get('activeComponent').setActive( true );

            var activeRow = _that.getSelectedRow();
            _that.selectRow( activeRow );
        });

        rowItemView.on('update-sort-in-two-line', function(model, position, line){

            _that.trigger('update-sort-in-two-line', model, position, line);

            _that.trigger('update-stage', _that.collection);

            User.getModel().get('activeComponent').setActive( true );

            _that.render();

        });

        rowItemView.on('update-sort-coming', function(model, position, line){

            _that.trigger('update-stage', _that.collection);

        });

        rowItemView.on('select-row', function(selectedRowModel){

            _that.selectRow( selectedRowModel );

            _that.selectComponentsInRow( selectedRowModel );

            _that.render();

            _that.trigger('select-row', selectedRowModel, this);

            //_that.trigger('save-changes', [_that.collection]);

        });

        rowItemView.on('select-component', function( selectedComponentModel, e){

            _that.trigger('select-component', selectedComponentModel, e);
        });

        rowItemView.on('unselect-model', function( componentModel, e){

            _that.trigger('unselect-model', componentModel, e);
        });


        this.$el.append(rowItemView.render().el);

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

        var componentModel = this.getComponentModelByActionkey( component.actionkey );

        var rowModel = this.getRowModelByLineId( line );
        var rowFromRemoveModel = this.getRowModelByComponentModel( componentModel );

        rowFromRemoveModel.get('objects').remove( componentModel );

        if(rowModel != undefined){
            rowModel.get('objects').add( componentModel, {at:position });
        }

        this.render();
    },

    updateSortInOneLineComing :function(data){

        var position =  data.position;
        var line =  data.line;
        var component =  data.component;

        var componentModel = this.getComponentModelByActionkey( component.actionkey );

        var rowModel = this.getRowModelByLineId( line );



        if(rowModel == undefined){



            var timelineRowModel = this.addNewLineComing( line );
            timelineRowModel.addNewComponent( componentModel );
            timelineRowModel.render();

        }else{

            rowModel.updateSortComing( componentModel, position );
        }

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

        this.trigger('update-stage', this.collection);
    },

    getComponentModelByActionkey : function( actionkey ){

        var componentModel;


        this.collection.each(function(item) {
            var objects = item.get('objects');

            objects.each(function(model){

                if(model.get('actionkey') == actionkey  ){
                    componentModel =  model;



                }
            });
        });

        return componentModel;
    },

    deleteComponentModel: function( componentModel ) {

        componentModel.view.destroy();

        this.collection.each(function(item) {
           var objects =  item.get('objects');
           objects.remove( componentModel );
        });

//        if(this.collection.length <= 1){
//            this.model.get('options').set('activeRow', null);
//        }
    },

    getRowModelByLineId :function( rowId ){

        var finedRow;

        var selectedRowId = parseInt(rowId);

        this.collection.each(function(row) {
            if(row.get('options').get('id') == selectedRowId){
                finedRow = row;
            }
        });

        return finedRow;
    },

    removeEmptyRows: function() {

        var _that = this;

        var emptyRowsToRemove = [ ];

        if(this.collection.length > 1){

            this.collection.each(function(item, i) {
                if (item.get('objects').length === 0 && i < _that.collection.length - 1) {
                    emptyRowsToRemove.push(item)
                }
            });
        }

        if(this.collection.length == 0){
            this.addNewLine();
        }


        this.collection.remove(emptyRowsToRemove);

        if(this.collection.length == 1){

            this.selectRow( this.collection.first() );
        }

//        if(emptyRowsToRemove.length > 0){
//            this.render();
//        }

    },

    renderEmptyRow :function(){

        var _that = this;

        var emptyRowItemView = new TimelineEmptyRowView();

        emptyRowItemView.on('create-new-row', function(componentModel){

            var timelineRowModel = _that.addNewLine( );

            var selectedComponentsCollection = StageView.instance.selectedComponentsCollection;

            if(selectedComponentsCollection.length > 1){

                selectedComponentsCollection.each(function(model, i){
                    timelineRowModel.addNewComponent( model );
                });

                _that.render();


                var line = timelineRowModel.get('options').get('id');

                if(_that.collection.length > 1){
                    _that.trigger('update-sort-add-new-line', componentModel, 0, line);
                }

                selectedComponentsCollection.each(function(model, i){
                    timelineRowModel.view.addToCollection('', model, i, false);
                });

                StageView.instance.render();


            }else{

                timelineRowModel.addNewComponent( componentModel );

                _that.render();

                var line = timelineRowModel.get('options').get('id');

                if(_that.collection.length > 1){
                    _that.trigger('update-sort-add-new-line', componentModel, 0, line);
                }
            }

        });


        this.$el.append(emptyRowItemView.render().el);
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

    addNewLine : function(){



        this.model.get('options').set('lastLineId', this.model.get('options').get('lastLineId') + 1);

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

        return timelineRowModel;

        //this.trigger('save-changes', componentModel, 0, line);

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
        })

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

	setModel: function(collection) {
		this.collection = collection;
		this.render();
	},

    disableComponentModel: function(componentModel){
        componentModel.disable();
    },

    findNotLockedRow: function(activeRow){


        var _that = this;

        var notLockedRow;

        if(this.collection != undefined){
            var activeRowIndex = this.collection.indexOf(activeRow);

            this.collection.each(function(row) {

                if(notLockedRow == undefined){

                    var options = row.get('options');

                    var rowIndex = _that.collection.indexOf(row);

                    if( rowIndex >= activeRowIndex && options.get('locked') == false ){
                        notLockedRow = row;
                    }
                }
            });
        }

        return notLockedRow;
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
    },

    render: function(coming) {
        var _that = this;

        this.$el.html('');

        this.removeEmptyRows();

        this.lineShowtime = 0;

        this.collection.each(this.renderSingleRow, this);

        if(this.collection != undefined){

            var lastRowModel = this.collection.last();

            if(lastRowModel != undefined){
                if(lastRowModel.get('objects').length > 0){

                    if(coming){
                        this.addNewLineComing();
                    }else{
                        this.addNewLine();
                    }

                    this.render();
                }
            }
        }

        //this.renderEmptyRow();

        var activeRow = this.getSelectedRow();
        this.selectRow( activeRow );

        this.$el.parent().perfectScrollbar();

        return this;
    }

});