<?php
include('../app/Modules/Utils/Minifier.php');

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
ob_start();
$CFG = array('v' => '001');
include 'utilities/styles.php';
$result = ob_get_clean();

$doc = new DOMDocument();
$doc->loadHtml($result);

$styles = [];

foreach($doc->getElementsByTagName('link') as $link) {
    if($link->hasAttribute('href')) {
         array_push($styles, 'http://jerzy.pl/darkan3/js/editors/standard/' . $link->getAttribute('href') . PHP_EOL);
    }
}

print_r($styles);

// $allScriptsFile = fopen("content_template/js/yui.js", "w");

$allStylesContents = '';

foreach($styles as $singleStyle) {
	$contents = file_get_contents(trim($singleStyle));
	$allStylesContents .= $contents;
}

// $minifiedCode = \JShrink\Minifier::minify($allStylesContents, array('flaggedComments' => false));


file_put_contents("libs/yui.css", $allStylesContents);
// fclose($allScriptsFile);
