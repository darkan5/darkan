@extends('layouts.app')

@section('title')
{{ Lang::get('frontpage.PAGE_TITLE') }}
@stop

@section('description')
{{ Lang::get('frontpage.PAGE_DESCRIPTION') }}
@stop

@section('content')
<link href="{{ asset('/css/home.css') }}" rel="stylesheet">
<script type="text/javascript">
	var videoId = '{{ Lang::get('frontpage.videoId') }}';
</script>

<div class="movie-container">
	<div class="movie">
	<?php
	$useragent=$_SERVER['HTTP_USER_AGENT'];
	$mobile = preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4));
	?>

		@if (!$mobile)
		<video autoplay loop cover="{{asset('/screencast/cover.png')}}">
			<source src="{{ asset('/screencast/darkan_screencast_1_pl.mp4') }}">
		</video>
		@endif
	</div>
	<div class="text-center frontpage-welcome">
		<h1 class="welcome-main"><?= Lang::get('frontpage.mainTitle') ?></h1>
		<h3 class="welcome-extra"><?= Lang::get('frontpage.mainTitleExtra') ?></h3>
		<div class="row test-drive-row">
			<!-- Large modal -->
			<a href="{{ url('/testdrive') }}" class="test-drive">
				<i class="fa fa-car"></i> <?= Lang::get('frontpage.testDrive') ?>
			</a>
			<a href="#" class="watchvideobtn btn-danger" data-toggle="modal" data-target=".darkan-movie-modal">
				<i class="fa fa-play"></i> <?= Lang::get('frontpage.watchVideo') ?>
			</a>
		</div>
		<div class="row test-drive-text">
			<i class="fa fa-arrow-up"></i> <?= Lang::get('frontpage.testDriveExtras') ?>
		</div>
	</div>
</div>

	<div class="text-center margin20-0">
		<ul class="trusted-us-logos">
			<li>
				<img src="{{ asset('/css/img/frontpage/trustedus/bosh.png') }}" alt="Bosh logo"/>
			</li>
			<li>
				<img src="{{ asset('/css/img/frontpage/trustedus/junkers.png') }}" alt="Junkers logo"/>
			</li>
			<li>
				<img src="{{ asset('/css/img/frontpage/trustedus/buderus.png') }}" alt="Bosh logo"/>
			</li>
			<li>
				<img src="{{ asset('/css/img/frontpage/trustedus/euroforum.png') }}" alt="Euroforum logo"/>
			</li>
		</ul>
	</div>

<div class="clearfix"></div>
<div class="row-fluid col-lg-12 page-container margintop60">

			<div class="clearfix"></div>

				<div class="row text-center">
					<h1><?=  Lang::get('frontpage.whatWeOffer') ?></h1>
				</div>
				<div class="row text-center col-lg-12">
					<h4><?=  Lang::get('frontpage.whatWeOfferExtras') ?></h4>
				</div>

			   <div class="clearfix"></div>

			   	<a href="{{ url('/ouroffer') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/cloud.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.cloud') ?></h4>
							<p><?=  Lang::get('frontpage.cloudText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offercloud') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/bar_graph.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.analitics') ?></h4>
							<p><?=  Lang::get('frontpage.analiticsText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offeranalytics') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/friends.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.groupWork') ?></h4>
							<p><?=  Lang::get('frontpage.groupWorkText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offergroupwork') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/download.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.psdWork') ?></h4>
							<p><?=  Lang::get('frontpage.psdWorkText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offerpsd') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/student.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.scormSupport') ?></h4>
							<p><?=  Lang::get('frontpage.scormSupportText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offerscorm') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/questions.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.questions') ?></h4>
							<p><?=  Lang::get('frontpage.questionsText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offerquestions') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/box.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.integrations') ?></h4>
							<p><?=  Lang::get('frontpage.integrationsText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offermailing') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/camera.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.mediaLibrary') ?></h4>
							<p><?=  Lang::get('frontpage.mediaLibraryText') ?></p>
						</div>
				   </div>
				</a>

			   	<a href="{{ url('/ouroffer#offerlibrary') }}">
					<div class="col-sm-6 col-md-4 frontpage-icon-block">
						<div class="thumbnail frontpage-thumbnail">
							<img src="{{ asset('css/img/frontpage/svg/globe.svg') }}" />
						</div>
						<div class="caption text-center">
							<h4><?=  Lang::get('frontpage.socialMedia') ?></h4>
							<p><?=  Lang::get('frontpage.socialMediaText') ?></p>
						</div>
				   </div>
				</a>

			   <div class="clearfix"></div>


   <div class="clearfix"></div>

</div>

<div class="checkout-row margintop60">
	<div class="col-md-offset-1">
		<div class="col-md-6">
			<h4><?= Lang::get('frontpage.checkOutWelcome') ?></h4>
		</div>
		<div class="col-md-4 col-sm-6">
				<form id="testdriveform" method="post" action="<?=url('/testdrive')?>">
					<div class="input-group">
						<input required type="email" class="test-drive-input form-control" placeholder="<?= Lang::get('frontpage.enterEmailAddress') ?>">
						<span class="input-group-btn">
				            <button type="submit" class="btn btn-success" type="button"><?= Lang::get('frontpage.testDrive') ?></button>
						</span>
					</div>
				</form>
		</div>
	</div>
</div>

<div class="clearfix"></div>

<div class="modal fade darkan-movie-modal" tabindex="-1" role="dialog" aria-labelledby="darkan-movie-modal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content youtube-player-modal">
    	<div id="yt-promo-video"></div>
      
    </div>
  </div>
</div>

<script src="{{ asset('js/modules/frontpage.js') }}"></script>
<script src="{{ asset('js/modules/topmenu.js') }}"></script>
@endsection
