<script src="{{ asset('/bower_components/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('/bower_components/jquery/dist/jqui.js') }}"></script>
<script src="{{ asset('/bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>

<script src="{{ asset('/js/libs/underscore/underscore.js') }}"></script>
<script src="{{ asset('/js/libs/backbone/backbone.js') }}"></script>
<script src="{{ asset('/js/libs/backbone/backbone.stickit.js') }}"></script>
<script src="{{ asset('/js/libs/backbone/backbone.controller.js') }}"></script>

<link href="{{ asset('/bower_components/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
<link href="{{ asset('/bower_components/jquery/dist/jqueryui_styles.css') }}" rel="stylesheet">

<link href="{{ asset('/js/datetimepicker-master/jquery.datetimepicker.css') }}" rel="stylesheet">


<link href="{{ asset('/css/lms/editor/editor_empty_project.css') }}" rel="stylesheet">

<div class="container">

	<ul>
	    @foreach($errors->all() as $error)
	        <div class="bs-example col-md-10 col-md-offset-1">
	            <div class="alert alert-warning">
	                <a href="#" class="close" data-dismiss="alert">&times;</a>
	                <strong>Uwaga!</strong> {{ $error }}
	            </div>
	        </div>
	    @endforeach
	</ul>
</div>



<div class="container">
	<a href="{{ url('') }}">
		<img src="{{ url('css/img/social_logos/155x100.png') }}" alt="Darkan logo">
	</a>
    <h1>Darkan empty project</h1>
</div>

<div class="container">
    <div class="container-centered">

        <div class="panel panel-primary">
            <div class="panel-heading">Projekt</div>

            <div class="panel-body">

            	<div class="btn btn-default">
                    <a class="btn btn-default" href="{{ url('lms/project') . '/' . $project->project_id  }}">{{ $project->name }}</a>
                    <button class="btn btn-primary edit-project" project_id="{{ $project->project_id }}" name="{{ $project->name }}" data-toggle="modal" data-target="#edit-project-window">E</button>
                    <button class="btn btn-danger delete-project" project_id="{{ $project->project_id }}" data-toggle="modal" data-target="#delete-project-window">X</button>
                </div>
            </div>

        </div>
    </div>
</div>

@if(count($files) > 0)

<div class="container">
    <div class="container-centered">

        <div class="panel panel-primary">
            <div class="panel-heading">Projekt wgrany</div>

            <div class="panel-body">
            	<button class="btn btn-danger delete-project-files" data-toggle="modal" data-target="#delete-project-files-window" 
	                                project_id="{{ $project->project_id }}">
	                                Usuń pliki projektu
	            </button>
            </div>

        </div>
    </div>
</div>


<div class="container">
    <div class="container-centered">

        <div class="panel panel-primary">
            <div class="panel-heading">Publikacje</div>

            <div class="panel-body">

            	@foreach ($project->banners as $course) 

                    <div class="btn btn-default" title="{{ $course->summary }}">
                        <a class="btn btn-info" href="{{ url('lms/publication') . '/' . $course->id_banner  }}">{{ $course->name }}</a>
                        <button class="btn btn-primary edit-publication" id_banner="{{ $course->id_banner }}" name="{{ $course->name }}" summary="{{ $course->summary }}" data-toggle="modal" data-target="#edit-publication-window">E</button>
                        <button class="btn btn-danger delete-publication" id_banner="{{ $course->id_banner }}" data-toggle="modal" data-target="#delete-publication-window">X</button>
                        <button class="btn btn-warning overwrite-publication" id_banner="{{ $course->id_banner }}" data-toggle="modal" data-target="#overwrite-publication-window">Nadpisz</button>
 
                   		<a class="btn btn-success" href="{{ url('content', $course->path)  }}">Otwórz</a>
                    </div>

                @endforeach

                <button class="btn btn-success publish-project" data-toggle="modal" data-target="#publish-project-window" 
	                                project_id="{{ $project->project_id }}">
	                                Nowa publikacja
	            </button>

            </div>

        </div>
    </div>
</div>

@endif

<div class="container">
    <div class="container-centered">

    	

        <div class="panel panel-primary">
            <div class="panel-heading">Wybierz plik projektu</div>

            <div class="panel-body text-center row">
                {!! Form::open(array('class' => 'form', 'method' => 'post', 'files' => true, 'url' => 'editor/emptyprojectfiles')) !!}
				{!! Form::hidden('project_id', $project->project_id) !!}
				<div class="modal-body">



					<div class="form-group text-center col-md-9">
					    {!! Form::file('project_file', array('class' => 'form-control btn btn-default')) !!}
					</div>

					{!! Form::submit('Wgraj', array('class'=>'btn btn-primary col-md-3')) !!}
					
				</div>

				{!! Form::close() !!}
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="delete-project-files-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie projektu</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć projekt?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'editor/emptyprojectfiles')) !!}
            {!! Form::hidden('project_id', $project->project_id) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="publish-project-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Publikacja projektu</h4>
            </div>

            <div class="modal-body">

	            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'editor/emptyprojectpublish')) !!}
	            {!! Form::hidden('project_id', $project->project_id) !!}

            	<div class="form-group">
                    {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                    {!! Form::text('name', null, 
                        array('required', 
                              'class'=>'form-control', 
                              'placeholder'=>'Nazwa')) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('Opis') !!}
                    {!! Form::textarea('summary', null, 
                        array( 
                              'class'=>'form-control', 
                              'placeholder'=>'Opis')) !!}
                </div>

            </div>

            <div class="modal-footer">

                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="edit-publication-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj publikację</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put', 'url' => 'editor/emptyprojectpublish')) !!}
            {!! Form::hidden('id_banner', null) !!}
            {!! Form::hidden('project_id', $project->project_id) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Opis') !!}
                        {!! Form::textarea('summary', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
                    </div>

            </div>
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="overwrite-publication-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Nadpisywanie publikacji</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz nadpisać publikację?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'editor/emptyprojectoverwritepublication')) !!}
            {!! Form::hidden('id_banner', null) !!}
            {!! Form::hidden('project_id', $project->project_id) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="delete-publication-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie publikacji</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć publikację?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'editor/emptyprojectpublish')) !!}
            {!! Form::hidden('id_banner', null) !!}
            {!! Form::hidden('project_id', $project->project_id) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="edit-project-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj projekt</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put', 'url' => 'editor/emptyproject')) !!}
            {!! Form::hidden('project_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>


            </div>
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="delete-project-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie projekt</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć project?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'editor/emptyproject')) !!}
            {!! Form::hidden('project_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/editors/empty/editor_empty_project.js') }}"></script>
