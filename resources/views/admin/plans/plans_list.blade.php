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
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading panel-big">
					<span>Plany kupna, które może wybrać użytkownik</span>
					<div class="btn-group pull-right">

						<button class="btn btn-success add-new-plan-window" data-toggle="modal" data-target="#add-new-plan-window">Dodaj nowy plan</button>
						
					</div>
				</div>
				<div class="panel-body">

					<p>Wartość <b>Sprawdzanie limitu = włączone</b> Sprawdza limit użyć planu</p>
					<p>Wartość <b>Sprawdzanie daty = włączone</b> Sprawdza datę planu</p>
					<p>Kolor <b>czerwony</b> - wykorzystany limit użycia planu</p>
					<p>Kolor <b>żółty</b> - plan nie znajduje się w przedziale czasowym</p>

                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nazwa</th>
                                <th>Opis</th>
                                <th>Wersja</th>
                                <th>Użycie</th>
                                <th>Limit</th>
                                <th>Aktywny od</th>
                                <th>Aktywny do</th>
                                <th>Forma płatności</th>
                                <th>Sprawdzanie limitu</th>
                                <th>Sprawdzanie daty aktywności</th>
                                <th>Tylko dla admina</th>
                                <th>Aktywny</th>
                                <th>Opcje</th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($plans as $key => $plan)


                        	<?php 

                        		$isExpired = false;
                        		$isStale = false;

                        		if($plan->limit_enabled){
                        			$isStale = ($plan->used >= $plan->limit) ? true : false;
                        		}

                        		if($plan->date_enabled){


	                        		$now = time();
									$first = DateTime::createFromFormat('Y-m-d H:i:s', $plan->start_date)->getTimestamp();
									$second = DateTime::createFromFormat('Y-m-d H:i:s', $plan->expiration_date)->getTimestamp();

									if ($now >= $first && $now <= $second)
									{
									    $isExpired = false;
									}else{

										$isExpired = true;
									}

								}

								$version = $plan->plansVersions->version;

                        	?>


	                        <tr>
	                        	<td>{!! $key + 1 !!}</td>
	                        	<td>{{ $plan->name }}</td>
	                        	<td>{{ $plan->description }}</td>
	                        	<td><label class="plan-version" version="{{ $version}}">{{ $version }}</label></td>
	                        	<td class="{{ $isStale ? 'danger' : ''}}">{{ $plan->used }}</td>
	                        	<td class="{{ $isStale ? 'danger' : ''}}">{{ $plan->limit }}</td>
	                        	<td class="{{ $isExpired ? 'warning' : ''}}">{{ $plan->start_date }}</td>
	                        	<td class="{{ $isExpired ? 'warning' : ''}}">{{ $plan->expiration_date }}</td>
	                        	<td>{{ $plan->formOfPayment->display_name }}</td>
	                        	<td class="{{ $plan->limitOnOffStates->state ? 'success' : 'danger'}}">{{ $plan->limitOnOffStates->name }}</td>
	                        	<td class="{{ $plan->dateOnOffStates->state ? 'success' : 'danger'}}">{{ $plan->dateOnOffStates->name }}</td>
	                        	<td class="{{ $plan->forAdminOnOffStates->state ? 'success' : 'danger'}}">{{ $plan->forAdminOnOffStates->name }}</td>
	                        	<td class="{{ $plan->activeOnOffStates->state ? 'success' : 'danger'}}">{{ $plan->activeOnOffStates->name }}</td>

                    			<td>

                    				<button class="btn btn-primary edit-plan" data-toggle="modal" data-target="#edit-plan-window" 
                    							plan_id="{{ $plan->id }}"
                    							name="{{ $plan->name }}"
                    							form_of_payment_id="{{ $plan->form_of_payment_id }}"
                    							description="{{ $plan->description }}"
                    							limit="{{ $plan->limit }}"
                    							start_date="{{ $plan->start_date }}"
                    							expiration_date="{{ $plan->expiration_date }}"
                    							limit_enabled="{{ $plan->limit_enabled }}"
                    							date_enabled="{{ $plan->date_enabled }}"
                    							for_admin_only="{{ $plan->for_admin_only }}"
                    							period="{{ $plan->period }}"
                    							plans_period_type_id="{{ $plan->plans_period_type_id }}"
                    							version_id="{{ $plan->version_id }}"
                    							active="{{ $plan->active }}">
                    							Edytuj
                    				</button>

                    				<a class="btn btn-warning" href="{{ url('admin/planscostlist') . '/' . $plan->id }}">Cena planu</a>
	                    			<a class="btn btn-success" href="{{ url('admin/planstoplansoptionslist') . '/' . $plan->id }}">Opcje planu</a>
	                    			
                    				@if(count($plan->plansUsers) == 0)

	                    				<button class="btn btn-danger delete-plan" data-toggle="modal" data-target="#delete-plan-window" 
	                    							plan_id="{{ $plan->id }}">
	                    							Usuń
	                    				</button>

                    				@endif

                    				

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

<div class="modal fade" id="add-new-plan-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Dodaj nowy plan</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'admin/addnewplan')) !!}
			<div class="modal-body">

					<div class="form-group">
					    {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
					    {!! Form::text('name', null, 
					        array('required', 
					              'class'=>'form-control', 
					              'placeholder'=>'Nazwa')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('description','Opis') !!}
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
					    {!! Form::label('form_of_payment_id','Forma płatności') !!}
					    {!! Form::select('form_of_payment_id', $p24FormsOfPayment, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('period', 'Okres czasowy', array('class' => 'control-label')) !!}
					    {!! Form::input('number', 'period', 1, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'1', 'max'=>'10000')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('plans_period_type_id','Typ okresu czasowego') !!}
					    {!! Form::select('plans_period_type_id', $plansPeriodTypes, 3, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit', 'Limit użycia planu', array('class' => 'control-label')) !!}
					    {!! Form::input('number', 'limit', 1, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('start_date','Aktywny od') !!}
					    {!! Form::text('start_date', null, 
					        array('required', 
					              'class'=>'datepicker-start-date-add form-control', 
					              'placeholder'=>'Aktywny od')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('expiration_date','Aktywny do') !!}
					    {!! Form::text('expiration_date', null, 
					        array('required', 
					              'class'=>'datepicker-end-date-add form-control', 
					              'placeholder'=>'Aktywny do')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit_enabled','Sprawdzanie limitu') !!}
					    {!! Form::select('limit_enabled', $onOffStatesList, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('date_enabled','Sprawdzanie daty') !!}
					    {!! Form::select('date_enabled', $onOffStatesList, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('for_admin_only','Tylko dla admina') !!}
					    {!! Form::select('for_admin_only', $onOffStatesList, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('active','Plan aktywny') !!}
					    {!! Form::select('active', $onOffStatesList, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="edit-plan-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Edytuj plan</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'put', 'url' => 'admin/editplan')) !!}
			{!! Form::hidden('plan_id', null) !!}
			<div class="modal-body">

					<div class="form-group">
					    {!! Form::label('name','Nazwa') !!}
					    {!! Form::text('name', null, 
					        array('required', 
					              'class'=>'form-control', 
					              'placeholder'=>'Nazwa')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('description','Opis') !!}
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
					    {!! Form::label('form_of_payment_id','Forma płatności') !!}
					    {!! Form::select('form_of_payment_id', $p24FormsOfPayment, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('period', 'Okres czasowy', array('class' => 'control-label')) !!}
					    {!! Form::input('number', 'period', 1, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'1', 'max'=>'10000')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('plans_period_type_id','Typ okresu czasowego') !!}
					    {!! Form::select('plans_period_type_id', $plansPeriodTypes, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit','Limit użycia planu') !!}
					    {!! Form::input('number', 'limit', 100, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('start_date','Aktywny od') !!}
					    {!! Form::text('start_date', null, 
					        array('required', 
					              'class'=>'datepicker-start-date-edit form-control', 
					              'placeholder'=>'Aktywny od')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('expiration_date','Aktywny do') !!}
					    {!! Form::text('expiration_date', null, 
					        array('required', 
					              'class'=>'datepicker-end-date-edit form-control', 
					              'placeholder'=>'Aktywny do')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit_enabled','Sprawdzanie limitu') !!}
					    {!! Form::select('limit_enabled', $onOffStatesList, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('date_enabled','Sprawdzanie daty') !!}
					    {!! Form::select('date_enabled', $onOffStatesList, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('for_admin_only','Tylko dla admina') !!}
					    {!! Form::select('for_admin_only', $onOffStatesList, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('active','Plan aktywny') !!}
					    {!! Form::select('active', $onOffStatesList, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-plan-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Usuwanie planu</h4>
			</div>

			<div class="modal-body">
			Czy na pewno chcesz usunąć wybrany plan?
			</div>
			{!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'admin/deleteplan')) !!}
			{!! Form::hidden('plan_id', null) !!}
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<script src="{{ asset('/js/roles/admin/plans.js') }}"></script>


@endsection