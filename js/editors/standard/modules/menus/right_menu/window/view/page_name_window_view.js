var PageNameWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view page-name-window-view editor-window',

    template: _.template($('#page-name-window-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .change-titles-pages-button': 'changeTites',
            'click .page-title-numbering-checkbox': 'activeNumbering'
        });
    },


	initialize: function( data ) {

        // this.componentModel = data.componentModel;
        this.pageCollection = data.pageCollection;
        this.windowModel = new WindowModel();
		this.runListeners();


        // this.pageCollection.each(function(vvv) {
        //     _log('vvv', vvv.isSelected);
        // });
  	},

    activeNumbering: function(e) {
        var numbering = $(e.target).is(':checked');

        if (numbering) {
            $('.page-title-numbering-position-select').removeAttr('disabled');
            $('.page-title-numbering-input').removeAttr('disabled');
        } else {
            $('.page-title-numbering-position-select').attr('disabled', 'disabled');
            $('.page-title-numbering-input').attr('disabled', 'disabled');
        }
    },

    changeTites: function() {
        var pageName = $('.page-title-name-input').val();
        var pageNameS = pageName;
        var numbering = $('.page-title-numbering-checkbox').is(':checked');
        var numberingPosition = $('.page-title-numbering-position-select').val();
        var number = parseInt($('.page-title-numbering-input').val());

        var selectedPagesOptions = [];

        this.pageCollection.each(function(model) {
            if (model.isSelected) {
                var options = model.get('options');

                if (numbering) {
                    if (numberingPosition === 'start') {
                        pageNameS = number + pageName;
                    } else {
                        pageNameS = pageName + number;
                    }
                }

                options.set('pagename', pageNameS, { silent:true });

                selectedPagesOptions.push(options.toJSON());

                number++;
            }
        });

        this.trigger('on-pages-title-changed', selectedPagesOptions);
        this.close();
    },

    afterRender: function() {
        // to override
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});