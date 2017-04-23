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
					<span>Kupony sprzedażowe</span>
					<div class="btn-group pull-right">

						<button class="btn btn-success add-new-sales-coupon-group-window" data-toggle="modal" data-target="#add-new-sales-coupon-group-window">Dodaj nową grupę kuponu sprzedażowego</button>
						<a href="{{ url('admin/salescouponsgenerated') }}" class="btn btn-info">Utwórz nowy kupon sprzedażowy</a>
					</div>
				</div>
				<div class="panel-body">

                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nazwa</th>
                                <th>Opis</th>
                                <th>Opcje</th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($salesCouponsGroups as $key => $salesCouponGroup)


	                        <tr>
	                        	<td>{!! $key + 1 !!}</td>
	                        	<td>{{ $salesCouponGroup->name }}</td>
	                        	<td>{{ $salesCouponGroup->description }}</td>

                    			<td>

                    				<button class="btn btn-primary edit-sales-coupon-group" data-toggle="modal" data-target="#edit-sales-coupon-group-window" 
                    							sales_coupon_group_id="{{ $salesCouponGroup->id }}"
                    							name="{{ $salesCouponGroup->name }}"
                    							description="{{ $salesCouponGroup->description }}"
                    							>
                    							Edytuj
                    				</button>

                    				<button class="btn btn-danger delete-sales-coupon-group" data-toggle="modal" data-target="#delete-sales-coupon-group-window" 
                    							sales_coupon_group_id="{{ $salesCouponGroup->id }}">
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
</div>

<div class="modal fade" id="add-new-sales-coupon-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Dodaj nową grupę kuponu sprzedażowego</h4>
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
                        {!! Form::textarea('description', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
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

<div class="modal fade" id="edit-sales-coupon-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Edycja grupy kuponu sprzedażowego</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
			{!! Form::hidden('sales_coupon_group_id', null) !!}
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
                        {!! Form::textarea('description', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
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

<div class="modal fade" id="delete-sales-coupon-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Usuwanie grupy kuponu sprzedażowego</h4>
			</div>

			<div class="modal-body">
			Czy na pewno chcesz usunąć grupę kuponu sprzedażowego?
			</div>
			{!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
			{!! Form::hidden('sales_coupon_group_id', null) !!}
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<script src="{{ asset('/js/roles/admin/sales_coupons_groups.js') }}"></script>

@endsection