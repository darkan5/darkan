@extends('web.layout')

@section('title')
{{ Lang::get('apidocs.title') }}
@stop

@section('description')
{{ Lang::get('apidocs.description') }}
@stop

@section('content')
<link href="{{ asset('/css/apidocs.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>


<div id="main-content-wrapper" class="col-md-10 col-md-offset-1">

	<div class="footer-content content-company container col-md-12" >
		<div class="featurette-top">
			<div class="header-wrapper">
				<h4><a href="{{ url('/apidocs') }}">{{ Lang::get('apidocs.go_back') }}</a></h4>
				<h2><?= Lang::get('apidocs.p_1_1') ?> <a href="{{ url('/apidemo') }}">{{ Lang::get('apidocs.see_demo') }}</a></h2>
				<hr/>

				<p><?= Lang::get('apidocs.p_1_2') ?></p>
				<code class="language-terminal">
{{ htmlentities('<script type="text/javascript" src="https://darkan.eu/js/editors/standard/api/darkan_editor_api.js"></script>') }}
				</code>

				<p><?= Lang::get('apidocs.p_1_3') ?></p>
				<code class="language-terminal">
{{ htmlentities('<iframe id="darkan-iframe" width="1280" height="720"></iframe>') }}
				</code>

				<p><?= Lang::get('apidocs.p_1_4') ?></p>
				<code class="language-terminal">
YOUR_API_KEY = 88e1a99e1531edad4a6c20179ffc3b575ef3aa3f
				</code>

				<p><?= Lang::get('apidocs.p_1_5') ?></p>
				<div class="col-md-6">
					<code class="language-terminal">
<strong>Request:</strong>					
POST: https://darkan.eu/api
Params: {
	"apikey": "YOUR_API_KEY",
	"action": "generateToken"
}
					</code>
				</div>
				<div class="col-md-6">
					<code class="language-terminal">
<strong>Response:</strong>					
{
	"token":"3Ww540Ob7o11hUWvapXaT7UX2I8kFtsh",
 	"message":"success",
 	"status":"success"
}
					</code>
				</div>
				<div class="clearfix"></div>

				<p><?= Lang::get('apidocs.p_1_6') ?></p>
				<code class="language-terminal">
YOUR_HASHED_API_KEY = sha1(YOUR_API_KEY + token)
				</code>

				<p><?= Lang::get('apidocs.p_1_7') ?></p>
				<code class="language-terminal">
		
<?= Lang::get('apidocs.p_1_7a') ?></br>

				</code>

				<p><?= Lang::get('apidocs.p_1_8') ?></p>
				<code class="language-terminal">
		
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_MESSAGE, onMessage);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_CONNECT, onConnect);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_PAGE_ADDED, onPageAdded);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_PAGES_REMOVED, onPagesRemoved);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_PAGE_SELECTED, onPageSelected);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_PROJECT_LOADED, onProjectLoaded);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_PAGES_COLLECTION_CHANGED, onPagesCollectionChanged);
darkanEditorAPI.addEventListener(DarkanEditorAPI.ON_PROJECT_CHANGED, onProjectChanged);

function onMessage(e){
     console.log('darkanEditorAPI onMessage', e);
}


function onConnect(e){
     console.log('darkanEditorAPI onConnect', e);
}

function onPageAdded(e){
     console.log('darkanEditorAPI onPageAdded', e);
}

function onPagesRemoved(e){
     console.log('darkanEditorAPI onPagesRemoved', e);
}

function onPageSelected(e){
     console.log('darkanEditorAPI onPageSelected', e);
}

function onProjectLoaded(e){
     console.log('darkanEditorAPI onProjectLoaded', e);
}

function onPagesCollectionChanged(e){
     console.log('darkanEditorAPI onPagesCollectionChanged', e);
}

function onProjectChanged(e){
     console.log('darkanEditorAPI onProjectChanged’, e);
}

				</code>

				<p><?= Lang::get('apidocs.p_1_9') ?></p>

				<p><?= Lang::get('apidocs.p_1_10') ?></p>
				<code class="language-terminal">
darkanEditorAPI.goToNextPage();
				</code>

				<p><?= Lang::get('apidocs.p_1_11') ?></p>
				<code class="language-terminal">
darkanEditorAPI.goToPrevPage();
				</code>

				<p><?= Lang::get('apidocs.p_1_12') ?></p>
				<code class="language-terminal">
darkanEditorAPI.goToPage({pageIndex:1});
				</code>

				<p><?= Lang::get('apidocs.p_1_13') ?></p>
				<code class="language-terminal">
darkanEditorAPI.sortPages({pageIndex:1, position:0});
				</code>

			</div>
		</div>
	</div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection