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
    <div class="col-md-12">
    <div class="centering-container">


        <div class="panel panel-primary">
            <div class="panel-heading">Kup konto</div>
            <div class="panel-body">

                <h2>Konto {{ $plan->name }}</h2>

                <form  role="form" method="post" action="{{ url('payment/buynow') }}">

                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" class="form-control" name="plan_id" value="{{ $plan->id}}">
                    <input type="hidden" class="form-control promo-code-input" name="promo_code" value="{{ $promoCode->code }}">

                    @if($rabatPercent > 0)
                        
                        <p>Cena: {{ number_format($planCost, 2) }} zł</p>
                        <p>Rabat: {{ $rabatPercent }}%</p>
                        <p>Wartość rabatu: {{ number_format($rabatValue, 2) }} zł</p>
                        <p>Cena po rabacie: {{ number_format($planCostWithRabat, 2) }} zł brutto</p> 

                    @else
                        <p>Cena: {{ number_format($planCostWithRabat, 2) }} zł brutto</p>
                    @endif

                   
                    <br/>

                    <div class="form-group">
                        {!! Form::label('client', 'Imię i nazwisko*', array('class' => 'control-label')) !!}
                        {!! Form::text('client', Auth::user()->name, 
                            array('required', 
                                  'class'=>'form-control input-xlarge', 
                                  'placeholder'=>'Imię i nazwisko',
                                  'pattern'=>'^(?!\s|.*\s$).*$')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('email', 'Email*', array('class' => 'control-label')) !!}
                        {!! Form::text('email', Auth::user()->email, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('address', 'Adres*', array('class' => 'control-label')) !!}
                        {!! Form::text('address', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Adres',
                                  'pattern'=>'^(?!\s|.*\s$).*$')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('zip', 'Kod pocztowy*', array('class' => 'control-label')) !!}
                        {!! Form::text('zip', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'xx-xxx',
                                  'pattern'=>'^[0-9]{2}-[0-9]{3}$' )) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('city', 'Miasto*', array('class' => 'control-label')) !!}
                        {!! Form::text('city', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Miasto',
                                  'pattern'=>'^(?!\s|.*\s$).*$')) !!}
                    </div>

                    <div class="form-group">
                        <label class="control-label">Regulamin*</label>
                        <br>
                        <label class="control-label">Akceptuję
                            <input required type="checkbox" name="rules">
                        </label>

                        <a href="{{ url('pricing/rules') }}" target="_blank">Czytaj regulamin</a>

                    </div>

                    <p>* - pole wymagane do wypełnienia</p>

                    <button type="submit" class="btnFont btn btn-primary text-center">
                        Przejdź do płatności
                    </button>

                    <br/>
                    <br/>

                </form>
            </div>

    </div>

</div>
</div>
</div>

@endsection
