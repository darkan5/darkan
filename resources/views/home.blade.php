@extends('layouts.app')

@section('content')

<div class="topmenu-offset"></div>


<br/>

<div class="container">
    <div class="centering-container">


        <ul class="nav nav-tabs nav-justified">
            <li class="active grey"><a data-toggle="tab" href="#tab1"><h4><?=Lang::get('home.tab1')?></h4></a></li>
            <li class="grey"><a data-toggle="tab" href="#tab2"><h4><?=Lang::get('home.tab2')?></h4></a></li>

        </ul>


    </div>
    <div class="tab-content sizer" >
        <br/>

        <div id="tab1" class="tab-pane fade in active">
            <div class="col-md-4">
                <div class="thumbnail">
                    <img src="{{ url('css/img/home/plus_icon.png')}}" alt="ALT NAME" class="img-responsive" />
                    <div class="caption">

                        <p align="center"><a href="{{ url('/projects') }}" class="btn btn-success btn-block"><?=Lang::get('home.createProject')?></a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <img src="{{ url('css/img/home/folder.png')}}" alt="ALT NAME" class="img-responsive" />
                    <div class="caption">
                        <p align="center"><a href="{{ config('app.protocol_not_secure') }}{{Auth::user()->subdomain}}.{{ config('app.domain') }}{{ config('app.folder') }}subdomain/login" class="btn btn-primary btn-block"><?=Lang::get('home.lmsView')?></a>
                        </p>
                        <p align="center"><a href="{{ url('/portal') }}" class="btn btn-primary btn-block"><?=Lang::get('home.setChannelSetting')?></a>
                        </p>
                        <p align="center"><a href="{{ url('/lms') }}" class="btn btn-primary btn-block"><?=Lang::get('home.administrationLMS')?></a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <img src="{{ url('css/img/home/contact.png')}}" alt="ALT NAME" class="img-responsive" />
                    <div class="caption">
                        <p align="center"><a onclick="smartsupp('chat:open');return false;" class="btn btn-primary btn-block"><?=Lang::get('home.contact')?></a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-12  text-center"><br/><br/><br/><br/>
                <iframe style="border: 10px outset #ddd;" width="600" height="300" src="<?=Lang::get('home.youtubeLink')?>" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
                <br/><br/><br/><br/>
            </div>
        </div>
        <div id="tab2" class="tab-pane fade">
            <div class="col-md-6">
                <div class="thumbnail">
                    <img src="{{ url('css/img/home/wikipedia.png')}}" alt="ALT NAME" class="img-responsive" />
                    <div class="caption">
                        <p align="center"><a href="<?=Lang::get('home.wikipedialink')?>" class="btn btn-primary btn-block"><?=Lang::get('home.wikipedia')?></a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="thumbnail">
                    <img src="{{ url('css/img/home/youtube.png')}}" alt="ALT NAME" class="img-responsive" />
                    <div class="caption">
                        <p align="center"><a href="https://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w" target="_blank" class="btn btn-primary btn-block"><?=Lang::get('home.youtube')?></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>




</div>
@endsection
