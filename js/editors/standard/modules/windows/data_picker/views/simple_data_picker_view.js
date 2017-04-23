var SimpleDataPickerView = DataPickerView.extend({

    getSelectorClass: function( picker ) {

    	return '.wordsearch-cell';
    },

    getPickedAction: function(picker){
		return 'cell';
    },

	setObserver: function(data) {
        this.observer = data.componentView;

    },

    runObServer: function() {
        var _that = this;

        // this.observer.off('data-picker-picked-cell');
        // this.observer.on('data-picker-picked-cell', function(componentModel){

        //     _log('data-picker-picked-odrozniony', componentModel, _log.dataaccessIn);

        //         // if(_that.objectsCollection != undefined){
        //         //     componentModel.selectedByTrigger(true);
        //         // }

        //        _that.onDataPickerPicked( componentModel );


        // });
    },

    onSelectorClick : function( e ){


        var _that = this;

        if(this.hoveredObject != null){


            // this.hoveredObject.trigger('data-picker-picked-' + this.action, {}, this);

            _that.onDataPickerPicked( this.hoveredObject );

            if (!e.shiftKey) {
                this.closeDataPicker();
            }
        }

    },

    selectObjects: function( objectsCollection ) {

        var _that = this;

    },

    unselectObjects: function( objectsCollection ) {

        var _that = this;

    }
});