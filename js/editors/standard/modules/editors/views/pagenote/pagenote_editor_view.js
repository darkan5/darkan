var PagenoteEditorView = EditorView.extend({
	//el: '#botmenu-note',
	
	template: _.template($('#pagenote-editor-template').html()),

	bindings: {
	    // '[name="require-credit"]': 'require-credit',
	    'textarea[name="page-note"]': 'note'
	},

//    events: function(){
//        return _.extend({},EditorView.prototype.events,{
//
//        });
//    },

    // onRequireCreditChanged: function(e){

    // 	var value = $(e.target).prop('checked');
    // 	this.model.set('require-credit', value);
    // },
    // onCreditPointsChanged: function(e){

    // 	var value = $(e.target).val();
    // 	this.model.set('credit-points', value);
    // },

    onSetModel: function() {
        this.render()
    }

});

