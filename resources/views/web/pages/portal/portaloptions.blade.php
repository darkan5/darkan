<script id="window-template" type="text/template"></script>
<script id="window-portal-options-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">		
		<legend>
			<?=Lang::get('portal.settings') ?>
			<a class="btn btn-darkan preview-button" target="_blank" href="{{ config('app.protocol_not_secure') }}{{Auth::user()->subdomain}}.{{ config('app.domain') }}{{ config('app.folder') }}">
				<?=Lang::get('utils.preview')?>
			</a>
		</legend>

		<div class="window-body">

			
	        <div class="form-group">
				<label class="form-group">
					<input type="checkbox" id="topmenuon" >
					<?=Lang::get('darkanpanel.settings_topmenuon')?>
				</label>
	            <div>
	                <i><?=Lang::get("darkanpanel.settings_footeron_description")?></i>
	            </div>
	        </div>

	        <div class="form-group">
				<label class="form-group">
					<input type="checkbox" id="footeron" >
					<?=Lang::get('darkanpanel.settings_footeron')?>
				</label>
	            <div>
	                <i><?=Lang::get("darkanpanel.settings_footeron_description")?></i>
	            </div>
	        </div>

	        <div class="form-group">
	            <label>
	                <input type="checkbox" id="login" class="force-login" >
	                <?=Lang::get("darkanpanel.settings_login")?>
	            </label>
	            <div>
	                <i><?=Lang::get("darkanpanel.settings_login_description")?></i>
	            </div>
	        </div>
	        <div class="form-group">
	            <label>
	                <input type="checkbox" id="state" class="only-my-users">
	                <?=Lang::get("darkanpanel.settings_state")?>
	            </label>
	            <div>
	                <i><?=Lang::get("portal.settings_state_description")?><a href="{{ url('/lms/elearning/users') }}"><?=Lang::get("portal.settings_state_description_2") ?></a></i>
	            </div>
	        </div>
	        <div class="form-group">
	            <label>
	                <input type="checkbox" id="paid" class="paid-portal">
	                <?=Lang::get("darkanpanel.settings_paid")?>
	            </label>
	            <div>
	                <i><?=Lang::get("darkanpanel.settings_paid_description")?></i>
	            </div>
	            <div>
	                <input type="number" id="price"/>
	                <select type="select" id="currency">
	                @foreach($currenciesArray as $currency)
	                	<option value="{{ $currency }}">{{ $currency }}</option>
	                @endforeach

	                </select>
	            </div>
	        </div>

		</div>

	</div>
</script>


<!-- WINDOWS CSS -->
<link href="{{ asset('/css/windows/windows.css') }}" rel="stylesheet">
<link href="{{ asset('/css/windows/portaloptions.css') }}" rel="stylesheet">

<script type="text/javascript" src="{{ asset('/js/modules/windows/window/models/window_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/windows/window/views/window_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/windows/portal_settings/models/portal_settings_window_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/windows/portal_settings/views/portal_settings_window_view.js') }}"></script>

<script src="{{ asset('/js/modules/windows/factory/window_factory.js') }}"></script>