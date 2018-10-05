@extends('layouts.lms')

@section('contentlms')

    <h1 class="page-header"><i class="fa fa-group fa-fw"></i>Wyniki <small>elearning</small></h1>

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

@endsection