
<div>
    {!! $userMessage !!}
</div>
<hr/>
<div style="padding:30px" class="content">
    <div class="header">
        <a style="text-decoration: none;" target="_blank" href="<?= config('app.protocol') . config('app.domain') . config('app.folder') ?>">
            <img class="logo" src="{{ asset('/css/img/logo.png') }}" alt="Darkan Logo" />
            <span style="border-radius:4px;position: relative;top: -10px;padding: 0;font-family:Calibri;font-size: 31px;margin: 9px;font-weight: bold;line-height: 70px;width: 217px;color: #363636;-webkit-transition: background-position 100ms ease-in-out;-moz-transition: background-position 100ms ease-in-out;-o-transition: background-position 100ms ease-in-out;transition: background-position 100ms ease-in-out;" class="appname">Darkan</span>
        </a>
    </div>
    <h3><?=Lang::get('mails.REGISTER_MAIL_CONTENT_FROM_DEALER_2')?> {{$creatorMail}} <?=Lang::get('mails.REGISTER_MAIL_CONTENT_FROM_DEALER_3')?></h3>
    <h3><?=Lang::get('mails.YOUR_CREDENTIALS') ?></h3>
    <p><strong><?=Lang::get('mails.REGISTER_MAIL_LOGIN') ?></strong> {{ $email }}</p>
    <p><strong><?=Lang::get('mails.REGISTER_MAIL_PASSWORD')?></strong> {{ $pass }}</p>
    <p style="text-align: left;"><a style="margin-top: 20px;text-decoration:none; color: #fff;display: inline-block; padding: 10px 20px; margin-bottom: 0; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px; background-color: #7FA1B7; border-color: #7FA1B7;" target="_blank" href="<?=url('/login')?>"><?=Lang::get('mails.login')?></a>.</p>
</div>