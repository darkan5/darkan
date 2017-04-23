@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-book fa-fw"></i> Użytkownik</h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Użytkownik</span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">

        <div class="row">

            <div class="col-md-2">
                <img style="borde: 1px solid black;" src="{{ asset('/css/img/default_user.png') }} ">
            </div>

            <div class="col-md-10">
                <h3>Imię i Nazwisko: {{ $user->name }}</h3>
                <div>Email: {{ $user->email }}</div>
            </div>
        </div>

        <hr>

        <div class="btn btn-default">
            <div class="user-photo" style="background-image:url({{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png')  }} )"></div>
            <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/mailing/user/') . '/' . $user->id }}"> {{ $user->name }}</a>
            <button class="btn btn-success btn-xs edit-user" user_id="{{ $user->id }}" name="{{ $user->name }}" email="{{ $user->email }}" data-toggle="modal" data-target="#edit-user-window">E</button>
            <button class="btn btn-danger btn-xs delete-user" user_id="{{ $user->id }}" data-toggle="modal" data-target="#delete-user-window">X</button>
        </div>

    </div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Grupy do których należy</span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">

        @foreach($user->groupUser  as $groupUser)

            <?php 
                $lmsGroup = $groupUser->group;

                $groupContents = $lmsGroup->groupContents;

            ?>

            <div class="btn btn-default">
                <a class="btn btn-primary btn-xs" href="{{ url('/lms/mailing/group') . '/' . $lmsGroup->id }}">{{ $lmsGroup->name }}</a>
                <button class="btn btn-danger btn-xs delete-user-from-group" user_id="{{ $user->id }}" group_id="{{ $lmsGroup->id }}" data-toggle="modal" data-target="#delete-user-from-group-window">X</button>
            </div>

        @endforeach

        <button class="btn btn-success add-user-to-group" data-toggle="modal" data-target="#add-user-to-group-window" user_id="{{ $user->id }}">+</button>
        <a href="{{ url('lms/mailing/groups') }}" class="btn btn-success">Utwórz nową grupę</a>
    </div>
</div>



<div class="panel panel-primary">

    <div class="panel-heading">
        <?=Lang::get("darkanpanel.panel_title_courses_that_visited")?>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        
        <div class="dataTable_wrapper">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th><?=Lang::get("darkanpanel.table_column_name")?></th>
                        <th><?=Lang::get("darkanpanel.table_column_status")?></th>
                        <th><?=Lang::get("darkanpanel.table_column_points")?></th>
                        <th><?=Lang::get("darkanpanel.table_column_date")?></th>
                        <th><?=Lang::get("darkanpanel.table_column_options")?></th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($coursesList as $key => $course)

                        <?php 
                            $requirements = json_decode($course->requirements);
                         ?>

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>
                                <div class="course-photo" style="background-image:url({{ ($course->thumb != 'default') ? $course->thumb : asset('/css/img/default_course_small.png')  }} )"></div>
                                <a class="btn btn-info btn-xs" href="{{ url('/lms/publication/') . '/' . $course->banner_project_id }}"> {{ $course->name }}</a>
                            </td>
                           
                            <td>

                                @if($course->course_status == 'incomplete')
                                    <i style="color:#CDB332" class="fa fa-play-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_incomplete') ?>
                                @endif

                                @if($course->course_status == 'passed')
                                    <i style="color:green" class="fa fa-check-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_passed') ?>
                                @endif

                                @if($course->course_status == 'failed')
                                    <i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_failed') ?>
                                @endif

                            </td>
                            <td>{{ $course->user_score }}/{{ $course->score_max }} (<?= Lang::get('darkanpanel.score-required')?> {{ isset($requirements->scoreRequired) ? $requirements->scoreRequired : '' }} )</td>
                            <td>{{ $course->modify_date }}</td>
                            <td>

                                <button class="btn btn-danger delete-user-scorm-data" data-toggle="modal" data-target="#delete-user-scorm-data-window" 
                                                    scorm_data_id="{{ $course->scorm_data_id }}">
                                                    Usuń podejście
                                </button>
                       
                            </td>
                        </tr>

                    @endforeach
        
                </tbody>
            </table>
        </div>

    </div>
    <!-- /.panel-body -->
    
</div>
<!-- /.panel -->

<div class="modal fade" id="add-user-to-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj użytkownika do grupy</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => '/lms/mailing/user/groupuser/' . $user->id)) !!}
            {!! Form::hidden('id_user', null) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('Grupa') !!}
                            {!! Form::select('id_group', $groupsArray, null, array('class' => 'form-control')) !!}
                        </div>
                    </div>

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

<div class="modal fade" id="delete-user-from-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika z grupy</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika z grupy?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => '/lms/mailing/user/groupuser/' . $user->id)) !!}
            {!! Form::hidden('id_user', null) !!}
            {!! Form::hidden('id_group', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="delete-user-scorm-data-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie podejścia</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć podejście użytkownika?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete' , 'url' => '/lms/mailing/userscormdata/' . $user->id)) !!}
            {!! Form::hidden('scorm_data_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="edit-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('user_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Email') !!}
                        {!! Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')) !!}
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

<div class="modal fade" id="delete-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('user_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/lms/user.js') }}"></script>


@endsection