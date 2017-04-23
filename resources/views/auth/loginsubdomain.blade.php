<meta name="csrf-token" content="{{ csrf_token() }}" />

<link href="{{ asset('/css/login.css') }}" rel="stylesheet">
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default auth-form">
				<div class="panel-body">
					@if (count($errors) > 0)
						<div class="alert alert-danger">
							{{ Lang::get('login.problemsWithLoginInput') }}<br><br>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
					@endif
					<div class="col-md-12">

						<form id="login-form" class="form-horizontal" role="form" method="POST" action="{{ url('/subdomain/login') }}">
							<legend><?=Lang::get('login.usingForm')?></legend>
							<input type="hidden" name="_token" value="{{ csrf_token() }}">
							<input type="hidden" name="callbackurl" value="{{ url('') }}">

							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon" id="email-addon"><i class="fa fa-envelope"></i></span>
									<input autofocus required placeholder="<?=Lang::get('login.emailAddress')?>" type="email" class="form-control" name="email" value="{{ old('login') }}" aria-describedby="email-addon">
								</div>
							</div>

							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon" id="password-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
									<input required placeholder="<?=Lang::get('login.password')?>" type="password" class="form-control" name="password" aria-describedby="password-addon">
								</div>
							</div>

							<div class="form-group">
								<button type="submit" class="btn btn-login"><?=Lang::get('login.loginBtn')?></button>
							</div>
							<div class="form-group link-buttons">
								<a href="{{ url('/password/email') }}"><?=Lang::get('login.forgetPassword')?></a>
								<i class="fa fa-circle login-dot" ></i>
								<a class="loginregisterbutton" href=""><?=Lang::get('login.registerBtnFooter')?></a>
							</div>
						</form>

						<form style="display:none" id="register-form" class="form-horizontal" role="form" method="POST" action="{{ url('/subdomain/register') }}">
							<legend><?=Lang::get('login.registerYourself')?></legend>
							<input type="hidden" name="_token" value="{{ csrf_token() }}">
							<input type="hidden" name="callbackurl" value="{{ url('') }}">
							<input type="hidden" name="sid" value="{{ $subdomainOwnerId }}">

							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon" id="user-addon"><i class="fa fa-user"></i></span>
									<input required type="text" placeholder="<?=Lang::get('login.loginFormUserName')?>" class="form-control" name="username" value="{{ old('username') }}" aria-describedby="user-addon">
									<span class="username-extra-info"><?=Lang::get('portal.customPamrowUsernameInfo')?></span>
								</div>

								
							</div>

							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon" id="email-addon"><i class="fa fa-envelope"></i></span>
									<input required type="email" placeholder="<?=Lang::get('login.emailAddress')?>" class="form-control" name="email" value="{{ old('login') }}" aria-describedby="email-addon">
								</div>
							</div>

							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon" id="password-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
									<input required type="password" placeholder="<?=Lang::get('login.password')?>" class="form-control" name="password" value="{{ old('password') }}" aria-describedby="password-addon">
								</div>
							</div>

							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon" id="password-addon"><i class="fa fa-lock" style="font-size:20px"></i></span>
									<input required type="password" placeholder="<?=Lang::get('login.passwordConfirm')?>" class="form-control" name="password_confirmation" aria-describedby="password-addon">
								</div>
							</div>

							<div class="form-group">
								<label class="termsandconditions">
									<input type="checkbox" id="termsandconditions-checkbox" name="terms" required="true"> <?=Lang::get('login.REGULAMIN_1')?> <a href="{{ $termsLink }}" target="_blank"><?=Lang::get('login.REGULAMIN_2') ?></a> <?=Lang::get('login.REGULAMIN_3') ?>
								</label>
							</div>

							<div class="form-group">
								<button type="submit" class="btn btn-login"><?=Lang::get('login.registerBtn')?></button>
							</div>
							<div class="form-group link-buttons">
								<a class="" href="{{ url('/password/email') }}"><?=Lang::get('login.forgetPassword')?></a>
								<i class="fa fa-circle login-dot" ></i>
								<a class="loginregisterbutton" href=""><?=Lang::get('login.login')?></a>
							</div>
						</form>

					</div>

				</div>
			</div>
		</div>
	</div>
</div>




<div class="topmenu-offset"></div>
