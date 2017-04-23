<?php

namespace App\Http\Foundation\Files;

use PHPExcel; 
use PHPExcel_IOFactory;

use PHPExcel_Cell;

use PHPExcel_Style_Fill;
use PHPExcel_Style_Border;


trait XLS
{


	protected function getXlsFilePath($fileName, $userId = 0){

		$userDirectory = base_path() . '/storage/app/download/' . $userId;
		
		if (!file_exists($userDirectory)){
                mkdir($userDirectory);
        }

		$xlsFilePath = $userDirectory . '/' . $fileName;

		return $xlsFilePath;
	}

	protected function saveXlsFile($xlsFilePath, $csvFilePath, $collectionArray, $headItems){

		
        $objReader = PHPExcel_IOFactory::createReader('CSV');
        $objReader->setDelimiter(",");
        $objPHPExcel = $objReader->load($csvFilePath);
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save($xlsFilePath);

        $this->setStylesToWorksheets($objPHPExcel, $headItems, $collectionArray);

        $objWriter->save($xlsFilePath);
	}

	protected function getXlsHeaders($fileName){

		 $headers = [
                    'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
                ,   'Content-type'        => 'text/xls;charset=UTF-8'
                ,   'Content-Disposition' => 'attachment; filename=' . $fileName
                ,   'Expires'             => '0'
                ,   'Pragma'              => 'public'
            ];

        return $headers;
	}


    protected function setCellColor($objPHPExcel, $cells, $color){

        $objPHPExcel->getActiveSheet()->getStyle($cells)->getFill()->applyFromArray(array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'startcolor' => array(
                 'rgb' => $color
            )
        ));
    }

    protected function setCellBorder($objPHPExcel, $cells){

        $objPHPExcel->getActiveSheet()
            ->getStyle($cells)
            ->getBorders()
            ->getAllBorders()
            ->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
    }

    protected function setStylesToWorksheets($objPHPExcel, $headItems, $collectionArray){

		// Stylowanie celek
		// foreach(range('A','G') as $columnID) {
		//     $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)
		//         ->setAutoSize(true);
		// }
		//PHPExcel_Shared_Font::setAutoSizeMethod(PHPExcel_Shared_Font::AUTOSIZE_METHOD_EXACT);

		foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {

			$objPHPExcel->setActiveSheetIndex($objPHPExcel->getIndex($worksheet));

			$sheet = $objPHPExcel->getActiveSheet();
			$cellIterator = $sheet->getRowIterator()->current()->getCellIterator();
			$cellIterator->setIterateOnlyExistingCells(true);
			/** @var PHPExcel_Cell $cell */
			foreach ($cellIterator as $cell) {
			    $sheet->getColumnDimension($cell->getColumn())->setAutoSize(true);
			}
		}

		// foreach (range('A', $objPHPExcel->getActiveSheet()->getHighestDataColumn()) as $col) {
		//     $objPHPExcel->getActiveSheet()
		//             ->getColumnDimension($col)
		//             ->setAutoSize(true);
		// } 

		$columnLetter = PHPExcel_Cell::stringFromColumnIndex(count($headItems) - 1); 

		foreach(range('A',$columnLetter) as $columnID) {
		 	$this->setCellColor($objPHPExcel, $columnID . '1', 'eeeeee');
		}

		$this->setCellBorder($objPHPExcel, 'A1:' . $columnLetter . (count($collectionArray) + 1));
    }
}
