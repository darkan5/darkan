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
                <span>Diagnoza ustawień dla wersji planów i ceny w cenniku</span>
                <span></span>
                <div class="btn-group pull-right">
                </div>
            </div>
            <div class="panel-body">

                {!! Form::open(array('class' => 'form',  'method' => 'post')) !!}

                <div class="form-group">
				    {!! Form::label('version_id','Wersja') !!}
				    {!! Form::select('version_id', $plansVersionsList, $version_id, array('class' => 'form-control')) !!}
				</div>

                <div class="form-group">
                        {!! Form::label('currency_id','Waluta') !!}
                        {!! Form::select('currency_id', $currencyArray, $currency_id, array('class' => 'form-control')) !!}
                    </div>

                {!! Form::submit('Zrób diagnozę ustawień', array('class'=>'btn btn-primary')) !!}
                {!! Form::close() !!}

            </div>
        </div>
    </div>
</div>

@endsection