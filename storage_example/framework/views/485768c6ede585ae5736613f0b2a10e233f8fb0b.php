<div class="well">
	<div>
       <h3 class="text-center"><?=Lang::get('portal.USERPORTAL_PLSLOGIN')?></h3>
       <hr/>
       
       <?php echo $__env->make('auth.loginsubdomain', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
	</div>
</div>