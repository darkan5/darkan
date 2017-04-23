var QuizComponentView = ComponentView.extend({

    className : 'component quiz-component',

    template: _.template($('#quiz-component-template').html()),


    prepareChartData: function(){

        var scormData = this.model.get('scormdata');
        var answers = this.model.get('answers');

        var answersCounter = { };

        for (var a in answers) {
            var answer = answers[a];
            answersCounter[a] = {
                text: answer.text,
                hits: 0
            };
        }


        if (scormData && scormData.data) {
            var chartData = [ ];

            var scormDataAnswers = scormData.data;

            // go through all scorm rows
            for (var i = scormDataAnswers.length - 1; i >= 0; i--) {
                var scormRow = scormDataAnswers[i];

                // go through all user answers in single scorm row
                for (var sR in scormRow) {
                    // if this answer exists and if user checked it
                    if ( answersCounter[sR] && scormRow[sR].c ) {
                        answersCounter[sR].hits++;
                    }
                }
            };

            for (var s in answersCounter) {
                if (s.length) {
                    chartData.push({
                        name: answersCounter[s].text,
                        hits: answersCounter[s].hits
                    });   
                }
            }

            this.model.set('chartData', chartData); 
        }
    }

});