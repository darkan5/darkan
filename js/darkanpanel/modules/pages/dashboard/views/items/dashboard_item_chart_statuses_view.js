var DashboardItemChartStatusesView = DashboardItemView.extend({

    className: 'dashboard-item',

    template: '#dashboard-item-chart-statuses-template',
    initialize: function(data){

        this.model = new DashboardChartStatusesItemModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    onRender :function(){

        _log('model chart', this.model.toJSON());

        var complitionInfo =  this.model.get('complitionInfo');

        var exist = false;

        for(var item in complitionInfo){
            if(item != undefined){
                exist = true;
            }
        }

        var displayData = [];

        var chart =  $('#course-statuses-chart');

        if(exist){

            var statuses = ['passed', 'failed', 'incomplete'];

            for(var item in statuses){

                var label = statuses[item];
                var value = complitionInfo[label] == undefined ? 0 : complitionInfo[label];

                displayData.push({ label: _lang(label), value: value });
            }


            _log('displayData', displayData, _log.timeline);

            chart.html('');

            setTimeout(function(){

                Morris.Donut({
                    element: chart,
                    data: displayData,
                    resize: true,
                    hideHover: 'auto',
                    colors: ['#009900', '#BB3737', '#5082A5']
                });
            }, 10);
        }else{
            chart.html(_lang('no_data'));
        }
    }
});
