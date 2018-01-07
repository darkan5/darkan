@extends('layouts.app')

@section('title')
{{ Lang::get('examples.title') }}
@stop

@section('description')
{{ Lang::get('examples.description') }}
@stop

@section('content')
<link href="{{ asset('/css/examples.css') }}" rel="stylesheet">
<div class="topmenu-offset"></div>


<div id="main-content-wrapper col-md-10 col-md-offset-1">


	<div class="container marketing text-center">
		<h1><?= Lang::get('examples.examplesHeader') ?></h1>
	</div>

	<hr/>


	<section class="col-md-4 publication-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a target="_blank" href="<?=Lang::get('examples.example1link')?>">
					<img src="<?=Lang::get('examples.example1thumb')?>" class="portal-content-image visible">
					<div class="play-sign showonhover animated fadeIn"></div>
				</a>
			</div>
			<div class="caption">
				<h3><?=Lang::get('examples.example1')?></h3>
				<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example1desc')?></p>
				<p class="options-container text-right">
					<a target="_blank" href="<?=Lang::get('examples.example1link')?>" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
				</p>
			</div>
		</div>
	</section>
	<section class="col-md-4 publication-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a target="_blank" href="<?=Lang::get('examples.example2link')?>">
					<img src="<?=Lang::get('examples.example2thumb')?>" class="portal-content-image visible">
					<div class="play-sign showonhover animated fadeIn"></div>
				</a>
			</div>
			<div class="caption">
				<h3><?=Lang::get('examples.example2')?></h3>
				<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example2desc')?></p>
				<p class="options-container text-right">
					<a target="_blank" href="<?=Lang::get('examples.example1link')?>" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
				</p>
			</div>
		</div>
	</section>
	<section class="col-md-4 publication-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a target="_blank" href="<?=Lang::get('examples.example3link')?>">
					<img src="<?=Lang::get('examples.example3thumb')?>" class="portal-content-image visible">
					<div class="play-sign showonhover animated fadeIn"></div>
				</a>
			</div>
			<div class="caption">
				<h3><?=Lang::get('examples.example3')?></h3>
				<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example3desc')?></p>
				<p class="options-container text-right">
					<a target="_blank" href="<?=Lang::get('examples.example1link')?>" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
				</p>
			</div>
		</div>
	</section>
	<section class="col-md-4 publication-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a target="_blank" href="<?=Lang::get('examples.example4link')?>">
					<img src="<?=Lang::get('examples.example1thumb')?>" class="portal-content-image visible">
					<div class="play-sign showonhover animated fadeIn"></div>
				</a>
			</div>
			<div class="caption">
				<h3><?=Lang::get('examples.example4')?></h3>
				<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example4desc')?></p>
				<p class="options-container text-right">
					<a target="_blank" href="<?=Lang::get('examples.example4link')?>" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
				</p>
			</div>
		</div>
	</section>
	<section class="col-md-4 publication-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a target="_blank" href="<?=Lang::get('examples.example5link')?>">
					<img src="<?=Lang::get('examples.example5thumb')?>" class="portal-content-image visible">
					<div class="play-sign showonhover animated fadeIn"></div>
				</a>
			</div>
			<div class="caption">
				<h3><?=Lang::get('examples.example5')?></h3>
				<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example5desc')?></p>
				<p class="options-container text-right">
					<a target="_blank" href="<?=Lang::get('examples.example5link')?>" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
				</p>
			</div>
		</div>
	</section>
	<section class="col-md-4 publication-block">
		<div class="thumbnail visible">
			<div class="image-container">
				<a target="_blank" href="<?=Lang::get('examples.example6link')?>">
					<img src="<?=Lang::get('examples.example6thumb')?>" class="portal-content-image visible">
					<div class="play-sign showonhover animated fadeIn"></div>
				</a>
			</div>
			<div class="caption">
				<h3><?=Lang::get('examples.example6')?></h3>
				<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example6desc')?></p>
				<p class="options-container text-right">
					<a target="_blank" href="<?=Lang::get('examples.example6link')?>" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
				</p>
			</div>
		</div>
	</section>


	<div class="clearfix"></div>

</div>

@endsection