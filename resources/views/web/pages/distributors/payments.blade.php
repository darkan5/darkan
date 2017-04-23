@extends('layouts.app')

@section('content')
<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>
<div class="button-wrapper">
    
    <a href="{{ url('/administration/dashboard') }}" class="btn btn-success">{{ Lang::get('distributors.userList') }}</a>
    <a href="{{ url('/administration/payments') }}" class="btn btn-success">{{ Lang::get('distributors.payments') }}</a>

</div>


<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading panel-big">
					<span><?=Lang::get('distributors.paymentsList')?></span>
				</div>
				<div class="panel-body">
                    <table class="table table-striped table-bordered table-hover datatable">
                        <thead>
                            <tr>
                                <th><?=Lang::get('distributors.invoiceId')?></th>
                                <th><?=Lang::get('distributors.userName')?></th>
                                <th><?=Lang::get('distributors.product')?></th>
                                <th><?=Lang::get('distributors.paymentStatus')?></th>
                                <th><?=Lang::get('distributors.paymentResult')?></th>
                                <th><?=Lang::get('distributors.createdAt')?></th>
                                <th><?=Lang::get('distributors.modifiedAt')?></th>
                                <th><?=Lang::get('distributors.invoiceData')?></th>
                                <th><?=Lang::get('distributors.price')?></th>
                                <th><?=Lang::get('distributors.currency')?></th>
                                <th><?=Lang::get('distributors.locale')?></th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($payments as $key => $payment)
	                        	@if ($payment->userLogin != 'undefined')
		                        <tr
	                        	@if ($payment->payment_status == 'completed')
	                        		class="success"
                        		@elseif ($payment->payment_status == 'missing')
                        			class="danger"
	                        	@endif
	                        	>
		                        	<td>{{ $payment->invoice_id }}</td>
		                        	<td>{{ $payment->userLogin }}</td>
		                        	<td>{{ $payment->product }}</td>
		                        	<td>{{ $payment->payment_status }}</td>
		                        	<td>{{ $payment->payment_result }}</td>
		                        	<td>{{ $payment->created }}</td>
		                        	<td>{{ $payment->modified }}</td>
		                        	<td>{{ $payment->invoice_data }}</td>
		                        	<td>{{ $payment->price }}</td>
		                        	<td>{{ $payment->currency }}</td>
		                        	<td>{{ $payment->locale }}</td>
		                        </tr>
		                        @endif
	                        @endforeach
                        </tbody>
                    </table>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="clearfix"></div>

<div class="topmenu-offset"></div>

@endsection