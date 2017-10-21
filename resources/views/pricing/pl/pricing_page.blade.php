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
                    <h4><?=Lang::get('pricingPage.title_tools')?></h4>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="panel text-center price-header price-header-two">
                    <h4><?=Lang::get('pricingPage.title_LMS')?></h4>
                </div>
            </div>
            <div class="panel-body">



                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Standard</h3>
                        </div>
                        <div class="text-center price-iteam" id="standard-price"><h3>120 zł/mc</h3><?=Lang::get('pricingPage.payforYear')?></div>

                        <div id="year-standard" class="text-center price-month">

                            <form>
                                <div class="choose-option choose-month "><input onchange="updatevariable1(value)" class="choose-option-input" name="choose-term1" id="stan-month" value="month" type="radio" /> <?=Lang::get('pricingPage.forMonth')?></div>
                                <div class="choose-option choose-year"><input onchange="updatevariable1(value)" class="choose-option-input" name="choose-term1" id="stan-year" value="year" type="radio" checked="checked" />
                                    <?=Lang::get('pricingPage.forYear')?></div>
                            </form>


                        </div>
                        <div class="panel-body text-center price-info">
                            <p><?=Lang::get('pricingPage.title1')?></p>
                        </div>
                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.trial')?>
                            </a>
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.buy')?>
                            </a>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option1')?> 20</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option2')?> 0.5GB</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option3')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option4')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option5')?></li>
                            <li class="price-iteam-li"><s><?=Lang::get('pricingPage.option6')?></s></li>
                            <li class="price-iteam-li"><s><?=Lang::get('pricingPage.option7')?></s></li>
                            <li class="price-iteam-li"><s><?=Lang::get('pricingPage.option8')?></s></li>
                            <li class="price-iteam-li"><s><?=Lang::get('pricingPage.option9')?></s></li>
                        </ul>

                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Profesional</h3>
                        </div>
                        <div class="text-center price-iteam" id="proffesional-price"><h3>250 zł/mc</h3><?=Lang::get('pricingPage.payforYear')?></div>

                        <div id="year-profesional" class="text-center price-month">
                            <form>

                                <div class="choose-option choose-month "><input name="choose-term2" onchange="updatevariable2(value)" class="choose-option-input" id="prof-month" value="month" type="radio" /> <?=Lang::get('pricingPage.forMonth')?></div>

                                <div class="choose-option choose-year"><input name="choose-term2" onchange="updatevariable2(value)" class="choose-option-input" id="prof-year" value="year" type="radio" checked="checked" /> <?=Lang::get('pricingPage.forYear')?></div>
                            </form>

                        </div>
                        <div class="panel-body text-center price-info">
                            <p><?=Lang::get('pricingPage.title2')?></p>
                        </div>
                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.trial')?>
                            </a>
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.buy')?>
                            </a>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option1')?> 100</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option2')?> 6GB</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option3')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option4')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option5')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option6')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option7')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option8')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option9')?></li>


                        </ul>

                    </div>
                </div>


                <div class="col-lg-3">
                    <div class="panel price panel-red text-center">
                        <div class="panel-heading  text-center">
                            <h3>E-learning Portal</h3>
                        </div>
                        <div class="text-center price-iteam">
                            <div class="price-form" id="elearning-price">
                                <form action="">
                                    <select class="form-control text-center price-form-align" onchange="updatevariable(this.value)">
                                        <option value="1">50 <?=Lang::get('pricingPage.person')?> -  500 zł/mc</option>
                                        <option value="2">100 <?=Lang::get('pricingPage.person')?> - 700 zł/mc</option>
                                        <option value="3">200 <?=Lang::get('pricingPage.person')?>- 1000 zł/mc</option>
                                        <option value="4">500 <?=Lang::get('pricingPage.person')?> - 2000 zł/mc</option>
                                        <option value="5">1000 <?=Lang::get('pricingPage.person')?> - 4000 zł/mc</option>
                                    </select>

                                </form>
                                <div class="year-learning-form"><?=Lang::get('pricingPage.payforYear')?></div>
                            </div>
                        </div>
                        <div></div>
                        <div id="year-elearning" class="price-month">
                            <form>

                                <div class="choose-option choose-month "><input name="choose-term3" onchange="updatevariable3(value)" class="choose-option-input" id="elearning-month" value="month" type="radio" /> <?=Lang::get('pricingPage.forMonth')?></div>

                                <div class="choose-option choose-year"><input name="choose-term3" onchange="updatevariable3(value)" class="choose-option-input" id="elearning-year" value="year"  type="radio" checked="checked" /> <?=Lang::get('pricingPage.forYear')?></div>
                            </form>

                        </div>
                        <div class="panel-body text-center price-info">
                            <p><?=Lang::get('pricingPage.title3')?></p>
                        </div>

                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.trial')?>
                            </a>
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.buy')?>
                            </a>
                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio">
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option1')?> 100</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option2')?> 6GB</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option3')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option4')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option5')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option6')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option7')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option8')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option9')?></li>


                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="panel price panel-red">
                        <div class="panel-heading  text-center">
                            <h3>Enterprise</h3>
                        </div>
                        <div class="text-center price-iteam"><h3><?=Lang::get('pricingPage.contact')?></h3></div>
                        <div class="text-center price-month"><a href="mailto:office@darkan.me">office@darkan.me</a></div>
                        <div class="panel-body text-center price-info">
                            <p><?=Lang::get('pricingPage.title4')?></p>
                        </div>
                        <div class="panel-body">
                            <a  class="btn btn-lg btn-block " style="border:1px solid" href="{{ url('pricing/standard') }}">
                                <?=Lang::get('pricingPage.contact')?>
                            </a>

                        </div>
                        <ul class="list-group list-group-flush text-center listaRadio ul-enterprise">
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.optionEkstra')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.optionIntegration')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option1')?> ∞</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option2')?> ∞</li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option3')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option4')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option5')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option6')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option7')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option8')?></li>
                            <li class="price-iteam-li"><?=Lang::get('pricingPage.option9')?></li>

                        </ul>

                    </div>
                </div>
            </div>





        </div>
    </div>
    <script type="text/javascript">
        function updatevariable1(data) {
            if (data == 'month'){
                $('#standard-price').html('<h3>140 zł/mc</h3><?=Lang::get('pricingPage.payforMonth')?>');
            }
            if (data == 'year'){
                $('#standard-price').html('<h3>120 zł/mc</h3><?=Lang::get('pricingPage.payforYear')?>');
            }

        }
        function updatevariable2(data) {
            if (data == 'month'){
                $('#proffesional-price').html('<h3>300 zł/mc</h3><?=Lang::get('pricingPage.payforMonth')?>');
            }
            if (data == 'year'){
                $('#proffesional-price').html('<h3>250 zł/mc</h3><?=Lang::get('pricingPage.payforYear')?>');
            }

        }
        function updatevariable3(data) {

            if (data == 'month'){
                $('#elearning-price').html('<form action="">' +
                    '<select class="form-control text-center price-form-align">' +
                    '<option value="1">50 osób -  600 zł/mc</option> ' +
                    '<option value="2">100 osób - 800 zł/mc</option> ' +
                    '<option value="3">200 osób - 1200 zł/mc</option> ' +
                    '<option value="4">500 osób - 2400 zł/mc</option> ' +
                    '<option value="5">1000 osób - 4400 zł/mc</option> ' +
                    '</select> ' +
                    '</form>' +
                    '<div class="year-learning-form"><?=Lang::get('pricingPage.payforMonth')?></div> ');
            }
            if (data == 'year'){
                $('#elearning-price').html('<form action="">' +
                    '<select class="form-control text-center price-form-align">' +
                    '<option value="1">50 osób -  500 zł/mc</option> ' +
                    '<option value="2">100 osób - 700 zł/mc</option> ' +
                    '<option value="3">200 osób - 1000 zł/mc</option> ' +
                    '<option value="4">500 osób - 2000 zł/mc</option> ' +
                    '<option value="5">1000 osób - 4000 zł/mc</option> ' +
                    '</select> ' +
                    '</form>' +
                    '<div class="year-learning-form"><?=Lang::get('pricingPage.payforYear')?></div> ');
            }

        }

    </script>

@endsection