<h1><?=Lang::get('mails.INVOICE_HEADER')?></h1>
<hr/>
<p><?=Lang::get('mails.INVOICE_MESSAGE')?></p>
<p><?=Lang::get('mails.REGISTER_MAIL_FOOTER')?></p>

<hr style="margin: 30px;"/>

<div style="text-align:center">    
    <div style="text-align:center">
        <a style="text-decoration: none;" target="_blank" href="{{ config('app.protocol') }}{{ config('app.domain') }}{{ config('app.folder') }}">
            <img class="logo" src="{{ asset('/css/img/logo.png') }}" alt="Darkan Logo" />
        </a>
        <a style="text-decoration: none;border: none;" target="_blank" href="https://darkan.eu/blog/?lang=<?=Lang::get('mails.LANG_VERSION')?>"><img style="padding: 0px 17px" src="{{ asset('/css/img/social/wp.png') }}">
        </a>
        <a style="text-decoration: none;border: none;" target="_blank" href="http://www.facebook.com/pages/Darkan/675324632508995?ref=ts&fref=ts"><img style="padding: 0px 17px" src="{{ asset('/css/img/social/fb_oval.png') }}">
        </a>
        <a style="text-decoration: none;border: none;" target="_blank" href="http://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w"><img style="padding: 0px 17px" src="{{ asset('/css/img/social/yt_oval.png') }}">
        </a>
    </div>
</div>