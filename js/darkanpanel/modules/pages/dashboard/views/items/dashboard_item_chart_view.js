var DashboardItemChartView = DashboardItemView.extend({

	className: 'dashboard-item',

    maxCoursesToShow: 10,

    template: '#dashboard-item-chart-template',
    initialize: function(data){
    	this.model = new DashboardChartItemModel({userType: data.userType});
    	this.model.on('change', this.onModelChanged, this);
    },

    onRender :function(){

        _log('model chart', this.model.toJSON());

        var coursesList =  this.model.get('coursesList');

        coursesList = coursesList.sort(this.dynamicSort("users"));

        _log('coursesList', coursesList);

        var courseSummary = {};

        for (var i = coursesList.length - 1; i >= 0; i--) {
            var oneCourse = coursesList[i];

            _log('oneCourse', oneCourse, _log.timeline);

            var name = oneCourse.name;
            var courseId = oneCourse.courseID + "_" + oneCourse.name;

            if(courseSummary[courseId] == undefined){
                courseSummary[courseId] = {
                    name: name,
                    users: 0
                };
            }

            courseSummary[courseId]['users'] += oneCourse.users;
        };

        var displayData = [];

        _log('courseSummary', courseSummary, _log.timeline);

        var showingCourses = 0;

        for (var item in courseSummary) {

            if (courseSummary[item]['users'] > 0) {
                displayData.push({ name: Utils.escapeHtml(courseSummary[item]['name']), users:courseSummary[item]['users'] });
                showingCourses++
                if (showingCourses >= this.maxCoursesToShow) break;
            }

        };

        _log('displayData', displayData, _log.timeline);

        var chart =  $('#course-summary-chart');
        chart.html('');

        if(displayData.length > 0){
            setTimeout(function(){
//                Morris.Area({
//                    element: chart,
//                    data: displayData,
//                    xkey: ['id'],
//                    ykeys: ['users'],
//                    labels: ['Czas:', 'Strona:'],
//                    pointSize: 2,
//                    hideHover: 'auto',
//                    resize: true,
//                    parseTime:false
//                });

                Morris.Bar({
                    element: chart,
                    data: displayData,
                    xkey: ['name'],
                    ykeys: ['users'],
                    labels: [_lang('morris_legend_users'), _lang('morris_legend_cours')],
                    hideHover: 'auto',
                    resize: true,
                    xLabelMargin: 20,
                });
            }, 10);
        } else {
            chart.html(_lang('infoEmpty'));
        }
    },


    dynamicSort: function(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
});
