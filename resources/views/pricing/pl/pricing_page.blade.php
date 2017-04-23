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
    <div class="centering-container">


        @if(Auth::user() && Auth::user()->hasRole('user'))
            <div class="panel panel-primary">
                <div class="panel-heading panel-big">
                    <span>Kupon sprzedażowy</span>
                    <div class="btn-group pull-right">
                        
                    </div>
                </div>

                {!! Form::open(array('class' => 'form',  'method' => 'post', 'url' => 'payment/buyplanbysalescoupon')) !!}

                <div class="panel-body ">

                    <div class="form-group">
                        {!! Form::text('code', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Kupon sprzedażowy')) !!}

                       
                    </div>

                    <div>
                        <p >Jeśli posiadasz kupon sprzedażowy, wpisz go tutaj, a następnie kliknij przycisk KUP TERAZ poniżej.</p>
                    </div>

                </div>

                <div class="panel-body ">
                     {!! Form::submit('KUP TERAZ', array('class'=>'btn btn-primary')) !!}
                </div>

                {!! Form::close() !!}
            </div>
        @endif

       @if($canBayPlanOptions)
            <div class="panel panel-primary">
                <div class="panel-heading panel-big">
                    <span>Dodatkowe opcje</span>
                    <div class="btn-group pull-right">
                        
                    </div>
                </div>
                <div class="panel-body">

                     <a class="btn btn-success" href="{{ url('/pricelistoptions') }}" >Dokup opcje</a>

                </div>
            </div>
        @endif

        <div class="panel panel-primary">
            <div class="panel-heading panel-big">
                <span>Cennik</span>
                <div class="btn-group pull-right">
                    
                </div>
            </div>
            <div class="panel-body">

                
                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Standard</h3>
                        </div>
                        <div class="panel-body text-center">
                            <p>Dla developerów chcących tworzyć i sprzedawać kursy bądź prezentacje marketingowe</p>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                        </ul>
                        <div class="panel-footer">
                            <a  class="btn btn-lg btn-block btn-success" href="{{ url('pricing/standard') }}">
                                KUP
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Profesional</h3>
                        </div>
                        <div class="panel-body text-center">
                            <p>Doskonałe dla małych i średnich firm, pracujących nad więszą ilością projektów</p>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                        </ul>
                        <div class="panel-footer">
                            <a  class="btn btn-lg btn-block btn-success" href="{{ url('pricing/profesional') }}">
                                KUP
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Elearning</h3>
                        </div>
                        <div class="panel-body text-center">
                            <p>Idealny plan dla nauczycieli i firm chcących szkolić swoich pracowników</p>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                        </ul>
                        <div class="panel-footer">
                            <a  class="btn btn-lg btn-block btn-success" href="{{ url('pricing/elearning') }}">
                                KUP
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Enterprise</h3>
                        </div>
                        <div class="panel-body text-center">
                            <p>Masz dużą firmę, chcesz więcej niż pozwala cennik? Skontaktuj się!</p>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                            <li class="list-group-item"></li>
                        </ul>
                        <div class="panel-footer">
                            <a  class="btn btn-lg btn-block btn-success" href="{{ url('pricing/enterprise') }}">
                                KUP
                            </a>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
</div>


@endsection