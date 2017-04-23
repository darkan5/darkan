<script id="top-menu-template-browser-test-drive" type="text/template">
	<div class="menu-top-right-pane">
<!-- 				<div id="showhide-pagelist-button" class="button-big-with-icon">
			<span><?php //echo $lang['PAGE_LIST'] ?></span>
		</div> -->
		<div id="size-and-position-container"></div>
		<div id="align-container"></div>
	</div>


	<div class="profile-box">

		<a id="close-project" href="../../app"></a>

		<div class="change-language">
			<span><?= $chosenLang ?></span>
			<p class="downarrow">▼</p>
			<ul id="languages-list">
				<li><span>pl</span></li>
				<li><span>en</span></li>
			</ul>
		</div>

		<a target="_blank" href="<?='http://' . $server_link?>/auth/login">
		<div class="registerforfree"><?=_lang('registerForFree')?></div>
		</a>

        <div id="view" title="<?=_lang('TOOLTIP_0057')?>" class=""><?=_lang("MENU_PREVIEW")?></div>
        <div class="online-working-status" status="online"></div>
	</div>
	

	<div id="menu-top-tabs" class="darkan-tabs">
		<ul>
			<li><a href="#menu-project" class="menu-controls-selected"><?=_lang('MENU_FILES')?></a></li>
            <li><a href="#menu-text"><?=_lang("MENU_TEXT")?></a></li>
			<li><a href="#menu-extras"><?=_lang('MENU_EXTRAS')?></a></li>
			<li><a href="#menu-help"><?=_lang('MENU_HELP')?></a></li>
		</ul>

		<div id="menu-project">
            <a class="button-big-with-icon topmenu-newpage" id="topmenu-add-new-page" title="<?=_lang('TOOLTIP_0023')?>">
            	<span><?=_lang('MENU_FILES_ADDCLEARPAGE') ?></span>
            </a>

            <div class="button-big-with-icon topmenu-import topmenu-expendable" id="topmenu-import" title="<?=_lang('TOOLTIP_0131')?>">
            	<span><?=_lang('MENU_IMPORT') ?></span>
                <div class="topmenu-expanded">
                    <a class="button-big-with-icon" id="topmenu-import-files"  title="<?=_lang('TOOLTIP_0024')?>">
                        <span><?=_lang('MENU_FILES_FILES'); ?></span>
                    </a>
                </div>
            </div>

            <div class="button-big-with-icon topmenu-export" id="topmenu-export-expendable" title="<?=_lang('TOOLTIP_0025')?>">
                <span><?=_lang('MENU_EXPORT') ?></span>
            </div>

            <div class="button-big-with-icon topmenu-project-version" title="<?=_lang('TOOLTIP_0084')?>">
                <span><?=_lang('MENU_SAVE_PROJECT') ?></span>
            </div>  

            <a class="button-big-with-icon topmenu-variables" id="topmenu-variables" title="<?=_lang('TOOLTIP_0143')?>">
                <span><?=_lang('MENU_VARIABLES') ?></span>
            </a>

            <a class="button-big-with-icon topmenu-publish" id="topmenu-publish-project" title="<?=_lang('TOOLTIP_0085')?>">
                <span><?=_lang('BANNER_TITLE') ?></span>
            </a>

			<!-- <a class="button-big-with-icon" id="topmenu-purge-project" title="<?//_lang('TOOLTIP_0026')?>">
				<span><?//_lang('MENU_DELETE_CLEARPROJECT') ?></span>
			</a> -->

			

		</div>


        <div id="menu-text">
            <div id="text-editor-image"></div>
        </div>


		<div id="menu-extras">
            <a class="button-big-with-icon" id="topmenu-extras-videosearch"><span><?=_lang('MENU_EXTRAS_VIDEO_SEARCH') ?></span></a>
            <a class="button-big-with-icon" id="topmenu-extras-imagesearch"><span><?=_lang('MENU_EXTRAS_IMAGE_SEARCH') ?></span></a>
			<a class="button-big-with-icon" id="topmenu-extras-db" id="extras-dropbox"><span><?=_lang('MENU_EXTRAS_DROPBOX') ?></span></a>
			<!--<a class="button-big-with-icon" id="topmenu-extras-fbphoto" id="extras-fbphoto"><span><?//_lang('MENU_EXTRAS_FACEBOOK') ?></span></a>-->
		</div>

		<div id="menu-help">
			<a class="button-big-with-icon" id="help-tutorial" title="">
				<span><?=_lang('MENU_HELP_TUTORIAL') ?></span>
			</a>
		</div>
	</div>
</script>