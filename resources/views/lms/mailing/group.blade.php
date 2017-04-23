@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-group fa-fw"></i>Grupa <small>mailing</small></h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Grupa</span>
        <div class="pull-right">
            <button class="btn btn-primary edit-group"  group_id="{{ $group->id }}" name="{{ $group->name }}" data-toggle="modal" data-target="#edit-group-window"><?=Lang::get('darkanpanel.btn_edit')?></button>
            <button class="btn btn-danger delete-group" group_id="{{ $group->id }}" data-toggle="modal" data-target="#delete-group-window"><?=Lang::get('darkanpanel.btn_delete')?></button>
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        <div class="btn btn-default">
            <a class="btn btn-primary btn-xs" href="{{ url('lms/mailing/group/') . '/' . $group->id }}">{{ $group->name }}</a>
            <button class="btn btn-primary btn-xs edit-group"  group_id="{{ $group->id }}" name="{{ $group->name }}" data-toggle="modal" data-target="#edit-group-window">E</button>
            <button class="btn btn-danger btn-xs delete-group" group_id="{{ $group->id }}" data-toggle="modal" data-target="#delete-group-window">X</button>
        </div>
    </div>

</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Użytkownicy</span>
        <div class="pull-right">
            
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        @if($group->groupUsers)

            @foreach($group->groupUsers as $groupUser)

                <?php 

                    $user = $groupUser->user;

                 ?>

                <div class="btn btn-default">
                    <img style="border: 1px solid black; height: 20px" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                    <a class="btn btn-warning btn-xs" href="{{ url('/lms/mailing/user') . '/' . $user->id }}">{{ $user->name }}</a>
                    <button class="btn btn-danger btn-xs delete-user-from-group" group_id="{{ $group->id }}" user_id="{{ $user->id }}" data-toggle="modal" data-target="#delete-user-from-group-window">X</button>
                </div>

            @endforeach

        @endif

        <button class="btn btn-success add-user-to-group" group_id="{{ $group->id }}" data-toggle="modal" data-target="#add-user-to-group-window">+</button>
    </div>

</div>


<div class="modal fade" id="add-user-to-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj użytkownika do grupy</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => '/lms/mailing/usertogroup/' . $group->id)) !!}
            {!! Form::hidden('id_group', $group->id) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('Użytkownik') !!}
                            {!! Form::select('id_user', $usersArray, null, array('class' => 'form-control')) !!}
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
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => '/lms/mailing/usertogroup/' . $group->id)) !!}
            {!! Form::hidden('id_user', null) !!}
            {!! Form::hidden('id_group', $group->id) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="add-course-to-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj kurs do grupy</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => '/lms/mailing/groupcourse/' . $group->id)) !!}
            {!! Form::hidden('group_id', null) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('Kurs') !!}
                            {!! Form::select('content_id', $bannersArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-course-from-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie kursu z grupy</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć kurs z grupy?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => '/lms/mailing/groupcourse/' . $group->id)) !!}
            {!! Form::hidden('content_id', null) !!}
            {!! Form::hidden('group_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="add-new-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nową grupę</h4>
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

            </div>
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="edit-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj grupę</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('group_id', null) !!}
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

<div class="modal fade" id="delete-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie grupy</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć grupę?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('group_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/lms/groups.js') }}"></script>


@endsection