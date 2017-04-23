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
                <span>Użutkownicy i rabaty</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-user-to-reseler-rabat-window" data-toggle="modal" data-target="#add-new-user-to-reseler-rabat-window">Dodaj użytkownika do rabatu</button>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Imię i nazwisko</th>
                            <th>Email</th>
                            <th>Rabat [%]</th>
                            <th>Kwota</th>
                            <th>Rozpoczęcie</th>
                            <th>Zakończenie</th>
                            <th>Aktywny</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($usersToReselersRabats as $key => $usersToReselerRabat)

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $usersToReselerRabat->user_name }}</td>
                            <td>{{ $usersToReselerRabat->user_email }}</td>
                            <td>{{ $usersToReselerRabat->rabat }}</td>
                            <td>{{ $usersToReselerRabat->amount }}</td>
                            <td>{{ $usersToReselerRabat->start_date }}</td>
                            <td>{{ $usersToReselerRabat->expiration_date }}</td>
                            <td class="{{ $usersToReselerRabat->active ? 'success' : 'danger'}}">{{ $usersToReselerRabat->active_name }}</td>

                            <td>

                                <button class="btn btn-primary edit-user-to-reseler-rabat" data-toggle="modal" data-target="#edit-user-to-reseler-rabat-window" 
                                            user_to_reseler_rabat_id="{{ $usersToReselerRabat->id }}"
                                            user_id="{{ $usersToReselerRabat->user_id }}"
                                            rabat="{{ $usersToReselerRabat->rabat }}"
                                            amount="{{ $usersToReselerRabat->amount }}"
                                            currency_id="{{ $usersToReselerRabat->currency_id }}"
                                            start_date="{{ $usersToReselerRabat->start_date }}"
                                            expiration_date="{{ $usersToReselerRabat->expiration_date }}"
                                            active="{{ $usersToReselerRabat->active }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-user-to-reseler-rabat" data-toggle="modal" data-target="#delete-user-to-reseler-rabat-window" 
                                                    user_to_reseler_rabat_id="{{ $usersToReselerRabat->id }}">
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

<div class="modal fade" id="add-new-user-to-reseler-rabat-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj użytkownika do rabatu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Użytkownik') !!}
                        {!! Form::select('user_id', $usersArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('rabat','Rabat [%]') !!}
                        {!! Form::input('number', 'rabat', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0', 'max'=>'100')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('amount','Kwota') !!}
                        {!! Form::input('number', 'amount', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, null, array('class' => 'form-control')) !!}
                    </div>


                    <div class="form-group">
                        {!! Form::label('start_date','Rozpoczęcie rabatu') !!}
                        {!! Form::text('start_date', null, 
                            array('required', 
                                  'class'=>'datepicker-start-date-add form-control', 
                                  'placeholder'=>'Rozpoczęcie rabatu')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('expiration_date','Zakończenie rabatu') !!}
                        {!! Form::text('expiration_date', null, 
                            array('required', 
                                  'class'=>'datepicker-end-date-add form-control', 
                                  'placeholder'=>'Zakończenie rabatu')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('active','Rabat aktywny') !!}
                        {!! Form::select('active', array('1' => 'Włączone', '0' => 'Wyłączone'), null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-user-to-reseler-rabat-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika w rabacie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('user_to_reseler_rabat_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Użytkownik') !!}
                        {!! Form::select('user_id', $usersArray, null, array('class' => 'form-control')) !!}
                    </div>

                     <div class="form-group">
                        {!! Form::label('rabat','Rabat [%]') !!}
                        {!! Form::input('number', 'rabat', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0', 'max'=>'100')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('amount','Kwota') !!}
                        {!! Form::input('number', 'amount', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('start_date','Rozpoczęcie rabatu') !!}
                        {!! Form::text('start_date', null, 
                            array('required', 
                                  'class'=>'datepicker-start-date-add form-control', 
                                  'placeholder'=>'Rozpoczęcie rabatu')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('expiration_date','Zakończenie rabatu') !!}
                        {!! Form::text('expiration_date', null, 
                            array('required', 
                                  'class'=>'datepicker-end-date-add form-control', 
                                  'placeholder'=>'Zakończenie rabatu')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('active','Rabat aktywny') !!}
                        {!! Form::select('active', array('1' => 'Włączone', '0' => 'Wyłączone'), null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-user-to-reseler-rabat-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika z rabatu</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika z rabatu?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('user_to_reseler_rabat_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/moment.js') }}"></script>
<script src="{{ asset('/js/roles/distributor/users_to_reseler_rabats.js') }}"></script>

@endsection