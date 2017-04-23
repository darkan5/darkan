var ScrollerEditorView = EditorView.extend({
	template: _.template($('#scroller-editor-template').html()),


//    events: function(){
//        return _.extend({},EditorView.prototype.events,{
//
//        });
//    },

	bindings: {
		'[name="scroller-opt"]': 'changeAdv',
		'#scroller-opt-scrolltime': 'scrollTime'
	},

    // changeAdv: function(e) {
    //     this.model.set('adv', $(e.target).val());
    // }
});