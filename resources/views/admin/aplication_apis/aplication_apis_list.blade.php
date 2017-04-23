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
                <span>Aplication api dla roli admin api</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-aplication-api-window" data-toggle="modal" data-target="#add-new-aplication-api-window">Dodaj nowe api</button>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Api key</th>
                            <th>Rola api</th>
                            <th>Użytkownik</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($aplicationApis as $key => $aplicationApi)


                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $aplicationApi->api_key }}</td>
                            <td>{{ $aplicationApi->roleApi->name }}</td>

                            <?php 

                                $usersToAplicationApi = $aplicationApi->usersToAplicationApi;

                             ?>

                            <td>

                                @if($usersToAplicationApi)

                                    @foreach ($usersToAplicationApi as $key => $userToAplicationApi)

                                        {{ $userToAplicationApi->user->email }}

                                    @endforeach

                                @endif

                            </td>

                            <td>

                                <button class="btn btn-primary edit-aplication-api" data-toggle="modal" data-target="#edit-aplication-api-window" 
                                            aplication_api_id="{{ $aplicationApi->id }}"
                                            api_key="{{ $aplicationApi->api_key }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-aplication-api" data-toggle="modal" data-target="#delete-aplication-api-window" 
                                                    aplication_api_id="{{ $aplicationApi->id }}">
                                                    Usuń
                                </button>

                                <button class="btn btn-warning add-user-to-aplication-api" data-toggle="modal" data-target="#add-user-to-aplication-api-window" 
                                                    aplication_api_id="{{ $aplicationApi->id }}">
                                                    Przypisz użytkownika do api
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

<div class="modal fade" id="add-user-to-aplication-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Przypisz użytkownika do api</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'admin/addusertoaplicationapi')) !!}
            <div class="modal-body">
                {!! Form::hidden('aplication_api_id', null) !!}

                <div class="form-group">
                    {!! Form::label('User api') !!}
                    {!! Form::select('user_id', $usersArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="add-new-aplication-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowe api</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="edit-aplication-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj api</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('aplication_api_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('api_key', 'Api key (40 znaków)', array('class' => 'control-label')) !!}
                        {!! Form::text('api_key', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Api key (40 znaków)')) !!}
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

<div class="modal fade" id="delete-aplication-api-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie api</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć api?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('aplication_api_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/admin/aplication_api_list.js') }}"></script>

@endsection