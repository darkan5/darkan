var PageDashboardView = PageView.extend({
    template: '#page-dashboard-view-template',

    regions: {
    	allCoursesCounter: '#allCoursesCounter',
        allUsersCounter: '#allUsersCounter',
        allMailingUsersCounter: '#allMailingUsersCounter',
        courseList: '#courseList',
        usersList: '#usersList',
    	mostPopularChart: '#most-popular-chart',
    	statusChart: '#morris-course-statuses-chart'
    },

    initialize: function(){

        this.model = new PageDashboardModel();
        this.model.on('change', this.onModelChanged, this);


        // _log('<<<<<<<----------------------- abc');

        // var request = {
        //     request: 'mailingAddGroup',
        //     groupName: 'dupeczka'
        // };



        // var users = [{
        //     email: 'mojmail@wp.pl',
        //     name: 'marian',
        //     lastName: 'pazdzioch'
        // },
        // {
        //     email: 'abc@wp.pl',
        //     name: 'mieczyslaw',
        //     lastName: 'fogg'
        // }];

        // var request = {
        //     request: 'mailingAddUser',
        //     group: 2,
        //     users: users
        // };


        // var request = {
        //     request: 'mailingDeleteUserFromGroup',
        //     group: 2,
        //     users: [6,7]
        // };


        // var request = {
        //     request: 'mailingAddUserToGroup',
        //     group: 2,
        //     users: [6,7]
        // };


        // var request = {
        //     request: 'mailingDeleteGroup',
        //     groups: [2],
        // };


        // var request = {
        //     request: 'mailingGroupList'
        // };


        // DataAccess.lmsRequest(
        //     {request: JSON.stringify(request)},
        //     function(data) {
        //             _log('data', data);
        //     },
        //     function(data) {
        //             _log('error data', data);
        //     },
        //     this
        // );
    },

    onRender: function() {
    	this.allCoursesCounter.show(new DashboardItemCourseView());
    	this.courseList.show(new DashboardItemCourseListView());
    	this.usersList.show(new DashboardItemUsersListView());

    	this.mostPopularChart.show(new DashboardItemChartView({userType: 'all'}));
    	this.statusChart.show(new DashboardItemChartStatusesView({userType: 'all'}));

        if (this.$el.find('#allUsersCounter').push()) {
            this.allUsersCounter.show(new DashboardItemStudentsView());
        }
        if (this.$el.find('#allMailingUsersCounter').push()) {
            this.allMailingUsersCounter.show(new DashboardItemStudentsMailingView());
        }
    }
});