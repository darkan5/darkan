var PagesList = Backbone.View.extend({

	tagName: 'div',
	className: 'pages-list',

	template: _.template($('#pages-list-template').html()),
	templateEmpty: _.template($('#pages-empty-list-template').html()),

	selectedPageModel: undefined,
	visible: true,

	events: {
		
	},

	initialize: function( ) {

  	},

	render: function(){

		var pagesLength = this.model.get('collection').length;

		if(pagesLength > 0){
			var template = this.template(this.serializeData());
        	this.$el.html(template);

		}else{
			var template = this.templateEmpty(this.serializeData());
        	this.$el.html(template);
		}

        this.addTitleToButtons();

		return this;
	},

	afterRender: function(){

		var _that = this;

        this.model.get('collection').each(this.renderOnePage, this);

        if(this.selectedPageModel){

        	var pageId = this.selectedPageModel.get('options').get('pageid');

        	this.model.get('collection').each(function(pModel){
        		if(pModel.get('options').get('pageid') == pageId){
        			_that.setPageAsActive(pModel);
        		}
        	});

        }else{
        	this.setFirstPageAsActive();
        }

        this.addPlusButton();

        this.makeSortable();

        this.perfectScrollbar();

        this.scrollToActivePage();

        this.selectPageOnStart();
	},

    scrollToActivePage: function() {
        if (this.selectedPageModel) {
            var activePageOffset = this.selectedPageModel.view.$el.offset().top;
            var activePageHeight = this.selectedPageModel.view.$el.height();
            var pageListHeight = this.$el.find('.pages').height();
            this.$el.find('.pages').scrollTop(activePageOffset - pageListHeight/2 - activePageHeight/2);   
        }
    },

	makeSortable: function(){

    },

    perfectScrollbar: function(){
        this.$el.find('.pages').perfectScrollbar({
            useKeyboard: false,
            suppressScrollX: true
        });
    },

	serializeData: function(){
		return this.model.toJSON();
	},

	addPlusButton: function(){
		
	},

	renderOnePage: function(model){
		var pageItem = new PageItem({ model:model });
		model.view = pageItem;
		pageItem.on('on-page-set-as-active', this.onSetPageAsActive, this);
		this.$el.find('.pages').append(pageItem.render().$el);
		pageItem.afterRender();
	},

	onSetPageAsActive: function(model){
		this.selectedPageModel = model;
		this.trigger('set-page', model);
	},

	setPageAsActive: function(pageModel){

        if(pageModel.view){
            pageModel.view.setPageAsActive();
        }
	},

	setFirstPageAsActive: function(){
		
		var firstPageModel = this.model.get('collection').first();

		if(firstPageModel){
			firstPageModel.view.setPageAsActive();
		}
	},

    selectedAllPages: function() {
        var pagesCollection = this.model.get('collection');
        var setActive = true;
        var _act = true;
        var _uni = true;

        pagesCollection.each(function(childModel, index) {

            if (index == 0) {
                _act = childModel.isSelected;
            }

            if (_uni && _act !== childModel.isSelected) {
                _uni = false;
            }

        });

        if (_uni) {

            if (_act == false)
                setActive = true;
            else
                setActive = false;
        }

        if (setActive) {
            this.$el.find('.select-all-pages').addClass('selected-all-pages');
        } else {
            this.$el.find('.select-all-pages').removeClass('selected-all-pages');
        }

        pagesCollection.each(function(childModel) {

            childModel.isSelected = setActive;

            childModel.view.setCheckboxSelected(setActive);

        });
    },

	disableButtons: function(){

        
    },

    enableButtons: function(){

        
    },

    getPagesLength: function() {
        return this.model.get('collection').length;
    },

    accept: function(visitor) {
        visitor.visit(this);
    },

    toggleRightMenu: function() {
        var _that = this;


        // this.sceneWrapper = StageView.instance.$el;
        // this.tiggleIcon = this.$el.find('.toggle-icon');

        // if (this.visible) {
        //     this.$el.css('width', '5px');
        //     this.sceneWrapper.css({width: 'calc(100%)'});
        //     this.tiggleIcon.css({
        //         transform: 'rotate(180deg)',
        //         left: '-20px',
        //         height: '100px',
        //         'line-height': '100px'
        //     });
        //     this.$el.find('.pages-list-section').hide();
        //     this.visible = false;
        // } else {
        //     this.$el.css('width', '257px');
        //     this.sceneWrapper.css({width: 'calc(100% - 360px)'});
        //     this.tiggleIcon.css({
        //         transform: 'rotate(0deg)',
        //         left: '0px',
        //         height: '',
        //         'line-height': ''
        //     });
        //     this.$el.find('.pages-list-section').show();
        //     this.visible = true;
        // }

        this.trigger('toggle-project-list', this.visible);
    },

    getPageModelByPageId :function(pageId){

        var pageModel;

        this.model.get('collection').each(function(model){
            if(model.get('options').get('pageid') == pageId){

                pageModel =  model;
            }
        });

        return pageModel;
    },

    getIdsFromSelectedPages: function( pageCollection ){

        var pageIdsListToCopy = [];

        pageCollection.each(function(model) {

            if (model.isSelected) {
                pageIdsListToCopy.push(model.get('options').get('pageid'));
            }
        });

        return pageIdsListToCopy;
    },

    getPageIndexByPageModel: function(pageModel){

        var index = this.model.get('collection').indexOf(pageModel);

        return index;
    },


    show: function(){

    	this.tiggleIcon = this.$el.find('.toggle-icon');

        this.$el.parent().css('width', '250px');

        this.tiggleIcon.css({
            transform: 'rotate(0deg)',
            left: '0px',
            height: '',
            'line-height': ''
        });
        this.$el.find('.pages-list-section').show();
        this.visible = true;
    },

    hide: function(){

    	this.tiggleIcon = this.$el.find('.toggle-icon');

        this.$el.parent().css('width', '0px');
        
    	this.tiggleIcon.css({
            transform: 'rotate(180deg)',
            left: '-19px',
            height: '100px',
            'line-height': '100px'
        });
        this.$el.find('.pages-list-section').hide();
        this.visible = false;
    },

    selectPageOnStart: function(){
        // To override
    },

    getPagesCollection: function(){
        return this.model.get('collection');
    },

    getSelectedPageModel: function(){
        return this.selectedPageModel;
    },

    addTitleToButtons: function(){
        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'bottom',
            width: 300,
            height: 200,
        });
    },

});