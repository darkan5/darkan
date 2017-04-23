var NotEditablePagesList = PagesList.extend({


	template: _.template($('#not-editable-pages-list-template').html()),
	templateEmpty: _.template($('#not-editable-pages-empty-list-template').html()),


	events: {
        'click .select-all-pages': 'selectedAllPages',
        'select-all-pages': 'selectedAllPages',
        'click .toggle-icon': 'toggleRightMenu',
        'unselect-all-pages': 'unselectAllPages',

        'click .second-pages-list-copy-page': 'copyPages',
        'click .second-pages-list-open-page': 'openInNewTab'
	},

	initialize: function( ) {
    	
  	},

    renderOnePage: function(model){
        var pageItem = new NotEditablePageItem({ model:model });
        model.view = pageItem;
        pageItem.on('on-page-set-as-active', this.onSetPageAsActive, this);
        this.$el.find('.pages').append(pageItem.render().$el);
        pageItem.afterRender();
    },

    openInNewTab: function(){


        var projectId = this.model.projectId;

        var href = window.location.href;

        var arr =  href.split('/');

        arr[arr.length - 1] = projectId;

        href = arr.join('/');

        window.open(href,'_blank');
    },

    copyPages: function(){

        var pageCollection = this.model.get('collection');

        var pageIds = this.getIdsFromSelectedPages( pageCollection );

        _log('pageIds', pageIds);

        _log('this.model', this.model);

        if(pageIds.length == 0){
            return;
        }

        var userId = this.model.userId;
        var projectId = this.model.projectId;

        _log('userId', userId);
        _log('projectId', projectId);

        ProjectView.instance.copyPagesFromOtherProject(pageIds, userId, projectId);
    },
});