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
					<span>Kody promocyjne</span>
					<div class="btn-group pull-right">

						<button class="btn btn-success add-new-promocode-window" data-toggle="modal" data-target="#add-new-promocode-window">Dodaj nowy kod promocyjny</button>
						
					</div>
				</div>
				<div class="panel-body">

					<p>Wartość <b>Sprawdzanie limitu = włączone</b> Sprawdza limit użyć kodu</p>
					<p>Wartość <b>Sprawdzanie daty = włączone</b> Sprawdza datę kodu</p>
					<p>Kolor <b>czerwony</b> - wykorzystany limit użycia kodu</p>
					<p>Kolor <b>żółty</b> - kod nie znajduje się w przedziale czasowym</p>

                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Kod</th>
                                <th>Użycie</th>
                                <th>Limit</th>
                                <th>Rabat [%]</th>
                                <th>Rozpoczęcie</th>
                                <th>Zakończenie</th>
                                <th>Sprawdzanie limitu</th>
                                <th>Sprawdzanie daty</th>
                                <th>Aktywny</th>
                                <th>Opcje</th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($promoCodes as $key => $promoCode)


                        	<?php 

                        		$isExpired = false;
                        		$isStale = false;

                        		$used = count($promoCode->plansUsers);

                        		if($promoCode->limit_enabled){
                        			$isStale = ($used >= $promoCode->limit) ? true : false;
                        		}

                        		if($promoCode->date_enabled){


	                        		$now = time();
									$first = DateTime::createFromFormat('Y-m-d H:i:s', $promoCode->start_date)->getTimestamp();
									$second = DateTime::createFromFormat('Y-m-d H:i:s', $promoCode->expiration_date)->getTimestamp();

									if ($now >= $first && $now <= $second)
									{
									    $isExpired = false;
									}else{

										$isExpired = true;
									}

								}

                        	?>


	                        <tr>
	                        	<td>{!! $key + 1 !!}</td>
	                        	<td>{{ $promoCode->code }}</td>
	                        	<td class="{{ $isStale ? 'danger' : ''}}">{{ $used }}</td>
	                        	<td class="{{ $isStale ? 'danger' : ''}}">{{ $promoCode->limit }}</td>
	                        	<td>{{ $promoCode->rabat }}</td>
	                        	<td class="{{ $isExpired ? 'warning' : ''}}">{{ $promoCode->start_date }}</td>
	                        	<td class="{{ $isExpired ? 'warning' : ''}}">{{ $promoCode->expiration_date }}</td>
	                        	<td class="{{ $promoCode->limitOnOffStates->state ? 'success' : 'danger'}}">{{ $promoCode->limitOnOffStates->name }}</td>
	                        	<td class="{{ $promoCode->dateOnOffStates->state ? 'success' : 'danger'}}">{{ $promoCode->dateOnOffStates->name }}</td>
	                        	<td class="{{ $promoCode->activeOnOffStates->state ? 'success' : 'danger'}}">{{ $promoCode->activeOnOffStates->name }}</td>

                    			<td>

                    				<button class="btn btn-primary edit-promocode" data-toggle="modal" data-target="#edit-promocode-window" 
                    							promo_code_id="{{ $promoCode->id }}"
                    							code="{{ $promoCode->code }}"
                    							limit="{{ $promoCode->limit }}"
                    							rabat="{{ $promoCode->rabat }}"
                    							start_date="{{ $promoCode->start_date }}"
                    							expiration_date="{{ $promoCode->expiration_date }}"
                    							limit_enabled="{{ $promoCode->limit_enabled }}"
                    							date_enabled="{{ $promoCode->date_enabled }}"
                    							active="{{ $promoCode->active }}">
                    							Edytuj
                    				</button>

                    				@if(count($promoCode->plansUsers) == 0)

	                    				<button class="btn btn-danger delete-promocode" data-toggle="modal" data-target="#delete-promocode-window" 
	                    							promo_code_id="{{ $promoCode->id }}">
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

<div class="modal fade" id="add-new-promocode-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Dodaj nowy kod promocyjny</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
			<div class="modal-body">

					<div class="form-group">
					    {!! Form::label('code','Kod promocyjny') !!}
					    {!! Form::text('code', null, 
					        array('required', 
					              'class'=>'form-control', 
					              'placeholder'=>'Kod promocyjny')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit','Limit użycia kodu') !!}
					    {!! Form::input('number', 'limit', 100, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0', 'max'=>'10000')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('rabat', 'Rabat [%]') !!}
					    {!! Form::input('number', 'rabat', 0, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0', 'max'=>'100')) !!}
					</div>


					<div class="form-group">
					    {!! Form::label('start_date','Rozpoczęcie kodu') !!}
					    {!! Form::text('start_date', null, 
					        array('required', 
					              'class'=>'datepicker-start-date-add form-control', 
					              'placeholder'=>'Rozpoczęcie kodu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('expiration_date','Zakończenie kodu') !!}
					    {!! Form::text('expiration_date', null, 
					        array('required', 
					              'class'=>'datepicker-end-date-add form-control', 
					              'placeholder'=>'Zakończenie kodu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit_enabled','Sprawdzanie limitu') !!}
					    {!! Form::select('limit_enabled', array('1' => 'Włączone', '0' => 'Wyłączone'), null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('date_enabled','Sprawdzanie daty') !!}
					    {!! Form::select('date_enabled', array('1' => 'Włączone', '0' => 'Wyłączone'), null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('active','Kod aktywny') !!}
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

<div class="modal fade" id="edit-promocode-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Edycja kodu promocyjnego</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
			{!! Form::hidden('promo_code_id', null) !!}
			<div class="modal-body">

					<div class="form-group">
					    {!! Form::label('code','Kod promocyjny') !!}
					    {!! Form::text('code', null, 
					        array('required', 
					              'class'=>'form-control', 
					              'placeholder'=>'Kod promocyjny')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit','Limit użycia kodu') !!}
					    {!! Form::input('number', 'limit', 100, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0', 'max'=>'10000')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('rabat','Rabat [%]') !!}
					    {!! Form::input('number', 'rabat', 0, 
					        array('required', 
					              'class'=>'form-control', 
					              'min'=>'0', 'max'=>'100')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('start_date','Rozpoczęcie kodu') !!}
					    {!! Form::text('start_date', null, 
					        array('required', 
					              'class'=>'datepicker-start-date-edit form-control', 
					              'placeholder'=>'Rozpoczęcie kodu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('expiration_date','Zakończenie kodu') !!}
					    {!! Form::text('expiration_date', null, 
					        array('required', 
					              'class'=>'datepicker-end-date-edit form-control', 
					              'placeholder'=>'Zakończenie kodu')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('limit_enabled','Sprawdzanie limitu') !!}
					    {!! Form::select('limit_enabled', array('1' => 'Włączone', '0' => 'Wyłączone'), null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('date_enabled','Sprawdzanie daty') !!}
					    {!! Form::select('date_enabled', array('1' => 'Włączone', '0' => 'Wyłączone'), null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('active','Kod aktywny') !!}
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

<div class="modal fade" id="delete-promocode-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Usuwanie kodu promocyjnego</h4>
			</div>

			<div class="modal-body">
			Czy na pewno chcesz usunąć kod promocyjny?
			</div>
			{!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
			{!! Form::hidden('promo_code_id', null) !!}
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<script src="{{ asset('/js/moment.js') }}"></script>
<script src="{{ asset('/js/roles/distributor/promocodes.js') }}"></script>


@endsection