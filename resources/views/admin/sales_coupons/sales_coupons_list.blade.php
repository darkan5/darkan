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
					<span>Grupy</span>
					<div class="btn-group pull-right">
						<a href="{{ url('admin/salescouponsgroups') }}" class="btn btn-success">Dodaj nową grupę</a>
					</div>
				</div>
				<div class="panel-body">

					<a href="{{ url('admin/salescoupons') }}" class="btn btn-danger">Wszystkie</a>

					@foreach ($salesCouponGroupsArray as $key => $value)

						@if( $key == $selectedGroupId)

							<a href="{{ url('admin/salescouponsbygroup', $key) }}" class="btn btn-primary">{{ $value }}</a>

						@else

							<a href="{{ url('admin/salescouponsbygroup', $key) }}" class="btn btn-default">{{ $value }}</a>

						@endif

					@endforeach

					<a href="{{ url('admin/salescouponsgroups') }}" class="btn btn-success">+</a>

				</div>
			</div>


			<div class="panel panel-primary">
				<div class="panel-heading panel-big">
					<span>Kupony sprzedażowe</span>
					<div class="btn-group pull-right">

						<a href="{{ url('admin/salescouponsgenerated') }}" class="btn btn-info">Utwórz nowy kupon sprzedażowy</a>
						
					</div>
				</div>
				<div class="panel-body">

                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Kupon</th>
                                <th>Użyty</th>
                                <th>Plan</th>
                                <th>Grupa</th>
                                <th>Opis</th>
                                <th>Cena</th>
                                <th>Utworzony</th>
                                <th>Modyfikowany</th>
                                <th>Pobrany</th>
                                <th>Aktywny</th>
                                <th>Opcje</th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($salesCoupons as $key => $salesCoupon)

                        	<?php 

                        		$plansUsersToSalesCoupons = $salesCoupon->plansUsersToSalesCoupons;
                        		$couponUsed = (count($plansUsersToSalesCoupons) > 0) ? true : false;
                        		$couponUsedString = $couponUsed ? 'Tak' : 'Nie';

                        		$couponUsedClass = '';

                        		if(count($plansUsersToSalesCoupons) == 0){
                        			$couponUsedClass = '';
                        		}else if(count($plansUsersToSalesCoupons) == 1){
                        			$couponUsedClass = 'success';
                        		}else if(count($plansUsersToSalesCoupons) > 1){
                        			$couponUsedClass = 'danger';
                        		}

                        	 ?>

	                        <tr>
	                        	<td>{!! $key + 1 !!}</td>
	                        	<td>{{ $salesCoupon->code }}</td>
	                        	<td class="{{ $couponUsedClass }}">{{ $couponUsedString }} ({{ count($plansUsersToSalesCoupons) }})</td>
	                        	<td>{{ $salesCoupon->plan->description }}</td>
	                        	<td>{{ $salesCoupon->group->name }}</td>
	                        	<td style="max-width:200px;">{{ $salesCoupon->description }}</td>
	                        	<td>{{ $salesCoupon->cost }}</td>
	                        	<td>{{ $salesCoupon->created_at }}</td>
	                        	<td>{{ $salesCoupon->updated_at }}</td>
	                        	<td>{{ $salesCoupon->downloaded ? 'Tak' : 'Nie' }}</td>
	                        	<td class="{{ $salesCoupon->activeOnOffStates->state ? 'success' : 'danger'}}">{{ $salesCoupon->activeOnOffStates->name }}</td>

                    			<td>

                    				<button class="btn btn-primary edit-sales-coupon" data-toggle="modal" data-target="#edit-sales-coupon-window" 
                    							sales_coupon_id="{{ $salesCoupon->id }}"
                    							code="{{ $salesCoupon->code }}"
                    							plan_id="{{ $salesCoupon->plan_id }}"
                    							sales_coupon_group_id="{{ $salesCoupon->sales_coupon_group_id }}"
                    							description="{{ $salesCoupon->description }}"
                    							cost="{{ $salesCoupon->cost }}"
                    							sales_coupon_counts="{{ $salesCoupon->sales_coupon_counts }}"
                    							active="{{ $salesCoupon->active }}">
                    							Edytuj
                    				</button>

                    				@if(!$couponUsed)

	                    				<button class="btn btn-danger delete-sales-coupon" data-toggle="modal" data-target="#delete-sales-coupon-window" 
	                    							sales_coupon_id="{{ $salesCoupon->id }}">
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

<div class="modal fade" id="edit-sales-coupon-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Edycja kuponu sprzedażowego</h4>
			</div>

			{!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
			{!! Form::hidden('sales_coupon_id', null) !!}
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
                        {!! Form::label('cost','Cena') !!}
                        {!! Form::input('number', 'cost', 0, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'min'=>'0', 'max'=>'1000000')) !!}
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

<div class="modal fade" id="delete-sales-coupon-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Usuwanie kuponu sprzedażowego</h4>
			</div>

			<div class="modal-body">
			Czy na pewno chcesz usunąć kupon sprzedażowy?
			</div>
			{!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
			{!! Form::hidden('sales_coupon_id', null) !!}
			<div class="modal-footer">
			    {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
				<button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

<script src="{{ asset('/js/roles/admin/sales_coupons.js') }}"></script>

<script type="text/javascript">
    $('.table').DataTable({
            responsive: true,            
            "language": {
                "lengthMenu": '<?=Lang::get('tables.lengthMenu')?>',
                "zeroRecords": '<?=Lang::get('tables.zeroRecords')?>',
                "info": '<?=Lang::get('tables.info')?>',
                "infoEmpty": '<?=Lang::get('tables.infoEmpty')?>',
                "infoFiltered": '<?=Lang::get('tables.infoFiltered')?>',
                "search":         '<?=Lang::get('tables.search')?>',
                "paginate": {
                    "first":      '<?=Lang::get('tables.first')?>',
                    "last":       '<?=Lang::get('tables.last')?>',
                    "next":       '<?=Lang::get('tables.next')?>',
                    "previous":   '<?=Lang::get('tables.previous')?>'
                },
            }
    });
</script>

@endsection