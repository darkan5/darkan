var InfoPointLinkComponentView = ImageComponentView.extend({

	className : 'component infopointlink-component',

	template: _.template($('#infopointlink-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click': 'openLink'
        });
    },

    openLink: function() {
    	var link = this.model.get('link');

    	if (link.length) {
	    	if ( link.substring(0,7) === "http://" || link.substring(0,8) === "https://" ) {
	    		window.open( link );
	    	} else {
	    		window.open( "http://" + link );
	    	}	
    	}

        this.markAsCompleted();
    },

    renderAsCompleted: function() {
        this.$el.attr({
            active: true
        })
    },

    renderCss: function() {
        this.$el.css('cursor', 'pointer');
    }
});