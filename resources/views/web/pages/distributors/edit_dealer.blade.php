@extends('layouts.app')

@section('content')
<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>

<ul>
    @foreach($errors->all() as $error)
		<div class="bs-example col-md-10 col-md-offset-1">
		    <div class="alert alert-warning">
		        <a href="#" class="close" data-dismiss="alert">&times;</a>
		        <strong>Warning!</strong> {{ $error }}
		    </div>
		</div>
    @endforeach
</ul>

<div class="col-md-8 col-md-offset-2">
				
	<div class="form-group">
		<a href="{{ url('/administration/dashboard') }}" class="btn btn-success">Powrót do listy</a>
	</div>

	<h4 class="col-md-offset-2">Edycja użytkownika</h4>

	<hr>


	{!! Form::open(array('route' => 'edit_user', 'class' => 'form form-horizontal',  'method' => 'put', 'url' => 'administration/editdealer')) !!}
	{!! Form::hidden('dealerId', $dealerId) !!}


	<div class="form-group">
	    {!! Form::label('User id', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

		<div class="col-sm-10">
		{!! Form::label($user->user_id, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
		 </div>
         
	</div>


	<div class="form-group">
	    {!! Form::label('Login', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::text('login', $user->login, 
		        array('required', 
		              'class'=>'form-control', 
		              'placeholder'=>'E-mail')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Lang', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::text('lang', $user->lang, 
		        array('required', 
		              'class'=>'form-control', 
		              'placeholder'=>'pl')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('User type', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
    		{!! Form::select('usertype', $userTypes, $user->type, array('required', 
	              'class'=>'form-control', 
	              'placeholder'=>'') )  
	        !!}

	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Photo', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		{!! Form::label($user->photo, null,
	    		array('required', 
		              'class'=>'control-label')) !!}

		    <img src="{{ $user->photo }}"/>
		</div>
	</div>

	<div class="form-group">
	    {!! Form::label('Subdomain', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::text('subdomain', $user->subdomain, 
		        array('required', 
		              'class'=>'form-control', 
		              'placeholder'=>'')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Subdomain name', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::text('subdomain_name', $user->subdomain_name, 
		        array('null', 
		              'class'=>'form-control', 
		              'placeholder'=>'')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Login count', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::label($user->login_count, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Date last login', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::label($user->date_last_login, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Hash', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::label($user->hash, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Owner id', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::label($user->owner_id, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Created at', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::label($user->created_at, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
	    </div>
	</div>

	<div class="form-group">
	    {!! Form::label('Updated at', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
		    {!! Form::label($user->updated_at, null,
	    		array('required', 
		              'class'=>'control-label')) !!}
	    </div>
	</div>

	<hr>

	<div class="form-group">
	    {!! Form::label('Plans', null,
	    		array('required', 
		              'class'=>'control-label col-sm-2')) !!}

	    <div class="col-sm-10">
	    	<table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Data wygaśnięcia</th>
                    </tr>
                </thead>
                <tbody>
				    @foreach ($user->user_plans as $key => $plan)
			            <tr>

			            	<td>
			            		@foreach ($plan as $key2 => $p)
			            		
			            		 	<?php $index = array_search($key2, $plansObject[$key]); ?>

				            		{!! Form::select($key2 . '_plan', $plansObject[$key], $index, array('required', 
							              'class'=>'form-control', 
							              'placeholder'=>'') )  
							        !!}

			            		@endforeach


			            		 
			            	</td>
			            	<td>
			            		@foreach ($plan as $key2 => $planEndDate)
			            		 	
			            		 	{!! Form::text($key2 . '_date', $planEndDate, 
								        array('required', 
								              'class'=>'form-control datepicker', 
								              'placeholder'=>'')) !!}

			            		@endforeach
			            	</td>
			            	
			            </tr>
		            @endforeach
		        </tbody>
            </table>
	    </div>
	</div>	
	
	<hr>

	<div class="form-group"> 
		<div class="col-sm-offset-2 col-sm-10">
			{!! Form::submit('Ok', array('class'=>'btn btn-primary')) !!}
			<a href="{{ url('/administration/dashboard') }}"  class="btn btn-default">Anuluj</a>
		</div>
	</div>

	    

	{!! Form::close() !!}

</div>

<div class="clearfix"></div>

<div class="topmenu-offset"></div>

<script type="text/javascript" src="{{ asset('/js/modules/distributor/edit_user_dealer.js') }}"></script>

@endsection