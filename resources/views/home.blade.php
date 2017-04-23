@extends('layouts.app')

@section('content')

<div class="topmenu-offset"></div>


<br/>
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Darkan company</div>

                <div class="panel-body">

                    <div class="wall">

                        <h1>Witaj {{ Auth::user()->name }}!</h1>

                        <div>Jesteś zalogowany w systemie Darkan</div>

                        <hr>
                        <div><strong>Pozdrawiamy</strong></div>

                    </div> 
                    
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
