var PageModel = Backbone.Model.extend({

    isDestroyed: false,


    getData: function(){
        // To override

        _log('getData should by override');
    },

    onGetDataResult: function(data){

        _log('onGetDataResult', data, _log.dataaccessOutResult);

        var responce = JSON.parse(data);

        _log('this', this);

        this.updateModel(responce);
    },

    onGetDataFault: function(data){
        _log('onGetDataFault', data, _log.dataaccessOutFault);
    },

    updateModel: function(options) {

        _log('updateModel', options);

        for (var item in options) {

            _log('item', item);
            _log('responce[item]', options[item]);

            this.set(item, options[item], { silent:true });
        };
        this.trigger('change');
    },

    onBeforeDestroy: function(arg1, arg2){

        _log('onBeforeDestroy');

        this.isDestroyed = true;
    }
});