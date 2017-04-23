var build_app_layout = function(container) {
	var finder = function (sClassName) {
		return container.find(sClassName); 
	};

	return {

		darkanapp: finder('#darkanapp'),

		scene_wrapper: finder('#scene-wrapper'),

		text_editor_image: finder('#text-editor-image'),

		load_project_modal: finder('#load-project-modal'),

		menu_top: finder('#menu-top'),
		menu_top_tabs: finder('#menu-top-tabs'),
		
		menu_bottom: finder('#menu-bottom'),
		menu_bottom_tabs: finder('#menu-bottom-tabs'),
		
		menu_right: finder('#menu-right'),
		menu_right_tabs: finder('#menu-right-tabs'),

		menu_left: finder('#menu-left'),


		pages_list_wrapper: finder('#pages-list-wrapper, #second-pages-list-wrapper')

	};
};


window._layout = build_app_layout( $(document) );