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

@if($user)
	
<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading panel-big">
					<span>Plany użytkownika {{ $user->name }} ({{ $user->email }})</span>
					<div class="btn-group pull-right">
						<button class="btn btn-success" data-toggle="modal" data-target="#add-plan-to-user-window">Dodaj nowy plan do użytkownika</button>
						<a class="btn btn-danger" href="{{ url('admin/groups') }}">{{ Lang::get('utils.goback') }}</a>
					</div>
				</div>
				<div class="panel-body">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                            	<th></th>
                                <th>Plan id</th>
                                <th>Plan nazwa</th>
                                <th>Plan opis</th>
                                <th>Kod promocyjny</th>
                                <th>Opcje planu</th>
                                <th>Rozpoczęcie planu</th>
                                <th>Zakończenie planu</th>
                                <th>Wartość planu</th>
                                <th>Zapłacono</th>
                                <th>Waluta</th>
                                <th>Ważność od rozpoczęcia</th>
                                <th>Aktywny</th>
                                <th>Opcje</th>
                            </tr>
                        </thead>
                        <tbody  class="user-plans-sortabe-table">

                        	@foreach ($plansUser as $key => $planUser)

                        	<?php 

                        		Carbon::setLocale('pl');

                                $startTime = Carbon::parse($planUser->start_date);
                                $finishTime = Carbon::parse($planUser->expiration_date);

                                CarbonInterval::setLocale('pl');
                                $timeAmount = Carbon::createFromFormat('Y-m-d H:i:s', $startTime)->diff(Carbon::createFromFormat('Y-m-d H:i:s', $finishTime));
                                $timeAmountForHumans = CarbonInterval::create($timeAmount->y, $timeAmount->m, 0,  $timeAmount->d, $timeAmount->h, $timeAmount->i, $timeAmount->s);

                        		$isBetween = false;
    
                        		$now = time();
								$first = DateTime::createFromFormat('Y-m-d H:i:s', $planUser->start_date)->getTimestamp();
								$second = DateTime::createFromFormat('Y-m-d H:i:s', $planUser->expiration_date)->getTimestamp();

								$rowClass = '';

								if ($now >= $first && $now <= $second)
								{
								    $rowClass = 'success';
								}

								if($first > $now){
									$rowClass = 'warning';
								}

								if($second < $now){
									$rowClass = 'danger';
									$timeAmountForHumans = 0;
								}

								if(!$planUser->active){
									$rowClass = 'danger';
									$timeAmountForHumans = 0;
								}

								

                        	?>

	                        <tr class="{{ $rowClass }}">
	                        	<td>{{ $key + 1 }}</td>
	                        	<td>{{ $planUser->plan_id }}</td>
	                        	<td>{{ $planUser->plan->name }}</td>
	                        	<td>{{ $planUser->plan->description }}</td>
	                        	<td>{{ $planUser->promoCode->code }}</td>
	                        	<td> <textarea>{{ $planUser->plan_options }}</textarea> </td>
	                        	<td>{{ $planUser->start_date }}</td>
	                        	<td>{{ $planUser->expiration_date }}</td>
	                        	<td>{{ $planUser->plan_cost_to_pay }}</td>
	                        	<td class="{{ $planUser->plan_cost_to_pay_with_rabat > 0 ? 'success' : 'danger' }}" >{{ $planUser->plan_cost_to_pay_with_rabat }}</td>
	                        	<td>{{ $planUser->currency->name }}</td>
	                        	<td>{{ $timeAmountForHumans }}</td>
	                        	<td>{{ $planUser->active }}</td>
	                        	<td>

	                        		<button 
	                        			class="btn btn-primary edit-user-plan" 
	                        			user_plan_id="{{ $planUser->id }}" 
	                        			plan_id="{{ $planUser->plan_id }}" 
	                        			start_date="{{ $planUser->start_date }}" 
	                        			expiration_date="{{ $planUser->expiration_date }}" 
	                        			plan_cost_to_pay="{{ $planUser->plan_cost_to_pay }}" 
	                        			active="{{ $planUser->active }}" 
	                        			currency_id="{{ $planUser->currency_id }}" 
	                        			plan_options="{{ $planUser->plan_options }}" 
	                        			data-toggle="modal" 
	                        			data-target="#edit-plan-window">
	                        			{{Lang::get('utils.edit')}}
                        			</button>

                        			<button 
	                        			class="btn btn-danger delete-user-plan" 
	                        			user_plan_id="{{ $planUser->id }}"
	                        			data-toggle="modal" 
	                        			data-target="#delete-plan-window">
	                        			{{Lang::get('utils.delete')}}
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
</div>

<div class="modal fade" id="delete-plan-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Usuwanie planu</h4>
			</div>

			<div class="modal-body">
			UWAGA! Czy na pewno chcesz usunąć plan! Proces jest nieodwracalny.
			</div>
			{!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
			{!! Form::hidden('user_plan_id', null, ['user_plan_id' => null]) !!}
			{!! Form::hidden('user_id', $user->id) !!}
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<div class="modal fade" id="edit-plan-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Edytuj plan do użytkownika</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
			{!! Form::hidden('user_plan_id', null, ['user_plan_id' => null]) !!}
			{!! Form::hidden('user_id', $user->id) !!}
			<div class="modal-body">
				<div id="assignUsersView"></div>

					<div class="form-group">
					    {!! Form::label('plan_id','Rodzaj planu (wszystkie plany)') !!}
					    {!! Form::select('plan_id', $editPlansList,
						    null,
						    array('required', 
					              'class'=>'form-control', 
					              'placeholder'=>'Rodzaj planu')) !!}

					</div>

					<div class="form-group">
                        {!! Form::label('Opcje planu') !!}
                        {!! Form::textarea('plan_options', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opcje planu')) !!}
                    </div>

					<div class="form-group">
					    {!! Form::label('start_date','Rozpoczęcie planu') !!}
					    {!! Form::text('start_date', null, 
					        array('required', 
					              'class'=>'datepicker form-control', 
					              'placeholder'=>'Rozpoczęcie planu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('expiration_date','Zakończenie planu') !!}
					    {!! Form::text('expiration_date', null, 
					        array('required', 
					              'class'=>'datepicker form-control', 
					              'placeholder'=>'Zakończenie planu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('plan_cost_to_pay','Cena') !!}
					    {!! Form::input('number', 'plan_cost_to_pay', 0, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0','max'=>'1000000', 'step' => 'any')) !!}
					</div>


					<div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, null, array('class' => 'form-control')) !!}
                    </div>

					<div class="form-group">
					    {!! Form::label('active', 'Aktywny') !!}
					    {!! Form::select('active', array('0' => 'Nieaktywny', '1' => 'Aktywny'), null, array('class' => 'form-control')) !!}
					</div>

			</div>
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">{{Lang::get('utils.cancel')}}</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<div class="modal fade" id="add-plan-to-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Dodaj nowy plan do użytkownika</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
			{!! Form::hidden('user_id', $user->id) !!}
			<div class="modal-body">
				<div id="assignUsersView"></div>

					<div class="form-group">
					    {!! Form::label('plan_id','Rodzaj planu (tylko aktywne plany)') !!}
					    {!! Form::select('plan_id', $addPlansList,
						    null,
						    array('required', 
					              'class'=>'form-control', 
					              'placeholder'=>'Rodzaj planu')) !!}

					</div>

					<div class="form-group">
					    {!! Form::label('start_date','Rozpoczęcie planu') !!}
					    {!! Form::text('start_date', null, 
					        array('required', 
					              'class'=>'datepicker form-control', 
					              'placeholder'=>'Rozpoczęcie planu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('plan_cost_to_pay','Cena') !!}
					    {!! Form::input('number', 'plan_cost_to_pay', 0, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0','max'=>'1000000', 'step' => 'any')) !!}
					</div>

					<div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, null, array('class' => 'form-control')) !!}
                    </div>

			</div>
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">{{Lang::get('utils.cancel')}}</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<script src="{{ asset('/js/roles/admin/user_plan.js') }}"></script>

@endif


@endsection