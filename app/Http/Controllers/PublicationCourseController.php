<?php namespace App\Http\Controllers;


use Auth;
use App\User;
use Input;
use File;
use stdClass;
use Validator;

use App\Http\Requests\PublicationCourseRequest;
use App\Modules\Responce\ResponceFactory;
use App\Modules\Utils\Utils;

class PublicationCourseController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Api Controller
	|--------------------------------------------------------------------------
	|
	|
	*/

	private $responce = array();

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->middleware('auth');
	}
	

	public function test(PublicationCourseRequest $request) 
	{

	}

	public function uploadDocFile(PublicationCourseRequest $request)
	{

        $input = Input::all();

        $rules2 = ['dockfile' => 'required|max:10000'];
        $validator = Validator::make($input, $rules2);

        if($validator->fails()){
            $responce = ResponceFactory::createResponceFault();
            $responce->data = array('error' => 1, 'descriptiom' => 'File is nor required');
            echo $responce->toJSON();
            return;
        }

        $extension = $input['dockfile']->getClientOriginalExtension();

        $notAllowedExtensions = ['bat','exe','cmd','sh','php','pl','cgi','386','dll','com','torrent','js','app','jar','pif','vb','vbscript','wsf','asp','cer','csr','jsp','drv','sys','ade','adp','bas','chm','cpl','crt','csh','fxp','hlp','hta','inf','ins','isp','jse','htaccess','htpasswd','ksh','lnk','mdb','mde','mdt','mdw','msc','msi','msp','mst','ops','pcd','prg','reg','scr','sct','shb','shs','url','vbe','vbs','wsc','wsf','wsh'];

        foreach ($notAllowedExtensions as $extension2) {
            if($extension == $extension2){
                $responce = ResponceFactory::createResponceFault();
                $responce->data = array('error' => -1, 'descriptiom' => "sdasdasda");
                echo $responce->toJSON();
                return;
            }
        }

		//http://stackoverflow.com/questions/23625672/laravel-file-upload-validation
  //       $rules1 = ['pageid' => 'numeric|min:0', 'hash' => 'required|min:0', 'actionkey' => 'required|min:0' ];
		// $validator = Validator::make($input, $rules1);

		// if($validator->fails()){
		// 	$responce = ResponceFactory::createResponceFault();
  //           $responce->data = array('error' => 0, 'descriptiom' => 'Wrong parameters');
  //           echo $responce->toJSON();
  //           return;
		// }

        

        $rules3 = ['goodextensions' => 'required|min:0'];
        $validator = Validator::make($input, $rules3);

        $goodExtensionsString = '';

        if($validator->fails()){
            
        }else{
            $goodExtensions = $input['goodextensions'];
            $goodExtensions = strtolower($goodExtensions);
            $goodExtensionsArray = explode(';|', $goodExtensions);
            $goodExtensionsString = '|mimes:' . join(',', $goodExtensionsArray);
            //$goodExtensionsString = '|mimes:mp3';
        }
        

        $rules4 = ['dockfile' => 'required|max:10000' . $goodExtensionsString];
        $validator = Validator::make($input, $rules4);

        if($validator->fails()){
            $responce = ResponceFactory::createResponceFault();
            $responce->data = array('error' => 3, 'descriptiom' => 'Extension is not required', 'goodExtensionsString' => $goodExtensionsString);
            echo $responce->toJSON();
            return;
        }

        $actionkey = $input['actionkey'];
        $file = $input['dockfile'];
        $hash = $input['hash'];
        

        $coursefilesDirectory = storage_path( '/app/coursefiles');

        $courseDirectory = $coursefilesDirectory  . '/' . $hash;
        $userDirectory = $courseDirectory . '/'  . '99';
        $componentDirectory = $userDirectory . '/'  . $actionkey . '/';

        $name = $file->getClientOriginalName();

        $oldFileName = pathinfo($name, PATHINFO_FILENAME);

        $fileName = $this->getFileName($componentDirectory, $oldFileName, $extension);

        $filePath = $componentDirectory . $fileName . '.' . $extension;


        $validationArray = array('filepath' => $filePath);

        $rules4 = ['filepath' => 'required|min:1|max:255'];
        $validator = Validator::make($validationArray, $rules4);

        if($validator->fails()){
            $responce = ResponceFactory::createResponceFault();
            $responce->data = array('error' => 4, 
                'descriptiom' => 'To long file name',
                'filePath' => $filePath,
                'count' => strlen ($filePath) - 255 
                );
            echo $responce->toJSON();
            return;
        }



		// $actionkey = $input['actionkey'];
  //       $file = $input['dockfile'];
  //       $hash = $input['hash'];
        

  //       $coursefilesDirectory = storage_path( '/app/coursefiles');

  //       $courseDirectory = $coursefilesDirectory  . '/' . $hash;
  //       $userDirectory = $courseDirectory . '/'  . Auth::user()->user_id . '/';
  //       $componentDirectory = $userDirectory . '/'  . $actionkey . '/';

  //       $extension = $file->getClientOriginalExtension();

  //       $fileName = $this->getFileName($componentDirectory, 'dock', $extension);
  //       $filePath = $componentDirectory . $fileName . '.' . $extension;

  //       if (!file_exists($coursefilesDirectory)) {
  //           mkdir($coursefilesDirectory);
  //       }
  //       if (!file_exists($courseDirectory)) {
  //           mkdir($courseDirectory);
  //       }
  //       if (!file_exists($userDirectory)) {
  //           mkdir($userDirectory);
  //       } 
  //       if (!file_exists($componentDirectory)) {
  //           mkdir($componentDirectory);
  //       }

  //       $copyResult = copy($file, $filePath);
  //       exec("chmod 644 " . $filePath);

  //       if($copyResult){
  //       	$responce = ResponceFactory::createResponceResult();
  //       	$responce->data = array();
  //       }else{
  //       	$responce = ResponceFactory::createResponceFault();
		// 	$responce->data = array('error' => 2, 'descriptiom' => 'Copy fault');
  //       }

        $responce = ResponceFactory::createResponceResult();
        $responce->data = array();

		echo $responce->toJSON();

	}

	private function getFileName($dir, $fileName, $ext){

        $index = 0;
        $newFileName = Utils::replaceSpecialChars($fileName);

        while(file_exists($dir . $newFileName . '.' . $ext)){
        
            $index++;
            $newFileName = $fileName . '_' . $index;
        }

        return $newFileName;

    }
}