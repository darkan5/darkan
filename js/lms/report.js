var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {

    },

    initialize: function( ) {
        
        $(".datepicker-start-date-add").datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'pl',
            onChangeDateTime: function(dp, $input){
                var dt2 = $('.datepicker-end-date-add');
                var minDate = $('.datepicker-start-date-add').val();
                var currentDate = new Date();
                var targetDate = moment(minDate).toDate();
                var dateDifference = currentDate - targetDate;
                var minLimitDate = moment(dateDifference).format('YYYY/MM/DD');
                var endDate = moment(dt2.val()).toDate();
                if((currentDate - endDate) >= (currentDate - targetDate))
                    dt2.datetimepicker({
                        'value': minDate
                    });
                dt2.datetimepicker({
                    'minDate': '-'+minLimitDate
                });
            }
        });
        $(".datepicker-end-date-add").datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'pl'
        });


        $(".datepicker-start-date-edit").datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'pl',
            onChangeDateTime: function(dp, $input){
                var dt2 = $('.datepicker-end-date-edit');
                var minDate = $('.datepicker-start-date-edit').val();
                var currentDate = new Date();
                var targetDate = moment(minDate).toDate();
                var dateDifference = currentDate - targetDate;
                var minLimitDate = moment(dateDifference).format('YYYY/MM/DD');
                var endDate = moment(dt2.val()).toDate();
                if((currentDate - endDate) >= (currentDate - targetDate))
                    dt2.datetimepicker({
                        'value': minDate
                    });
                dt2.datetimepicker({
                    'minDate': '-'+minLimitDate
                });
            }
        });
        $(".datepicker-end-date-edit").datetimepicker({
            format:'Y-m-d H:i:s',
            lang:'pl'
        });
    },

    render: function(){

    },

    serializeData: function(){
        return {};
    },

    afterRender: function(){
        
    },

});

var bodyView = new BodyView();