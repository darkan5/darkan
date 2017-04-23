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
                <span>Cena planu</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-plan-cost-window" data-toggle="modal" data-target="#add-new-plan-cost-window">Dodaj nową cenę planu</button>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Wersja</th>
                            <th>Nazwa planu</th>
                            <th>Opis planu</th>
                            <th>Cena</th>
                            <th>Waluta</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($plansCosts as $key => $planCost)

                        <?php 
                            $version = $planCost->version_version;
                        ?>

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td><label class="plan-version" version="{{ $version}}">{{ $version }}</label></td>
                            <td>{{ $planCost->plan_name }}</td>
                            <td>{{ $planCost->plan_description }}</td>
                            <td>{{ $planCost->cost }} </td>
                            <td>{{ $planCost->curency_name }}</td>

                            <td>

                                <button class="btn btn-primary edit-plan-cost" data-toggle="modal" data-target="#edit-plan-cost-window" 
                                            plan_cost_id="{{ $planCost->id }}"
                                            version_id="{{ $planCost->version_id }}"
                                            cost="{{ $planCost->cost }}"
                                            plan_id="{{ $planCost->plan_id }}"
                                            currency_id="{{ $planCost->currency_id }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-plan-cost" data-toggle="modal" data-target="#delete-plan-cost-window" 
                                                    plan_cost_id="{{ $planCost->id }}">
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

<div class="modal fade" id="add-new-plan-cost-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nową cenę planu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">


                    <div class="form-group">
                        {!! Form::label('version_id','Wersja') !!}
                        {!! Form::select('version_id', $plansVersionsList, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('plan_id','Plan') !!}
                        {!! Form::select('plan_id', $plansArray, null, array('class' => 'form-control')) !!}
                    </div>


                    <div class="form-group">
                        {!! Form::label('cost','Cena planu') !!}
                        {!! Form::input('number', 'cost', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0','max'=>'1000000', 'step' => 'any')) !!}
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

<div class="modal fade" id="edit-plan-cost-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj cenę planu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('plan_cost_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('version_id','Wersja') !!}
                        {!! Form::select('version_id', $plansVersionsList, null, array('class' => 'form-control')) !!}
                    </div>

                     <div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('plan_id','Plan') !!}
                        {!! Form::select('plan_id', $plansArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('cost','Cena planu') !!}
                        {!! Form::input('number', 'cost', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0','max'=>'1000000', 'step' => 'any')) !!}
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

<div class="modal fade" id="delete-plan-cost-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie opcji planu</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć cenę planu?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('plan_cost_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/admin/plans_costs_list.js') }}"></script>

@endsection