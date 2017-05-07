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
    <link href="{{ asset('/bower_components/morrisjs/morris.css') }}" rel="stylesheet">



    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/fonts.css') }}" rel="stylesheet">
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
    <script src="{{ asset('/js/libs/underscore/underscore.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.stickit.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.controller.js') }}"></script>
    <script src="{{ asset('/js/modules/utils/utils.js') }}"></script>
    <script src="{{ asset('/js/libs/marionette/backbone.marionette.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone.marionette/lib/backbone.marionette.min.js') }}"></script>

    <script src="{{ asset('js/datetimepicker-master/jquery.datetimepicker.js') }}"></script>
    <script src="{{ asset('js/moment.js') }}"></script>
    <script src="{{ asset('/bower_components/metisMenu/dist/metisMenu.min.js') }}"></script>

    <!-- Morris Charts JavaScript -->
    <script src="{{ asset('/bower_components/raphael/raphael-min.js') }}"></script>
    <script src="{{ asset('/bower_components/morrisjs/morris.min.js') }}"></script>
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


<ul>
    @foreach($errors->all() as $error)
        <div class="bs-example col-md-10 col-md-offset-1">
            <div class="alert alert-warning">
                <a href="#" class="close" data-dismiss="alert">&times;</a>
                <strong>Uwaga!</strong> {{ $error }}
            </div>
        </div>
    @endforeach
</ul>

<div class="container-fluid">
    <div class="col-md-2">
        <div class="panel">
            <div class="panel-heading panel-big">
                <div class="btn-group pull-right">
                    
                </div>
            </div>
            <div class="panel-body">

                <div id="sidebar-wrapper">
                    <ul class="sidebar-nav">

                        <li class="sidebar-brand">
                            <a href="{{ url('/') }}">Strona główna</a>
                        </li>
                        <li class="sidebar-brand">
                            <a href="{{ url('/lms') }}">Panel główny </a>
                        </li>
                        {{--
                        <li>
                            <a href="{{ url('lms/projects') }}">Projekty</a>
                        </li>
                        --}}
                        <li>
                            <a href="{{ url('lms/publications') }}">Publikacje</a>
                        </li>
                        <li>
                            <a href="{{ url('lms/elearning/users') }}">Użytkownicy (elearning)</a>
                        </li>
                        {{--
                        <li>
                            <a href="{{ url('lms/elearning/groups') }}">Grupy (elearning)</a>
                        </li>
                        <li>
                            <a href="{{ url('lms/mailing/users') }}">Użytkownicy (mailing)</a>
                        </li>
                        <li>
                            <a href="{{ url('lms/mailing/groups') }}">Grupy (mailing)</a>
                        </li>
                        <li>
                            <a href="{{ url('lms/elearning/report') }}">Certyfikaty</a>
                        </li>
                        <li>
                            <a href="{{ url('lms/settings') }}">Ustawienia</a>
                        </li>
                        --}}


                    </ul>
                </div>

            </div>
        </div>
    </div>

    <div class="col-md-10">
        <div class="panel">
            <div class="panel-heading panel-big">
        
                <div class="btn-group pull-right">
                    
                </div>
            </div>
            <div class="panel-body">

                @yield('contentlms')
                
            </div>
        </div>
    </div>
</div>



@if (!Cookie::has('acceptcookiepolicy'))
    @include('cookiepolicy.cookieinfo')
@endif



    
</body>
</html>

    