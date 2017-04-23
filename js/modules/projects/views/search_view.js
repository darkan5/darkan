var SearchView = Backbone.View.extend({

    template: _.template($('#search-template').html()),

    events:{
        'keyup .projects-list-search-input' : 'searchProjectList',
        'paste .projects-list-search-input' : 'searchProjectList',
        'click .remove-search-value' : 'removeSearchValue',
    },
   
    initialize: function(data){

    	var _that = this;
    },

    render: function(){

        var template = this.template();
        this.$el.html(template);

        return this;
    },

    removeSearchValue: function(e){

        var searchInput = this.$el.find('.projects-list-search-input');

        searchInput.val('');
        searchInput.focus();
        this.trigger('on-search-projects-list', '');
    },

    searchProjectList: function(e){

        var value = $(e.target).val();

        this.trigger('on-search-projects-list', value);
    },

    resetSearchProjectsList: function(){
        this.$el.find('.projects-list-search-input').val('');
    },

});