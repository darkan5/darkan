var ShareUserItemView = ProjectListItemView.extend({

	className: 'share-user-item',

    template: _.template($('#projectslist-share-user-item-template').html()),

    events:{
    	//'dblclick' : 'openProject',
    	'click .share-user-remove-button' : 'unshareUser'
    },

    initialize: function(data){

        
    },

    unshareUser: function(){

    	this.trigger('unshare-user', this.model);
    },

});