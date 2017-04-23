@extends('layouts.app')

@section('title')
{{ Lang::get('terms.title') }}
@stop

@section('description')
{{ Lang::get('terms.description') }}
@stop

@section('content')

<div class="topmenu-offset"></div>


<div id="main-content-wrapper">

	<div class="footer-content content-company container">
		<div class="featurette-top">
			<div class="header-wrapper">
				<h2><?=Lang::get('terms.TERMS_HEAD') ?></h2>
				<hr/>
			</div>
			<!-- 1 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_1_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_1_TITLE') ?>
				<ol class="align-left">
					<li><?=Lang::get('terms.TERMS_1_1') ?></li>
					<li><?=Lang::get('terms.TERMS_1_2') ?></li>
					<li><?=Lang::get('terms.TERMS_1_3') ?></li>
				</ol>
			</p>
			
			<!-- 2 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_2_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_2_TITLE') ?>
				<ol class="align-left">
					<li><?=Lang::get('terms.TERMS_2_1') ?></li>
					<li><?=Lang::get('terms.TERMS_2_2') ?></li>
					<li><?=Lang::get('terms.TERMS_2_3') ?></li>
				</ol>
			</p>
			
			<!-- 3 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_3_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_3_TITLE') ?>
			</p>
			<p class="align-left small-title">
				<?=Lang::get('terms.TERMS_3_1') ?>
			</p>
			<ol class="align-left">
				<li><?=Lang::get('terms.TERMS_3_2') ?></li>
				<li><?=Lang::get('terms.TERMS_3_3') ?></li>
				<li><?=Lang::get('terms.TERMS_3_4') ?></li>
				<li><?=Lang::get('terms.TERMS_3_5') ?></li>
				<li><?=Lang::get('terms.TERMS_3_6') ?></li>
			</ol>
			
			
			<!-- 4 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_4_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_4_TITLE') ?>
			</p>
			<p class="align-left small-title">
				<?=Lang::get('terms.TERMS_4_1') ?>
			</p>
			<ol class="align-left">
				<li><?=Lang::get('terms.TERMS_4_2') ?></li>
				<li><?=Lang::get('terms.TERMS_4_3') ?></li>
				<li><?=Lang::get('terms.TERMS_4_4') ?></li>
			</ol>
			
			<!-- 5 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_5_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_5_TITLE') ?>
			</p>
			
			<!-- 6 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_6_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_6_TITLE') ?>
			</p>
			
			<!-- 7 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_7_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_7_TITLE') ?>
			</p>
			<ol class="align-left">
				<li><?=Lang::get('terms.TERMS_7_1') ?></li>
				<li><?=Lang::get('terms.TERMS_7_2') ?></li>
			</ol>
			
			<!-- 8 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_8_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_8_TITLE') ?>
			</p>
			
			<!-- 9 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_9_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_9_TITLE') ?>
			</p>
			
			<!-- 10 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_10_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_10_TITLE') ?>
			</p>
			<ol class="align-left">
				<li><?=Lang::get('terms.TERMS_10_1') ?></li>
				<li><?=Lang::get('terms.TERMS_10_2') ?></li>
			</ol>
			
			<!-- 11 -->
			<p class="align-center">
				<?=Lang::get('terms.TERMS_11_SIGN') ?>
			</p>
			<p class="align-center">
				<?=Lang::get('terms.TERMS_11_TITLE') ?>
			</p>
			<ol class="align-left">
				<li><?=Lang::get('terms.TERMS_11_1') ?></li>
				<li><?=Lang::get('terms.TERMS_11_2') ?></li>
				<li><?=Lang::get('terms.TERMS_11_3') ?></li>
				<li><?=Lang::get('terms.TERMS_11_4') ?></li>
			</ol>
			
		</div>
	</div>
</div>

<div class="topmenu-offset"></div>
@endsection