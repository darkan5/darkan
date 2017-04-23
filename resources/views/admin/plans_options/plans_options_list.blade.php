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
                <span>Opcje planu</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-plan-option-window" data-toggle="modal" data-target="#add-new-plan-option-window">Dodaj nową opcję planu</button>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nazwa</th>
                            <th>Opis</th>
                            <th>Wersja</th>
                            <th>Opcje planu (JSON)</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($plansOptions as $key => $planOption)

                        <?php 
                            $version = $planOption->plansVersions->version;
                        ?>

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $planOption->name }}</td>
                            <td>{{ $planOption->description }}</td>
                            <td><label class="plan-version" version="{{ $version}}">{{ $version }}</label></td>
                            <td> <textarea>{{ $planOption->options }}</textarea> </td>

                            <td>

                                <button class="btn btn-primary edit-plan-option" data-toggle="modal" data-target="#edit-plan-option-window" 
                                            plan_option_id="{{ $planOption->id }}"
                                            name="{{ $planOption->name }}"
                                            description="{{ $planOption->description }}"
                                            version_id="{{ $planOption->version_id }}"
                                            options="{{ $planOption->options }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-plan-option" data-toggle="modal" data-target="#delete-plan-option-window" 
                                                    plan_option_id="{{ $planOption->id }}">
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

<div class="modal fade" id="add-new-plan-option-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nową opcję planu</h4>
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
                        {!! Form::label('description', 'Opis', array('class' => 'control-label')) !!}
                        {!! Form::text('description', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('version_id','Wersja') !!}
                        {!! Form::select('version_id', $plansVersionsList, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('options', 'Opcje planu (JSON)', array('class' => 'control-label')) !!}
                        {!! Form::textarea('options', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opcje planu (JSON)')) !!}
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

<div class="modal fade" id="edit-plan-option-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj opcję planu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('plan_option_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('description', 'Opis', array('class' => 'control-label')) !!}
                        {!! Form::text('description', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('version_id','Wersja') !!}
                        {!! Form::select('version_id', $plansVersionsList, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('options', 'Opcje planu (JSON)', array('class' => 'control-label')) !!}
                        {!! Form::textarea('options', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opcje planu (JSON)')) !!}
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

<div class="modal fade" id="delete-plan-option-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie opcji planu</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć opcję planu?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('plan_option_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/admin/plans_options_list.js') }}"></script>

@endsection