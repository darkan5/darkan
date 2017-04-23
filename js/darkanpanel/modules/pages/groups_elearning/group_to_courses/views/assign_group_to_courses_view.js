var AsignGroupToCoursesView = PageView.extend({
    template: '#assign-group-to-courses-template',

    events: {
        'click .course-to-assign': 'selectUserToAssign',
        'click .assign-courses': 'assignSelectedCourses',
        'click .course-assigned': 'deleteCoursesFromGroup',
        'click .remove-selection': 'removeSelection',
    },

    selectedCourses: [ ],

    initialize: function(data) {

        this.selectedCourses = [ ];

        this.groupId = data.groupId;

        this.model = new AssignGroupToCoursesModel({groupId: this.groupId});
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
        this.selectedCourses = [ ];

        this.$el.find('table').DataTable({
            responsive: true,
            info: false,
            infoFiltered: false,
            pagingType: "simple",
            "language": {
                "lengthMenu": _lang('lengthMenu'),
                "zeroRecords": _lang('zeroRecords'),
                "info": _lang('info'),
                "infoEmpty": _lang('infoEmpty'),
                "infoFiltered": _lang('infoFiltered'),
                "search":         _lang('search'),
                "paginate": {
                    "first":      _lang('first'),
                    "last":       _lang('last'),
                    "next":       _lang('next'),
                    "previous":   _lang('previous')
                },
            }
        });
    },

    selectUserToAssign: function(e) {
        var clickedRow = $(e.currentTarget);
        var courseId = parseInt(clickedRow.attr('cid'));

        if (courseId) {
            clickedRow.toggleClass('success');

            if (this.selectedCourses.indexOf(courseId) === -1) {
                this.selectedCourses.push(courseId);
            } else {
                this.selectedCourses.splice(this.selectedCourses.indexOf(courseId), 1);
            }
        }

        if (this.selectedCourses.length) {
            this.$el.find('.assign-courses').removeClass('disabled');
        } else {
            this.$el.find('.assign-courses').addClass('disabled');
        }

        _log('this.selectedCourses', this.selectedCourses)

    },

    removeSelection: function() {
        this.selectedCourses = [ ];
        this.$el.find('.course-to-assign').removeClass('success');
        this.$el.find('.assign-courses').addClass('disabled');

        _log('this.selectedCourses', this.selectedCourses)
    },

    onGetDataResult: function() {
        this.model.getData();
    },

    assignSelectedCourses: function() {

        if (this.selectedCourses.length) {
            var request = {
                request: 'addCoursesToGroup',
                groupID: this.groupId,
                courses: this.selectedCourses
            };


            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                this.onGetDataResult,
                this.onGetDataFault,
                this
            );
        }

        _log('this.selectedCourses', this.selectedCourses)
    },

    deleteCoursesFromGroup: function(e) {
        var clickedRow = $(e.currentTarget);
        var courseId = parseInt(clickedRow.attr('cid'));


        if (courseId) {
            var request = {
                request: 'deleteCourseFromGroup',
                groupID: this.groupId,
                courseID: courseId
            };


            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                this.onGetDataResult,
                this.onGetDataFault,
                this
            );
        }

        _log('this.selectedCourses', this.selectedCourses)
    }
});
