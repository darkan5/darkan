@extends('layouts.app')

@section('title')
    {{ Lang::get('login.title_login') }}
@stop

@section('description')
    {{ Lang::get('login.description_login') }}
@stop

@section('content')

<link href="{{ asset('/css/login.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>

<h3 class="text-center">{{ Lang::get('login.description_login') }}</h3>

<section id="login">
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Logowanie</div>
                <div class="panel-body">


                    <div class="col-md-3 social-buttons-container">
                        <div class="social-continer">
                            <div class="social-button fblogin">
                                <a href="{{ url('/login/facebook') }}">
                                    <span><?=Lang::get('login.loginWith_FB')?></span>
                                </a>
                            </div>
                            <div class="social-button gplogin">
                                <a href="{{ url('/login/google') }}">
                                    <span><?=Lang::get('login.loginWith_GP')?></span>
                                </a>
                            </div>
                            <div class="social-button inlogin">
                                <a href="{{ url('/login/linkedin') }}">
                                    <span><?=Lang::get('login.loginWith_IN')?></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">

                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                            {{ csrf_field() }}

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-2 control-label">Adres email</label>

                                <div class="input-group">
                                    <span class="input-group-addon" id="email-addon"><i class="fa fa-envelope"></i></span>
                                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">

                                <label for="password" class="col-md-2 control-label">Hasło</label>

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

                            

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-2">
                                    <button type="submit" class="btn btn-primary">
                                        Zaloguj się
                                    </button>

                                    <label>
                                        <input type="checkbox" name="remember"> Zapamiętaj mnie
                                    </label>

                                </div>
                            </div>

                             <div class="form-group">
                                <div class="col-md-8 col-md-offset-2">

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
</section>
@endsection
