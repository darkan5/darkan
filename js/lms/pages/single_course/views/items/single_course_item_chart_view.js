var SingleCourseItemChartView = PageView.extend({
    template: '#single-course-item-chart-template',
    initialize: function(data){

        this.model = new SingleCourseItemChartModel(data);
        this.model.on('change', this.onModelChanged, this);

    },

    onModelChanged: function(){

        _log('onModelChanged', this.model);

        this.render();


    },

    onRender :function(){

        var userTimes =  this.model.get('userTimes');

        var pageTimeSummary = {};

        for (var i = 0; i < userTimes.length; i++) {
            var oneUser = userTimes[i];

            for (var page in oneUser) {

                if(pageTimeSummary[page] == undefined){
                    pageTimeSummary[page] = 0;
                }

                pageTimeSummary[page] += oneUser[page];

            };
        };

        var displayData = [];

        var index = 1;

        for (var item in pageTimeSummary) {

            displayData.push({ page: _lang('page_chart_iteration') + index, time:parseFloat(pageTimeSummary[item]/userTimes.length).toFixed(1) });

            index++

        };

        var chart =  $('#pages-times-summary-chart');
        chart.html('');

        //debugger;

        if(displayData.length > 0){
            setTimeout(function(){
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
            }, 10);
        } else {
            chart.html(_lang('infoEmpty'));
        }

    }




});