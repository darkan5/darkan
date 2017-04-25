@extends('layouts.app')

@section('title')
{{ Lang::get('profile.title') }}
@stop

@section('description')
{{ Lang::get('profile.description') }}
@stop

@section('content')
<link href="{{ asset('/css/profile.css') }}" rel="stylesheet">
<div class="topmenu-offset"></div>


<div class="col-md-8 col-md-offset-2">
    <div class="edit-profile-body">
        <div class="edit-profile-form">

            <fieldset>
                <legend><?=Lang::get('profile.MY_PLANS') ?></legend>
                <table class="plans-table table table-responsive table-hover dataTable no-footer">
	                <thead>
                        <th><?=Lang::get('profile.MY_PLANS_NAME') ?></th>
                        <th><?=Lang::get('profile.START_DATE') ?></th>
                        <th><?=Lang::get('profile.EXPIRATION_DATE') ?></th>
						<th><?=Lang::get('profile.IMPORTANCE') ?></th>
					</thead>
					<tbody>


                        @foreach ($plansUsers as $key => $planUser)

                            <?php 

                                Carbon::setLocale('pl');

                                $startTime = Carbon::parse($planUser->start_date);
                                $finishTime = Carbon::parse($planUser->expiration_date);

                                CarbonInterval::setLocale('pl');
                                $timeAmount = Carbon::createFromFormat('Y-m-d H:i:s', $startTime)->diff(Carbon::createFromFormat('Y-m-d H:i:s', $finishTime));
                                $timeAmountForHumans = CarbonInterval::create($timeAmount->y, $timeAmount->m, 0,  $timeAmount->d, $timeAmount->h, $timeAmount->i, $timeAmount->s);

                                $isBetween = false;
    
                                $now = time();
                                $first = DateTime::createFromFormat('Y-m-d H:i:s', $planUser->start_date)->getTimestamp();
                                $second = DateTime::createFromFormat('Y-m-d H:i:s', $planUser->expiration_date)->getTimestamp();

                                $rowClass = '';

                                if ($now >= $first && $now <= $second)
                                {
                                    $rowClass = 'success';
                                }

                                if($first > $now){
                                    $rowClass = 'warning';
                                }

                                if($second < $now){
                                    $rowClass = 'danger';
                                    $timeAmountForHumans = 0;
                                }

                                if(!$planUser->active){
                                    $rowClass = 'danger';
                                    $timeAmountForHumans = 0;
                                }


                            ?>

                            <tr class="{{ $rowClass }}">
                                <td>{{ $planUser->plan->name }}</td>
                                <td>{{ $planUser->start_date }}</td>
                                <td>{{ $planUser->expiration_date }}</td>
                                <td>{{ $timeAmountForHumans }}</td>
                            </tr>

                            

                        @endforeach

					</tbody>
				</table>
            </fieldset>

            <fieldset>
                <a class="btn btn-success" href="{{ url('pricelist') }}">Kup nowy plan</a>

                <hr>
            </fieldset>


            @if($userPricePlansOptions)

                <fieldset>

                    <table class="plans-table table table-responsive table-hover dataTable no-footer">
                        <thead>
                            <tr>
                                <th>Opcja planu</th>
                                <th>Wartość</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($userPricePlansOptions as $key => $priceOptionValue)

                            <tr>
                                <td>{{ $key }}</td>
                                <td>
                                     {{ json_encode($priceOptionValue) }}
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>

                </fieldset>

            @endif

            

            <fieldset>
                <legend><?=Lang::get('profile.EDIT_PROFILE_AVATAR'); ?></legend>
                <div class="edit-profile-avatar-preview">
                	<div class="edit-profile-avatar-preview" style="background-image:url('<?=Auth::user()->photo?>')" />
                </div>
                <div class="btn btn-primary edit-profile-button btn-darkan-color">
                	<form id="changeavatarform" enctype="multipart/form-data" role="form" method="POST" action="">
	                	<?=Lang::get('profile.BROWSE')?> <span class="edit-profile-avatar-loader"></span>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
	                    <input id="changeavatar" type="file" name="avatar" accept="image/*" />
	                </form>
                </div>
            </fieldset>

			<div class="topmenu-offset"></div>

            <fieldset>
                <legend><?=Lang::get('profile.EDIT_PROFILE_SUBDOMAIN'); ?></legend>
                <form id="changesubdomainform">
	                <div class="subdomain-change-helper">
		                http:// <input class="form-control profile-subdomain" type="text" value="<?= Auth::user()->subdomain ?>"/> .darkan.local
		            </div>
	                <button type="submit" class="btn btn-primary btn-darkan-color save-profile save-profile-subdomain"><?=Lang::get('profile.EDIT_PROFILE_SAVE'); ?></button>
                </form>
            </fieldset>

            <fieldset>
                <legend><?=Lang::get('profile.EDIT_PROFILE_SUBDOMAIN_NAME'); ?></legend>
                <div class="subdomain-name-change-helper">
	                <input class="form-control profile-subdomain-name" type="text" value="<?= Auth::user()->subdomain_name ?>"/>
	            </div>
                <div class="btn btn-primary btn-darkan-color save-profile save-profile-subdomain-name"><?=Lang::get('profile.EDIT_PROFILE_SAVE'); ?></div>
            </fieldset>
        
            <fieldset>
            	<legend><?=Lang::get('profile.EDIT_PROFILE_CHANGEPASS_LABEL'); ?></legend>
                <form id="changepasswordform">
	            	<label><?=Lang::get('profile.EDIT_PROFILE_CHANGEPASS_OLDPASS_INPUT'); ?></label>
	            	<input class="form-control change-pass-oldpass" type="password" />
	            	<div class="clear"></div>
	            	<label><?=Lang::get('profile.EDIT_PROFILE_CHANGEPASS_NEWPASS_INPUT'); ?></label>
	            	<input class="form-control change-pass-newpass" type="password" />
	            	<div class="clear"></div>
	            	<label><?=Lang::get('profile.EDIT_PROFILE_CHANGEPASS_RETYPEPASS_INPUT'); ?></label>
	            	<input class="form-control change-pass-retypepass" type="password" />
	            	<div class="clear"></div>
	            	<button type="submit" class="btn btn-primary btn-darkan-color change-pass-button"><?=Lang::get('profile.EDIT_PROFILE_CHANGEPASS_BUTTON'); ?></button>
	            </form>
            </fieldset>

        </div>
    </div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>

<script type="text/javascript" src="{{ asset('/js/modules/profile/profile.js') }}"></script>

@endsection