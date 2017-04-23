<?php

$filePath = $argv[1];

function getNumPagesInPDF(array $arguments = array())
{
    @list($PDFPath) = $arguments;
    $stream = @fopen($PDFPath, "r");
    $PDFContent = @fread ($stream, filesize($PDFPath));
    if(!$stream || !$PDFContent)
        return false;
    $firstValue = 0;
    $secondValue = 0;
    if(preg_match("/\/N\s+([0-9]+)/", $PDFContent, $matches)) {
        $firstValue = $matches[1];
    }
    if(preg_match_all("/\/Count\s+([0-9]+)/s", $PDFContent, $matches))
    {
        $secondValue = max($matches[1]);
    }
    echo (($secondValue != 0) ? $secondValue : max($firstValue, $secondValue));

}
getNumPagesInPDF( [$filePath] );

?>