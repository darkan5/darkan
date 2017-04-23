@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-book fa-fw"></i> Projekt</h1>


<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Projekt</span>
        <div class="btn-group pull-right">
             
        </div>
    </div>
    <div class="panel-body">

        <div class="row">

            <div class="col-md-2">
                <img  style="height:100px; border:1px solid black;" src="{{ asset('/css/img/projects_logos/project_' . $project->editor_id . '.png') }}" >
            </div>

            <div class="col-md-10">
                <h3>Nazwa: {{ $project->name }}</h3>
                <div>Edytor: {{ $project->editor->name }}</div>
                <div>Utworzony: {{ $project->date }}</div>
                <div>Edytowany: {{ $project->last_visit }}</div>
            </div>
        </div>

        <hr>

        <div class="btn btn-default">
             <img  style="height:20px; border:1px solid black;" src="{{ asset('/css/img/projects_logos/project_' . $project->editor_id . '.png') }}" >
             <a href="{{ url('lms/project') . '/' . $project->project_id }}" class="btn btn-default btn-xs">{{ $project->name }}</a>
             <button class="btn btn-success btn-xs edit-project" project_id="{{ $project->project_id }}" name="{{ $project->name }}" editor_id="{{ $project->editor_id }}" data-toggle="modal" data-target="#edit-project-window">E</button>
             <button class="btn btn-danger btn-xs delete-project" project_id="{{ $project->project_id }}" data-toggle="modal" data-target="#delete-project-window">X</button>
            <a href="{{ url('editor', $project->project_id)  }}" class="btn btn-success btn-xs" id="open-project-preview"><i class="fa fa-play"></i> Otwórz projekt</a>
        </div>

    </div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Publikacje</span>
        <div class="btn-group pull-right">
             
        </div>
    </div>
    <div class="panel-body">

        @if($project->banners)

            @foreach ($project->banners as $course) 

                <div class="btn btn-default">
                    <img style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
                    <a class="btn btn-info btn-xs" href="{{ url('lms/publication') . '/' . $course->id_banner  }}">{{ $course->name }}</a>
                    
                    @if($course->groupContents)

                        @foreach($course->groupContents as $groupContent)

                            <?php 

                                $group = $groupContent->group;

                             ?>

                            <a class="btn btn-primary btn-xs" href="{{ url('/lms/elearning/group') . '/' . $group->id }}">{{ $group->name }}</a>
                            
                        @endforeach

                    @endif

                    <button class="btn btn-danger btn-xs delete-publication" project_id="{{ $project->project_id }}" id_banner="{{ $course->id_banner }}" data-toggle="modal" data-target="#delete-publication-window">X</button>
                    <a href="{{ url('content', $course->path)  }}" target="_blank" class="btn btn-success btn-xs">O</a>
                </div>


           @endforeach

       @endif

    </div>
</div>


<div class="modal fade" id="add-new-project-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowy projekt</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Edytor') !!}
                        {!! Form::select('editor_id', $editorsArray, 3, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-project-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj projekt</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
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
                        {!! Form::label('Edytor') !!}
                        {!! Form::select('editor_id', $editorsArray, null, array('class' => 'form-control')) !!}
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
                <h4 class="modal-title" id="myModalLabel">Usuwanie projektu</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć projekt?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
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
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'lms/project/deletepublicationfromproject')) !!}
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

<script src="{{ asset('/js/lms/projects.js') }}"></script>


@endsection