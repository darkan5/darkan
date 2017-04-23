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
	<div class="col-md-12">
		<div class="panel panel-primary">
			<div class="panel-heading panel-big">
				<span>Użytkownicy</span>
				<div class="btn-group pull-right">
                    <button class="btn btn-success add-new-user-window" data-toggle="modal" data-target="#add-new-user-window">Dodaj nowego użytkownika</button>
				</div>
			</div>
			<div class="panel-body">

				<div>Kliknij użytkownika i przejmij jego rolę</div>
                <br>

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nazwa</th>
                            <th>Email</th>
                            <th>Rola</th>
                            <th>Utworzony</th>
                            <th>Edytowany</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                    	@foreach ($users as $key => $user)

                        <tr>
                        	<td>{!! $key + 1 !!}</td>
                        	<td>
                        		<a href="{{ url('owner/loginas') }}/{{$user->id}}">
                                    {{ $user->name }}
                                </a>
                            </td>
                            <td>{{ $user->email }}</td>
                        	<td>{{ $user->role_name }}</td>
                        	<td>{{ $user->created_at }}</td>
                            <td>{{ $user->updated_at }}</td>
                        	<td>

                                <button class="btn btn-primary edit-user" data-toggle="modal" data-target="#edit-user-window" 
                                            user_id="{{ $user->id }}"
                                            name="{{ $user->name }}"
                                            email="{{ $user->email }}"
                                            role_id="{{ $user->role_id }}">
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-user" data-toggle="modal" data-target="#delete-user-window" 
                                                    user_id="{{ $user->id }}">
                                                    Usuń
                                </button>

                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="add-new-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dodaj nowego użytkownika</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'post')) !!}
            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Email') !!}
                        {!! Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Rola') !!}
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

<div class="modal fade" id="edit-user-window" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Edytuj użytkownika</h4>
            </div>

            {!! Form::open(array('class' => 'form', 'method' => 'put')) !!}
            {!! Form::hidden('user_id', null) !!}

            <div class="modal-body">

                    <div class="form-group">
                        {!! Form::label('name', 'Nazwa', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Nazwa')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Email') !!}
                        {!! Form::email('email', null, 
                            array('required', 
                                  'class'=>'form-control', 
                                  'placeholder'=>'Email')) !!}
                    </div>

                    <div class="form-group">
                        {!! Form::label('Rola') !!}
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

<script src="{{ asset('/js/users_list.js') }}"></script>

@endsection