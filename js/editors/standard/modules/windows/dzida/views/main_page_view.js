var MainPageView = WindowView.extend({
	
	template: _.template($('#main-page-window-template').html()),

	className : 'window main-page-window',


    afterRender: function() {

        //var blockList = new MainBlockList();
        //blockList.render();

        //var dropArea = new DropArea();
        //dropArea.render();

    }
    
});