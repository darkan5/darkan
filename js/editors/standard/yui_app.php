<?php
include('../app/Modules/Utils/Minifier.php');

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
ob_start();
$CFG = array('v' => '001');
include 'utilities/scripts.php';
$result = ob_get_clean();

$doc = new DOMDocument();
$doc->loadHtml($result);

$scripts = [];

foreach($doc->getElementsByTagName('script') as $script) {
    if($script->hasAttribute('src') && $script->hasAttribute('yui')) {
         array_push($scripts, 'http://jerzy.pl/darkan3/js/editors/standard/' . $script->getAttribute('src') . PHP_EOL);
    }
}

print_r($scripts);

// $allScriptsFile = fopen("content_template/js/yui.js", "w");

$allScriptsContents = '';

foreach($scripts as $singleScript) {
	$scriptContents = file_get_contents(trim($singleScript));
	$allScriptsContents .= ";\n" . $scriptContents . ';' . PHP_EOL;
}

$minifiedCode = \JShrink\Minifier::minify($allScriptsContents, array('flaggedComments' => false));


file_put_contents("libs/yui.js", $minifiedCode);
// fclose($allScriptsFile);
