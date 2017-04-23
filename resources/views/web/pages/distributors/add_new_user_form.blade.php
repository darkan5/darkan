@extends('layouts.app')

@section('content')
<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>

<ul>
    @foreach($errors->all() as $error)
		<div class="bs-example col-md-10 col-md-offset-1">
		    <div class="alert alert-warning">
		        <a href="#" class="close" data-dismiss="alert">&times;</a>
		        <strong>Warning!</strong> {{ $error }}
		    </div>
		</div>
    @endforeach
</ul>



<div class="col-md-8 col-md-offset-2">
	
	<div class="form-group">
		<a href="{{ url('/administration/dashboard') }}" class="btn btn-success">Powrót do listy</a>
	</div>
	
	<h4 class="col-md-offset-2">Dodaj nowego użytkownika</h4>

	<hr>


	{!! Form::open(array('route' => 'add_user', 'class' => 'form form-horizontal',  'method' => 'put', 'url' => 'administration/addnewuser')) !!}


	<div class="form-group">
	    {!! Form::label('E-mail', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::text('login', null, 
		        array('required', 
		              'class'=>'form-control', 
		              'placeholder'=>'E-mail')) !!}
	    </div>          
	</div>

	<div class="form-group">
	    {!! Form::label('Title', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::text('title', $title, 
		        array('required', 
		              'class'=>'form-control', 
		              'placeholder'=>'')) !!}
	     </div>  
	</div>

	<div class="form-group">
	    {!! Form::label('Message', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::textarea('message', $message, 
		        array('required', 
		              'class'=>'form-control mailing-message', 
		              'placeholder'=>'')) !!}
	     </div> 

	     <div class="mailing-message-loader"></div> 
	</div>


	<h4 class="col-md-offset-2">Wybierz projeky dla nowego użytkownika</h4>
	<hr>

	<div class="form-group">

		{!! Form::label('Projekty demo', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

		<div class="col-sm-10">
		     @foreach ($demosProjects as $project)
		     	<label class="copy-demo-label  col-md-4">
					<div class="thumbnail visible">
						<div class="image-container copy-demo-thumb">
							<img src="{{ config('app.projects_thumb_link') . $project->project_id . '.jpg'}}" 
							class="portal-content-image visible">
						</div>
						<div class="caption">
							<h3>{{$project->name}}</h3>
							<input value="{{ $project->project_id }}" class="project-selection-checkbox" type="checkbox" name="demosProjectsIds[]">
						</div>
					</div>
			  	</label>
			 @endforeach
		</div>
	</div>

	<hr>

	<div class="form-group">

		{!! Form::label('Moje projekty', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

		<div class="col-sm-10">
		     @foreach ($userProjects as $project)
		     	<label class="copy-demo-label  col-md-4">
					<div class="thumbnail visible">
						<div class="image-container copy-demo-thumb">
							<img src="{{ config('app.projects_thumb_link') . $project->project_id . '.jpg'}}" 
							class="portal-content-image visible">
						</div>
						<div class="caption">
							<h3>{{$project->name}}</h3>
							<input value="{{ $project->project_id }}" class="project-selection-checkbox" type="checkbox" name="userProjectsIds[{{$project->id}}]">
						</div>
					</div>
			  	</label>
			 @endforeach
		</div>
	</div>

	<div class="form-group"> 
		<div class="col-sm-offset-2 col-sm-10">
			{!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
			<a href="{{ url('/administration/dashboard') }}"  class="btn btn-default">Anuluj</a>
		</div>
	</div>

	    

	{!! Form::close() !!}

</div>

<div class="clearfix"></div>

<div class="topmenu-offset"></div>

<script type="text/javascript" src="{{ asset('/js/libs/ckeditor/ckeditor.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/distributor/add_new_user_dealer.js') }}"></script>

@endsection