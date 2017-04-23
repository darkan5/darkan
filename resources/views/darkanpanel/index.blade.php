@extends('layouts.lms')

@section('title')
{{ Lang::get('darkanpanel.title') }}
@stop

@section('description')
{{ Lang::get('darkanpanel.description') }}
@stop

@section('content')
    <link href="{{ asset('/css/loader/loader.css') }}" rel="stylesheet">

    <div class="modalloader"></div>
    <script src="{{ asset('/js/libs/loader/loader.js') }}"></script>
    <script type="text/javascript">
    $(".modalloader").fakeLoader({
        bgColor:"#7FA2B8",
        timeToHide: 2000
    });
    </script>

    <!-- MetisMenu CSS -->
    <link href="{{ asset('/bower_components/metisMenu/dist/metisMenu.min.css') }}" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="{{ asset('/css/darkanpanel/timeline.css') }}" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="{{ asset('/css/darkanpanel/sb-admin-2.css') }}" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="{{ asset('/bower_components/morrisjs/morris.css') }}" rel="stylesheet">

    <!-- Tags input -->
    <link href="{{ asset('/js/libs/tags/tagsinput.css') }}" rel="stylesheet">


    <link href="{{ asset('/css/darkanpanel/style.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/darkanpanel/lmsstyles.css') }}" rel="stylesheet">

    <link href="{{ asset('/js/libs/datetimepicker-master/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link href="{{ asset('/js/libs/summernote-master/dist/summernote.css') }}" rel="stylesheet">


    <div id="wrapper">
            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <!-- <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Szukaj...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                        </li> -->
                        <li>
                            <a href="#dashboard"><i class="fa fa-home fa-fw"></i> <?=Lang::get('darkanpanel.page_name_main_panel')?></a>
                        </li>
                        <li>
                            <a href="#courses"><i class="fa fa-book fa-fw"></i> <?=Lang::get('darkanpanel.page_name_courses')?></a>
                        </li>
                        <li class="separator"></li>
                        <?php //if(plancapabilities('lms')): ?>
                        <li>
                            <a href="#users"><i class="fa fa-user fa-fw"></i> <?=Lang::get('darkanpanel.page_name_users')?></a>
                        </li>
                        <?php //endif; ?>
                        <li>
                            <a href="#usersmailing"><i class="fa fa-user fa-fw"></i> <?=Lang::get('darkanpanel.page_name_users_mailing')?></a>
                        </li>
                        <?php //if(plancapabilities('lms')): ?>
                        <li>
                            <a href="#groups"><i class="fa fa-group fa-fw"></i> <?=Lang::get('darkanpanel.groups')?> <small>(elearning)</small></a>
                        </li>
                        <?php //endif; ?>
                        <li>
                            <a href="#groupsmailing"><i class="fa fa-group fa-fw"></i> <?=Lang::get('darkanpanel.groups')?> <small>(mailings)</small></a>
                        </li>
                        <li>
                            <a href="#reportselaarning"><i class="fa fa-group fa-fw"></i> <?=Lang::get('darkanpanel.reports')?> <small>(elearning)</small></a>
                        </li>
<!--                         <li>
                            <a href="#certificates"><i class="fa fa-cogs fa-fw"></i> <?php//Lang::get('darkanpanel.certificates')?></a>
                        </li> -->
<!--                         <li>
                            <a href="#settings"><i class="fa fa-cogs fa-fw"></i> <?php//Lang::get('darkanpanel.settings')?></a>
                        </li> -->
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div class="lms-topmenu-offset"></div>
        <div id="page-wrapper">

        </div>

        <div class="clearfix"></div>

    </div>
    <!-- /#wrapper -->


<?php
    //  Templates
    include( base_path('/js/darkanpanel/modules/layout/templates/item_layout_view_template.templ') );


    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_course_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_students_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_students_mailing_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_chart_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_couse_list_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_users_list_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/dashboard_item_chart_statuses_template.templ') );

    include( base_path('/js/darkanpanel/modules/pages/question_analytics/templates/question_analytics.templ') );
    include( base_path('/js/darkanpanel/modules/pages/question_analytics/templates/question_analytics_item.templ') );
    include( base_path('/js/darkanpanel/modules/pages/question_analytics/templates/question_analytics_components.templ') );
    include( base_path('/js/darkanpanel/modules/pages/question_analytics/templates/question_analytics_charts.templ') );

    include( base_path('/js/darkanpanel/modules/pages/question_analytics/templates/question_analytics_variables.templ') );

    include( base_path('/js/darkanpanel/modules/pages/page/templates/page_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/dashboard/templates/page_dashboard_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/course_list/templates/page_courses_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/user_list/templates/page_users_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/user_list_mailing/templates/page_users_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_elearning/group_list/templates/page_groups_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/group_list/templates/page_groups_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/single_course/templates/page_single_course_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/single_course/templates/single_course_item_chart_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/single_course/templates/single_course_item_list_template.templ') );

    include( base_path('/js/darkanpanel/modules/pages/settings/templates/page_settings_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/certificates/templates/page_certificates_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/certificates/templates/items/certificates_page_courses_item_list_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/certificates/templates/items/certificates_page_groups_view_template.templ') );

    include( base_path('/js/darkanpanel/modules/pages/single_user/templates/page_single_user_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_elearning/single_group/templates/page_single_group_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/single_group/templates/page_single_group_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/add_user/elearning/templates/page_add_user_elearning_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/add_user/mailing/templates/page_add_user_mailing_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_elearning/add_group/templates/page_add_group_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/create_group/templates/page-create-group-view-mailing-option-1-template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/create_group/templates/page-create-group-view-mailing-option-2-template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/add_group/templates/page_add_group_template.templ') );

    // groups
    include( base_path('/js/darkanpanel/modules/pages/groups_elearning/group_items/templates/assign_user_to_group_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_elearning/group_items/templates/edit_group_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/group_items/templates/assign_user_to_group_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/groups_mailing/group_items/templates/edit_group_template.templ') );

    include( base_path('/js/darkanpanel/modules/pages/user_in_course_details/templates/page_user_in_course_details_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/user_in_course_details/templates/page_item_chart_user_details_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/user_in_course_details/templates/page_item_user_details_template.templ') );

    include( base_path('/js/darkanpanel/modules/pages/course_mailing/templates/page_course_mailing_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/course_mailing/templates/assign_user_to_mails_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/course_mailing/templates/assign_group_user_to_mails_template.templ') );

    include( base_path('/js/darkanpanel/modules/pages/groups_elearning/group_to_courses/templates/assign_group_to_courses_template.templ') );

    // raports
    include( base_path('/js/darkanpanel/modules/pages/reports_elaarning/templates/page_reports_elaarning_view_template.templ') );
    include( base_path('/js/darkanpanel/modules/pages/reports_mailing/templates/page_reports_mailing_view_template.templ') );
?>



    <!-- jQuery csv -->
    <script src="{{ asset('/js/libs/jquery_csv/jquery_csv.js') }}"></script>


    <script src="{{ asset('/bower_components/bootstrap/dist/js/bootstrap-confirmation.min.js') }}"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="{{ asset('/bower_components/metisMenu/dist/metisMenu.min.js') }}"></script>

    <!-- Morris Charts JavaScript -->
    <script src="{{ asset('/bower_components/raphael/raphael-min.js') }}"></script>
    <script src="{{ asset('/bower_components/morrisjs/morris.min.js') }}"></script>

    <!-- Tags input -->
    <script src="{{ asset('/js/libs/tags/tagsinput.js') }}"></script>

    <!-- CK editor -->
    <script src="{{ asset('/js/libs/ckeditor/ckeditor.js') }}"></script>

    <!-- Bootstrap Notify -->
    <script src="{{ asset('/js/libs/notify/bootstrap-notify.min.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/notify/notify.js') }}"></script>

    <!-- Sprintf -->
    <script src="{{ asset('/js/libs/sprintf/sprintf.min.js') }}"></script>

    <!-- Libs -->
    <script src="{{ asset('/js/libs/underscore/underscore.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.controller.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.stickit.js') }}"></script>
    <script src="{{ asset('/js/libs/marionette/backbone.marionette.js') }}"></script>

    <!-- Marionette -->
    <script src="{{ asset('/js/libs/backbone.marionette/lib/backbone.marionette.min.js') }}"></script>

    <!-- Utils -->
    <script src="{{ asset('/js/darkanpanel/modules/utils/log.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/utils/utils.js') }}"></script>
    
    <script src="{{ asset('/bower_components/datatables/media/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js') }}"></script>

    <!-- Datapicker -->
    <script src="{{ asset('/js/libs/datetimepicker-master/jquery.datetimepicker.js') }}"></script>
    <script src="{{ asset('/js/libs/summernote-master/dist/summernote.min.js') }}"></script>

    <!-- Modules -->
    <script src="{{ asset('/js/darkanpanel/modules/webservice/webservice.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/webservice/php/php_webservice.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/webservice/data_access.js') }}"></script>

    <!-- LAYOUT -->
    <script src="{{ asset('/js/darkanpanel/modules/layout/models/item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/layout/views/item_layout_view.js') }}"></script>


    <!-- Components -->
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/a_component_model.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/a_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quiz/a_quiz_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quizselectone/a_quizselectone_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quizfillinblanks/a_quizfillinblanks_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quizdnd/a_quizdnd_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quizconnectlines/a_quizconnectlines_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/wordsearch/a_wordsearch_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/crossword/a_crossword_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quizselect/a_quizselect_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/quizinputtext/a_quizinputtext_component_view.js') }}?"></script>


    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/formradio/a_formradio_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/formradio/a_formradio_group_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/formcheckbox/a_formcheckbox_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/formcheckbox/a_formcheckbox_group_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/forminputtext/a_forminputtext_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/formtextarea/a_formtextarea_component_view.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/components/formselect/a_formselect_component_view.js') }}?"></script>

    <!-- Components factory-->
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/factory/analitic_components_factory.js') }}?"></script>

    <!-- Charts -->
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/charts/analitics_chart.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/charts/pie/analitics_pie_chart.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/charts/line/analitics_line_chart.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/charts/percent/analitics_passed_percent_chart.js') }}?"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/charts/list/analitics_list_chart.js') }}?"></script>

    <!-- Charts factory-->
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/factory/analitic_charts_factory.js') }}?"></script>

    <!-- Pages -->
    <script src="{{ asset('/js/darkanpanel/modules/pages/page/views/page_view.js') }}"></script>
   
    <!-- Pages models -->
    <script src="{{ asset('/js/darkanpanel/modules/pages/page/models/page_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/page_dashboard_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_course_item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_students_item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_chart_item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_couse_list_item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_item_users_list_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/models/items/dashboard_item_chart_statuses_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/questions_analytics_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/questions_analytics_item_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/questions_analytics_collection.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/questions_analytics_single_user_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/questions_analytics_variables_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/models/questions_analytics_variables_single_user_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/settings/models/page_settings_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/certificates/models/page_certificates_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/certificates/models/items/certificates_page_courses_item_list_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/certificates/models/items/certificates_page_groups_model.js') }}"></script>
    
    <script src="{{ asset('/js/darkanpanel/modules/pages/course_list/models/page_courses_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_list/models/page_users_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_list_mailing/models/page_users_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_list/models/page_groups_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/group_list/models/page_groups_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_course/models/page_single_course_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_course/models/items/single_course_item_chart_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_course/models/items/single_course_item_list_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/single_user/models/page_single_user_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/single_group/models/page_single_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/single_group/models/page_single_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/add_user/elearning/models/page_add_user_elearning_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/add_user/mailing/models/page_add_user_mailing_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/add_group/models/page_add_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/create_group/models/page_create_group_mailing_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/add_group/models/page_add_group_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/user_in_course_details/models/page_user_in_course_details_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_in_course_details/models/items/page_item_chart_user_details_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_in_course_details/models/items/page_item_user_details_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/reports_elaarning/models/page_reports_elaarning_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/reports_mailing/models/page_reports_mailing_model.js') }}"></script>

    <!-- Groups items -->
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_items/models/assign_user_to_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_items/views/assign_user_to_group_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_items/models/edit_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_items/views/edit_group_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/group_items/models/assign_user_to_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/group_items/views/assign_user_to_group_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/group_items/models/edit_group_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/group_items/views/edit_group_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/course_mailing/models/page_course_mailing_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/course_mailing/models/assign_user_to_mails_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/course_mailing/models/assign_group_user_to_mails_model.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_to_courses/models/assign_group_to_courses_model.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_to_courses/views/assign_group_to_courses_view.js') }}"></script>


    <!-- Pages views -->
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/page_dashboard_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_course_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_students_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_students_mailing_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_chart_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_couse_list_item_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_users_list_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/dashboard/views/items/dashboard_item_chart_statuses_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/questions_analytics.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/questions_analytics_item.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/questions_analytics_list.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/questions_analytics_single_user.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/questions_analytics_variables.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/question_analytics/views/questions_analytics_variables_single_user.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/course_list/views/page_courses_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_course/views/page_single_course_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_course/views/items/single_course_item_chart_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_course/views/items/single_course_item_list_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/settings/views/page_settings_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/certificates/views/page_certificates_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/certificates/views/items/certificates_page_courses_item_list_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/certificates/views/items/certificates_page_groups_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/user_list/views/page_users_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_list_mailing/views/page_users_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/group_list/views/page_groups_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/group_list/views/page_groups_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/single_user/views/page_single_user_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/single_group/views/page_single_group_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/single_group/views/page_single_group_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/add_user/elearning/views/page_add_user_elearning_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/add_user/mailing/views/page_add_user_mailing_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_elearning/add_group/views/page_add_group_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/create_group/views/page_create_group_mailing_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/groups_mailing/add_group/views/page_add_group_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/user_in_course_details/views/page_user_in_course_details_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_in_course_details/views/items/page_item_chart_user_details_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/user_in_course_details/views/items/page_item_user_details_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/course_mailing/views/page_course_mailing_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/course_mailing/views/assign_user_to_mails_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/course_mailing/views/assign_group_user_to_mails_view.js') }}"></script>

    <script src="{{ asset('/js/darkanpanel/modules/pages/reports_elaarning/views/page_reports_elaarning_view.js') }}"></script>
    <script src="{{ asset('/js/darkanpanel/modules/pages/reports_mailing/views/page_reports_mailing_view.js') }}"></script>

    <!-- LMS Controller -->
    <script src="{{ asset('/js/darkanpanel/modules/lms_controller.js') }}"></script>

    <!-- LMS -->
    <script src="{{ asset('/js/darkanpanel/modules/lms.js') }}"></script>


@endsection