<div class="presentations-wrapper">
	

<?php if(Auth::check() && !$portalSettings->topmenuon): ?>
	<hr/>
	<div class="well loggedinas">
		<?php echo e(Lang::get('portal.loggedInAs')); ?>: <?php echo e(Auth::user()->name); ?>


		<form class="btn btn-danger btn-logout" style="margin-left:40px" role="form" method="POST" action="<?php echo e(url('/subdomain/logout')); ?>">
			<button type="submit" class="btn-transparent">
				<?php echo e(Lang::get('frontpage.logout')); ?>

			</button>
			<?php echo e(csrf_field()); ?>

		</form>
	</div>
	<hr/>
<?php endif; ?>

	<div class="container row">

		<div class="panel-group" id="accordion">
		    
		        
		            
		            
		            	
		            	
		            

		        
		        
		            
		                
	                        
	                            
	                                
	                                
	                                
	                                
	                                
	                                
	                            
	                        
	                        

	                        	
		                        
		                        	
		                        	
		                        	
		                        	
		                        	
		                        	
		                        
		                        
	                        
	                    
		            
		        
		    
		    
		</div>	

	</div>

	<div class="row my-content">



			<?php if($userPublications): ?>

				<?php $__currentLoopData = $userPublications; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $publication): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
					<?php if($publication['active']): ?>
					<div class="col-md-4 publication-block">
						<div class="thumbnail visible">
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
								<ul class="extra-info">
									<li><?=Lang::get('portal.views')?>: <?php echo e($publication['views']); ?></li>
									<li><?=Lang::get('portal.published')?>: <?php echo e($publication['date_create']); ?></li>
									<?php if($publication->userStatus): ?>
									<li>
										<span class="text-bold"><?=Lang::get('portal.userStatus')?></span>: <?php echo $publication->userStatus->icon; ?> <?php echo e($publication->userStatus->course_status); ?>

									</li>
									<!-- <li>
										<span class="text-bold"><?//Lang::get('portal.userPoints')?></span>: <?php echo e($publication->userStatus->user_score); ?>/<?php echo e($publication->userStatus->score_max); ?>

									</li> -->
									<?php endif; ?>

								</ul>
							</div>
						</div>
					</div>
					<?php endif; ?>
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

	</div><!-- /.row -->
	
	
</div>