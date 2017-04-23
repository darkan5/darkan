<?php

	require_once 'Google/Client.php';
	require_once 'Google/Service/YouTube.php';

	$DEVELOPER_KEY = 'AIzaSyBoOiKiLf96_6ZQUolHttHNp9Rr71i6XPE';

	$client = new Google_Client();
	$client->setDeveloperKey($DEVELOPER_KEY);

	$youtube = new Google_Service_YouTube($client);

	$post = json_decode($_POST['request'], true);

    $searchResponse = $youtube->search->listSearch('id,snippet', array(
      'q' => $post['searchVal'],
      'maxResults' => 10,
    ));

    $res = array();

	foreach ($searchResponse['items'] as $searchResult) {
		switch ($searchResult['id']['kind']) {
			case 'youtube#video':
				$res[] = array(
					'url' => $searchResult['id']['videoId'],
					'thumbnail' => $searchResult['snippet']['thumbnails']['medium']['url'],
					'title' => $searchResult['snippet']['title']
				);
			break;
		}
	}


	print_r(str_replace('\\/', '/', json_encode($res)));
	die();

?>