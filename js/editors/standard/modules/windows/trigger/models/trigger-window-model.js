var TriggerWindowModel = WindowModel.extend({

    defaults: _.extend({}, WindowModel.prototype.defaults,
        {
            draggable : true,
            modal: false
        }
    )

});
