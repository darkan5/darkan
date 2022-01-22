<?php $__env->startSection('contentlms'); ?>

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
    <script src="<?php echo e(asset('/js/libs/underscore/underscore.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone/backbone.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone/backbone.controller.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/backbone/backbone.stickit.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/libs/marionette/backbone.marionette.js')); ?>"></script>

    <!-- Marionette -->
    <script src="<?php echo e(asset('/js/libs/backbone.marionette/lib/backbone.marionette.min.js')); ?>"></script>


    <!-- LAYOUT -->
    <script src="<?php echo e(asset('/js/lms/layout/models/item_model.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/layout/views/item_layout_view.js')); ?>"></script>

    <!-- Components -->
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/a_component_model.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/a_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quiz/a_quiz_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quizselectone/a_quizselectone_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quizfillinblanks/a_quizfillinblanks_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quizdnd/a_quizdnd_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quizconnectlines/a_quizconnectlines_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/wordsearch/a_wordsearch_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/crossword/a_crossword_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quizselect/a_quizselect_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/quizinputtext/a_quizinputtext_component_view.js')); ?>?"></script>


    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/formradio/a_formradio_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/formradio/a_formradio_group_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/formcheckbox/a_formcheckbox_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/formcheckbox/a_formcheckbox_group_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/forminputtext/a_forminputtext_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/formtextarea/a_formtextarea_component_view.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/components/formselect/a_formselect_component_view.js')); ?>?"></script>

    <!-- Components factory-->
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/factory/analitic_components_factory.js')); ?>?"></script>

    <!-- Charts -->
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/charts/analitics_chart.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/charts/pie/analitics_pie_chart.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/charts/line/analitics_line_chart.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/charts/percent/analitics_passed_percent_chart.js')); ?>?"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/charts/list/analitics_list_chart.js')); ?>?"></script>

    <!-- Charts factory-->
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/factory/analitic_charts_factory.js')); ?>?"></script>

    <!-- Pages -->
    <script src="<?php echo e(asset('/js/lms/pages/page/views/page_view.js')); ?>"></script>

    <!-- Pages models -->
    <script src="<?php echo e(asset('/js/lms/pages/page/models/page_model.js')); ?>"></script>


    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/questions_analytics_model.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/questions_analytics_item_model.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/questions_analytics_collection.js')); ?>"></script>

    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/questions_analytics_single_user_model.js')); ?>"></script>

    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/questions_analytics_variables_model.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/models/questions_analytics_variables_single_user_model.js')); ?>"></script>


    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/questions_analytics.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/questions_analytics_item.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/questions_analytics_list.js')); ?>"></script>

    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/questions_analytics_single_user.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/questions_analytics_variables.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/question_analytics/views/questions_analytics_variables_single_user.js')); ?>"></script>

    <!-- Single course-->
    <script src="<?php echo e(asset('/js/lms/pages/single_course/models/page_single_course_model.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/single_course/models/items/single_course_item_chart_model.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/single_course/models/items/single_course_item_list_model.js')); ?>"></script>

    <script src="<?php echo e(asset('/js/lms/pages/single_course/views/page_single_course_view.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/single_course/views/items/single_course_item_chart_view.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/lms/pages/single_course/views/items/single_course_item_list_view.js')); ?>"></script>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Użytkownik</span>
            <div class="pull-right">

            </div>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <a href="<?php echo e(url('lms/elearning/user/') . '/' . $user->id); ?>"><?php echo e($user->name); ?> (<?php echo e($user->email); ?>)</a>
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Publikacja</span>
            <div class="pull-right">
                <a href="<?php echo e(url('')); ?>" class="btn btn-success" id="open-course-preview"><i class="fa fa-play"></i> <?=Lang::get('darkanpanel.open_course')?></a>
            </div>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <a href="<?php echo e(url('lms/publication' . '/' . $course->id_banner )); ?>"><?php echo e($course->name); ?></a>
            <div><?php echo e($course->description); ?></div>
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

                <?php $__currentLoopData = $vars; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $var): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
                    <tr class="odd gradeX">

                        <td>
                            <?php echo e($var['pvarname']); ?>

                        </td>
                        <td>
                            <?php echo e($var['pvarvalue']); ?>

                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
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

                        <?php if($scoremData->course_status == 'incomplete'): ?>
                            <i style="color:#CDB332" class="fa fa-play-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_incomplete') ?>
                        <?php endif; ?>

                        <?php if($scoremData->course_status == 'passed'): ?>
                            <i style="color:green" class="fa fa-check-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_passed') ?>
                        <?php endif; ?>

                        <?php if($scoremData->course_status == 'failed'): ?>
                            <i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_failed') ?>
                        <?php endif; ?>

                    </td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.create_date")?>  </td>
                    <td><?php echo e($scoremData->create_date); ?></td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.modify_date")?> </td>
                    <td><?php echo e($scoremData->modify_date); ?></td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.user_score")?> </td>
                    <td><?php echo e($scoremData->user_score); ?>/<?php echo e($scoremData->score_max); ?> (<?= Lang::get('darkanpanel.score-required')?> <?php echo e(isset($requirements->scoreRequired) ? $requirements->scoreRequired : ''); ?> )</td>
                </tr>
                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.lesson_location")?> </td>
                    <td> <?php echo e($scoremData->lesson_location + 1); ?> </td>
                </tr>

                <tr class="odd gradeX">
                    <td> <?=Lang::get("darkanpanel.table_column_requirements")?> </td>
                    <td>
                        <ul>

                            <?php if(isset($requirements->pages)): ?>

                                <li>
                                    <i class="fa fa-file-o fa-fw"></i>  <?= Lang::get('darkanpanel.table_column_requirements_pages') ?>
                                </li>

                            <?php endif; ?>

                            <?php if(isset($requirements->score)): ?>

                                <li>
                                    <i class="fa fa-star fa-fw"></i>  <?= Lang::get('darkanpanel.table_column_requirements_score') ?>
                                    (<?php echo e(isset($requirements->scoreRequired) ? $requirements->scoreRequired : ''); ?>/<?php echo e(isset($requirements->scoreMax) ? $requirements->scoreMax : ''); ?>)
                                </li>

                            <?php endif; ?>

                            <?php if(!isset($requirements->pages) && !isset($requirements->score)): ?>
                                <?=Lang::get('darkanpanel.no_data')?>
                            <?php endif; ?>

                        </ul>
                    </td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
    <script type="text/javascript">
        var courseId = <?php echo json_encode($courseId); ?>;
        var userTimes = <?php echo json_encode($userTimes); ?>;
        var questiondata = <?php echo json_encode($questiondata); ?>;
        var scormdata = <?php echo json_encode($scormdata); ?>;

        console.log('courseId', courseId);
        console.log('userTimes:', userTimes);
        console.log('questiondata', questiondata);
        console.log('scormdata', scormdata);

        $('#single-course-chart').append(new SingleCourseItemChartView( { userTimes:{} }  ).render() );

        $('#single-course-questions-analytics').append(new QuestionsAnalyticsView( { courseId:courseId, questiondata:questiondata, scormdata:scormdata }  ).render().$el );
        $('#single-course-questions-analytics-variables').append(new QuestionsAnalyticsVariablesView( { courseId:courseId, scormdata:scormdata }  ).render() );

    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.lms', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>