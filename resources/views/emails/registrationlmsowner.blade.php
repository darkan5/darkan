<h3>{{ Lang::get('mails.NEW_ACCOUNTS_REGISTERED') }}</h3>
<h4>{{ Lang::get('mails.LOGIN_MAIL_INFO_2') }}</h4>
<hr />
<h4>{{ Lang::get('mails.LOGIN_MAIL_INFO') }}</h4>
{!! $usersTable !!}
<hr />
<p><i> {{ Lang::get('mails.REGISTER_MAIL_CONTENT_NOREPLY') }}</i></p>