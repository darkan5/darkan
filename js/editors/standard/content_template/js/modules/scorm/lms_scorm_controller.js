var LmsScormController = ScormController.extend({


    initialize: function(data) {


        this.model = data.model;
        this.scorm = data.scorm;
    },



    quitScorm: function() {
        this.scorm.quit();
    },

    saveScorm: function() {

//        var scormData = {
//            suspendData: this.parseModelToSuspendData(),
//            userScore: this.getUserScores(),
//            courseStatus: this.getCourseStatus(),
//            lessonLocation: this.lessonLocation,
//            pagesTime: JSON.stringify(this.pagesTime()),
//            maxScore: this.getMaxScore()
//        };

        var courseData = this.getCourseData();

        this.scorm.set('cmi.core.lesson_location', courseData.lessonLocation );
        this.scorm.set('cmi.core.lesson_status', courseData.courseStatus );
        this.scorm.set('cmi.suspend_data', courseData.suspendData );
        this.scorm.set('cmi.core.score.raw', courseData.userScore );
        this.scorm.set('cmi.core.score.max', courseData.maxScore );
        this.scorm.set('cmi.core.score.diamonds', courseData.diamonds );
        this.scorm.set('cmi.core.score.min', "0" );
        // this.scorm.set('cmi.core.total_time', courseData.sesionTime );
        this.scorm.set('cmi.core.session_time', courseData.sesionTime );

        this.scorm.save();
    },

    loadScorm: function() {

        var courseData = {};

        courseData.lessonLocation = this.scorm.get('cmi.core.lesson_location');
        courseData.courseStatus = this.scorm.get('cmi.core.lesson_status');
        courseData.suspendData = this.scorm.get('cmi.suspend_data');
        courseData.userScore = this.scorm.get('cmi.core.score.raw');
        courseData.maxScore = this.scorm.get('cmi.core.score.max');
        courseData.minScore = 0;

        // _log('cmi.core.total_time', this.scorm.get('cmi.core.total_time'));

        // var sesionTime = this.scorm.get('cmi.core.total_time');

        courseData.sesionTime = '0000:00:00.0';//(sesionTime && sesionTime != '') ? sesionTime : '0000:00:00.0';

        // _log('courseData.sesionTime', courseData.sesionTime);

        this.parseSuspendDataToModel(courseData);

        this.trigger('on-load-scorm-data');

    }


});