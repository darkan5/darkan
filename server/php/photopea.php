<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 25.12.2017
 * Time: 13:38
 */
$img = $_POST['p'];
echo(POST['p']);
die();
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file =  'darkan.png';
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';


?>