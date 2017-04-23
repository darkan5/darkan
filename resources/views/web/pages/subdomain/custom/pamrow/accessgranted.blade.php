<div class="presentations-wrapper">
	

@if (Auth::check() && !$portalSettings->topmenuon)
	<hr/>
	<div class="well loggedinas">
		<span>{{ Lang::get('portal.loggedInAs') }}: {{ Auth::user()->login }} </span>

		<form class="btn btn-englishfor" style="margin-left:40px" role="form" method="POST" action="{{ url('/subdomain/logout') }}">
			<button type="submit" class="btn-transparent">
				{{ Lang::get('portal.logout') }}
			</button>
			<input type="hidden" name="callbackurl" value="{{ url() }}">
		</form>
	</div>
	<hr/>
@endif

	<div class="row my-content">
			@if ($userPublications)
				<?php $alreadyDrawnCategories = array() ?>

				@foreach($userPublications as $publication)
					@if($publication['active'])

					@if ($publication->category)
						<?php if (array_search($publication->category->id, $alreadyDrawnCategories) === false): ?>
							<h2 class="header-category">{{ $publication->category->name }}</h2>
							
							<?php array_push($alreadyDrawnCategories, $publication->category->id) ?>
						<?php endif; ?>
					@endif

					<div class="col-md-4 publication-block">
						<div class="thumbnail visible">
							<a target="_blank" href="{{ url('/content/') }}/{{ $publication['path'] }}">
								<div class="image-container popupiframe"
								href="{{ $publication['iframe'] }}" 
                                image-url="{{ $publication['thumb'] }}" 
                                project-title="{{ $publication['name'] }}" 
                                hash="{{ $publication['path'] }}" 
								>
									<img src="{{ $publication['thumb'] }}"  onerror="this.onerror=null;this.src='{{asset('/css/img/social_logos/155x100.png')}}'" class="portal-content-image visible">
									<div class="play-sign showonhover animated fadeIn"></div>
								</div>
							</a>
							<div class="caption">
								<h3>{{ $publication['name'] }}</h3>
								<p class="thumbnail-caption-shorten">{{ $publication['summary_shorten'] }}</p>
								<p class="thumbnail-caption">{{ $publication['summary'] }}</p>
								<p class="buttons-container text-right">
									@if($publication['show_readmore'])
										<button class="btn btn-primary btn-darkan-color btn-readmore">
											<?=Lang::get('portal.READMORE')?>
										</button>
									@endif
								</p>


								<hr/>
								<div class="extra-info clearfix">
									<ul class="col-md-6 standard-info-block">
										<li><?=Lang::get('portal.published')?>: {{ date('Y-m-d', strtotime($publication['date_create'])) }}</li>
									</ul>
									<ul class="col-md-6 status-block">
										@if($publication->userStatus)
										<li class="status-string">
											<span class="text-bold"><?=Lang::get('portal.userStatus')?></span>
										</li>
										<li>
											{{ $publication->userStatus->course_status }} {!! $publication->userStatus->icon !!} 
										</li>
										<!-- <li>
											<span class="text-bold"><?//Lang::get('portal.userPoints')?></span>: {{ $publication->userStatus->user_score }}/{{ $publication->userStatus->score_max }}
										</li> -->
										@endif
									</ul>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
					</div>
					@endif
				@endforeach

			@else

				<a href="{{ url('/projects') }}">
					<h3>
						<center>
							<?=Lang::get('portal.NO_PROJECTS') ?>
						</center>
					</h3>
				</a>
			@endif

	</div><!-- /.row -->
	
	
</div>