var ReportMenuPanelView = MenuPanelView.extend({
		
    tagName: 'div',

	template: _.template($('#report-menu-panel-template').html()),

    bindings: {
        'input[name="reportname"]': 'reportName'
    },

    events: {
        
    },

});