@extends('layouts.app')

@if (Session::has('file.download'))
       <meta http-equiv="refresh" content="0;url={{ '' }}">
     @endif

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
					<span>Wygenerowane kupony sprzedażowe</span>
					<div class="btn-group pull-right">

						<button class="btn btn-info add-new-sales-coupon-window" data-toggle="modal" data-target="#add-new-sales-coupon-window">Dodaj nowe kupony sprzedażowe</button>
						<a href="{{ url('admin/salescouponsgroups') }}" class="btn btn-success">Dodaj nową grupę</a>
					</div>
				</div>

				<div class="panel-body">

					{!! Form::open(array('class' => 'form',  'method' => 'put', 'url' => 'admin/salescouponsgenerated')) !!}

					<div>

						<Label>Pliki do pobrania</Label>
						<div>
							<input type="submit" name="file_type" value="csv" class="btn btn-success">
			                <input type="submit" name="file_type" value="xls" class="btn btn-success">
			                <input type="submit" name="file_type" value="json" class="btn btn-success">	
						</div>					
	                </div>

	                <hr>

                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Wybrany</th>
                                <th>Kupon</th>
                                <th>Plan</th>
                                <th>Grupa</th>
                                <th>Opis</th>
                                <th>Cena</th>
                                <th>Utworzony</th>
                                <th>Modyfikowany</th>
                                <th>Pobrany</th>
                                <th>Aktywny</th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($salesCoupons as $key => $salesCoupon)
                    
	                        <tr>
	                        	<td>{!! $key + 1 !!}</td>
	                        	<td>
	                        		<input checked value="{{ $salesCoupon->id }}" type="checkbox" name="sales_coupon_ids[]"> 
	                        	</td>
	                        	<td>{{ $salesCoupon->code }}</td>
	                        	<td>{{ $salesCoupon->plan->description }}</td>
	                        	<td>{{ $salesCoupon->group->name }}</td>
	                        	<td style="max-width:200px;">{{ $salesCoupon->description }}</td>
	                        	<td>{{ $salesCoupon->cost }}</td>
	                        	<td>{{ $salesCoupon->created_at }}</td>
	                        	<td>{{ $salesCoupon->updated_at }}</td>
	                        	<td>{{ $salesCoupon->downloaded ? 'Tak' : 'Nie' }}</td>
	                        	<td class="{{ $salesCoupon->activeOnOffStates->state ? 'success' : 'danger'}}">{{ $salesCoupon->activeOnOffStates->name }}</td>
	                        		
	                        </tr>
	                        @endforeach
                        </tbody>
                    </table>

                    {!! Form::close() !!}

				</div>
			</div>
	
		</div>
	</div>
</div>

<div class="modal fade" id="add-new-sales-coupon-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Dodaj nowe kupony sprzedażowe</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
			<div class="modal-body">

					<div class="form-group">
					    {!! Form::label('plan_id','Plan włączony po aktywacji kuponu') !!}
					    {!! Form::select('plan_id', $plansArray, null, array('class' => 'form-control')) !!}
					</div>

					<div class="form-group">
					    {!! Form::label('sales_coupon_group_id','Grupa, do której należy kupon') !!}
					    {!! Form::select('sales_coupon_group_id', $salesCouponGroupsArray, null, array('class' => 'form-control')) !!}
					</div>

                    <div class="form-group">
                        {!! Form::label('description', 'Opis', array('class' => 'control-label')) !!}
                        {!! Form::text('description', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('prefix', 'Prefiks max [20]', array('class' => 'control-label')) !!}
                        {!! Form::text('prefix', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'',
                                  'max' => '20')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('cost','Cena') !!}
                        {!! Form::input('number', 'cost', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0', 'max'=>'1000000')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('sales_coupon_counts','Ilość') !!}
                        {!! Form::input('number', 'sales_coupon_counts', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0', 'max'=>'10000')) !!}
                    </div>

					<div class="form-group">
					    {!! Form::label('active','Kupon aktywny') !!}
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


<script src="{{ asset('/js/roles/admin/sales_coupons.js') }}"></script>

@endsection