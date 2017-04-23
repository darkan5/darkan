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
				<h2><?= Lang::get('apidocs.p_2_1') ?></h2>
				<hr/>

				<p><?= Lang::get('apidocs.p_2_2') ?></p>
				<code class="language-terminal">
YOUR_API_KEY = 88e1a99e1531edad4a6c20179ffc3b575ef3aa3f
				</code>

				<p><?= Lang::get('apidocs.p_2_3') ?></p>
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
<strong>Request:</strong>					
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
<strong>Response:</strong>
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



<div class="footer-content content-company container col-md-12" >
		<div class="featurette-top">
			<div class="header-wrapper">
				<h2><?= Lang::get('apidocs.p_3_1') ?></h2>
				<hr/>

				<p><?= Lang::get('apidocs.p_3_2') ?></p>
				<code class="language-terminal">
YOUR_API_KEY = 88e1a99e1531edad4a6c20179ffc3b575ef3aa3f
				</code>

				<p><?= Lang::get('apidocs.p_3_3') ?></p>
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

				<p><?= Lang::get('apidocs.p_3_4') ?></p>
				<code class="language-terminal">
YOUR_HASHED_API_KEY = sha1(YOUR_API_KEY + token)
				</code>


				<p><?= Lang::get('apidocs.p_3_5') ?></p>
				<p>
					<?= Lang::get('apidocs.p_3_6') ?>
				</p>
				<div class="col-md-6">
					<code class="language-terminal">
<strong>Request:</strong>					
POST: https://darkan.eu/api
Params: {
	"apikey": "YOUR_HASHED_API_KEY",
	"action": "publishProject",
	"projectId": "35"
}
					</code>
				</div>
				<div class="col-md-6">
					<code class="language-terminal">
<strong>Response:</strong>					
{
	"status":
		{
			"code":100,
			"message":
			"Sukces",
			"success":true
		},
		"data":
		{
			"publicationId":3,
			"link":"https://darkan.eu/storage/app/
publications_external/a41eab5a14a09e448cef86bae6ddc904.zip"
		}
		}
}
					</code>
				</div>
				<div class="clearfix"></div>

				<p><?= Lang::get('apidocs.p_3_7') ?></p>
				<p><?= Lang::get('apidocs.p_3_8') ?></p>

				<code class="language-terminal">
<strong>Response:</strong>				
{
	"status":
		{
			"code":205,
			"message":"Project is empty",
			"success":false
		},
	"data":
		{
			"projectId":"35"
		}
}
				</code>

			</div>
		</div>
	</div>




	
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection