var UserInCourseItemDetailsChartView = ItemLayoutView.extend({

    className: 'dashboard-item',

    template: '#user-incourse-item-chart-template',
    initialize: function(data){

        this.model = new UserInCourseChartDetailsItemModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    onRender :function(){

        _log('model user-incourse-item-chart-model', this.model.toJSON());

        var userTimes =  this.model.get('usersDetailsInCourse').page_time;

        var displayData = [];

        var index = 1;

        for (var item in userTimes) {

            displayData.push({ page: _lang('page_chart_iteration') + index, time:userTimes[item] });

            index++;
        };

        var chart =  $('#user-incourse-item-chart');
        chart.html('');

        if(displayData.length > 0){
            setTimeout(function(){
                try {
                    Morris.Area({
                        element: chart,
                        data: displayData,
                        xkey: ['page'],
                        ykeys: ['time'],
                        labels: [_lang('time'), _lang('page')],
                        pointSize: 2,
                        hideHover: 'auto',
                        resize: true,
                        parseTime:false
                    });
                } catch(err) {
                    _log('err', err, _log.error);
                }

            }, 10);
        } else {
            chart.html(_lang('infoEmpty'));
        }
    }
});
