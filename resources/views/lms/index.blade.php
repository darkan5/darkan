@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-home fa-fw"></i> <?=Lang::get("darkanpanel.page_name_main_panel")?></h1>




<div class="items-wrapper"></div>

<!-- /.row -->
<div class="row">
    <div class="col-lg-6 col-md-6" id="allCoursesCounter">
         <a href="{{ url('lms/publications') }}">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-book fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge number-of-courses">{{ count($coursesList) }} / {{ $maxCourses }}</div>
                            <div><?= Lang::get("darkanpanel.dashboard_item_courses")?></div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <span class="pull-left"><?= Lang::get("darkanpanel.dashboard_courses_show_list")?></span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </div>
        </a>
    </div>

    <div class="col-lg-6 col-md-6" id="allUsersCounter">
       <a href="{{ url('lms/elearning/users') }}">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-users fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge number-of-users">{{ count($usersEmearningList) }} / {{ $maxUsers }}</div>
                            <div><?= Lang::get('darkanpanel.dashboard_item_users')?></div>
                        </div>
                    </div>
                </div>
                    <div class="panel-footer">
                        <span class="pull-left"><?= Lang::get('darkanpanel.dashboard_users_show_list')?></span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
            </div>
        </a>
    </div>


</div>

<div class="row">
    <div class="col-lg-8 col-md-8">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-bar-chart-o fa-fw"></i> <?=Lang::get("darkanpanel.chart_title_number_of_users_on_the_course")?>
            </div>
            <div class="panel-body">
                <div id="most-popular-chart"></div>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-md-4">
        <div class="panel panel-default">
                <div class="panel-heading">
                    <i class="fa fa-bar-chart-o fa-fw"></i> <?=Lang::get("darkanpanel.chart_title_statuses_of_users_in_courses")?>
                </div>
                <div class="panel-body">
                    <div id="morris-course-statuses-chart"></div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-6 col-md-6" id="courseList">

        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header"><?= Lang::get('darkanpanel.page_name_dashboard_courses')?></h1>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <?= Lang::get('darkanpanel.panel_title_dashboard_courses_list')?>
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">

                        @if(count($coursesList))

                          <table class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><?=Lang::get("darkanpanel.table_column_name")?></th>

                                </tr>
                            </thead>
                            <tbody>

                                @foreach ($coursesList as $key => $course)

                                    <tr class="odd gradeX">
                                        <td>{{ $key + 1 }}</td>

                                        <td>

                                            <div class="course-thumb" style="background-image:url({{ count($course->thumb) > 8 ? $course->thumb : asset('/css/img/favicon/favicon.png')  }})"></div>
                                            <a class="btn btn-info btn-xs" title="{{ $course->summary }}" href="{{ url('lms/publication') . '/' . $course->id_banner  }}">{{ $course->name }}</a>
                                        </td>


                                    </tr>
                              
                                @endforeach
                                
                            </tbody>
                        </table>

                        @else
                            <a title="Dodaj nową publikację"  class="btn btn-success" href="{{ url('/lms/projects') }}">+</a>
                        @endif

                    </div>
                    <!-- /.panel-body -->
                </div>
                <!-- /.panel -->
            </div>
            <!-- /.col-lg-12 -->
        </div>
    </div>

    <div class="col-lg-6 col-md-6" id="usersEmearningList">

        <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header"><?= Lang::get('darkanpanel.page_name_dashboard_users')?></h1>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
              <div class="panel panel-primary">
                  <div class="panel-heading">
                      Użytkownicy
                      <small>(elearning)</small>

                      <div class="pull-right">
                      </div>
                  </div>
                  <!-- /.panel-heading -->
                  <div class="panel-body">


                    @if(count($usersEmearningList))

                      <table class="table table-responsive table-bordered table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th><?=Lang::get("darkanpanel.table_column_mail")?></th>

                            </tr>
                        </thead>
                        <tbody>

                            

                            @foreach ($usersEmearningList as $key => $user)

                                <tr>
                                    <td>{!! $key + 1 !!}</td>

                                    <td>

                                        <div class="user-photo" style="background-image:url({{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png')  }} )"></div>
                                        <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/elearning/user/') . '/' . $user->id }}"> {{ $user->name }}</a>

                                    </td>



                                </tr>

                            @endforeach

                        </tbody>
                    </table>

                    @else
                        <a title="Dodaj nowego użytkownika" class="btn btn-success" href="{{ url('/lms/elearning/users') }}">+</a>
                    @endif
                  </div>
                  <!-- /.panel-body -->
              </div>
              <!-- /.panel -->
          </div>
          <!-- /.col-lg-12 -->
        </div>
    </div>




</div>





@endsection