<?php

namespace App\Http\Foundation\Files;


trait JSON
{
	protected function getJsonFilePath($fileName, $userId = 0){

		$userDirectory = base_path() . '/storage/app/download/' . $userId;
		
		if (!file_exists($userDirectory)){
                mkdir($userDirectory);
        }

		$jsonFilePath = $userDirectory . '/' . $fileName;


		return $jsonFilePath;
	}

	protected function getJsonHeaders($fileName){

		 $headers = [
                    'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
                ,   'Content-type'        => 'text/json;charset=UTF-8'
                ,   'Content-Disposition' => 'attachment; filename=' . $fileName
                ,   'Expires'             => '0'
                ,   'Pragma'              => 'public'
            ];

        return $headers;
	}

    protected function saveJsonFile($jsonFilePath, $collection, $headItems){

        $fp = fopen($jsonFilePath, 'w');
        fwrite($fp, json_encode($collection));
        fclose($fp);
    }
}
