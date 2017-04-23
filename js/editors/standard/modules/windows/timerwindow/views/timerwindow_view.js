var TimerWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-timer-view',

    template: _.template($('#window-timer-template').html()),

    isRuning: false,
    timerTime: 0,

    events: {
        
    },


    initialize: function( data ) {

        var _that = this;

        
        this.windowModel = data.windowModel;
        this.model = this.windowModel;

        this.runListeners();

        this.getServerDate();

        
        
    },

    getServerDate: function(){

        var _that = this;

        DataAccess.getServerDate(
            { },
            function(data) {

                _log('getServerDate result: ', data, _log.dataaccessOutResult);

                _that.runTimer(data);

            },
            function(data) { 
                _log('getServerDate fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    runTimer : function(data) {

        //var seconds = parseInt( 5 );
        //var seconds = parseInt( Utils.getMinutesUntilNextHour() );
        var seconds = parseInt( data.secondsToFullHour );
        this.timerTime = seconds;

        this.startTimer();
    },

    startTimer : function() {

        if(!this.isRuning){
            this.loop();
        }

        this.isRuning = true;
    },

    loop : function() {

        var _that = this;

        this.renderTime();

        if(this.timerTime > 0){

            this.timerId = window.setTimeout( function(){
                _that.onTick()
            }, 1000 );

        }else{
            this.onComplete();
        }

        this.timerTime --;

    },

    stopTimer : function() {
        window.clearTimeout(this.timerId);
        this.isRuning = false;
    },

    pause : function() {
        window.clearTimeout(this.timerId);
    },

    onTick : function( ) {

        if (this.timerTime >= 0) {

            this.trigger('onTimerTick');

            this.loop();
        }
    },

    onComplete : function() {

        this.stopTimer();

        this.trigger('onTimerComplete');
    },

   convertToTime : function( timeInSeconds ){

       var date = new Date(null);
       date.setSeconds(timeInSeconds);

       var time = this.retValue( date.getUTCMinutes() ) + ':' + this.retValue( date.getUTCSeconds() );

       return time;
   },


    renderTime: function(){

        var time = this.convertToTime(this.timerTime);

        this.$el.find('span[name="time"]').text(time);


    },

    retValue : function(value){

        var ret  = value < 10 ? '0' + value : value;
        return ret;
    },

    beforeDestroy: function(){

        _log('beforeDestroy', 'beforeDestroy');

        this.stopTimer();
    },

    afterRender: function(){

        this.addTitleToButtons();
    },

     addTitleToButtons: function(){
        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });
    },

    
});