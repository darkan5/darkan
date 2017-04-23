<?php

	// NEW SESSION
	require_once '../../../config_login.php';


	$data = array();

	$data['login'] = true;

	if (!SESSION_METHOD::isLogged()) {
		$data['login'] = false;
	}

	echo json_encode($data);
?>