<?php $__env->startSection('title'); ?>
<?php echo e($subdomainViewName); ?> | Darkan
<?php $__env->stopSection(); ?>

<?php $__env->startSection('description'); ?>
<?php echo e($subdomainViewName); ?> | Darkan
<?php $__env->stopSection(); ?>

<?php if(!$portalSettings->topmenuon): ?>
<style type="text/css">
	.topmenu, .topmenu-offset {
		display: none;
	}
</style>
<?php endif; ?>
<?php if(!$portalSettings->footeron): ?>
<style type="text/css">
	.footer, .footer-company {
		display: none;
	}
</style>
<?php endif; ?>

<?php $__env->startSection('content'); ?>
<link href="<?php echo e(asset('/css/examples.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/portal.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/subdomain.css')); ?>" rel="stylesheet">
<link href="<?=asset('/css/portal/'. $portalSettings->skinName .'/portalstyles.css') ?>" rel="stylesheet">

<div class="topmenu-offset"></div>

<div class="container marketing container-portal">



		<div class="well portal-header">

			<div class="row">

				<div class="col-md-8">

					<div class="portal-image">
						<img src="<?php echo e($userPhoto); ?>" alt="<?php echo e($subdomainViewName); ?>" />
					</div>
					<div class="portal-title">
						<h2><?php echo e($subdomainViewName); ?></h2>
						<span>
							<?=Lang::get('portal.number_of_publications')?> <?php echo e(count($userPublications)); ?>

						</span>
					</div>

				</div>

				<div class="col-md-4">

					<div class="btn-group pull-right">

						

						
						
						

					</div>

				</div>

			</div>

		</div>


	<?php echo $__env->make($accessSubView, array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

</div>



<div class="topmenu-offset"></div>
<script type="text/javascript" src="<?php echo e(asset('/js/libs/confirmation/bootstrap-confirmation.min.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/portal/portal.js')); ?>"></script>

<script type="text/javascript" src="<?php echo e(asset('/js/modules/fonts/change_fonts.js')); ?>"></script>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>