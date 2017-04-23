@extends('layouts.lms')

@section('contentlms')

<link href="{{ asset('/js/libs/summernote-master/dist/summernote.css') }}" rel="stylesheet">

<h1 class="page-header"><i class="fa fa-group fa-fw"></i> Roześlij emaile <small>elearning</small></h1>


<div class="panel panel-primary">
    <div class="panel-heading">
        <span></span>
        <div class="btn-group pull-right">
            
        </div>
    </div>
    <div class="panel-body">
        <a href="{{ url('lms/elearning/groups') }}" class="btn btn-primary">Utwórz nową grupę</a>
        <a href="{{ url('lms/elearning/users') }}" class="btn btn-warning">Utwórz nowego użytkownika</a>
    </div>
</div>

<div class="panel panel-primary">
    <div class="panel-heading">
        <?=Lang::get("darkanpanel.panel_title_groups_list")?>

        <div class="pull-right">
            
        </div>
    </div>
    <!-- /.panel-heading -->
    <div class="panel-body">

        <table class="table table-responsive table-bordered table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th><?=Lang::get("darkanpanel.table_column_groups")?></th>
                    <th><?=Lang::get("darkanpanel.table_column_users")?></th>
                </tr>
            </thead>
            <tbody>

               
                @if($course->groupContents)

                    @foreach($course->groupContents as $key => $groupContent)

                        <tr>

                            <td>{{ $key + 1 }}</td>

                            <?php 

                                $group = $groupContent->group;

                             ?>

                            <td>
                                <a class="btn btn-primary btn-xs" href="{{ url('/lms/elearning/group') . '/' . $group->id }}">{{ $group->name }}</a>
                            </td>

                            <td>
  
                                @if($group->groupUsers)

                                    @foreach($group->groupUsers as $groupUser)

                                        <?php 

                                            $user = $groupUser->user;

                                         ?>

                                        <a class="btn btn-warning btn-xs" title="{{ $user->email }}" href="{{ url('/lms/elearning/user') . '/' . $user->id }}">{{ $user->name }}</a>

                                    @endforeach

                                @endif

                            </td>

                        </tr>

                    @endforeach
                @endif

            </tbody>
        </table>

    </div>
    <!-- /.panel-body -->
</div>
<!-- /.panel -->


<div class="panel panel-primary">
    <div class="panel-heading">
        <?=Lang::get("darkanpanel.mailing_message")?>
    </div>
    <div class="panel-body">

        {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
        {!! Form::hidden('id_user', null) !!}

        <div class="modal-body">
 
             <div class="form-group">
                {!! Form::text('title', null, 
                    array('required', 
                          'class'=>'form-control mailing-title', 
                          'placeholder'=>'Tytuł wiadomości')) !!}
            </div>

            <div class="form-group">

                {!! Form::textarea('message', null, 
                    array( 
                          'class'=>'form-control mailing-message', 
                          'placeholder'=>'Wiadomość')) !!}
            </div>

        </div>
        <div class="modal-footer">

            <div class="btn-group pull-right">
                 {!! Form::submit(Lang::get('darkanpanel.send_message_btn'), array('class'=>'btn btn-success')) !!}
            </div>

        </div>
        {!! Form::close() !!}

    </div>
</div>


<!-- CK editor -->
<script src="{{ asset('/js/libs/ckeditor/ckeditor.js') }}"></script>

<script src="{{ asset('/js/lms/publication_elearning_mailing.js') }}"></script>


@endsection