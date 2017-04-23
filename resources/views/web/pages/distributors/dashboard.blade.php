@extends('layouts.app')

@section('content')
<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">


<div class="topmenu-offset"></div>
<div class="button-wrapper">
    
    <a href="{{ url('/administration/dashboard') }}" class="btn btn-success">{{ Lang::get('distributors.userList') }}</a>
    <a href="{{ url('/administration/payments') }}" class="btn btn-success">{{ Lang::get('distributors.payments') }}</a>

</div>

<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading panel-big">
					<span><?=Lang::get('distributors.usersList')?></span>
					<div class="btn-group pull-right">

                        <select class="btn btn-xs btn-success pull-right search-owners">

                            <option value=""><?=Lang::get('distributors.searchDefault')?></option>

                            @foreach ($owners as $owner)

                                <option value="{{ $owner->login }}">{{ $owner->login }}</option>

                            @endforeach

                        </select>

						<a href="{{ url('/administration/addnewuserform') }}" class="btn btn-xs btn-success add-new-user"><?=Lang::get('distributors.addUser')?></a>
					</div>
				</div>
				<div class="panel-body">
                    <table class="table table-striped table-bordered table-hover datatable">
                        <thead>
                            <tr>
                                <th></th>
                                <th><?=Lang::get('distributors.userThumb')?></th>
                                <th><?=Lang::get('distributors.userEmail')?></th>
                                <th><?=Lang::get('distributors.owner')?></th>
                                <th><?=Lang::get('distributors.createdAt')?></th>
                                <th><?=Lang::get('distributors.updatedAt')?></th>
                                <th><?=Lang::get('distributors.loginCounts')?></th>
                                <th><?=Lang::get('distributors.options')?></th>
                            </tr>
                        </thead>
                        <tbody>
                        	@foreach ($distributorUsers as $key => $user)
	                        <tr>
	                        	<td>{!! $key + 1 !!}</td>
	                        	<td>
	                        		<img 
	                        			class="distributors-user-thumb" 
	                        			src="{{ $user->photo }}"/>
	                        	</td>
	                        	<td><a href="<?=url('/administration/userdetails/' . $user->user_id)?>">{{ $user->login }}</a></td>
                                <td>
                                    @if($user->ownerData) 
                                        <a href="<?=url('/administration/userdetails/' . $user->ownerData->user_id)?>">{{ $user->ownerData->login }}</a></td>
                                    @endif
                                </td>
	                        	<td>{{ $user->created_at }}</td>
	                        	<td>{{ $user->updated_at }}</td>
	                        	<td>{{ $user->loginCounts }}</td>
	                        	<td>
	                        		<a href="{{ url('/administration/editdealerform/' . $user->user_id) }}" class="btn btn-warning"><?=Lang::get('distributors.edit')?></a>	
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


<div class="clearfix"></div>

<div class="topmenu-offset"></div>
<script src="{{ asset('/bower_components/datatables/media/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js') }}"></script>

<script type="text/javascript">
$('.datatable').DataTable({
    responsive: true,
    "language": {
        "lengthMenu": "<?=Lang::get('darkanpanel.lengthMenu')?>",
        "zeroRecords": "<?=Lang::get('darkanpanel.zeroRecords')?>",
        "info": "<?=Lang::get('darkanpanel.info')?>",
        "infoEmpty": "<?=Lang::get('darkanpanel.infoEmpty')?>",
        "infoFiltered": "<?=Lang::get('darkanpanel.infoFiltered')?>",
        "search":         "<?=Lang::get('darkanpanel.search')?>",
        "paginate": {
            "first":      "<?=Lang::get('darkanpanel.first')?>",
            "last":       "<?=Lang::get('darkanpanel.last')?>",
            "next":       "<?=Lang::get('darkanpanel.next')?>",
            "previous":   "<?=Lang::get('darkanpanel.previous')?>"
        },
    }
});

$('.search-owners').change(function(e){

    var value = $(e.target).val();

    var searchInput = $('input[type="search"]');

    searchInput.val(value);
    searchInput.trigger('keyup');

});
</script>
@endsection