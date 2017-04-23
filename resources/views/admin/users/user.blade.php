@extends('layouts.app')

@section('content')

<div class="topmenu-offset"></div>

<ul>
    @foreach($errors->all() as $error)
        <div class="bs-example col-md-10 col-md-offset-1">
            <div class="alert alert-warning">
                <a href="#" class="close" data-dismiss="alert">&times;</a>
                <strong>Uwaga!</strong> {{ $error }}
            </div>
        </div>
    @endforeach
</ul>

<div class="container-fluid">

    <h1 class="page-header"><i class="fa fa-book fa-fw"></i> Użytkownik</h1>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Użytkownik</span>
            <div class="btn-group pull-right">
                <button class="btn btn-primary edit-user" data-toggle="modal" data-target="#edit-user-window" 
                            user_id="{{ $user->id }}"
                            name="{{ $user->name }}"
                            email="{{ $user->email }}"
                            role_id="{{ $user->roleUser->role_id }}">
                            Edytuj
                </button>

                <button class="btn btn-danger delete-user" data-toggle="modal" data-target="#delete-user-window" 
                                    user_id="{{ $user->id }}">
                                    Usuń
                </button>
            </div>
        </div>
        <div class="panel-body">

            <div class="row">

                <div style="float: left; margin: 15px">
                    <img style="border: 1px solid black;" src="{{ ($user->photo != 'default') ? $user->photo : asset('/css/img/default_user.png') }} ">
                </div>

                <div style="float: left; margin: 15px">
                    <h4>Imię i Nazwisko: {{ $user->name }}</h4>
                    <div>Email: {{ $user->email }}</div>
                    
                    @if(Auth::user()->hasRole('admin') || Session::get('isAdmin'))
                        <div>Rola: {{ $user->roleUser->role->name }}</div>
                    @endif

                    <div>Utworzony: {{ $user->created_at }}</div>
                    <div>Edytowany: {{ $user->updated_at }}</div>
                </div>
            </div>

            <hr>

            <a class="btn btn-success" href="{{ $addProjectsUrl }}">Dodaj projekty dla tego użytkownika</a>
            <a class="btn btn-danger" href="{{ $backToUserListUrl  }}">Wróć do listy użytkowników</a>

        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>Projekty</span>
            <div class="btn-group pull-right">
                
            </div>
        </div>
        <div class="panel-body">


                @foreach($user->projects  as $project)

                    <div class="btn btn-default">
                        <img  style="height:20px; border:1px solid black;" src="{{ config('app.projects_thumb_link') . $project->project_id . '.jpg'}}" >
                        <a class="btn btn-default btn-xs" href="{{ url('lms/project', $project->project_id) . '/' . $user->id }}">{{ $project->name }}</a>
                        <a href="{{ url('editor', $project->project_id) . '/' . $user->id  }}" target="_blank" class="btn btn-success btn-xs">Otwórz projekt</a>
                        @foreach ($project->banners as $course) 

                                <div class="btn btn-default">
                                    <img style="border: 1px solid black; width: 20px;" src="{{ ($course->thumb != 'none') ? $course->thumb : asset('/css/img/play_button.png') }} ">
                                    <a class="btn btn-info btn-xs" href="{{ url('lms/publication') . '/' . $course->id_banner . '/' . $user->id  }}">{{ $course->name }}</a>
                                    <a href="{{ url('content', $course->path)  }}" target="_blank" class="btn btn-success btn-xs">O</a>
                                </div>


                           @endforeach

                    </div>
                    
                @endforeach

        </div>
    </div>
</div>


<div class="modal fade" id="edit-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('user_id', $user->id) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('email', 'Email') !!}
                        {!! Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('role_id', 'Rola') !!}
                        {!! Form::select('role_id', $rolesList, null, array('class' => 'form-control')) !!}
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

<div class="modal fade" id="delete-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Usuwanie użytkownika</h4>
            </div>

            <div class="modal-body">
            Czy na pewno chcesz usunąć użytkownika?
            </div>
            {!! Form::open(array('class' => 'form', 'method' => 'delete')) !!}
            {!! Form::hidden('user_id', null) !!}
            <div class="modal-footer">
                {!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
                <button type="button" class="btn btn-default" data-dismiss="modal">Anuluj</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>

<script src="{{ asset('/js/roles/admin/user.js') }}"></script>

@endsection