<?php

    $link = $argv[1];

    $link = str_replace('https', 'http', $link);
    $fileDir =  $argv[2];

    $fp = fopen($fileDir, 'w+');
    $link = str_replace(' ', '%20', $link);
    $ch = curl_init($link);
    curl_setopt($ch, CURLOPT_TIMEOUT, 50);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_exec($ch);
    fclose($fp);

    echo $fileDir;

    
    // if (isset($_POST['link']) && isset($_POST['path']) && isset($_POST['pageid'])) {
    //     $link = str_replace('https', 'http', $_POST['link']);
    //     $path = $_POST['path'];
    //     $pageid = $_POST['pageid'];
    //     if (isset($_POST['fname']) && $_POST['fname'] != '') {
    //         $file = $_POST['fname'];
    //         $file = str_replace(' ', '_', $file);
    //     } else {
    // 		$tempExplode = explode('/', $link);
    //         $file = end($tempExplode);
    //         $file = str_replace('%20', '_', $file);
    //         $file = str_replace('%', '_', $file);
    //     }
        
    //     if (!file_exists($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/')) {
    //         mkdir($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/');
    //     }

    //     if (!file_exists($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path))
    //         mkdir($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path);
        
    //     $fp = fopen($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path.'/'.$file, 'w+');
    //     $link = str_replace(' ', '%20', $link);
    //     $ch = curl_init($link);
    //     curl_setopt($ch, CURLOPT_TIMEOUT, 50);
    //     curl_setopt($ch, CURLOPT_FILE, $fp);
    //     curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //     curl_exec($ch);
    //     fclose($fp);
    //     //$test = "http://dl.dropboxusercontent.com/1/view/pdks5jtqh0ngd41/Camera%20Uploads/2013-09-09%2015.04.49.jpg";
    //     //file_put_contents("test.jpg", file_get_contents($test));
        
    //     //copy($link, $prefix.$path_image.$path.'/'.$file);
    //     list($width, $height) = getimagesize($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path.'/'.$file);
    //     //echo $width.' - '.$height;
    //     $ret[0] = $width;
    //     $ret[1] = $height;
    //     $ret[2] = $file;
    //     //$ret[3] = $prefix.$path_project.$pageid.'/images/'.$path.'/'.$file;
    //     //$ret[4] = $prefix.$path_image.$path.'/'.$file;
        
    //     echo json_encode($ret);
    // }
?>
