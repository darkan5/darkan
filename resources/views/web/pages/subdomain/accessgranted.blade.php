<div class="presentations-wrapper">
	

@if (Auth::check() && !$portalSettings->topmenuon)
	<hr/>
	<div class="well loggedinas">
		{{ Lang::get('portal.loggedInAs') }}: {{ Auth::user()->name }}

		<form class="btn btn-danger btn-logout" style="margin-left:40px" role="form" method="POST" action="{{ url('/subdomain/logout') }}">
			<button type="submit" class="btn-transparent">
				{{ Lang::get('frontpage.logout') }}
			</button>
			{{ csrf_field() }}
		</form>
	</div>
	<hr/>
@endif

	<div class="container row">

		<div class="panel-group" id="accordion">
		    {{--<div class="well panel panel-default">--}}
		        {{--<div class= well"panel-heading">--}}
		            {{----}}
		            {{--<a class="btn btn-success btn-statiscics" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">--}}
		            	{{--{{ Lang::get('portal.statiscics') }}--}}
		            	{{--<span class="glyphicon glyphicon-chevron-right"></span>--}}
		            {{--</a>--}}

		        {{--</div>--}}
		        {{--<div id="collapseOne" class="panel-collapse collapse">--}}
		            {{--<div class="panel-body">--}}
		                {{--<table class="table">--}}
	                        {{--<thead>--}}
	                            {{--<tr>--}}
	                                {{--<th></th>--}}
	                                {{--<th>{{ Lang::get('portal.course_icon') }}</th>--}}
	                                {{--<th>{{ Lang::get('portal.course_name') }}</th>--}}
	                                {{--<th>{{ Lang::get('portal.course_status') }}</th>--}}
	                                {{--<th>{{ Lang::get('portal.course_score') }}</th>--}}
	                                {{--<th>{{ Lang::get('portal.course_last_visit') }}</th>--}}
	                            {{--</tr>--}}
	                        {{--</thead>--}}
	                        {{--<tbody>--}}

	                        	{{--@foreach ($userCoursesStatus as $key => $course)--}}
		                        {{--<tr>--}}
		                        	{{--<td>{!! $key + 1 !!}</td>--}}
		                        	{{--<td><img src="{{ $course['photo'] }}" style="width:20px"/></td>--}}
		                        	{{--<td>{{ $course['courseName'] }}</td>--}}
		                        	{{--<td>{{ $course['courseStatus'] }}</td>--}}
		                        	{{--<td>{{ $course['coursePoints'] }}</td>--}}
		                        	{{--<td>{{ $course['courseLastVisit'] }}</td>--}}
		                        {{--</tr>--}}
		                        {{--@endforeach--}}
	                        {{--</tbody>--}}
	                    {{--</table>--}}
		            {{--</div>--}}
		        {{--</div>--}}
		    {{--</div>--}}
		    
		</div>	

	</div>

	<div class="row my-content">



			@if ($userPublications)

				@foreach($userPublications as $publication)
					@if($publication['active'])
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
								<ul class="extra-info">
									<li><?=Lang::get('portal.views')?>: {{ $publication['views'] }}</li>
									<li><?=Lang::get('portal.published')?>: {{ $publication['date_create'] }}</li>
									@if($publication->userStatus)
									<li>
										<span class="text-bold"><?=Lang::get('portal.userStatus')?></span>: {!! $publication->userStatus->icon !!} {{ $publication->userStatus->course_status }}
									</li>
									<!-- <li>
										<span class="text-bold"><?//Lang::get('portal.userPoints')?></span>: {{ $publication->userStatus->user_score }}/{{ $publication->userStatus->score_max }}
									</li> -->
									@endif

								</ul>
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