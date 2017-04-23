@extends('web.layout')

@section('title')
{{ Lang::get('apidocs.title') }}
@stop

@section('description')
{{ Lang::get('apidocs.description') }}
@stop

@section('content')
<link href="{{ asset('/css/apidocs.css') }}" rel="stylesheet">




<div class="subpage-image-container">
	<div class="subpage-image">
		<img src="{{ asset('/css/img/slide-02.jpg') }}" />
	</div>
</div>


<div id="main-content-wrapper" class="col-md-10 col-md-offset-1">

	<div class="footer-content content-company container col-md-12" >
		<div class="featurette-top">
			<div class="header-wrapper">
				<h2><?= Lang::get('apidocs.p_2_1') ?></h2>
				<hr/>

				<p><?= Lang::get('apidocs.p_2_2') ?></p>
				<code class="language-terminal">
YOUR_API_KEY = 827a6760f90c246705b3c712fa072bd06760fab3
				</code>

				<p><?= Lang::get('apidocs.p_2_3') ?></p>
				<div class="col-md-6">
					<code class="language-terminal">
POST: https://darkan.eu/api
Params: {
	"apikey": "YOUR_API_KEY",
	"action": "generateToken"
}
					</code>
				</div>
				<div class="col-md-6">
					<code class="language-terminal">
{
	"token":"3Ww540Ob7o11hUWvapXaT7UX2I8kFtsh",
 	"message":"success",
 	"status":"success"
}
					</code>
				</div>
				<div class="clearfix"></div>

				<p><?= Lang::get('apidocs.p_2_4') ?></p>
				<code class="language-terminal">
YOUR_HASHED_API_KEY = sha1(YOUR_API_KEY + token)
				</code>


				<p><?= Lang::get('apidocs.p_2_5') ?></p>
				<p>
					<?= Lang::get('apidocs.p_2_6') ?>
				</p>
				<div class="col-md-6">
					<code class="language-terminal">
POST: https://darkan.eu/api
Params: {
	"apikey": "YOUR_HASHED_API_KEY",
	"action": "addNewProject",
	"projectName": "Nazwa projektu",
	"dimensions": "860x645",
	"skin": "sk01",
	"autoScale": "1"
}
					</code>
				</div>
				<div class="col-md-6">
					<code class="language-terminal">

{
	"pid":35,
	"pname":"PROJECT_NAME",
	"message":"success",
	"status":"success",
	"projectData":
		{
			"dimentions":"860x645",
			"external":1,
			"name":"PROJECT_NAME",
			"skin":"sk01",
			"status":0,
			"template":0,
			"user_id":"3",
			"version":"2.0.0",
			"project_id":35,
			"pType":
			"userProjects"
		}
}

					</code>
				</div>
				<div class="clearfix"></div>

				<p><?= Lang::get('apidocs.p_2_7') ?></p>

			</div>
		</div>
	</div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection