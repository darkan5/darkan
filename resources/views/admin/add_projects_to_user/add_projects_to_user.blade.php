@extends('layouts.app')

<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">

@section('content')

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



<div class="container">

	<div class="panel panel-primary">
        <div class="panel-heading">
            <span>Użytkownik</span>
            <div class="btn-group pull-right">

            </div>
        </div>
        <div class="panel-body">

        	<div class="row">

                <div style="float: left; margin: 15px">
                    <img style="border: 1px solid black;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user.png') }} ">
                </div>

                <div style="float: left; margin: 15px">
                    <h4>Imię i Nazwisko: {{ $user->name }}</h4>
                    <div>Email: {{ $user->email }}</div>

                    @if(Auth::user()->hasRole('admin') || Session::get('isAdmin'))
                        <div>Rola: {{ $user->roleUser->role->name }}</div>
                    @endif

                    <div>Utworzony: {{ $user->created_at }}</div>
                    <div>Edytowany: {{ $user->updated_at }}</div>
                </div>
            </div>

        </div>
    </div>


    {!! Form::open(array('class' => 'form',  'method' => 'post')) !!}

	{!! Form::hidden('user_id', $user->id) !!}


	<div class="panel panel-primary">
        <div class="panel-heading">
            <span>Email</span>
            <div class="btn-group pull-right">

            </div>
        </div>
        <div class="panel-body">
	

			

			<div class="form-group">
				{!! Form::label('title', 'Tytuł wiadomości',
			    		array('required', 
				              'class'=>'control-label')) !!}
		        {!! Form::text('title', 'Udostępniono projekty z aplikacji Darkan', 
		            array('required', 
		                  'class'=>'form-control mailing-title', 
		                  'placeholder'=>'Tytuł wiadomości')) !!}
		    </div>

		    <div class="form-group">

		        {!! Form::textarea('message', null, 
		            array( 
		                  'class'=>'form-control mailing-message', 
		                  'placeholder'=>'Wiadomość')) !!}
		    </div>

	    </div>
	</div>

	<div class="panel panel-primary">
        <div class="panel-heading">
            <span>Projekty</span>
            <div class="btn-group pull-right">

            </div>
        </div>
        <div class="panel-body">

			<div>Wybierz projeky dla użytkownika <strong>{{ $user->name }} </strong> ( {{ $user->email }} )</div>
			<br>
	

			@if(count($distributionProjects))

				<div class="container">

					<p>Projekty demo:</p>

					<div>
					     @foreach ($distributionProjects as $project)
					     	<label class="copy-demo-label  col-md-3">
								<div class="thumbnail visible">
									<div class="image-container copy-demo-thumb">
										<img src="{{ config('app.projects_thumb_link') . $project->project_id . '.jpg'}}" 
										class="portal-content-image visible">
									</div>
									<div class="caption">
										<h3>{{$project->name}}</h3>
										<input value="{{ $project->project_id }}" class="project-selection-checkbox" type="checkbox" name="demos_projects_ids[]">
									</div>
								</div>
						  	</label>
						 @endforeach
					</div>
				</div>

			@endif

			<hr>

			@if(count($userProjects))

				<div class="container">

					<p>Moje projekty:</p>

					<div>
					     @foreach ($userProjects as $project)
					     	<label class="copy-demo-label col-md-3">
								<div class="thumbnail visible">
									<div class="image-container copy-demo-thumb">
										<img src="{{ config('app.projects_thumb_link') . $project->project_id . '.jpg'}}" 
										class="portal-content-image visible">
									</div>
									<div class="caption">
										<h3>{{$project->name}}</h3>
										<input value="{{ $project->project_id }}" class="project-selection-checkbox" type="checkbox" name="user_projects_ids[{{$project->id}}]">
									</div>
								</div>
						  	</label>
						 @endforeach
					</div>
				</div>

			@endif

		</div>

		<div class="panel-footer">
	        {!! Form::submit('Przekopiuj wybrane projekty', array('class'=>'btn btn-primary')) !!}
			<a href="{{ url('admin/user', $user->id) }}"  class="btn btn-default">Anuluj</a>
	    </div>
	</div>

	{!! Form::close() !!}
</div>

<div class="clearfix"></div>

<div class="topmenu-offset"></div>

<script type="text/javascript">
	var LINK = '{{ $LINK }}';
</script>

<!-- CK editor -->
<script src="{{ asset('/js/libs/ckeditor/ckeditor.js') }}"></script>

<script src="{{ asset('/js/roles/admin/add_projects_to_user_mailing.js') }}"></script>

@endsection