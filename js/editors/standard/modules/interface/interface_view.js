var DarkanApp = Backbone.View.extend({

	events: {

	},

	initialize: function( ) {

  	},

	render: function(){

		return this;
	},


	getBlankPageModel: function() {

		var	lines = new TimelineRowCollection( [ 

			new TimelineRowModel( {

				objects: new TimelineItemCollection( [] )

			} )

		] );
		
		var pageModel = new PageModel( {lines:lines} );
		// var pageView = new PageView( { model:pageModel  } );
		

		// _that.timelineView.setModel( pageModel.get('lines') );

  //       pageModel.get('options').lastpageid = pageModel.get('options').pageid++;

		// _that.pageCollection.add( pageModel );

		// _that.pageListView.render();

        return pageModel;

	}


});