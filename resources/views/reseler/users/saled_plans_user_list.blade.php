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
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span>Opcje raportu sprzedaży</span>
                    <div class="btn-group pull-right">
                    
                    </div>
                </div>
                <div class="panel-body">

                    <div>Wybierz datę {{ $info }}</div>

                    <a href="{{ url('reseler/changeuserslisttoday') }}" class="btn btn-info">Dzisiaj</a>
                    <a href="{{ url('reseler/changeuserslistlastweek') }}" class="btn btn-info">Poprzedni tydzień</a>
                    <a href="{{ url('reseler/changeuserslistweek') }}" class="btn btn-info">Ten tydzień</a>
                    <a href="{{ url('reseler/changeuserslistlastmonth') }}" class="btn btn-info">Poprzedni miesiąc</a>
                    <a href="{{ url('reseler/changeuserslistmonth') }}" class="btn btn-info">Ten miesiąc</a>
                    <a href="{{ url('reseler/changeuserslistyear') }}" class="btn btn-info">Ten rok</a>

                    <hr>
                    
                    {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'reseler/changesale')) !!}

                        <div class="form-group col-md-4">
                            {!! Form::label('start_date','Od:') !!}
                            {!! Form::text('start_date', $start_date, 
                                array('required', 
                                      'class'=>'datepicker-start-date-add form-control', 
                                      'placeholder'=>'Od')) !!}
                        </div>

                        <div class="form-group col-md-4">
                            {!! Form::label('end_date','Do:') !!}
                            {!! Form::text('end_date', $end_date, 
                                array('required', 
                                      'class'=>'datepicker-end-date-add form-control', 
                                      'placeholder'=>'Do')) !!}
                        </div>


                    {!! Form::submit('Zmień datę raportu', array('class'=>'btn btn-info')) !!}
                    {!! Form::close() !!}

                </div>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span>Saldo</span>
                    <div class="btn-group pull-right">
                    
                    </div>
                </div>
                <div class="panel-body">

                    <span>Suma przychodu w okresie od <b>{{ $start_date }}</b> do <b>{{ $end_date }}</b>: ({{ $timeAmountForHumans }})</span>
                    
                    <br>
                    <span><h1>{{ number_format($saldo, 2, ',', ' ') }} zł brutto</h1></span>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
    <div class="col-md-12">
        <div class="panel panel-primary">
            <div class="panel-heading panel-big">
                <span>Użytkownicy</span>
                <div class="btn-group pull-right">
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover ">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Twój kod partnera</th>
                            <th>Data sprzedaży</th>
                            <th>Zakupiony plan</th>
                            <th>Wartość planu</th>
                            <th>Prowizja %</th>
                            <th>Prowizja brutto</th>
                            <th>Waluta</th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($usersToPromoCodes as $key => $userToPromoCode)

                        <tr>

                            <td>{!! $key + 1 !!}</td>
                            <td>{{ $userToPromoCode->promo_code_name}}</td>
                            <td>{{ $userToPromoCode->plan_user_created_at}}</td>
                            <td>{{ $userToPromoCode->plan_description}}</td>
                            <td>{{ $userToPromoCode->plan_cost}}</td>
                            <td>{{ $userToPromoCode->promo_code_rabat}} %</td>
                            <td>{{ $userToPromoCode->provision}} </td>
                            <td>[{{ $userToPromoCode->currency_name}}]</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
</div>

<script type="text/javascript">
    $('table').DataTable({
            responsive: true,            
            "language": {
                "lengthMenu": '<?=Lang::get('tables.lengthMenu')?>',
                "zeroRecords": '<?=Lang::get('tables.zeroRecords')?>',
                "info": '<?=Lang::get('tables.info')?>',
                "infoEmpty": '<?=Lang::get('tables.infoEmpty')?>',
                "infoFiltered": '<?=Lang::get('tables.infoFiltered')?>',
                "search":         '<?=Lang::get('tables.search')?>',
                "paginate": {
                    "first":      '<?=Lang::get('tables.first')?>',
                    "last":       '<?=Lang::get('tables.last')?>',
                    "next":       '<?=Lang::get('tables.next')?>',
                    "previous":   '<?=Lang::get('tables.previous')?>'
                },
            }
    });
</script>

<script src="{{ asset('/js/roles/partner/partner_saled_reaport.js') }}"></script>


@endsection