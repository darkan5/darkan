var ScormController = Backbone.Controller.extend({

    ajaxUrl: window.location.origin + '/darkan2/lms/server/php/scorm.php',

    getCourseStatus: function() {
        var courseStatus = this.model.get('options').get('courseStatus');

        return courseStatus;
    },

    getUserScores: function() {
        var userScoreObject = TriggerController.instance.getVariableByHash("00000000000000000000000000000000");
        var userScoreValue = userScoreObject.pvarvalue;

        return userScoreValue;
    },

    getMaxScore: function() {
        var userScoreObject = TriggerController.instance.getVariableByHash("00000000000000000000000000000001");
        var maxScoreValue = userScoreObject.pvarvalue;

        return maxScoreValue;
    },

    getDiamonds: function() {
        var diamondsObject = TriggerController.instance.getVariableByHash("00000000000000000000000000000003");
        if (diamondsObject) {
            var diamondsValue = diamondsObject.pvarvalue;
            return diamondsValue;   
        }

        return 0;
    },

    getSesionTime: function() {


        var enterTime = this.enterTime;
        var nowTime = new Date().getTime();

        var sesionTime = this.convertTotalTimeToMiliseconds(this.sesionTime );

        _log('enterTime', enterTime);
        _log('nowTime', nowTime);
        _log('sesionTime', sesionTime);

        var totalTime = nowTime - enterTime + sesionTime;
        var totalTimeConverted = this.convertMilisecondsToTotalTime(totalTime);

        _log('totalTime', totalTime);
        _log('totalTimeConverted', totalTimeConverted);

        return totalTimeConverted;
    },

    convertTotalTimeToMiliseconds: function (sesionTime)
    {
        if(!sesionTime){ return 0 }

        var arr = sesionTime.split(':');

        var h = parseInt(arr[0]) * 3600;
        var m = parseInt(arr[1]) * 60;
        var s = parseInt(arr[2]);

        var miliseconds = (h + m + s) * 1000;

        return miliseconds;
    },

    convertMilisecondsToTotalTime: function (ts){

       ts = parseInt(ts / 1000);

       var sec = (ts % 60);

       ts -= sec;
       var tmp = (ts % 3600);  //# of seconds in the total # of minutes
       ts -= tmp;              //# of seconds in the total # of hours

       // convert seconds to conform to CMITimespan type (e.g. SS.00)
       sec = Math.round(sec*100)/100;

       var strSec = new String(sec);
       var strWholeSec = strSec;
       var strFractionSec = "";

       if (strSec.indexOf(".") != -1)
       {
          strWholeSec =  strSec.substring(0, strSec.indexOf("."));
          strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
       }

       if (strWholeSec.length < 2)
       {
          strWholeSec = "0" + strWholeSec;
       }
       strSec = strWholeSec;

       if (strFractionSec.length)
       {
          strSec = strSec+ "." + strFractionSec;
       }


       if ((ts % 3600) != 0 )
          var hour = 0;
       else var hour = (ts / 3600);
       if ( (tmp % 60) != 0 )
          var min = 0;
       else var min = (tmp / 60);

       if ((new String(hour)).length < 2)
          hour = "0"+hour;
       if ((new String(min)).length < 2)
          min = "0"+min;

       var rtnVal = hour+":"+min+":"+strSec;

       return rtnVal;
    },


    saveLessonLocation: function(pageOrder) {
        this.lessonLocation = pageOrder;
    },

	parseModelToSuspendData: function() {

        var suspend_data_string = { };

        var user_codes = [ ];
        var objects_data = [ ];
        var pages_data = [ ];
        var quiz_data = { };
        var attempts_data = { };
        var specials_data = { };

        var pagesCollection = this.model.get('pages');

        pagesCollection.each(function(pModel) {
            if ( pModel.get('options').get('compl') === 1 ) {
                if (pages_data.indexOf(pModel.get('options').get('pageid')) === -1) {
                    pages_data.push(pModel.get('options').get('pageid'));
                }
            }
        });

        pagesCollection.each(function(pModel) {

            var lines = pModel.get('lines');
            lines.each(function(lModel) {

                var components = lModel.get('objects');
                components.each(function(cModel) {

                    var splittedObjectID = cModel.get('actionkey').split("-");

                    // prepare user id array for shorter objects array
                    var ob_id = splittedObjectID[0];
                    if (user_codes.indexOf(ob_id) === -1) {
                        user_codes.push(ob_id);
                    }
                });
            });
        });

        pagesCollection.each(function(pModel) {

            var lines = pModel.get('lines');

            lines.each(function(lModel) {

                var components = lModel.get('objects');

                components.each(function(cModel) {

                    var splittedObjectID = cModel.get('actionkey').split("-");

                    if ( !_.isUndefined( cModel.get('compl') ) && cModel.get('compl') != 0) {

                        var splittedObjectID = cModel.get('actionkey').split("-");

                        var object_code = user_codes.indexOf(splittedObjectID[0]) + 
                                            ',' + 
                                            splittedObjectID[1] + 
                                            "," + 
                                            splittedObjectID[2] +
                                            "," + 
                                            cModel.get('compl');

                        objects_data.push(object_code);
                    }

                    var componentType = cModel.get('type');

                    switch (componentType) {
                        case 'quiz':
                        case 'quiz-dnd':
                        case 'quiz-selectone':
                        case 'quiz-connectlines':
                        case 'quiz-fillinblanks':
                        case 'quiz-inputtext':
                        case 'quiz-select':
                        case 'form-inputtext':
                        case 'form-textarea':
                        case 'form-select':
                        case 'form-radio':
                        case 'form-checkbox':

                            var jsonModel = cModel.toJSON();

                            var userSelection = jsonModel.userSelection;
                            var attempts = jsonModel.attempts;
                            var special  = jsonModel.scormSpecialData;

    
                            

                            var objKey = user_codes.indexOf(splittedObjectID[0]) + 
                                                    ',' + 
                                                    splittedObjectID[1] + 
                                                    ',' + 
                                                    splittedObjectID[2];


                            quiz_data[objKey] = userSelection;

                            if(attempts){
                                attempts_data[objKey] = attempts;
                            }

                            if(special){
                                specials_data[objKey] = special;
                            }
                            
                            break;
                    }
                });
            });
        });

        suspend_data_string['uc'] = user_codes;
        suspend_data_string['o'] = objects_data;
        suspend_data_string['p'] = pages_data;
        suspend_data_string['q'] = quiz_data;
        suspend_data_string['a'] = attempts_data;

        suspend_data_string['t'] = this.getTimersTime();
        suspend_data_string['v'] = this.getProjectVariables();
        suspend_data_string['s'] = specials_data;

        _log('save scorm data', suspend_data_string);


        return JSON.stringify(suspend_data_string);

	},

    setLessonLocationFromScorm: function(data) {
        this.model.get('options').set('lessonLocation', data.lessonLocation, {silent:true});
    },

    setCourseStatusFromScorm: function(data) {

        this.model.get('options').set('courseStatus', data.courseStatus, {silent:true});
    },

    setUserScoreFromScorm: function(data) {

        var userScoreObject = TriggerController.instance.getVariableByHash("00000000000000000000000000000000");
        userScoreObject.pvarvalue = data.userScore;

    },

    parseSuspendDataToModel: function(data) {

        _log('data', data);

        if (data.suspendData != '') {

            var scormData = JSON.parse(data.suspendData);
            var uc = scormData.uc;
            var p = scormData.p;
            var t = scormData.t;
            var a = scormData.a;
            var v = scormData.v;
            var s = scormData.s;

            _log('open scorm data', scormData);


            this.setLessonLocationFromScorm(data);
            this.setCourseStatusFromScorm(data);
            this.setUserScoreFromScorm(data);

            this.setTimersTime(t);
            this.setProjectVariables(v);


            var pagesCollection = this.model.get('pages');

            pagesCollection.each(function(pModel) {

                var pageId = parseInt( pModel.get('options').get('pageid') );
                if ( scormData.p.indexOf(pageId) !== -1) {
                    pModel.get('options').set('compl', 1);
                }

                var lines = pModel.get('lines');
                lines.each(function(lModel) {

                    var components = lModel.get('objects');
                    components.each(function(cModel) {

                        var actionkey = cModel.get('actionkey');
                        var type = cModel.get('type');

                        _.each(scormData.o, function(obj) {

                            var _obj = obj.split(',');
                            var aKey = uc[_obj[0]] + '-' + _obj[1] + '-' + _obj[2];

                            if (actionkey === aKey) {
                                cModel.set('compl', _obj[3]);
                            }
                        });

                        var componentType = cModel.get('type');

                        switch (componentType) {
                            case 'quiz':
                            case 'quiz-dnd':
                            case 'quiz-selectone':
                            case 'quiz-connectlines':
                            case 'quiz-fillinblanks':
                            case 'quiz-inputtext':
                            case 'quiz-select':
                            case 'form-inputtext':
                            case 'form-textarea':
                            case 'form-select':
                            case 'form-radio':
                            case 'form-checkbox':

                                _.each(scormData.q, function(qData, qKey) {

                                    var _qKey = qKey.split(',');
                                    var qActionkey = uc[_qKey[0]] + '-' + _qKey[1] + '-' + _qKey[2];

                                    if (actionkey === qActionkey) {

                                        cModel.set('userSelection', qData);
                                    }

                                });

                                _.each(scormData.a, function(qData, qKey) {

                                    var _qKey = qKey.split(',');
                                    var qActionkey = uc[_qKey[0]] + '-' + _qKey[1] + '-' + _qKey[2];

                                    if (actionkey === qActionkey) {

                                        cModel.set('attempts', qData);
                                    }

                                });

                                _log('scormData.s', scormData.s);

                                _.each(scormData.s, function(qData, qKey) {

                                    var _qKey = qKey.split(',');
                                    var qActionkey = uc[_qKey[0]] + '-' + _qKey[1] + '-' + _qKey[2];

                                    //_log('actionkey', actionkey);
                                    //_log('qActionkey', qActionkey);

                                    if (actionkey === qActionkey) {

                                        cModel.set('scormSpecialData', qData);

                                    }

                                });

                                break;
                            }

                    });
                });
            });
        }else{
            _log('No suspendData', data);
        }


        this.sesionTime = data.sesionTime || '0000:00:00.0';
        this.enterTime = new Date().getTime();
    },
    

    saveScorm: function() {
        // To override
    },

    loadScorm: function() {
        // To override
    },

    quitScorm: function() {
        // To override
    },

    pagesTime: function() {

        var pageModel = StageView.instance.model;

        StageView.instance.pageHandlerTimer('stop', pageModel);
        StageView.instance.pageHandlerTimer('start', pageModel);

        var pages_time = { };
        var pagesCollection = this.model.get('pages');

        pagesCollection.each(function(pModel, i) {
            var timeOnSinglePage = parseInt(pModel.get('options').get('timeOnPage'));
            var t = !isNaN(timeOnSinglePage) ? timeOnSinglePage : 0;
            pages_time[i] = t;
        });

        return pages_time;
    },

    getTimersTime: function() {

        var timers = {};

        var timerComponentsCollection = ProjectModel.instance.getTimerComponents();
        timerComponentsCollection.each(function(tModel){

            var timerId = tModel.get('timerId');

            var hours = tModel.get('hours');
            var minutes = tModel.get('minutes');
            var seconds = tModel.get('seconds');

            timers[timerId] = {h:hours, m:minutes, s:seconds }
        });

        _log('timers', timers);

        return timers;
    },

    getProjectVariables: function() {

        var variables = {};

        var options = ProjectModel.instance.get('options');

        variables.s = options.get('staticVariables');
        variables.p = options.get('projectVariables');

        return variables;
    },

    setProjectVariables: function(variables) {

        var options = ProjectModel.instance.get('options');

        if(Utils.ObjectLength(variables)){

            var projectVariables = variables.p;
            var staticVariables = variables.s;

            if(projectVariables && projectVariables.length){
                options.set('projectVariables', projectVariables);
            }

            if(staticVariables && staticVariables.length){
                options.set('staticVariables', staticVariables);
            }
        }
    },


    setTimersTime: function(timers) {

        _log('setTimersTime', timers);

        if(timers == undefined) return;

        for(var item in timers){
            var timerId = item;

            var time = timers[item];

            var hours = parseInt(time.h);
            var minutes = parseInt(time.m);
            var seconds = parseInt(time.s);

            _log('timerId', timerId);

            var timerComponentsCollection = ProjectModel.instance.getTimerComponentsById(timerId);
            timerComponentsCollection.each(function(tModel){

                _log('tModel', tModel);

                tModel.set('hours', hours);
                tModel.set('minutes', minutes);
                tModel.set('seconds', seconds);
            });
        }
    },

    getCourseData: function(){

        var scormData = {
            suspendData: this.parseModelToSuspendData(),
            userScore: this.getUserScores(),
            courseStatus: this.getCourseStatus(),
            lessonLocation: this.lessonLocation,
            pagesTime: JSON.stringify(this.pagesTime()),
            maxScore: this.getMaxScore(),
            diamonds: this.getDiamonds(),
            sesionTime: this.getSesionTime()
        };


        return scormData;
    }


});



ScormController.create = function(data, onResult){

    ScormController.createDarkanScormController(
        data,
        function(scormController){
            onResult(scormController);
        },
        function(err){

            ScormController.createLmsScormController(
                data,
                function(scormController){
                    onResult(scormController);
                },
                function(err){

                    ScormController.createFakeScormController(
                        data,
                        function(scormController){
                            onResult(scormController);
                        },
                        function(err){

                        }
                    );
                }
            );
        }
    );
}

ScormController.createLmsScormController = function(data, onResult, onFault){

    var scorm = pipwerks.SCORM;

    var lmsConnected = false;

    try {
        lmsConnected = scorm.init();
    } catch(ex) {
        _log('ERROR', ex);
    }


    if (lmsConnected) {

        var lmsScormController = new LmsScormController( { model:data.model, scorm:scorm } );

        onResult( lmsScormController );

    } else{
        onFault();
    }
}

ScormController.createDarkanScormController = function(data, onResult, onFault){

    var scormController;

    try {
        var request = {
            request: 'checkScorm',
            pid: ___pid,
            async: false
        };

        ScormController.ajax(
            request,
            function(responce){

                scormController = new DarkanScormController( { model:data.model, responce:responce } );

                onResult( scormController );
            },
            function(responce){

                onFault();
            }
        );
    } catch(err) {
        onFault();

    }
}

ScormController.createFakeScormController = function(data, onResult, onFault){

    scormController = new FakeScormController({ model:data.model });
    onResult( scormController );
}


ScormController.ajax = function(settings, onResult, onFault){

    _log('SCORM AJAX');

    var ajaxUrl = _scormServer;

    var async = true;

    if (!_.isUndefined(settings.async)) {
        async = settings.async;
    }

    $.ajax({
            type: 'POST',
            url: ajaxUrl,
            cache: false,
            //dataType: 'text',
            dataType: 'text',
            data: { request: JSON.stringify(settings) },
            async: async,
            success: function(data)
            {
                onResult(data);
                _log('SCORM AJAX SUCCESS');
            },
            error: function(e)
            {
                onFault();
                _log('SCORM AJAX FAULT', e, _log.error);
            }
        });
}