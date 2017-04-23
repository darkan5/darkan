
//var lmsView = new LmsView();


// var lmsView = new LmsView();
//var lmsView = new Marionette.Application();


//Backbone.history.start();

window.App = new Marionette.Application();

App.addRegions({
    pageRegion: '#page-wrapper',
});

App.Router = Marionette.AppRouter.extend({
    appRoutes: {
        '': 'dashboard',
        'dashboard': 'dashboard',
        'courses': 'courses',
        'course/:id': 'courseId',
        'course/:id/user/n/:id': 'courseIdUserId',
        'course/:id/user/m/:id': 'courseIdUserMailingId',
        'users': 'users',
        'usersmailing': 'usersMailing',
        'user/n/:id': 'userId',
        'user/m/:id': 'userMailingId',
        'groups': 'groups',
        'groupsmailing': 'groupsMailing',
        'group/:id': 'groupId',
        'groupsmailing/:id': 'groupMailingId',
        'adduser': 'adduser',
        'addgroup': 'addgroup',
        'mailing/:id': 'mailingId',
        'settings': 'settings',
        'certificates': 'certificates',
        'reportselearning': 'reportsElearning'

//        '': 'openDashboard',
//        'dashboard': 'openDashboard',
//        'courses/:id': 'openCourseById',
//        'courses': 'coursesList',
//        'users': 'openUsersList',
//        'users/:id': 'openUserById',
//        'adduser': 'newUserPage'

    }
});

App.Controller = Marionette.Controller.extend({
    index: function() {
        var view = new IndexPageView();
        App.pageRegion.show(view);
    },
    dashboard: function() {

        //var view = new PageDashboardView();

        // var dashbordItemsCollection = new DashbordItemsCollection();

        // dashbordItemsCollection.add( new DashboardCourseItemModel() );
        // dashbordItemsCollection.add( new DashboardStudentsItemModel() );
        // dashbordItemsCollection.add( new DashboardChartItemModel() );

        // var dashbordItemsCollectionView = new DashbordItemsCollectionView({collection: dashbordItemsCollection});
        //var dashbordItemsCollectionView = new DashbordItemsCollectionView();
        //dashbordItemsCollectionView.add( new DashboardItemCourseView() );
        //dashbordItemsCollectionView.add( new DashboardItemStudentsView() );
        //dashbordItemsCollectionView.add( new DashboardItemChartView() );

        App.pageRegion.show(new PageDashboardView());
    },
    courses: function() {

        var view = new PageCoursesView();
        App.pageRegion.show(view);
    },

    courseId: function(courseId) {

        _log('coursesId', courseId);

        var view = new PageSingleCourseView({courseId:courseId});
        App.pageRegion.show(view);
    },

    courseIdUserId: function(courseId, userId) {

        _log('courseIdUserId courseId', courseId);
        _log('courseIdUserId userId', userId);

        var view = new PageUserInCourseDetailsView({courseId:courseId, userId:userId, userType:'app' });
        App.pageRegion.show(view);
    },

    courseIdUserMailingId: function(courseId, userId) {

        _log('courseIdUserId courseId', courseId);
        _log('courseIdUserId userId', userId);

        var view = new PageUserInCourseDetailsView({courseId:courseId, userId:userId, userType:'mailing' });
        App.pageRegion.show(view);
    },

    users: function() {

        var view = new PageUsersView();
        App.pageRegion.show(view);
    },

    usersMailing: function() {

        var view = new PageUsersMailingView();
        App.pageRegion.show(view);
    },

    settings: function() {

        var view = new PageSettingsView();
        App.pageRegion.show(view);
    },

    certificates: function() {

        var view = new PageCertificatesView();
        App.pageRegion.show(view);
    },


    groups: function() {

        var view = new PageGroupsView();
        App.pageRegion.show(view);
    },

    groupsMailing: function() {

        var view = new PageGroupsMailingView();
        App.pageRegion.show(view);
    },

    reportsElearning: function() {

        var view = new PageReportsElearningView();
        App.pageRegion.show(view);
    },

    groupId: function(groupId) {

        _log('groupId', groupId);

        var view = new PageSingleGroupView({groupId:groupId});
        App.pageRegion.show(view);
    },

    groupMailingId: function(groupId) {
        var view = new PageSingleGroupMailingView({groupId:groupId});
        App.pageRegion.show(view);
    },

    userId: function(userId, courseId) {

        _log('userId', userId);

        var view = new PageSingleUserView({userId:userId, userType:'app'});
        App.pageRegion.show(view);
    },

    userMailingId: function(userId, courseId) {

        _log('userMailingId', userId);

        var view = new PageSingleUserView({userId:userId, userType:'mailing'});
        App.pageRegion.show(view);
    },

    adduser: function() {

        //_log('userId', userId);

        var view = new PageAddUserView();
        App.pageRegion.show(view);
    },

    addgroup: function() {

        //_log('userId', userId);

        var view = new PageAddGroupView();
        App.pageRegion.show(view);
    },

    mailingId: function(courseId) {

        var view = new PageCourseMailingView({courseId:courseId});
        App.pageRegion.show(view);
    },

});

App.on("start", function() {
    App.controller = new App.Controller();
    
    App.router = new App.Router({
        controller: App.controller
    });

    var request = {
        request: 'updateUsersLimitsData',
        userType: 'app'
    };
    DataAccess.lmsRequest(
        {request: JSON.stringify(request)},
        function(){},
        function(){},
        this
    );

        
    Backbone.history.start();
});

$(function(){
    App.start();
});

// var request = {
// 	request: 'getNumberOfUsersAndCourses'
// };

// DataAccess.lmsRequest(
//     { request: JSON.stringify(request) },
//     function(data) {
//         _log('getNumberOfUsersAndCourses', JSON.parse(data));

//     },
//     function(data) { _log('data', data) }
// );



// var request = {
// 	request: 'getCoursesList'
// };

// DataAccess.lmsRequest(
//     { request: JSON.stringify(request) },
//     function(data) {

//         _log('getCoursesList', JSON.parse(data));

//     },
//     function(data) { _log('data', data) }
// );


// var request = {
// 	request: 'getUsersList'
// };

// DataAccess.lmsRequest(
//     { request: JSON.stringify(request) },
//     function(data) {

//         _log('getUsersList', JSON.parse(data));

//     },
//     function(data) { _log('data', data) }
// );



// var request = {
// 	request: 'courseStatus',
// 	courseID: 81
// };

// DataAccess.lmsRequest(
//     { request: JSON.stringify(request) },
//     function(data) {

//         _log('courseStatus', JSON.parse(data));

//     },
//     function(data) { _log('data', data) }
// );


// var request = {
// 	request: 'userStatus',
// 	userID: 4
// };

// DataAccess.lmsRequest(
//     { request: JSON.stringify(request) },
//     function(data) {

//         _log('userStatus', JSON.parse(data));

//     },
//     function(data) { _log('data', data) }
// );