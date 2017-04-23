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
    <div class="col-md-12">
        <div class="panel panel-primary">
            <div class="panel-heading panel-big">
                <span>Wszystkie opcje dostępne dla Ciebie</span>
                <div class="btn-group pull-right">
                   
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Opcja planu</th>
                            <th>Opis</th>
                            <th>Cena</th>
                            <th>Typ opcji</th>
                            <th>Waluta</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($avaliablePricePlansOptions as $key => $pricePlanOption)

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $pricePlanOption->name }}</td>
                            <td>{{ $pricePlanOption->description }}</td>

                            <?php 
                                $planOptionCosts = $pricePlanOption->planOptionCosts;
                             ?>

                            <td>{{ $planOptionCosts->cost }}</td>

                            <td>

                                @if($pricePlanOption->price_option_type_id == 1)
                                    Za opcje
                                @endif

                                @if($pricePlanOption->price_option_type_id == 2)
                                    Za sztukę
                                @endif

                            </td>

                            <td>{{ $planOptionCosts->currency->name }}</td>
                            <td>
                                <a class="btn btn-success" href="{{ url('pricelistoption', $pricePlanOption->id) }}">Dokup opcję</a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

@endsection