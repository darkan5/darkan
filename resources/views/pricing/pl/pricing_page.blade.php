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
                    <span>kupon sprzedażowy</span>
                    <div class="btn-group pull-right">
                        
                    </div>
                </div>

                {!! Form::open(array('class' => 'form',  'method' => 'post', 'url' => 'payment/buyplanbysalescoupon')) !!}

                <div class="panel-body ">

                    <div class="form-group">
                        {!! Form::text('code', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'kupon sprzedażowy')) !!}

                       
                    </div>

                    <div>
                        <p >Jeśli posiadasz kupon sprzedażowy, wpisz go tutaj, a następnie kliknij przycisk Dalej TERAZ poniżej.</p>
                    </div>

                </div>

                <div class="panel-body ">
                     {!! Form::submit('Dalej TERAZ', array('class'=>'btn btn-primary')) !!}
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

                     <a class="btn btn-success" href="{{ url('/pricelistoptions') }}" >DoDalej opcje</a>

                </div>
            </div>
        @endif


            {{--<div class="panel-heading panel-big">--}}
                {{----}}
                {{--<div class="btn-group pull-right">--}}
                    {{----}}
                {{--</div>--}}
            {{--</div>--}}
            <div class="col-lg-6">
                <div class="panel text-center price-header price-header-one">
                    <h4>Narzędzie do tworzenia kursów</h4>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="panel text-center price-header price-header-two">
                    <h4>Narzędzie do tworzenia kursów + Portal do pulikacji treści (LMS)</h4>
                </div>
            </div>
            <div class="panel-body">



                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Standard</h3>
                        </div>
                        <div class="text-center price-iteam"><h3>120 zł/mies.</h3>płatne za cały rok</div>

                        <div id="year-standard" class="text-center price-month">140 zł/mies.</div>
                        <div class="panel-body text-center price-info">
                            <p>Dla osób chcących tworzyć kursy bądź prezentacje marketingowe</p>
                        </div>
                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Wypróbuj 14 dni
                            </a>
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Kup
                            </a>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="price-iteam-li">Liczba projektów 20</li>
                            <li class="price-iteam-li">Miejsce na dysku 0.5GB</li>
                            <li class="price-iteam-li">Publiczne publikowanie treści</li>
                            <li class="price-iteam-li">Export HTML 5</li>
                            <li class="price-iteam-li">Export SCORM 1.2</li>
                            <li class="price-iteam-li"><s>Export SCORM 2004</s></li>
                            <li class="price-iteam-li"><s>Export PDF</s></li>
                            <li class="price-iteam-li"><s>Współdzielenie kontentu</s></li>
                            <li class="price-iteam-li"><s>Import PSD</s></li>

                        </ul>

                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Profesional</h3>
                        </div>
                        <div class="text-center price-iteam"><h3>250 zł/mies.</h3>płatne za cały rok</div>

                        <div id="year-profesional" class="text-center price-month">300 zł/mies.</div>
                        <div class="panel-body text-center price-info">
                            <p>Dla firm pracujących nad więszą ilością projektów</p>
                        </div>
                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Wypróbuj 14 dni
                            </a>
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Kup
                            </a>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="price-iteam-li">Liczba projektów 100</li>
                            <li class="price-iteam-li">Miejsce na dysku 6GB</li>
                            <li class="price-iteam-li">Publiczne publikowanie treści</li>
                            <li class="price-iteam-li">Export HTML 5</li>
                            <li class="price-iteam-li">Export SCORM 1.2</li>
                            <li class="price-iteam-li">Export SCORM 2004</li>
                            <li class="price-iteam-li">Export PDF</li>
                            <li class="price-iteam-li">Współdzielenie kontentu</li>
                            <li class="price-iteam-li">Import PSD</li>


                        </ul>

                    </div>
                </div>


                <div class="col-lg-3">
                    <div class="panel price panel-red text-center">
                        <div class="panel-heading  text-center">
                            <h3>E-learning Portal</h3>
                        </div>
                        <div class="text-center price-iteam">
                        <div class="price-form">
                            <form action="">
                            <select class="form-control text-center price-form-align" onchange="updatevariable(this.value)">
                                <option value="1">50 osób -  500 zł/mies.</option>
                                <option value="2">100 osób - 700 zł/mies.</option>
                                <option value="3">200 osób - 1000 zł/mies.</option>
                                <option value="4">500 osób - 2000 zł/mies.</option>
                                <option value="5">1000 osób - 4000 zł/mies.</option>
                            </select>

                        </form>
                            <div class="year-learning-form">płatne za cały rok</div>
                        </div>
                        </div>
                        <div></div>
                        <div id="year-elearning" class="price-month">50 osób - 600 zł/mies.</div>
                        <div class="panel-body text-center price-info">
                            <p>Dla firm chcących szkolić swoich pracowników lub klientów</p>
                        </div>

                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Wypróbuj 14 dni
                            </a>
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Kup
                            </a>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="price-iteam-li">Liczba projektów 100</li>
                            <li class="price-iteam-li">Miejsce na dysku 6GB</li>
                            <li class="price-iteam-li">LMS - Portal zarządzania wiedzą</li>
                            <li class="price-iteam-li">Export HTML 5</li>
                            <li class="price-iteam-li">Export SCORM 1.2</li>
                            <li class="price-iteam-li">Export SCORM 2004</li>
                            <li class="price-iteam-li">Export PDF</li>
                            <li class="price-iteam-li">Współdzielenie kontentu</li>
                            <li class="price-iteam-li">Import PSD</li>


                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Enterprise</h3>
                        </div>
                        <div class="text-center price-iteam"><h3>Kontakt</h3></div>
                        <div class="text-center price-month"><a href="mailto:office@darkan.me">office@darkan.me</a></div>
                        <div class="panel-body text-center price-info">
                            <p>Masz dużą firmę, chcesz więcej niż pozwala cennik? Skontaktuj się!</p>
                        </div>
                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                Kontakt
                            </a>

                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio ul-enterprise">
                            <li class="price-iteam-li">Funkcjonalności na zamówienie</li>
                            <li class="price-iteam-li">Integracja z systemem klienta</li>
                            <li class="price-iteam-li">Liczba projektów ∞</li>
                            <li class="price-iteam-li">Miejsce na dysku ∞</li>
                            <li class="price-iteam-li">LMS - Portal zarządzania wiedzą</li>
                            <li class="price-iteam-li">Export HTML 5</li>
                            <li class="price-iteam-li">Export SCORM 1.2</li>
                            <li class="price-iteam-li">Export SCORM 2004</li>
                            <li class="price-iteam-li">Export PDF</li>
                            <li class="price-iteam-li">Współdzielenie kontentu</li>
                            <li class="price-iteam-li">Import PSD</li>

                        </ul>

                    </div>
                </div>
                </div>





    </div>
</div>
<script type="text/javascript">

    function updatevariable(data) {

        if (data == 1){
            $('#year-elearning').text('50 osób - 600 zł/mies.');
        }
        if (data == 2){
            $('#year-elearning').text('100 osób - 800 zł/mies.');
        }
        if (data == 3){
            $('#year-elearning').text('200 osób - 1200 zł/mies.');
        }
        if (data == 4){
            $('#year-elearning').text('500 osób - 2400 zł/mies.');
        }
        if (data == 5){
            $('#year-elearning').text('1000 osób - 4400 zł/mies.');
        }
    }

</script>

@endsection