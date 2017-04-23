<?php

namespace App\Http\Foundation\Files;


trait CSV
{
	protected function getCsvFilePath($fileName, $userId = 0){

		$userDirectory = base_path() . '/storage/app/download/' . $userId;
		
		if (!file_exists($userDirectory)){
                mkdir($userDirectory);
        }

		$csvFilePath = $userDirectory . '/' . $fileName;


		return $csvFilePath;
	}

	protected function getCsvHeaders($fileName){

		 $headers = [
                    'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
                ,   'Content-type'        => 'text/csv;charset=UTF-8'
                ,   'Content-Disposition' => 'attachment; filename=' . $fileName
                ,   'Expires'             => '0'
                ,   'Pragma'              => 'public'
            ];

        return $headers;
	}

    protected function saveCsvFile($csvFilePath, $collectionArray, $headItems){

        # add headers for each column in the CSV download
        array_unshift($collectionArray, $headItems);

        $FH = fopen($csvFilePath, 'w+');
        foreach ($collectionArray as $row) { 
            fputcsv($FH, $row);
        }
        fclose($FH);
    }
}
