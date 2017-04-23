<?php

namespace App\Http\Foundation\Files;

use Response;

use App\Http\Foundation\Files\XLS;
use App\Http\Foundation\Files\CSV;
use App\Http\Foundation\Files\JSON;

trait FilesCreator
{

    use XLS;
    use CSV;
    use JSON;

	protected function createFile($fileType, $userId, $headItems, $collection, $collectionArray){


        if($fileType == 'xls'){

            $csvFileName = 'report.csv';

            $csvFilePath = $this->getCsvFilePath($csvFileName, $userId);

            $this->saveCsvFile($csvFilePath, $collectionArray, $headItems, $userId);

            
            $xlsFileName = 'report.xls';

            $xlsFilePath = $this->getXlsFilePath($xlsFileName, $userId);

            $headers = $this->getXlsHeaders($xlsFileName);

            $this->saveXlsFile($xlsFilePath, $csvFilePath, $collectionArray, $headItems);

            return Response::download($xlsFilePath, $xlsFileName, $headers);

        }

        if($fileType == 'csv'){

            $csvFileName = 'report.csv';

            $headers = $this->getXlsHeaders($csvFileName);

            $csvFilePath = $this->getCsvFilePath($csvFileName, $userId);

            $this->saveCsvFile($csvFilePath, $collectionArray, $headItems);

            return Response::download($csvFilePath, $csvFileName, $headers);
        }

        if($fileType == 'json'){

            $jsonFileName = 'report.json';

            $headers = $this->getJsonHeaders($jsonFileName);

            $jsonFilePath = $this->getJsonFilePath($jsonFileName, $userId);

            $this->savejsonFile($jsonFilePath, $collection, $headItems);

            return Response::download($jsonFilePath, $jsonFileName, $headers);
        }
    }
}
