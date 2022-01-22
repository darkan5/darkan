<?php $__env->startSection('content'); ?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta name="robots" content="noindex " />
    <meta name="robots" content="nofollow " />

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo $__env->yieldContent('title'); ?></title>
    <meta name="description" content="<?php echo $__env->yieldContent('description'); ?>">

    <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <meta property="og:url" content="<?php echo e(Request::url()); ?>" />
    <meta property="og:title" content="<?php echo $__env->yieldContent('title'); ?>" />
    <meta property="og:description" content="<?php echo $__env->yieldContent('description'); ?>"/>

    <meta property="fb:app_id" content="<?php echo e(env('FB_CLIENT_ID')); ?>"/>
    <meta property="og:image" content="<?php echo e(asset('/css/img/social_logos/fb_featured_image1.png')); ?>" />

    <meta property="og:image:width" content="470" />
    <meta property="og:image:height" content="246" />

    <meta name="_token" content="<?php echo e(csrf_token()); ?>">
    <meta name="_appLink" content="<?php echo e(url('/')); ?>">
    <meta name="_jsroute" content="<?php echo e(url('/')); ?>">
    <meta name="_token" content="<?php echo e(csrf_token()); ?>">

    <link href="<?php echo e(asset('/bower_components/bootstrap/dist/css/bootstrap.min.css')); ?>" rel="stylesheet">
    <link href="<?php echo e(asset('/bower_components/jquery/dist/jqueryui_styles.css')); ?>" rel="stylesheet">

    <link href="<?php echo e(asset('/js/datetimepicker-master/jquery.datetimepicker.css')); ?>" rel="stylesheet">

    <!-- Fonts -->
    <!-- <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'> -->

    <link href="<?php echo e(asset('/bower_components/font-awesome/css/font-awesome.min.css')); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo e(asset('/bower_components/morrisjs/morris.css')); ?>" rel="stylesheet">



    <link href="<?php echo e(asset('/css/app.css')); ?>" rel="stylesheet">
    <link href="<?php echo e(asset('/css/fonts.css')); ?>" rel="stylesheet">
    <link rel="shortcut icon" href="<?php echo e(asset('/css/img/favicon/favicon.png')); ?>">


    <link href="<?php echo e(asset('/css/languages.min.css')); ?>" rel="stylesheet">
    <link href="<?php echo e(asset('/css/animations/animate.css')); ?>" rel="stylesheet">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="http://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="http://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="<?php echo e(asset('/bower_components/jquery/dist/jquery.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/bower_components/jquery/dist/jqui.js')); ?>"></script>
    <script src="<?php echo e(asset('/bower_components/bootstrap/dist/js/bootstrap.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/underscore/underscore.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone/backbone.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone/backbone.stickit.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone/backbone.controller.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/modules/utils/utils.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/marionette/backbone.marionette.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone.marionette/lib/backbone.marionette.min.js')); ?>"></script>

    <script src="<?php echo e(asset('js/datetimepicker-master/jquery.datetimepicker.js')); ?>"></script>
    <script src="<?php echo e(asset('js/moment.js')); ?>"></script>
    <script src="<?php echo e(asset('/bower_components/metisMenu/dist/metisMenu.min.js')); ?>"></script>

    <!-- Morris Charts JavaScript -->
    <script src="<?php echo e(asset('/bower_components/raphael/raphael-min.js')); ?>"></script>
    <script src="<?php echo e(asset('/bower_components/morrisjs/morris.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/bower_components/datatables/media/js/jquery.dataTables.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js')); ?>"></script>


    <script src="<?php echo e(asset('/public/messages.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/modules/utils/log.js')); ?>"></script>

    <script src="<?php echo e(asset('/js/config.js')); ?>"></script>

    <!-- WEBSERVICE -->
    <script src="<?php echo e(asset('/js/modules/webservice/webservice.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/modules/webservice/fake/fake_webservice.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/modules/webservice/php/php_webservice.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/modules/webservice/node/node_webservice.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/modules/webservice/data_access.js')); ?>"></script>

    <script src="<?php echo e(asset('/js/libs/notify/bootstrap-notify.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/notify/notify.js')); ?>"></script>



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

    <link href="<?php echo e(asset('/css/responsive.css')); ?>" rel="stylesheet">

</head>
<body>


    <script src="<?php echo e(asset('/js/libs/loader/loader_window.js')); ?>"></script>
    
    
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
    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
        <div class="bs-example col-md-10 col-md-offset-1">
            <div class="alert alert-warning">
                <a href="#" class="close" data-dismiss="alert">&times;</a>
                <strong>Uwaga!</strong> <?php echo e($error); ?>

            </div>
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
</ul>

<div class="container-fluid">
    <div class="col-md-2" style="top: 40px">
        <div class="panel">
            <div class="panel-heading panel-big">
                <div class="btn-group pull-right">
                    
                </div>
            </div>
            <div class="panel-body">

                <div id="sidebar-wrapper">
                    <ul class="sidebar-nav">

                        <li class="sidebar-brand">
                            <a href="<?php echo e(url('/')); ?>"><?=Lang::get("darkanpanel.page_primary")?></a>
                        </li>
                        <li class="sidebar-brand">
                            <a href="<?php echo e(url('/lms')); ?>"><?=Lang::get("darkanpanel.panel_primary")?></a>
                        </li>
                        
                        <li>
                            <a href="<?php echo e(url('lms/publications')); ?>"><?=Lang::get("darkanpanel.publication")?></a>
                        </li>
                        <li>
                            <a href="<?php echo e(url('lms/elearning/users')); ?>"><?=Lang::get("darkanpanel.users")?></a>
                        </li>
                        


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

                <?php echo $__env->yieldContent('contentlms'); ?>
                
            </div>
        </div>
    </div>
</div>



<?php if(!Cookie::has('acceptcookiepolicy')): ?>
    <?php echo $__env->make('cookiepolicy.cookieinfo', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php endif; ?>




</body>
</html>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>