<!DOCTYPE html>
<html lang="en">
<head>

    <meta name="robots" content="noindex " />
    <meta name="robots" content="nofollow " />

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <meta name="description" content="@yield('description')">

    <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <meta property="og:url" content="{{ Request::url() }}" />
    <meta property="og:title" content="@yield('title')" />
    <meta property="og:description" content="@yield('description')"/>

    <meta property="fb:app_id" content="{{ env('FB_CLIENT_ID') }}"/>
    <meta property="og:image" content="{{ asset('/css/img/social_logos/fb_featured_image1.png') }}" />

    <meta property="og:image:width" content="470" /> 
    <meta property="og:image:height" content="246" />

    <meta name="_token" content="{{ csrf_token() }}">
    <meta name="_appLink" content="{{ url('/') }}">
    <meta name="_jsroute" content="{{ url('/') }}">
    <meta name="_token" content="{{ csrf_token() }}">

    <link href="{{ asset('/bower_components/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/bower_components/jquery/dist/jqueryui_styles.css') }}" rel="stylesheet">

    <link href="{{ asset('/js/datetimepicker-master/jquery.datetimepicker.css') }}" rel="stylesheet">

    <!-- Fonts -->
    <!-- <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'> -->

    <link href="{{ asset('/bower_components/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">


    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/price.css') }}" rel="stylesheet">

    <link href="{{ asset('/css/bootstrap/bootstrap-select.min.css')}}" rel="stylesheet">
    <link href="{{ asset('/css/fonts.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/styles.css') }}" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('/css/img/favicon/favicon.png') }}">


    <link href="{{ asset('/css/languages.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/animations/animate.css') }}" rel="stylesheet">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="http://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="http://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="{{ asset('/bower_components/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('/bower_components/jquery/dist/jqui.js') }}"></script>
    <script src="{{ asset('/bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('/js/bootstrap/bootstrap-select.min.js') }}"></script>
    <script src="{{ asset('/js/libs/underscore/underscore.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.stickit.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.controller.js') }}"></script>

    <script src="{{ asset('/js/libs/marionette/backbone.marionette.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone.marionette/lib/backbone.marionette.min.js') }}"></script>

    <script src="{{ asset('js/datetimepicker-master/jquery.datetimepicker.js') }}"></script>
    <script src="{{ asset('js/moment.js') }}"></script>

    <script src="{{ asset('/js/libs/bower_components/datatables/media/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/js/libs/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js') }}"></script>

    
    <script src="{{ asset('/public/messages.js') }}"></script>
    <script src="{{ asset('/js/modules/utils/log.js') }}"></script>

    <script src="{{ asset('/js/config.js') }}"></script>
    
    <!-- WEBSERVICE -->
    <script src="{{ asset('/js/modules/webservice/webservice.js') }}"></script>
    <script src="{{ asset('/js/modules/webservice/fake/fake_webservice.js') }}"></script>
    <script src="{{ asset('/js/modules/webservice/php/php_webservice.js') }}"></script>
    <script src="{{ asset('/js/modules/webservice/node/node_webservice.js') }}"></script>
    <script src="{{ asset('/js/modules/webservice/data_access.js') }}"></script>

    
    <script src="{{ asset('/js/libs/notify/bootstrap-notify.min.js') }}"></script>
    <script src="{{ asset('/js/libs/notify/notify.js') }}"></script>

    

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>

    <?php
        $locale = \App\Modules\Utils\Utils::getLocale();
    ?>

    <script type="text/javascript">
        Lang.setLocale('<?=$locale?>');
        var __lang = '<?=$locale?>';
    </script>

    <link href="{{ asset('/css/responsive.css') }}" rel="stylesheet">
    
</head>
<body>


    <script src="{{ asset('/js/libs/loader/loader_window.js') }}"></script>
    
    
    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NHDLKV"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NHDLKV');</script>
    <!-- End Google Tag Manager -->


    <!-- SmartSupp Live Chat script -->
    <script type="text/javascript">
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = 'efea9853590a6e9d0b22c4747b098da33419944e';
    window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='//www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
    })(document);

    smartsupp('email', "<?= Auth::check() ? Auth::user()->email : 'NotLoggedIn'?>");
    smartsupp('name', "<?= Auth::check() ? Auth::user()->email : 'NotLoggedIn'?>");
    smartsupp('language', "<?=$locale?>");
    smartsupp('variables', {
        userName: { label: 'User name ', value: "<?= Auth::check() ? Auth::user()->email : 'NotLoggedIn'?>" },
        lang: { label: 'Lang ', value: "<?=$locale?>" }
    });
    smartsupp('recording:disable', true);
    </script>

    <nav class="navbar topmenu navbar-default navbar-fixed-top scrolled">
        <div class="container-fluid">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand navbar-brand-extend" href="{{ url('/') }}">
                    <img class="logo-top" src="{{ asset('/css/img/new_web/logo_white.png') }}">
                </a>
            </div>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    
                    @if(Auth::user())

                        @if (Auth::user()->hasRole('admin') || Session::get('isAdmin'))
                            <li><a href="{{ url('admin/adminpanel') }}">Panel administratora</a></li>
                        @endif

                        @if (Auth::user()->hasRole('owner') || Session::get('isOwner'))
                            <li><a href="{{ url('owner/ownerpanel') }}">Panel właściciela</a></li>
                        @endif

                        @if (Auth::user() && Auth::user()->hasRole('partner'))
                            <li><a href="{{ url('partner/sale') }}" >Sprzedaż</a></li>
                        @endif

                        @if (Auth::user() && Auth::user()->hasRole('distributor') || Session::get('isDistributor'))
                            <li><a href="{{ url('distributor/adminpanel') }}" >Panel dystrybutora</a></li>
                        @endif

                        @if (Auth::user() && Auth::user()->hasRole('reseler'))
                            <li><a href="{{ url('reseler/reselerpanel') }}" >Panel reselera</a></li>
                        @endif

                    @endif
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->

                    <li class="yt-link">
                        <a href="{{ Lang::get('frontpage.youtubelink') }}" target="_blank">
                            <div class="yt-btn-small"></div>
                        </a>
                    </li>

                    <li class="facebook-link">
                        <a target="_blank" href="http://www.facebook.com/Darkan-675324632508995/timeline/">
                            <div class="fb-btn-small"></div>
                        </a>
                    </li>

                    <li><a href="{{ url('/home') }}"><i class="fa fa-home fa-2x home-icon"></i></a></li>
                    <li><a href="{{ url('/examples') }}"><?= Lang::get('frontpage.examples') ?></a></li>
                    <li><a href="{{ url('/pricelist') }}"><?= Lang::get('frontpage.pricing') ?></a></li>

                    @if(Auth::user())
                        <li><a class="text-bold" href="{{ url('/projects') }}"><?= Lang::get('frontpage.projects') ?></a></li>

                        <li>
                            <a href="#" onClick="return false;" type="button" class="dropdown-toggle" data-toggle="dropdown">
                                <span><?=Lang::get('frontpage.MENU_PORTAL')?></span> <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li>
                                    <a class="subdomain-link" href="{{ config('app.protocol_not_secure') }}{{Auth::user()->subdomain}}.{{ config('app.domain') }}{{ config('app.folder') }}subdomain/login">
                                        <span><?=Lang::get('frontpage.PORTAL_MENU_VIEW')?></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{ url('/portal') }}">
                                        <span><?=Lang::get('frontpage.PORTAL_MENU_SETTINGS')?></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{ url('/lms') }}">
                                        <span>Lms</span>
                                    </a>
          
                                </li>
                            </ul>
                        </li>

                    @endif

                    

                    @if (Auth::guest())
                        <li><a href="{{ url('/login') }}"><?=Lang::get('login.loginBtn')?></a></li>
                        <li><a href="{{ url('/register') }}"><?=Lang::get('login.registerButton')?></a></li>
                    @else
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">

                                @if (Session::get('isAdmin'))
                                    <li class="role-user-is-admin"><a href="{{ url('/admin/loginasadmin/') }}">Zaloguj się jako administrator</a></li>
                                @endif

                                @if (Session::get('isOwner'))
                                    <li class="role-user-is-admin"><a href="{{ url('/owner/loginas/') }}/{{Session::get('loginasid')}}">Zaloguj się jako właściciel</a></li>
                                @endif

                                @if (Session::get('isDistributor'))
                                    <li class="role-user-is-admin"><a href="{{ url('/distributor/loginasdistributor/') }}">Zaloguj się jako dystrybutor</a></li>
                                @endif

                                @if (Session::get('isReseler'))
                                    <li class="role-user-is-admin"><a href="{{ url('/reseler/loginasreseler/') }}">Zaloguj się jako reseler</a></li>
                                @endif

                                <li>
                                    <a href="{{ url('/profile') }}">
                                        <i class="fa fa-user"></i> <span><?=Lang::get('frontpage.profile')?></span>
                                    </a>
                                </li>
                                @if(Auth::user()->hasRole('distributor'))
                                <li>
                                    <a href="{{ url('/administration/dashboard') }}">
                                        <i class="fa fa-gears"></i>  <span><?= Lang::get('frontpage.administration')?></span>
                                    </a>
                                </li>
                                @endif
                                @if(Auth::user()->hasRole('affiliate'))
                                <li>
                                    <a href="{{ url('/affiliate') }}">
                                        <i class="fa fa-money"></i>  <span><?=Lang::get('frontpage.makeMoneyWithUs')?></span>
                                    </a>
                                </li>
                                @endif

                                <li>
                                    <a href="{{ url('/logout') }}"
                                        onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                                        Wyloguj
                                    </a>

                                    <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                        {{ csrf_field() }}
                                    </form>
                                </li>
                            </ul>
                        </li>
                    @endif


                        <li class="hideonmobile">
                            <a type="button" class="chosen-lang-btn dropdown-toggle" data-toggle="dropdown">
                                <span class="chosen-lang lang-lg" lang="<?=$locale?>"></span>
                            </a>
                            <ul class="language-menu dropdown-menu" role="menu">
                                <li>
                                    <a href="{{ url('/changelang/pl') }}">
                                        <span class="lang-lg" lang="pl"></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{ url('/changelang/en') }}">
                                        <span class="lang-lg" lang="en"></span>
                                    </a>
                                </li>
                            </ul>
                        </li>


                </ul>
            </div>
        </div>
    </nav>


    @yield('content')


    <div class="footer">
        <div class="col-md-offset-1">


            <div class="col-md-3 col-sm-4">
                    <h5 class="frontpage-footer-column-header"><?= Lang::get('frontpage.company') ?></h5>
                    <p>
                        <a href="{{ url('/aboutus') }}"><?= Lang::get('frontpage.aboutUs') ?></a>
                    </p>
                    <p>
                        <a href="{{ url('/aboutproduct') }}"><?= Lang::get('frontpage.product') ?></a>
                    </p>
                    <p>
                        <a  href="{{ url('/productvision') }}"><?= Lang::get('frontpage.productVision') ?></a>
                    </p>
                    <p>
                        <a target="_blank" href="<?= Lang::get('footerpages.FOOTER_DOCUMENTATION_LINK') ?>"><?= Lang::get('frontpage.documentation') ?></a>
                    </p>
            </div>
            <div class="col-md-3 col-sm-4">
                    <h5 class="frontpage-footer-column-header"><?= Lang::get('frontpage.help') ?></h5>
                    <p>
                        <a href="<?= Lang::get('frontpage.youtubelink') ?>" target="_blank">
                            <?= Lang::get('frontpage.trainings') ?>
                        </a>
                    </p>
                    <p>
                        <a href="{{ url('/apidemo') }}">
                            <?= Lang::get('frontpage.apidemo') ?>
                        </a>
                    </p>
                    <p>
                        <a href="{{ url('/apidocs') }}">
                            <?= Lang::get('frontpage.apidocs') ?>
                        </a>
                    </p>
            </div>
            <div class="col-md-3 col-sm-4">
                    <h5 class="frontpage-footer-column-header"><?= Lang::get('frontpage.community') ?></h5>
                    <p>
                        <a href="https://darkan.eu/blog" target="_blank"><?= Lang::get('frontpage.blog') ?></a>
                    </p>
                    @if(Auth::check() && Auth::user()->hasRole('affiliate'))
                    <p>
                        <a href="{{ url('/affiliate') }}"><?= Lang::get('frontpage.makeMoneyWithUs') ?></a>
                    </p>
                    @endif
            </div>

            <div class="col-md-3 col-sm-4 contact-block">
                    <h5 class="frontpage-footer-column-header"><?= Lang::get('frontpage.contact') ?></h5>
                    <p>
                        <a href="mailto:<?=Lang::get('frontpage.contact_email')?>"><?=Lang::get('frontpage.contact_email')?></a>
                    </p>
                    <p>
                        <?=config('app.companyData.'. config('app.pricing_locale') .'.contact_road' )?>
                    </p>
                    <p>
                        <?=config('app.companyData.'. config('app.pricing_locale') .'.contact_city' )?>
                    </p>
                    <p>
                        <?=config('app.companyData.'. config('app.pricing_locale') .'.contact_country')?>
                    </p>
                    <p>
                        <?=config('app.companyData.'. config('app.pricing_locale') .'.contact_registration_number')?>
                    </p>
            </div>

        </div>
        <div class="clearfix"></div>
    </div>


    <div class="footer-company">
        <div class="col-md-offset-1">
            Darkan © 2010 - 2017
            <?php //print_r($postdata) ?>
        </div>
        
    </div>

    @if (!Cookie::has('acceptcookiepolicy'))
        @include('cookiepolicy.cookieinfo')
    @endif

    <script src="{{ asset('/js/modules/utils/utils.js') }}"></script>

    
</body>
</html>
