var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-user-to-reseler-rabat' : 'editUserToDistributorRabat',
        'click .delete-user-to-reseler-rabat' : 'deleteUserToDistributorRabat',
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

    editUserToDistributorRabat: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-user-to-reseler-rabat-window');



        windowBootstrap.find('input[name="user_to_reseler_rabat_id"]').val(sender.attr('user_to_reseler_rabat_id'));
        windowBootstrap.find('select[name="user_id"]').val(sender.attr('user_id'));
        windowBootstrap.find('select[name="currency_id"]').val(sender.attr('currency_id'));
        windowBootstrap.find('input[name="rabat"]').val(sender.attr('rabat'));
        windowBootstrap.find('input[name="amount"]').val(sender.attr('amount'));
        windowBootstrap.find('input[name="start_date"]').val(sender.attr('start_date'));
        windowBootstrap.find('input[name="expiration_date"]').val(sender.attr('expiration_date'));
        windowBootstrap.find('input[name="active"]').val(sender.attr('active'));

    },

    deleteUserToDistributorRabat: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-to-reseler-rabat-window');

        windowBootstrap.find('input[name="user_to_reseler_rabat_id"]').val(sender.attr('user_to_reseler_rabat_id'));
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