@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-book fa-fw"></i> Raport</h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Pliki do pobrania</span>
        <div class="btn-group pull-right">

        </div>
    </div>
    <div class="panel-body">
        <div>
            
            {!! Form::open(array('class' => 'form',  'method' => 'post', 'url' => 'lms/elearning/downloadfile')) !!}

                {!! Form::hidden('use_dates', $use_dates) !!}
                {!! Form::hidden('start_date', $start_date) !!}
                {!! Form::hidden('end_date', $end_date) !!}

                @foreach($selectedCourses as  $key => $course) 
                     <input type="hidden" checked value="{{ $course->id_banner }}" type="checkbox" name="courses_ids[]">  
                @endforeach

                @foreach($selectedGroups as  $key => $group) 
                     <input type="hidden" checked value="{{ $group->id }}" type="checkbox" name="groups_ids[]">  
                @endforeach


                <input type="submit" name="file_type" value="csv" class="btn btn-success">
                <input type="submit" name="file_type" value="xls" class="btn btn-success">
                <input type="submit" name="file_type" value="json" class="btn btn-success">

            {!! Form::close() !!}

        </div>
    </div>
 </div>

@if($use_dates == 'yes')

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Okres szkolenia</span>
            <div class="btn-group pull-right">

            </div>
        </div>
        <div class="panel-body">

            <div>
                <label>Rozpoczęcie szkolenia</label>
                <span>{{ $start_date }}</span>
            </div>

            <div>
                <label>Zakończenie szkolenia</label>
                <span>{{ $end_date }}</span>
            </div>

            <div>
                <label>Całkowity czas</label>
                <span>{{ $timeAmountForHumans }}</span>
            </div>

        </div>
    </div>

@endif

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Wybrane Kursy</span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">

        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Nazwa</th>
                    <th>Wymagania</th>
                </tr>
            </thead>
            <tbody>

                @foreach($selectedCourses as  $key => $course)


                    <tr>

                        <td> {{ $key + 1 }} </td>

                        <td>
                            <img style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
                            <a class="btn btn-info btn-xs" href="{{ url('/lms/publication') . '/' . $course->id_banner }}">{{ $course->name }}</a>
                        </td>

                        <td>

                            <?php 
                                $requirements = json_decode($course->requirements);
                             ?>

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

                        </td>

                    </tr>

                @endforeach

            </tbody>
        </table>

    </div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Raport</span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">

        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Awatar</th>
                    <th>Imię i Nazwisko</th>
                    <th>Email</th>

                    @foreach($selectedCourses as  $key => $course)
                        <th>
                            <a title="{{ $course->name }}" href="{{ url('/lms/publication') . '/' . $course->id_banner }}">
                                <button class="btn btn-info btn-xs">{{ substr($course->name, 0, 12) }}...</button>
                                <img style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
                            </a>
                        </th>
                            
                    @endforeach

                    <th>Wynik</th>

                </tr>
            </thead>
            <tbody>

                @foreach($users as  $key => $user)

                    <?php 

                        $scormDatasStatuses = [];

                     ?>

                    <tr>

                        <td> {{ $key + 1 }} </td>

                        <td>
                             <a href="{{ url('/lms/elearning/user/') . '/' . $user->id }}">
                                <img style="border: 1px solid black; width: 20px;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                             </a>
                        </td>

                        <td>
                            <a href="{{ url('/lms/elearning/user/') . '/' . $user->id }}">
                                {{ $user->name }}
                            </a>
                        </td>
                        <td>
                            <a href="{{ url('/lms/elearning/user/') . '/' . $user->id }}">
                               {{ $user->email }}
                            </a>
                        </td>

                        @foreach($selectedCourses as  $keyCourse => $course)
                            <td>
                               <?php 
                                    $scormData = $user->scorm_datas[$keyCourse];
             
                                    array_push($scormDatasStatuses, $scormData->course_status);
                                 ?>

                                @if($scormData->course_status == 'incomplete')
                                    <i style="color:#CDB332" class="fa fa-play-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_incomplete') ?>
                                @endif

                                @if($scormData->course_status == 'passed')
                                    <i style="color:green" class="fa fa-check-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_passed') ?>
                                @endif

                                @if($scormData->course_status == 'failed')
                                    <i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_failed') ?>
                                @endif

                                @if($scormData->course_status == 'notstarted')
                                    <i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_notstarted') ?>
                                @endif

                            </td>
                        @endforeach

                        <td>

                            @if(in_array('passed', $scormDatasStatuses, true))
                                <i style="color:green" class="fa fa-check-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_passed') ?>
                            @else
                                <i style="color:red" class="fa fa-times-circle fa-fw"></i>  <?=Lang::get('darkanpanel.course_status_failed') ?>
                            @endif

                        </td>

                    </tr>

                @endforeach

            </tbody>
        </table>

    </div>
</div>

@endsection