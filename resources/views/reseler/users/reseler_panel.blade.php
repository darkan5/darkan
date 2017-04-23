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

	<h1>Panel reselera</h1>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Użytkownicy</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="{{ url('reseler/userslist') }}">
			
					<img class="portal-settings-image" src="{{ url('css/img/options.png') }}">
					<h4>Lista użytkowników</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Sprzedaż</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="{{ url('reseler/sale') }}">
			
					<img class="portal-settings-image" src="{{ url('css/img/options.png') }}">
					<h4>Sprzedaż przez kody promocyjne</h4>

				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="{{ url('reseler/salerabat') }}">
			
					<img class="portal-settings-image" src="{{ url('css/img/options.png') }}">
					<h4>Sprzedaż przez rabat</h4>
				</a>
			</div>

		</div>
	</div>

</div>


@endsection