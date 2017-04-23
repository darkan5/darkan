var TriggerElseActionItemView = TriggerSubtriggerItemView.extend({

    tagName: "li",
    className: 'trigger-elseaction-item',

    template: _.template($('#trigger-elseaction-item-template').html()),

    sectionName: 'elseaction'
});
