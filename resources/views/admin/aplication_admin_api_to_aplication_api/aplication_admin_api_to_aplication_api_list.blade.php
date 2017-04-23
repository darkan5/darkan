@extends('layouts.app')

@section('content')

<div class="topmenu-offset"></div>

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

<div class="container-fluid">
    <div class="col-md-12">


        <div class="panel panel-primary">
            <div class="panel-heading">
                <span>Nawigacja</span>
                <div class="btn-group pull-right">
                </div>
            </div>
            <div class="panel-body text-center">
                <a class="btn btn-info text-center" href="{{ url('admin/aplicationapiadmin') }}">Tworzenie aplication api dla roli - admin api</a>
                <a class="btn btn-primary text-center" href="{{ url('admin/aplicationapiuser') }}">Tworzenie aplication api dla roli - user api</a>
                <a class="btn btn-success text-center" href="{{ url('admin/aplicationadminapitoaplicationapi') }}">Przypisanie admin api do user api</a>
            </div>
        </div>
        
        <div class="panel panel-primary">
            <div class="panel-heading panel-big">
                <span>Użytkownicy api i adminstratorzy api</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-user-api-to-admin-api-window" data-toggle="modal" data-target="#add-new-user-api-to-admin-api-window">Dodaj użytkownika api do administratora api</button>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Admin</th>
                            <th>Admin user</th>
                            <th>User api</th>
                            <th>User user</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($adminsApiToUsersApi as $key => $adminApiToUserApi)


                        <?php 

                            $adminApi = $adminApiToUserApi->adminApi;
                            $userApi = $adminApiToUserApi->userApi;

                         ?>

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $adminApi->api_key }}</td>

                            <?php 

                                $userToAplicationApi = $adminApi->userToAplicationApi;
                             ?>

                            <td>

                                @if($userToAplicationApi)

                                    <?php 
                                        $user = $userToAplicationApi->user;
                                     ?>

                                    {{ $user->email }}
                                    <a href="{{ url('admin/user') . '/' . $user->id}}" class="btn btn-warning btn-xs">Szczegóły</a>

                                @endif

                            </td>



                            <td>{{ $userApi->api_key }}</td>

                            <?php 

                                $userToAplicationApi = $userApi->userToAplicationApi;
                             ?>

                            <td>

                                @if($userToAplicationApi)

                                    <?php 
                                        $user = $userToAplicationApi->user;
                                     ?>

                                    {{ $user->email }}
                                    <a href="{{ url('admin/user') . '/' . $user->id}}" class="btn btn-warning btn-xs">Szczegóły</a>

                                @endif

                            </td>


                            <td>

                                <button class="btn btn-primary edit-user-api-to-admin-api" data-toggle="modal" data-target="#edit-user-api-to-admin-api-window" 
                                            aplication_admin_api_to_aplication_api_id="{{ $adminApiToUserApi->id }}"
                                            admin_api_key_id="{{ $adminApiToUserApi->admin_api_key_id }}"
                                            api_key_id="{{ $adminApiToUserApi->api_key_id }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-user-api-to-admin-api" data-toggle="modal" data-target="#delete-user-api-to-admin-api-window" 
                                                    aplication_admin_api_to_aplication_api_id="{{ $adminApiToUserApi->id }}">
                                                    Usuń
                                </button>

                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="add-new-user-api-to-admin-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj użytkownika api do admina api</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Admin api') !!}
                        {!! Form::select('admin_api_key_id', $adminsApiArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('User api') !!}
                        {!! Form::select('api_key_id', $usersApiArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-user-api-to-admin-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika api w adminie api</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('aplication_admin_api_to_aplication_api_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Admin api') !!}
                        {!! Form::select('admin_api_key_id', $adminsApiArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('User api') !!}
                        {!! Form::select('api_key_id', $usersApiArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-user-api-to-admin-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika api z adminstratora api</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika api z adminstratora api?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('aplication_admin_api_to_aplication_api_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/admin/aplication_admin_api_to_aplication_api_list.js') }}"></script>

@endsection