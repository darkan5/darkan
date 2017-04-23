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
                <span>Użytkownicy założeni przez dystrybutorów</span>
                <div class="btn-group pull-right">
                    
                </div>
            </div>
            <div class="panel-body">

                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Dystrybutot</th>
                            <th>Dystrybutot - ilość logowań</th>
                            <th>Dystrybutot - założony</th>
                            <th>Użytkownik</th>
                            <th>Użytkownik - ilość logowań</th>
                            <th>Użytkownik - założony</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($usersToDistributors as $key => $userToDistributor)

                        <tr>
                            <td>{!! $key + 1 !!}</td>
                            <td>
                                <a href="{{ url('admin/loginas') }}/{{$userToDistributor->reseler->id}}">
                                    {{ $userToDistributor->distributor->name }} ({{ $userToDistributor->distributor->email }})
                                </a>
                            </td>

                            <td>{{ count($userToDistributor->distributor->reselerLogin) }}</td>
                            <td>{{ $userToDistributor->distributor->created_at }}</td>

                            <td>
                                <a href="{{ url('admin/loginas') }}/{{$userToDistributor->reseler->id}}">
                                    {{ $userToDistributor->reseler->name }} ({{ $userToDistributor->reseler->email }})
                                </a>
                            </td>

                            <td>{{ count($userToDistributor->reseler->reselerLogin) }}</td>
                             <td>{{ $userToDistributor->reseler->created_at }}</td>
  
                            <td>

                                <button class="btn btn-primary edit-user" data-toggle="modal" data-target="#edit-user-window" 
                                            user_id="{{ $userToDistributor->reseler->id }}"
                                            name="{{ $userToDistributor->reseler->name }}">
                                            Edytuj
                                </button>

                                <button class="btn btn-danger delete-user" data-toggle="modal" data-target="#delete-user-window" 
                                                    user_id="{{ $userToDistributor->reseler->id }}">
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

<script type="text/javascript">
    $('table').DataTable({
            responsive: true,            
            "language": {
                "lengthMenu": '<?=Lang::get('tables.lengthMenu')?>',
                "zeroRecords": '<?=Lang::get('tables.zeroRecords')?>',
                "info": '<?=Lang::get('tables.info')?>',
                "infoEmpty": '<?=Lang::get('tables.infoEmpty')?>',
                "infoFiltered": '<?=Lang::get('tables.infoFiltered')?>',
                "search":         '<?=Lang::get('tables.search')?>',
                "paginate": {
                    "first":      '<?=Lang::get('tables.first')?>',
                    "last":       '<?=Lang::get('tables.last')?>',
                    "next":       '<?=Lang::get('tables.next')?>',
                    "previous":   '<?=Lang::get('tables.previous')?>'
                },
            }
    });
</script>

@endsection