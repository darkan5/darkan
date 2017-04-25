<div style="width: 600px;margin: 20px auto;text-align: center;">

    <div style="box-shadow: 0px 0px 10px #000;border-radius: 4px;box-sizing: border-box;padding:30px;" class="content">
        <p><?=Lang::get('utils.user')?> {{ $login }} <?=Lang::get('mails.userSharedProject')?></p>
        <p style="text-align: center;"><a style="margin-top: 20px;text-decoration:none; color: #fff;display: inline-block; padding: 10px 20px; margin-bottom: 0; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1px solid transparent; border-radius: 4px; background-color: #5cb85c; border-color: #4cae4c;" target="_blank" href="{{ config('app.applink') }}{{ $project_id }}"><?=Lang::get('mails.openProject')?></a></p>
    </div>
</div>

<hr style="margin: 30px;"/>

<div style="text-align:center">    
    <div style="text-align:center">
        <a style="text-decoration: none;" target="_blank" href="{{ config('app.protocol') }}{{ config('app.domain') }}{{ config('app.folder') }}">
            <img class="logo" src="{{ asset('/css/img/logo.png') }}" alt="Darkan Logo" />
        </a>
        <a style="text-decoration: none;border: none;" target="_blank" href="http://darkan.local/blog/?lang=<?=Lang::get('mails.LANG_VERSION')?>"><img style="padding: 0px 17px" src="{{ asset('/css/img/social/wp.png') }}">
        </a>
        <a style="text-decoration: none;border: none;" target="_blank" href="http://www.facebook.com/pages/Darkan/675324632508995?ref=ts&fref=ts"><img style="padding: 0px 17px" src="{{ asset('/css/img/social/fb_oval.png') }}">
        </a>
        <a style="text-decoration: none;border: none;" target="_blank" href="http://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w"><img style="padding: 0px 17px" src="{{ asset('/css/img/social/yt_oval.png') }}">
        </a>
    </div>
</div>