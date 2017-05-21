<div style="width: 600px;margin: 20px auto;" class="main">
    <div class="header">
        <a style="text-decoration: none;" target="_blank" href="<?= config('app.protocol') . config('app.domain') . config('app.folder') ?>">
            <img class="logo" src="{{ $message->embed(asset('/css/img/logo.png')) }}" alt="Darkan Logo" />
            <span style="border-radius:4px;position: relative;top: -10px;padding: 0;font-family:Calibri;font-size: 31px;margin: 9px;font-weight: bold;line-height: 70px;width: 217px;color: #363636;-webkit-transition: background-position 100ms ease-in-out;-moz-transition: background-position 100ms ease-in-out;-o-transition: background-position 100ms ease-in-out;transition: background-position 100ms ease-in-out;" class="appname">Darkan</span>
        </a>
    </div>
    <div style="box-shadow: 0px 0px 10px #000;border-radius: 4px;box-sizing: border-box;padding: 30px 30px 60px 30px;" class="content">
        <p><?=Lang::get('mails.REGISTER_MAIL_HEADER')?></p>
        <p><?=Lang::get('mails.REGISTER_MAIL_CONTENT')?></p>
        <p><?=Lang::get('mails.REGISTER_MAIL_HEADER_2')?></p>
        <p><strong><?=Lang::get('mails.REGISTER_MAIL_LOGIN') ?></strong> {{ $email }}</p>
        <p><strong><?=Lang::get('mails.REGISTER_MAIL_PASSWORD')?></strong> {{ $pass }}</p>
        <p style="text-align: center;"><a style="margin-top: 20px;text-decoration:none; color: #fff;display: inline-block; padding: 10px 20px; margin-bottom: 0; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px; background-color: #7FA1B7; border-color: #7FA1B7;" target="_blank" href="<?=url('/login')?>"><?=Lang::get('mails.login')?></a></p>
    </div>
</div>
<div class="footer" style="width: 100%;height: 90px;background-color: #7FA1B7;margin-top: 20px;">
    <div style="width:700px;margin:0px auto;" class="footer-inner">
        <div style="margin:7px;display:inline-block;" class="darkantitlewrapper"><img src="{{ $message->embed(asset('/css/img/frontpage/main-header_en.png')) }}" alt="Darkan">
        </div>
        <div style="display:inline-block;float:right;right:30px;background-color:#EEEEEE;height:100%;width:255px;position:relative;" class="socialiconswrapper">
            <a style="text-decoration: none;border: none;" target="_blank" href="https://darkan.eu/blog/?lang=<?=Lang::get('mails.LANG_VERSION')?>"><img style="padding: 20px 17px;" src="{{ $message->embed(asset('/css/img/social/wp.png')) }}">
            </a>
            <a style="text-decoration: none;border: none;" target="_blank" href="http://www.facebook.com/pages/Darkan/675324632508995?ref=ts&fref=ts"><img style="padding: 20px 17px;" src="{{ $message->embed(asset('/css/img/social/fb_oval.png')) }}">
            </a>
            <a style="text-decoration: none;border: none;" target="_blank" href="http://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w"><img style="padding: 20px 17px;" src="{{ $message->embed(asset('/css/img/social/yt_oval.png')) }}">
            </a>
        </div>
    </div>
</div>