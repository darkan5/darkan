<?php

namespace App\Http\Controllers\Editor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Users;
use App\Modules\Models\Projects;
use App\Modules\Models\Share;
use App\Modules\Models\Banners;
use ZipArchive;
use Storage;
use File;
use App\Http\Requests\Lms\Files\AddEmptyProjectFileRequest;
use App\Http\Requests\Lms\Files\DeleteEmptyProjectFileRequest;
use App\Http\Requests\Lms\Files\AddEmptyProjectPublicationRequest;
use App\Http\Requests\Lms\Files\EditEmptyProjectPublicationRequest;
use App\Http\Requests\Lms\Files\DeleteEmptyProjectPublicationRequest;
use App\Http\Requests\Lms\Files\OverwriteEmptyProjectPublicationRequest;

use App\Http\Requests\Lms\Files\EditEmptyProjectRequest;
use App\Http\Requests\Lms\Files\DeleteEmptyProjectRequest;

use App\Http\Foundation\Projects\ProjectCreator;
use App\Http\Foundation\Files\FilesOperations;

use App\Modules\Skins\Skins;
use App\Modules\Utils\Utils;
use App\Modules\Library\LibraryTags;


use App\User;
use App\Modules\Editor\SearchImages;
use App\Modules\Editor\SearchVimeo;
use App\Modules\Editor\ProjectVersions;
use App\Modules\Editor\Publication;
use App\Modules\Editor\MediaLibrary;
use App\Http\Requests\EditorRequest;
use stdClass;
use Madcoda\Youtube;
use Lang;

class EditorController extends Controller
{
    use ProjectCreator;

    protected $redirectTo = 'editor/';

    public function index($projectId, $userId = null){

        if($userId){
            if(Auth::user()->hasRole('admin') || Session::has('isAdmin')){
                $this->loginAsOtherUser($userId);
                return redirect($this->redirectTo . $projectId);
            }
        }

        $project = Projects::where('user_id', '=', Auth::user()->id)->where('project_id', '=', $projectId)->first();
        $share = Share::where('project_id', '=', $projectId)->where('user_id', '=', Auth::user()->id)->first();

        if(!$project && !$share){
        	return view('editors.editor_project_not_exist');
        }

        if (isset($share->project))
	{
	    $project = $share->project;
	}
	//$project = $project or $share->project;
	
        if(!$project){
        	return view('editors.editor_project_not_exist');
        }

        switch ($project->editor_id) {
        	case 1:

                $files = $this->getProjectFiles($project);

                $publications = $this->getProjectPublications($project);

        		return view('editors.empty.empty_project_editor')
		        		->with('share', $share)
                        ->with('project', $project)
                        ->with('files', $files)
		        		->with('publications', $publications);
        		
        		break;

            case 2:

                return view('editors.pdf.pdf_editor')
                        ->with('share', $share)
                        ->with('project', $project);
                
                break;

            case 3:

                return view('editors.img.img_editor')
                        ->with('share', $share)
                        ->with('project', $project);
                
                break;

        	case 4:

        		return view('editors.easy.easy_editor')
		        		->with('share', $share)
		        		->with('project', $project);
        		
        		break;

        	case 5:

                $user = Auth::user();

                $userLogin = '';
                $userPlansHtml = '';
                if (Auth::check()) {
                    $userLogin = Auth::user()->login;
                    $userPlansHtml = '';
                }
                $skins = new Skins($userLogin);

                if (!Auth::check()) {
                    $user = new stdClass();
                    $user->login = 'undefined';
                    $user->subdomain = '';
                }

                $libraryTags = new LibraryTags();

                return view('editors.standard.standard_editor')
                            ->with('dimentions', $project->dimentions)
                            ->with('external', $project->external)
                            ->with('user', $user )
                            ->with('userPhoto', Auth::check() ? Auth::user()->photo : '')
                            ->with('projectName', $project->name)
                            ->with('userPlansHtml', $userPlansHtml)
                            ->with('chosenLang', config('app.locale'))
                            ->with('youTubeLink', Utils::getYouTubeLink())
                            ->with('photoshopBlogPost', Utils::getPhotoshopBlogPost())
                            ->with('skinsList', $skins->showSkinList())
                            ->with('projectID', $projectId)
                            ->with('libraryTags', $libraryTags->generateSelect());

        		// return view('editors.standard.standard_editor')
		        // 		->with('share', $share)
		        // 		->with('project', $project);

            case 6:

                return view('editors.profesional.profesional_editor')
                        ->with('share', $share)
                        ->with('project', $project);
        		
        		break;

            case 7:

                return view('editors.enterprise.enterprise_editor')
                        ->with('share', $share)
                        ->with('project', $project);
                
                break;

             case 8:

                return view('editors.ppt.ppt_editor')
                        ->with('share', $share)
                        ->with('project', $project);
                
                break;
        	
        	default:
        		return view('editors.editor_not_exist');
        		break;
        }
    }


    protected function getProjectPublications($projectId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('project_id', '=', $projectId)
                ->get();

    }







    public function indexExternalProject($projectId)
    {
        $user = Auth::user();

        $projectData = Projects::find($projectId);
        $userPlansHtml = '';

        if ($projectData) {
            $userLogin = '';
            if (Auth::check()) {
                $userLogin = Auth::user()->login;
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

    private function loginAsOtherUser($userId)
    {
        $user =  Users::find($userId);
        Session::set('loginasid', Auth::user()->id);
        Auth::loginUsingId($userId);
        Session::set('isAdmin', !Session::get('isAdmin'));
        return redirect('home');
    }

}
