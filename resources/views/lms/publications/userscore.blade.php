@extends('layouts.lms')

@section('contentlms')

    <?php

    include( base_path('/js/lms/pages/question_analytics/templates/question_analytics.templ') );
    include( base_path('/js/lms/pages/question_analytics/templates/question_analytics_item.templ') );
    include( base_path('/js/lms/pages/question_analytics/templates/question_analytics_components.templ') );
    include( base_path('/js/lms/pages/question_analytics/templates/question_analytics_charts.templ') );

    include( base_path('/js/lms/pages/question_analytics/templates/question_analytics_variables.templ') );

    include( base_path('/js/lms/pages/single_course/templates/page_single_course_template.templ') );
    include( base_path('/js/lms/pages/single_course/templates/single_course_item_chart_template.templ') );
    include( base_path('/js/lms/pages/single_course/templates/single_course_item_list_template.templ') );
    ?>

    <h1 class="page-header"><i class="fa fa-group fa-fw"></i>Wyniki <small>elearning</small></h1>
    <!-- Libs -->
    <script src="{{ asset('/js/libs/underscore/underscore.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.controller.js') }}"></script>
    <script src="{{ asset('/js/libs/backbone/backbone.stickit.js') }}"></script>
    <script src="{{ asset('/js/libs/marionette/backbone.marionette.js') }}"></script>

    <!-- Marionette -->
    <script src="{{ asset('/js/libs/backbone.marionette/lib/backbone.marionette.min.js') }}"></script>


    <!-- LAYOUT -->
    <script src="{{ asset('/js/lms/layout/models/item_model.js') }}"></script>
    <script src="{{ asset('/js/lms/layout/views/item_layout_view.js') }}"></script>

    <!-- Components -->
    <script src="{{ asset('/js/lms/pages/question_analytics/models/a_component_model.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/a_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quiz/a_quiz_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quizselectone/a_quizselectone_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quizfillinblanks/a_quizfillinblanks_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quizdnd/a_quizdnd_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quizconnectlines/a_quizconnectlines_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/wordsearch/a_wordsearch_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/crossword/a_crossword_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quizselect/a_quizselect_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/quizinputtext/a_quizinputtext_component_view.js') }}?"></script>


    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/formradio/a_formradio_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/formradio/a_formradio_group_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/formcheckbox/a_formcheckbox_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/formcheckbox/a_formcheckbox_group_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/forminputtext/a_forminputtext_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/formtextarea/a_formtextarea_component_view.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/components/formselect/a_formselect_component_view.js') }}?"></script>

    <!-- Components factory-->
    <script src="{{ asset('/js/lms/pages/question_analytics/views/factory/analitic_components_factory.js') }}?"></script>

    <!-- Charts -->
    <script src="{{ asset('/js/lms/pages/question_analytics/views/charts/analitics_chart.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/charts/pie/analitics_pie_chart.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/charts/line/analitics_line_chart.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/charts/percent/analitics_passed_percent_chart.js') }}?"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/charts/list/analitics_list_chart.js') }}?"></script>

    <!-- Charts factory-->
    <script src="{{ asset('/js/lms/pages/question_analytics/views/factory/analitic_charts_factory.js') }}?"></script>

    <!-- Pages -->
    <script src="{{ asset('/js/lms/pages/page/views/page_view.js') }}"></script>

    <!-- Pages models -->
    <script src="{{ asset('/js/lms/pages/page/models/page_model.js') }}"></script>


    <script src="{{ asset('/js/lms/pages/question_analytics/models/questions_analytics_model.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/models/questions_analytics_item_model.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/models/questions_analytics_collection.js') }}"></script>

    <script src="{{ asset('/js/lms/pages/question_analytics/models/questions_analytics_single_user_model.js') }}"></script>

    <script src="{{ asset('/js/lms/pages/question_analytics/models/questions_analytics_variables_model.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/models/questions_analytics_variables_single_user_model.js') }}"></script>


    <script src="{{ asset('/js/lms/pages/question_analytics/views/questions_analytics.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/questions_analytics_item.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/questions_analytics_list.js') }}"></script>

    <script src="{{ asset('/js/lms/pages/question_analytics/views/questions_analytics_single_user.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/questions_analytics_variables.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/question_analytics/views/questions_analytics_variables_single_user.js') }}"></script>

    <!-- Single course-->
    <script src="{{ asset('/js/lms/pages/single_course/models/page_single_course_model.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/single_course/models/items/single_course_item_chart_model.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/single_course/models/items/single_course_item_list_model.js') }}"></script>

    <script src="{{ asset('/js/lms/pages/single_course/views/page_single_course_view.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/single_course/views/items/single_course_item_chart_view.js') }}"></script>
    <script src="{{ asset('/js/lms/pages/single_course/views/items/single_course_item_list_view.js') }}"></script>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Użytkownik</span>
            <div class="pull-right">

            </div>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <a href="{{ url('lms/elearning/user/') . '/' . $user->id }}">{{ $user->name }} ({{ $user->email }})</a>
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Publikacja</span>
            <div class="pull-right">
                <a href="{{ url('') }}" class="btn btn-success" id="open-course-preview"><i class="fa fa-play"></i> <?=Lang::get('darkanpanel.open_course')?></a>
            </div>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <a href="{{ url('lms/publication' . '/' . $course->id_banner ) }}">{{ $course->name }}</a>
            <div>{{ $course->description }}</div>
        </div>
    </div>
 <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Czasy na stronach</span>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <div id="single-course-chart">
                <div id="pages-times-summary-chart"></div>
            </div>

        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Zmienne</span>

        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <table class="table table-striped table-hover">
                <tbody>

                @foreach ($vars as $var)
                    <tr class="odd gradeX">

                        <td>
                            {{$var['pvarname']}}
                        </td>
                        <td>
                            {{$var['pvarvalue']}}
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Wyniki</span>
            <div class="pull-right">

            </div>
        </div>
        <!-- /.panel-heading -->


        <div class="panel-body">

            <table class="table table-striped table-hover">
                <tbody>

                <?php
                $requirements = json_decode($course->requirements);
                ?>

                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.course_status")?>  </td>
                    <td>

                        @if($scoremData->course_status == 'incomplete')
                            <i style="color:#CDB332" class="fa fa-play-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_incomplete') ?>
                        @endif

                        @if($scoremData->course_status == 'passed')
                            <i style="color:green" class="fa fa-check-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_passed') ?>
                        @endif

                        @if($scoremData->course_status == 'failed')
                            <i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_failed') ?>
                        @endif

                    </td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.create_date")?>  </td>
                    <td>{{ $scoremData->create_date }}</td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.modify_date")?> </td>
                    <td>{{ $scoremData->modify_date }}</td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.user_score")?> </td>
                    <td>{{ $scoremData->user_score }}/{{ $scoremData->score_max }} (<?= Lang::get('darkanpanel.score-required')?> {{ isset($requirements->scoreRequired) ? $requirements->scoreRequired : '' }} )</td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.lesson_location")?> </td>
                    <td> {{ $scoremData->lesson_location + 1 }} </td>
                </tr>

                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.table_column_requirements")?> </td>
                    <td>
                        <ul>

                            @if(isset($requirements->pages))

                                <li>
                                    <i class="fa fa-file-o fa-fw"></i>  <?= Lang::get('darkanpanel.table_column_requirements_pages') ?>
                                </li>

                            @endif

                            @if(isset($requirements->score))

                                <li>
                                    <i class="fa fa-star fa-fw"></i>  <?= Lang::get('darkanpanel.table_column_requirements_score') ?>
                                    ({{ isset($requirements->scoreRequired) ? $requirements->scoreRequired : '' }}/{{ isset($requirements->scoreMax) ? $requirements->scoreMax : '' }})
                                </li>

                            @endif

                            @if(!isset($requirements->pages) && !isset($requirements->score))
                                <?=Lang::get('darkanpanel.no_data')?>
                            @endif

                        </ul>
                    </td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
    <script type="text/javascript">
        var courseId = {!! json_encode($courseId) !!};
        var userTimes = {!! json_encode($userTimes) !!};
        var questiondata = {!! json_encode($questiondata) !!};
        var scormdata = {!! json_encode($scormdata) !!};

        console.log('courseId', courseId);
        console.log('userTimes:', userTimes);
        console.log('questiondata', questiondata);
        console.log('scormdata', scormdata);

        $('#single-course-chart').append(new SingleCourseItemChartView( { userTimes:{} }  ).render() );

        $('#single-course-questions-analytics').append(new QuestionsAnalyticsView( { courseId:courseId, questiondata:questiondata, scormdata:scormdata }  ).render().$el );
        $('#single-course-questions-analytics-variables').append(new QuestionsAnalyticsVariablesView( { courseId:courseId, scormdata:scormdata }  ).render() );

    </script>
@endsection
