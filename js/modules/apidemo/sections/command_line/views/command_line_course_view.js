var CommandLineCourseView = CommandLineView.extend({

	template: _.template($('#command-line-course-template').html()),

    initialize: function(){

    },

    serializeData: function(){
    	return {};
    }
});