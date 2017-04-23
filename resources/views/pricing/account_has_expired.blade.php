@extends('layouts.app')

@section('content')

<div class="topmenu-offset"></div>

<div class="container">
    <div class="centering-container">

        <div class="panel panel-primary">
            <div class="panel-heading">Konto wygasło</div>
            <hr/>

                <div class="panel-body text-center row">
                    <div>Twoje konto wygasło...</div>
                    <br>
                    <a class="btn btn-success" href="{{ url('pricelist') }}">Przedłuż plan</a>
                </div>

            <br><br>
        </div>
    </div>
</div>


@endsection
