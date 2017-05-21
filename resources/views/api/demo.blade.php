@extends('web.layout')

@section('title')
{{ Lang::get('apidemo.title') }}
@stop

@section('description')
{{ Lang::get('footerpages.descriptions') }}
@stop

@section('content')

<!-- WINDOWS CSS -->
<link href="{{ asset('/js/modules/apidemo/windows/window/window.css') }}" rel="stylesheet">
<link href="{{ asset('/js/modules/apidemo/windows/new_project/new_project.css') }}" rel="stylesheet">


<link href="{{ asset('/js/modules/apidemo/sections/projects_list/projects_list.css') }}" rel="stylesheet">
<link href="{{ asset('/js/modules/apidemo/sections/events_list/events_list.css') }}" rel="stylesheet">
<link href="{{ asset('/js/modules/apidemo/sections/command_line/command_line.css') }}" rel="stylesheet">
<link href="{{ asset('/js/modules/apidemo/sections/api/api.css') }}" rel="stylesheet">
<link href="{{ asset('/js/modules/apidemo/sections/iframe/iframe.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>


<div id="main-content-wrapper" class="col-md-10 col-md-offset-1">

		<h2>{{ Lang::get('apidemo.PP_INFO_1') }}</h2>
		<h5>{{ Lang::get('apidemo.PP_INFO_2') }}</h5>
		<h5>{{ Lang::get('apidemo.PP_INFO_3') }}</h5>
		<hr>
		<div class="api-demo-container"></div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>

<script id="apidemo-controller-template" type="text/template">
	<div class="projects-list-wrapper"></div>
	<div class="api-editor-wrapper"></div>
	<div class="api-course-wrapper"></div>
</script>

<script id="projects-list-template" type="text/template">

	<div class="projects-list-navigation"></div>
	<div class="projects-list-items"></div>

</script>

<script id="projects-list-item-template" type="text/template">

	<div class="project-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a>
					<img 
						src="<?=config('app.projects_thumb_link')?>/<%-project_id%>.jpg"
						onerror="this.onerror=null;this.src='<?=asset('/css/img/blank.png')?>'"
						>
				</a>
				<div class="project-block-extras shared-info"><?=Lang::get('utils.shared')?></div>
			</div>
			<div class="caption">
				<h4 class="edit-project-name"><%-name%></h4>
				<hr class="projectlist-hr"/>
				<p class="options-container text-center">
				    <span class="btn btn-xs project-button open-project">{{ Lang::get('apidemo.openProject') }}</span>
				    <span class="btn btn-xs project-button publish-project">{{ Lang::get('apidemo.publishProject') }}</span>

				    <% if(link != '') { %>
				    	<span>
				    		<a class="btn btn-xs project-button download-published-project-link" href="<%-link%>">{{ Lang::get('apidemo.downloadPublishedProject') }}</a>
				    	</span>
				    <% } %>

				</p>
			</div>
		</div>
	</div>
	

    <div></div>
</script>

<script id="projects-list-plus-button-template" type="text/template">
	+
</script>



<script id="api-template" type="text/template">

	<div class="api-window-top-bar"><%=title%></div>
	<input type="button" class='api-window-close-button'>

	<div class="api-window-content">
		<div class="iframe-wrapper"></div>
		<div class="navigation-wrapper"></div>
		<div class="console-wrapper"></div>
		<div class="events-list-wrapper"></div>
	</div>


</script>

<script id="api-editor-template" type="text/template">

	<div class="window-top-bar"><%=title%></div>
	<input type="button" class='window-close-button'>

	<div class="window-content">
		<div class="iframe-wrapper"></div>
		<div class="navigation-wrapper"></div>
		<div class="console-wrapper"></div>
		<div class="events-list-wrapper"></div>
	</div>

</script>

<script id="api-course-template" type="text/template">
	<div class="window-top-bar"><%=title%></div>
	<input type="button" class='window-close-button'>

	<div class="window-content">
		<div class="iframe-wrapper"></div>
		<div class="navigation-wrapper"></div>
		<div class="console-wrapper"></div>
		<div class="events-list-wrapper"></div>
	</div>

</script>

<script id="iframe-template" type="text/template">
	Iframe section
</script>

<script id="iframe-editor-template" type="text/template">
	<iframe class="iframe-editor"></iframe>
</script>

<script id="iframe-course-template" type="text/template">
	<iframe class="iframe-course"></iframe>
</script>

<script id="navigation-template" type="text/template">
	Navigation section
</script>

<script id="navigation-editor-template" type="text/template">
	<input class="go-to-next-page" type="button" value ="{{ Lang::get('apidemo.goToNextPageBtn') }}"/>
	<input class="go-to-prev-page" type="button" value ="{{ Lang::get('apidemo.goToPrevPageBtn') }}"/>
</script>

<script id="navigation-course-template" type="text/template">
	<input class="go-to-next-page" type="button" value ="{{ Lang::get('apidemo.goToNextPageBtn') }}"/>
	<input class="go-to-prev-page" type="button" value ="{{ Lang::get('apidemo.goToPrevPageBtn') }}"/>
</script>





<script id="events-list-template" type="text/template">

	<div class="events-list-navigation">
		<input class="clear-events-list" type="button" value ="{{ Lang::get('apidemo.clearEventsListBtn') }}"/>
	</div>
	<ul class="events-list-items"></ul>

</script>

<script id="events-list-item-template" type="text/template">
	<%-data%>
</script>

<script id="command-line-template" type="text/template">
	Console
</script>

<script id="command-line-editor-template" type="text/template">
	<textarea class="command-line command-line-editor" placeholder="{{ Lang::get('apidemo.commandLinePlaceholder') }}" rows="4" cols="50"></textarea>
</script>

<script id="command-line-course-template" type="text/template">
	<textarea class="command-line command-line-course" placeholder="{{ Lang::get('apidemo.commandLinePlaceholder') }}" rows="4" cols="50"></textarea>
</script>



<script id="window-template" type="text/template"></script>

<script id="window-new-project-template" type="text/template">
	<div class="api-window-top-bar"><?=Lang::get('apidemo.newProjectWindowTitle')?></div>
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<form class="new-project-form">
			<span><?=Lang::get('projects.projectName')?></span>
			<div class="form-group">
				<input required placeholder="<?=Lang::get('projects.enterProjectName')?>" value="<?=Lang::get('projects.newProject')?>" type="text" class="form-control projectname-input">
			</div>

			<div class="form-group text-right">
		        <div class="btn btn-default new-project-cancel"><?=Lang::get('utils.cancel')?></div>
		        <button class="btn btn-success add-new-project-button"><?=Lang::get('projects.createProjectBtn')?></button>
	        </div>

			<div style="display: none">
				<span><?=Lang::get('apidemo.projectDimensions')?></span>
				<div class="form-group">
					<input required placeholder="<?=Lang::get('apidemo.enterProjectDimensions')?>" value="<?=Lang::get('apidemo.projectDimensionsDeafult')?>" type="text" class="form-control projectdimensions-input">
				</div>

				<span><?=Lang::get('apidemo.projectSkin')?></span>
				<div class="form-group">
					<input required placeholder="<?=Lang::get('apidemo.enterProjectSkin')?>" value="<?=Lang::get('apidemo.projectSkinDeafult')?>" type="text" class="form-control projectskin-input">
				</div>

				<span><?=Lang::get('apidemo.projectAutoScale')?></span>
				<div class="form-group">
					<input required placeholder="<?=Lang::get('apidemo.enterProjectAutoScale')?>" value="<?=Lang::get('apidemo.projectAutoScaleDeafult')?>" type="text" class="form-control projectautoscale-input">
				</div>
	        </div>
		</form>
	</div>
</script>

<script id="window-publish-project-template" type="text/template">
	<div class="api-window-top-bar"><?=Lang::get('apidemo.publishProjectWindowTitle')?></div>
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<form class="new-project-form">
			<legend></legend>
			<div class="form-group">
				<input required placeholder="<?=Lang::get('projects.enterProjectName')?>" value="<?=Lang::get('projects.newProject')?>" type="text" class="form-control projectname-input">
			</div>

			<div class="form-group text-right">
		        <div class="btn btn-default new-project-cancel"><?=Lang::get('utils.cancel')?></div>
		        <button class="btn btn-success add-new-project-button"><?=Lang::get('projects.createProjectBtn')?></button>
	        </div>
		</form>
	</div>
</script>



<script type="text/javascript" src="<?php echo env('APP_PROTOCOL').env('APP_URL') ?>/js/editors/standard/api/darkan_editor_api.js"></script>

<!-- WEBSERVICE -->
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/webservice/webservice.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/webservice/fake/fake_webservice.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/webservice/php/php_webservice.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/webservice/node/node_webservice.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/webservice/data_access.js') }}"></script>


<!-- WINDOWS -->
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/windows/window/models/window_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/windows/window/views/window_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/windows/new_project/models/new_project_window_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/windows/new_project/views/new_project_window_view.js') }}"></script>

<script src="{{ asset('/js/modules/apidemo/windows/factory/window_factory.js') }}"></script>

<!-- SECTIONS -->
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/projects_list/models/projects_list_item_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/projects_list/views/projects_list_item_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/projects_list/views/projects_list_plus_button_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/projects_list/collections/projects_items_collection.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/projects_list/models/projects_list_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/projects_list/views/projects_list_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/api/models/api_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/api/views/api_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/api_editor/models/api_editor_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/api_editor/views/api_editor_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/api_course/models/api_course_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/api_course/views/api_course_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/iframe/models/iframe_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/iframe/views/iframe_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/iframe/views/iframe_editor_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/iframe/views/iframe_course_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/command_line/models/command_line_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/command_line/views/command_line_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/command_line/views/command_line_editor_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/command_line/views/command_line_course_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/navigation/models/navigation_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/navigation/views/navigation_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/navigation/views/navigation_editor_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/navigation/views/navigation_course_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/models/events_list_item_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/views/events_list_item_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/views/events_list_command_item_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/views/events_list_responce_item_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/collections/events_items_collection.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/models/events_list_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/events_list/views/events_list_view.js') }}"></script>

<script type="text/javascript" src="{{ asset('/js/modules/apidemo/sections/factory/sections_factory.js') }}"></script>

<!-- CONTROLLER -->
<script type="text/javascript" src="{{ asset('/js/modules/apidemo/controller/apidemo_controller.js') }}"></script>

<script type="text/javascript">


	_log('projects', '{!! $projects !!}');
	var projectsFromDb = {!! $projects !!};

	var apiDemoController = new ApiDemoController();
	$('.api-demo-container').append(apiDemoController.render().$el);



</script>

@endsection