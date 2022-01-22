var DarkanScormController = ScormController.extend({


	initialize: function(data) {

		

        this.model = data.model;
        this.responce = data.responce;

    },

    saveScorm: function(async) {

        var params = this.getURLParameters();

        var mailingLogin = null;

        for (var paramName in params) {
            if (paramName == 'mh') {
                mailingLogin = params[paramName];
            }
        }

    	var courseData = this.getCourseData();

        var request = courseData;
        request.request = 'saveScorm';
        request.mailingLogin = mailingLogin;
        request.pid = ___pid;
        request.uid = Utils.getCookie('d2uid');
        request.async = async;


        ScormController.ajax(
        	request,
            function(data) {
                //_log('Save correctly', data, _log.dataaccessOutResult);
            },
            function(data) {
                //_log('Save not correctly', data, _log.dataaccessOutFault);
            }
        );
    },

    loadScorm: function() {

    	var _that = this;

        var params = this.getURLParameters();

        var mailingLogin = null;

        for (var paramName in params) {
            if (paramName == 'mh') {
                mailingLogin = params[paramName];
            }
        }


        var request = {
            request: 'getScorm',
            mailingLogin: mailingLogin,
            pid: ___pid,
            uid: Utils.getCookie('d2uid')
        };


        ScormController.ajax(
        	request,
            function(data) {
            	try {
                    var objectData = JSON.parse(data);

                    _that.parseSuspendDataToModel(objectData);

                    _that.setPagesTime(objectData);

                    _that.trigger('on-load-scorm-data');

                } catch(e) {
                    _that.trigger('on-load-scorm-data');
                }
            },
            function(data) {

            }
        );
    },


    setPagesTime: function(data) {

        if (data.pagesTime != '') {

            var pagesTime = JSON.parse(data.pagesTime);

            _log('PAGES TIMES', pagesTime);

            var pagesCollection = this.model.get('pages');

            pagesCollection.each(function(pModel, i) {

                if (!_.isUndefined(pagesTime[i])) {

                    _log('podmieniam czasy na stronie ', i);
                    _log('ustawiam czas na ', pagesTime[i]);

                    pModel.get('options').set('timeOnPage', pagesTime[i]);
                } else {
                    _log('nie wykryłem strony', i);
                }
            });
        }
    },

    getURLParameters: function() {
        
        var url =  window.location.search.substring(0);
        
        var result = {};

        var searchIndex = url.indexOf("?");
        if (searchIndex == -1 ) return result;
                    
        var sPageURL = url.substring(searchIndex +1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {       
            var sParameterName = sURLVariables[i].split('=');      
            result[sParameterName[0]] = sParameterName[1];
        }
        return result;
    }

});