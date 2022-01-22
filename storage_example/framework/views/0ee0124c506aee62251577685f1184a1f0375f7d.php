<?php $__env->startSection('title'); ?>
<?php echo e(Lang::get('projects.title')); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('description'); ?>
<?php echo e(Lang::get('projects.description')); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
<link href="<?php echo e(asset('/css/projects.css')); ?>" rel="stylesheet">

<div class="user-projects-info">
    
</div>

<div class="topmenu-offset"></div>

<!-- WINDOWS CSS -->
<link href="<?php echo e(asset('/css/windows/windows.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/new_project.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/new_folder.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/upload_zbit.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/share_project.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/limit_projects.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/download_zbit.css')); ?>" rel="stylesheet">

<!-- POPUPS CSS -->
<link href="<?php echo e(asset('/css/popups/popups.css')); ?>" rel="stylesheet">



<div class="buttons-container projects-navigation-view col-md-12">

</div>

<div class="projects-container col-md-12">

	<nav role="navigation" class="folders-tree-nav">
		<div class="folders-tree-view"></div>
	</nav>

	<div class="projects-view">

		<div class="breadcrumb-view"></div>
		<div class="clearfix"></div>

		<div class="search-wrapper"></div>

		<hr class="projectlist-hr"/>

		<div class="clearfix"></div>

		<div class="projects"></div>
	</div>

</div>


<div class="clearfix"></div>



<script id="projectslist-template" type="text/template">
    <div class="folders-container"></div>
    <div class="projects-container"></div>
</script>

<script id="projectslist-item-template" type="text/template">
    Item default
</script>

<script id="projectslist-folder-item-template" type="text/template">
    Folder default
</script>

<script id="projectslist-normal-folder-item-template" type="text/template">
    <div class="foldername edit-folder-name"><i class="fa folder-icon fa-folder fa-2x"></i> <span class="edit-folder-name-button"><%-name%></span></div>
    <div class="folder-button delete-folder-button btn btn-xs btn-danger"><?=Lang::get('utils.delete')?></div>
</script>

<script id="projectslist-project-item-template" type="text/template">
    Project
</script>

<script id="projectslist-normal-project-item-template" type="text/template">

	<div class="project-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a href="<?php echo e(url('/editor/')); ?>/<%-project_id%>">
					<img 
						src="<?=config('app.projects_thumb_link')?>/<%-project_id%>.jpg"
						onerror="this.onerror=null;this.src='<?=asset('/css/img/blank.png')?>'"
						>
				
					<div class="editoverlay-wrap">
						<div class="editoverlay">
							<?=Lang::get('utils.open')?>
						</div>
					</div>
				</a>
				<div class="project-block-extras shared-info"><?=Lang::get('utils.shared')?></div>
			</div>
			<div class="caption">
				<h4 class="edit-project-name"><%-name%></h4>
				<hr class="projectlist-hr"/>
				<p class="options-container text-center">
				    <span class="btn btn-xs project-button"><a href="<?php echo e(url('/editor/')); ?>/<%-project_id%>"><?=Lang::get('utils.open')?></a></span>
				    <span class="btn btn-xs project-button share-project-button"><?=Lang::get('utils.share')?></span>
				    <span class="clearfix"></span>
				    <span class="btn btn-xs project-button copy-project-button"><?=Lang::get('utils.copy')?></span>
				    <span class="btn btn-xs project-button download-project-button"><?=Lang::get('utils.download')?></span>
				    <span class="btn btn-xs project-button template-project-button"><?=Lang::get('utils.template')?></span>
				    <span class="clearfix"></span>
				    <span class="btn btn-xs project-button delete-project-button text-danger"><?=Lang::get('utils.delete')?></span>
				</p>
			</div>
		</div>
	</div>
	

    <div></div>
</script>

<script id="projectslist-template-project-item-template" type="text/template">

	<div class="project-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a href="<?php echo e(url('/editor/')); ?>/<%-project_id%>">
					<img 
						src="<?=config('app.projects_thumb_link')?>/<%-project_id%>.jpg"
						>

					<div class="editoverlay-wrap">
						<div class="editoverlay">
							<?=Lang::get('utils.open')?>
						</div>
					</div>
				</a>
				<div class="project-block-extras template-info">Template</div>
				<div class="project-block-extras shared-info"><?=Lang::get('utils.shared')?></div>
			</div>
			<div class="caption">
				<h4 class="edit-project-name"><%-name%></h4>
				<hr class="projectlist-hr"/>
				<p class="options-container text-center">
				    <span class="btn btn-xs project-button"><a href="<?php echo e(url('/editor/')); ?>/<%-project_id%>"><?=Lang::get('utils.open')?></a></span>
				    <span class="btn btn-xs project-button share-project-button"><?=Lang::get('utils.share')?></span>
				    <span class="clearfix"></span>
				    <span class="btn btn-xs project-button copy-project-button"><?=Lang::get('utils.copy')?></span>
				    <span class="btn btn-xs project-button download-project-button"><?=Lang::get('utils.download')?></span>
				    <span class="btn btn-xs project-button template-project-button"><?=Lang::get('utils.untemplate')?></span>
				    <span class="clearfix"></span>
				    <span class="btn btn-xs project-button delete-project-button text-danger"><?=Lang::get('utils.delete')?></span>
				</p>
			</div>
		</div>
	</div>
	

    <div></div>
</script>

<script id="projectslist-shared-to-user-project-item-template" type="text/template">
	
	<div class="project-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a href="<?php echo e(url('/editor/')); ?>/<%-project_id%>">
					<img 
						src="<?=config('app.projects_thumb_link')?>/<%-project_id%>.jpg"
						>

					<div class="editoverlay-wrap">
						<div class="editoverlay">
							<?=Lang::get('utils.open')?>
						</div>
					</div>
				</a>
				<div class="project-block-extras shared-to-user-info"><?=Lang::get('projects.sharedToUserTitle')?><span><%-fromuser%></span></div>
			</div>
			<div class="caption">
				<h4 class="edit-project-name"><%-name%></h4>
				<hr class="projectlist-hr"/>
				<p class="options-container text-center">
				    <span class="btn btn-xs project-button"><a href="<?php echo e(url('/editor/')); ?>/<%-project_id%>"><?=Lang::get('utils.open')?></a></span>
	
				    <span class="clearfix"></span>
				    <span class="btn btn-xs project-button copy-project-button"><?=Lang::get('utils.copy')?></span>

				    <span class="clearfix"></span>
				    <span class="btn btn-xs project-button disconnect-project-button text-danger"><?=Lang::get('projects.disconectFromProject')?></span>
				</p>
			</div>
		</div>
	</div>
	

    <div></div>
</script>

<script id="projectslist-share-user-item-template" type="text/template">
    Share user
</script>

<script id="projectslist-normal-share-user-item-template" type="text/template">
    <div class="share-user-email"><%-mail%></div>
    <div class="btn btn-danger btn-xs share-user-remove-button"><?=Lang::get('utils.delete')?></div>
</script>

<script id="projectslist-no-exist-share-user-item-template" type="text/template">
    <div class="share-user-email"><%-mail%></div>
    <div class="btn btn-danger btn-xs share-user-remove-button"><?=Lang::get('utils.delete')?></div>
</script>





<script id="projectslist-breadcrumb-item-template" type="text/template">
    Breadcrumb default
</script>

<script id="projectslist-normal-breadcrumb-item-template" type="text/template">
    <div class="breadcrumb-item"><%-name == 'DARKAN_MAIN_PROJECTS_FOLDER_NAME' ? Lang.get('projects.myprojects') : name %></div> <span class="breadcrumb-arrow">></span>
</script>

<script id="projectslist-search-breadcrumb-item-template" type="text/template">
    <div class="breadcrumb-item breadcrumb-item-search"><%-name == 'DARKAN_MAIN_PROJECTS_FOLDER_NAME' ? Lang.get('projects.myprojects') : name %></div> <span class="breadcrumb-arrow">></span>
</script>

<script id="projectslist-tree-item-template" type="text/template">
    Tree default
</script>

<script id="projectslist-normal-tree-item-template" type="text/template">
    <i class="fa folder-icon fa-folder fa-2x"></i><span><%-name == 'DARKAN_MAIN_PROJECTS_FOLDER_NAME' ? Lang.get('projects.myprojects') : name %></span>
</script>


<script id="projects-navigation-template" type="text/template">
<div class="row">
    <div class="col-lg-12 main-buttons">

        <button type="button" class="addproject btn btn-success">
            <i class="fa fa-file"></i> <?=Lang::get('projects.createProject')?>
        </button>

        <button type="button" class="addfolder btn btn-primary">
            <i class="fa fa-folder"></i> <?=Lang::get('projects.createFolder')?>
        </button>

        <button type="button" class="uploadzbit btn btn-default">
            <i class="fa fa-upload"></i> <?=Lang::get('projects.uploadProject')?>
        </button>
    </div>
</div>
</script>


<script id="search-template" type="text/template">
	<div class="projects-list-search-wrapper">
    	<input autofocus type="text" class="projects-list-search-input" placeholder="<?=Lang::get('utils.search')?>..." >
    	<span class="fa fa-times remove-search-value"></span>
    </div>	
</script>


<script id="breadcrumb-template" type="text/template">

</script>

<script id="tree-template" type="text/template">
	
</script>

<script id="summary-template" type="text/template">
	<div class=""><?=Lang::get('projects.summaryProjects')?><br><span class="userprojectsnumber"></span> / <span class="usermaxprojects"></span></div>
    <div class=""><?=Lang::get('projects.summaryPublications')?><br><span class="userpublications"></span> / <span class="maxpublications"></span></div>
    <div class=""><?=Lang::get('projects.summaryDiskSpace')?><br><span class="size-user "></span> / <span class="size-max"></span> GB</div>
</script>

<script id="window-template" type="text/template"></script>

<script id="window-new-project-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<form class="new-project-form">
			<legend><?=Lang::get('projects.projectName')?></legend>
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

<script id="window-new-folder-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<form class="new-folder-form">
			<legend><?=Lang::get('projects.foldername')?></legend>
			<div class="form-group">
				<input required placeholder="<?=Lang::get('projects.foldernameplaceholder')?>" value="<?=Lang::get('projects.foldernamevalue')?>" type="text" class="form-control new-folder-name-input">
			</div>

			<div class="form-group text-right">
		        <div class="btn btn-default new-folder-name-cancel"><?=Lang::get('utils.cancel')?></div>
		        <button type="submit" class="btn btn-success new-folder-name-submit"><?=Lang::get('utils.ok')?></button>
	        </div>
		</form>
	</div>
</script>

<script id="window-upload-zbit-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<div class="info-dialog-text">
			<p><?=Lang::get('projects.uploacZbitText')?></p>
			<hr/>
			<div class="form-group text-right">

				<div class="btn btn-default zbit-cancel"><?=Lang::get('utils.cancel')?></div>

				<div class="btn btn-success pr">
					<form id="changeazbitform" enctype="multipart/form-data" role="form" method="POST" action="">
						<input class="zbit-folder-id display-none" name="folderid"/>
						<?=Lang::get('utils.browse')?> <span class="edit-profile-avatar-loader"></span>
						<input class="btn btn-success zbit-browse" id="changeazbit" type="file" name="zbit" accept=".zbit" value="<?=Lang::get('utils.browse')?>"/>

				    </form>
				</div>

				<div class="upload-zbit-loader"></div>
            </div>

		</div>
	</div>
</script>

<script id="window-limit-projects-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<legend><?=Lang::get('projects.projectsLimitWindowTitle')?></legend>

		<p class="projects-limit-description"><?=Lang::get('projects.projectsLimitDescription')?></p>
		<div class="text-center">
			<a target="_blank" class="btn btn-success" href="<?php echo e(url('/pricing')); ?>"><?=Lang::get('projects.projectsLimitLink')?></a>
			<a target="_blank" class="btn btn-info" href="<?php echo e(url('/profile')); ?>"><?=Lang::get('projects.projectsProfileLink')?></a>
		</div>

	</div>
</script>

<script id="window-download-zbit-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<legend><?=Lang::get('projects.downloadProjectWindowTitle')?></legend>

		<p class="download-project-description"><?=Lang::get('projects.downloadProjectDescription')?></p>
		<a href="<%=opts.zbitLink%>" class="btn btn-success download-zbit-button"><?=Lang::get('utils.download')?></a>

	</div>
</script>

<script id="popup-template" type="text/template">
	
</script>

<script id="delete-folder-popup-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<p class="text-center margin150">
		<i class="fa fa-2x fa-exclamation-triangle text-danger"></i> <?=Lang::get('projects.deleteFolderWarning')?>
		</p>
		<hr/>
		<div class="form-group text-right">
	        <div class="btn btn-default popup-cancel-button"><?=Lang::get('utils.cancel')?></div>
	        <button class="btn btn-danger popup-ok-button"><?=Lang::get('utils.delete')?></button>
        </div>
	</div>

	
</script>

<script id="delete-popup-popup-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<p class="text-center margin150">
		<i class="fa fa-2x fa-exclamation-triangle text-danger"></i> <?=Lang::get('projects.deleteProjectWarning')?>
		</p>
		<hr/>
		<div class="form-group text-right">
	        <div class="btn btn-default popup-cancel-button"><?=Lang::get('utils.cancel')?></div>
	        <button class="btn btn-danger popup-ok-button"><?=Lang::get('utils.delete')?></button>
        </div>
	</div>

</script>

<script id="error-popup-template" type="text/template">
	<div class="window-top-bar"><%=title%></div>
	<input type="button" class='window-close-button black-button'>

	<div class="window-content with-buttons">
		<div class="popup-content"><i class="fa fa-exclamation-triangle"></i> <%=content%></div>
	</div>
	<div class="popup-buttons-wrapper">
		<input type="button" class='popup-ok-button' value="OK">
	</div>
</script>

<script id="window-share-project-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">
		<form class="sharing-form">
			<legend><?=Lang::get('projects.sharingTitle')?></legend>
			<div class="form-group">
				<input required placeholder="<?=Lang::get('projects.PLIST_SHARE_PLACEHOLDER')?>" type="text" class="form-control user-email-share">
			</div>

			<div class="form-group text-right">
		        <div class="btn btn-default cancel-share-project"><?=Lang::get('utils.cancel')?></div>
		        <button type="submit" class="btn btn-success submit-share-project"><?=Lang::get('utils.share')?></button>
	        </div>
		</form>
		<hr/>
		<div class="shared-users">
		</div>
	</div>
</script>






<script type="text/template" src="<?php echo e(asset('/js/modules/projects/templates/projectlist_templates.js')); ?>"></script>


<!-- WINDOWS -->
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/window/models/window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/window/views/window_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/new_project/models/new_project_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/new_project/views/new_project_window_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/new_folder/models/new_folder_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/new_folder/views/new_folder_window_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/upload_zbit/models/upload_zbit_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/upload_zbit/views/upload_zbit_window_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/share_project/models/share_project_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/share_project/views/share_project_window_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/limit_projects/models/limit_projects_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/limit_projects/views/limit_projects_window_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/download_zbit/models/download_zbit_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/download_zbit/views/download_zbit_window_view.js')); ?>"></script>




<script src="<?php echo e(asset('/js/modules/windows/factory/window_factory.js')); ?>"></script>

<!-- POPUPS -->
<script type="text/javascript" src="<?php echo e(asset('/js/modules/popups/popup/models/popup_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/popups/popup/views/popup_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/popups/delete_folder/views/delete_folder_popup_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/popups/delete_project/views/delete_project_popup_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/popups/error/views/error_popup_view.js')); ?>"></script>

<script src="<?php echo e(asset('/js/modules/popups/factory/popups_factory.js')); ?>"></script>

<!-- PROJECT LIST -->
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/models/projectlist_item_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/models/project_item_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/models/folder_item_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/models/share_user_item_model.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/collections/folders_collection.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/collections/projects_collection.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/projectlist_item_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/folders/folder_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/folders/normal/normal_folder_item_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/projects/project_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/projects/normal/normal_project_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/projects/template/template_project_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/projects/shared_to_user/shared_to_user_project_item_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/share/share_user_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/share/normal/normal_share_user_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/share/noexist/no_exist_share_user_item_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/breadcrumb/breadcrumb_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/breadcrumb/normal/normal_breadcrumb_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/breadcrumb/search/search_breadcrumb_item_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/tree/tree_item_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/items/tree/normal/normal_tree_item_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/factory/folders_factory.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/factory/projects_factory.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/factory/breadcrumbs_factory.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/factory/tree_factory.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/factory/share_user_factory.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/models/projectlist_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/projectlist_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/breadcrumb_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/tree_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/projects_navigation.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/models/summary_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/summary_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/views/search_view.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/projects/controller/project_list_controller.js')); ?>"></script>
<script type="text/javascript">


	_log('FS', '<?php echo $foldersStructure; ?>');
	var foldersStructureFromDb = <?php echo $foldersStructure; ?>;

	var projectListController = new ProjectListController();

	

</script>



<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>