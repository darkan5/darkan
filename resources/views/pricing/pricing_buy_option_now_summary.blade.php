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

                {!! Form::open(array('class' => 'form form-controll', 'method' => 'post', 'url' => 'payment/buyoptionnow')) !!}

                    {!! Form::hidden('plan_option_id', $planOption->id) !!}

                    <p>Cena: {{ number_format($optionCost->cost, 2) }} zł brutto</p>
                    <p>Opcja: {{ $planOption->name }} </p>
           
                    @if($planOption->price_option_type_id == 1)
                        <input style="width: 100px;" checked required class="form-control" type="checkbox" class="form-control" name="plan_option_value" value="{{ $planOptionValue }}">
                    @else
                        <input style="width: 100px;" required readonly class="form-control" type="number" class="form-control" name="plan_option_value" min="{{ $planOptionValue  }}" max="{{ $planOption->value }}" value="{{ $planOptionValue }}">
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

                    {!! Form::submit('Przejdź do płatności', array('class'=>'btn btn-primary')) !!}

                {!! Form::close() !!}
            </div>

    </div>

</div>
</div>
</div>


@endsection
