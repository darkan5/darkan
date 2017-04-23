var TimerModel = TextModel.extend({

    defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
        {
            type:"timer",
            width : 160,
            height : 70,
            padding: 10,
            contents: '<span name="hours" style="font-size:30px">00</span>\
                       <span name="separator-hours" style="font-size:30px"></span>\
                       <span name="minutes" style="font-size:30px">00</span>\
                       <span name="separator-minutes" style="font-size:30px"></span>\
                       <span name="seconds" style="font-size:30px">00</span>',
            'enable-scrollbar' : false,
            bgcolor: '',
            hours: 0,
            minutes: 5,
            seconds: 30,
            hoursEnabled: true,
            minutesEnabled: true,
            secondsEnabled: true,
            counterAutostart : true,
            timerId : ""

        }
        )
    },

    onActionkeySet :function(){

        var actionkey = this.get('actionkey');

        var prefix = actionkey.split("-");

        var timerId =  this.get('timerId');

        this.set('timerId', 'timer-' + prefix[1] + "-" + prefix[2], {silent:true});
    },

    getTriggerWhenDoIt :function(){

        var triggerWhenDoIt = new TriggerActionsCollection();

        var triggerActionModel = new TriggerActionsCollection();
        var triggerActionModel = new TriggerActionModel({ group: 'Timer', options: [
            { name:_lang('TIMER_ON_TIMER_COMPLETE'), value:'onTimerComplete' },
            { name:_lang('TIMER_ON_TIMER_TICK'), value:'onTimerTick' }
        ] });

        triggerWhenDoIt.add( triggerActionModel );

        return triggerWhenDoIt.toJSON();
    },

    getTriggerWhatToDo :function(){

        return [];
    }
});
