@extends('layouts.app')

@section('content')
<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">


<div class="topmenu-offset"></div>

<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="well text-center">
				<h2>
					<i class="fa fa-lock"></i>
					<?=Lang::get('utils.no_access_to_this_page')?>
				</h2>
			</div>
		</div>
	</div>
</div>


<div class="clearfix"></div>

<div class="topmenu-offset"></div>

@endsection