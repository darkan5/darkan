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

<div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading panel-big">
                <span>Dodaj opcje</span>
                <div class="btn-group pull-right">
                    
                </div>
            </div>
            <div class="panel-body">


                {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => '/payment/buyoptionnowsummary' )) !!}

                    <input type="hidden" class="form-control" name="plan_option_id" value="{{ $planOption->id }}">

                    <p>{{ $planOption->name }}</p>

                    <div class="form-group col-md-4">
                        @if($planOption->price_option_type_id == 1)
                            <input  style="width: 100px;" required class="form-control" type="checkbox" class="form-control" name="plan_option_value" checked>
                        @else
                            <input style="width: 100px;" required class="form-control" type="number" class="form-control" name="plan_option_value" min="{{ $planOptionValue  }}" max="{{ $planOption->value }}" value="{{ $planOptionValue }}">
                        @endif
                    </div>

                    <div class="form-group col-md-4">

                    {!! Form::submit('Kup teraz', array('class'=>'btn btn-primary')) !!}

                    </div>

                {!! Form::close() !!}  

            </div>
        </div>
</div>


<script src="{{ asset('/js/pricing/pricing.js') }}"></script>


@endsection