<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Modules\Editor\SearchImages;
use App\Modules\Editor\SearchVimeo;
use App\Modules\Editor\ProjectVersions;
use App\Modules\Editor\Publication;
use App\Modules\Editor\MediaLibrary;
use App\Modules\Models\Projects;
use App\Modules\Skins\Skins;
use App\Modules\Utils\Utils;
use App\Modules\Library\LibraryTags;
use App\Http\Requests\EditorRequest;
use Input;
use stdClass;
use Madcoda\Youtube;
use Lang;

class EditorController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}

	public function indexOldLink($projectId)
	{
		return redirect('editor/' . $projectId);
	}

	private function getUserPlansHtml($user)
	{
		$userPlansHtml = '';
		$userPlans = Utils::getUserPlans();

		foreach ($userPlans as $planCategoryKey => $planCategory) {
			foreach ($planCategory as $planName => $planExpirationDate) {
				$planHasExpired = Utils::isDateExpired($planExpirationDate);
				$icon = $planHasExpired ? '<i class="fa fa-times-circle text-warning"></i>' : '<i class="fa fa-check-circle text-success"></i>';
				
				$userPlansHtml .= '<tr>';
					$userPlansHtml .= '<td class="header">'. $icon . ' ' . Lang::get($planName) . ':</td>';
					$userPlansHtml .= '<td class="account-type">' . Utils::getDaysToExpiry($planExpirationDate) . '</td>';
				$userPlansHtml .= '</tr>';
			}
		}
		return $userPlansHtml;
	}

	public function index($projectId)
	{
		if (Auth::check() || $projectId == 0) {

			$user = Auth::user();

			$projectData = Projects::find($projectId);

			if ($projectData) {
				$userLogin = '';
				$userPlansHtml = '';
				if (Auth::check()) {
					$userLogin = Auth::user()->email;
                	$userPlansHtml = $this->getUserPlansHtml($user);
				}
                $skins = new Skins($userLogin);

                if (!Auth::check()) {
                	$user = new stdClass();
                	$user->login = 'undefined';
                	$user->subdomain = '';
                }

                $libraryTags = new LibraryTags();

				return view('editor.editor')
							->with('dimentions', $projectData->dimentions)
							->with('external', $projectData->external)
							->with('user', $user )
							->with('userPhoto', Auth::check() ? Auth::user()->photo : '')
							->with('projectName', $projectData->name)
							->with('userPlansHtml', $userPlansHtml)
							->with('chosenLang', config('app.locale'))
							->with('youTubeLink', Utils::getYouTubeLink())
							->with('photoshopBlogPost', Utils::getPhotoshopBlogPost())
							->with('skinsList', $skins->showSkinList())
							->with('projectID', $projectId)
							->with('libraryTags', $libraryTags->generateSelect());

			} else {
				return view('editor.projectnotexists');
			}

		} else {
			return redirect()->guest('/login');
		}
	}

	public function indexExternalProject($projectId)
	{
		$user = Auth::user();

		$projectData = Projects::find($projectId);
		$userPlansHtml = '';

		if ($projectData) {
			$userLogin = '';
			if (Auth::check()) {
				$userLogin = Auth::user()->email;
            	$userPlansHtml = $this->getUserPlansHtml($user);
			}
            $skins = new Skins($userLogin);

            if (!Auth::check()) {
            	$user = new stdClass();
            	$user->login = 'undefined';
            	$user->subdomain = '';
            }

            $libraryTags = new LibraryTags();

			return view('editor.editor')
						->with('dimentions', $projectData->dimentions)
						->with('external', $projectData->external)
						->with('user', $user )
						->with('userPhoto', Auth::check() ? Auth::user()->photo : '')
						->with('projectName', $projectData->name)
						->with('userPlansHtml', $userPlansHtml)
						->with('chosenLang', config('app.locale'))
						->with('youTubeLink', Utils::getYouTubeLink())
						->with('photoshopBlogPost', Utils::getPhotoshopBlogPost())
						->with('skinsList', $skins->showSkinList())
						->with('projectID', $projectId)
						->with('libraryTags', $libraryTags->generateSelect());

		}
	}

	public function keepSession()
	{
		$data = array();
		$data['login'] = true;

		if (!Auth::check()) {
			$data['login'] = false;
		}

		$this->showReturnData($data);
	}

	public function searchImages(EditorRequest $request)
	{
		$params = Input::all();

		$search = new SearchImages();
		$foundImages = $search->runSearch($params['request']);

		$this->showReturnData($foundImages);
	}

	public function searchyoutube()
	{
		$params = Input::all();
		print_r($params);

		$request = json_decode( $params['request'] );

		$word = $request->searchVal;
 
        $youtube = new Youtube(array('key' => 'AIzaSyBoOiKiLf96_6ZQUolHttHNp9Rr71i6XPE'));
 
        // Parametros
        $params = array(
            'q' => $word,
            'type' => 'video',
            'part' => 'id, snippet',
            'maxResults' => 20    //Número de resultados
        );
 
        // Hacer la busqueda con los parametros
        $videos = $youtube->searchAdvanced($params, true);

        $this->showReturnData($videos);	
 
        // return \View::make('youtube.index', compact('videos'));
	}

	public function searchvimeo()
	{
		$params = Input::all();

		$search = new SearchVimeo();
		$foundVideos = $search->runSearch($params['request']);

		$this->showReturnData($foundVideos);
	}

	public function library()
	{
		$params = Input::all();

		$libraryContent = new MediaLibrary();
		$fonundItems = $libraryContent->runSearch($params['request']);

		$this->showReturnData($fonundItems);
	}

	public function projectVersion()
	{
		$params = Input::all();

		$projectVersionRequest = new ProjectVersions();
		$returnData = $projectVersionRequest->run($params);

		$this->showReturnData($returnData);
	}

	public function publication()
	{
		$params = Input::all();

		$publication = new Publication();
		$response = $publication->run($params['request']);

		$this->showReturnData($response);
	}

	public function mailings()
	{
		$this->showReturnData(array());	
	}

	public function login_external()
	{
		$this->showReturnData(array());	
	}

	public function photopea()
	{
		$this->showReturnData(array());	
	}

	private function showReturnData($msg)
	{
		if (!$msg) {
			echo '{}';
			return;
		}
		echo json_encode($msg);
	}

}
