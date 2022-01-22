<?php $__env->startSection('content'); ?>

<div class="topmenu-offset"></div>

<ul>
    <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getFirstLoop(); ?>
		<div class="bs-example col-md-10 col-md-offset-1">
		    <div class="alert alert-warning">
		        <a href="#" class="close" data-dismiss="alert">&times;</a>
		        <strong>Uwaga!</strong> <?php echo e($error); ?>

		    </div>
		</div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getFirstLoop(); ?>
</ul>

<div class="container-fluid">

	<h1>Panel administratora</h1>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Użytkownicy</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/userslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Lista użytkowników</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Dystrybutorzy</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/usersdistributorslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Lista dystrybutorów</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/usersdistributorsuserslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Reselerzy dystrybutorów</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/userstodistributorsrabatslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Dystrybutorzy i rabaty</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Partnerzy</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/userspartnerslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Lista partnerów</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/userstopromocodeslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Partnerzy i kody promocyjne</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Sprzedaż</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/planslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Plany</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/planscostlist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Ceny planu</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/plansoptionslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Opcje planu</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/planstoplansoptionslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Plany do opcji planu</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/promocodeslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Kody promocyjne</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/currencieslist')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Waluty</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
			<div class="panel-heading">
				<span>Kupony</span>
				<div class="btn-group pull-right">
				</div>
			</div>
			<div class="panel-body text-center">

				<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<a class="btn text-center" href="<?php echo e(url('admin/salescouponsgroups')); ?>">
				
						<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
						<h4>Grupy kuponów sprzedażowych</h4>
					</a>
				</div>

				<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<a class="btn text-center" href="<?php echo e(url('admin/salescouponsgenerated')); ?>">
				
						<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
						<h4>Generator kuponów sprzedażowych</h4>
					</a>
				</div>

				<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
					<a class="btn text-center" href="<?php echo e(url('admin/salescoupons')); ?>">
				
						<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
						<h4>Historia kuponów sprzedażowych</h4>
					</a>
				</div>

			</div>
		</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Api</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/aplicationapiadmin')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Tworzenie aplication api dla roli - admin api</h4>
				</a>
			</div>

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/aplicationapiuser')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Tworzenie aplication api dla roli - user api</h4>
				</a>
			</div>


			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/aplicationadminapitoaplicationapi')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Przypisanie admin api do user api</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Testy aplikacji</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/adminecronjob')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Działanie crona</h4>
				</a>
			</div>

		</div>
	</div>

	<div class="panel panel-primary">
		<div class="panel-heading">
			<span>Diagnoza</span>
			<div class="btn-group pull-right">
			</div>
		</div>
		<div class="panel-body text-center">

			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
				<a class="btn text-center" href="<?php echo e(url('admin/diagnose')); ?>">
			
					<img class="portal-settings-image" src="<?php echo e(url('css/img/options.png')); ?>">
					<h4>Diagnoza ustawień</h4>
				</a>
			</div>

		</div>
	</div>

</div>


<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>