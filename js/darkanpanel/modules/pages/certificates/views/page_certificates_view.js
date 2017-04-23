var PageCertificatesView = PageView.extend({
    template: '#page-certificates-template',

    regions: {
        certificatesCoursesList: '#certificates-courses-list-section',
        certificatesGroupsList: '#certificates-groups-list-section',
    },

    events: {
        'click #generate-certificate': 'generateCertificate',
    },

    initialize: function(data){
        this.model = new PageCertificatesModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
        this.certificatesCoursesList.show(new CertyficatePageCoursesItemListView( this.model.toJSON() ));
        this.certificatesGroupsList.show(new CertificatesPageGroupsView( this.model.toJSON() ));

        this.makeDatapicker();
        this.makeSummernote();
    },

    

    makeSummernote: function() {
        $('#certyficate-title').summernote({
            height: 100,      
   

              focus: true,               
        });
    },

    makeDatapicker: function() {

        var date = new Date();
         var today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
         _log('today', today);


        $('.course-date-datepicker').datetimepicker({
              format:'Y-m-d',
              lang:'pl',
              endDate : today

         });

         $('.course-date-datepicker').val($('.course-date-datepicker').val()); 

         $('.course-date-datepicker').datetimepicker('setHoursDisabled', null);

         

    },

    generateCertificate: function(e) {

        var _that = this;

        


        var coursesIDS = this.getCoursesIds();
        var groupsIDS = this.getGroupsIds();
        var courseDate = this.getCourseDate();
        var certificateTitle = this.getCertificateTitle();

        

        if(certificateTitle == ""){
            _Notify(_lang('notify_generate_certyficate_danger_no_title'), 'danger');
            return;
        }

        if(courseDate == ""){
            _Notify(_lang('notify_generate_certyficate_danger_no_course_date'), 'danger');
            return;
        }

        if(coursesIDS.length == 0){
            _Notify(_lang('notify_generate_certyficate_danger_no_courses'), 'danger');
            return;
        }

        if(groupsIDS.length == 0){
            _Notify(_lang('notify_generate_certyficate_danger_no_groups'), 'danger');
            return;
        }




        _Notify(_lang('notify_generate_certyficate_starting'), 'success');


        //return;

        var request = {
                request: 'generateCertificate',
                //courseID: this.model.get('courseId'),
                coursesIDS: coursesIDS,
                groupsIDS: groupsIDS,
                certificateTitle:certificateTitle,
                courseDate:courseDate
            };

            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                function(data) {

                    _log('generateCertificate data', data);

                    var ret = JSON.parse(data);

                    switch(ret.responce.status){
                        case 'success' :
                            _that.showDownloadPopup(ret);
                            break;

                        case 'error' :
                            _Notify(_lang('notify_generate_certyficate_danger'), 'danger');
                            break;

                        case 'no-certyficates' :
                            _Notify(_lang('notify_generate_certyficate_danger_none_result'), 'danger');
                            break;    
                    }

                    if(ret.responce.status == 'success'){
  
                        

                    }else{
                        
                    }
                    
                },
                function() {
                    _Notify(_lang('notify_generate_certyficate_danger'), 'danger');
                },
                _that
            );

    },

    showDownloadPopup:function(data){

        var downloadCertyficateWindow = this.$el.find('#download-certyficate-window');

        _log('data', data);

        var zipFilePath = data.responce.zipFilePath;
        var a = downloadCertyficateWindow.find('#download-certificate-link');
        a.attr('href', zipFilePath); 

        downloadCertyficateWindow.modal();

    },

    getCoursesIds: function() {

        var coursesIDS = [];

        var trs = this.$el.find('#courses-list').find('tr');

        _log('trs', trs);

        for (var i = 1; i < trs.length; i++) {
            var tr = $(trs[i]);

            var checkbox = tr.find('.certyficate-course-selected');

            if(checkbox.prop('checked')){
                var courseID =  tr.attr('courseid');
                coursesIDS.push(parseInt(courseID));
            }

            
        };

        _log('coursesIDS', coursesIDS);

        return coursesIDS;
    },




    getCertificateTitle: function() {
        var certificateTitle = this.$el.find('#certyficate-title').code();

        _log('certificateTitle', certificateTitle);

        return "" + certificateTitle;
    },
    

    getCourseDate: function() {
        var date = $('.course-date-datepicker').val();
        return date;
    },

    getGroupsIds: function() {

        var groupsIDS = [];

        var trs = this.$el.find('#groups-list').find('tr');

        _log('trs', trs);

        for (var i = 1; i < trs.length; i++) {
            var tr = $(trs[i]);

            var checkbox = tr.find('.certyficate-group-selected');

            if(checkbox.prop('checked')){
                var courseID =  tr.attr('groupid');
                groupsIDS.push(parseInt(courseID));
            }
        };

        _log('groupsIDS', groupsIDS);

        return groupsIDS;
    }

    // events: {
    //     'change .force-login': 'savePanelSettings',
    //     'change .only-my-users': 'savePanelSettings'
    // },

//    bindings: {
//        '.force-login': 'login',
//        '.only-my-users': 'state'
//    },

    // savePanelSettings: function() {




    //     var forceLogin = $('.force-login').prop('checked');
    //     var onlyMyUsers = $('.only-my-users').prop('checked');
    //     DataAccess.setPanelSettings(
    //         {forceLogin: forceLogin, onlyMyUsers:onlyMyUsers, userType: 'all'},
    //         function(data){
    //             _log('saved', data)

    //             _log('savePanelSettings', this.model.toJSON());
    //         },
    //         function(){_log('save failed')},
    //         this
    //     );
    // },

});