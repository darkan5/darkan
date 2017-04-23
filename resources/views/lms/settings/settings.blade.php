@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-cogs fa-fw"></i> <?=Lang::get("darkanpanel.settings")?></h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span><?=Lang::get("darkanpanel.settings")?></span>
        <div class="btn-group pull-right">
             
        </div>
    </div>
    <div class="panel-body">


            <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Wartość</th>
                    <th>Opcje</th>
                </tr>
            </thead>
            <tbody>

                @foreach($settings as  $key => $value)

                    <tr>

                        <td><label>{{ Lang::get('darkanpanel.settings_'. $key) }}</label></td>
                        <td>{{ Lang::get('darkanpanel.settings_'. $key .'_description') }}</td>
                        <td>{{ $value }}</td>

                        <td>

                            <button class="btn btn-primary edit-setting" key="{{ $key }}" value="{{ $value }}" data-toggle="modal" data-target="#edit-setting-{{$key}}-window">Edytuj</button>

                        </td>

                    </tr>

                @endforeach

            </tbody>
        </table>

    </div>
</div>


<div class="modal fade" id="edit-setting-topmenuon-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('topmenuon', 'Menu górne') !!}
                            {!! Form::select('topmenuon', ['Pokaż', 'Ukryj'], null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-setting-footeron-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('topmenuon', 'Stopka') !!}
                            {!! Form::select('topmenuon', ['Pokaż', 'Ukryj'], null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-setting-login-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('login', 'Dostęp do portalu') !!}
                            {!! Form::select('login', ['Wymagaj logowania', 'Nie wymagaj logowania'], null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-setting-state-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('state', 'Dostęp do kursów') !!}
                            {!! Form::select('state', ['Dla wszystkich', 'Dla użytkowników z Twojej listy użytkowników'], null, array('class' => 'form-control')) !!}
                        </div>
                        <div class="form-group">
                           <a href="{{ url('lms/elearning/users') }}">Twoja lista użytkowników</a>
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

<div class="modal fade" id="edit-setting-paid-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('paid', 'Wymagaj opłaty za korzystanie') !!}
                            {!! Form::select('paid', ['Nie wymagaj', 'Wymagaj'], null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-setting-currency-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('currency', 'Waluta') !!}
                            {!! Form::select('currency', ['EUR' => 'EUR', 'PLN' => 'PLN'], null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-setting-price-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj ustawienie</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('price','Opłata za korzystanie z portalu') !!}
                            {!! Form::input('number', 'price', 0, 
                                array('required', 
                                      'class'=>'form-control', 
                                      'min'=>'0', 'max'=>'1000000')) !!}
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


<script src="{{ asset('/js/lms/settings.js') }}"></script>


@endsection