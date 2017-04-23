@extends('layouts.app')

<div class="topmenu-offset"></div>

<div class="container">

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Brak opcji</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="jumbotron">
			    <h1>Nie ma takiej opcji...</h1>
			</div>

			<a class="btn btn-success" href="{{ url('pricelistoptions') }}">Dokup opcję do obecnego planu z listy dostępnych opcji</a>

		</div>
	</div>
</div>

