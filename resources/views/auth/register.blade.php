@extends('layouts.app')

@section('title')
    {{ Lang::get('login.title_register') }}
@stop

@section('description')
    {{ Lang::get('login.description_register') }}
@stop


@section('content')

<link href="{{ asset('/css/login.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>
<h3 class="text-center">{{ Lang::get('login.description_register') }}</h3>
<br/>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Rejestracja</div>
                <div class="panel-body">


                    <div class="col-md-3 social-buttons-container">
                        <div class="social-continer register-container">
                            <div class="social-button fblogin">
                                <a href="{{ url('/login/facebook') }}">
                                    <span><?=Lang::get('login.registerWith_FB')?></span>
                                </a>
                            </div>
                            <div class="social-button gplogin">
                                <a href="{{ url('/login/google') }}">
                                    <span><?=Lang::get('login.registerWith_GP')?></span>
                                </a>
                            </div>
                            <div class="social-button inlogin">
                                <a href="{{ url('/login/linkedin') }}">
                                    <span><?=Lang::get('login.registerWith_IN')?></span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9">

                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/register') }}">
                            {{ csrf_field() }}

                            <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                <label for="name" class="col-md-3 control-label">Imię i nazwisko</label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="email-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                    @if ($errors->has('name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-3 control-label">Adres email</label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="email-addon"><i class="fa fa-envelope"></i></span>
                                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                <label for="password" class="col-md-3 control-label">Hasło</label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="password-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
                                    <input id="password" type="password" class="form-control" name="password" required>

                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('password') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                                <label for="password-confirm" class="col-md-3 control-label">Powtórz hasło</label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="password-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>

                                    @if ($errors->has('password_confirmation'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('password_confirmation') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-offset-4">
                                    <input type="checkbox" id="termsandconditions-checkbox" name="terms" required="true"> <?=Lang::get('login.REGULAMIN_1')?> <a href="{{ url('/termsandconditions') }}" target="_blank"><?=Lang::get('login.REGULAMIN_2') ?></a> <?=Lang::get('login.REGULAMIN_3') ?>
                                </label>
                            </div>

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        Zarejestruj się
                                    </button>

                                    <a class="btn btn-link" href="{{ url('/password/reset') }}">
                                        <?=Lang::get('login.forgetPassword')?>
                                    </a>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
