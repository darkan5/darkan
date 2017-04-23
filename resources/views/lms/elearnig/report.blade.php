@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-book fa-fw"></i> Raport</h1>


{!! Form::open(array('class' => 'form',  'method' => 'post')) !!}

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Okres szkolenia</span>
        <div class="btn-group pull-right">

        </div>
    </div>
    <div class="panel-body">


        <div class="form-group col-md-4">
            {!! Form::label('use_dates','Sprawdzanie daty') !!}
            {!! Form::select('use_dates', array('yes' => 'Sprawdzaj datę', 'no' => 'Nie sprawdzaj daty'), 'no', array('class' => 'form-control')) !!}
        </div>

        <div class="form-group col-md-4">
            {!! Form::label('start_date','Rozpoczęcie szkolenia') !!}
            {!! Form::text('start_date', null, 
                array(
                      'class'=>'datepicker-start-date-add form-control', 
                      'placeholder'=>'Rozpoczęcie szkolenia')) !!}
        </div>

        <div class="form-group col-md-4">
            {!! Form::label('end_date','Zakończenie szkolenia') !!}
            {!! Form::text('end_date', null, 
                array(
                      'class'=>'datepicker-end-date-add form-control', 
                      'placeholder'=>'Zakończenie szkolenia')) !!}
        </div>

    </div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <span>Kursy</span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">

        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Wybrany</th>
                    <th>Nazwa</th>
                    <th>Użytkownicy</th>
                    <th>Wielkość [Mb]</th>
                    <th>Wymagania</th>
                </tr>
            </thead>
            <tbody>

                @foreach($courses as  $key => $course)


                    <tr>

                        <td> {{ $key + 1 }} </td>

                        <td>
                            <input value="{{ $course->id_banner }}" type="checkbox" name="courses_ids[]">
                        </td>

                        <td>
                            <img style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
                            <a class="btn btn-info btn-xs" href="{{ url('/lms/publication') . '/' . $course->id_banner }}">{{ $course->name }}</a>
                        </td>

                        <td>
                            {{ count($course->scormData) }}
                        </td>

                        <td>
                            {{ round($course->size_project / 1024 / 1024, 2) }}
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
        <span>Grupy</span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">

        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Wybrany</th>
                    <th>Nazwa</th>
                    <th>Użytkownicy</th>
                    <th>Kursy</th>
                </tr>
            </thead>
            <tbody>

                @foreach($groups as  $key => $group)

                    <tr>

                        <td> {{ $key + 1 }} </td>

                        <td>
                            <input value="{{ $group->id }}" type="checkbox" name="groups_ids[]">
                        </td>

                        <td>
                            <a class="btn btn-primary btn-xs" href="{{ url('/lms/elearning/group') . '/' . $group->id }}">{{ $group->name }}</a>
                        </td>

                        <td>

                            <?php 

                                $groupUsers = $group->groupUsers;

                            ?>

                            @if($groupUsers)

                                @foreach($groupUsers as $groupUser)

                                    <?php 

                                        $user = $groupUser->user;

                                     ?>
            
                                    <a title=" {{ $user->name }} ( {{ $user->email }})" href="{{ url('/lms/elearning/user') . '/' . $user->id }}">
                                        <img style="border: 1px solid black; height:20px;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                                    </a>

                                @endforeach

                            @endif

                        </td>

                        <td>

                            <?php 
                                $groupContents = $group->groupContents;
                            ?>
                            
                            @if($groupContents)

                                @foreach($groupContents  as $groupContent)

                                    <?php 

                                        $course = $groupContent->banner;
                                     ?>

                                    <a title="{{ $course->name }}" href="{{ url('/lms/publication') . '/' . $course->id_banner }}">
                                        <img  style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
                                    </a>
                                @endforeach
                              
                            @endif

                        </td>

                    </tr>

                @endforeach

            </tbody>
        </table>

    </div>
</div>

{!! Form::submit('Generuj raport', array('class'=>'btn btn-success')) !!}

{!! Form::close() !!}

<script src="{{ asset('/js/lms/report.js') }}"></script>


@endsection