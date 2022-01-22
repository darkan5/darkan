var TimerComponentView = TextComponentView.extend({

    className : 'component timer-component',

    template: _.template($('#timer-component-template').html()),

    isRuning: false,
    timerTime: 0,

    afterInitialize: function() {

        this.model.set('s_hours', this.model.get('hours'));
        this.model.set('s_minutes', this.model.get('minutes'));
        this.model.set('s_seconds', this.model.get('seconds'));
    },


    startTimer : function() {

        var _that = this;

        if(!this.isRuning){

            var timerComponentsCollection = ProjectModel.instance.getTimerComponentsById(this.model.get('timerId'));
            timerComponentsCollection.each(function(tModel){

                if(tModel.cid != _that.model.cid){

                    tModel.set('hours', _that.model.get('hours'));
                    tModel.set('minutes', _that.model.get('minutes'));
                    tModel.set('seconds', _that.model.get('seconds'));

                    if(tModel.view){
                        window.clearTimeout(tModel.view.timerId);
                        tModel.view.isRuning = false;
                        tModel.view.renderTime();
                    }
                }
            });


            this.loop();
        }

        this.isRuning = true;
    },

    loop : function() {

        var _that = this;

        this.setTimeToModel();
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

        var _that = this;

        var timerComponentsCollection = ProjectModel.instance.getTimerComponentsById(this.model.get('timerId'));
        timerComponentsCollection.each(function(tModel){

            if(tModel.view){
         
                window.clearTimeout(tModel.view.timerId);
                tModel.view.isRuning = false;
            }

            tModel.set('hours', _that.model.get('hours'));
            tModel.set('minutes', _that.model.get('minutes'));
            tModel.set('seconds', _that.model.get('seconds'));
 
        });
    },

    pause : function() {
        window.clearTimeout(this.timerId);
    },

    resetTimer : function() {

        var _that = this;

        var timerComponentsCollection = ProjectModel.instance.getTimerComponentsById(this.model.get('timerId'));
        timerComponentsCollection.each(function(tModel){

            if(tModel.view){
         
                window.clearTimeout(tModel.view.timerId);
                tModel.view.isRuning = false;
            }

            tModel.set('hours', _that.model.get('s_hours'));
            tModel.set('minutes', _that.model.get('s_minutes'));
            tModel.set('seconds', _that.model.get('s_seconds'));

            if(tModel.view){
                tModel.view.renderTime();
            }
        });

        this.afterShow();
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

//    convertToTime : function( timeInSeconds ){
//
//        var date = new Date(null);
//        date.setSeconds(timeInSeconds);
//        var time = _that.retValue( date.getUTCHours() ) + ':' + _that.retValue( date.getUTCMinutes() ) + ':' + _that.retValue( date.getUTCSeconds() );
//
//        return time;
//    }

    setTimeToModel: function() {

        var _that = this;

        var date = new Date(null);
        date.setSeconds(this.timerTime);

        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var seconds = date.getUTCSeconds();

        this.model.set('hours', hours);
        this.model.set('minutes', minutes);
        this.model.set('seconds', seconds);

        var timerComponentsCollection = ProjectModel.instance.getTimerComponentsById(this.model.get('timerId'));
        timerComponentsCollection.each(function(tModel){

            if(tModel.cid != _that.model.cid){

                tModel.set('hours', _that.model.get('hours'));
                tModel.set('minutes', _that.model.get('minutes'));
                tModel.set('seconds', _that.model.get('seconds'));

                if(tModel.view){
                    tModel.view.renderTime();
                }
            }
        });
    },

    afterRender: function() {
         this.renderTime();
         this.renderScrollbar();
    },

    afterShow: function() {

        var hoursEnabled = this.model.get('hoursEnabled');
        var minutesEnabled = this.model.get('minutesEnabled');
        var secondsEnabled = this.model.get('secondsEnabled');

        var counterAutostart = this.model.get('counterAutostart');

        var hours = hoursEnabled ? parseInt( this.model.get('hours') ) * 3600 : 0;
        var minutes = minutesEnabled ? parseInt( this.model.get('minutes') ) * 60 : 0;
        var seconds = secondsEnabled ? parseInt( this.model.get('seconds') ) : 0;

        this.timerTime = hours + minutes + seconds;

        if(counterAutostart){
            this.startTimer();
        }
    },

    renderTime: function(){

        var hours = this.retValue( this.model.get('hours') );
        var minutes = this.retValue( this.model.get('minutes') );
        var seconds = this.retValue( this.model.get('seconds') );



        var hoursEnabled = this.model.get('hoursEnabled');
        var minutesEnabled = this.model.get('minutesEnabled');
        var secondsEnabled = this.model.get('secondsEnabled');

        if(!secondsEnabled){
            seconds = "";
        }

        if(!minutesEnabled){
            minutes = "";
        }

        if(!hoursEnabled){
            hours = "";
        }


        this.$el.find('span[name="hours"]').text(hours);
        this.$el.find('span[name="minutes"]').text(minutes);
        this.$el.find('span[name="seconds"]').text(seconds);



        var separatorHours = ":";
        var separatorMinutes = ":";

        if(!secondsEnabled){
            separatorMinutes = "";
        }

        if(!minutesEnabled){
            separatorMinutes = "";
        }

        if(!hoursEnabled){
            separatorHours = "";
        }

        if(hoursEnabled && (secondsEnabled || minutesEnabled)){
            separatorHours = ":";
        }

        if(hoursEnabled && (!secondsEnabled && !minutesEnabled)){
            separatorHours = "";
        }

        this.$el.find('span[name="separator-hours"]').text(separatorHours);
        this.$el.find('span[name="separator-minutes"]').text(separatorMinutes);
    },

    retValue : function(value){

        var ret  = value < 10 ? '0' + value : value;
        return ret;
    },

    beforeDestroy: function(){

        _log('beforeDestroy', 'beforeDestroy');

        this.stopTimer();
    },
});
