var PageItem = ItemView.extend({

	tagName: 'li',
	className: 'page',

	template: _.template($('#page-item-template').html()),

	events: {

		
	},

	initialize: function( ) {
    	
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.addTitleToButtons();

		return this;
	},

	reloadEvents: function(){
        this.model.get('options').off();
        this.model.off();
        this.$el.off();
        this.createListeners();

        this.delegateEvents();
    },

    createListeners: function() {

    },

	serializeData: function(){

		var options = this.model.toJSON();
		options.order = this.model.collection.indexOf(this.model) + 1;
        options.isSelected = this.model.isSelected;

		return options;
	},

	afterRender: function(){

	},

	setPageAsActive: function(){

        var itemsSelectedNumb = 0;

        this.model.collection.each(function(model){
            if(model.isSelected){
                itemsSelectedNumb++;

            }
        });

        if(itemsSelectedNumb <= 1){

            this.unselectAllPages();

            this.model.isSelected = true;
            this.model.view.setCheckboxSelected(true);
        }

		this.model.collection.each(function(model){
			model.view.active = false;
			model.view.$el.attr('active', false);
		});

		this.active = true;
        this.$el.attr('active', true);

        this.selectPageByUser();

        this.trigger('on-page-set-as-active', this.model, this);
	},

    selectPageByUser: function() {
        // To override  
    },

	selectPage: function(e) {
        var selected = $(e.target).is(':checked');
        this.model.isSelected = selected;
    },

    onClick :function(e) {

        if (e.shiftKey) {

            var pagesCollection = this.model.collection;
            var indexModel = pagesCollection.indexOf(this.model);

            var chFrom = 0;
            var chTo = 0;
            var check = false

            for (var i = indexModel; i >= 0; i--) {

                var model = pagesCollection.at(i);

                if (model.isSelected) {
                    chFrom = i;
                    chTo = indexModel;
                    check = true;
                    break;
                }
            }

            if (!check) {
                for (var i = indexModel; i < this.model.collection.length; i++) {

                    var model = pagesCollection.at(i);

                    if (model.isSelected) {
                        chFrom = indexModel;
                        chTo = i;
                        check = true;
                        break;
                    }
                }
            }

            if (check) {
                pagesCollection.each(function(model, iModel) {

                    if ((iModel < chFrom) || (iModel > chTo)) {
                        model.isSelected = false;
                        model.view.setCheckboxSelected(false);
                    } else {
                        model.isSelected = true;
                        model.view.setCheckboxSelected(true);
                    }

                });
            }

        } else if (e.ctrlKey) {

            if (this.model.isSelected) {
                this.model.isSelected = false;
                this.setCheckboxSelected(false);
            } else {
                this.model.isSelected = true;
                this.setCheckboxSelected(true);
            }

        } else {

            this.unselectAllPages();

            this.model.isSelected = true;
            this.setCheckboxSelected(true);

            this.setPageAsActive();

            //this.createDinamicPageThumb();
        }
	},

	setCheckboxSelected: function(value){
		this.renderSelectedCheckbox(value);
	},

	renderSelectedCheckbox: function(value) {
        this.$el.find('.page-checkbox').prop('checked', value);
    },

	unselectAllPages: function() {

        this.model.collection.each(function(model) {
            model.isSelected = false;
            model.view.setCheckboxSelected(false);

            model.view.closeSettingsWindows();
        });

        this.$el.trigger('unselect-all-pages');
    },

    closeSettingsWindows: function(){
        if(this.pageSoundSettingView != undefined){
            this.pageSoundSettingView.remove();
            this.pageSoundSettingView = undefined;
        }
    },

    addTitleToButtons: function(){
        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });
    },

    beforeDestroy : function(){
        // To override
    },

    destroy : function(){

        this.beforeDestroy();
        this.unbind();
        this.remove();
    },

    copyTrigger: function(){
        this.$el.trigger('copy-page-trigger', this.model, this);
    },

    pasteTrigger: function( pageTrigger ){
        this.model.get('options').set('triggers', JSON.parse(pageTrigger));

        this.$el.trigger('on-paste-page-trigger', this.model, this);
    },
});