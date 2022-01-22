<?php $__env->startSection('title'); ?>
<?php echo e(Lang::get('portal.title')); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('description'); ?>
<?php echo e(Lang::get('portal.description')); ?>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
<link href="<?php echo e(asset('/css/examples.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/portal.css')); ?>" rel="stylesheet">
<link href="<?php echo e(asset('/css/portal/'. $portalSettings->skinName .'/portalstyles.css')); ?>" rel="stylesheet" id="portal_style">

<div class="topmenu-offset"></div>

<div class="container marketing container-portal">


	<div class="well portal-header">
		<div class="portal-image">
			<img src="<?php echo e($userPhoto); ?>" alt="<?php echo e($subdomainName); ?>" />
		</div>
		<div class="portal-title">
			<h2><?php echo e($subdomainName); ?></h2>
			<span>
				<?=Lang::get('portal.number_of_publications')?> <?php echo e(count($userPublications)); ?>

			</span>
		</div>
	</div>

	<div class="well potral-option text-center">
		<h4>
			<?=Lang::get('portal.PORTAL_WELCOME_LABEL') ?>
		</h4>

		<h5>
			<?=Lang::get('portal.your_page_link')?> 
			<a target="_blank" href="<?php echo e(config('app.protocol_not_secure')); ?><?php echo e(Auth::user()->subdomain); ?>.<?php echo e(config('app.domain')); ?><?php echo e(config('app.folder')); ?>">
				<?php echo e(config('app.protocol_not_secure')); ?><?php echo e(Auth::user()->subdomain); ?>.<?php echo e(config('app.domain')); ?><?php echo e(config('app.folder')); ?>

			</a>
		</h5>

		<hr/>

        <a class="btn-admin btn btn-darkan" target="_blank" href="<?php echo e(config('app.protocol_not_secure')); ?><?php echo e(Auth::user()->subdomain); ?>.<?php echo e(config('app.domain')); ?><?php echo e(config('app.folder')); ?>">
        	<i class="fa fa-desktop fa-fw"></i> <?=Lang::get('portal.PORTAL_HOW_OTHERS_SEE_ME')?>
        </a>
    	<a class="btn-admin btn btn-darkan" href="<?php echo e(url('/darkanpanel')); ?>" target="_blank" id="lms" class="lms">
    		<i class="fa fa-line-chart fa-fw"></i> <?=Lang::get('portal.ADMIN_PANEL')?>
    	</a>
    	<a class="btn-admin btn btn-darkan" id="portaloptions">
    		<i class="fa fa-cogs fa-fw"></i> <?=Lang::get('portal.settings')?>
    	</a>
	</div>
	

	<div class="well text-center">
		<h4>
			<?=Lang::get('portal.choose_your_skin') ?>
		</h4>
		<?php $__currentLoopData = $portalSkins; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $portalSkin): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
			<?php if($portalSkin->public): ?>
			<div class="portal-skin col-md-4" skin="<?php echo e($portalSkin->name); ?>" skinurl="<?php echo e(asset('/css/portal/' . $portalSkin->name . '/portalstyles.css')); ?>">
				<div class="thumbnail visible <?=$portalSkin->active ? 'active' : ''?>">
					<img src="<?php echo e(asset('/css/portal/' . $portalSkin->name . '/thumb.png')); ?>">
					<div class="caption">
						<?=Lang::get('portal.skin_name_' . $portalSkin->name )?>
					</div>
				</div>
			</div>
			<?php endif; ?>
		<?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
		<div class="clearfix"></div>
	</div>

	<div class="clearfix"></div>

	
	<div class="presentations-wrapper">
		
		

		<h3>
			<?=Lang::get('portal.YOUR_CONTENT') ?>
		</h3>
		<div>
			<i><?=Lang::get('portal.dragToChangePosition') ?></i>
		</div>

		<hr/>
		<div class="row my-content">
			<div class="sortable-content">

				<?php if($userPublications): ?>

					<?php $__currentLoopData = $userPublications; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $publication): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
						<div class="col-md-4 publication-block">
							<div class="thumbnail <?= $publication['active'] == 1 ? 'visible' : '' ?>">
								<a target="_blank" href="<?php echo e(url('/content/')); ?>/<?php echo e($publication['path']); ?>">
									<div class="image-container popupiframe"
									href="<?php echo e($publication['iframe']); ?>" 
	                                image-url="<?php echo e($publication['thumb']); ?>" 
	                                project-title="<?php echo e($publication['name']); ?>" 
	                                hash="<?php echo e($publication['path']); ?>" 
									>
										<img src="<?php echo e($publication['thumb']); ?>"  onerror="this.onerror=null;this.src='<?php echo e(asset('/css/img/social_logos/155x100.png')); ?>'" class="portal-content-image visible">
										<div class="play-sign showonhover animated fadeIn"></div>
									</div>
								</a>
								<div class="caption">
									<h3><?php echo e($publication['name']); ?></h3>
									<p class="thumbnail-caption-shorten"><?php echo e($publication['summary_shorten']); ?></p>
									<p class="thumbnail-caption"><?php echo e($publication['summary']); ?></p>
									<p class="buttons-container text-right">
										<?php if($publication['show_readmore']): ?>
											<button class="btn btn-primary btn-darkan-color btn-readmore">
												<?=Lang::get('portal.READMORE')?>
											</button>
										<?php endif; ?>
									</p>
									<hr/>
									<p class="options-container text-right">
										<button class="project-visible btn btn-info <?= $publication['active'] == 1 ? 'visible' : '' ?>" pid="<?php echo e($publication['id_banner']); ?>">
											<?=Lang::get('portal.SHOWHIDE')?>
										</button>
										<a target="_blank" href="<?php echo e(url('/editor/')); ?>/<?php echo e($publication['project_id']); ?>">
											<button class="btn btn-success  btn-edit">
												<?=Lang::get('portal.EDIT')?>
											</button>
										</a>
										<button class="btn btn-danger btn-remove project-delete" pid="<?php echo e($publication['id_banner']); ?>">
											<?=Lang::get('portal.DELETE')?>
										</button>
									</p>
								</div>
							</div>
						</div>
					<?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>

				<?php else: ?>

					<a href="<?php echo e(url('/projects')); ?>">
						<h3>
							<center>
								<?=Lang::get('portal.NO_PROJECTS') ?>
							</center>
						</h3>
					</a>
				<?php endif; ?>

			</div>
		</div><!-- /.row -->
		
		
	</div>
	
</div>

<div class="topmenu-offset"></div>


<?php echo $__env->make('web.pages.portal.portaloptions', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

<script type="text/javascript" src="<?php echo e(asset('/js/libs/confirmation/bootstrap-confirmation.min.js')); ?>"></script>
<script type="text/javascript" src="<?php echo e(asset('/js/modules/portal/portal.js')); ?>"></script>







<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>