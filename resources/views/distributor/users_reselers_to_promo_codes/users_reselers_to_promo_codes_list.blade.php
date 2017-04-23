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
            <div class="panel-heading panel-big">
                <span>Użutkownicy i kody promocyjne</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-user-to-promo_code-window" data-toggle="modal" data-target="#add-new-user-to-promo_code-window">Dodaj użytkownika do kodu promocyjnego</button>
                    <a class="btn btn-warning" href="{{ url('distributor/userslist') }}">Lista reselerów</a>
                    <a class="btn btn-default" href="{{ url('distributor/promocodeslist') }}">Lista kodów promocyjnych</a>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Imię i nazwisko</th>
                            <th>Email</th>
                            <th>Kod promocyjny</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($usersToPromoCodes as $key => $userToPromoCode)

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $userToPromoCode->user_name }}</td>
                            <td>{{ $userToPromoCode->user_email }}</td>
                            <td>{{ $userToPromoCode->promo_code_name }}</td>

                            <td>

                                <button class="btn btn-primary edit-user-to-promo_code" data-toggle="modal" data-target="#edit-user-to-promo_code-window" 
                                            user_to_promo_code_id="{{ $userToPromoCode->id }}"
                                            user_id="{{ $userToPromoCode->user_id }}"
                                            promo_code_id="{{ $userToPromoCode->promo_code_id }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-user-to-promo_code" data-toggle="modal" data-target="#delete-user-to-promo_code-window" 
                                                    user_to_promo_code_id="{{ $userToPromoCode->id }}">
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

<div class="modal fade" id="add-new-user-to-promo_code-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj użytkownika do kodu promocyjnego</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Użytkownika') !!}
                        {!! Form::select('user_id', $usersArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Kod promocyjny') !!}
                        {!! Form::select('promo_code_id', $promoCodesArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-user-to-promo_code-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika w kodzie promocyjnym</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('user_to_promo_code_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Użytkownika') !!}
                        {!! Form::select('user_id', $usersArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Kod promocyjny') !!}
                        {!! Form::select('promo_code_id', $promoCodesArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-user-to-promo_code-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika z kodu promocyjnego</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika z kodu promocyjnego?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('user_to_promo_code_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/distributor/users_to_promo_codes_list.js') }}"></script>

@endsection