@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-users fa-fw"></i> Nowe konta użykowników <a href="{{ url('lms/elearning/users') }}" class="btn btn-danger">Wróć do listy użytkowników</a></h1>



@if(count($addedUsersToGroup))

<div class="panel panel-default">
    <div class="panel-heading">
        Lista użytkowników dodanych do grupy: <a class="btn btn-info btn-xs" href="{{ url('/lms/elearning/group/') . '/' . $group->id }}"> {{ $group->name }}</a>
        <div class="pull-right">
            
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        <div class="dataTable_wrapper">
            <table class="table table-responsive table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th><?=Lang::get("darkanpanel.table_column_mail")?></th>
                        <th>Utworzony</th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($addedUsersToGroup as $key => $user)

                        <tr>
                            <td>{!! $key + 1 !!}</td>

                            <td>

                                <div class="btn btn-default">
                                    <img style="border: 1px solid black; height: 20px;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                                    <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/elearning/user/') . '/' . $user->id }}"> {{ $user->name }}</a>
                                </div>

                            </td>

                            <td>{{ $user->created_at }}</td>
                        
                        </tr>

                    @endforeach

                </tbody>
            </table>
        </div>
    </div>
    <!-- /.panel-body -->
</div>
<!-- /.panel -->

@endif

<div class="panel panel-default">
    <div class="panel-heading">
        Lista utworzonych użytkowników i dodanych do grupy: <a class="btn btn-info btn-xs" href="{{ url('/lms/elearning/group/') . '/' . $group->id }}"> {{ $group->name }}</a>
        <div class="pull-right">
            
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">
        <div class="dataTable_wrapper">
            <table class="table table-responsive table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th><?=Lang::get("darkanpanel.table_column_mail")?></th>
                        <th>Utworzony</th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($createdUsers as $key => $user)

                        <tr>
                            <td>{!! $key + 1 !!}</td>

                            <td>

                                <div class="btn btn-default">
                                    <img style="border: 1px solid black; height: 20px;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user_small.png') }} ">
                                    <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/elearning/user/') . '/' . $user->id }}"> {{ $user->name }}</a>
                                </div>

                            </td>

                            <td>{{ $user->created_at }}</td>
                        
                        </tr>

                    @endforeach

                </tbody>
            </table>
        </div>
    </div>
    <!-- /.panel-body -->
</div>
<!-- /.panel -->


@endsection