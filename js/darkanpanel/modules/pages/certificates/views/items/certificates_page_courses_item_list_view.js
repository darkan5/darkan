var CertyficatePageCoursesItemListView = PageView.extend({
    template: '#certificate-page-courses-item-list-view-template',
    initialize: function(data){

        this.model = new CertyficatePageCoursesItemListModel(data);
        this.model.on('change', this.onModelChanged, this);

    },
    
    events: {
        "click #open-course-preview": 'openCourse',
    },


    openCourse: function() {
        var link =  this.model.get('courseLink');
        window.open(link);
    }


});