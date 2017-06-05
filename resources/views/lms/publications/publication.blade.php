@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-book fa-fw"></i> Publikacja</h1>

<?php 
    $requirements = json_decode($course->requirements);
 ?>
<script src="{{ asset('/js/lms/publication.js') }}"></script>



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
		<span>Publikacja</span>
		<div class="btn-group pull-right">
			 
		</div>
	</div>
	<div class="panel-body">

        <div class="row">

            <div class="col-md-2">
                <img style="border: 1px solid black; width: 200px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
            </div>

            <div class="col-md-10">
                <h3>Nazwa: {{ $course->name }}</h3>
                <div>Opis: {{ $course->summary }}</div>
                <div>Utworzona: {{ $course->date_create }}</div>
                <div>Modyfikowana: {{ $course->modified }}</div>
                <div>Rozmiar: {{ round($course->size_project / 1024 / 1024, 2) }} Mb</div>
                <div>

                    <span>Wymagania:</span>


                    @if(isset($requirements->pages) && $requirements->pages == true)

                        <i class="fa fa-file-o fa-fw"></i>  <?= Lang::get('darkanpanel.table_column_requirements_pages') ?>

                    @endif

                    @if(isset($requirements->score) && $requirements->score == true)

                        <i class="fa fa-star fa-fw"></i>  <?= Lang::get('darkanpanel.table_column_requirements_score') ?> 
                        ({{ isset($requirements->scoreRequired) ? $requirements->scoreRequired : '' }}/{{ isset($requirements->scoreMax) ? $requirements->scoreMax : '' }})

                    @endif

                    @if((!isset($requirements->pages) || $requirements->pages == false) && (!isset($requirements->score) || $requirements->score == false))
                        <?=Lang::get('darkanpanel.no_data')?>
                    @endif

                </div>
            </div>
        </div>

        <div class="btn btn-default" title="{{ $course->summary }}">
             <img style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
             <a href="{{ url('lms/publication') . '/' . $course->id_banner }}" class="btn btn-info btn-xs">{{ $course->name }}</a>
             <button class="btn btn-success btn-xs edit-publication" id_banner="{{ $course->id_banner }}" name="{{ $course->name }}" summary="{{ $course->summary }}" data-toggle="modal" data-target="#edit-publication-window">E</button>
             <button class="btn btn-danger btn-xs delete-publication" id_banner="{{ $course->id_banner }}" data-toggle="modal" data-target="#delete-publication-window">X</button>
            <a href="{{ url('content', $course->path)  }}" target="_blank" class="btn btn-success btn-xs" id="open-course-preview"><i class="fa fa-play"></i> <?=Lang::get('darkanpanel.open_course')?></a>
        </div>

	</div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Projekt</span>
        <div class="btn-group pull-right">
             
        </div>
    </div>
    <div class="panel-body">

        <div class="btn btn-default">

            <?php 

                $project =  $course->project;

             ?>
            <img  style="height:20px; border:1px solid black;" src="{{ asset('/css/img/projects_logos/project_' . $project->editor_id . '.png') }}" >
            <a href="{{ url('lms/project', $project->project_id) }}" class="btn btn-default btn-xs">{{ $project->name }}</a>
            <a href="{{ url('editor', $project->project_id)  }}" class="btn btn-success btn-xs"><i class="fa fa-play"></i>Otwórz projekt</a>
        </div>

    </div>
</div>



<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Grupy</span>
        <div class="pull-right">
            
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        @if($course->groupContents)

            @foreach($course->groupContents as $groupContent)

                <?php 

                    $group = $groupContent->group;

                 ?>

                <div class="btn btn-default">
                    <a class="btn btn-primary btn-xs" href="{{ url('/lms/elearning/group') . '/' . $group->id }}">{{ $group->name }}</a>
                    

                    @if($group->groupUsers)

                        @foreach($group->groupUsers as $groupUser)

                            <?php 

                                $user = $groupUser->user;

                             ?>
                            <img style="border: 1px solid black; height: 20px;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                            <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/elearning/user') . '/' . $user->id }}">{{ $user->name }}</a>

                        @endforeach

                    @endif

                    <button class="btn btn-danger btn-xs delete-course-from-group" group_id="{{ $group->id }}" content_id="{{ $course->id_banner }}" data-toggle="modal" data-target="#delete-course-from-group-window">X</button>
                </div>

            @endforeach

            <button class="btn btn-success add-course-to-group" content_id="{{ $course->id_banner }}" data-toggle="modal" data-target="#add-course-to-group-window">+</button>
            <a href="{{ url('lms/elearning/groups') }}" class="btn btn-success">Dodaj nową grupę</a>
        @endif
    </div>

</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Roześlij emaile</span>
        <div class="btn-group pull-right">
             
        </div>
    </div>
    <div class="panel-body">

        <a href="{{ url('lms/elearning/mailing', $course->id_banner)  }}" class="btn btn-success">Roześlij emaile</a>

    </div>
</div>

<div class="panel panel-primary">
	<div class="panel-heading">
		<span>Użytkownicy którzy odwiedzili kurs</span>
		<div class="btn-group pull-right">
			
		</div>
	</div>
	<div class="panel-body text-center">

		<table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th><?=Lang::get("darkanpanel.table_column_user")?></th>
                    <th><?=Lang::get("darkanpanel.table_column_status")?></th>
                    <th><?=Lang::get("darkanpanel.table_column_points")?></th>
                    <th><?=Lang::get("darkanpanel.table_column_date")?></th>
                    <th><?=Lang::get("darkanpanel.table_column_options")?></th>
                </tr>
            </thead>
            <tbody>

            	

            	@foreach ($users as $key => $user)

                    <tr>
                        <td>{!! $key + 1 !!}</td>
                        <td>

                            <div class="btn btn-default">
                                <div class="user-photo" style="background-image:url({{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png')  }} )"></div>
                                <a class="btn btn-warning btn-xs" href="{{ url('/lms/elearning/user/') . '/' . $user->id }}"> {{ $user->name }} ( {{ $user->email }})</a>
                            </div>
                        
                        </td>
                       
                        <td>

                    		@if($user->course_status == 'incomplete')
                    			<i style="color:#CDB332" class="fa fa-play-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_incomplete') ?>
                    		@endif

                    		@if($user->course_status == 'passed')
                    			<i style="color:green" class="fa fa-check-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_passed') ?>
                    		@endif

                    		@if($user->course_status == 'failed')
                    			<i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_failed') ?>
                    		@endif

                        </td>
                        <td>{{ $user->user_score }}/{{ $user->score_max }} (<?= Lang::get('darkanpanel.score-required')?> {{ isset($requirements->scoreRequired) ? $requirements->scoreRequired : '' }} )</td>
                        <td>{{ $user->modify_date }}</td>
                        <td>

                            <button class="btn btn-danger delete-user-scorm-data" data-toggle="modal" data-target="#delete-user-scorm-data-window" 
                                                scorm_data_id="{{ $user->scorm_data_id }}">
                                                Usuń podejście
                            </button>

                            <a class="btn btn-primary" href="{{ url('/lms/publication/userscore/') . '/' . $user->id . '/' . $course->id_banner }}">Pokaż wyniki</a>
                   
                        </td>
                    </tr>

                @endforeach

            </tbody>
        </table>
	</div>
</div>


<div class="panel panel-primary">
    <div class="panel-heading">
        <i class="fa fa-bar-chart-o fa-fw"></i> <?=Lang::get("darkanpanel.chart_title_time_spent_on_site_by_the_users")?>
    </div>
    <div class="panel-body">

        <div id="single-course-chart">
            <div id="pages-times-summary-chart"></div>
        </div>

    </div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <i class="fa fa-bar-chart-o fa-fw"></i> <?=Lang::get("darkanpanel.panel_title_project_variables")?>
    </div>
    <div class="panel-body">
        <div id="single-course-questions-analytics-variables"></div>
    </div>
</div>


<div id="single-course-questions-analytics"></div>

<div class="clearfix"></div>

<div class="modal fade" id="delete-user-scorm-data-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie podejścia</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć podejście użytkownika?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('scorm_data_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="add-course-to-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj grupę do kursu</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post', 'url' => 'lms/publicationaddcoursetogroup')) !!}
            {!! Form::hidden('content_id', $course->id_banner) !!}

            <div class="modal-body">
                <div class="form-group">
                    <div class="modal-body">
                        <div class="form-group">
                            {!! Form::label('Grupa') !!}
                            {!! Form::select('group_id', $groupsArray, null, array('class' => 'form-control')) !!}
                        </div>
                    </div>

            </div>
            </div>
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="delete-course-from-group-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie grupy</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć grupę z publikacji?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'lms/publicationdeletegroup')) !!}
            {!! Form::hidden('group_id', null) !!}
            {!! Form::hidden('content_id', $course->id_banner) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="edit-publication-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj publikację</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put', 'url' => 'lms/publicationedit')) !!}
            {!! Form::hidden('id_banner', null) !!}
            {!! Form::hidden('content_id', $course->id_banner) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Opis') !!}
                        {!! Form::textarea('summary', null, 
                            array(
                                  'class'=>'form-control', 
                                  'placeholder'=>'Opis')) !!}
                    </div>

            </div>
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<div class="modal fade" id="delete-publication-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie publikacji</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć publikację?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete', 'url' => 'lms/publicationdelete')) !!}
            {!! Form::hidden('id_banner', null) !!}
            {!! Form::hidden('content_id', $course->id_banner) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>




<script type="text/javascript">
    var courseId = {!! json_encode($courseId) !!};
    var userTimes = {!! json_encode($userTimes) !!};
    var questiondata = {!! json_encode($questiondata) !!};
    var scormdata = {!! json_encode($scormdata) !!};

    console.log('courseId', courseId);
    console.log('userTimes', userTimes);
    console.log('questiondata', questiondata);
    console.log('scormdata', scormdata);

    $('#single-course-chart').append(new SingleCourseItemChartView( { userTimes:userTimes }  ).render() );

    $('#single-course-questions-analytics').append(new QuestionsAnalyticsView( { courseId:courseId, questiondata:questiondata }  ).render() );
    $('#single-course-questions-analytics-variables').append(new QuestionsAnalyticsVariablesView( { courseId:courseId, scormdata:scormdata }  ).render() );

</script>

@endsection