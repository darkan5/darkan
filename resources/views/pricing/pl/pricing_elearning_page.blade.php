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
            <div class="panel panel-primary">
                <div class="panel-heading panel-big">

                    <div class="btn-group pull-right">

                    </div>
                </div>
                <div class="panel-body">

                    <div class="col-lg-3">
                        <div class="panel price panel-red">
                            <div class="panel-heading  text-center">
                                <p>Elearning</p>
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

                            </div>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <div class="panel">
                            <div class="panel-heading text-center">
                                <h3>Elearning Plan</h3>
                            </div>
                            <div class="panel-body text-center">
                                <p class="lead"><strong>Idealny plan dla nauczycieli i firm chcących szkolić swoich pracowników</strong></p>


                                <div class="col-lg-4">
                                    <form role="form" method="post" action="{{url('payment/buynowsummary') }}">

                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <input type="hidden" class="form-control promo-code-input" name="promo_code" value="*">
                                        <input type="hidden" class="form-control" name="plan_id" value="{{ $plans[0]->plan_id }}">

                                        <div class="panel price panel-red">
                                            <div class="panel-heading  text-center">
                                                <p>1 miesiąc</p>
                                            </div>
                                            <div class="panel-body text-center">
                                                <p>{{ $plans[0]->cost }}</p>
                                            </div>
                                            <div class="panel-footer">
                                                <button type="submit" class="btn btn-lg btn-block btn-danger">
                                                    KUP TERAZ
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-lg-4">
                                    <form role="form" method="post" action="{{url('payment/buynowsummary') }}">

                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <input type="hidden" class="form-control promo-code-input" name="promo_code" value="*">
                                        <input type="hidden" class="form-control" name="plan_id" value="{{ $plans[1]->plan_id }}">

                                        <div class="panel price panel-red">
                                            <div class="panel-heading  text-center">
                                                <p>6 miesięcy</p>
                                            </div>
                                            <div class="panel-body text-center">
                                                <p>{{ $plans[1]->cost }}</p>
                                            </div>
                                            <div class="panel-footer">
                                                <button type="submit" class="btn btn-lg btn-block btn-primary">
                                                    KUP TERAZ
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-lg-4">
                                    <form role="form" method="post" action="{{url('payment/buynowsummary') }}">

                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <input type="hidden" class="form-control promo-code-input" name="promo_code" value="*">
                                        <input type="hidden" class="form-control" name="plan_id" value="{{ $plans[2]->plan_id }}">

                                        <div class="panel price panel-red">
                                            <div class="panel-heading  text-center">
                                                <p>12 miesięcy</p>
                                            </div>
                                            <div class="panel-body text-center">
                                                <p>{{ $plans[2]->cost }}</p>
                                            </div>
                                            <div class="panel-footer">
                                                <button type="submit" class="btn btn-lg btn-block btn-success">
                                                    KUP TERAZ
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>

                            <div class="row text-center ">
                                <br/>

                                <p>Jeśli posiadasz kod rabatowy, wpisz go tutaj, a następnie kliknij przycisk KUP TERAZ powyżej.</p>

                                <div class="col-md-3 col-xs-3"></div>


                                <div class="form-inline form-group kodRabatowy col-xs-6">

                                    <div style="margin: 10px 10px 10px 10px">

                                        <label for="kodRabatowy"><b>Kod rabatowy:&nbsp;</b></label>
                                        <input class="form-control promo-code" style="text-align: center" size="32" placeholder="zostaw puste pole jeśli nie posiadasz" id="kodRabatowy" type="text" />
                                    </div>
                                </div>
                                <div class="col-xs-3"></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <script src="{{ asset('/js/pricing/pricing.js') }}"></script>


@endsection