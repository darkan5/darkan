<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use Lang;
use stdClass;
use File;

class LanguageController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}



	public function langAdminView()
	{

		$languages = array();

		$languagesList = File::directories(base_path('/resources/lang/'));

		foreach ($languagesList as $langName) {
			$fileExploded = explode('\\', (string)$langName);
			$langName = end($fileExploded);
			$languages[$langName] = array();

			$langFiles = File::files(base_path('/resources/lang/' . $langName . '/'));

			foreach ( $langFiles as $file ) {
				$fileExploded = explode('/', (string)$file);
				$fileName = end($fileExploded);

				$languages[$langName][$fileName] = include $file;
			}
		}


		return view('admin.languages.langadmin')
					->with('languages', $languages);
	}


	public function langMaker()
	{

		// $languages = new stdClass();
		// $languages->pl = array();
		// $languages->oldEn = array();
		// $languages->newEn = array();

		// // get new language php files
		// $plLangFiles = File::files(base_path('/resources/lang/pl/'));
		// foreach ( $plLangFiles as $file ) {
		// 	$fileExploded = explode('/', (string)$file);
		// 	$fileName = end($fileExploded);

		// 	$languages->pl[$fileName] = include $file;

		// 	File::copy($file, base_path('/resources/lang/en/') . $fileName);
		// }


		// // get all old En files
		// $appLang = json_decode(file_get_contents(base_path('/../app/2.0.0/languages/en.json')), true );
		// $darkanPanelLang = json_decode(file_get_contents(base_path('/../darkanpanel/lang/en.json')), true );
		// $siteLangFile = File::files(base_path('../assets/lang/php/'));
		// $siteLang = '';
		// foreach ( $siteLangFile as $file ) {
		// 	$fileExploded = explode('/', (string)$file);
		// 	$fileName = end($fileExploded);
		// 	if ($fileName == 'en.php') {
		// 		$siteLang = include $file;
		// 	}
		// }

		
		// // pobierz wszystkie tlumaczenia do nowych plikow EN
		// foreach ($languages->pl as $filename => $translatioArray) {


		// 	$enLangFiles = File::files(base_path('/resources/lang/en/'));

		// 	foreach ( $enLangFiles as $enFile ) {
		// 		$fileExploded = explode('/', (string)$enFile);
		// 		$enfileName = end($fileExploded);
		// 		if ($enfileName == $filename) {

		// 			$enTranslations = include $enFile;

		// 			foreach($translatioArray as $translationKey => $translationValue) {

		// 				$enTranslations[$translationKey] = 'NO TRANSLATION';

		// 				// znajdz tlumaczenie w starych plikach!
		// 				foreach ($appLang as $transKey => $transValue) {
		// 					if ($transKey == $translationKey) {
		// 						$enTranslations[$translationKey] = $transValue;
		// 					}
		// 				}
		// 				foreach ($siteLang as $transKey => $transValue) {
		// 					if ($transKey == $translationKey) {
		// 						$enTranslations[$translationKey] = $transValue;
		// 					}
		// 				}
		// 				foreach ($darkanPanelLang as $transKey => $transValue) {
		// 					if ($transKey == $translationKey) {
		// 						$enTranslations[$translationKey] = $transValue;
		// 					}
		// 				}

						

		// 			}

		// 			$contents = var_export($enTranslations, true);

		// 			file_put_contents(
		// 				base_path('/resources/lang/en/'. $filename), 
		// 				"<?php\n return {$contents};\n"
		// 				);


		// 		}
		// 	}




		}
	}
}