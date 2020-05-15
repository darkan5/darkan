<!DOCTYPE html>
<?php
    // require_once 'skins/skins.php';

    // require_once 'php/library_tags.php';
function get_data($url)
{
    $ch = curl_init();
    $timeout = 5;
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
$url = env('APP_IP_ADDRESS').'/';

$stylesImageFile = get_data($url.'js/editors/standard/css/styles_image.json');

$stylesTextFile = get_data($url.'js/editors/standard/css/styles_text.json');
$stylesGradientFile = get_data($url.'js/editors/standard/css/styles_gradient.json');
$stylesQuestionFile = get_data($url.'js/editors/standard/css/styles_question.json');
$stylesDndFile = get_data($url.'js/editors/standard/css/styles_dnd.json');
$stylesInputTextFile = get_data($url.'js/editors/standard/css/styles_inputtext.json');
//
//
//    $stylesImageFile = get_data(asset('/js/editors/standard/css/styles_image.json'), 0, null, null);
//    $stylesTextFile = get_data(asset('/js/editors/standard/css/styles_text.json'), 0, null, null);
//    $stylesGradientFile = get_data(asset('/js/editors/standard/css/styles_gradient.json'), 0, null, null);
//    $stylesQuestionFile = get_data(asset('/js/editors/standard/css/styles_question.json'), 0, null, null);
//    $stylesDndFile = get_data(asset('/js/editors/standard/css/styles_dnd.json'), 0, null, null);
//    $stylesInputTextFile = get_data(asset('/js/editors/standard/css/styles_inputtext.json'), 0, null, null);

?>

<html>
<head>
	<title>{{ $projectName }} - Darkan</title>
	<meta charset="utf-8">
	
	<meta name="_token" content="{{ csrf_token() }}">

    <meta property="og:url" content="{{ config('app.protocol') }}{{ config('app.domain') }}{{ config('app.folder') }}editor/<?= $projectID ?>" />
    <meta property="og:title" content="{{ $projectName }} - Darkan" />
    <meta property="og:description" content="<?=Lang::get('frontpage.PAGE_DESCRIPTION')?>"/>
    <meta property="description" content="<?=Lang::get('frontpage.PAGE_DESCRIPTION')?>"/>
    <meta property="fb:app_id" content="{{ env('FB_CLIENT_ID') }}"/>
    <meta property="og:image" content="{{ asset('/css/img/social_logos/fb_featured_image1.png') }}" />

    <meta property="og:image:width" content="470" /> 
    <meta property="og:image:height" content="246" />
    
    <script src="{{ asset('/public/messages.js') }}"></script>
    <script type="text/javascript">
	    <?php
	        if(Auth::check()){
	            $locale = Auth::user()->lang;
	        }elseif(Session::has('darkanlocale')){
	            $locale = Session::get('darkanlocale');
	        } else {
	        	$locale = config('app.locale');
	        }
	    ?>
    	Lang.setLocale('<?=$locale?>');
        var __lang = '<?=$locale?>';
    </script>

	<script type="text/javascript">

		var __meta__ = {
			domain: '<?= config('app.domain') ?>',
			projectID: '<?= $projectID ?>',
			userID: '<?= !Auth::check() ? "-1" : $user->id;?>',
			login: '<?= !$user->email ? "undefined" : $user->email;?>',
			loginHashed: '<?= !$user->email ? md5("undefined") : md5( $user->email);?>',
			APP_LINK: '<?= config('app.applink'); ?>',
			APP_URL: '<?= config('app.appurl'); ?>',
			app_folder: "<?= config('app.app_folder'); ?>",
			projects_link: "<?= config('app.projects_link'); ?>",
			publications_link: "<?= config('app.storagPublicationsLink'); ?>",
			content_link: "<?= config('app.contentLink'); ?>",
			content_subdomain_link: "http://<?= !$user->subdomain ? "undefined" : $user->subdomain;?>.<?=config('app.domain') . '/'; ?>",
			facebook_link: "<?= config('app.facebook_link'); ?>",
			serverLink: '<?=config('app.serverlink')?>',
			userSubdomain: '<?= !$user->subdomain ? "undefined" : $user->subdomain;?>',
			projectName: '<?=$projectName?>',
			projectDimentions: '<?=$dimentions?>',
			lang: '<?=config('app.locale')?>',
			external: <?=$external?>
		};


		var stylesImage = <?= $stylesImageFile ?>;
		var stylesText =<?= $stylesTextFile ?>;
		var stylesGradient = <?= $stylesGradientFile ?>;
		var stylesQuestion = <?= $stylesQuestionFile ?>;
		var stylesDnd = <?= $stylesDndFile ?>;
		var stylesInputText = <?= $stylesInputTextFile ?>;


// window.fbAsyncInit = function() {
//     FB.init({
//         appId: '163086357235990',
//         status: true,
//         cookie: true,
//         xfbml: true
//     });
// };
// (function(d, debug){var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];if   (d.getElementById(id)) {return;}js = d.createElement('script'); js.id = id; js.async = true;js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";ref.parentNode.insertBefore(js, ref);}(document, /*debug*/ false));
	</script>

    <link rel="shortcut icon" href="./images/favicon.png?r=<?php echo config('app.version') ?>" >

    <!--[if !IE]><!--><link rel="stylesheet" href="{{ asset('/js/editors/standard/content_template/css/fonts.css') }}?r=<?php echo config('app.version') ?>" /><!--<![endif]-->
    <!--[if IE]><!--><link rel="stylesheet" href="{{ asset('/js/editors/standard/content_template/css/fonts_ie.css') }}?r=<?php echo config('app.version') ?>" /><!--<![endif]-->


	<!-- <link rel="stylesheet" href="libs/jquery/jqueryui_styles.css?r=<?php //echo config('app.version') ?>" /> -->


   	<!-- ALL Styles -->
   	<?php //if (env('APP_ENV') == 'production'): ?>
   	<!-- <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/yui.css') }}?r=<?php //echo config('app.version') ?>" /> -->
   	<?php //else: ?>
   	<?php require_once base_path('/js/editors/standard/utilities/styles.templ'); ?>
	<?php //endif; ?>

    <script>
    var path_id = {
        <?php
            $json_content = '{"categories":{"0":{"id":"library-avatars","path":"avatars","name":{"pl":"Awatary","en":"Avatars"}},"1":{"id":"library-arrows","path":"arrows","name":{"pl":"Strza\u0142ki","en":"Arrows"}},"2":{"id":"library-clouds","path":"clouds","name":{"pl":"Chmury","en":"Clouds"}},"3":{"id":"library-shapes","path":"shapes","name":{"pl":"Kszta\u0142ty","en":"Shapes"}},"4":{"id":"library-images","path":"images","name":{"pl":"Obrazki","en":"Images"}},"5":{"id":"library-backgrounds","path":"backgrounds","name":{"pl":"T\u0142a","en":"Backgrounds"}},"6":{"id":"library-infographics","path":"infographics","name":{"pl":"Info grafki","en":"Infographics"}},"7":{"id":"library-items","path":"items","name":{"pl":"Przedmioty","en":"Items"}},"8":{"id":"library-icons","path":"icons","name":{"pl":"Ikony","en":"Icons"}},"9":{"id":"library-animals","path":"animals","name":{"pl":"Zwierz\u0119ta","en":"Animals"}},"10":{"id":"library-clothing","path":"clothing","name":{"pl":"Ubrania","en":"Clothing"}},"11":{"id":"library-electronics","path":"electronics","name":{"pl":"Elektronika","en":"Electronics"}},"12":{"id":"library-fantasy","path":"fantasy","name":{"pl":"Strza\u0142ki","en":"Arrows"}},"13":{"id":"library-flowers","path":"flowers","name":{"pl":"Kwiaty","en":"Flowers"}},"14":{"id":"library-food","path":"food","name":{"pl":"Jedzenie","en":"Food"}},"15":{"id":"library-fruits","path":"fruits","name":{"pl":"Owoce","en":"Fruits"}},"16":{"id":"library-insects","path":"insects","name":{"pl":"Owady","en":"Insects"}},"17":{"id":"library-misc","path":"misc","name":{"pl":"Misc","en":"Misc"}},"18":{"id":"library-nature","path":"nature","name":{"pl":"Natura","en":"Nature"}},"20":{"id":"library-people","path":"people","name":{"pl":"Ludzie","en":"People"}},"21":{"id":"library-sport","path":"sport","name":{"pl":"Sport","en":"Sport"}},"22":{"id":"library-tableware","path":"tableware","name":{"pl":"Kuchnia","en":"Tableware"}},"23":{"id":"library-technics","path":"technics","name":{"pl":"Technika","en":"Technics"}},"24":{"id":"library-transport","path":"transport","name":{"pl":"Transport","en":"Transport"}},"25":{"id":"library-vegetables","path":"vegetables","name":{"pl":"Warzywa","en":"Vegetables"}},"26":{"id":"library-weapons","path":"weapons","name":{"pl":"Bro\u0144","en":"Weapons"}}}}' ;

            $json_content = json_decode($json_content, true);

            $library_arr = $json_content['categories'];

            $count_library = count($library_arr);
            foreach ($library_arr as $key=>$value) {
                echo '\'' . $value['id'] . '\' : \'' . $value['path'] . '\'';
                if ($key == $count_library) {
                    echo "\n";
                } else {
                    echo ",\n";
                }
            }
        ?>
    };
    </script>



    <!-- SmartSupp Live Chat script -->
    <script type="text/javascript">
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = 'efea9853590a6e9d0b22c4747b098da33419944e';
    window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='//www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document);

	smartsupp('email', __meta__.login);
	smartsupp('name', __meta__.login);
	smartsupp('language', __meta__.lang);
	smartsupp('variables', {
	    userName: { label: 'User name ', value: __meta__.login },
	    projectPath: { label: 'Project path ', value: __meta__.userID + "/" + __meta__.projectID },
	    projectName: { label: 'Project name ', value: __meta__.projectName },
	    lang: { label: 'Lang ', value: __meta__.lang }
	});
	smartsupp('recording:disable', true);
    </script>
    

</head>
<body class="darkan-content">


	<!-- Google Tag Manager -->
	<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NHDLKV"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-NHDLKV');</script>
	<!-- End Google Tag Manager -->

	<div id="unexpected-error-modal" class="animated">
		<figure>
			<img src="{{ asset('/js/editors/standard/images/unexpected_error.png') }}" alt="Unexpected Error">
			<figcaption class="main"><?=Lang::get('editor.ERROR_OCCURED') ?></figcaption>
			<figcaption class="extra"><?=Lang::get('editor.ERROR_OCCURED_EXTRA') ?></figcaption>
			<figcaption class="extra">
				<button class="refresh-page-btn editor-settings-button" onClick="window.location.reload()">
					<i class="fa fa-refresh"></i> <?=Lang::get('editor.ERROR_OCCURED_REFRESH') ?>
				</button>
			</figcaption>
		</figure>
	</div>
	
	<div id="load-project-modal" class="animated">
		<figure>
			<img src="{{ asset('/js/editors/standard/img/social_logos/155x100.png') }}" alt="Darkan logo">
			<figcaption class="main"><?=Lang::get('editor.PROJECT_VERYFING_ACCESS') ?></figcaption>
			<figcaption class="extra"><?=Lang::get('editor.PROJECT_LOADING_EXTRA') ?></figcaption>
		</figure>
	</div>

	<script id="app-controller-template" type="text/template">
	
		<div id="restart-counter"></div>

		<div id="main-logo">
			<div class="logo"></div>
		</div>


		

		<!-- TOP MENU -->
		<div id="menu-top-wrapper">	
		</div><!-- END OF TOP MENU -->


		
		<!-- LEFT MENU -->
		<div id="menu-left-wrapper">
		</div><!-- END OF LEFT MENU -->

		<div id="projects-controller-wrapper"></div>

		


	</script>

	<script id="image-loader" type="text/template">
		<div class="image-loader-animation"></div>
    </script>		

	<script id="history-loader" type="text/template">
		<div class="history-loader-animation"></div>
    </script>

	<script id="toggle-button-item-view-template" type="text/template">
		&#9660;
    </script>

	<script id="timeline-editor-item-view-template" type="text/template">
		<div class="botmenu-timeline-rows-wrapper"></div>
		<div class="botmenu-timeline-editor-wrapper"></div>
    </script>

	<script id="editor-item-view-template" type="text/template">
		
    </script>

	<script id="open-editors-list-template" type="text/template">
		
    </script>

	<script id="editor-navigation-item-template" type="text/template">
		<div class="editor-navigation-name"><%=name%></div>
		<div class="editor-navigation-selector"></div>
	</script>

	<script id="#editors-controller-template" type="text/template">

	</script>

	<script id="editors-navigation-template" type="text/template">

	</script>

	<script id="editors-controller-template" type="text/template">
		<div class="editors-navigation-wrapper"></div>
		<div class="open-editors-list-wrapper"></div>
	</script>

	<script id="new-page-plus-button-template" type="text/template">
		+
	</script>


	<script id="projects-list-item-template" type="text/template">

		<div class="thumbnail visible">
			<div class="project-item-image-container">
					<img 
						src="<?=config('app.projects_thumb_link')?>/<%-project_id%>.jpg"
						onerror="this.onerror=null;this.src='<?=asset('/css/img/blank.png')?>'"
						>
			</div>
			<div class="caption">
				<h4 class="edit-project-name"><%-name%></h4>
			</div>
		</div>

    </script>

	<script id="projects-list-section-template" type="text/template">

		<div class="projects-list-search-wrapper">
	    	<input autofocus="" type="text" class="projects-list-search-input" placeholder="<?=Lang::get('utils.search')?>...">
	    	<span class="fa fa-times remove-search-value"></span>
	    </div>
		
    </script>

	<script id="project-view-plus-button-template" type="text/template">
    	<div title="<?=Lang::get('editor.PROJECT_NAVIGATION_PLUS_BUTTON_TITLE')?>">+</div>
    </script> 

	<script id="stage-template" type="text/template">
    	<div class="loaded-dropzone stage-loaded-dropzone"></div>
    </script>

    <script id="not-editable-stage-empty-template" type="text/template">
    	<div class="stage-view"></div>
    </script>

	<script id="stage-view-template" type="text/template">

		<div class="stage-view">
			<div class="loaded-dropzone stage-loaded-dropzone"></div>
		</div>

	</script>

	<script id="empty-stage-view-template" type="text/template">

		<div class="stage-view empty-stage-view">
			
		</div>

	</script>

	<script id="not-editable-page-item-template" type="text/template">

		<div class="page-thumb" style="background-image:url(<%=__meta__.projects_link%><%= options.userId %>/<%= options.projectId %>/pre/exported_view/<%= options.pageid %>/pagethumb.jpg?r=<%= new Date().getUTCMilliseconds() %>)"></div>
		<div class="page-counter">[<%= order %>]</div>
		<div class="page-label"><%- options.pagename %></div>
		<input type="checkbox" class="page-checkbox" <%= isSelected ? 'checked' : '' %> />
    </script>

    <script id="not-editable-pages-empty-list-template" type="text/template">

    	<div class="menu-right-toggle">
			<div class="toggle-icon">&#9658;</div>
		</div>

		<div class="pages-list-section">

    	
			<div class="pagelist-buttons-wrapper">
				<input type="button" class="pagelist-button second-pages-list-open-page" title="<?=Lang::get('editor.TOOLTIP_0132')?>">
			</div>

			<div class="pagelist-no-pages-wrapper">
				<?=Lang::get('editor.PAGES_LIST_NO_PAGES_IN_THIS_PROJECT')?>
			</div>

			<ul class="pages"></ul>

		</div>

    </script>

    <script id="not-editable-pages-list-template" type="text/template">

    	<div class="menu-right-toggle">
			<div class="toggle-icon">&#9658;</div>
		</div>
	
		<div class="pages-list-section">
    	
			<div class="pagelist-buttons-wrapper">
				<div class="pagelist-button select-all-pages" title="<?=Lang::get('editor.TOOLTIP_0068') ?>"></div>
				<input type="button" class="pagelist-button second-pages-list-copy-page" title="<?=Lang::get('editor.TOOLTIP_0071')?>">
				<input type="button" class="pagelist-button second-pages-list-open-page" title="<?=Lang::get('editor.TOOLTIP_0132')?>">
			</div>
			

			<ul class="pages"></ul>

		</div>

    </script>

	<script id="page-item-template" type="text/template">
		<div class="page-show <%= options.active == 0 ? 'page-hide' : '' %>" title="<?=Lang::get('editor.TOOLTIP_0105')?>"></div>
		<div class="page-sound <%= options.soundfilename !== '' ? 'page-sound-on' : '' %>" title="<?=Lang::get('editor.TOOLTIP_0106')?>"></div>
		<div class="page-notes <%- options.note !== '' ? 'page-notes-on' : '' %>" title="<?=Lang::get('editor.TOOLTIP_0107')?>"></div>
		<div class="page-thumb animated fadeInOpacityOnly" style="background-image:url(<?php echo config('app.projects_link'); ?><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= options.pageid %>/pagethumb.jpg?r=<%= new Date().getUTCMilliseconds() %>)"></div>
		<div class="dinamic-page-thumb-wrapper"></div>
		<div class="page-counter">[<%= order %>]</div>
		<div class="page-label"><%- options.pagename %></div>


		<div class="page-selected-by"></div>


		<input type="checkbox" class="page-checkbox" <%= isSelected ? 'checked' : '' %>>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="pages-empty-list-template" type="text/template">

    	<div class="menu-right-toggle">
			<div class="toggle-icon">&#9658;</div>
		</div>
    	
		<div class="pages-list-section">

			<div class="pagelist-no-pages-wrapper">
				<?=Lang::get('editor.PAGES_LIST_NO_PAGES_IN_THIS_PROJECT')?>
			</div>
    	
			<div class="pagelist-buttons-wrapper">
				<div class="pagelist-button new-page" title="<?=Lang::get('editor.TOOLTIP_0064') ?>"></div>
			</div>

			<ul class="pages pages-main-list"></ul>

		</div>

    </script>

	<script id="pages-list-template" type="text/template">

		<div class="menu-right-toggle">
			<div class="toggle-icon">&#9658;</div>
		</div>

	
		<div class="pages-list-section">
    	
			<div class="pagelist-buttons-wrapper">
				
				<div class="pagelist-button select-all-pages" title="<?=Lang::get('editor.TOOLTIP_0068') ?>"></div>
				<div class="pagelist-button visible-pages" title="<?=Lang::get("editor.TOOLTIP_0063") ?>"></div>
				<div class="pagelist-button new-page" title="<?=Lang::get('editor.TOOLTIP_0064') ?>"></div>
				<div class="pagelist-button copy-page" title="<?=Lang::get('editor.TOOLTIP_0065') ?>"></div>
				<div class="pagelist-button change-titles-pages" title="<?=Lang::get('editor.TOOLTIP_0066') ?>"></div>
				<div class="pagelist-button del-pages" title="<?=Lang::get('editor.TOOLTIP_0067') ?>"></div>
			</div>
			

			<ul class="pages pages-main-list"></ul>

		</div>

		

    </script>

    

    <script id="new-page-section-template" type="text/template">

    	<div class="window-content">

			<div class="left-side add-new-blank-page">
				<div class="starting-page-add-blank" uid="new">
					<div class="new-page-text">
						<?=Lang::get('editor.ADD_NEW_BLANK_PAGE')?>
					</div>
				</div>
				<div class="imports-wrapper">
					<button class="starting-page-import starting-page-import-psd btn btn-primary">
						<i class="fa fa-file-image-o"></i> Import PSD*
					</button>
					<button class="starting-page-import starting-page-import-pdf btn btn-success">
						<i class="fa fa-file-pdf-o"></i> Import PDF
					</button>
					<div class="plugin-required-info">
	                	*<?=Lang::get('editor.PSD_PLUGIN_NEED')?>
	                	<a href="<?php echo env('APP_PROTOCOL').env('APP_URL') ?>/downloads/DarkanExport.zip" download>
	                		<?=Lang::get('editor.PSD_PLUGIN_DOWNLOAD')?>.
	            		</a>
	            		<?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_1')?>
	                	<a href="<?=$photoshopBlogPost?>" target="_blank"><?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_2')?></a> <?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_3')?>
					</div>
				</div>
				
			</div>

			<div class="right-side">
	    		<% if(typeof templateCollection != 'undefined' || typeof shareTemplateCollection != 'undefined') { %>

					<% if (templateCollection.length) { %>
						<div class="title"><?=Lang::get('editor.TEMPLATE_MINE')?></div>
						<ul>
							<% _.each(templateCollection, function(item, i) { %>
								<li class="new-page-item-view new-page-item-select" item='<%= JSON.stringify( item ) %>' >
									<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
									<div class="pagename"><%= item.name %><div>
								</li>
							<% }); %>	
						</ul>
					<% } %>
					<% if (shareTemplateCollection.length) { %>
						<div class="title"><?=Lang::get('editor.TEMPLATE_SHARED')?></div>
						<ul>
							<% _.each(shareTemplateCollection, function(item, i) { %>
								<li class="new-page-item-view new-page-item-select" item='<%= JSON.stringify( item ) %>' >
									<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
									<div class="pagename"><%= item.name %><div>
								</li>
							<% }); %>	
						</ul>
					<% } %>
	    		<% } %>

	    		<% if(typeof detailsCollection != 'undefined') { %>

	    			<ul>
		    			<li class="template-li new-page-item-back" uid="new">
			    			<?=Lang::get('editor.BACK')?>
						</li>
					</ul>

					<hr>
					<ul>
						<% _.each(detailsCollection, function(item, i) {  %>
							<li class="new-page-item-view new-page-item-add" item='<%= JSON.stringify( item ) %>' >
								<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
							</li>
						<% }); %>	
					</ul>

	    		<% } %>
			</div>

			<div class="extras-icons">
				<a href="http://www.facebook.com/pages/Darkan/675324632508995?fref=ts" target="_blank">
					<div class="starting-page-icon facebook" title="<?=Lang::get('editor.WELCOMESCREEN_FB')?>"></div>
				</a>
				<a href="<?=$youTubeLink?>" target="_blank">
					<div class="starting-page-icon youtube" title="<?=Lang::get('editor.WELCOMESCREEN_YT')?>"></div>
				</a>
				<a href="https://darkan.eu/blog" target="_blank">
					<div class="starting-page-icon blog" title="<?=Lang::get('editor.WELCOMESCREEN_BLOG')?>"></div>
				</a>
			</div>	
		</div>	
    </script>

	<script id="open-projects-list-template" type="text/template">
		
    </script>

    <script id="not-editable-project-navigation-item-template" type="text/template">
		<div class="project-navigation-name"><%-name%></div>
		<div class="project-navigation-selector"></div>
		<div class="project-navigation-close-button">X</div>
    </script>

	<script id="project-navigation-item-template" type="text/template">
		<div class="project-navigation-name main-project-tab"><%-name%></div>
		<div class="project-navigation-selector"></div>
    </script>


    <script id="not-editable-project-view-template" type="text/template">

    	<div class="project-view-top-section">

			<div class="projects-list-container">
			</div>

			<div class="stage-view-container">
			</div>


			<div class="pages-list-wrapper pages-list-wrapper-other">
			</div>

		</div>
		    	
    </script>
	
	<script id="project-view-template" type="text/template">

		<div class="project-view-top-section">

			<div class="new-page-container">
			</div>

			<div class="stage-view-container">
			</div>


			<div class="pages-list-wrapper pages-list-wrapper-main">
			</div>

		</div>

		<div class="editors-view-container">
		</div>
		    	
    </script>

	<script id="projects-navigation-template" type="text/template">

    </script>

	<script id="projects-controller-template" type="text/template">
		<div class="projects-navigation-wrapper"></div>
		<div class="open-projects-list-wrapper"></div>
    </script>
	

	<script id="left-menu-template" type="text/template">
		<div id="menu-left-overlay"></div>
		<ul class="menu-left-toolbar-buttons">
			
		</ul>
    </script>

	<!-- WATCHER TEMPLETE -->
	<script id="project-watcher-template" type="text/template">
		<div class="project-watcher-wrapper">
			<div>List</div>
			<ul class="project-watcher-list"></ul>
		</div>
    </script>

    <script id="project-watcher-item-template" type="text/template">
		<div>Event: <%-event%></div>
    </script>

	<!-- HISTORY TEMPLETE -->
	<script id="history-list-template" type="text/template">
		<div class="toggle-icon toggle-history-list">&#9658;</div>
		<ul class="history-list-view"></ul>
    </script>

    <script id="history-item-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<ul class="history-list-params">
			<% _.each(params, function(val, key) { %>
            	<li>
            		<span><%=key%></span>
            		<span><%=val%></span>
            	</li>
        	<% }); %>
		</ul>
    </script>

    <script id="history-item-add-new-page-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<span>Page id: <%= params.pageId%></span>
		</div>
		<div class="history-list-params">
			<div class="history-new-page">N</div>
		</div>
    </script>

    <script id="history-item-delete-pages-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<% _.each(params.deletedPages, function(pageId) { %>
            	<div class="history-deleted-page">D</div>
        	<% }); %>
		</div>
    </script>

   <script id="history-item-update-page-options-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<span>Page id: <%= params.pageId%></span>
		</div>
		<div class="history-list-params">
			<div class="history-updated-page-options">U</div>
		</div>
    </script>

    <script id="history-item-update-page-sort-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<div class="history-updated-page-sort">S</div>
			<div class="history-updated-page-sort">S</div>
		</div>
    </script>

    <script id="history-item-update-project-options-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<div class="history-updated-project-options">U</div>
		</div>
    </script>

    

    <script id="history-item-update-components-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<span>Page id: <%= params.pageId%></span>
		</div>
		<div class="history-list-params">
        	<% _.each(params.components, function(component) { %>
            	<div class="ex-object" componenttype="<%=component.type%>"></div>
        	<% }); %>
		</div>
    </script>

    <script id="move-components-to-layer-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<span>Page id: <%= params.pageId%></span>
		</div>
		<div class="history-list-params">
			<div class="history-layer"></div>
        	<% _.each(params.components, function(component) { %>
            	<div class="ex-object" componenttype="<%=component.type%>"></div>
        	<% }); %>
		</div>
    </script>

    <script id="sort-rows-template" type="text/template">
    	<div class="history-list-params">
			<div>Id: <%= id%></div>
			<div>Action: <%= action%></div>
			<div>Date: <%= date%></div>
			<div>Login: <%= login%></div>
		</div>
		<div class="history-list-params">
			<span>Page id: <%= params.pageId%></span>
		</div>
		<div class="history-list-params">
			<div class="history-layer"></div>
			<div class="history-layer"></div>
		</div>
    </script>

    
    
	

	<script id="main-page-window-template" type="text/template">


    </script>

    <?php 
    	require_once base_path('/js/editors/standard/modules/menus/top_menu/templates/top_menu_template.templ');
    ?>


    <script id="leftmenu-template" type="text/template">
			<% switch(className) { case 'big-btn': %>
				<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em></em></a>
				
			  <% break; case 'big-btn extend': %>
					<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em></em><span class="ext-icon"></span></a>

					<ul class="menu-left-second-lvl">

					</ul>


			  <% break; case 'small-btn': %>
					<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em></em></a>

			  <% break; case 'separator': %>
			  		<li class="separator"></li>
			<% break; } %>

    </script>

    <script id="leftmenusubitem-template" type="text/template">
		<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em><%= prettyName %></em></a>
    </script>


     <script id="contextmenu-item-template" type="text/template">
     			<% switch(className) { case 'big-btn': %>
     			  <a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em></em><%= prettyName %></a>

     			  <% break; case 'big-btn extend': %>
     					<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em></em><span class="ext-icon"></span><%= prettyName %></a>

     					<ul class="context-menu-second-lvl">

     					</ul>


     			  <% break; case 'small-btn': %>
     					<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em></em></a>

     			  <% break; case 'separator': %>
     			  		<li class="separator"></li>
     			<% break; } %>

         </script>

    <script id="contextmenusubitem-template" type="text/template">
    		<a id="toolbar-<%= componentName %>" icon="<%= icon %>" title="<%= title %>" class="<%= className %>"><span></span><em><%= prettyName %></em></a>
        </script>

    <script id="context-menu-template" type="text/template"> 
    	
    </script>

    <script id="navigation-item-context-menu-template" type="text/template"> 

    </script>

    <script id="component-context-menu-template" type="text/template"> 

    </script>

    <script id="multi-component-context-menu-template" type="text/template"> 

    </script>

    <script id="stage-context-menu-template" type="text/template"> 

    </script>

    <script id="page-context-menu-template" type="text/template"> 

    </script>

    <script id="second_page-context-menu-template" type="text/template"> 

    </script>

    <script id="timeline-row-context-menu-template" type="text/template"> 

    </script>

    <script id="timeline-empty-row-context-menu-template" type="text/template"> 

    </script>

    <script id="qcl-context-menu-template" type="text/template"> 

    </script>
    

    

    <script id="popup-template" type="text/template"> 
    	<div>Popup</div>
    	<input type="button" class='window-close-button'>
    </script>

    <script id="standard-popup-template" type="text/template">
    	<div class="window-top-bar"><%=title%></div>
		<input type="button" class='window-close-button'>

		<div class="window-content with-buttons">
			<div class="popup-content"><%=content%></div>
		</div>
		<div class="popup-buttons-wrapper">
			<input type="button" class='popup-ok-button' value="<?=Lang::get('editor.TEXT_OK')?>">
			<input type="button" class='popup-cancel-button' value="<?=Lang::get('editor.TEXT_CANCEL')?>">
		</div>
    </script>

    <script id="error-popup-template" type="text/template">
    	<div class="window-top-bar"><%=title%></div>
		<input type="button" class='window-close-button'>

		<div class="window-content with-buttons">
			<div class="popup-content"><i class="fa fa-exclamation-triangle"></i> <%=content%></div>
		</div>
		<div class="popup-buttons-wrapper">
			<input type="button" class='popup-ok-button' value="<?=Lang::get('editor.TEXT_OK')?>">
		</div>
    </script>

    <script id="create-pdf-popup-template" type="text/template">
    	<div class="window-top-bar"><%=title%></div>
		<input type="button" class='window-close-button'>

		<div class="window-content with-buttons">
			<div class="popup-content"><%=content%></div>
		</div>
		<div class="popup-buttons-wrapper">
			<input type="button" class='popup-ok-button' value="<?=Lang::get('editor.PDF_POPUP_LETMECHOOSE')?>">
			<input type="button" class='popup-cancel-button' value="<?=Lang::get('editor.PDF_POPUP_CONVERTALL')?>">
		</div>
    </script>

    <script id="override-existing-publicatoin-popup-template" type="text/template">
    	<div class="window-top-bar"><%=title%></div>
		<input type="button" class='window-close-button'>

		<div class="window-content">
			<div class="popup-content">
				<ul class="publication-list"></div>
			</div>
		</div>
    </script>

    <script id="window-template" type="text/template"> 
    	<div>Window</div>
    	<input type="button" class='window-close-button'>
    </script>

    <script id="containereditorwindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.DND_EDIT_CONTAINER")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.DND_OPTIONS_GENERAL")?></legend>
    		<label>
    			<input type="checkbox" name="dropandhide" <%= componentModel.answers[containerActionkey].opts.dropandhide ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.dropandhide")?></span>
    			<%= typeof componentModel.answers[containerActionkey].opts.dropandhideAll !== 'undefined' ? '<div>##</div>' : '' %>
    		</label>
    		<label>
    			<input type="checkbox" name="onlygoodanswers" <%= componentModel.answers[containerActionkey].opts.onlygoodanswers ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.onlygoodanswers")?></span>
    			<%= typeof componentModel.answers[containerActionkey].opts.onlygoodanswersAll !== 'undefined' ? '<div>##</div>' : '' %>
    		</label>
    		<label>
    			<input type="checkbox" name="forcegoodsequence" <%= componentModel.answers[containerActionkey].opts.forceGoodSequence ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.forceGoodSequence")?></span>
    			<%= typeof componentModel.answers[containerActionkey].opts.forceGoodSequenceAll !== 'undefined' ? '<div>##</div>' : '' %>
    		</label>
    		<label>
    			<input type="checkbox" name="autoarrangeanswers" <%= componentModel.answers[containerActionkey].opts.autoArrangeAnswers ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.autoArrangeAnswers")?></span>
    			<%= typeof componentModel.answers[containerActionkey].opts.autoArrangeAnswersAll !== 'undefined' ? '<div>##</div>' : '' %>
    		</label>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.DND_OPTIONS_REVERTTYPE")?></legend>
    		<select class="dnd-afterbadanswer-select">
    			<option value="revertNone" <%= componentModel.answers[containerActionkey].opts.revertType === 'revertNone' ? 'selected' : '' %>><?=Lang::get("editor.revertNone")?></option>
    			<option value="revertOnlyBad" <%= componentModel.answers[containerActionkey].opts.revertType === 'revertOnlyBad' ? 'selected' : '' %>><?=Lang::get("editor.revertOnlyBad")?></option>
    			<option value="revertAll" <%= componentModel.answers[containerActionkey].opts.revertType === 'revertAll' ? 'selected' : '' %>><?=Lang::get("editor.revertAll")?></option>
    		</select>
    		<%= typeof componentModel.answers[containerActionkey].opts.revertTypeAll !== 'undefined' ? '<div>##</div>' : '' %>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.DND_OPTIONS_MAXANSWERS")?></legend>
    		<label>
    			<span><?=Lang::get("editor.DND_MAXANSWERS_COUNT")?></span>
    			<input name="maxanswers" type="number" value="<%= componentModel.answers[containerActionkey].opts.maxAnswers %>">
    		</label>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.DND_OPTIONS_ENOUGHANSWERS")?></legend>
    		<label>
    			<span><?=Lang::get("editor.DND_MAXANSWERS_COUNT")?></span>
    			<input name="enoughanswers" type="number" value="<%= componentModel.answers[containerActionkey].opts.enoughAnswers %>">
    		</label>
    	</fieldset>
    </script>

    <script id="dndoptionswindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.DND_EDIT_CONTAINER")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.DND_EDIT_ANSWERS")?></legend>
    		<!--<label>
    			<input name="mark-questions" type="checkbox" <%= markQuestions ? 'checked' : '' %>>
                <span><?=Lang::get('editor.QUIZ_MARK_QUESTIONS')?></span>  
            </label> -->
    		<label>
    			<input type="checkbox" name="revertobjects" <%= opts.revertObjects ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.revertObjects")?></span>
    		</label>
    		<label>
    			<input type="checkbox" name="feedbacks" <%= feedbackShow ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.feedbacks")?></span>
    		</label>
    		<label>
    			<input type="checkbox" name="disableongooddrop" <%= opts.disableOnGoodDrop ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.disableOnGoodDrop")?></span>
    		</label>
    	</fieldset>
    </script>

    <script id="crosswordsettingwindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.QCrossword_edit_title")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.QCrossword_answers")?></legend>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_force_answer_all_questions")?></span>
    			<input name="qcrossword-require-answers-to-all-questions" type="checkbox" <%= componentModel.requireAnswersToAllQuestions ? 'checked' : '' %>>
    		</label>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_min_answers_number")?></span>
    			<input name="qcrossword-min_answers_number" type="text" value="<%= componentModel.minAnswersNumber %>" <%= componentModel.requireAnswersToAllQuestions ? 'disabled' : '' %>>
    		</label>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCrossword_time")?></legend>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_time_limit")?></span>
    			<input name="qcrossword-time-limit-checkbox" type="checkbox" <%= componentModel.timeLimitOption ? 'checked' : '' %>>
    		</label>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_time_end_after")?></span>
    			<input name="qcrossword-time-out" type="text" value="<%= componentModel.qcrosswordTimeout %>" <%= componentModel.timeLimitOption ? '' : 'disabled' %>>
    		</label>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCrossword_colors")?></legend>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_option_color_single_cell")?></span>
    			<input name="qcrossword-colorize-good-answer" type="checkbox" <%= componentModel.colorizeGoodAnswer ? 'checked' : '' %>>
    		</label>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_option_color_single_answer")?></span>
    			<input name="qcrossword-colorize-good-word" type="checkbox" <%= componentModel.colorizeGoodWord ? 'checked' : '' %>>
    		</label>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_option_color_single_all_last_letter")?></span>
    			<input name="qcrossword-colorize-crossword-after-write-last-word" type="checkbox" <%= componentModel.colorizeCrosswordAfterWriteLastWord ? 'checked' : '' %>>
    		</label>
    	</fieldset>
    </script>

    <script id="quizwordsearchsettingwindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.Qwordsearch_navigation_options_title")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.Qwordsearch_table_source")?></legend>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_force_answer_all_questions")?></span>
    			<input name="wordsearch-require-answers-to-all-questions" type="checkbox" <%= componentModel.requireAnswersToAllQuestions ? 'checked' : '' %>>
    		</label>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_min_answers_number")?></span>
    			<input name="wordsearch-min_answers_number" type="text" value="<%= componentModel.minAnswersNumber %>" <%= componentModel.requireAnswersToAllQuestions ? 'disabled' : '' %>>
    		</label>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCrossword_time")?></legend>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_time_limit")?></span>
    			<input name="wordsearch-time-limit-checkbox" type="checkbox" <%= componentModel.timeLimitOption ? 'checked' : '' %>>
    		</label>
    		<label>
    			<span><?=Lang::get("editor.QCrossword_time_end_after")?></span>
    			<input name="wordsearch-time-out" type="text" value="<%= componentModel.wordSearchTimeOut %>" <%= componentModel.timeLimitOption ? '' : 'disabled' %>>
    		</label>
    	</fieldset>
    </script>

    <script id="qclconnectioneditorwindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.QCL_EDIT_OBJECT")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.QCL_LINE_WIDTH")?></legend>
			<input name="linewidth" type="number" value="<%= componentModel.objs[line].lineWidth %>">
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCL_CONNECTOR_SIZE")?></legend>
			<input name="size" type="number" value="<%= componentModel.objs[line].size %>">
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCL_MAX_CONNECTIONS")?></legend>
			<input name="maxconnections" type="number" value="<%= componentModel.objs[line].maxConnections %>">
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCL_CONNECTOT_POSITION")?></legend>
			<select class="qcl-option-align">
				<option value="None" <%= componentModel.objs[line].align === 'None' ? 'selected' : '' %>>...</option>
				<option value="TopCenter" <%= componentModel.objs[line].align === 'TopCenter' ? 'selected' : '' %>><?=Lang::get("editor.TopCenter")?></option>
				<option value="BottomCenter" <%= componentModel.objs[line].align === 'BottomCenter' ? 'selected' : '' %>><?=Lang::get("editor.BottomCenter")?></option>
				<option value="LeftMiddle" <%= componentModel.objs[line].align === 'LeftMiddle' ? 'selected' : '' %>><?=Lang::get("editor.LeftMiddle")?></option>
				<option value="RightMiddle" <%= componentModel.objs[line].align === 'RightMiddle' ? 'selected' : '' %>><?=Lang::get("editor.RightMiddle")?></option>
				<option value="Top" <%= componentModel.objs[line].align === 'Top' ? 'selected' : '' %>><?=Lang::get("editor.Top")?></option>
				<option value="Bottom" <%= componentModel.objs[line].align === 'Bottom' ? 'selected' : '' %>><?=Lang::get("editor.Bottom")?></option>
				<option value="Left" <%= componentModel.objs[line].align === 'Left' ? 'selected' : '' %>><?=Lang::get("editor.Left")?></option>
				<option value="Right" <%= componentModel.objs[line].align === 'Right' ? 'selected' : '' %>><?=Lang::get("editor.Right")?></option>
				<option value="Center" <%= componentModel.objs[line].align === 'Center' ? 'selected' : '' %>><?=Lang::get("editor.Center")?></option>
				<option value="TopRight" <%= componentModel.objs[line].align === 'TopRight' ? 'selected' : '' %>><?=Lang::get("editor.TopRight")?></option>
				<option value="BottomRight" <%= componentModel.objs[line].align === 'BottomRight' ? 'selected' : '' %>><?=Lang::get("editor.BottomRight")?></option>
				<option value="TopLeft" <%= componentModel.objs[line].align === 'TopLeft' ? 'selected' : '' %>><?=Lang::get("editor.TopLeft")?></option>
				<option value="BottomLeft" <%= componentModel.objs[line].align === 'BottomLeft' ? 'selected' : '' %>><?=Lang::get("editor.BottomLeft")?></option>
			</select>
    	</fieldset>
    	<fieldset>
    		<legend><?=Lang::get("editor.QCL_CONNECTION_COLOR")?></legend>
    		<div class="connection-color-picker"></div>
    	</fieldset>
    </script>

    <script id="qcloptionswindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.QCL_EDIT_ANSWERS")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.QCL_EDIT_ANSWERS")?></legend>
    		<label>
    			<input type="checkbox" name="feedbacks" <%= opts.feedbacks ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.feedbacks")?></span>
    		</label>
    		<label>
    			<input type="checkbox" name="onlysourcetarget" <%= opts.onlySourceTarget ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.QCL_ALLOW_CONNECTIONS")?></span>
    		</label>
    		<!--<label>
    			<input type="checkbox" name="allowbadanswer" <%= opts.allowBadAnswer ? 'checked' : '' %>>
    			<span><?=Lang::get("editor.QCL_ALLOW_BADASNWERS")?></span>
    		</label>-->
    		<label>
    			<span><?=Lang::get("editor.QCL_AFTER_BAD_ANSWER")?></span>
    			<select class="after-bad-answer">
    				<option value="donothing" <%= opts.afterBadAnswer === 'donothing' ? 'selected' : '' %>><?=Lang::get("editor.QCL_AFTER_BAD_ANSWER_DONOTHING")?></option>
    				<option value="removebad" <%= opts.afterBadAnswer === 'removebad' ? 'selected' : '' %>><?=Lang::get("editor.QCL_AFTER_BAD_ANSWER_REMOVEBAD")?></option>
    				<option value="removeall" <%= opts.afterBadAnswer === 'removeall' ? 'selected' : '' %>><?=Lang::get("editor.QCL_AFTER_BAD_ANSWER_REMOVEALL")?></option>
    			</select>
    		</label>
    	</fieldset>
    </script>

    <script id="page-name-window-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.W_CHANGE_PAGENAMES_TITLE")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    	<table>
    		<tr>
    			<td><?=Lang::get("editor.POPUT_CHANGE_TITLE_PAGE_NAME")?></td>
    			<td><input class="page-title-name-input" type="text"></td>
    		</tr>
    		<tr>
    			<td><?=Lang::get("editor.POPUT_CHANGE_TITLE_PAGE_NUMBERING")?></td>
    			<td><input class="page-title-numbering-checkbox" type="checkbox"></td>
    		</tr>
    		<tr>
    			<td><?=Lang::get("editor.POPUP_CHANGE_TITLE_PAGE_START")?></td>
    			<td><input class="page-title-numbering-input" type="number" value="1" disabled></td>
    		</tr>
    		<tr>
    			<td><?=Lang::get("editor.POPUP_CHANGE_TITLE_PAGE_POSITION")?></td>
    			<td>
    				<select class="page-title-numbering-position-select" type="checkbox" disabled>
    					<option value="start"><?=Lang::get("editor.POPUP_CHANGE_TITLES_BEFORE")?></option>
    					<option value="end"><?=Lang::get("editor.POPUP_CHANGE_TITLES_AFTER")?></option>
    				</select>
    			</td>
    		</tr>
    		<tr>
    			<td></td>
    			<td><div class="change-titles-pages-button editor-settings-button"><?=Lang::get("editor.POPUP_CHANGE_TITLES_CHANGE")?></div></td>
			</tr>
    	</table>
    	</fieldset>
    </script>

    <script id="window-quiz-fillinblanks-options-view-template" type="text/template">
    	<input type="button" class="window-close-button">

    	<div class="ex-elements-box-wrapper margin010 maxwidth300">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_GOODANSWERS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<input type="text" class="quizfillinblanks-goodanswers" value=""/>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="delete-pages-window-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.W_CHANGE_DELPAGES_TITLE")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<div class="warning-header"><?=Lang::get("editor.W_CHANGE_DELPAGES_TODEL")?></div>
    		<div class="pages-to-delete-number"><%= pagesToDel %></div>
    		<div class="delete-page-confirm editor-settings-button redbutton"><?=Lang::get("editor.MENU_DELETE_FILE")?></div>
    	</fieldset>
    </script>

    <script id="window-modal-template" type="text/template"> 

    	<div class="window-wrapper">
    		<div class="window-top-bar">Window</div>
    		<input type="button" class='window-close-button'>
    		<div>Crete new page</div>
	    	<div>
				<input type="button" class="window-close-button">
				<div class="window-modal-create-new-project"></div>
			<div>
    	</div>

    	
    </script>


    <script id="window-projectoptions-template" type="text/template"> 
		<div class="window-top-bar"><?=Lang::get("editor.W_PROJECT_OPTIONS_TITLE")?></div>
		<input type="button" class='window-close-button'>

		<div class="window-content">
			<div id="window-content-tabs" class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#projectoptions-global" class="menu-controls-selected"><?=Lang::get("editor.MENU_FILES")?></a></li>
	                <li><a href="#projectoptions-skin"><?=Lang::get("editor.MENU_SKIN")?></a></li>
					<li><a href="#projectoptions-drawpages"><?=Lang::get("editor.MENU_DRAWPAGES")?></a></li>
					<li><a href="#projectoptions-toc"><?=Lang::get("editor.MENU_TOC")?></a></li>
					<li><a href="#projectoptions-scorm"><?=Lang::get("editor.MENU_SCORM")?></a></li>
				</ul>

				<div id="projectoptions-global">
					<fieldset class="menu-options-group">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_LEGEND_JUMPGRID') ?></legend>
	                    <label for="move-grid" ><?=Lang::get('editor.MENU_OPTIONS_GRIDMOVE') ?></label>
	                    <input type="number" min="0" max="1000" id="move-grid" value="1" title="<?=Lang::get('editor.TOOLTIP_0033') ?>" />
	                    <label for="copy-grid" ><?=Lang::get('editor.MENU_OPTIONS_GRIDCOPY') ?></label>
	                    <input type="number" min="0" max="1000" id="copy-grid" value="60" title="<?=Lang::get('editor.TOOLTIP_0034') ?>" />
	                    <div class="clearer"></div>
	                    <label for="draggable-snaptolerance" ><?=Lang::get('editor.MENU_OPTIONS_DRAGGABLESNAPTOLERANCE') ?></label>
	                    <input type="number" min="0" max="1000" id="draggable-snaptolerance" value="10" title="<?=Lang::get('editor.TOOLTIP_0035') ?>" />
	                </fieldset>

	                <fieldset class="menu-options-group menu-options-group-select-area">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_SELECT') ?></legend>
	                    <label for="select-area" ><?=Lang::get('editor.MENU_OPTIONS_SELECT_AREA') ?></label>
	                    <input type="checkbox" id="select-area" />
	                </fieldset>

	                <fieldset class="menu-options-group menu-options-group-convert-sound-to-ogg">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_CONVERT_SOUND') ?></legend>
	                    <label for="convert-sound-to-ogg" ><?=Lang::get('editor.MENU_OPTIONS_CONVERT_SOUND_TO_OGG') ?></label>
	                    <input type="checkbox" id="convert-sound-to-ogg" />
	                </fieldset>

	                <fieldset class="menu-options-group menu-options-group-orginal-images">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_ORGINAL_IMAGES') ?></legend>
	                    <label for="orginal-images" ><?=Lang::get('editor.MENU_OPTIONS_ORGINAL_IMAGES_CONVERT') ?></label>
	                    <input type="checkbox" id="orginal-images" />
	                </fieldset>

	                <fieldset class="menu-options-group menu-options-group-loader">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_LOAD_EVERY_IMAGE_AT_START_LEGEND') ?></legend>
	                    <label for="load-every-page-at-start" ><?=Lang::get('editor.MENU_OPTIONS_LOAD_EVERY_IMAGE_AT_START') ?></label>
	                    <input type="checkbox" id="load-every-page-at-start" />
	                </fieldset>

	                <fieldset class="menu-options-group menu-options-group-loader">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_LOAD_EVERY_SOUND_AT_START_LEGEND') ?></legend>
	                    <label for="load-every-sound-at-start" ><?=Lang::get('editor.MENU_OPTIONS_LOAD_EVERY_SOUND_AT_START') ?></label>
	                    <input type="checkbox" id="load-every-sound-at-start" />
	                </fieldset>

	                <fieldset class="menu-options-group">
	                    <legend><?=Lang::get('editor.MENU_SCALE') ?></legend>
	                    <label for="enable-auto-scale-project"><?=Lang::get('editor.MENU_OPTIONS_ENABLE_SCALE') ?></label>
	                    <input type="checkbox" id="enable-auto-scale-project" />
	                </fieldset>

				</div>

				<div id="projectoptions-skin">
	                <fieldset class="menu-options-quality menu-options-group" title="<?=Lang::get('editor.TOOLTIP_0028') ?>">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_QUALITY_IMAGE') ?></legend>
	                    <label for="image-quality"><?=Lang::get('editor.MENU_OPTIONS_QUALITY') ?></label>
	                    <input type="number" min="1" max="100" class="image-quality" value="100" />
	                </fieldset>

	                <fieldset class="menu-options-quality menu-options-group" title="<?=Lang::get('editor.TOOLTIP_0029') ?>">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_TITLE_FIELDSET') ?></legend>
	                    <label for="show-titles"><?=Lang::get('editor.MENU_OPTIONS_SHOW_TITLE') ?></label>
	                    <input type="checkbox" id="show-titles" />
	                    <div>
	                        <label for="show-help-title"><?=Lang::get('editor.MENU_SKIN_TITLE') ?></label>
	                        <input type="input" id="show-help-title" maxlength="40" />
	                    </div>
	                </fieldset>
	                <fieldset class="menu-options-quality menu-options-group menu-options-group-sound" title="<?=Lang::get('editor.TOOLTIP_0030') ?>">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_TITLE_SOUND') ?></legend>
	                    <label for="sound-vol-val"><?=Lang::get('editor.MENU_OPTIONS_SOUND_LOOP') ?></label>
	                    <input type="checkbox" id="sound-loop-val" />
	                    <input id="sound-vol-val" type="range" min="0" max="100" value="100" />
	                </fieldset>

	                <fieldset class="menu-options-quality menu-options-group menu-options-group-dimensions" title="<?=Lang::get('editor.TOOLTIP_0030') ?>">
	                    <legend><?=Lang::get('editor.MENU_OPTIONS_TITLE_KEEP_RIGARD_DIMENSIONS') ?></legend>
	                    <div>
		                    <label><?=Lang::get('editor.MENU_OPTIONS_KEEP_RIGARD_DIMENSIONS') ?>
		                    	<input type="checkbox" id="keep-rigid-dimensions-of-the-project" />
		                    </label>
		                </div>
	                    
	                    <div>
		                    <label><?=Lang::get('editor.MENU_OPTIONS_KEEP_RIGARD_DIMENSIONS_WIDTH') ?>
		                    	<input id="settings-project-width" type="number" min="0" />
		                    </label>
	                    </div>

	                    <div>
		                    <label><?=Lang::get('editor.MENU_OPTIONS_KEEP_RIGARD_DIMENSIONS_HEIGHT') ?>
		                    	<input id="settings-project-height" type="number" min="0" />
		                    </label>
	                    </div>
	                    
	                </fieldset>
				</div>

				<div id="projectoptions-drawpages">

				</div>

				<div id="projectoptions-toc">
	                <fieldset class="menu-options-group">
	                    <legend><?=Lang::get('editor.MENU_TOC') ?></legend>
	                    <label for="enabletocbtn"><?=Lang::get('editor.MENU_OPTIONS_ENABLE_TOC') ?></label>
	                    <input type="checkbox" id="enabletocbtn" />
	                </fieldset>
				</div>

				<div id="projectoptions-scorm">

					<div>
						<div class="ex-elements-box-wrapper margin010">
				    		<div class="ex-elements-box">
				    			<div class="ex-elements-box-header">
				    				<span><?=Lang::get('editor.AFTER_LOAD_SCORM') ?></span>
				    			</div>
				    			<div class="ex-elements-box-list">
									<div class="form-radio-options">
										<table>
							                <tbody>
							                	<tr>
								                    <td><label for="lessonLocationNavigation_0"><?=Lang::get('editor.LESSON_LOCATION_NAVIGATION_0') ?></label></td>
								                    <td><input class="margin010" type="radio" id="lessonLocationNavigation_0" name="lessonLocationNavigation" value="0" /></td>
								                </tr>
								                <tr>
								                    <td><label for="lessonLocationNavigation_1"><?=Lang::get('editor.LESSON_LOCATION_NAVIGATION_1') ?></label></td>
								                    <td><input class="margin010" type="radio" id="lessonLocationNavigation_1" name="lessonLocationNavigation" value="1" /></td>
								                </tr>
								                <tr>
								                    <td><label for="lessonLocationNavigation_2"><?=Lang::get('editor.LESSON_LOCATION_NAVIGATION_2') ?></label></td>
								                    <td><input class="margin010" type="radio" id="lessonLocationNavigation_2" name="lessonLocationNavigation" value="2" /></td>
								                </tr>
							            	</tbody>
							            </table>
							        </div>
				    			</div>
				    		</div>
				    	</div>

			    	</div>

			    	<div>
				    	<div class="ex-elements-box-wrapper margin010">
				    		<div class="ex-elements-box">
				    			<div class="ex-elements-box-header">
				    				<span><?=Lang::get('editor.AFTER_LOAD_SCORM_POPAP') ?></span>
				    			</div>
				    			<div class="ex-elements-box-list">
									<div class="form-radio-options">
										<table>
							                <tbody>
							                	<tr>
								                    <td><label for="useLessonLocationDefaultPopupDescription"><?=Lang::get('editor.USE_LOCATION_POPUP_DEFAULT_DESCRIPTION') ?></td>
								                    <td><input class="margin010" type="checkbox" id="useLessonLocationDefaultPopupDescription" name="useLessonLocationDefaultPopupDescription"/></td>
								                </tr>
								                <tr>
								                    <td><label for="lessonLocationPopupDescription"><?=Lang::get('editor.LESSON_LOCATION_POPUP_DESCRIPTION') ?></td>
								                    <td><textarea class="margin010" rows="5" cols="50" id="lessonLocationPopupDescription" name="lessonLocationPopupDescription" value="" /></textarea></td>
								                </tr>

								                <tr>
								                    <td><label for="useLessonLocationDefaultPopupTitle"><?=Lang::get('editor.USE_LOCATION_POPUP_DEFAULT_TITLE') ?></td>
								                    <td><input class="margin010" type="checkbox" id="useLessonLocationDefaultPopupTitle" name="useLessonLocationDefaultPopupTitle"/></td>
								                </tr>
								                <tr>
								                    <td><label for="lessonLocationPopupTitle"><?=Lang::get('editor.LESSON_LOCATION_POPUP_TITLE') ?></td>
								                    <td><textarea class="margin010" rows="5" cols="50" id="lessonLocationPopupTitle" name="lessonLocationPopupTitle" value="" /></textarea></td>
								                </tr>
							            	</tbody>
							            </table>
							        </div>
				    			</div>
				    		</div>
				    	</div>
			    	</div>

			    	<div>
				    	<div class="ex-elements-box-wrapper margin010">
				    		<div class="ex-elements-box">
				    			<div class="ex-elements-box-header">
				    				<span><?=Lang::get('editor.AFTER_LOAD_SCORM_BUTTONS') ?></span>
				    			</div>
				    			<div class="ex-elements-box-list">
									<div class="form-radio-options">
										<table>
							                <tbody>
							                	<tr>
								                    <td><label for="showLessonLocationCloseButtonPopup"><?=Lang::get('editor.SHOW_LESSON_LOCATION_CLOSE_BUTTON_POPUP') ?></td>
								                    <td><input class="margin010" type="checkbox" id="showLessonLocationCloseButtonPopup" name="showLessonLocationCloseButtonPopup" /></td>
								                </tr>
							            	</tbody>
							            </table>
							        </div>
				    			</div>
				    		</div>
				    	</div>
			    	</div>

				</div>
			</div>
		</div>
    </script>

    <script id="projectoptions-drawpages-template" type="text/tempalte">
    	<div class="drawpages-header">
        	<?=Lang::get('editor.PROJECTOPTIONS_DRAWPAGES_HEADER')?>
        </div>

        <div class="drawpages-body">
            <div class="drawpages-main-options">
                <div class="drawpages-add-new-draw"> <?=Lang::get('editor.PROJECTOPTIONS_DRAWPAGES_ADDNEW')?> </div>
            </div>
            
            <div class="drawpages-pages-list-wrapper">
                <div class="drawpages-body-header">
                    <?=Lang::get('editor.PROJECTOPTIONS_DRAWPAGES_BODY_HEADER')?>
                </div>
                <ul class="drawpages-pages-list">

                </ul>
                <div class="drawpages-pages-list-options">
                    <div class="drawpages-pages-list-selectall drawpages-pages-list-option"><?=Lang::get('editor.PROJECTOPTIONS_DRAWPAGES_OPTION_SELECTALL')?></div>
                    <div class="drawpages-pages-list-deselectall drawpages-pages-list-option"><?=Lang::get('editor.PROJECTOPTIONS_DRAWPAGES_OPTION_DESELECTALL')?></div>
                </div>
            </div>
            <div class="drawpages-draws-wrapper"></div>
    	</div>
    </script>


    <script id="projectoptions-drawpages-singlepage-template" type="text/template"> 
	   <div class="drawpages-thumb-wrapper">
	      <div class="drawpages-thumb-item" style="text-align: center; background-image:url(<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= options.pageid %>/pagethumb.jpg)"></div>
	   </div>
	   <div class="drawpages-pagename-wrapper">
	      <div class="drawpages-pagename-item"><%-options.pagename%></div>
	   </div>
	   <div class="drawpages-counter-wrapper"><%=order+1%></div>
    </script>


    <script id="projectoptions-drawpages-singledraw-template" type="text/template"> 
		<div class="drawpages-singledraw-wrapper">
		   <div class="drawpages-singledraw-header"><?=Lang::get('editor.DRAWPAGES_DRAWTITLE')?></div>
		   <div class="drawpages-singledraw-list">
		      <ul class="drawpages-singledraw-list-ul">
		      	<% if (!pagesToDraw.length) { %>
		      		<div class="drawpages-emptycontainer-info"><?=Lang::get('editor.DRAWPAGES_DRAWINFO')?></div>
	      		<% } %>
		      </ul>
		   </div>
		   <div class="drawpages-singledraw-delete">X</div>
		   <div class="drawpages-optionswrapper">
		      <div class="drawpages-deleteselectedfromdraw"><?=Lang::get('editor.DRAWPAGES_REMOVESELECTED')?></div>
		      <label class="drawpages-amounttodraw"><?=Lang::get('editor.DRAWPAGES_AMOUNTTODRAW')?> <input class="drawpages-amounttodrawinput" type="number" min="0" value="<%=opts.amountToDraw%>"></label>
		   </div>
		</div>
    </script>


    <script id="window-images-template" type="text/template"> 
		<div class="window-top-bar"><?=Lang::get('editor.ADD_IMAGE_HEADER') ?></div>
		<input type="button" class='window-close-button'>

		<div class="window-content">
			<div id="window-content-tabs" class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#image-window-upload" class="menu-controls-selected"><?=Lang::get('editor.IMAGE_MENU_UPLOAD') ?></a></li>
	                <li><a href="#image-window-link"><?=Lang::get('editor.IMAGE_MENU_FROM_URL') ?></a></li>
					<li><a href="#image-window-search"><?=Lang::get('editor.IMAGE_MENU_SEARCH') ?></a></li>
				</ul>

				<div id="image-window-upload">
					<div class="drop-image-area">
				    	<div class="progress-bar">
				    		<div class="progress-bar-text"></div>
				    		<div class="progress-bar-inner-wrapper">
								<div class="progress-bar-inner"></div>
				    		</div>
				    	</div>
						<button class="upload"><?=Lang::get('editor.IMAGE_BODY_BODY_FILE_BUTTON') ?></button>
						<span class="extra-info"><?=Lang::get('editor.DROP_ELEMENT_INFO_IMAGE') ?></span>
						<div class="loaded-dropzone"></div>
					</div>
				</div>

				<div id="image-window-link">
					<div class="image-window-link-wrapper">
						<input class="image-window-link-input image-window-text-input" type="text" placeholder="<?=Lang::get('editor.IMAGE_MENU_FROM_URL') ?>">
						<button class="upload-from-link editor-settings-button">OK</button>
					</div>
				</div>
				<div id="image-window-search">
					<input class="image-window-search-input image-window-text-input" type="text" placeholder="<?=Lang::get('editor.IMAGE_SEARCH_PLACEHOLDER') ?>">
					<div class="image-window-search-results">
						<img src="../js/editors/standard/images/sprites/search_image.png" class="our-integrations-images">
					</div>
				</div>
			</div>
		</div>
    </script>

    <script id="window-function-not-available-testdrive-template" type="text/template"> 
		<div class="window-top-bar"><i class="fa fa-times-circle text-danger fa-2x not-available-icon"></i> <?=Lang::get('editor.FN_NOT_AVAIL_HEADER_TESTDRIVE') ?></div>
		<input type="button" class='window-close-button'>

		<div class="window-content test-drive-fn-window-content">
			<p class="margin20">
				<?=Lang::get('editor.FN_NOT_AVAIL_CONTENT_TESTDRIVE') ?>
			</p>
			<p class="margin20">
				<?=Lang::get('editor.FN_NOT_AVAIL_CONTENT_TESTDRIVE2') ?>
			</p>

			<p>
				<a target="_blank" href="{{ url('/auth/register/') }}" class="btn signupbutton btn-success">
					<?=Lang::get('editor.REGISTER_YOURSELF')?>
				</a>
			</p>


		</div>

    </script>

    <script id="window-function-not-available-template" type="text/template"> 
		<div class="window-top-bar"><i class="fa fa-times-circle text-danger fa-2x not-available-icon"></i> <?=Lang::get('editor.FN_NOT_AVAIL_HEADER') ?></div>
		<input type="button" class='window-close-button'>

		<div class="window-content">
			<p><?=Lang::get('editor.FN_NOT_AVAIL_CONTENT') ?></p>

			<p>
				<a target="_blank" href="{{ url('/pricing/') }}" class="btn goprobutton btn-success">
					<?=Lang::get('editor.BUY_BETTER_PLAN')?>
				</a>
			</p>


			<legend><?=Lang::get('editor.YOUR_PLANS')?></legend>

			<p>
		        <table class="plans-table table table-responsive table-hover dataTable no-footer">
		            <thead>
						<th><?=Lang::get('editor.MY_PLANS_NAME') ?></th>
						<th><?=Lang::get('editor.MY_PLANS_ACTIVE') ?></th>
					</thead>
					<tbody>
						{!! $userPlansHtml !!}
					</tbody>
				</table>
			</p>
		</div>

    </script>

    <script id="window-test-drive-template" type="text/template"> 
		<div class="window-top-bar">
			<?=Lang::get('editor.TEST_DRIVE_HEADER') ?>
		</div>

		<div class="window-content">

			<div class="test-drive-container">

					<h1 class="test-drive-header"><?=Lang::get('editor.TEST_DRIVE_L1') ?></h1>
					<hr/>
					<h3><?=Lang::get('editor.TEST_DRIVE_L2') ?></h3>
					<h3><?=Lang::get('editor.TEST_DRIVE_L3') ?></h3>

				<form class="test-drive-form">

					<div class="input-text">
						<input type="email" placeholder="<?=Lang::get('editor.BANNER_TAGSTEXT')?>" class="test-drive-email-input" required />
						<input type="submit" class="test-drive-submit" value="<?=Lang::get('editor.TEST_DRIVE_BUTTON_SUBMIT_TITLE') ?>"/>
					</div>
					<div class="error-feedback text-error"></div>
				</form>
			<div>
		</div>
		<div class="clear"></div>

		<div class="extras-icons">
			<a href="http://www.facebook.com/pages/Darkan/675324632508995?fref=ts" target="_blank">
				<div class="starting-page-icon facebook" title="<?=Lang::get('editor.WELCOMESCREEN_FB')?>"></div>
			</a>
			<a href="<?=$youTubeLink?>" target="_blank">
				<div class="starting-page-icon youtube" title="<?=Lang::get('editor.WELCOMESCREEN_YT')?>"></div>
			</a>
			<a href="https://darkan.eu/blog" target="_blank">
				<div class="starting-page-icon blog" title="<?=Lang::get('editor.WELCOMESCREEN_BLOG')?>"></div>
			</a>
		</div>

    </script>

    <script id="window-timer-template" type="text/template"> 
    	<div class="window-top-bar timer-window-top-bar"><?=Lang::get('editor.TIMER_WINDOW_TITLE') ?></div>
		<div class="window-content">

			<div class="timer-window-container" title="<?=Lang::get('editor.TIMER_WINDOW_TOOLTIP') ?>">

				<span name="time"></span>

			<div>
		</div>
    </script>

    <script id="window-project-version-template" type="text/template"> 
		<div class="window-top-bar"><?=Lang::get('editor.PVERSION_PTITLE') ?></div>
		<input type="button" class='window-close-button'>

		<div class="window-content">
			<div><?=Lang::get('editor.PVERSION_PCOMMENT') ?></div>
			<textarea class="project-version-description-input" maxlength="500"></textarea>
			<div class="project-version-button-new editor-settings-button"><?=Lang::get('editor.PVERSION_PSAVE') ?></div>
			<div class="project-version-list-container"></div>
		</div>
    </script>

    <script id="window-video-template" type="text/template"> 
		<div class="window-top-bar"><?=Lang::get('editor.MENU_POINT_ADDVIDEO') ?></div>
		<input type="button" class='window-close-button'>

		<div class="window-content">
			<div id="window-content-tabs" class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#video-window-upload" class="menu-controls-selected"><?=Lang::get('editor.IMAGE_MENU_UPLOAD') ?></a></li>
	                <li><a href="#video-window-yt"><?=Lang::get('editor.MENU_EXTRAS_YOUTUBE') ?></a></li>
					<li><a href="#video-window-vimeo"><?=Lang::get('editor.MENU_EXTRAS_VIMEO') ?></a></li>
				</ul>

				<div id="video-window-upload">
					<div class="drop-video-area">
				    	<div class="progress-bar">
				    		<div class="progress-bar-text"></div>
				    		<div class="progress-bar-inner-wrapper">
								<div class="progress-bar-inner"></div>
				    		</div>
				    	</div>
						<button class="upload"><?=Lang::get('editor.IMAGE_BODY_BODY_FILE_BUTTON') ?></button>
						<span class="extra-info"><?=Lang::get('editor.DROP_ELEMENT_INFO') ?></span>
						<div class="loaded-dropzone"></div>
					</div>
				</div>

				<div id="video-window-yt">
					<input class="video-window-youtube-search-input video-window-text-input" type="text" placeholder="<?=Lang::get('editor.IMAGE_SEARCH_PLACEHOLDER') ?>">
					<div class="video-window-youtube-search-results video-window-search-results">
						<img src="../js/editors/standard/images/sprites/search_youtube.png" class="our-integrations-images">
					</div>
				</div>
				<div id="video-window-vimeo">
					<input class="video-window-vimeo-search-input video-window-text-input" type="text" placeholder="<?=Lang::get('editor.IMAGE_SEARCH_PLACEHOLDER') ?>">
					<div class="video-window-vimeo-search-results video-window-search-results">
						<img src="../js/editors/standard/images/sprites/search_vimeo.png" class="our-integrations-images">
					</div>
				</div>
			</div>
		</div>
    </script>

    <script id="window-export-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.MENU_EXPORT') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
			<div class="export-window-list">
                <div class="export-scorm export-item">
                    <div class="export-scorm-image export-image"></div>
                    <span class="title">SCORM</span>
                </div>
                <div class="export-zip export-item">
                    <div class="export-zip-image export-image"></div>
                    <span class="title">HTML5</span>
                </div>
                <div class="export-pdf export-item">
                    <div class="export-pdf-image export-image"></div>
                    <span class="title">PDF</span>
                </div>
            </div>
    	</div>
    </script>

    <script id="window-export-html5-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.EXPORT_HTML_TITLE') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
	    	<div class="export-options-wrapper">
				<button class="editor-settings-button generate-package-button"><?=Lang::get('editor.EXPORT_GENERATE_PACKAGE')?></button>
			</div>
    	</div>
    </script>

    <script id="window-export-pdf-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.EXPORTTOPDF_TITLE') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
    		<div class="pdf-pages-list-wrapper"></div>
    	</div>
    </script>

    <script id="window-export-pdf-list-template" type="text/template">
    	<ul class="export-pdf-list"></ul>
    	<div class="export-pdf-buttons">
    		<button class="generate">Eksportuj</button>
    		<button class="clearmessages">Czyść opisy</button>
    		<label class="botoptionslbl">
                Zaznacz wszystkie strony <input class="checkall" type="checkbox" checked="">
            </label>
			<label class="botoptionslbl">
                Zaznacz wszystkie opisy <input class="checkallinfo" type="checkbox" checked="">
            </label>

    		<label class="botoptionslbl">
                Poziomy układ <input class="checklandscape" type="checkbox" checked="">
            </label>
    	<div>
    </script>

    <script id="window-export-pdf-item-template" type="text/template">
		<div class="pagethumb" style="background-image:url()"></div>
		<input class="select-page" type="checkbox" checked>
		<label class="page-note-label">
			<input class="page-note-checkbox" type="checkbox" checked="">Opisy
		</label>
		<textarea class="page-note"><%= note %></textarea>
    </script>

    <script id="window-export-scorm-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.EXPORTTOSCORM_TITLE') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
	    	<div class="export-scorm-options-wrapper">
	    		<div class="title"><?=Lang::get('editor.EXPORT_PACKAGE_NAME')?></div>
	    		<input type="text" class="package-name" placeholder="<?=Lang::get('editor.POPUP_SAVETOSCORM_PLACEHOLDER')?>">

	    		<div class="title"><?=Lang::get('editor.POPUP_SAVETOSCORM_SCORM_VERSION')?>
		    		<select class="export-scorm-version">
		    			<option value="12">Scorm 1.2</option>
		    			<option value="2004">Scorm 2004</option>
		    		</select>
		    	</div>
		    	<fieldset class="options-score">
                    <legend><?=Lang::get('editor.EDIT_PROJECT_SCORE') ?></legend>
                    <div class="row options-score-section">    
                    </div>
                </fieldset>

				<button class="editor-settings-button generate-package-button"><?=Lang::get('editor.EXPORT_GENERATE_PACKAGE')?></button>
			</div>
    	</div>
    </script>


    <script id="window-share-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.SHARE_PROJECT_HEAD') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
			<div class="share-project-text">
                <p><?=Lang::get('editor.SHARE_PROJECT_INFO') ?></p>
                <div class="share-project-div">
                    <input type="email" class="user-email-share-project" required="" placeholder="<?=Lang::get('editor.SHARE_PROJECT_PLACEHOLDER') ?>">
                    <button class="submit-share-project"><?=Lang::get('editor.AUTH_SHARE_SHARE') ?></button>
                </div>
                
                <hr/>

                <div class="share-project-users-wrapper">
                	<div class="share-project-users-header"><?=Lang::get('editor.SHARE_PROJECT_USERLIST_HEADER')?></div>
	                <ul class="share-project-users">
	                <% if (!_.isEmpty(usersList)) { %>
		                <% _.each(usersList, function(val, key) { %>
		                	<li class="shared-user-row" exists="<%= val.exists ? '1' : '0' %>" id="<%= val.id %>">
		                		<div class="photo" style="background-image:url(<% if(val.photo && val.photo != 'default'){%> <%=val.photo%> <%} else {%> <?='http://' . config('app.serverlink')?>/assets/img/profile.png <% } %>)"></div>
		                		<div class="username"><%= key %></div>
		                		<div class="delete-sharing"></div>
		                	</li>
		            	<% }); %>
	                <% } else { %>
	                	<div class="share-project-users-noshares"><?=Lang::get('editor.SHARE_PROJECT_USERLIST_EMPTY')?></div>
	            	<% } %>
	                </ul>
                </div>
            </div>
    	</div>
    </script>

    <script id="window-share-noexsistuser-template" type="text/template">
		<div class="header"><?=Lang::get('editor.SHARE_PROJECT_NOEXIST_POPUP_CONTENT1')?></div>
		<hr/>
		<div class="message-title"><?=Lang::get('editor.SHARE_PROJECT_NOEXIST_POPUP_EMAIL_TITLE')?></div>
		<textarea class="edit-email"><?=Lang::get('editor.SHARE_PROJECT_NOEXIST_POPUP_EMAIL_CONTENT')?> <a href="{{ url('/auth/register/') }}"><?=Lang::get('editor.REGISTER_YOURSELF')?>!</a></textarea>
    </script>


    <script id="window-import-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.MENU_IMPORT') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
			<div class="import-window-list">
                <!--<div class="import-images import-item">
                    <div class="import-images-image import-image"></div>
                    <span class="title"><?php//_lang('IMPORT_GRAPHICS') ?></span>
                </div>-->
                <div class="import-pdf import-item">
                    <div class="import-pdf-image import-image"></div>
                    <span class="title">PDF</span>
                </div>
                <div class="import-psd import-item">
                    <div class="import-psd-image import-image"></div>
                    <span class="title">PSD</span>
                    <div class="extras">
                    	<?=Lang::get('editor.PSD_PLUGIN_NEED')?>
                    	<a href="https://darkan.eu/downloads/DarkanExport.zip" download>
                    		<?=Lang::get('editor.PSD_PLUGIN_DOWNLOAD')?>
                		</a>
            		</div>
                </div>
            </div>
            <div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
    	</div>
    </script>


    <script id="window-newpage-template" type="text/template">

    	<div class="window-top-bar"><?=Lang::get('editor.MENU_FILES_ADDCLEARPAGE') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">

			<div class="left-side add-new-blank-page">
				<div class="starting-page-add-blank" uid="new">
					<div class="new-page-text">
						<?=Lang::get('editor.ADD_NEW_BLANK_PAGE')?>
					</div>
				</div>
				<div class="imports-wrapper">
					<button class="starting-page-import starting-page-import-psd btn btn-primary">
						<i class="fa fa-file-image-o"></i> Import PSD*
					</button>
					<button class="starting-page-import starting-page-import-pdf btn btn-success">
						<i class="fa fa-file-pdf-o"></i> Import PDF
					</button>
					<div class="plugin-required-info">
	                	*<?=Lang::get('editor.PSD_PLUGIN_NEED')?>
	                	<a href="https://darkan.eu/downloads/DarkanExport.zip" download>
	                		<?=Lang::get('editor.PSD_PLUGIN_DOWNLOAD')?>.
	            		</a>
	            		<?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_1')?>
	                	<a href="<?=$photoshopBlogPost?>" target="_blank"><?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_2')?></a> <?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_3')?>
					</div>
				</div>
				
			</div>

			<div class="right-side">
	    		<% if(typeof templateCollection != 'undefined' || typeof shareTemplateCollection != 'undefined') { %>

					<% if (templateCollection.length) { %>
						<div class="title"><?=Lang::get('editor.TEMPLATE_MINE')?></div>
						<ul>
							<% _.each(templateCollection, function(item, i) { %>
								<li class="new-page-item-view new-page-item-select" item='<%= JSON.stringify( item ) %>' >
									<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
									<div class="pagename"><%= item.name %><div>
								</li>
							<% }); %>	
						</ul>
					<% } %>
					<% if (shareTemplateCollection.length) { %>
						<div class="title"><?=Lang::get('editor.TEMPLATE_SHARED')?></div>
						<ul>
							<% _.each(shareTemplateCollection, function(item, i) { %>
								<li class="new-page-item-view new-page-item-select" item='<%= JSON.stringify( item ) %>' >
									<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
									<div class="pagename"><%= item.name %><div>
								</li>
							<% }); %>	
						</ul>
					<% } %>
	    		<% } %>

	    		<% if(typeof detailsCollection != 'undefined') { %>

	    			<ul>
		    			<li class="template-li new-page-item-back" uid="new">
			    			<?=Lang::get('editor.BACK')?>
						</li>
					</ul>

					<hr>
					<ul>
						<% _.each(detailsCollection, function(item, i) {  %>
							<li class="new-page-item-view new-page-item-add" item='<%= JSON.stringify( item ) %>' >
								<img class="new-page-item-image-thumb" src="<%= item.src %>"/>

							</li>
						<% }); %>	
					</ul>

	    		<% } %>
    		</div>

    		<div class="extras-icons">
				<a href="http://www.facebook.com/pages/Darkan/675324632508995?fref=ts" target="_blank">
    				<div class="starting-page-icon facebook" title="<?=Lang::get('editor.WELCOMESCREEN_FB')?>"></div>
    			</a>
    			<a href="<?=$youTubeLink?>" target="_blank">
    				<div class="starting-page-icon youtube" title="<?=Lang::get('editor.WELCOMESCREEN_YT')?>"></div>
    			</a>
    			<a href="https://darkan.eu/blog" target="_blank">
    				<div class="starting-page-icon blog" title="<?=Lang::get('editor.WELCOMESCREEN_BLOG')?>"></div>
    			</a>
    		</div>

    		

    </script>

    <script id="window-add-multi-components-template" type="text/template">

    	<div class="window-top-bar"></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
    		<div>
    			<textarea placeholder="<?=Lang::get('editor.ADD_MULTI_TEXT_COMPONENTS') ?>" class="add-multi-components-input-values" type="text"></textarea>
    		</div>

			<label>
	            W: 
	            <input class="component-width" type="number" step="1" value="150" />
            </label>
			

			<label>
	            H: 
	            <input class="component-height" type="number" step="1" value="50" />
            </label>

            <input type="button" value="Ok" class="trigger-add-button add-multi-components-ok-button">
    			
		</div>	

    </script>



    <script id="window-starting-newpage-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.WELCOME_TEXT') ?></div>
    	<div class="window-content">

			<div class="left-side add-new-blank-page">
				<div class="starting-page-add-blank" uid="new">
					<div class="new-page-text">
						<?=Lang::get('editor.ADD_NEW_BLANK_PAGE')?>
					</div>
				</div>
				<div class="imports-wrapper">
					<button class="starting-page-import starting-page-import-psd btn btn-primary">
						<i class="fa fa-file-image-o"></i> Import PSD*
					</button>
					<button class="starting-page-import starting-page-import-pdf btn btn-success">
						<i class="fa fa-file-pdf-o"></i> Import PDF
					</button>
					<div class="plugin-required-info">
	                	*<?=Lang::get('editor.PSD_PLUGIN_NEED')?>
	                	<a href="<?php echo env('APP_PROTOCOL').env('APP_URL') ?>/downloads/DarkanExport.zip" download>
	                		<?=Lang::get('editor.PSD_PLUGIN_DOWNLOAD')?>.
	            		</a>
	            		<?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_1')?>
	                	<a href="<?=$photoshopBlogPost?>" target="_blank"><?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_2')?></a> <?=Lang::get('editor.PSD_PLUGIN_TUTORIAL_3')?>
					</div>
				</div>
				
			</div>

			<div class="right-side">
	    		<% if(typeof templateCollection != 'undefined' || typeof shareTemplateCollection != 'undefined') { %>

					<% if (templateCollection.length) { %>
						<div class="title"><?=Lang::get('editor.TEMPLATE_MINE')?></div>
						<ul>
							<% _.each(templateCollection, function(item, i) { %>
								<li class="new-page-item-view new-page-item-select" item='<%= JSON.stringify( item ) %>' >
									<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
									<div class="pagename"><%= item.name %><div>
								</li>
							<% }); %>	
						</ul>
					<% } %>
					<% if (shareTemplateCollection.length) { %>
						<div class="title"><?=Lang::get('editor.TEMPLATE_SHARED')?></div>
						<ul>
							<% _.each(shareTemplateCollection, function(item, i) { %>
								<li class="new-page-item-view new-page-item-select" item='<%= JSON.stringify( item ) %>' >
									<img class="new-page-item-image-thumb" src="<%= item.src %>"/>
									<div class="pagename"><%= item.name %><div>
								</li>
							<% }); %>	
						</ul>
					<% } %>
	    		<% } %>

	    		<% if(typeof detailsCollection != 'undefined') { %>

	    			<ul>
		    			<li class="template-li new-page-item-back" uid="new">
			    			<?=Lang::get('editor.BACK')?>
						</li>
					</ul>

					<hr>
					<ul>
						<% _.each(detailsCollection, function(item, i) {  %>
							<li class="new-page-item-view new-page-item-add" item='<%= JSON.stringify( item ) %>' >
								<img class="new-page-item-image-thumb" src="<%= item.src %>"/>

							</li>
						<% }); %>	
					</ul>

	    		<% } %>
    		</div>

    		<div class="extras-icons">
				<a href="http://www.facebook.com/pages/Darkan/675324632508995?fref=ts" target="_blank">
    				<div class="starting-page-icon facebook" title="<?=Lang::get('editor.WELCOMESCREEN_FB')?>"></div>
    			</a>
    			<a href="<?=$youTubeLink?>" target="_blank">
    				<div class="starting-page-icon youtube" title="<?=Lang::get('editor.WELCOMESCREEN_YT')?>"></div>
    			</a>
    			<a href="https://darkan.eu/blog" target="_blank">
    				<div class="starting-page-icon blog" title="<?=Lang::get('editor.WELCOMESCREEN_BLOG')?>"></div>
    			</a>
    		</div>

    </script>




    


    <script id="window-preview-template" type="text/template"> 
		<div class="view-overlay">
			<div class="view-overlay-showskins"><span>&rsaquo; <br/> <?=Lang::get('editor.SKINS_TITLE') ?></span></div>
			
			<div class="view-overlay-content-wrapper">
				<div class="view-publish-buttons-wrapper">
					<div class="view-publish-buttons">
						<div class="view-overlay-banners banners"><?=Lang::get('editor.MENU_PUBLISH') ?></div>
                        <div class="openexportwindow"><?=Lang::get('editor.MENU_EXPORT') ?></div>
                        <div class="linktoblankpreview"><a target="_blank"><?=Lang::get('editor.PUBLISH_MENU_DIRECTLINK') ?></a></div>
					</div>
				</div>
				<div class="view-overlay-content">
					<iframe 
						webkitallowfullscreen="" 
						mozallowfullscreen="" 
						allowfullscreen="" 
						style="visibility: visible;" 
						onload="this.style.visibility = 'visible';" 
						class="view-content" 
						width="100%" 
						height="100%" 
						frameborder="0" 
						src="">
					</iframe>
				</div>
			</div>
			
			
			<div class="view-overlay-skins">
				<div class="skins-title"><?=Lang::get('editor.TEMPLATE_CHOOSER_TITLE') ?></div>
                    {!! $skinsList !!}
			</div>
			
			<div class="view-overlay-close">X</div>
		</div>
    	<input type="button" class='window-close-button'>
    </script>

    <script id="window-photopea-template" type="text/template"> 
		<div class="photopea-view-overlay">
			<div class="photopea-view-overlay-content-wrapper">
				<div class="photopea-view-publish-buttons-wrapper">
					<div class="photopea-view-publish-buttons">
						<div class="photopea-save-image"><?=Lang::get('editor.MENU_PHOTOPEA_SAVE') ?></div>
                        <div class="photopea-close"><?=Lang::get('editor.MENU_PHOTOPEA_CLOSE') ?></div>
					</div>
				</div>
				<div class="view-overlay-content">
					<iframe class="photopea-iframe"
						webkitallowfullscreen="" 
						mozallowfullscreen="" 
						allowfullscreen="" 
						style="visibility: visible;" 
						onload="this.style.visibility = 'visible';" 
						class="view-content" 
						width="100%" 
						height="100%" 
						frameborder="0" 
						src="">
					</iframe>
				</div>
			</div>
			
		</div>
    	<input type="button" class='window-close-button'>
    </script>

    <script id="window-publish-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.MENU_PUBLISH') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
			<div class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#publish-window-new-wrapper" class="menu-controls-selected"><?=Lang::get('editor.MENU_PUBLISH') ?></a></li>
	                <li><a href="#publish-window-list"><?=Lang::get('editor.BANNER_LIST') ?></a></li>
	                	<div><a href="<?=url('/lms')?>" target="_blank" class="open-lms-btn"><i class="fa fa-line-chart fa-fw"></i> <?=Lang::get("editor.MENU_LMS")?></a></div>
				</ul>

				<div id="publish-window-new-wrapper">
					<div class="publish-window-new">

						<fieldset class="name-and-description">
	                        <legend><?=Lang::get('editor.BANNER_NEW_TITLE') ?></legend>

	                    	<div class="title"><?=Lang::get('editor.BANNER_PLACEHOLDER_NAME') ?></div>
	                    	<div class="input-text"><input class="edit-project-title-input" placeholder="<?=Lang::get('editor.BANNER_ENTERNAME') ?>" type="text" maxlength="100"></div>
	                        
	                        <div class="clear"></div>

	                        <div class="title"><?=Lang::get('editor.BANNER_PLACEHOLDER_DESCRIPTION') ?></div>
	                        <div class="input-text"><textarea placeholder="<?=Lang::get('editor.BANNER_ENTERDESC') ?>" class="edit-project-desc-input" type="text" maxlength="300"></textarea></div>
	                        
	                    </fieldset>


	                    <!--<fieldset class="options">
	                    	<legend><?=Lang::get('editor.DND_OPTIONS_CONTAINER') ?></legend>

	                        <label>
		                        <?=Lang::get('editor.EDIT_PROJECT_ZOOM') ?>
		                        <input type="checkbox" class="edit-zoom-checkbox" checked="">
	                        </label>
	                        
	                        <label>
	                        	<?=Lang::get('editor.EDIT_PROJECT_SHARE') ?>
	                        	<input type="checkbox" class="edit-share-checkbox" checked="">
	                        </label>
	                        
	                        <div class="clear"></div>

	                        <label>
		                        <?=Lang::get('editor.EDIT_PROJECT_FULLSCREEN') ?>
		                        <input type="checkbox" class="edit-fullscreen-checkbox" checked="">
	                        </label>
	                        
	                        <label>
		                        <?=Lang::get('editor.EDIT_PROJECT_RESETPROGRESS') ?>
		                        <input type="checkbox" class="edit-reset-checkbox" checked="">
	                        </label>
	                        
	                        <div class="clear"></div>

	                        <label>
		                        <?=Lang::get('editor.BANNER_ADD_SOURCES') ?>
		                        <input type="checkbox" class="edit-join-source">
	                        </label>
	                    </fieldset>-->

	                    <fieldset class="options-score">
	                        <legend><?=Lang::get('editor.EDIT_PROJECT_SCORE') ?></legend>
	                        <div class="row options-score-section">    
	                        </div>
	                    </fieldset>    

						<fieldset class="options-icon">
	                        <legend><?=Lang::get('editor.EDIT_PROJECT_ICON') ?></legend>
	                        <div class="row">
	                            <div class="edit-project-icon-preview" style="">
	                            	<div class="progress-bar">
						    		<div class="progress-bar-text"></div>
						    		<div class="progress-bar-inner-wrapper">
										<div class="progress-bar-inner"></div>
						    		</div>
						    	</div>
						    	<div class="loaded-dropzone"></div>

	                            </div>

	                        	<button class="upload"><?=Lang::get('editor.EDIT_PROJECT_ICON_CHANGE') ?></button>
	                        </div>
	                        <div class="row">
	                            <label><?=Lang::get('editor.EDIT_PROJECT_THUMB_PAGE') ?></label>
	                            <select class="banner-page-thumb-select">
	                            </select>
	                        </div>
	                    </fieldset>

	                    
					</div>

                    <div class="publish-buttons">
	                    <div class="publish-button publish-as-new"><?=Lang::get('editor.BANNER_ASNEW') ?></div>
	                    <div class="publish-button override"><?=Lang::get('editor.BANNER_CHANGE') ?></div>
                    </div>

                    <div class="window-inner-modal">
                    	<div class="window-inner-modal-text"><?=Lang::get('editor.BANNER_NEWPUBLICATION_LOADING')?></div>
                    </div>
				</div>

				<div id="publish-window-list">
					
				</div>
			</div>
    	</div>
    </script>

    <script id="publish-project-list-template" type="text/template">
    	<div class="search">
    		<input class="published-projects-search" type="text" placeholder="<?=Lang::get('editor.BANNER_SEARCH')?>">
    	</div>
    	<ul class="publish-project-list"></ul>
    </script>

    <script id="publish-project-item-template" type="text/template">
    	<div class="published-project-block">
    		<div class="sortable-handle"><%=ord%></div>
			<div class="published-project-thumb-wrapper">
    			<div class="published-project-thumb toedit" style="background-image: url('<%=thumb%>')">
	    			<div class="progress-bar">
			    		<div class="progress-bar-text"></div>
			    		<div class="progress-bar-inner-wrapper">
							<div class="progress-bar-inner"></div>
			    		</div>
				    </div>
			    </div>
			</div>
			<div class="published-project-name-and-description">
				<div class="published-project-name">
					<div class="name-value toedit"><%=name%></div>
					<input class="name-edit" type="text">
				</div>
				<div class="published-project-description">
					<div class="description-value toedit"><%=summary%></div>
					<textarea class="description-edit"><%=summary%></textarea>
				</div>
			</div>

			<div class="fa fa-envelope fa-2x project-mailing tooltip-ready" title="<?=Lang::get('editor.OPEN_MAILING_ADMIN_PANEL')?>"></div>

			<div class="fa fa-play-circle fa-2x open-in-new-tab tooltip-ready" title="<?=Lang::get('editor.TOOLBAR_OPEN_SECOND_PROJECT')?>"></div>
			<div class="fa fa-facebook-square fa-2x facebook-share tooltip-ready" title="<?=Lang::get('editor.FACEBOOK_SHARE')?>"></div>

			<div class="published-project-options">
				<div class="publish-option project-visible <%if (active) { %>visible<% }else{ %>notvisible<% } %>" title="<?=Lang::get('editor.HIDE_PUBLICATION_TOOLTIP')?>"></div>
				<div class="project-links publish-option" title="<?=Lang::get('editor.PUBLICATION_SHARE_BTN')?>"></div>
				<div class="project-delete publish-option" title="<?=Lang::get('editor.PUBLICATION_DELETE_BTN')?>"></div>
			</div>
    	</div>
    </script>

    <script id="publish-project-item-tooverride-template" type="text/template">
    	<div class="published-project-block">
			<div class="published-project-thumb-wrapper">
    			<div class="published-project-thumb" style="background-image: url(<%=thumb%>?r=<%= Math.floor((Math.random() * 100000) + 1) %>)"></div>
			</div>
			<div class="published-project-name-and-description">
				<div class="published-project-name">
					<div class="name-value"><%=name%></div>
				</div>
				<div class="published-project-description">
					<div class="description-value"><%=summary%></div>
				</div>
				<div class="override-publication-button redbutton"><?=Lang::get('editor.BANNER_CHANGE')?></div>
			</div>
    	</div>
    </script>



    <script id="window-mailing-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.BANNER_MAILING') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
			<div class="column1">
			    <fieldset>
			        <legend><?=Lang::get('editor.BANNER_MAILING_USERSTOSEND')?></legend>
			        <input class="banner-mailing-userstosend" type="text">
			    </fieldset>
			    <fieldset>
			        <legend><?=Lang::get('editor.MENU_REPORT_CAT_MESSAGE')?></legend>
			        <input class="banner-mailing-title" type="text" placeholder="<?=Lang::get('editor.BANNER_MAILING_MAILTITLE')?>">
			        <textarea class="banner-mailing-message"></textarea>
			    </fieldset>
			</div>
			<div class="column2">
			    <div class="open-dstats">D-STATS</div>
			    <div class="darkan-tabs">
			        <ul class="groupsusers-ul">
			            <li><a href="#groupsusers-groups"><?=Lang::get('editor.BANNER_MAILING_GROUPS')?></a></li>
			            <li><a href="#groupsusers-users"><?=Lang::get('editor.BANNER_MAILING_USERS')?></a></li>
			        </ul>
			        <div id="groupsusers-groups">
			            <ul>
			            </ul>
			        </div>
			        <div id="groupsusers-users">
			            <ul>
			            </ul>
			        </div>
			    </div>
			</div>
    	</div>
		<div class="publish-buttons">
		    <div class="banner-send"><?=Lang::get('editor.BANNER_MAILING_BUTTON')?></div>
		</div>
        <div class="window-inner-modal">
        	<div class="window-inner-modal-text"><?=Lang::get('editor.BANNER_MAILING_LOADING')?></div>
        </div>
    </script>

    <script id="window-publication-options-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.BANNER_OPTIONSWINDOW_TITLE') ?> - <%=name%></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
            <fieldset class="options">
                <label>
                    <?=Lang::get('editor.EDIT_PROJECT_ZOOM') ?>
                    <input type="checkbox" class="edit-zoom-checkbox">
                </label>
                
                <label>
                	<?=Lang::get('editor.EDIT_PROJECT_SHARE') ?>
                	<input type="checkbox" class="edit-share-checkbox">
                </label>
                
                <div class="clear"></div>

                <label>
                    <?=Lang::get('editor.EDIT_PROJECT_FULLSCREEN') ?>
                    <input type="checkbox" class="edit-fullscreen-checkbox">
                </label>
                
                <label>
                    <?=Lang::get('editor.EDIT_PROJECT_RESETPROGRESS') ?>
                    <input type="checkbox" class="edit-reset-checkbox">
                </label>
            </fieldset>
		</div>
	</script>

    <script id="window-publication-sharing-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.BANNER_SHARE_TITLE') ?> - <%=name%></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">

        	<div class="social-share sharing-block">
        		<div class="header"><?=Lang::get('editor.BANNER_SHARE_TITLE_2') ?></div>
	        	<div class="fb-share share-social-icon">
	        		<img src="../js/editors/standard/images/social/fb.png">
	        	</div>
	        	<div class="gp-share share-social-icon">
	        		<img src="../js/editors/standard/images/social/gp.png">
	        	</div>
	    		<div class="twitter-share share-social-icon">
	    			<img src="../js/editors/standard/images/social/twitter.png">
	        	</div>
        	</div>

        	<hr/>

        	<div class="links-share sharing-block">
            	<div class="header"><?=Lang::get('editor.BANNER_SHARE_LINKS_TITLE') ?></div>

            	<table>
            		<tr>
            			<td class="title"><?=Lang::get('editor.BANNER_DIRECTLINK') ?></td>
            			<td class="input"><input type="text" class="share-link-direct share-link-input"></td>
            			<td class="options"><div class="external-link-direct external-link-icon"></div></td>
            		</tr>
            		<tr>
            			<td class="title"><?=Lang::get('editor.BANNER_PORTALLINK') ?></td>
            			<td class="input"><input type="text" class="share-link-portal share-link-input"></td>
            			<td class="options"><div class="external-link-portal external-link-icon"></div></td>
            		</tr>
            		<tr>
            			<td class="title"><?=Lang::get('editor.BANNER_EMBEDLINK') ?></td>
            			<td class="input"><input type="text" class="share-link-iframe share-link-input"></td>
            			<td class="options"></td>
            		</tr>
            	</table>
        	</div>
		</div>
	</script>

    <script id="window-library-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.MEDIALIBRARY_TITLE') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">
			<div class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#library-search" class="menu-controls-selected"><?=Lang::get('editor.IMAGE_MENU_SEARCH') ?></a></li>
                    <?php
                        foreach ($library_arr as $key=>$value) {
                            echo '<li><a href="#' . $value['id'] . '">' . $value['name'][config('app.locale')] . '</a></li>' . "\n";
                        }
                    ?>
				</ul>

				<div id="library-search">
                    <div>
                        <select class="library-search-select" multiple data-placeholder="<?=Lang::get('editor.SEARCH') ?>">
                            {!! $libraryTags !!}
                        </select>
                    </div>
                    <div class="library-search-content">
                        <img src="../js/editors/standard/images/libraryemptycontent_<?php echo config('app.locale') ?>.png">
                    </div>
				</div>

                <?php
                    foreach ($library_arr as $key=>$value) {
                        echo '<div id="' . $value['id'] . '"></div>' . "\n";
                    }
                ?>
			</div>
    	</div>
    </script>

    <script id="data-picker-template" type="text/template">
    	<div class="data-picker-wrapper">
	    	<div class="data-picker-info-main"><?=Lang::get('editor.TRIGGER_DIALOGINFO')?></div>
	    	<div class="data-picker-info-extras"><?=Lang::get('editor.TRIGGER_DIALOGINFO_EXTRAS')?></div>
    	</div>
    </script>

    <script id="data-picker-selector-template" type="text/template"> 
    	<div class="data-picker-selector"></div>
    </script>

    <script id="data-picker-selector-position-template" type="text/template"> 
    	<div class="data-picker-position-selector"></div>
    </script>

    <script id="window-animation-template" type="text/template"> 
    	<div class="window-top-bar"><%= title %></div>
		<input type="button" class='window-close-button'>
		
		<div class="animation-time-wrapper">
			<?=Lang::get('editor.ANIMATION_WINDOW_ANIMTIME')?>:
			<input class="animation-time" type="number" step="0.1" max="100" min="0.1" >
		</div>
		<div class="animation-block animation-block-none" value="none"><?=Lang::get('editor.ANIMATION_NONE')?></div>

		<div class="animation-wrapper">
			<% var iterator = 0; %>
			<% _.each(animations, function(animationType, i) { %>
				<fieldset>
					<legend><%= i %></legend>
					<% _.each(animationType, function(animation, j) { %>
						<div 
							rel="tooltip" 
							data-animation="true" 
							data-placement="<% if (iterator < 2) { %>bottom<% } else { %>top<% } %>" 
							class="animation-block" 
							data-original-title="<div class='animation-preview animatedloop <%= animation.value %>'></div>" 
							value="<%= animation.value %>"><%= animation.name %></div>
					<% }); %>
					<% iterator++; %>
				</fieldset>
			<% }); %>	
    	</div>
    </script>

    <script id="window-baizer-template" type="text/template"> 
    	<div class="window-top-bar"><%= title %></div>
		<input type="button" class='window-close-button'>

		<div class="baizer-wrapper">
			<canvas class="baizer-curve" width="200" height="450" style="cursor: pointer"></canvas>
    	</div>

    	<div class="baizer-axis-time"><?=Lang::get('editor.BAIZER_AXIS_TIME')?></div>
        <div class="baizer-axis-animation"><?=Lang::get('editor.BAIZER_AXIS_ANIMATION')?></div>

    </script>

    <script id="window-add-new-page-progress-template" type="text/template"> 
		<div class="add-new-page-progress-wrapper">
			<input type="button" class="add-new-page-progress-cancel" value="<?=Lang::get('editor.TEXT_CANCEL')?>"/>
			<div class="add-new-page-progress-text"><?=Lang::get('editor.PDF_PROGRESS_TITLE')?></div>

			<div class="progress-bar pdf-progress-bar">
	    		<div class="progress-bar-text pdf-progress-bar-text">0%</div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
				</div>
	    	</div>
		</div>
    </script>

    <script id="window-generate-pdf-progress-template" type="text/template"> 
		<div class="generate-pdf-progress-wrapper">
			<input type="button" class="generate-pdf-progress-cancel" value="<?=Lang::get('editor.TEXT_CANCEL')?>"/>
			
			<div class="generate-pdf-progress-window-content">

				<div class="generate-pdf-progress-text"><?=Lang::get('editor.PDF_PROGRESS_EXPORT_TITLE')?></div>

			</div>

			<div class="progress-bar pdf-progress-bar">
	    		<div class="progress-bar-text pdf-progress-bar-text">0%</div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
				</div>
	    	</div>
		</div>
    </script>

    <script id="window-pdf-list-template" type="text/template"> 
    	<div class="window-top-bar"><?=Lang::get('editor.PDF_WINDOW_TITLE')?></div>
		<input type="button" class='window-close-button'>
		
		<div class="pdf-list-wrapper"></div>
    </script>

    <script id="color-picker-template" type="text/template">
    	
    </script>

    <script id="color-picker-2-template" type="text/template">
    	<div class="change-picker-type editor-settings-button" picker-type="color"><?=Lang::get('editor.SIMPLETEXT_BGCOLOR_CHANGER_GRADIENT')?></div>

    	<div class="picker-container"><div>

    </script>

    <script id="gradient-picker-template" type="text/template">
    	<div class="change-picker-type editor-settings-button" picker-type="gradient"><?=Lang::get('editor.SIMPLETEXT_BGCOLOR_CHANGER_SOLID')?></div>

    	<div class="gradient-container"><div>
    </script>

    <script id="border-window-template" type="text/template"> 
    	<div class="window-top-bar"><?=Lang::get('editor.BORDER_AND_SHADOW_TITLE')?></div>
		<input type="button" class='window-close-button'>
		<div class="border-container">

			<div class="darkan-tabs">
				<ul>
					<li><a href="#component-border" class="menu-controls-selected"><?=Lang::get('editor.SIMPLETEXT_BORDERTITLE') ?></a></li>
	                <li><a href="#component-shadow"><?=Lang::get('editor.SIMPLETEXT_SHADOW') ?></a></li>
				</ul>

				<div id="component-border">
					<div class="border-options width100">
						<div class="width50 inline border-option-block">
							Kolor: <div class="border-color-picker"></div>
						</div>
						<div class="width50 inline border-option-block">
							Typ: 
							<select class="border-style-type">
								<option val="solid">Solid</option>
								<option val="dashed">dashed</option>
								<option val="dotted">dotted</option>
								<option val="double">double</option>
								<option val="groove">groove</option>
								<option val="ridge">ridge</option>
								<option val="inset">inset</option>
								<option val="outset">outset</option>
							</select>
						</div>
					</div>

					<div class="border-options border-options-extend width100">
						<div class="different-borders different-border-all"></div>
						<div class="show-option-extend show-border-option-extend">+</div>
						<span>Border:</span>
						<input name="border" action="all" type="range" min="0" max="100">
						<input name="border" action="all" type="number" min="0" max="100">
					</div>

					<div class="option-extend option-extend-border">
						<div class="border-options border-options-extend width100">
							<div class="different-borders different-border-top"></div>
							<span>Border top:</span>
							<input name="border" action="top" type="range" min="0" max="100">
							<input name="border" action="top" type="number" min="0" max="100">
						</div>
						<div class="border-options border-options-extend width100">
							<div class="different-borders different-border-left"></div>
							<span>Border left:</span>
							<input name="border" action="left" type="range" min="0" max="100">
							<input name="border" action="left" type="number" min="0" max="100">
						</div>
						<div class="border-options border-options-extend width100">
							<div class="different-borders different-border-right"></div>
							<span>Border right:</span>
							<input name="border" action="right" type="range" min="0" max="100">
							<input name="border" action="right" type="number" min="0" max="100">
						</div>			
						<div class="border-options border-options-extend width100">
							<div class="different-borders different-border-bottom"></div>
							<span>Border bottom:</span>
							<input name="border" action="bottom" type="range" min="0" max="100">
							<input name="border" action="bottom" type="number" min="0" max="100">
						</div>
					</div>

					<div class="border-options border-options-extend width100">
						<div class="different-borders-radius different-border-radius-all"></div>
						<div class="show-option-extend show-border-radius-option-extend">+</div>
						<span>Radius:</span>
						<input name="border-radius" action="all" type="range" min="0" max="100">
						<input name="border-radius" action="all" type="number" min="0" max="100">
					</div>


					<div class="option-extend option-extend-border-radius">
						<div class="border-options border-options-extend width100">
							<div class="different-borders-radius different-border-radius-topleft"></div>
							<span>Radius top left:</span>
							<input name="border-radius" action="topLeft" type="range" min="0" max="100">
							<input name="border-radius" action="topLeft" type="number" min="0" max="100">
						</div>
						<div class="border-options border-options-extend width100">
							<div class="different-borders-radius different-border-radius-topright"></div>
							<span>Radius top right:</span>
							<input name="border-radius" action="topRight" type="range" min="0" max="100">
							<input name="border-radius" action="topRight" type="number" min="0" max="100">
						</div>
						<div class="border-options border-options-extend width100">
							<div class="different-borders-radius different-border-radius-bottomleft"></div>
							<span>Radius bottom left:</span>
							<input name="border-radius" action="bottomLeft" type="range" min="0" max="100">
							<input name="border-radius" action="bottomLeft" type="number" min="0" max="100">
						</div>
						<div class="border-options border-options-extend width100">
							<div class="different-borders-radius different-border-radius-bottomright"></div>
							<span>Radius bottom right:</span>
							<input name="border-radius" action="bottomRight" type="range" min="0" max="100">
							<input name="border-radius" action="bottomRight" type="number" min="0" max="100">
						</div>
					</div>
				</div>

				<div id="component-shadow">
					<div class="width50 inline border-option-block">
						Kolor: <div class="shadow-color-picker"></div>
					</div>
					<div class="border-options border-options-extend width100">
						<div class="different-shadows different-shadow-size"></div>
						<span>Shadow size:</span>
						<input name="shadow" action="size" type="range" min="0" max="100">
						<input name="shadow" action="size" type="number" min="0" max="100">
					</div>
					<div class="border-options border-options-extend width100">
						<div class="different-shadows different-shadow-blur"></div>
						<span>Shadow blur:</span>
						<input name="shadow" action="blur" type="range" min="0" max="100">
						<input name="shadow" action="blur" type="number" min="0" max="100">
					</div>
					<div class="border-options border-options-extend width100">
						<div class="different-shadows different-shadow-x"></div>
						<span>Shadow x:</span>
						<input name="shadow" action="x" type="range" min="-50" max="50">
						<input name="shadow" action="x" type="number" min="-50" max="50">
					</div>
					<div class="border-options border-options-extend width100">
						<div class="different-shadows different-shadow-y"></div>
						<span>Shadow y:</span>
						<input name="shadow" action="y" type="range" min="-50" max="50">
						<input name="shadow" action="y" type="number" min="-50" max="50">
					</div>
				</div>
			</div>
			<div class="border-window-overlay"></div>
		</div>
    </script>

    <script id="crop-window-template" type="text/template"> 
    	<div class="window-top-bar"><?=Lang::get('editor.MENU_IMAGE_JCROP_TITLE')?></div>
		<input type="button" class='window-close-button'>
		
		<div class="crop-wrapper">
			<div class="image-crop-button-ok editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP')?></div>
			<div class="crop-image-wrapper">
				<img class="image-crop">
			</div>
		</div>
    </script>

    <script id="pdf-list-template" type="text/template">
	    <div class="pdf-list-buttons">
	    	<label class="pdf-list-item-select-all-lbl"><?=Lang::get('editor.TOOLBAR_TOGGLE_ALL_PAGES')?><input type="checkbox" class="pdf-list-item-select-all-checkbox" checked></label>
	    	<input type="button" value="<?=Lang::get('editor.PDF_WINDOW_CONVERT_BUTTON')?>" class="pdf-list-convert-to-pages">
	    </div>
    	<ul class="pdf-list-wrapper"></div>
    </script>

    <script id="pdf-list-item-template" type="text/template">
    	<label><?=Lang::get('editor.PDF_WINDOW_PAGETITLE')?>: <%= id + 1 %></label>
    	<div class="pdf-thumb-wrapper">
    		<img src="<%= src + '?r=' + new Date().getTime() %>" class="pdf-thumb"/>
    	</div>
    	<label><input type="checkbox" class="pdf-list-item-select-item-checkbox"></label>
    </script>

    <script id="trigger-stage-template" type="text/template">
    	<div class="trigger-on-action-container"></div>
    </script>

   

    <script id="trigger-normal-stage-template" type="text/template">
			<div class="trigger-whendoit-section">
				<div class="trigger-title whendoit-title"><?=Lang::get('editor.TRIGGER_WHENDOIT') ?></div> 
				<select class="trigger-on-select margin010">
					<option value="">...</option>
					<% _.each(whendoit, function(item, i) { %>
						<optgroup label="<%= item.group %>">
							<% _.each(item.options, function(options, i) { %>
								<option value="<%= options.value %>"><%= options.name %></option>
							<% }); %>	
						</optgroup>				
					<% }); %>
		    	</select>
	    	</div>
    </script>

     <script id="trigger-keyboard-stage-template" type="text/template">
			<div class="trigger-whendoit-section">
				<div class="trigger-title whendoit-title"><?=Lang::get('editor.TRIGGER_WHENDOIT') ?></div> 
				<select class="trigger-on-select margin010">
					<option value="">...</option>
					<% _.each(whendoit, function(item, i) { %>
						<optgroup label="<%= item.group %>">
							<% _.each(item.options, function(options, i) { %>
								<option value="<%= options.value %>"><%= options.name %></option>
							<% }); %>	
						</optgroup>				
					<% }); %>
		    	</select>

		    	<input class="trigger-keyboard-input" value="<%- key || '' %>" title="<?=Lang::get('editor.TRIGGER_KEYBOARD_TITLE')?>" />	

	    	</div>
    </script>


    <script id="trigger-list-template" type="text/template">
    	<% if(collection.length > 0) { %> 
    		<div class="trigger-list-title trigger-title"><?=Lang::get('editor.TRIGGER_ACTIONLIST') ?></div>
			<ul class="trigger-list-holder"></ul>
			<input type="button" value="<?=Lang::get('editor.TRIGGER_CREATE_INTERACTION') ?>" class="trigger-create-new-interaction trigger-create-new-interaction-exist trigger-add-button">

    	<% } else{ %> 	
    		<div class="trigger-create-new-interaction trigger-create-new-interaction-empty"><?=Lang::get('editor.TRIGGER_NOACTION_BUTTON') ?></div>
    	<% }  %> 

		
    </script>

    <script id="trigger-list-item-template" type="text/template">
		<div class="trigger-list-text title"><?=Lang::get('editor.TRIGGER_ACTIONTITLE') ?>  <%= _lang('TRIGGER_LIST_' + whendoit) %> </div>
		<div class="trigger-copy-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0108')?>"></div>
		<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0109')?>"></div>
		<ul>
			<% _.each(subtriggers, function(subtrigger, i) { %>
				<li class="trigger-list-item"><div class="trigger-list-text">- <%= subtrigger.whattodo == '' ? _lang('ANIMATION_NONE') :  _lang('TRIGGER_LIST_' + subtrigger.whattodo) %></div></li>
			<% }); %>
		</ul>
    </script>

    

    <script id="stage-temp-template" type="text/template">
    </script>

   
    <script id="trigger-section-template" type="text/template">
		<div>Trigger section</div>
    </script>

    <script id="trigger-item-video-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="video"><?=Lang::get('editor.TRIGGER_SELECT_VIDEO_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="video" title="<?=Lang::get('editor.TOOLTIP_0144')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>


    <script id="trigger-video-time-stage-template" type="text/template">
			<div class="trigger-whendoit-section">
				<div class="trigger-title whendoit-title"><?=Lang::get('editor.TRIGGER_WHENDOIT') ?></div> 
				<select class="trigger-on-select margin010">
					<option value="">...</option>
					<% _.each(whendoit, function(item, i) { %>
						<optgroup label="<%= item.group %>">
							<% _.each(item.options, function(options, i) { %>
								<option value="<%= options.value %>"><%= options.name %></option>
							<% }); %>	
						</optgroup>				
					<% }); %>
		    	</select>

		    	<div>

			    	<label><?=Lang::get('editor.TRIGGER_VIDEO_TIME_BETWEEN_1') ?></label>

			    	<label><?=Lang::get('editor.TRIGGER_VIDEO_TIME_BETWEEN_2') ?>
			    		<input type="number" class="trigger-video-time-1-input" value="<%- video.time1 || '' %>" title="" min="0"/>		
			    	</label>

			    	<label><?=Lang::get('editor.TRIGGER_VIDEO_TIME_BETWEEN_3') ?>
			    		<input type="number" class="trigger-video-time-2-input" value="<%- video.time2 || '' %>" title="" min="0"/>	
			    	</label>

		    	</div>
	    	</div>
    </script>

    <script id="trigger-item-video-position-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="video"><?=Lang::get('editor.TRIGGER_SELECT_VIDEO_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>

    	<div class="trigger-video-container">
    		<div class="trigger-video-section-1">
	
				<div class="column video-position-editor-column trigger-column">
					<label>
						<div class="video-position-column-label"><?=Lang::get('editor.TRIGER_VIDEO_POSITION')?></div>
						<input type="number" name="video-position" class="trigger-video-position-input" min="0"/>
					</label>
					<label>
						<div class="video-position-playing-column-label"><?=Lang::get('editor.TRIGER_VIDEO_POSITION_PLAYING')?></div>
						<input type="checkbox" name="video-position-palying" class="trigger-video-position-playing-input"/>
					</label>
				</div>
			</div>
		</div>		


    	<div class="object-picker-icon trigger-data-picker-icon" picker="video" title="<?=Lang::get('editor.TOOLTIP_0144')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-subtrigger-section-template" type="text/template">
    	<div class="trigger-title"><?=Lang::get('editor.TRIGGER_TABLE_WHATTODO') ?></div> 
		<ul class="trigger-item-holder"></ul>
    	<div class="tar">
			<input type="button" class="trigger-add-new-trigger-button trigger-add-button" value="<?=Lang::get('editor.TRIGGER_CREATE_INTERACTION') ?>">
    	</div>
    </script>

    <script id="trigger-elseaction-section-template" type="text/template">
    	<div class="trigger-title"><?=Lang::get('editor.TRIGGER_ELSETITLE') ?></div>
		<ul class="trigger-item-holder"></ul>
    	<div class="tar">
			<input type="button" class="trigger-add-new-trigger-button trigger-add-button" value="<?=Lang::get('editor.TRIGGER_CREATE_ELSEINTERACTION') ?>">
    	</div>
    </script>

    <script id="trigger-condition-section-template" type="text/template">
    	<div class="trigger-title"><?=Lang::get('editor.TRIGGER_CONDITIONS_TITLE') ?></div> 
		<ul class="trigger-item-holder"></ul>
    	<div class="tar">
			<input type="button" class="trigger-add-new-trigger-button trigger-add-button" value="<?=Lang::get('editor.TRIGGER_CREATE_CONDITION') ?>">
			<input type="button" class="trigger-create-new-variable trigger-add-button redbutton" value="<?=Lang::get('editor.TRIGGER_VARIABLES') ?>">
    	</div>
    </script>

    <script id="trigger-subtrigger-item-template" type="text/template">
	    <div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    		<input type="button" value="<?=Lang::get('editor.TRIGGER_ANIMATION') ?>"  class="trigger-add-animation-to-trigger" title="<?=Lang::get('editor.TRIGGER_ANIMATION_TITLE')?>">
    	</div>
    	<div class="trigger-components-container"></div>
    	<div class="trigger-variables-container"></div>
    	<div class="trigger-link-container"></div>
    	<div class="object-picker-icon trigger-data-picker-icon"></div>
    	<input class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons"></div>
    </script>

    <script id="trigger-item-standard-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-objects-template" type="text/template">
	    <div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    		<input type="button" value="<%= _lang('ANIMATION_' + model.opts.animationType.animationName) %>"  class="trigger-add-animation-to-trigger" title="<?=Lang::get('editor.TRIGGER_ANIMATION_TITLE')?>">
    	</div>


    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="object"><?=Lang::get('editor.TRIGGER_SELECT_OBJECTS_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="object" title="<?=Lang::get('editor.TOOLTIP_0111')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-layers-template" type="text/template">
    	 <div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
	    	<input type="button" value="<%= _lang('ANIMATION_' + model.opts.animationType.animationName) %>"  class="trigger-add-animation-to-trigger" title="<?=Lang::get('editor.TRIGGER_ANIMATION_TITLE')?>">
    	</div>

    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="line"><?=Lang::get('editor.TRIGGER_SELECT_LINES_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="line" actionkey="<%= item.lineId %>" action="line"></div>
			<% }); %>
    	</div>

    	<div class="object-picker-icon trigger-data-picker-icon" picker="line" title="<?=Lang::get('editor.TOOLTIP_0112')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-pages-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>

    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="page"><?=Lang::get('editor.TRIGGER_SELECT_PAGES_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="page" actionkey="<%= item.pageId %>" action="page"></div>
			<% }); %>
    	</div>

    	<div class="object-picker-icon trigger-data-picker-icon" picker="page" title="<?=Lang::get('editor.TOOLTIP_0113')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-variables-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-variables-container">
    		<select class="trigger-varpicker">
    			<option value="none">--------</option>
    			<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_PROJECT_VARS')?>">
					<% _.each(projectVariables, function(item, i) { %>
						<option value="<%- item.varhash %>"><%- item.pvarname %></option>
					<% }); %>
				</optgroup>
				<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_STATIC_VARS')?>">
					<% _.each(staticVariables, function(item, i) { %>

						<option value="<%= item.varhash %>"><%- _lang(item.pvarname) %></option>

					<% }); %>
				</optgroup>
    		</select>
    		<select class="trigger-varactionpicker">
	    		<option value="" selected><?=Lang::get('editor.TRIGGER_VARS_NOACTIONSELECTED')?></option>
	    		<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_ONCE')?>">
	    			<option value="changevalueonce"><?=Lang::get('editor.TRIGGER_VARS_CHANGEVALUE_ONCE')?></option>
	    			<option value="addonce"><?=Lang::get('editor.TRIGGER_VARS_ADD_ONCE')?></option>
	    			<option value="subtractonce"><?=Lang::get('editor.TRIGGER_VARS_SUBTRACT_ONCE')?></option>
	    		</optgroup><optgroup label="<?=Lang::get('editor.TRIGGER_VARS_EVERYTIME')?>">
	    			<option value="changevalue"><?=Lang::get('editor.TRIGGER_VARS_CHANGEVALUE')?></option>
	    			<option value="add"><?=Lang::get('editor.TRIGGER_VARS_ADD')?></option>
	    			<option value="subtract"><?=Lang::get('editor.TRIGGER_VARS_SUBTRACT')?></option>
	    		</optgroup>
    		</select>
    		<input type="text" class="trigger-varchange-input" placeholder="<?=Lang::get('editor.TRIGGER_VARS_ENTERVARVALUE')?>">
    	</div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-play-sound-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="object"><?=Lang::get('editor.TRIGGER_SELECT_OBJECTS_TITLE') ?></div> <% } %>
    		<%  _log('objects', objects); _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="object" title="<?=Lang::get('editor.TOOLTIP_0111')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-go-to-link-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<input type="text" class="trigger-link-input" placeholder="<?=Lang::get('editor.TRIGGER_VARS_ENTERVARLINK')?>" value="<%= _.isString(model.opts.link) ? model.opts.link : model.opts.link.link %>">
    	<select class="trigger-go-to-link-target-select">
				<option value="_blank"><?=Lang::get('editor.TRIGGER_OPEN_LINK_TARGET_BLANK')?></option>
				<option value="_self"><?=Lang::get('editor.TRIGGER_OPEN_LINK_TARGET_SELF')?></option>
				<option value="_parent"><?=Lang::get('editor.TRIGGER_OPEN_LINK_TARGET_PARENT')?></option>
				<option value="_top"><?=Lang::get('editor.TRIGGER_OPEN_LINK_TARGET_TOP')?></option>
	    	</select>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-check-exercise-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="exercise"><?=Lang::get('editor.TRIGGER_SELECT_EXERCISES_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="exercise" title="<?=Lang::get('editor.TOOLTIP_0114')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-show-next-line-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-reset-exercise-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="exercise"><?=Lang::get('editor.TRIGGER_SELECT_EXERCISES_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="exercise" title="<?=Lang::get('editor.TOOLTIP_0114')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-show-next-line-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-timer-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="timer"><?=Lang::get('editor.TRIGGER_SELECT_TIMERS_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="timer" title="<?=Lang::get('editor.TOOLTIP_0135')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>


    <script id="trigger-item-transition-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="object"><?=Lang::get('editor.TRIGGER_SELECT_OBJECTS_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>
    	<div class="trigger-transition-container">


    		<div class="trigger-transition-section-1">
	
					<div class="xycolumn size-and-position-editor-column trigger-xycolumn">
						<label>
							<div class="size-and-position-editor-column-label">X</div>
							<input type="number" name="position-x" class="trigger-x-input"/>
						</label>

						<label>
							<div class="size-and-position-editor-column-label">Y</div>
							<input type="number" name="position-y" class="trigger-y-input"/>
						</label>

						<label>
							<div class="size-and-position-editor-column-label rotateangle-label"></div>
							<input type="number" id="rotateAngle" class="trigger-rotate-angle-input">
						</label>

						<label>
							<div class="size-and-position-editor-column-label opacity-label">O</div>
							<input type="number" class="trigger-opacity-input" min="0" max="1" step="0.1">
						</label>
					</div>

					<div class="whcolumn size-and-position-editor-column">
						<label>
							<div class="size-and-position-editor-column-label">W</div>
							<input type="number" min="0" name="width" class="trigger-width-input"/>
						</label>

						<div class="trigger-aspect-ratio-container">
							<div id="trigger-aspect-ratio-overlay"></div>
							<input id="trigger-aspect-ratio<%=prefix%>" class="trigger-aspect-ratio" type="checkbox">
							<label for="trigger-aspect-ratio<%=prefix%>"></label>
						</div>
						<label>
							<div class="size-and-position-editor-column-label">H</div>
							<input type="number" min="0" name="height" class="trigger-height-input">
						</label>

						<label>
								<div class="size-and-position-editor-column-label">Sc</div>
								<input type="number" min="0" name="scale" class="trigger-scale-input">
						</label>
					</div>


				<div>	
					<div class="trigger-animation-button-play"></div>
					
					<div class="trigger-data-picker-icon-select-one-object trigger-data-picker-icon-select-xy-position" selectedparams="none" picker="none" title="<?=Lang::get('editor.TOOLTIP_0139')?>"></div>
    				<div class="trigger-data-picker-icon-select-one-object" selectedparams="positions" picker="object" title="<?=Lang::get('editor.TOOLTIP_0137')?>"></div>
					<div class="trigger-data-picker-icon-select-one-object" selectedparams="dimensions" picker="object" title="<?=Lang::get('editor.TOOLTIP_0138')?>"></div>
					<div class="trigger-data-picker-icon-select-one-object" selectedparams="all" picker="object" title="<?=Lang::get('editor.TOOLTIP_0136')?>"></div>
				</div>

    		</div>

    		<div class="trigger-transition-section-2">
	    		<table>
	    			<tr>
	    				<td><label><?=Lang::get('editor.TRIGGER_TRANSITION_PONIT_TIME') ?></label></td>
	    				<td><input type="number" step="0.1" min="0" max="100" class="trigger-time-input"> s</td>
	    			</tr>
	    			<tr>
	    				<td><label><?=Lang::get('editor.TRIGGER_TRANSITION_PONIT_ANIMATION_TYPE') ?></label></td>
	    				<td>


						      <select class="trigger-easeing-type-select">
					              <optgroup label="defaults">
					                <option value="0.250, 0.250, 0.750, 0.750">linear</option>
					                <option value="0.250, 0.100, 0.250, 1.000">ease (default)</option>
					                <option value="0.420, 0.000, 1.000, 1.000">ease-in</option>
					                <option value="0.000, 0.000, 0.580, 1.000">ease-out</option>
					                <option value="0.420, 0.000, 0.580, 1.000">ease-in-out</option>
					              </optgroup>
					              <optgroup label="defined">
					                <option value="0.550, 0.085, 0.680, 0.530">easeInQuad</option>
					                <option value="0.550, 0.055, 0.675, 0.190">easeInCubic</option>
					                <option value="0.895, 0.030, 0.685, 0.220">easeInQuart</option>
					                <option value="0.755, 0.050, 0.855, 0.060">easeInQuint</option>
					                <option value="0.470, 0.000, 0.745, 0.715">easeInSine</option>
					                <option value="0.950, 0.050, 0.795, 0.035">easeInExpo</option>
					                <option value="0.600, 0.040, 0.980, 0.335">easeInCirc</option>
					                <option value="0.600, -0.280, 0.735, 0.045">easeInBack</option>

					                <option value="0.250, 0.460, 0.450, 0.940">easeOutQuad</option>
					                <option value="0.215, 0.610, 0.355, 1.000">easeOutCubic</option>
					                <option value="0.165, 0.840, 0.440, 1.000">easeOutQuart</option>
					                <option value="0.230, 1.000, 0.320, 1.000">easeOutQuint</option>
					                <option value="0.390, 0.575, 0.565, 1.000">easeOutSine</option>
					                <option value="0.190, 1.000, 0.220, 1.000">easeOutExpo</option>
					                <option value="0.075, 0.820, 0.165, 1.000">easeOutCirc</option>
					                <option value="0.175, 0.885, 0.320, 1.275">easeOutBack</option>

					                <option value="0.455, 0.030, 0.515, 0.955">easeInOutQuad</option>
					                <option value="0.645, 0.045, 0.355, 1.000">easeInOutCubic</option>
					                <option value="0.770, 0.000, 0.175, 1.000">easeInOutQuart</option>
					                <option value="0.860, 0.000, 0.070, 1.000">easeInOutQuint</option>
					                <option value="0.445, 0.050, 0.550, 0.950">easeInOutSine</option>
					                <option value="1.000, 0.000, 0.000, 1.000">easeInOutExpo</option>
					                <option value="0.785, 0.135, 0.150, 0.860">easeInOutCirc</option>
					                <option value="0.680, -0.550, 0.265, 1.550">easeInOutBack</option>
					              </optgroup>
					              
					            </select>

					            <div class="trigger-graph-baizer-previev" title="<?=Lang::get('editor.TOOLTIP_0140')?>"></div>
	    				</td>
	    				<tr>
	    				<td><label><?=Lang::get('editor.TRIGGER_TRANSITION_PONIT_ANCHOR_POINT') ?></label></td>
	    				<td>
	    					<table>
				    			<tr>
				    				<td><input value="top-left" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    				<td><input value="top-center" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    				<td><input value="top-right" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    			</tr>
				    			<tr>
				    				<td><input value="center-left" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    				<td><input value="center-center" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    				<td><input value="center-right" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    			</tr>
				    			<tr>
				    				<td><input value="bottom-left" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    				<td><input value="bottom-center" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    				<td><input value="bottom-right" type="radio" class="triggeraxis" name="triggeraxis<%=prefix%>"/></td>
				    			</tr>

				    		</table>
	    				</td>
	    			</tr>
	    			</tr>
	    		</table>
	    		
    		</div>


    	</div>
    	<div class="object-picker-icon trigger-data-picker-icon" picker="object" title="<?=Lang::get('editor.TOOLTIP_0111')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>

    <script id="trigger-item-change-style-template" type="text/template">
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" <% if(options.value == model.whattodo) { %> selected="true" <% } %> ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
    	</div>
    	<div class="trigger-components-container">
    		<% if(model.objs.length <= 0) { %>  <div class="trigger-data-picker-text" picker="object"><?=Lang::get('editor.TRIGGER_SELECT_OBJECTS_TITLE') ?></div> <% } %>
    		<% _.each(objects, function(item, i) { %>
				<div class="ex-object" componenttype="<%= item.type %>" actionkey="<%= item.actionkey %>" action="object"></div>	
			<% }); %>
    	</div>

    	<div>

    		<div class="trigger-style-container">
    			<div><?=Lang::get('editor.TRIGGER_STYLE_BACKGROUND')?></div>
    			<div class="trigger-color-picker-container">
		    		<div class="text-color-picker-container text-solid-color-picker"></div>
		    	</div>
    		</div>

    		<div class="trigger-style-container">
    			<div><?=Lang::get('editor.TRIGGER_STYLE_BORDER')?></div>
    			<input value="<%= model.opts.style.borderWeight || '' %>" class="trigger-border-weight-input" type="number" min="0" max="100" step="0.1" title="<?=Lang::get('editor.TRIGGER_BORDER_WEIGHT')?>" />
    			<select class="trigger-border-type-select">
					<option val="solid">Solid</option>
					<option val="dashed">dashed</option>
					<option val="dotted">dotted</option>
					<option val="double">double</option>
					<option val="groove">groove</option>
					<option val="ridge">ridge</option>
					<option val="inset">inset</option>
					<option val="outset">outset</option>
				</select>
    			<div class="trigger-color-picker-container">
		    		<div class="border-color-picker-container border-solid-color-picker"></div>
		    	</div>
    		</div>

    	</div>

    	

    	<div class="object-picker-icon trigger-data-picker-icon" picker="object" title="<?=Lang::get('editor.TOOLTIP_0111')?>"></div>
    	<input value="<%= model.opts.delay %>" class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>" />
    	<div class="trigger-delete-trigger-button trigger-list-buttons" title="<?=Lang::get('editor.TOOLTIP_0110')?>"></div>
    </script>






    <script id="trigger-subtrigger-item-variables-template" type="text/template">
    	<div class="trigger-variables-container">
    		<select class="trigger-varpicker">
    			<option value="" selected><?=Lang::get('editor.TRIGGER_VARS_NOVARSELECTED')?></option>
				<% _.each(projectVariables, function(item, i) { %>
					<option value="<%= item.varhash %>"><%- item.pvarname %></option>
				<% }); %>
    		</select>
    		<select class="trigger-varactionpicker">
	    		<option value="" selected><?=Lang::get('editor.TRIGGER_VARS_NOACTIONSELECTED')?></option>
	    		<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_ONCE')?>">
	    			<option value="changevalueonce"><?=Lang::get('editor.TRIGGER_VARS_CHANGEVALUE_ONCE')?></option>
	    			<option value="addonce"><?=Lang::get('editor.TRIGGER_VARS_ADD_ONCE')?></option>
	    			<option value="subtractonce"><?=Lang::get('editor.TRIGGER_VARS_SUBTRACT_ONCE')?></option>
	    		</optgroup><optgroup label="<?=Lang::get('editor.TRIGGER_VARS_EVERYTIME')?>">
	    			<option value="changevalue"><?=Lang::get('editor.TRIGGER_VARS_CHANGEVALUE')?></option>
	    			<option value="add"><?=Lang::get('editor.TRIGGER_VARS_ADD')?></option>
	    			<option value="subtract"><?=Lang::get('editor.TRIGGER_VARS_SUBTRACT')?></option>
	    		</optgroup>
    		</select>
    		<input type="text" class="trigger-varchange-input" placeholder="<?=Lang::get('editor.TRIGGER_VARS_ENTERVARVALUE')?>">
    	</div>
    </script>

    <script id="trigger-subtrigger-item-link-template" type="text/template">
    	<input type="text" class="trigger-link-input" placeholder="<?=Lang::get('editor.TRIGGER_VARS_ENTERVARLINK')?>" value="<%= opts.link %>">
    </script>

    <script id="trigger-elseaction-item-template" type="text/template"> 
    	<div class="trigger-action-select-container">
			<select class="trigger-action-select" picker="none">
				<option value="none">--------</option>
				<% _.each(whattodo, function(item, i) { %>
					<optgroup label="<%= item.group %>">
						<% _.each(item.options, function(options, i) { %>
							<option value="<%= options.value %>" picker="<%= options.picker %>" ><%= options.name %></option>
						<% }); %>	
					</optgroup>	
				<% }); %>
	    	</select>
	    	<input type="button" value="<?=Lang::get('editor.TRIGGER_ANIMATION') ?>"  class="trigger-add-animation-to-trigger" title="<?=Lang::get('editor.TRIGGER_ANIMATION_TITLE')?>">
    	</div>
    	<div class="trigger-components-container"></div>
    	<div class="trigger-variables-container"></div>
    	<div class="trigger-link-container"></div>
    	<div class="object-picker-icon trigger-data-picker-icon"></div>
    	<input class="trigger-delay-input" type="number" min="0" step="0.1" title="<?=Lang::get('editor.TRIGGER_DELAY')?>"/>
    	<div class="trigger-delete-trigger-button trigger-list-buttons"></div>
    </script>

    <script id="trigger-condition-item-template" type="text/template">
			<select class="trigger-condition-varpicker">
    			<option value=""><?=Lang::get('editor.TRIGGER_VARS_NOVARSELECTED')?></option>
    			<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_PROJECT_VARS')?>">
					<% _.each(projectVariables, function(item, i) { %>
						<option value="<%= item.varhash %>"><%- item.pvarname %></option>
					<% }); %>
				</optgroup>
				<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_STATIC_VARS')?>">
					<% _.each(staticVariables, function(item, i) { %>
						<option value="<%= item.varhash %>"><%- _lang(item.pvarname) %></option>
					<% }); %>
				</optgroup>
    		<select>
    		<select class="trigger-condition-action-picker">
	    		<option value=""><?=Lang::get('editor.TRIGGER_VARS_NOACTIONSELECTED')?></option>
		    	<optgroup label="<?=Lang::get('editor.TRIGGER_CONDITIONS_VALUE')?>"><option value="val-equals" conditiontype="value">==</option>
		    		<option value="val-greaterthan" conditiontype="value">&gt;</option>
		    		<option value="val-greaterthanorequal" conditiontype="value">&gt;=</option>
		    		<option value="val-lessthan" conditiontype="value">&lt;</option>
		    		<option value="val-lessthanorequal" conditiontype="value">&lt;=</option>
		    		<option value="val-modulo" conditiontype="value">%2</option>
	    		</optgroup>
	    		<optgroup label="<?=Lang::get('editor.TRIGGER_CONDITIONS_VAR')?>">
		    		<option value="var-equals" conditiontype="variable">==</option>
		    		<option value="var-greaterthan" conditiontype="variable">&gt;</option>
		    		<option value="var-greaterthanorequal" conditiontype="variable">&gt;=</option>
		    		<option value="var-lessthan" conditiontype="variable">&lt;</option>
		    		<option value="var-lessthanorequal" conditiontype="variable">&lt;=</option>
		    		<option value="var-modulo" conditiontype="variable">%2</option>
	    		</optgroup>
    		</select>
    		<% if(variable == 'variable') { %>
    			<select class="trigger-compare-value">
	    			<option value=""><?=Lang::get('editor.TRIGGER_VARS_NOVARSELECTED')?></option>
					<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_PROJECT_VARS')?>">
						<% _.each(projectVariables, function(item, i) { %>
							<option value="<%= item.varhash %>"><%- item.pvarname %></option>
						<% }); %>
					</optgroup>
					<optgroup label="<?=Lang::get('editor.TRIGGER_VARS_STATIC_VARS')?>">
						<% _.each(staticVariables, function(item, i) { %>
							<option value="<%= item.varhash %>"><%- _lang(item.pvarname) %></option>
						<% }); %>
					</optgroup>
    			<select>
    		<% } else { %>
    			<input type="text" class="trigger-compare-value">
    		<% } %>
    		<select class="condition-andor-action">
    			<option value="and"><?=Lang::get('editor.TRIGGER_CONDITIONS_AND')?></option>
    			<option value="or"><?=Lang::get('editor.TRIGGER_CONDITIONS_OR')?></option>
    		<select>
    		<div class="trigger-delete-trigger-button trigger-list-buttons"></div>
    </script>

    <script id="trigger-wrapper-template" type="text/template"> 
    	<div class="trigger-icon"></div>
		<div class="window-top-bar">Trigger</div>
		<input type="button" class="window-close-button">

    </script>

    <script id="trigger-create-new-interaction-template" type="text/template"> 
		<div class="trigger-on-section">
			<label>Trigger: </label>
		
				<select class="trigger-on-select margin010">
					<option value="none" trigger-type="none">--------</option>
					<% _.each(whendoit, function(item, i) { %>
						<optgroup label="<%= item.group %>">
							<% _.each(item.options, function(options, i) { %>
								<option value="<%= options.value %>"><%= options.name %></option>
							<% }); %>	
						</optgroup>				
					<% }); %>
		    	</select>
		</div>

// ?????????????????????
		<div class="trigger-action-section">
			<label>What to do: </label>
		
			<div class="trigger-subtriggers-container"></div>	
		    <input type="button" class="trigger-add-new-subtrigger-button" value="Add new subtrigger">  		

		</div>

// ?????????????????????
		<div class="trigger-if-section">
			<label>If: </label>
		
			<div class="trigger-if-container"></div>		

			<input type="button" class="trigger-add-if-condition-button" value="Add if condition">
		    <input type="button" class="trigger-add-else-button" value="Else">
	
		</div>
	</script>

    <script id="window-sound-manager-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.MENU_SOUNDS') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">

			<div id="window-content-tabs" class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#project-sound-item" class="menu-controls-selected"><?=Lang::get('editor.PROJECT_SOUND') ?></a></li>
				</ul>

				<div id="project-sound-item">
				</div>
			</div>
    	</div>
	</script>

    <script id="window-create-new-variable-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.TRIGGER_VARIABLES') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">

			<div id="window-content-tabs" class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#user-variables" class="menu-controls-selected"><?=Lang::get('editor.TRIGGER_VARIABLES_USER') ?></a></li>
	                <li><a href="#project-variables"><?=Lang::get('editor.TRIGGER_VARIABLES_PROJECT') ?></a></li>
				</ul>

				<div id="user-variables">
		    		<input type="button" class="create-new-variable-add-button trigger-add-button" value="+ <?=Lang::get('editor.TRIGGER_VARIABLES_ADD') ?>">
		    		<ul class="user-variables-list"></ul>
				</div>

				<div id="project-variables">
		    		<ul class="project-variables-list"></ul>
				</div>
			</div>
    	</div>
	</script>

	<script id="window-editor-container-template" type="text/template">
    	<div class="window-top-bar"><%-title%></div>
    	<input type="button" class='window-close-button'>
    	<ul class="window-content open-editors-list">

    	</ul>
	</script>


	<script id="window-paste-components-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.PASTE_COMPONENTS_WINDOW_TITLE') ?></div>
    	<input type="button" class='window-close-button'>
    	<div class="window-content">

			<div id="window-content-tabs" class="darkan-tabs tabs-left">
				<ul>
					<li><a href="#paste-components-copy" class="menu-controls-selected"><?=Lang::get('editor.PASTE_COMPONENTS_WINDOW_COPY_TAB') ?></a></li>
	                <li><a href="#paste-components-cut"><?=Lang::get('editor.PASTE_COMPONENTS_WINDOW_CUT_TAB') ?></a></li>
	                <li><a href="#paste-components-delete"><?=Lang::get('editor.PASTE_COMPONENTS_WINDOW_DELETE_TAB') ?></a></li>
				</ul>

				<div id="paste-components-copy">
		    		<ul class="paste-components-copy-list"></ul>
				</div>

				<div id="paste-components-cut">
		    		<ul class="paste-components-cut-list"></ul>
				</div>

				<div id="paste-components-delete">
		    		<ul class="paste-components-delete-list"></ul>
				</div>
			</div>
    	</div>
	</script>

	<script id="paste-components-item-template" type="text/template">
    	
	</script>


    <script id="create-new-variable-project-variable-item-template" type="text/template">
    	<label><input type="text" class="create-new-variable-item-name" value="<%= pvarname %>" placeholder="<?=Lang::get('editor.TRIGGER_VARS_ENTERVARNAME')?>"></label>
    	<label> = </label> 
    	<label><input type="text" class="create-new-variable-item-value" value="<%= pvarvalue %>" placeholder="<?=Lang::get('editor.TRIGGER_VARS_ENTERVARVALUE')?>"></label>
    	<input type="button" class="create-new-variable-delete-button delete-icon">
    </script>

    <script id="create-new-variable-static-variable-item-template" type="text/template">

    	<div class="variable-description">

    		<%- _lang(pvarname) %>

    	</div>

    	<div class="variable-name">

    		<%- _lang('VARIABLE_NAME') %> <input type="text" value="{%<%- pvarname %>%}"/>

    	</div>

    	<div class="variable-value">

    		 <%- _lang('VARIABLE_VALUE') + pvarvalue %>

    	</div>

    	<hr>


    </script>
 

    <script id="page-template" type="text/template">
			<div class="page-show <%= options.active == 0 ? 'page-hide' : '' %>" title="<?=Lang::get('editor.TOOLTIP_0105')?>"></div>
			<div class="page-sound <%= options.soundfilename !== '' ? 'page-sound-on' : '' %>" title="<?=Lang::get('editor.TOOLTIP_0106')?>"></div>
			<div class="page-notes <%- options.note !== '' ? 'page-notes-on' : '' %>" title="<?=Lang::get('editor.TOOLTIP_0107')?>"></div>
			<div class="page-thumb animated fadeInOpacityOnly" style="background-image:url(<?php echo config('app.projects_link'); ?><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= options.pageid %>/pagethumb.jpg?r=<%= new Date().getUTCMilliseconds() %>)"></div>
			<div class="dinamic-page-thumb-wrapper"></div>
			<div class="page-counter">[<%= order %>]</div>
			<div class="page-label"><%- options.pagename %></div>


			<div class="page-selected-by"></div>


			<input type="checkbox" class="page-checkbox" <%= isSelected ? 'checked' : '' %>>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
    </script>

    <script id="page-selected-by-list-template" type="text/template">

    		<%  var otherLogins = _.without( selectedBy, _.findWhere(selectedBy, { login:__meta__.login }));   %>

			<% if ( otherLogins.length > 0  ) { %>
			<div class="page-selected-by-item fa fa-users fa-2x" title="<% _.each(otherLogins, function(val, key) { %>
				<div class='user-div'><%=val.login%></div>
				<% }); %>">
				<div class="page-selected-by-number"><%=otherLogins.length%></div></div>	

			<% } %>

    </script>

    <script id="second-page-template" type="text/template">
		<div class="page-thumb" style="background-image:url(<%=__meta__.projects_link%><%= options.userId %>/<%= options.projectId %>/pre/exported_view/<%= options.pageid %>/pagethumb.jpg?r=<%= new Date().getUTCMilliseconds() %>)"></div>
		<div class="page-counter">[<%= order %>]</div>
		<div class="page-label"><%- options.pagename %></div>
		<input type="checkbox" class="page-checkbox" <%= isSelected ? 'checked' : '' %> />
    </script>

    <script id="pagesoundsettingwindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get('editor.W_PAGESOUND_TITLE') ?></div>
    	<input type="button" class="window-close-button">
    	<div class="add-page-sound-button editor-settings-button upload"><?=Lang::get('editor.ADD_SOUND_PRESS_TITLE') ?></div>
    	<% if (pageModel.soundfilename !== '' && pageModel.soundfilename != undefined) { %>
    		<audio controls preload="none">
    			<source src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= pageModel.pageid %>/audio/page/<%= pageModel.soundfilename %>" type="audio/mpeg">
    		</audio>
    		<div><a class="editor-settings-button" href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= pageModel.pageid %>/audio/page/<%= pageModel.soundfilename %>" download>Pobierz</a></div>
    		<div class="delete-page-sound-button editor-settings-button"><?=Lang::get('editor.MENU_ADDSOUND_DELETE') ?></div>
    	<% } %>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
    	<div class="loaded-dropzone"></div>
    </script>


    <script id="timelinerow-template" type="text/template">
			<div class="timelinerow-showhide <% if (options.hidden) { %>timelinerow-hidden<% }else{ %>timelinerow-show<% } %>"></div>
			<div class="timelinerow-block"></div>
			<div class="timelinerow-label <% if(options.active){ %> activeRow <% } %>">
			<div class="edit-name timeline-row-edit-name"></div>
				<div class="timeline-row-edit-name-layers"><%- rowName %></div>
			</div>
			<ul class="timelinerow-items-holder">

			</ul>
    </script>
    <script id="timeline-empty-row-template" type="text/template">
    	<li class="">
			<div class="timelinerow-show"></div>
			<div class="timelinerow-block"></div>
			<div class="timelinerow-label">Line</div>
			<ul class="timelinerow-items-holder">

			</ul>
		</li>
    </script>
    <script id="timelineitem-template" type="text/template">
		<div class="timelineItem" action="<%= action %>" componentType="<%= type %>">
			<div class="extras">
				<div class="extras-trigger" title="<?=Lang::get('editor.TIMELINE_TITLE_TRIGGER')?>"></div>
				<div class="extras-sound" title="<?=Lang::get('editor.TIMELINE_TITLE_SOUND')?>"></div>
				<div class="extras-wcag" title="<?=Lang::get('editor.TIMELINE_TITLE_WCAG')?>">w</div>
			</div>
		</div>
    </script>

    <!-- CLASSIC TIMELINE -->
    <script id="timelinerow-template-classic" type="text/template">
			<div class="timelinerow-label-classic <% if(options.active){ %> activeRow <% } %>">
				
				<div class="timeline-collapse-classic"></div>
				<div class="timeline-elems-number-classic">
					<div class="timeline-row-edit-name timeline-row-edit-name-classic"><%- rowName %></div>
					(<?=Lang::get('editor.ELEMENTS')?>: <%=objects.length%>)
				</div>

				<div class="timelinerow-showhide timelinerow-showhide-classic <% if (options.hidden) { %>timelinerow-hidden<% }else{ %>timelinerow-show<% } %>"></div>
				<div class="timelinerow-block timelinerow-block-classic" block="<% if (options.locked) { %>true<% } %>"></div>

			</div>
			<ul class="timelinerow-items-holder-classic">

			</ul>
    </script>

    <script id="timelineitem-template-classic" type="text/template">

    	<div class="timeline-item-icons">
	    	<div class="timelineitem-handle"></div>
			<div class="extras">
				<div class="extras-trigger" title="<?=Lang::get('editor.TIMELINE_TITLE_TRIGGER')?>"></div>
				<div class="extras-sound" title="<?=Lang::get('editor.TIMELINE_TITLE_SOUND')?>"></div>
				<div class="extras-wcag" title="<?=Lang::get('editor.TIMELINE_TITLE_WCAG')?>">w</div>
			</div>
			<div class="timelineItem timelineItem-classic" action="<%= action %>" componentType="<%= type %>"></div>
    	</div>

    	<div class="timeline-classic-block-wrapper">
    		<div class="timeline-classic-block"></div>
    	</div>
    </script>

    <script id="timeline-template" type="text/template">
    	
    </script>

    <!-- COMPONENTS TEMPLATE -->
    <script id="component-template" type="text/template">
    </script>

    <script id="text-component-template" type="text/template">
    	<div class="component-styles">
	    	<div class="component-inner text-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="forminputtext-component-template" type="text/template">
    	<div class="component-inner forminputtext-component-inner">
    		<input type="text" placeholder="<%= placeholder %>" value="<%- defaultValue %>" style="font-size:<%= fontSize %>px;text-align:<%= textAlign %>;">
    		<div class="input-overlay"></div>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
		</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="formupload-component-template" type="text/template">

		<div class="component-styles">
			<div class="component-inner image-component-inner form-upload-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>

    </script>

    <script id="quizinputtext-component-template" type="text/template">

		<div class="component-styles">
	    	<div class="component-inner quizinputtext-component-inner">
	    		<input type="text" class="quizinputtext-input" placeholder="<%= placeholder %>" value="<%- defaultValue %>" style="font-size:<%= fontSize %>px;text-align:<%= textAlign %>;">
	    		<div class="input-overlay"></div>
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
			</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="formtextarea-component-template" type="text/template">
    	<div class="component-inner formtextarea-component-inner">
    		<textarea style="font-size:<%= fontSize %>px;text-align:<%= textAlign %>;" maxlength="<%= maxLength %>"><%- defaultValue %></textarea>
    		<div class="input-overlay"></div>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="formselect-component-template" type="text/template">
    	<div class="component-inner formselect-component-inner">
    		<select style="font-size:<%=fontSize%>px;">
    			<% _.each(formData.selectOptions, function(option, i) { %>
    				<option value="<%-option.option%>" it="<%=i%>" <% if(option.startValue) { %>selected<% } %> ><%-option.option%></option>
				<% }); %>

    		</select>
    		<div class="input-overlay"></div>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="quizselect-component-template" type="text/template">
    	<div class="component-inner quizselect-component-inner">
    		<select style="font-size:<%=fontSize%>px;">
    			<% _.each(formData.selectOptions, function(option, i) { %>
    				<option value="<%-option.option%>" it="<%=i%>" <% if(option.startValue) { %>selected<% } %> ><%-option.option%></option>
				<% }); %>

    		</select>
    		<div class="input-overlay"></div>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="formsubmit-component-template" type="text/template">
		<div class="component-styles">
	    	<div class="component-inner text-component-inner form-submit-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="formradio-component-template" type="text/template">
    	<div class="component-inner formradio-component-inner">
    		<div class="input-wrapper" style="width:<%=inputSize%>px;"><input name="<%=groupName%>" type="radio" id="<%=actionkey%>" style="width:<%=inputSize%>px;height:<%=inputSize%>px;"></div>
    		<div class="text-wrapper">
    			<%=contents%>
    		</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="formcheckbox-component-template" type="text/template">
    	<div class="component-inner formcheckbox-component-inner">
    		<div class="input-wrapper" style="width:<%=inputSize%>px;"><input type="checkbox" id="<%=actionkey%>" style="width:<%=inputSize%>px;height:<%=inputSize%>px;"></div>
    		<div class="text-wrapper text-component-inner">
    			<%=contents%>
    		</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="iframe-component-template" type="text/template">
    	<div class="component-inner iframe-component-inner">
    		<iframe class="iframeObj" onload="this.blur()" <%= link !== '' ? 'src="' + link + '"' : '' %>></iframe>
    		<div class="iframe-overlay"></div>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="swf-component-template" type="text/template">
    	<div class="component-inner swf-component-inner">
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
    		<div class="swf-wrapper"></div>
    		<div class="swf-overlay"></div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="drawedinfopointlink-component-template" type="text/template">
    	<div class="component-inner drawedinfopointlink-component-inner">
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="drawedinfopointdownload-component-template" type="text/template">
    	<div class="component-inner drawedinfopointdownload-component-inner">
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
    		<div class="snd-wrapper"></div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="drawedinfopointpopup-component-template" type="text/template">
    	<div class="component-styles">
			<div class="component-inner drawedinfopointpopup-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="drawedinfopointgallery-component-template" type="text/template">
    	<div class="component-styles">
	    	<div class="component-inner drawedinfopointgallery-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="snd-wrapper"></div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="infopointpopup-component-template" type="text/template">
	    <div class="component-styles">
			<div class="component-inner image-component-inner infopointpopup-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="infopointlink-component-template" type="text/template">
    	<div class="component-styles">
			<div class="component-inner image-component-inner infopointlink-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="infopointsound-component-template" type="text/template">
    	<div class="component-styles">
			<div class="component-inner image-component-inner infopointsound-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="infopointsoundcontrol-component-template" type="text/template">
        <div class="component-styles">
            <div class="component-inner image-component-inner infopointsound-component-inner">
            	<% if (typeof noskin === "undefined" || noskin == false) { %>
                <div id="audio-player-<%=actionkey.split('-')[1]%>"></div>
                <div id="jp-container-<%=actionkey.split('-')[1]%>" class="jp-audio" role="application" aria-label="media player">
                    <div class="jp-type-single">
                        <div class="jp-gui jp-interface">
                            <div class="jp-controls">
                                <button class="jp-play" role="button" tabindex="0">play</button>
                                <button class="jp-stop" role="button" tabindex="0">stop</button>
                                
                                <div class="jp-progress">
                                    <div class="jp-seek-bar">
                                        <div class="jp-play-bar"></div>
                                    </div>
                                </div>
                                <button class="jp-mute" role="button" tabindex="0">mute</button>
                                <div class="jp-volume-bar">
                                    <div class="jp-volume-bar-value"></div>
                                </div>
                                <button class="jp-volume-max" role="button" tabindex="0">max volume</button>
                            </div>
                            <div class="jp-time-holder">
                                <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
                                <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
                                <div class="jp-toggles">
                                    <button class="jp-repeat" role="button" tabindex="0">repeat</button>
                                </div>
                            </div>
                        </div>
                        <div class="jp-no-solution">
                            <span>Update Required</span>
                            To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                        </div>
                    </div>
                </div>
                <% } else { %>
		    		<audio controls>
		    		</audio>
                <% } %>

            </div>
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
	    	<div class="text-component-handle"></div>
        </div>
    </script>



    </script>

    <script id="infopointsoundrecord-component-template" type="text/template">
    	<div class="component-styles">
			<div class="component-inner image-component-inner infopointsoundrecord-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="infopointgallery-component-template" type="text/template">
    	<div class="component-styles">
			<div class="component-inner image-component-inner infopointgallery-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="infopointdownload-component-template" type="text/template">
    	<div class="component-styles">
			<div class="component-inner image-component-inner infopointdownload-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="scroller-component-template" type="text/template">
    </script>

    <script id="quiz-result-template" type="text/template">
    	<div class="component-styles">
	    	<div class="component-inner text-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    	</div>
    	<div class="text-component-handle"></div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="quiz-component-template" type="text/template">
    	<div class="component-inner quiz-component-inner">
    		<div class="quiz-body" style="<%= backgroundColor !== '' ? 'background:' + backgroundColor + ';' : '' %><%= textColor !== '' ? 'color:' + textColor + ';' : '' %>">
				<% _.each(answers, function(option, i) { %>
					<div class="answer-wrapper" style="left:<%=option.left%>px;top:<%=option.top%>px">
						<label>
							<input class="answer-checkbox" name="<%= actionkey %>" type="<%= multiselect ? 'checkbox' : 'radio' %>" <%= option.goodAnswer ? 'checked' : '' %> it="<%= i %>">
							<span class="answer-text" style="font-size:<%- fontSize %>px;" it="<%= i %>"><%= option.text %></span>
						</label>
					</div>
				<% }); %>
    		</div>
    		<div class="quiz-submit-button" style="display:<%= buttonShow ? 'inline-block' : 'none' %>;left:<%=submitButton.left%>px;top:<%=submitButton.top%>px;<%= buttonBackgroundColor !== '' ? 'background:' + buttonBackgroundColor + ';' : '' %><%= buttonTextColor !== '' ? 'color:' + buttonTextColor + ';' : '' %>"><%=submitButton.text%></div>
			<div class="quiz-component-handle"><input type="button" class="edit-component-button"></div>
		</div>
		<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="quizselectone-component-template" type="text/template">
    	<div class="component-inner quiz-component-inner">
    		<div class="quiz-body">
				<% _.each(answers, function(option, i) { %>
					<div class="answer-wrapper block-answer" style="left:<%=option.left%>px;top:<%=option.top%>px">
						<div class="selectone-block-answer" contenteditable="true" it="<%= i %>"><%- option.text %></div>
					</div>
				<% }); %>
    		</div>
		</div>
		<div class="quiz-component-handle"><input type="button" class="edit-component-button"></div>
		<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="quizfillinblanks-component-template" type="text/template">
    	<div class="component-styles">
	    	<div class="component-inner text-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="input-options-wrapper animated fadeInLeft">
    		<div class="change-to-input change-to-interactive" inter="input">Input</div>
    		<div class="change-to-select change-to-interactive" inter="select">Select</div>
    		<div class="change-to-textarea change-to-interactive" inter="textarea">Tekst area</div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="quizdnd-component-template" type="text/template">
		<div class="component-styles">
	    	<div class="component-inner text-component-inner quiz-dnd-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>

    </script>

    <script id="quizconnectlines-component-template" type="text/template">
		<div class="component-styles">
	    	<div class="component-inner text-component-inner quiz-connectlines-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    <script id="crossword-component-template" type="text/template">
    	<div class="component-inner crossword-component-inner"><!--
    		--><% _.each(rows, function(row) { %><!--
    			--><div rowid="<%= row %>" class="crossword-row"><!--
    				--><% _.each(cols, function(col) { %><!--
    					--><div class="crossword-cell-background" gender="<%= objs[row+'-'+col].type === 'question' ? objs[row+'-'+col].gender : '' %>"><!--
    						--><div class="crossword-cell-password"></div><!--
    						--><textarea class="crossword-cell <%= objs[row+'-'+col].type === 'question' ? 'crossword-cell-question' : '' %>"  <%= objs[row+'-'+col].type === 'question' ? '' : 'maxlength="1"' %> cellid="<%= row + '-' + col %>" cellx="<%= col %>" celly="<%= row %>" celltype="<%= objs[row+'-'+col].type %>"><%= objs[row+'-'+col].text %></textarea><!--
    					--></div><!--
    				--><% }); %><!--
    			--></div><!--
    		--><% }); %><!--
		--></div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="quiz-component-handle"><input type="button" class="edit-component-button"></div>
    </script>

    <script id="quizwordsearch-component-template" type="text/template">
    	<div class="quizwordsearch-component-inner"><!--
    		--><% _.each(rows, function(row) { %><!--
    			--><div rowid="<%= row %>" class="wordsearch-row"><!--
    				--><% _.each(cols, function(col) { %><!--
    					--><div class="wordsearch-cell-background"><!--
    						--><textarea class="wordsearch-cell"  maxlength="1" cellid="<%= row + '-' + col %>" cellx="<%= col %>" celly="<%= row %>" celltype="answers"><%= objs[row+'-'+col] %></textarea><!--
    					--></div><!--
    				--><% }); %><!--
    			--></div><!--
    		--><% }); %><!--
		--></div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="quiz-component-handle"><input type="button" class="edit-component-button"></div>
    </script>

    <script id="image-component-template" type="text/template">
    	<div class="component-styles">
	    	<div class="component-inner image-component-inner">
		    	<div class="progress-bar">
		    		<div class="progress-bar-text"></div>
		    		<div class="progress-bar-inner-wrapper">
						<div class="progress-bar-inner"></div>
		    		</div>
		    	</div>
	    		<div class="img-wrapper" style="opacity: <%= opacity %>">
					<img 
						src=""
						width="100%" 
						height="100%"
						 />
				</div>
				<div class="loaded-dropzone"></div>
			</div>
		</div>
    </script>

    <script id="video-component-template" type="text/template">
    	<div class="component-inner video-component-inner">
	    	<div class="progress-bar">
	    		<div class="progress-bar-text"></div>
	    		<div class="progress-bar-inner-wrapper">
					<div class="progress-bar-inner"></div>
	    		</div>
	    	</div>
    		<div class="video-wrapper">
    			<div class="video-image" style="background-image:url(../js/editors/standard/images/video<%=videoType%>.png)"></div>
			</div>
			<div class="loaded-dropzone"></div>
		</div>
    </script>

    <script id="timer-component-template" type="text/template">
    	<div class="component-styles">
	    	<div class="component-inner text-component-inner component-gradient" style="padding:<%=padding%>px">
	    		<%= contents %>
	    	</div>
    		<div class="text-component-handle"></div>
    	</div>
    	<div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>
    </script>

    


    


    <!-- EDITORS TEMPLATE -->
    <script id="editor-template" type="text/template">
		
    </script>

    <!-- EDITORS TEMPLATE -->
    <script id="multiple-editor-template" type="text/template">
		
    </script>

    <script id="style-editor-template" type="text/template">
		<div class="template-styles-container"><div>
    </script>


    <script id="have-style-editor-template" type="text/template">

    	<!--<fieldset class="width50">
		    	<input type="button" value="<?=Lang::get('editor.STYLE_RESET_STYLE') ?>" class="reset-style-template editor-settings-button"/>
		</fieldset>-->

		<div class="template-styles-container"><div>
    </script>

    <script id="forminputtext-editor-template" type="text/template">

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="form-text-placeholder"><?=Lang::get('editor.FORM_PLACEHOLDER') ?>:</label></td>
				                    <td><input name="placeholder" class="form-radio-group" id="form-text-placeholder" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-defaultvalue"><?=Lang::get('editor.FORM_VALUE_DEFAULT') ?>:</label></td>
				                    <td><input name="defaultvalue" class="form-radio-group" id="form-text-defaultvalue" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-fontsize"><?=Lang::get('editor.FORM_VALUE_FONTSIZE') ?>:</label></td>
				                    <td><input name="fontsize" class="form-radio-group" id="form-text-fontsize" type="number" min="1"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-maxlength"><?=Lang::get('editor.FORM_MAX_LENGTH') ?>:</label></td>
				                    <td><input name="maxlength" class="form-radio-group" id="form-text-maxlength" type="number" min="0"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-textalign"><?=Lang::get('editor.FORM_TEXTALIGN') ?>:</label></td>
				                    <td>
										<select name="textalign">
											<option value="left"><?=Lang::get('editor.Left') ?></option>
											<option value="center"><?=Lang::get('editor.Center') ?></option>
											<option value="right"><?=Lang::get('editor.Right') ?></option>
										</select>
				                    </td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    	
    </script>

    <script id="formupload-editor-template" type="text/template">

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>
    	
    </script>

    <script id="quizinputtext-editor-template" type="text/template">

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="form-text-placeholder"><?=Lang::get('editor.FORM_PLACEHOLDER') ?>:</label></td>
				                    <td><input name="placeholder" class="form-radio-group" id="form-text-placeholder" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-defaultvalue"><?=Lang::get('editor.FORM_VALUE_DEFAULT') ?>:</label></td>
				                    <td><input name="defaultvalue" class="form-radio-group" id="form-text-defaultvalue" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-fontsize"><?=Lang::get('editor.FORM_VALUE_FONTSIZE') ?>:</label></td>
				                    <td><input name="fontsize" class="form-radio-group" id="form-text-fontsize" type="number" min="1"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-maxlength"><?=Lang::get('editor.FORM_MAX_LENGTH') ?>:</label></td>
				                    <td><input name="maxlength" class="form-radio-group" id="form-text-maxlength" type="number" min="0"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-casesensitive"><?=Lang::get('editor.FORM_CASESENSITIVE') ?>:</label></td>
				                    <td><input name="casesensitive" id="form-text-casesensitive" type="checkbox"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-textalign"><?=Lang::get('editor.FORM_TEXTALIGN') ?>:</label></td>
				                    <td>
										<select name="textalign">
											<option value="left"><?=Lang::get('editor.Left') ?></option>
											<option value="center"><?=Lang::get('editor.Center') ?></option>
											<option value="right"><?=Lang::get('editor.Right') ?></option>
										</select>
				                    </td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010 maxwidth300">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_GOODANSWERS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<input type="text" class="forminputtext-goodanswers" value=""/>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-mark-question"><?=Lang::get('editor.QUIZ_MARK_QUESTIONS')?>:</label></td>
				                    <td><input name="mark-questions" id="quiz-mark-question" type="checkbox" class="margin010"></td>
				                </tr>
			                	<tr>
				                    <td><label for="quiz-selectone-feedbacks"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-show" id="quiz-selectone-feedbacks" type="checkbox" class="margin010"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-check-answer-after-press-enter"><?=Lang::get('editor.FORM_INPUT_CHECK_ANSWER_AFTER_PRESS_ENTER') ?>:</label></td>
				                    <td><input name="checkself" id="form-text-check-answer-after-press-enter" type="checkbox"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="formtextarea-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
				                <tr>
				                    <td><label for="form-text-defaultvalue"><?=Lang::get('editor.FORM_VALUE_DEFAULT') ?>:</label></td>
				                    <td><input name="defaultvalue" class="form-radio-group" id="form-text-defaultvalue" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-fontsize"><?=Lang::get('editor.FORM_VALUE_FONTSIZE') ?>:</label></td>
				                    <td><input name="fontsize" class="form-radio-group" id="form-text-fontsize" type="number" min="1"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-maxlength"><?=Lang::get('editor.FORM_MAX_LENGTH') ?>:</label></td>
				                    <td><input name="maxlength" class="form-radio-group" id="form-text-maxlength" type="number" min="0"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-textalign"><?=Lang::get('editor.FORM_TEXTALIGN') ?>:</label></td>
				                    <td>
										<select name="textalign">
											<option value="left"><?=Lang::get('editor.Left') ?></option>
											<option value="center"><?=Lang::get('editor.Center') ?></option>
											<option value="right"><?=Lang::get('editor.Right') ?></option>
										</select>
				                    </td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    	
    </script>

    <script id="formselect-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_SELECT_OPTIONS_TITLE') ?></span>
    				<button class="add-new-option ex-elements-box-addnew-button"><?=Lang::get('editor.FORM_ADD') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">

				    	<table>
				    		<thead>
					    		<tr>
						    		<th><?=Lang::get('editor.FORM_FIELDNAME') ?></th>
						    		<th><?=Lang::get('editor.FORM_STARTVALUE') ?></th>
						    		<th><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></th>
					    		</tr>
				    		</thead>
				    		<tbody class="formselect-answers">
				    			<% _.each(formData.selectOptions, function(option, i) { %>
				    				<tr>
				    					<td><input class="option-name" type="text" value="<%= option.option %>" it="<%= i %>"></td>
				    					<td><input class="option-startvalue" type="radio" name="startvalue" <%= option.startValue ? 'checked' : '' %> it="<%= i %>"></td>
				    					<td><div class="delete-icon margin0auto formselect-delete-option" it="<%= i %>"></div></td>
				    				</tr>
								<% }); %>
				    		</tbody>
				    	</table>
			        </div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="quizselect-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_SELECT_OPTIONS_TITLE') ?></span>
    				<button class="add-new-option ex-elements-box-addnew-button"><?=Lang::get('editor.FORM_ADD') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">

				    	<table>
				    		<thead>
					    		<tr>
						    		<th><?=Lang::get('editor.FORM_FIELDNAME') ?></th>
						    		<th><?=Lang::get('editor.FORM_GOODANSWER') ?></th>
						    		<th><?=Lang::get('editor.FORM_STARTVALUE') ?></th>
						    		<th><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></th>
					    		</tr>
				    		</thead>
				    		<tbody class="formselect-answers">
				    			<% _.each(formData.selectOptions, function(option, i) { %>
				    				<tr>
				    					<td><input class="option-name" type="text" value="<%= option.option %>" it="<%= i %>"></td>
				    					<td><input class="option-require" type="checkbox" <%= option.require ? 'checked' : '' %> it="<%= i %>"></td>
				    					<td><input class="option-startvalue" type="radio" name="startvalue" <%= option.startValue ? 'checked' : '' %> it="<%= i %>"></td>
				    					<td><div class="delete-icon margin0auto formselect-delete-option" it="<%= i %>"></div></td>
				    				</tr>
								<% }); %>
				    		</tbody>
				    	</table>
			        </div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-mark-question"><?=Lang::get('editor.QUIZ_MARK_QUESTIONS')?>:</label></td>
				                    <td><input name="mark-questions" id="quiz-mark-question" type="checkbox" class="margin010"></td>
				                </tr>
			                	<tr>
				                    <td><label for="quiz-selectone-feedbacks"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-show" id="quiz-selectone-feedbacks" type="checkbox" class="margin010"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-text-fontsize"><?=Lang::get('editor.FORM_VALUE_FONTSIZE') ?>:</label></td>
				                    <td><input name="fontsize" class="form-radio-group" id="form-text-fontsize" type="number" min="1"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-select-check-answer-after-change"><?=Lang::get('editor.FORM_SELECT_CHECK_ANSWER_AFTER_CHANGE') ?>:</label></td>
				                    <td><input name="checkself" id="form-select-check-answer-after-change" type="checkbox"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>

    </script>

    

    <script id="report-editor-template" type="text/template">

    </script>

    <script id="menu-panel-template" type="text/template">
     	Menu panel test
    </script>

    <script id="report-menu-panel-template" type="text/template">
     	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.REPORTS_NAME') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label><?=Lang::get('editor.REPORTS_NAME_LABEL')?>:</label></td>
				                    <td><input name="reportname" type="text" placeholder="<?=Lang::get('editor.REPORTS_NAME_PLACEHOLDER')?>" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="formradio-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="form-radio-group-forlbl"><?=Lang::get('editor.FORM_GROUPNAME')?>:</label></td>
				                    <td><input class="form-radio-group" id="form-radio-group-forlbl" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-radio-defaultvalue-forlbl"><?=Lang::get('editor.FORM_VALUE_DEFAULT')?>:</label></td>
				                    <td><input class="form-input-default-value" id="form-radio-defaultvalue-forlbl" type="checkbox"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-radio-size-forlbl"><?=Lang::get('editor.INPUTSIZE')?>:</label></td>
				                    <td><input class="form-radio-size" id="form-radio-size-forlbl" type="number" min="0"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="formcheckbox-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-checkbox-options">
			            <table>
			                <tbody>
			                	<tr>
				                    <td><label for="form-radio-group-forlbl"><?=Lang::get('editor.FORM_GROUPNAME')?>:</label></td>
				                    <td><input class="form-radio-group" id="form-radio-group-forlbl" type="text"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-checkbox-defaultvalue-forlbl"><?=Lang::get('editor.FORM_VALUE_DEFAULT')?>:</label></td>
				                    <td><input class="form-input-default-value" id="form-checkbox-defaultvalue-forlbl" type="checkbox"></td>
				                </tr>
				                <tr>
				                    <td><label for="form-checkbox-size-forlbl"><?=Lang::get('editor.INPUTSIZE')?>:</label></td>
				                    <td><input class="form-checkbox-size" id="form-checkbox-size-forlbl" type="number" min="0"></td>
				                </tr>
				            </tbody>
		            	</table>
			        </div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="formsubmit-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_ELEMS_TO_CHECK') ?></span>
    				<span class="formsubmit-editor-addobjects object-picker-icon"></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div>
		    			<% _.each(formFields, function(value, key) { %>
		    				<div class="form-object ex-object delete-on-hover" formob="<%= value %>"></div>
		    			<% }); %>
    				</div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-mark-question"><?=Lang::get('editor.QUIZ_MARK_QUESTIONS')?>:</label></td>
				                    <td><input name="mark-questions" id="quiz-mark-question" type="checkbox" class="margin010"></td>
				                </tr>
			                	<tr>
				                    <td><label for="quiz-selectone-feedbacks"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-show" id="quiz-selectone-feedbacks" type="checkbox" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    </script>


    <script id="formsubmitoptionswindow-template" type="text/template">
    	<div class="window-top-bar"><?=Lang::get("editor.SETTINGS")?></div>
    	<input type="button" class="window-close-button">
    	<fieldset>
    		<legend><?=Lang::get("editor.SETTINGS")?></legend>
    		<label>
    			<input type="checkbox" name="feedbacks" class="feedbacks">
    			<span><?=Lang::get("editor.feedbacks")?></span>
    		</label>
    	</fieldset>
    </script>

    <script id="iframe-editor-template" type="text/template">
    	<fieldset>
    		<legend><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></legend>
    		<input class="iframe-obj-editor-input" type="text" placeholder="ex. http://www.yoursite.com" value="<%= link %>">
    		<p><?=Lang::get('editor.IFRAME_INSERTER_NOTE') ?></p>
    	</fieldset>
    </script>

    <script id="swf-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (swfFileName === '') { %>
    					<div class="add-swf-file editor-settings-button"><%=_lang('MENU_POINT_ADDSWF')%></div>
    				<% } else { %>
						<figure class="image-gallery-figure">
							<div class="editor-swf-container"></div>
	    					<figcaption class="add-swf-file editor-settings-button"><%=_lang('MENU_POINT_ADDSWF')%></figcaption>
							<figcaption class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/swf/<%= actionkey %>/<%= swfFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></figcaption>
						</figure>
					<% } %>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="drawedinfopointlink-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.IFRAME_INSERTER_NOTE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
		    		<table>
			    		<tr>
				    		<td><?=Lang::get('editor.LINK') ?></td>
				    		<td><input name="link" type="text" placeholder="<?=Lang::get('editor.LINK_REQUEST') ?>" value="<%= link %>"></td>
			    		</tr>
			    		<tr>
				    		<td><?=Lang::get('editor.MENU_SAVEIFRAME') ?></td>
				    		<td><input name="iframe" type="checkbox" <%= openInIframe ? 'checked' : '' %>></td>
			    		</tr>
		    		</table>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<table>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_INACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_ACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_SHADOW_CHECKBOX') ?>:</td>
    						<td><input name="editor-shadow-checkbox" type="checkbox" <%= showShadow ? 'checked' : '' %>></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_BORDER_SIZE') ?>:</td>
    						<td><input name="editor-border-size-input" type="text" value="<%= borderSize %>"></td>
    					</tr>
    				</table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="drawedinfopointpopup-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
		    		<table>
			    		<tr>
				    		<td><?=Lang::get('editor.POINT_INPUT_TITLE') ?></td>
				    		<td><input type="text" value="<%= title %>"></td>
			    		</tr>
			    		<tr>
				    		<td><?=Lang::get('editor.POINT_INPUT_MESSAGE') ?></td>
				    		<td><textarea class="ckeditor-replace"><%= text %></textarea></td>
			    		</tr>
		    		</table>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<table>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_INACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_ACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_SHADOW_CHECKBOX') ?>:</td>
    						<td><input name="editor-shadow-checkbox" type="checkbox" <%= showShadow ? 'checked' : '' %>></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_BORDER_SIZE') ?>:</td>
    						<td><input name="editor-border-size-input" type="text" value="<%= borderSize %>"></td>
    					</tr>
    				</table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="drawedinfopointgallery-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.POINT_GALLERY_FILES') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% _.each(galleryFiles, function(option, index) { %>
    					<div>
    						<span><%= option %></span>
    						<div class="gallery-file-delete editor-settings-button" index="<%= index %>"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></div>
						</div>
    				<% }); %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<table>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_INACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_ACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_SHADOW_CHECKBOX') ?>:</td>
    						<td><input name="editor-shadow-checkbox" type="checkbox" <%= showShadow ? 'checked' : '' %>></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_BORDER_SIZE') ?>:</td>
    						<td><input name="editor-border-size-input" type="text" value="<%= borderSize %>"></td>
    					</tr>
    				</table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="drawedinfopointdownload-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<table>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_INACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_ACTIVE_LABEL') ?>:</td>
    						<td></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_SHADOW_CHECKBOX') ?>:</td>
    						<td><input name="editor-shadow-checkbox" type="checkbox" <%= showShadow ? 'checked' : '' %>></td>
    					</tr>
    					<tr>
    						<td><?=Lang::get('editor.POINT_INPUT_BORDER_SIZE') ?>:</td>
    						<td><input name="editor-border-size-input" type="text" value="<%= borderSize %>"></td>
    					</tr>
    				</table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="infopointpopup-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span>
						<button class="feedback-edit title-edit"><?=Lang::get('editor.EDIT')?></button>
			    		<div class="ckeditor-replace-title"><%= title %></div>
    				</span>
    			</div>
    			<div class="ex-elements-box-list minwidth200">
		    		<button class="feedback-edit message-edit"><?=Lang::get('editor.EDIT')?></button>
		    		<div class="ckeditor-replace-message"><%= text %></div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="infopointlink-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
		    		<table style="width:500px">
			    		<tr>
				    		<td><?=Lang::get('editor.LINK') ?></td>
				    		<td><input name="link" class="width80" type="text" placeholder="<?=Lang::get('editor.LINK_REQUEST')?>" value="<%= link %>"></td>
			    		</tr>
		    		</table>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="infopointsound-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.ADD_SOUND_PRESS_TITLE') ?></span>
    				<button class="add-sound-file ex-elements-box-addnew-button"><?=Lang::get('editor.AUTH_PROJECT_NEW') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (sound !== '') { %>
    				<div>
						<figure class="image-gallery-figure">
				    		<audio controls preload="none">
				    			<source src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/audio/<%= actionkey %>/<%= sound %>" type="audio/mpeg">
				    		</audio>
							<figcaption class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/audio/<%= actionkey %>/<%= sound %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></figcaption>
							<figcaption class="editor-delete-sound-file editor-settings-button redbutton"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></figcaption>
						</figure>
    				</div>
    				<% } else { %>
    				<div><?=Lang::get('editor.NOFILE') ?></div>
    				<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset>
    					<legend><?=Lang::get('editor.VOLUME') ?></legend>
    					<input name="sound-volume" type="range" min="0" max="100" value="<%= volume %>">
    				</fieldset>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="infopointsoundcontrol-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.ADD_SOUND_PRESS_TITLE') ?></span>
    				<button class="add-sound-file ex-elements-box-addnew-button"><?=Lang::get('editor.AUTH_PROJECT_NEW') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (sound !== '') { %>
    				<div>
						<figure class="image-gallery-figure">
				    		<audio controls preload="none">
				    			<source src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/audio/<%= actionkey %>/<%= sound %>" type="audio/mpeg">
				    		</audio>
							<figcaption class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/audio/<%= actionkey %>/<%= sound %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></figcaption>
							<figcaption class="editor-delete-sound-file editor-settings-button redbutton"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></figcaption>
						</figure>
    				</div>
    				<% } else { %>
    				<div><?=Lang::get('editor.NOFILE') ?></div>
    				<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="soundcontrol-noskin"><?=Lang::get('editor.SOUNDCONTROL_NOSKIN')?>:</label></td>
				                    <td><input name="noskin" id="soundcontrol-noskin" type="checkbox" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="infopointsoundrecord-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_POINT_RECORDSOUND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div>
    				TODO: zrobić nagrywanie dźwięku!

    				</div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="infopointgallery-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.POINT_GALLERY_FILES') ?></span>
    				<button class="add-gallery-file ex-elements-box-addnew-button"><?=Lang::get('editor.AUTH_PROJECT_NEW') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="tac">
    				<% if (galleryFiles.length > 0) { %>
	    				<% _.each(galleryFiles, function(option, index) { %>
	    						<figure class="image-gallery-figure">
			    					<img 
										src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/gallery/<%= actionkey %>/<%= option %>"
										width="100px" 
										height="100px"
										 />
	    							<figcaption class="gallery-file-delete editor-settings-button redbutton" index="<%= index %>"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></figcaption>
	    						</figure>
	    				<% }); %>
					<% } else { %>
						<?=Lang::get('editor.NOFILES')?>
					<% } %>


    				</div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="infopointdownload-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.INFOPOINT_DOWNLOAD_TITLE') ?></span>
    				<button class="add-download-file ex-elements-box-addnew-button add-file"><?=Lang::get('editor.AUTH_PROJECT_NEW') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (fileToDownload !== '') { %>
    				<div>
						<div class="editor-download-file-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/files/<%= actionkey %>/<%= fileToDownload %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
						<div class="editor-delete-file-file editor-settings-button redbutton"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></div>
    				</div>

    				<% } else { %>
    				<div><?=Lang::get('editor.NOFILE') ?></div>
    				<% } %>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.INFOPOINT_DOWNLOAD_FILE_NAME_TITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (fileToDownload !== '') { %>
    	
    				<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="use-new-download-file-name"><?=Lang::get('editor.USE_NEW_DOWNLOAD_FILE_NAME')?>:</label></td>
				                    <td><input name="use_new_download_file_name" id="use-new-download-file-name" type="checkbox" class="margin010"></td>
				                </tr>
			                	<tr>
				                    <td><label for="new_download_file_name"><?=Lang::get('editor.NEW_DOWNLOAD_FILE_NAME')?>:</label></td>
				                    <td><textarea name="new_download_file_name" id="new_download_file_name" type="text" class="margin010" rows="4" cols="50"></textarea></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>

    				<% } else { %>
    				<div><?=Lang::get('editor.NOFILE') ?></div>
    				<% } %>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="scroller-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<table>
		                <tbody>
		                	<tr>
			                    <td><label for="scroller-opt-chooser"><?=Lang::get('editor.SCROLLER_OPTS_TITLE')?>:</label></td>
			                    <td>
				    				<select name="scroller-opt" id="scroller-opt-chooser">
				    					<option value="none"><?=Lang::get('editor.SCROLLER_OPTS_DONOTHING') ?></option>
				    					<option value="on"><?=Lang::get('editor.SCROLLER_OPTS_TURN_ON') ?></option>
				    					<option value="off"><?=Lang::get('editor.SCROLLER_OPTS_TURN_OFF') ?></option>
				    				</select>
			                    </td>
			                </tr>
			                <tr>
			                    <td><label for="scroller-opt-scrolltime"><?=Lang::get('editor.SCROLLER_OPTS_TIME')?>:</label></td>
			                    <td><input id="scroller-opt-scrolltime" type="number" class="margin010" min="0"></td>
			                </tr>
		            	</tbody>
		            </table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="quiz-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-mark-question"><?=Lang::get('editor.QUIZ_MARK_QUESTIONS')?>:</label></td>
				                    <td><input name="mark-questions" id="quiz-mark-question" type="checkbox" class="margin010"></td>
				                </tr>
			                	<tr>
				                    <td><label for="quiz-multiselect-changetype"><?=Lang::get('editor.MULTISELECTQUIZ_CHANGE_QTYPE_CHECKBOX')?>:</label></td>
				                    <td><input name="multiselect" id="quiz-multiselect-changetype" type="checkbox" class="margin010"></td>
				                </tr>
				                <tr>
				                    <td><label for="quiz-multiselect-feedbacks"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-show" id="quiz-multiselect-feedbacks" type="checkbox" class="margin010"></td>
				                </tr>
				           <!--     <tr>
				                    <td><label for="quiz-multiselect-fsign"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SIGN_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-sign" id="quiz-multiselect-fsign" type="checkbox" class="margin010"></td>
				                </tr> -->
				                <tr>
				                    <td><label for="quiz-multiselect-showbutton"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SUBMIT_SWITCHER')?>:</label></td>
				                    <td><input name="button-show" id="quiz-multiselect-showbutton" type="checkbox" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PROPERTIES') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-font-size"><?=Lang::get('editor.FONT_SIZE')?>:</label></td>
				                    <td><input name="quiz-font-size" id="quiz-font-size" type="number" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    </script>


    <script id="quizselectone-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-mark-question"><?=Lang::get('editor.QUIZ_MARK_QUESTIONS')?>:</label></td>
				                    <td><input name="mark-questions" id="quiz-mark-question" type="checkbox" class="margin010"></td>
				                </tr>
				                <tr>
				                    <td><label for="quiz-selectone-feedbacks"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-show" id="quiz-selectone-feedbacks" type="checkbox" class="margin010"></td>
				                </tr>
				                <tr>
				                    <td><label for="quiz-selectone-fsign"><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_SIGN_SWITCHER')?>:</label></td>
				                    <td><input name="feedback-sign" id="quiz-selectone-fsign" type="checkbox" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>
    </script>


    <script id="quizfillinblanks-editor-template" type="text/template">

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<legend><?=Lang::get('editor.FORM_INPUT_OPTIONS_LEGEND') ?></legend>
			    		<label><span>Wielokrotny wybór:</span><input name="multiselect" type="checkbox" <%= multiselect ? 'checked' : '' %>></label>
			    		<label><span>Włącz odpowiedzi zwrotne:</span><input name="feedback-show" type="checkbox" <%= feedbackShow ? 'checked' : '' %>></label>
			    		<label><span>Oznaczenie odpowiedzi:</span><input name="feedback-sign" type="checkbox" <%= feedbackSign ? 'checked' : '' %>></label>
			    		<label><span>Pokaż przycisk:</span><input name="button-show" type="checkbox" <%= buttonShow ? 'checked' : '' %>></label>
			    		<label><span>Sprawdż enterem:</span><input name="check-self" type="checkbox" <%= checkSelf ? 'checked' : '' %>></label>

			    		<p><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></p>
			    		<textarea class="feedback-good"><%= feedbackGood %></textarea>
			    		<p><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></p>
			    		<textarea class="feedback-bad"><%= feedbackBad %></textarea>
			        </div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
				                <tr>
				                    <td><label for="text-editor-enable-scrollbar"><?=Lang::get('editor.SIMPLETEXT_SCROLL_SWITCHER') ?>: </td>
				                    <td><input type="checkbox" class="enable-scrollbar" id="text-editor-enable-scrollbar"></label></td>
				                </tr>
				                <tr>
				                    <td><label for="text-editor-padding"><?=Lang::get('editor.SIMPLETEXT_INDENT_TITLE') ?>: </td>
				                    <td><input type="number" class="text-editor-padding" id="text-editor-padding"></label></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    			<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    		</div>
    	</div>
    </script>

    <script id="quizdnd-editor-template" type="text/template">
    	<div class="dnd-editor-containers-wrapper margin010">
	    	<div class="dnd-editor-containers">
	    		<table class="dnd-editor-containers-table">
	    			<thead>
	    			<tr>
	    				<th class="dnd-table-lp"></th>
	    				<th class="dnd-tabel-containerob"><?=Lang::get('editor.DND_TABLE_OBJECT') ?></th>
	    				<th class="dnd-table-goodanswers"><?=Lang::get('editor.DND_TABLE_GOOD_ANSWERS') ?></th>
	    				<th class="dnd-table-options"><?=Lang::get('editor.DND_TABLE_OPTIONS') ?></th>
	    			</tr>
	    			</thead>
	    			<tbody>
	    				<% var iter = 1; %>
	    				<% _.each(answers, function(option, containerActionkey) { %>
    					<tr>
	    					<td><%= iter %></td>
	    					<td>
	    						<div class="ex-object" dndm="<%= containerActionkey %>" actionkey="<%= containerActionkey %>"></div>
	    						<div class="dnd-picker-container object-picker-icon" title="<?=Lang::get('editor.DND_REPLACE_CONTAINER') ?>" dndm="<%= containerActionkey %>" actionkey="<%= containerActionkey %>"></div>
    						</td>
	    					<td>
	    						<div class="dnd-picker-goodanswer object-picker-icon" dndm="<%= containerActionkey %>" title="<?=Lang::get('editor.DND_PICK_GOODANSWERS') ?>"></div>
	    						<% _.each(option.pa, function(answerActionkey, i) { %>
    							<div class="dnd-object-good ex-object delete-on-hover" dndg="<%= answerActionkey %>" dndm="<%= containerActionkey %>" actionkey="<%= answerActionkey %>"></div>
	    						<% }); %>
	    					</td>
	    					<td>
	    						<div class="dnd-container-edit edit-icon" dndm="<%= containerActionkey %>"></div>
	    						<div class="dnd-container-delete delete-icon" dndm="<%= containerActionkey %>"></div>
	    					</td>
    					</tr>
    					<% iter++; %>
	    				<% }); %>
	    				<tr>
	    					<td><%= iter %></td>
	    					<td><div class="dnd-picker-container object-picker-icon" title="<?=Lang::get('editor.DND_PICK_CONTAINER') ?>" dndm="new"></div></td>
	    					<td><div class="dnd-picker-goodanswer object-picker-icon" title="<?=Lang::get('editor.DND_PICK_GOODANSWERS') ?>"></div></td>
	    					<td></td>
	    				</tr>
	    			</tbody>
	    		</table>
	    	</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.DND_POSSIBLE_ANSWERS') ?></span>
    				<span class="dnd-editor-draggableobjs-addobjects object-picker-icon"></span>
    			</div>
    			<div class="ex-elements-box-list">
    			<% _.each(draggableObjs, function(value, key) { %>
    				<div class="dnd-object ex-object delete-on-hover" dndb="<%= value %>" actionkey="<%= value %>"></div>
    			<% }); %>
    			</div>
    		</div>
    	</div>


    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="editor-settings-field">
    				<div class="dnd-options-answers editor-settings-button"><?=Lang::get('editor.SETTINGS_EX') ?></div>
    				<div class="dnd-container-editall-container editor-settings-button"><?=Lang::get('editor.DND_EDITALL_CONTAINER') ?></div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="quizconnectlines-editor-template" type="text/template">
    	<div class="connectlines-editor-containers-wrapper margin010">
	    	<div class="connectlines-editor-containers">
	    		<table class="connectlines-editor-containers-table">
	    			<thead>
	    			<tr>
	    				<th class="connectlines-table-lp"></th>
	    				<th class="connectlines-tabel-source"><?=Lang::get('editor.QCL_TABLE_SOURCE') ?></th>
	    				<th class="connectlines-table-targets"><?=Lang::get('editor.QCL_TABLE_TARGET') ?></th>
	    				<th class="connectlines-table-options"><?=Lang::get('editor.QCL_TABLE_OPTIONS') ?></th>
	    			</tr>
	    			</thead>
	    			<tbody>
	    				<% var iter = 1; %>
	    				<% _.each(answers, function(option, line) { %>
    					<tr>
	    					<td><%= iter %></td>
	    					<td>
	    						<div class="ex-object ex-object-container" dndm="<%= option.from %>" actionkey="<%= option.from %>"></div>
	    						<div class="connectlines-picker-source object-picker-icon" dndm="<%= option.from %>" line="<%= line %>"></div>
	    					</td>
	    					<td>
	    						<div class="connectlines-picker-target object-picker-icon" dndm="<%= option.from %>" line="<%= line %>"></div>
	    						<% _.each(option.to, function(answerActionkey, i) { %>
    								<div class="connectlines-object-good ex-object" dndg="<%= answerActionkey %>" dndm="<%= option.from %>" line="<%= line %>" actionkey="<%= answerActionkey %>"></div>
	    						<% }); %>
	    					</td>
	    					<td>
	    						<div class="connectlines-container-edit edit-icon" dndm="<%= option.from %>" line="<%= line %>"></div>
	    						<div class="connectlines-container-delete delete-icon" dndm="<%= option.from %>" line="<%= line %>"></div>
	    					</td>
    					</tr>
    					<% iter++; %>
	    				<% }); %>
	    				<tr>
	    					<td><%= iter %></td>
	    					<td><div class="connectlines-picker-source object-picker-icon" dndm="new"></div></td>
	    					<td><div class="connectlines-picker-target object-picker-icon"></div></td>
	    					<td></td>
	    				</tr>
	    			</tbody>
	    		</table>
	    	</div>
	    	
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.QCL_POSSIBLE_ANSWERS') ?></span>
    				<span class="connectlines-editor-draggableobjs-addobjects object-picker-icon"></span>
    			</div>
    			<div class="ex-elements-box-list">
    			<% _.each(objs, function(value, key) { %>
    				<div class="connectlines-object ex-object" dndb="<%= key %>" actionkey="<%= key %>"></div>
    			<% }); %>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="editor-settings-field">
    				<div class="connectlines-options-answers editor-settings-button"><?=Lang::get('editor.SETTINGS_EX') ?></div>
    				<div class="connectlines-editall-objs editor-settings-button"><?=Lang::get('editor.QCL_EDITALL_CONNECTIONS') ?></div>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACKTITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_GOOD') ?></legend>
						<button class="feedback-edit feedback-good-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-good"><%=feedbackGood%></div>
    				</fieldset>
    				<fieldset class="minwidth200">
						<legend><?=Lang::get('editor.MULTISELECTQUIZ_FEEDBACK_BAD') ?></legend>
						<button class="feedback-edit feedback-bad-edit"><?=Lang::get('editor.EDIT')?></button>
						<div class="feedback-bad"><%=feedbackBad%></div>
    				</fieldset>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="crossword-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.QCrossword_edit_question_title') ?></span>
    			</div>
    			<div class="editor-settings-field">
    				<% if (activeCellID === '') activeCellID = '0-0'; %>
    				<% if (objs[activeCellID].type !== 'answer') { %>
    					<select class="qcrossword-field-type">
    						<option value="text" <%= objs[activeCellID].opts.questionType === 'text' ? 'selected' : '' %>><?=Lang::get('editor.QCrossword_question_type_text') ?></option>
    						<option value="image" <%= objs[activeCellID].opts.questionType === 'image' ? 'selected' : '' %>><?=Lang::get('editor.QCrossword_question_type_image') ?></option>
    						<option value="audio" <%= objs[activeCellID].opts.questionType === 'audio' ? 'selected' : '' %>><?=Lang::get('editor.QCrossword_question_type_audio') ?></option>
    					</select>
    					<% if (objs[activeCellID].opts.questionType === 'image') { %>
    						<div class="qcrossword-upload-image-button editor-settings-button"><?=Lang::get('editor.QCrossword_question_addImage') ?></div>
						<% } %>
    					<% if (objs[activeCellID].opts.questionType === 'audio') { %>
    						<div class="qcrossword-upload-audio-button editor-settings-button"><?=Lang::get('editor.QCrossword_question_addAudio') ?></div>
						<% } %>
    				<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.QCrossword_edit_cell_title') ?></span>
    			</div>
    			<div class="editor-settings-field">
    				<% if (activeCellID === '') activeCellID = '0-0'; %>
    				<% if (objs[activeCellID].type === 'answer') { %>
    					<div class="qcrossword-options-change-to-question editor-settings-button"><?=Lang::get('editor.QCrossword_change_to_answer') ?></div>
    				<% } else { %>
    					<div class="qcrossword-options-change-to-answer editor-settings-button"><?=Lang::get('editor.QCrossword_change_to_question') ?></div>
    				<% } %>

    				<% if (objs[activeCellID].type !== 'answer') { %>
	    				<div class="qcrossword-options-arrow" arrow-id="1"></div>
	    				<% if (parseInt(activeCellID.split('-')[1]) !== cols.length - 1) { %>
	    					<div class="qcrossword-options-arrow" arrow-id="2"></div>
	    				<% } %>
	    				<% if (parseInt(activeCellID.split('-')[1]) !== 0) { %>
	    					<div class="qcrossword-options-arrow" arrow-id="3"></div>
	    				<% } %>
	    				<div class="qcrossword-options-arrow" arrow-id="4"></div>
	    				<% if (parseInt(activeCellID.split('-')[0]) !== rows.length - 1) { %>
	    					<div class="qcrossword-options-arrow" arrow-id="5"></div>
	    				<% } %>
	    				<% if (parseInt(activeCellID.split('-')[0]) !== 0) { %>
	    					<div class="qcrossword-options-arrow" arrow-id="6"></div>
	    				<% } %>
	    				<% if (objs[activeCellID].gender !== '') { %>
    					<div class="clear"></div>
	    				<div class="qcrossword-options-remove-arrow editor-settings-button redbutton"><?=Lang::get('editor.QCrossword_remove_arrow') ?></div>
	    				<% } %>
    				<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="editor-settings-field">
    				<div class="qcrossword-options-add-new-row editor-settings-button"><?=Lang::get('editor.QCrossword_add_new_row') ?></div>
    				<div class="qcrossword-options-add-new-column editor-settings-button"><?=Lang::get('editor.QCrossword_add_new_column') ?></div>
    				<div class="qcrossword-options-setting editor-settings-button"><?=Lang::get('editor.SETTINGS') ?></div>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="quizwordsearch-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="wordsearch-table-wrapper">
	    		<table class="wordsearch-editor-table">
	    			<thead>
	    			<tr>
	    				<th class="wordsearch-table-lp"></th>
	    				<th class="wordsearch-tabel-letters"><?=Lang::get('editor.Qwordsearch_table_source')?></th>
	    				<th class="wordsearch-table-options"><?=Lang::get('editor.Qwordsearch_table_options')?></th>
	    			</tr>
	    			</thead>
	    			<tbody>
	    				<% _.each(answers, function(word, key) { %>
	    				<tr>
	    					<td><%= key %></td>
	    					<td>
	    						<% _.each(word.objs, function(letter) { %>
	    							<div class="wordsearch-letter delete-on-hover" word="<%= key %>" letter="<%= letter %>"><%= objs[letter] %></div>
	    						<% }) %>
	    						<div class="wordsearch-letter-picker object-picker-icon" title="<?=Lang::get('editor.Qwordsearch_picker')?>" word="<%= key %>"></div>
	    					</td>
	    					<td><div class="wordsearch-delete-word delete-icon" word="<%= key %>"></div></td>
	    				</tr>
	    				<% }) %>
	    				<tr>
	    					<td>...</td>
	    					<td><div class="wordsearch-letter-picker object-picker-icon" word="new"></div></td>
	    					<td><div class="wordsearch-delete-word delete-icon" word="new"></div></td>
	    				</tr>
	    			</tbody>
	    		</table>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="editor-settings-field">
    				<div class="wordsearch-options-add-new-row editor-settings-button"><?=Lang::get('editor.QCrossword_add_new_row') ?></div>
    				<div class="wordsearch-options-add-new-column editor-settings-button"><?=Lang::get('editor.QCrossword_add_new_column') ?></div>
    				<div class="wordsearch-options-setting editor-settings-button"><?=Lang::get('editor.SETTINGS') ?></div>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="stage-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PAGE_PROP_NAME_LABEL') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
			    	<label><input type="text" class="pagename"></label>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PAGE_PROP_BG_TITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (image === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('PAGE_PROP_BG_ADD')%></div>
    				<% } else { %>
						<div 
							class="image-preview"
							style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= pageid %>/imgpage/<%= image %>')"
							>
						</div>
						<div class="editor-buttons-wrapper">
	    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('PAGE_PROP_BG_CHANGE')%></div>
							<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= pageid %>/imgpage/<%= image %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
						</div>
						<div class="editor-delete-background-file editor-settings-button redbutton"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></div>
					<% } %>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PAGE_PROP_BGCOLOR_LABEL') ?></span>
    			</div>
    			<div class="ex-elements-box-list tac">
		            <div class="color-picker-wide stage-background-color-picker"></div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<table>
		                <tbody>
		                	<tr>
			                    <td><label for="stage-editor-locknavi"><?=Lang::get('editor.PAGEPROP_LOCKNAVI_LBL') ?>:</label></td>
			                    <td><input class="page-prop-lock-navi-input margin010" id="stage-editor-locknavi" type="checkbox"></td>
			                </tr>
			                <tr>
			                    <td><label for="after-finish-page-goto-next"><?=Lang::get('editor.AFTER_FINISH_PAGE_GOTO_NEXT') ?>:</label></td>
			                    <td><input class="after-finish-page-goto-next margin010" id="after-finish-page-goto-next" type="checkbox"></td>
			                </tr>
			                <tr>
			                    <td><label for="after-finish-page-highlight-navigation-buttons"><?=Lang::get('editor.AFTER_FINISH_PAGE_HIGHLIGHT_NAVIGATION_BUTTONS') ?>:</label></td>
			                    <td><input class="after-finish-page-highlight-navigation-buttons margin010" id="after-finish-page-highlight-navigation-buttons" type="checkbox"></td>
			                </tr>
			                <tr>
		            	</tbody>
		            </table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="timeline-editor-template" type="text/template">
	    <div class="fieldset-row">
			<fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_TIME') ?></legend>
		    	<input type="number" step="0.1" placeholder="<?=Lang::get('editor.TIMELINE_TIME_TOEND') ?>" min="0" value="---" class="timeline-editor-object-lifetime">
		    </fieldset>
		    <fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_TIME_SHOWTIME') ?></legend>
		    	<input type="number" step="0.1" placeholder="<?=Lang::get('editor.TIMELINE_TIME_START') ?>" min="0" value="---" class="timeline-editor-object-showtime">
		    </fieldset>
	    </div>
	    <div class="fieldset-row">
			<fieldset class="width100">
		    	<legend><?=Lang::get('editor.TIMELINE_ANIMATION') ?></legend>
		    	<table>
		    		<tbody>
			    		<tr>
			    			<td class="animation-block-td">
			    				<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_IN') ?></div>
			    				<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-in timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_OUT') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-out timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_HOVER') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-over timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_CONSTANT') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-endless timeline-animation-block editor-settings-button">
			    			</td>
		    			</tr>
		    		</tbody>
		    	</table>
		    </fieldset>
	    </div>
    </script>

    <script id="timeline-editor-collection-template" type="text/template">
	    <div class="fieldset-row">
			<fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_TIMES') ?></legend>
		    	<input type="number" placeholder="<?=Lang::get('editor.TIMELINE_TIME_TOEND') ?>" min="0" value="---" class="timeline-editor-object-lifetime">
		    </fieldset>
	    </div>
	    <div class="fieldset-row">
			<fieldset class="width100">
		    	<legend><?=Lang::get('editor.TIMELINE_ANIMATIONS') ?></legend>
		    	<table>
		    		<tbody>
			    		<tr>
			    			<td class="animation-block-td">
			    				<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_IN') ?></div>
			    				<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-in timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_OUT') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-out timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_HOVER') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-over timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_CONSTANT') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-endless timeline-animation-block editor-settings-button">
			    			</td>
		    			</tr>
		    		</tbody>
		    	</table>
		    </fieldset>
	    </div>
    </script>

    <script id="timeline-editor-stage-template" type="text/template">
    	<div class="fieldset-row">
			<fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_STAGE_TIMES') ?></legend>
		    	<input type="number" min="0" value="---" class="timeline-editor-stage-lifetime">
		    </fieldset>

		    <fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_TIMELINE') ?></legend>
		    	<div class="change-timeline-button editor-settings-button"><?=Lang::get('editor.TIMELINE_CHANGE_TIMELINE') ?></div>
		    </fieldset>

			

	    </div>
    </script>

    <script id="timeline-editor-row-template" type="text/template">
    	<div class="fieldset-row">
			<fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_TIMES') ?></legend>
		    	<input type="number" placeholder="<?=Lang::get('editor.TIMELINE_TIME_TOEND') ?>" min="0" value="---" class="timeline-editor-object-lifetime">
		    </fieldset>
			<fieldset class="width50">
		    	<legend><?=Lang::get('editor.TIMELINE_DELAY') ?></legend>
		    	<input type="number" placeholder="" min="0" class="timeline-editor-line-delay">
		    </fieldset>
	    </div>
    	<div class="fieldset-row">
			<fieldset class="width100">
		    	<legend><?=Lang::get('editor.TIMELINE_ANIMATIONS') ?></legend>
		    	<table>
		    		<tbody>
			    		<tr>
			    			<td class="animation-block-td">
			    				<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_IN') ?></div>
			    				<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-in timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_OUT') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-out timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_HOVER') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-over timeline-animation-block editor-settings-button">
			    			</td>
			    			<td class="animation-block-td">
				    			<div class="animation-block-title"><?=Lang::get('editor.TIMELINE_ANIMATIONS_CONSTANT') ?></div>
				    			<input type="button" value="<?=Lang::get('editor.ANIMATION_NONE') ?>" class="timeline-editor-add-animation-endless timeline-animation-block editor-settings-button">
			    			</td>
		    			</tr>
		    		</tbody>
		    	</table>
		    </fieldset>
	    </div>
    </script>

    <script id="wcag-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010 width80 <%if (!wcag) { %>boxnotactive<% } %> ">
    		<div class="ex-elements-box width100">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.WCAG_BOX_TITLE') ?></span>
    				<label class="ex-elements-box-addnew-button">
	    				<?=Lang::get('editor.MENU_WCAG_READELEMENT') ?>
	    				<input type="checkbox" class="wcag-editor-consider">
    				</label>
    			</div>
    			<div class="ex-elements-box-list">
    				<textarea class="wcag-editor-to-read width100" style="height:100px" placeholder="<?=Lang::get('editor.MENU_WCAG_TA_LABEL')?>"></textarea>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="parallaxe-editor-template" type="text/template">


    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PARALLAX_CURSOR')?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<label>
						<?=Lang::get('editor.PARALLAX_ONOFF')?>
						<input id="parallax-switcher-cursor" class="parallax-switcher" type="checkbox" <%= parallax.cursor.on == true ? 'checked' : '' %> >
					</label>

					<div class="parallax-options-cursor-container">
					
						<label title="<?=Lang::get('editor.PARALLAX_CURSOR_FOLLOW_HINT')?>">
							<?=Lang::get('editor.PARALLAX_CURSOR_FOLLOW')?>
							<input id="parallax-direction-cursor" <%= parallax.cursor.on == false ? 'disabled' : '' %> type="checkbox" <%= parallax.cursor.dir == true ? 'checked' : '' %>>
						</label>
						
						<label title="<?=Lang::get('editor.PARALLAX_CURSOR_SENSITIVITY_HINT')?>">
							<?=Lang::get('editor.PARALLAX_SENSITIVITY')?>
							<input id="parallax-sensitivity-cursor" <%= parallax.cursor.on == false ? 'disabled' : '' %> type="number" value="<%= parallax.cursor.sens %>"> 
							<span>%</span>
						</label>
					</div>
    			</div>
    		</div>
    	</div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PARALLAX_SCROLL')?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<label><?=Lang::get('editor.PARALLAX_ONOFF')?>
						<input id="parallax-switcher-scroll" class="parallax-switcher" type="checkbox" <%= parallax.scroll.on == true ? 'checked' : '' %>>
					</label>

					<div class="parallax-options-scroll-container">
					
						<label title="<?=Lang::get('editor.PARALLAX_SCROLL_SENSITIVITY_HINT')?>">
							<?=Lang::get('editor.PARALLAX_SCROLL_MULTIPLIER')?>
							<input id="parallax-sensitivity-scroll" <%= parallax.scroll.on == false ? 'disabled' : '' %> type="number" value="<%= parallax.scroll.sens %>"> 
						</label>

					</div>	
    			</div>
    		</div>
    	</div>

    </script>

    <script id="score-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010 score-global-options">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.REQUIRE_PASSING_TITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
		            <table>
		                <tbody>
			                <tr>
			                    <td><label for="scoring-reqire-pages"><?=Lang::get('editor.REQUIRE_PASSING_PAGES')?></label></td>
			                    <td><input id="scoring-reqire-pages" type="checkbox"></td>
			                    <td></td>
			                    <td></td>
			                </tr>
			                <tr>
			                    <td><label for="scoring-reqire-points"><?=Lang::get('editor.REQUIRE_PASSING_POINTS')?></label></td>
			                    <td><input id="scoring-reqire-points" type="checkbox"></td>
			                    <td></td>
			                    <td></td>
			                </tr>
			                <tr>
			                    <td><label for="scoring-reqire-points-percent"><?=Lang::get('editor.REQUIRE_PASSING_POINTS_PERCENT')?>:</label></td>
			                    <td><input id="scoring-reqire-points-percent" type="number" min="0" max="100"></td>
			                    <td></td>
			                    <td></td>
			                </tr>
			                <tr>
			                    <td><label for="scoring-reqire-points-number"><?=Lang::get('editor.REQUIRE_PASSING_POINTS_NUMBER')?>:</label></td>
			                    <td><input id="scoring-reqire-points-number" type="number" min="0"></td>

			                    <td><label for="scoring-calculate_points-automatically"><?=Lang::get('editor.REQUIRE_PASSING_POINTS_CALCULATE_AUTOMATICALLY')?></label></td>
			                    <td><input id="scoring-calculate_points-automatically" type="checkbox"></td>

			                </tr>
			            </tbody>
	            	</table>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="publish-score-editor-template" type="text/template">

		<div class="ex-elements-box-list">
            <table>
                <tbody>
	                <tr>
	                    <td><label for="scoring-reqire-pages"><?=Lang::get('editor.REQUIRE_PASSING_PAGES')?></label></td>
	                    <td><input id="scoring-reqire-pages" type="checkbox"></td>
	                    <td></td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td><label for="scoring-reqire-points"><?=Lang::get('editor.REQUIRE_PASSING_POINTS')?></label></td>
	                    <td><input id="scoring-reqire-points" type="checkbox"></td>
	                    <td></td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td><label for="scoring-reqire-points-percent"><?=Lang::get('editor.REQUIRE_PASSING_POINTS_PERCENT')?>:</label></td>
	                    <td><input id="scoring-reqire-points-percent" type="number" min="0" max="100"></td>
	                    <td></td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td><label for="scoring-reqire-points-number"><?=Lang::get('editor.REQUIRE_PASSING_POINTS_NUMBER')?>:</label></td>
	                    <td><input id="scoring-reqire-points-number" type="number" min="0"></td>

	                    <td><label for="scoring-calculate_points-automatically"><?=Lang::get('editor.REQUIRE_PASSING_POINTS_CALCULATE_AUTOMATICALLY')?></label></td>
	                    <td><input id="scoring-calculate_points-automatically" type="checkbox"></td>

	                </tr>
	            </tbody>
        	</table>
		</div>

    </script>

    <script id="score-exercise-empty-editor-template" type="text/template">

    </script>

    <script id="score-exercise-editor-template" type="text/template">

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.REQUIRE_EXERCISE_PASSING_TITLE') ?></span>
    			</div>
    			<div class="ex-elements-box-list scoring-inputs-container" visible="true">
		            <table>
		                <tbody>

		                	<% if(changeValueAction.changeValueActionPassed.length > 1) { %>

				                <tr>
				                    <td><label disabled="disabled" for="scoring-reqire-exercise-points-aaccess-number"><?=Lang::get('editor.REQUIRE_PASSING_EXERCISE_POINTS_ACCESS_NUMBER')?>:</label></td>
				                    <td><input disabled="disabled" class="scoring-reqire-exercise-points-aaccess" id="scoring-reqire-exercise-points-aaccess-number" type="number"></td>
				                    <td><div class="scoring-changevarvalue-info" title="<?=Lang::get('editor.TOOLTIP_0124')?>"></div></td>
				                </tr>

			                <% } else { %>
			                
			                	<tr>
				                    <td><label for="scoring-reqire-exercise-points-aaccess-number"><?=Lang::get('editor.REQUIRE_PASSING_EXERCISE_POINTS_ACCESS_NUMBER')?>:</label></td>
				                    <td><input class="scoring-reqire-exercise-points-aaccess" id="scoring-reqire-exercise-points-aaccess-number" type="number"></td>
				                </tr>

			                <% } %>	

			                <% if(changeValueAction.changeValueActionFailed.length > 1) { %>

				                <tr>
				                    <td><label disabled="disabled" for="scoring-reqire-exercise-points-fail-number"><?=Lang::get('editor.REQUIRE_PASSING_EXERCISE_POINTS_FAIL_NUMBER')?>:</label></td>
				                    <td><input disabled="disabled" class="scoring-reqire-exercise-points-fail" id="scoring-reqire-exercise-points-fail-number" type="number"></td>
				                    <td><div class="scoring-changevarvalue-info" title="<?=Lang::get('editor.TOOLTIP_0124')?>"></div></td>
				                </tr>

			                <% } else { %>
			                
			                	<tr>
				                    <td><label for="scoring-reqire-exercise-points-fail-number"><?=Lang::get('editor.REQUIRE_PASSING_EXERCISE_POINTS_FAIL_NUMBER')?>:</label></td>
				                    <td><input class="scoring-reqire-exercise-points-fail" id="scoring-reqire-exercise-points-fail-number" type="number"></td>
				                </tr>

			                <% } %>

			                <% if(changeValueAction.changeValueActionBadAnswer.length > 1) { %>

				                <tr>
				                    <td><label disabled="disabled" for="scoring-reqire-exercise-points-bad-answer-number"><?=Lang::get('editor.REQUIRE_PASSING_EXERCISE_POINTS_BAD_ANSWER_NUMBER')?>:</label></td>
				                    <td><input disabled="disabled" class="scoring-reqire-exercise-points-bad-answer" id="scoring-reqire-exercise-points-bad-answer-number" type="number"></td>
				                    <td><div class="scoring-changevarvalue-info" title="<?=Lang::get('editor.TOOLTIP_0124')?>"></div></td>
				                </tr>

			                <% } else { %>
			                
			                	<tr>
				                   <td><label for="scoring-reqire-exercise-points-bad-answer-number"><?=Lang::get('editor.REQUIRE_PASSING_EXERCISE_POINTS_BAD_ANSWER_NUMBER')?>:</label></td>
				                   <td><input class="scoring-reqire-exercise-points-bad-answer" id="scoring-reqire-exercise-points-bad-answer-number" type="number"></td>
				                </tr>

			               <% } %>
			                
			            </tbody>
			            </tbody>
	            	</table>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
			                	<tr>
				                    <td><label for="quiz-multiselect-attempts"><?=Lang::get('editor.MULTISELECTQUIZ_ATTEMPTS')?>:</label></td>
				                    <td><input name="attempts" id="quiz-multiselect-attempts" type="number" min="0" placeholder="<?=Lang::get('editor.MULTISELECTQUIZ_ATTEMPTS_PLACEHOLDER')?>" class="margin010"></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    		</div>
    	</div>

    </script>

    <script id="pagenote-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010 width80">
    		<div class="ex-elements-box width100">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.PAGE_NOTE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<textarea name="page-note" class="width100" style="height:100px"></textarea>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="sound-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.ADD_SOUND_PRESS_TITLE') ?></span>
    				<% if (typeof actionkey !== 'undefined' || (typeof pagename !== 'undefined')) { %>
    				<button class="<%= typeof actionkey !== 'undefined' ? 'add-sound-file-to-component' : 'add-sound-file-to-page' %> ex-elements-box-addnew-button"><?=Lang::get('editor.AUTH_PROJECT_NEW') ?></button>
    				<% } %>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if ((typeof actionkey !== 'undefined' && (type === 'infopoint-sound' || type ==='infopoint-sound-control' && sound !== '')) || (typeof actionkey !== 'undefined' && (this.model.get('point-sound') !== ''))) { %>
    				<div>
						<figure class="image-gallery-figure">
				    		<audio controls preload="none">
				    			<source src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/<%= type === 'infopoint-sound' || type === 'infopoint-sound-control' ? 'audio' : 'sounds' %>/<%= actionkey %>/<%= type === 'infopoint-sound'  || type === 'infopoint-sound-control' ? sound : this.model.get('point-sound') %>" type="audio/mpeg">
				    		</audio>
							<figcaption class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/<%= type === 'infopoint-sound' || type ==='infopoint-sound-control' ? 'audio' : 'sounds' %>/<%= actionkey %>/<%= type === 'infopoint-sound' || type === 'infopoint-sound-control' ? sound : this.model.get('point-sound') %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></figcaption>
							<figcaption class="editor-delete-component-sound-file editor-settings-button redbutton"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></figcaption>
						</figure>
    				</div>
    				<% } else if (typeof pagename !== 'undefined' && soundfilename !== '') { %>
    				<div>
						<figure class="image-gallery-figure">
				    		<audio controls preload="none">
				    			<source src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= pageid %>/audio/page/<%= soundfilename %>" type="audio/mpeg">
				    		</audio>
							<figcaption class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= pageid %>/audio/page/<%= soundfilename %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></figcaption>
							<figcaption class="editor-delete-page-sound-file editor-settings-button redbutton"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></figcaption>
						</figure>
    				</div>
    				<% } else { %>
    				<div><?=Lang::get('editor.NOFILE') ?></div>
    				<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
				                <tr>
				                    <td><label for="autoplay-sound-checkbox"><?=Lang::get('editor.ADD_SOUND_ENABLEONSTART') ?>: </td>
				                    <td><input type="checkbox" class="autoplay-sound" id="autoplay-sound-checkbox"></label></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    				<fieldset>
    					<legend><?=Lang::get('editor.VOLUME') ?></legend>
    					<input name="sound-volume" type="range" min="0" max="100" value="<%= volume %>">
    				</fieldset>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="sound-uploader-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.ADD_SOUND_PRESS_TITLE') ?></span>
    				<button class="add-sound-to-project ex-elements-box-addnew-button"><?=Lang::get('editor.AUTH_PROJECT_NEW') ?></button>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (soundfilename !== '') { %>
    				<div>
						<figure class="image-gallery-figure">
				    		<audio controls preload="none">
				    			<source src="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/projectsound/<%= soundfilename %>" type="audio/mpeg">
				    		</audio>
							<figcaption class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/projectsound/<%= soundfilename %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></figcaption>
							<figcaption class="editor-delete-project-sound-file editor-settings-button"><?=Lang::get('editor.AUTH_SHARE_DELETE') ?></figcaption>
						</figure>
    				</div>
    				<% } else { %>
    				<div><?=Lang::get('editor.NOFILE') ?></div>
    				<% } %>
    			</div>
    		</div>
    	</div>

        <div class="progress-bar">
    		<div class="progress-bar-text"></div>
    		<div class="progress-bar-inner-wrapper">
				<div class="progress-bar-inner"></div>
    		</div>
    	</div>
		<div class="loaded-dropzone"></div>

    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
	                    <label><?=Lang::get('editor.ADD_SOUND_LOOP') ?>: 
	                    	<input type="checkbox" id="loop-sound-project-checkbox">
	                    </label>
			        </div>
					<legend><?=Lang::get('editor.VOLUME') ?></legend>
					<input name="sound-volume" type="range" min="0" max="100" value="<%= sound_vol %>">
    			</div>
    		</div>
    	</div>
    </script>

    <script id="size-and-position-editor-template" type="text/template">
		<fieldset>
			<div class="xycolumn size-and-position-editor-column">
				<label>
					<div class="size-and-position-editor-column-label">X</div>
					<input type="number" name="position-x">
				</label>

				<label>
					<div class="size-and-position-editor-column-label">Y</div>
					<input type="number" name="position-y">
				</label>
			</div>

			<div class="whcolumn size-and-position-editor-column">
				<label>
					<div class="size-and-position-editor-column-label">W</div>
					<input type="number" name="width">
				</label>

				<div class="aspectratio">
					<div id="aspectRatioOverlay"></div>
					<input id="aspectRatio" type="checkbox">
					<label for="aspectRatio"></label>
				</div>
				<label>
					<div class="size-and-position-editor-column-label">H</div>
					<input type="number" name="height">
				</label>
			</div>
		</fieldset>
		<div class="rotate-row">
			<div class="size-and-position-editor-column-label rotateangle-label"></div>
			<input type="number" id="rotateAngle">
		</div>

		<div class="flip-row">
			<div class="flip-button flip-x-button" title="<?=Lang::get('editor.FLIP_X_TITLE') ?>"></div>
			<div class="flip-button flip-y-button" title="<?=Lang::get('editor.FLIP_Y_TITLE') ?>"></div>
		</div>
    </script>

    <script id="align-editor-template" type="text/template">
    	<div class="align-container">
			<div class="align-top-menu">
				<?=Lang::get('editor.ALIGN_TITLE')?>
				<div class="align-ul">
					<ul>
						<li class="align-li" align="top" title="<?=Lang::get('editor.TIMELINE_ALIGN_TOP')?>"></li>
						<li class="align-li" align="down" title="<?=Lang::get('editor.TIMELINE_ALIGN_BOTTOM')?>"></li>
						<li class="align-li" align="left" title="<?=Lang::get('editor.TIMELINE_ALIGN_LEFT')?>"></li>
						<li class="align-li" align="right" title="<?=Lang::get('editor.TIMELINE_ALIGN_RIGHT')?>"></li>
						<li class="align-li" align="middlex" title="<?=Lang::get('editor.TIMELINE_ALIGN_MIDDLEX')?>"></li>
						<li class="align-li" align="middley" title="<?=Lang::get('editor.TIMELINE_ALIGN_MIDDLEY')?>"></li>
						<li class="align-li" align="redistributex" title="<?=Lang::get('editor.TIMELINE_ALIGN_REDISTRIBUTEX')?>"></li>
						<li class="align-li" align="redistributey" title="<?=Lang::get('editor.TIMELINE_ALIGN_REDISTRIBUTEY')?>"></li>
					</ul>
				</div>
			</div>
		</div>
    </script>

    <script id="text-editor-template" type="text/template">
		<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SIMPLETEXT_BGCOLOR') ?></span>
    			</div>
    			<div class="ex-elements-box-list tac">
    				<div class="text-color-picker-container text-solid-color-picker"></div>
    			</div>
    		</div>
    	</div>
		<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
				                <tr>
				                    <td><label for="text-editor-enable-scrollbar"><?=Lang::get('editor.SIMPLETEXT_SCROLL_SWITCHER') ?>: </td>
				                    <td><input type="checkbox" class="enable-scrollbar" id="text-editor-enable-scrollbar"></label></td>
				                </tr>
				                <tr>
				                    <td><label for="text-editor-padding"><?=Lang::get('editor.SIMPLETEXT_INDENT_TITLE') ?>: </td>
				                    <td><input type="number" class="text-editor-padding" id="text-editor-padding"></label></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    			<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    		</div>
    	</div>
    </script>

    <script id="timer-editor-template" type="text/template">
        <div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS_TIMER') ?></span>
    			</div>
    			<div class="ex-elements-box-list tac">
                    <label title="<?=Lang::get('editor.TIME_AUTO_START_HINT')?>">
                        <?=Lang::get('editor.AUTO_START')?>
                        <input type="checkbox" class="counter-autostart">
                    </label>
                    
                    <hr/>

    				<label title="<?=Lang::get('editor.TIMER_ID_HINT')?>">
                        ID:
                        <input type="text" class="counter-id">
                    </label>
    			</div>
    		</div>
    	</div>   
        <div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.TIME_SETTINGS') ?></span>
    			</div>
    			
    			<div class="ex-elements-box-list tac">
    			<table class="timer-time-options">
	            	<tr>
                        <td><?=Lang::get('editor.HOURS')?>:</td>
                        <td><input type="number" class="counter-hourstocount" min="0"></td>
                        <td><input type="checkbox" class="counter-hoursenabled"></td>
                    </tr>
                    <tr>
                        <td><?=Lang::get('editor.MINUTES')?>:
                        <td><input type="number" class="counter-minutestocount" min="0" max="59"></td>
                        <td><input type="checkbox" class="counter-minutesenabled"></td>
                    </tr>
                    <tr>
                        <td><?=Lang::get('editor.SECONDS')?>:
                        <td><input type="number" class="counter-secondstocount" min="0" max="59"></td>
                        <td><input type="checkbox" class="counter-secondsenabled"></td>
                    </tr>
    			</table>
                </div>
    		</div>
    	</div>        

		<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SIMPLETEXT_BGCOLOR') ?></span>
    			</div>
    			<div class="ex-elements-box-list tac">
    				<div class="text-color-picker-container text-solid-color-picker"></div>
    			</div>
    		</div>
    	</div>
		<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<div class="form-radio-options">
						<table>
			                <tbody>
				                <tr>
				                    <td><label for="text-editor-enable-scrollbar"><?=Lang::get('editor.SIMPLETEXT_SCROLL_SWITCHER') ?>: </td>
				                    <td><input type="checkbox" class="enable-scrollbar" id="text-editor-enable-scrollbar"></label></td>
				                </tr>
				                <tr>
				                    <td><label for="text-editor-padding"><?=Lang::get('editor.SIMPLETEXT_INDENT_TITLE') ?>: </td>
				                    <td><input type="number" class="text-editor-padding" id="text-editor-padding"></label></td>
				                </tr>
			            	</tbody>
			            </table>
			        </div>
    			</div>
    			<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    		</div>
    	</div>
    </script>

    <script id="image-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">

    				<label><?=Lang::get('editor.ALPHA_LBL') ?>: <input type="range" name="opacity" min="0" max="1" step="0.1" value="<%= opacity %>"></label>

    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_IMAGE') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<% if (imageFileName === '') { %>
    					<div class="add-image-background-to-page editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
    				<% } else { %>
							<div 
								class="image-preview"
								style="background-image:url('<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %><%= '?r=' + rand %>')"
								>
							</div>
							<div class="editor-buttons-wrapper">
								<div class="edit-image-file editor-settings-button"><%=_lang('MENU_IMAGE_EDIT')%></div>
		    					<div class="add-image-file editor-settings-button"><%=_lang('MENU_IMAGE_CHANGE')%></div>
								<div class="editor-download-sound-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/images/<%= actionkey %>/<%= imageFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
							</div>
					<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.MENU_OPTIONS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
    				<div class="editor-crop-image-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_JCROP') ?></div>
    				<div class="editor-resize-to-stage-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_SCALE_TO_STAGE') ?></div>
    				<div class="editor-original-size-button editor-settings-button"><?=Lang::get('editor.MENU_IMAGE_ORIGINAL_SIZE') ?></div>
    				<div class="editor-add-border-button editor-settings-button"><?=Lang::get('editor.EDITOR_ADD_BORDER_BUTTON_NAME') ?></div>
    			</div>
    		</div>
    	</div>
    </script>

    <script id="video-editor-template" type="text/template">
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<% if (videoType == 1) { %>
						<div class="editor-video-add-file editor-settings-button"><?=Lang::get('editor.VIDEO_EDITOR_ADD')?></div>
					<% } else { %>
						<input type="text" class="video-editor-link-holder">
					<% } %>
	    			
	    			<% if (videoFileName !== '') { %>
	    			<div class="editor-video-download-file editor-settings-button"><a href="<%=__meta__.projects_link%><%= __meta__.ownerID %>/<%= __meta__.projectID %>/pre/exported_view/<%= actionkey.split('-').pop() %>/videos/<%= actionkey %>/<%= videoFileName %>" download><?=Lang::get('editor.BUTTON_DOWNLOAD') ?></a></div>
	    			<div class="editor-video-delete-file editor-settings-button redbutton"><?=Lang::get('editor.MENU_DELETE_FILE')?></div>
	    			<% } %>
    			</div>
    		</div>
    	</div>
    	<div class="ex-elements-box-wrapper margin010">
    		<div class="ex-elements-box">
    			<div class="ex-elements-box-header">
    				<span><?=Lang::get('editor.SETTINGS') ?></span>
    			</div>
    			<div class="ex-elements-box-list">
					<table>
		                <tbody>
		                	<tr>
			                    <td><label for="video-autoplay-chck"><?=Lang::get('editor.VIDEOPROP_AUTOPLAY') ?>:</label></td>
			                    <td><input name="video-autoplay-chck" id="video-autoplay-chck" type="checkbox"></td>
			                </tr>
		                	<tr>
			                    <td><label for="video-controls-chck"><?=Lang::get('editor.VIDEOPROP_CONTROLS') ?>:</label></td>
			                    <td><input name="video-controls-chck" id="video-controls-chck" type="checkbox"></td>
			                </tr>
		                	<tr>
			                    <td><label for="video-loop-chck"><?=Lang::get('editor.VIDEOPROP_LOOP') ?>:</label></td>
			                    <td><input name="video-loop-chck" id="video-loop-chck" type="checkbox"></td>
			                </tr>
		            	</tbody>
		            </table>
    			</div>
    		</div>
    	</div>
    </script>


    <!-- PROJECTS LIST-->
    <script id="projectslist-controller-template" type="text/template">

		<div class="breadcrumb-view"></div>
		<div class="clearfix"></div>

		<div class="search-wrapper"></div>

		<hr class="projectlist-hr"/>

		<div class="clearfix"></div>

		<div class="folders-tree-view"></div>
		<div class="projects-list-views"></div>
	</script>

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
	</script>

	<script id="projectslist-shared-template-folder-item-template" type="text/template">
	    <div class="foldername edit-folder-name"><i class="fa folder-icon fa-star fa-2x"></i> <span class="edit-folder-name-button"><%-name%></span></div>
	</script>

	<script id="projectslist-project-item-template" type="text/template">
	    Project
	</script>

	<script id="projectslist-normal-project-item-template" type="text/template">

		<div class="project-block">
			<div class="thumbnail visible">
				<div class="image-container">
					<a class="open-project-href">
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
				</div>
			</div>
		</div>
		

	    <div></div>
	</script>

	<script id="projectslist-template-project-item-template" type="text/template">

		<div class="project-block">
			<div class="thumbnail visible">
				<div class="image-container">
					<a class="open-project-href">
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
				</div>
			</div>
		</div>
		

	    <div></div>
	</script>

	<script id="projectslist-shared-to-user-project-item-template" type="text/template">
		
		<div class="project-block">
			<div class="thumbnail visible">
				<div class="image-container">
					<a class="open-project-href">
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
	</script>

	<script id="projectslist-no-exist-share-user-item-template" type="text/template">
	    <div class="share-user-email"><%-mail%></div>
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

	<script id="projectslist-shared-template-breadcrumb-item-template" type="text/template">
	    <div class="breadcrumb-item breadcrumb-item-shared-template"><%-name == 'DARKAN_MAIN_PROJECTS_FOLDER_NAME' ? Lang.get('projects.myprojects') : name %></div> <span class="breadcrumb-arrow">></span>
	</script>

	<script id="projectslist-tree-item-template" type="text/template">
	    Tree default
	</script>

	<script id="projectslist-normal-tree-item-template" type="text/template">
	    <i class="fa folder-icon fa-folder fa-2x"></i><span><%-name == 'DARKAN_MAIN_PROJECTS_FOLDER_NAME' ? Lang.get('projects.myprojects') : name %></span>
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

	<script id="window-template" type="text/template"></script>


	<script id="popup-template" type="text/template">
		
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

	<script id="preloader-view-template" type="text/template">
		<div class="preloader-animation"></div>
    </script>

    <script id="preloader-view-preview-template" type="text/template">
		<div class="preloader-animation preloader-preview-animation"></div>
    </script>


	<!-- Markup for Carson Shold's Photo Selector -->
	<!-- <div id="CSPhotoSelector">
		<div class="CSPhotoSelector_dialog">
			<a id="CSPhotoSelector_buttonClose">x</a>
			<div class="CSPhotoSelector_form">
				<div class="CSPhotoSelector_header">
					<p>Choose from Photos</p>
				</div>

				<div class="CSPhotoSelector_content CSAlbumSelector_wrapper">
					<p>Browse your albums until you find a picture you want to use</p>
					<div class="CSPhotoSelector_searchContainer CSPhotoSelector_clearfix">
						<div class="CSPhotoSelector_selectedCountContainer">Select an album</div>
					</div>
					<div class="CSPhotoSelector_photosContainer CSAlbum_container"></div>
				</div>

				<div class="CSPhotoSelector_content CSPhotoSelector_wrapper">
					<p>Select a new photo</p>
					<div class="CSPhotoSelector_searchContainer CSPhotoSelector_clearfix">
						<div class="CSPhotoSelector_selectedCountContainer"><span class="CSPhotoSelector_selectedPhotoCount">0</span> / <span class="CSPhotoSelector_selectedPhotoCountMax">0</span> photos selected</div>
						<a id="CSPhotoSelector_backToAlbums">Back to albums</a>
					</div>
					<div class="CSPhotoSelector_photosContainer CSPhoto_container"></div>
				</div>

				<div id="CSPhotoSelector_loader"></div>


				<div class="CSPhotoSelector_footer CSPhotoSelector_clearfix">
					<a id="CSPhotoSelector_pagePrev" class="CSPhotoSelector_disabled">Previous</a>
					<a id="CSPhotoSelector_pageNext">Next</a>
					<div class="CSPhotoSelector_pageNumberContainer">
						Page <span id="CSPhotoSelector_pageNumber">1</span> / <span id="CSPhotoSelector_pageNumberTotal">1</span>
					</div>
					<a id="CSPhotoSelector_buttonOK">OK</a>
					<a id="CSPhotoSelector_buttonCancel">Cancel</a>
				</div>
			</div>
		</div>
	</div> -->

	<!-- JS -->

	<!-- JQUERY -->
	<script src="{{asset('/js/editors/standard/libs/jquery/jq11.js') }}?r=<?php echo config('app.version') ?>"></script>
    <script src="{{asset('/js/editors/standard/libs/jquery/jqui.js') }}?r=<?php echo config('app.version') ?>"></script>

    <script src="{{asset('/js/editors/standard/content_template/js/libs/jplayer/jquery.jplayer.min.js') }}?r=<?php echo config('app.version') ?>"></script>

    <script type="text/javascript">
		$.ajaxSetup({
			headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
		});
    </script>

	<!-- SWFOBJECT -->
	<script src="{{asset('/js/editors/standard/libs/swfobject/jquery.swfobject.1-1-1.min.js') }}?r=<?php echo config('app.version') ?>"></script>


	<!-- MD5 -->
	<script src="{{asset('/js/editors/standard/libs/md5/md5.js') }}?r=<?php echo config('app.version') ?>"></script>

	<!-- CHOSEN SELECT -->
    <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/chosen/chosen.min.css') }}?r=<?php echo config('app.version') ?>" />
    <script src="{{asset('/js/editors/standard/libs/chosen/chosen.jquery.min.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- ROTATABLE -->
    <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/rotatable/jquery.ui.rotatable.css') }}?r=<?php echo config('app.version') ?>" />
    <script src="{{asset('/js/editors/standard/libs/rotatable/jquery.ui.rotatable.js') }}?r=<?php echo config('app.version') ?>"></script>

	<!-- PERFECT SCROLLBAR -->
	<script src="{{asset('/js/editors/standard/content_template/js/libs/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- CKEDITOR -->
    <script src="{{asset('/js/editors/standard/libs/ckeditor/ckeditor.js') }}?r=<?php echo config('app.version') ?>"></script>


    <!-- PRELOAD JS -->
    <script src="{{asset('/js/editors/standard/libs/preload/preload.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- DROPBOX -->
    {{--<script type="text/javascript" src="http://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="vlm7l7me37z4nfx"></script>--}}

	<!-- FACEBOOK PHOTO CHOOSER -->



    <!-- MAIN LIBS -->
	<script src="{{asset('/js/editors/standard/libs/underscore/underscore.js') }}?r=<?php echo config('app.version') ?>"></script>
	<script src="{{asset('/js/editors/standard/modules/utils/underscore_extend.js') }}?r=<?php echo config('app.version') ?>"></script>
	<script src="{{asset('/js/editors/standard/libs/backbone/backbone.js') }}?r=<?php echo config('app.version') ?>"></script>
	<script src="{{asset('/js/editors/standard/libs/backbone/backbone.stickit.js') }}?r=<?php echo config('app.version') ?>"></script>
	<script src="{{asset('/js/editors/standard/libs/backbone/backbone.controller.js') }}?r=<?php echo config('app.version') ?>"></script>
   	<script src="{{asset('/js/editors/standard/server/socket.io/node_modules/socket.io-client/socket.io.js') }}"></script>

    <link href="{{ asset('/js/editors/standard/content_template/js/libs/video-js/video-js.css') }}?r=<?php echo config('app.version') ?>" rel="stylesheet" type="text/css">
    <script src="{{asset('/js/editors/standard/content_template/js/libs/video-js/video.js') }}?r=<?php echo config('app.version') ?>"></script>
    <script src="{{asset('/js/editors/standard/content_template/js/libs/video-js/vjs.youtube.js') }}?r=<?php echo config('app.version') ?>"></script>
    <script src="{{asset('/js/editors/standard/content_template/js/libs/video-js/vjs.vimeo.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- CHOSEN -->
    <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/chosen/chosen.min.css') }}?r=<?php echo config('app.version') ?>" />
    <script src="{{asset('/js/editors/standard/libs/chosen/chosen.jquery.min.js') }}?r=<?php echo config('app.version') ?>"></script>

	<!-- TAGS INPUT -->
    <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/tags/tagsinput.css') }}?r=<?php echo config('app.version') ?>" />
    <script src="{{asset('/js/editors/standard/libs/tags/tagsinput.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- JS CROP -->
    <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/jcrop/jquery.Jcrop.min.css') }}?r=<?php echo config('app.version') ?>" />
    <script src="{{asset('/js/editors/standard/libs/jcrop/jquery.Jcrop.min.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- SPECTRUM -->
    <link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/spectrum/spectrum.css') }}?r=<?php echo config('app.version') ?>" />
    <script src="{{asset('/js/editors/standard/libs/spectrum/spectrum.js') }}?r=<?php echo config('app.version') ?>"></script>

    <!-- GRADIENT PICKER -->
	<link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/gradient-plugin/jquery.gradientPicker.css') }}?r=<?php echo config('app.version') ?>" type="text/css" />
	<link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/gradient-plugin/css/colorpicker.css') }}?r=<?php echo config('app.version') ?>" type="text/css" />
	<script src="{{asset('/js/editors/standard/libs/gradient-plugin/js/colorpicker.js') }}?r=<?php echo config('app.version') ?>"></script>
	<script src="{{asset('/js/editors/standard/libs/gradient-plugin/jquery.gradientPicker.js') }}?r=<?php echo config('app.version') ?>"></script>

	<script src="{{asset('/js/editors/standard/libs/base64/base64_encoding,js.js') }}?r=<?php echo config('app.version') ?>"></script>



	<script>
    $.getJSON('library/library_info.json', function(json) {
        libraryInfo = json;
    });

    $.getJSON('library/library_tags.json', function(json) {
        libraryTags = json;
    });
	</script>


   	<!-- UTILS -->

	<!-- SUMMERNOTE -->
	<script type="text/javascript" src="{{asset('/js/editors/standard/libs/bootstrap/bootstrap.js') }}"></script>
	<!-- Custom Fonts -->
    <link href="{{ asset('/js/editors/standard/css/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">

	<link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/summernote/summernote.css') }}?r=<?php echo config('app.version') ?>" />
	<link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/summernote/snote-bs2.css') }}?r=<?php echo config('app.version') ?>" />
	<link rel="stylesheet" href="{{ asset('/js/editors/standard/libs/summernote/snote-bs3.css') }}?r=<?php echo config('app.version') ?>" />


	<!-- HISTORY -->



	<!-- NODE WEB SERVICE -->

	<!-- SOCKET IO -->

	<!-- PHP / FAKE WEB SERVICE -->



	<!-- FILE UPLOADER-->



	

	<!-- ITEM VIEW-->


	<!-- COMPONENTS MODELS-->

	<!-- COMPONENTS VIEWS-->

	<!-- COMPONENTS MINIATURE VIEWS-->


	<!-- COMPONENTS COLLECTION-->

	<!-- COMPONENTS TRIGGER-->
	
	


	<!-- SELECTOR MODEL-->

	<!-- SELECTOR VIEW-->
	

	<!-- EDITORS -->
	

	<!-- EDITORS FACTORY -->

	<!-- STYLES EDITORS -->
	





	


	<!-- COMPONENTS FACTORY -->

	

	<!-- TIMELINE -->
	<!-- -->

	<!-- TIMELINE LAYERS -->
	

	<!-- TIMELINE CLASSIC -->
 	
 	
	<!-- PAGES -->


	


	<!-- INTERFACE -->


	<!-- STAGE -->

	<!-- MAIN LAYOUT -->

	
    <!-- PROJECT -->

	<!-- MENUS -->

   

    <!-- WINDOWS -->

	<!-- WINDOW IMAGE -->

	<!-- WINDOW SAVE PROJECT -->

	<!-- WINDOW BORDER -->

	<!-- WINDOW VIDEO -->

	<!-- WINDOW EXPORT -->

	<!-- WINDOW IMPORT -->

	<!-- WINDOW NEWPAGE -->



	<!-- WINDOW STARTING NEWPAGE -->


	<!-- WINDOW MAILING -->

	<!-- WINDOW PUBLISH -->

	<!-- WINDOW LIBRARY -->

	<!-- WINDOW PROJECT OPTIONS -->

	<!-- PAGE DRAW -->


	<!-- WINDOW SHARE -->

	<!-- WINDOW PREVIEW -->

	<!-- WINDOW ANIMATION -->




	<!-- WINDOW BAIZER -->


	

	
	
	

    <!-- WINDOW DATA PICKER -->

    

	 <!-- CONTEXT MENU -->

	


	 <!-- POPUPS -->


	<!-- USER -->
   

    <!-- DATA PICKER -->

	<!-- CREATE NEW VARIABLE -->
	<link rel="stylesheet" href="{{ asset('/js/editors/standard/modules/windows/create_new_variable/create_new_variable.css') }}?r=<?php //echo config('app.version') ?>" />





	<!-- WINDOW TRIGGER MODELS -->





    <!-- WINDOW TRIGGER VIEWS -->
	









	


	<!-- WINDOW ADD NEW PAGE PROGRESS -->



	

	<!-- WINDOW ADD NEW PAGE PROGRESS -->



	<!-- WINDOWS FACTORY -->


    
    <!-- .......................... CONNECT THE LINES ............................ -->
    <!-- support lib for bezier stuff -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/jsBezier-0.6.js') }}"></script>
    <!-- event adapter -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/mottle-0.4.js') }}"></script>
    <!-- geom functions -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/biltong-0.2.js') }}"></script>
    <!-- jsplumb util -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/util.js') }}"></script>
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/browser-util.js') }}"></script>
    <!-- base DOM adapter -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/dom-adapter.js') }}"></script>
    <!-- main jsplumb engine -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/jsPlumb.js') }}"></script>
    <!-- endpoint -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/endpoint.js') }}"></script>
    <!-- connection -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/connection.js') }}"></script>
    <!-- anchors -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/anchors.js') }}"></script>
    <!-- connectors, endpoint and overlays  -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/defaults.js') }}"></script>
    <!-- bezier connectors -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/connectors-bezier.js') }}"></script>
    <!-- state machine connectors -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/connectors-statemachine.js') }}"></script>
    <!-- flowchart connectors -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/connectors-flowchart.js') }}"></script>
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/connector-editors.js') }}"></script>
    <!-- SVG renderer -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/renderers-svg.js') }}"></script>
    <!-- vml renderer -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/renderers-vml.js') }}"></script>
    <!-- common adapter -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/base-library-adapter.js') }}"></script>
    <!-- jquery jsPlumb adapter -->
    <script src="{{asset('/js/editors/standard/content_template/js/libs/connectlines/lib/jquery.jsPlumb.js') }}"></script>

	
	<!-- APP INIT -->


   	<!-- ALL SCRIPTS -->
   	<?php if (env('APP_ENV') == 'production'): ?>
   	<script type="text/javascript" src="{{asset('/js/editors/standard/libs/yui.js') }}?r=<?php echo config('app.version') ?>"></script>
   	<?php else: ?>
   	<?php require_once base_path('/js/editors/standard/utilities/scripts.templ'); ?>
	<?php endif; ?>


	<script>


		if(Utils.isChrome()){

			var link = $('<link rel="stylesheet" href="{{asset('/js/editors/standard/css/browsers/chrome.css') }}?r=<?php echo config('app.version') ?>" />');
			$('head').append(link);
		}


		if(Utils.isFirefox()){

			var link = $('<link rel="stylesheet" href="{{asset('/js/editors/standard/css/browsers/firefox.css') }}?r=<?php echo config('app.version') ?>" />');
			$('head').append(link);
		}


		if(Utils.getInternetExplorerVersion() != -1){

			var link = $('<link rel="stylesheet" href="{{asset('/js/editors/standard/css/browsers/ie.css') }}?r=<?php echo config('app.version') ?>" />');
			$('head').append(link);
		}
		
	</script>

	<!-- RESPONSIVE CSS -->
	<link rel="stylesheet" href="{{ asset('/js/editors/standard/css/responsive/1366.css') }}?r=<?php echo config('app.version') ?>" />



</body>
</html>