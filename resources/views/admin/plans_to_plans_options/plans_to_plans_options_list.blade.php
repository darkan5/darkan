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
                <span>Opcje w planie</span>
                <div class="btn-group pull-right">
                    <button class="btn btn-success add-new-plan-to-plan_option-window" data-toggle="modal" data-target="#add-new-plan-to-plan_option-window">Dodaj opcje do planu</button>
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Plan</th>
                            <th>Opis planu</th>
                            <th>Opcja planu</th>
                            <th>Opis opcji planu</th>
                            <th>Opcje planu</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($plansToPlansOptions as $key => $planToPlanOption)

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $planToPlanOption->plan_name }}</td>
                            <td>{{ $planToPlanOption->plan_description }}</td>
                            <td>{{ $planToPlanOption->plan_option_name }}</td>
                            <td>{{ $planToPlanOption->plan_option_description }}</td>
                            <td> <textarea>{{ $planToPlanOption->plan_option_options }}</textarea> </td>

                            <td>

                                <button class="btn btn-primary edit-plan-to-plan_option" data-toggle="modal" data-target="#edit-plan-to-plan_option-window" 
                                            plan_to_plan_option_id="{{ $planToPlanOption->id }}"
                                            plan_id="{{ $planToPlanOption->plan_id }}"
                                            plan_option_id="{{ $planToPlanOption->plan_option_id }}"
                                            >
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-plan-to-plan_option" data-toggle="modal" data-target="#delete-plan-to-plan_option-window" 
                                                    plan_to_plan_option_id="{{ $planToPlanOption->id }}">
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

<div class="modal fade" id="add-new-plan-to-plan_option-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj opcję do planu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Plan') !!}
                        {!! Form::select('plan_id', $plansArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Opcja planu') !!}
                        {!! Form::select('plan_option_id', $plansOptionsArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-plan-to-plan_option-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj opcje do opcji planu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('plan_to_plan_option_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('Plan') !!}
                        {!! Form::select('plan_id', $plansArray, null, array('class' => 'form-control')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Opcja planu') !!}
                        {!! Form::select('plan_option_id', $plansOptionsArray, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-plan-to-plan_option-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie opcji z planu</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz opcję z planu?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('plan_to_plan_option_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/admin/plans_to_plans_options_list.js') }}"></script>

@endsection