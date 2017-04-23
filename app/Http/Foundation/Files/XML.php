<?php

namespace App\Http\Foundation\Files;

use SimpleXMLElement;

trait XML
{
	protected function getXmlFilePath($fileName, $userId = 0){

        $userDirectory = base_path() . '/storage/app/download/' . $userId;
        
        if (!file_exists($userDirectory)){
                mkdir($userDirectory);
        }

        $xmlFilePath = $userDirectory . '/' . $fileName;

		return $xmlFilePath;
	}

	protected function getXmlHeaders($fileName){

		 $headers = [
                    'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
                ,   'Content-type'        => 'text/xml;charset=UTF-8'
                ,   'Content-Disposition' => 'attachment; filename=' . $fileName
                ,   'Expires'             => '0'
                ,   'Pragma'              => 'public'
            ];

        return $headers;
	}

    protected function saveXmlFile($xmlFilePath, $collection, $headItems){

        $xml = new SimpleXMLElement('<users/>');
        array_walk_recursive($collection, array($xml, 'addChild'));

        $FH = fopen($xmlFilePath, 'w');
    
        fwrite($FH, $xml->asXML());
        fclose( $FH);
    }
}
