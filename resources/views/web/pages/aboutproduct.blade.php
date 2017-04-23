@extends('layouts.app')

@section('title')
{{ Lang::get('footerpages.title_product') }}
@stop

@section('description')
{{ Lang::get('footerpages.description_product') }}
@stop

@section('content')
<div class="subpage-image-container">
	<div class="subpage-image">
		<img src="{{ asset('/css/img/slide-02.jpg') }}" />
	</div>
</div>

<div id="main-content-wrapper" class="col-md-10 col-md-offset-1">

	<div class="footer-content content-company container col-md-12" >
		<div class="featurette-top">	
			<div class="header-wrapper">
				<h2><?= Lang::get('footerpages.FOOTER_PRODUCT_1') ?></h2>
			</div>
			<p>
				<?= Lang::get('footerpages.FOOTER_PRODUCT_2') ?>
			</p>
			<hr/>	
			
			<div class="header-wrapper">
				<h2><?= Lang::get('footerpages.FOOTER_PRODUCT_3') ?></h2>
			</div>
			<p>
				<?= Lang::get('footerpages.FOOTER_PRODUCT_4') ?>
			</p>
			<hr/>
			<div class="header-wrapper">
				<h2><?= Lang::get('footerpages.FOOTER_PRODUCT_5') ?></h2>
			</div>
			<p>
				<?= Lang::get('footerpages.FOOTER_PRODUCT_6') ?>
			</p>
			<hr/>	
						
			<div class="header-wrapper">
				<h2><?= Lang::get('footerpages.FOOTER_PRODUCT_7') ?></h2>
			</div>
			<p>
				<?= Lang::get('footerpages.FOOTER_PRODUCT_8') ?>
			</p>
			<hr/>
			
			<div class="header-wrapper">
				<h2><?= Lang::get('footerpages.FOOTER_PRODUCT_9') ?></h2>
			</div>
			<p>
				<?= Lang::get('footerpages.FOOTER_PRODUCT_10') ?>
			</p>
			<hr/>
			
			<div class="extra-info-wrapper">
				<h5><?= Lang::get('footerpages.FOOTER_PRODUCT_11') ?></h5>
			</div>
		</div>
	</div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection