@extends('layouts.lms')

@section('contentlms')

<h1 class="page-header"><i class="fa fa-users fa-fw"></i> Wynik przesłania maili </h1>

<div class="panel panel-primary">
    <div class="panel-heading">
        Twój mail został wysłany do następujących użytkowników
        <div class="pull-right">
            <a class="btn btn-danger" href="{{ url('lms/elearning/mailing/') . '/' . $bannerId }}">Powrót</a>
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
                        <th><?=Lang::get("darkanpanel.table_column_name")?></th>
                    </tr>
                </thead>
                <tbody>

                    @foreach ($users as $key => $user)

                        <tr>
                            <td>{!! $key + 1 !!}</td>

                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
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