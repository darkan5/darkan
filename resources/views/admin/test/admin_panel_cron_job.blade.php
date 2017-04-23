@extends('layouts.app')


@section('content')

<div class="topmenu-offset"></div>

<ul>
    @foreach($errors->all() as $error)
        <div class="bs-example col-md-12 col-md-offset-1">
            <div class="alert alert-warning">
                <a href="#" class="close" data-dismiss="alert">&times;</a>
                <strong>Uwaga!</strong> {{ $error }}
            </div>
        </div>
    @endforeach
</ul>

<div class="container-fluid">
    <div class="col-md-12">

        <div class="container-fluid">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading panel-big">
                        <span>Działanie crona - logi</span>
                        <span></span>
                        <div class="btn-group pull-right">
                        </div>
                    </div>
                    <div class="panel-body">

                         <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Plik</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($files as $key => $file)

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>
                                <a download href="{{ url($file['url']) }}">{{ $file['name'] }}</a>
                            </td>                            
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>


@endsection