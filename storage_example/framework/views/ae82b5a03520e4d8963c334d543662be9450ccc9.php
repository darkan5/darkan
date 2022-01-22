<script id="window-template" type="text/template"></script>
<script id="window-portal-options-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">		
		<legend>
			<?=Lang::get('portal.settings') ?>
			<a class="btn btn-darkan preview-button" target="_blank" href="<?php echo e(config('app.protocol_not_secure')); ?><?php echo e(Auth::user()->subdomain); ?>.<?php echo e(config('app.domain')); ?><?php echo e(config('app.folder')); ?>">
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
	                <i><?=Lang::get("portal.settings_state_description")?><a href="<?php echo e(url('/lms/elearning/users')); ?>"><?=Lang::get("portal.settings_state_description_2") ?></a></i>
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
	                <?php $__currentLoopData = $currenciesArray; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $currency): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
	                	<option value="<?php echo e($currency); ?>"><?php echo e($currency); ?></option>
	                <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>

	                </select>
	            </div>
	        </div>

		</div>

	</div>
</script>


<!-- WINDOWS CSS -->
<link href="<?php echo e(asset('/css/windows/windows.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/windows/portaloptions.css')); ?>" rel="stylesheet">

<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/window/models/window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/window/views/window_view.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/portal_settings/models/portal_settings_window_model.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/windows/portal_settings/views/portal_settings_window_view.js')); ?>"></script>

<script src="<?php echo e(asset('/js/modules/windows/factory/window_factory.js')); ?>"></script>