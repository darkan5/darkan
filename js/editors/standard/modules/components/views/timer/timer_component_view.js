var TimerComponentView = TextComponentView.extend({

    className : 'component timer-component',

    template: _.template($('#timer-component-template').html()) ,

    defaultContent: '<span name="hours" style="font-size:30px">00</span><span name="minutes" style="font-size:30px">00</span><span name="seconds" style="font-size:30px">00</span>',
    defaultText: _lang('TIMER_INSERTTEXT'),

    addComponentListeners :function(){
        this.listenTo(this.model, 'change:hours', this.renderTime);
        this.listenTo(this.model, 'change:minutes', this.renderTime);
        this.listenTo(this.model, 'change:seconds', this.renderTime);

        this.listenTo(this.model, 'change:hoursEnabled', this.renderTime);
        this.listenTo(this.model, 'change:minutesEnabled', this.renderTime);
        this.listenTo(this.model, 'change:secondsEnabled', this.renderTime);

        this.listenTo(this.model, "change:enable-scrollbar", this.renderScrollbar, this);
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

    afterRender : function(){
        this.renderTime();
        this.renderScrollbar();
        
    }

});

var TimerComponentViewNotEditable = ComponentView.createNotEditableComponentClass(TimerComponentView);
