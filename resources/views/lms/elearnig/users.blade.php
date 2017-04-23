@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-users fa-fw"></i> <?=Lang::get("darkanpanel.page_name_users")?></h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Pliki do pobrania</span>
        <div class="btn-group pull-right">

        </div>
    </div>
    <div class="panel-body">
        <div>
            
            {!! Form::open(array('class' => 'form',  'method' => 'post', 'url' => 'lms/elearning/downloadfile/users')) !!}

                <input type="submit" name="file_type" value="csv" class="btn btn-success">
                <input type="submit" name="file_type" value="xls" class="btn btn-success">
                <input type="submit" name="file_type" value="json" class="btn btn-success">

            {!! Form::close() !!}

        </div>
    </div>
 </div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <?=Lang::get("darkanpanel.panel_title_users_list")?>
        <div class="pull-right">
            <button class="btn btn-success open-add-new-user-window panel-button" data-toggle="modal" data-target="#add-new-user-window" >Utwórz nowego użytkownika</button>
            <button class="btn btn-success open-add-users-from-json-window panel-button" data-toggle="modal" data-target="#add-new-users-from-json-window" >Dodaj nowe konta użytkowników z JSON'a</button>
            <a href="{{ url('lms/elearning/groups') }}" class="btn btn-success">Utwórz nową grupę</a>
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        <div class="dataTable_wrapper">
            <table class="table table-responsive table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th><?=Lang::get("darkanpanel.table_column_mail")?></th>
                        <th><?=Lang::get("darkanpanel.table_column_groups")?></th>
                        <th>Utworzony</th>
                        <th><?=Lang::get("darkanpanel.table_column_options")?></th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($usersList as $key => $user)

                        <tr>
                            <td>{!! $key + 1 !!}</td>

                            <td>

                                <div class="btn btn-default">
                                    <img style="border: 1px solid black; height: 20px;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                                    <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/elearning/user/') . '/' . $user->id }}"> {{ $user->name }}</a>
                                    <button class="btn btn-success btn-xs edit-user" user_id="{{ $user->id }}" name="{{ $user->name }}" email="{{ $user->email }}" data-toggle="modal" data-target="#edit-user-window">E</button>
                                    <button class="btn btn-danger btn-xs delete-user" user_id="{{ $user->id }}" data-toggle="modal" data-target="#delete-user-window">X</button>
                                </div>

                                
                            </td>

                            <td>

                                @if($user->groupUser)

                                    @foreach($user->groupUser  as $groupUser)

                                        <?php 
                                            $lmsGroup = $groupUser->group;

                                            $groupContents = $lmsGroup->groupContents;

                                        ?>

                                        <div class="btn btn-default">
                                            <a class="btn btn-primary btn-xs" href="{{ url('/lms/elearning/group') . '/' . $lmsGroup->id }}">{{ $lmsGroup->name }}</a>
                                            
                                        
                                            @if($groupContents)

                                                @foreach($groupContents  as $groupContent)

                                                    <?php 

                                                        $course = $groupContent->banner;
                                                     ?>


                                                    <a class="btn btn-info btn-xs" href="{{ url('/lms/publication') . '/' . $course->id_banner }}">{{ $course->name }}</a>
                                                @endforeach

                                                <button class="btn btn-danger btn-xs delete-user-from-group" user_id="{{ $user->id }}" group_id="{{ $lmsGroup->id }}" data-toggle="modal" data-target="#delete-user-from-group-window">X</button>
                                            @endif

                                        </div>

                                        

                                    @endforeach

                                @endif

                                <button class="btn btn-success add-user-to-group" data-toggle="modal" data-target="#add-user-to-group-window" user_id="{{ $user->id }}">+</button>

                            </td>
                            <td>{{ $user->created_at }}</td>
                            <td>
                                
                                <button class="btn btn-success edit-user" user_id="{{ $user->id }}" name="{{ $user->name }}" email="{{ $user->email }}" data-toggle="modal" data-target="#edit-user-window"><?=Lang::get('darkanpanel.btn_edit')?></button>
                                <button class="btn btn-danger delete-user" user_id="{{ $user->id }}" data-toggle="modal" data-target="#delete-user-window"><?=Lang::get('darkanpanel.btn_delete')?></button>

                                @if($lmsInfo && $lmsInfo->lms_paid)
                                   
                                    @if($user->payments->paid)
                                    <button 
                                        class="btn btn-warning userpayment" 
                                        user_id="{{ $user->id }}"
                                        >
                                        <?=Lang::get('darkanpanel.paymentDone')?>
                                    </button>
                                    @else
                                    <button 
                                        class="btn btn-info userpayment" 
                                        user_id="{{ $user->id }}"
                                        data-toggle="modal" data-target="#markaspaid-user-window">
                                        <?=Lang::get('darkanpanel.setAsPaid')?>
                                    </button>
                                    @endif
                                @endif

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

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => '/lms/elearning/groupuser')) !!}
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
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => '/lms/elearning/groupuser')) !!}
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

<div class="modal fade" id="add-new-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowego użytkownika</h4>
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
                        {!! Form::label('Email') !!}
                        {!! Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')) !!}
                    </div>

                    <div class='form-group'>
                        {!! Form::label('password', 'Hasło') !!}
                        {!! Form::password('password', ['placeholder' => 'Hasło', 'class' => 'form-control']) !!}
                    </div>
                    <div class='form-group'>
                        {!! Form::label('password_confirmation', 'Potwierdź hasło') !!}
                        {!! Form::password('password_confirmation', ['placeholder' => 'Potwierdź hasło', 'class' => 'form-control']) !!}
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

<div class="modal fade" id="add-new-users-from-json-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowe konta użytkowników</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'lms/elearning/addnewuserfromjson')) !!}
            <div class="modal-body">

                <div class="form-group">
                        {!! Form::label('users_json', 'Przykład') !!}
                        {!! Form::label('users_json', '[{ "name": "Jan Kowalski", "email" : "jan.kowalski@example.com.pl" },
                                                   { "name": "Maria Kowalska", "email" : "maria.kowalska@example.com.pl" }]') !!}
                        {!! Form::label('users_json', 'Użytkownicy JSON') !!}
                        {!! Form::textarea('users_json', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'')) !!}
                    </div>

                <div class="form-group">
                        {!! Form::label('group_id','Grupa') !!}
                        {!! Form::select('group_id', $groupsArray, null, array('class' => 'form-control')) !!}
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

<script src="{{ asset('/js/lms/users.js') }}"></script>


@endsection