<?php
	header('Content-type: application/json');
	 
	require_once('vimeo.php');
	 
	$key = "1a76d6071e70328662ae9edfc96e4b39b8cd8dbd";
	$secret = "c16bfa48e5bc2cb995d689694a9b7235375f2b89";

	$post = json_decode($_POST['request'], true);
	 
	$query = $post['searchVal'];
	$limit = 12; // number of videos to display for each search

	$vimeo = new phpVimeo($key, $secret);
	$response = $vimeo->call('vimeo.videos.search', array('per_page' => $limit, 'query' => $query, 'sort' => 'relevant'));
	 
	$jarray = array();

	foreach($response->videos->video as $v) {
		$videoinfo = $vimeo->call('vimeo.videos.getInfo', array('video_id' => $v->id));

		$jarray[] = array(
			"thumbnail" => $videoinfo->video[0]->thumbnails->thumbnail[1]->_content,
			"url" => $videoinfo->video[0]->urls->url[0]->_content,
			"title" => $videoinfo->video[0]->title,
			"username" => $videoinfo->video[0]->owner->display_name,
			"userurl" => $videoinfo->video[0]->owner->profileurl,
			"userpic" => $videoinfo->video[0]->owner->portraits->portrait[0]->_content
		);
	}
	 
	print_r(str_replace('\\/', '/', json_encode($jarray)));
	die();

?>