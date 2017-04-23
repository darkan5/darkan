<div class="well">
	<div>
        <h2 class="text-center"><?=Lang::get('portal.USERPORTAL_NEEDINVITATION')?></h2>
        @if (Auth::check())
        	<div class="text-center">
					@if ($invitation)
						<h3>
							<?=Lang::get('portal.invitationAlreadySent')?> ({{$invitation->updated_at}})
						</h3>
						<p>
							<a>
								<span id="send-access-request">
								<?=Lang::get('portal.USERPORTAL_RequestAccessSendAgain')?>
								</span>
							</a>
						</p>
					@else
						<span id="send-access-request">
						<?=Lang::get('portal.USERPORTAL_RequestAccess')?>
						</span>
					@endif
			</div>
		@else
			<h3 class="text-center"><?=Lang::get('portal.LOGIN')?></h3>
			<hr/>
			@include('auth.loginsubdomain')
		@endif
	</div>
</div>