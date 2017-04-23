<html>
<head>
	<title>{{ $publicationData->name }} | Darkan</title>
	<link href="{{ asset('/css/content.css') }}" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('/css/img/favicon/favicon.png') }}">


    <meta property="og:url" content="{{ config('app.content_link') . $publicationData->path }}" />
    <meta property="og:title" content="{{ $publicationData->name }} | Darkan" />
    <meta property="og:description" content="{{ $publicationData->summary }}"/>
    <meta property="fb:app_id" content="{{ env('FB_CLIENT_ID') }}"/>

    <meta property="og:image" content="{{ config('app.storagPublicationsLink') . $publicationData->path }}/thumb/thumb.png" />

    <meta property="og:image:width" content="{{ $imageDimentions[0] }}" /> 
    <meta property="og:image:height" content="{{ $imageDimentions[1] }}" />

</head>
<body>


	<div class="container marketing container-portal">

		{!! $content !!}
		
	</div>

<div class="clearfix"></div>

</body>
</html>
