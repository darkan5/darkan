<?php

namespace App\Http\Controllers\Editor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
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
use App\Http\Foundation\Publications\PublicationCreator;
use App\Http\Foundation\Files\FilesOperations;

class EditorEmptyProjectController extends Controller
{

    use FilesOperations;
    use ProjectCreator;
    use PublicationCreator;
    

    protected $redirectTo = 'editor/';


    public function emptyProjectPublish(AddEmptyProjectPublicationRequest $request)
    {

        $project = $this->checkAccessToProject($request->project_id);

        if(!$project){
            return Redirect::back()->withErrors('Nie masz dostępu do tego projektu');
        }

        $input = Input::all();
        $banner = new Banners($input);

        $banner->project_id = $project->project_id;
        $banner->user_id = Auth::user()->id;
        $banner->path = $this->createPublicationHash($request->name); 
        $banner->iframe = ''; 
        $banner->date_create = date('Y-m-d H:i:s');
        $banner->date_expiry = date('Y-m-d H:i:s');
        $banner->last_visit = date('Y-m-d H:i:s');
        $banner->modified = date('Y-m-d H:i:s');
        $banner->view_count = 1;
        $banner->max_view_count = 10;
        $banner->dimensions = '860x500';
        $banner->questions = '';
        $banner->index_file = '';
        $banner->requirements = '';
        $banner->questiondata = '';

        $banner->save();

        $this->addPublicationFiles($project, $banner);

        return redirect($this->redirectTo . $request->project_id);
    }

    

    public function emptyProjectOverwritePublication(OverwriteEmptyProjectPublicationRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id);

        if(!$project){
            return Redirect::back()->withErrors('Nie masz dostępu do tego projektu');
        }

        $course = $this->checkAccessToCourse($request->id_banner);

        if(!$course){
            return Redirect::back()->withErrors('Nie masz dostępu do tej publikacji');
        }

        $banner = Banners::find($request->id_banner);

        $this->addPublicationFiles($project, $banner);

        return redirect($this->redirectTo . $request->project_id);
    }

    public function emptyProjectEditPublication(EditEmptyProjectPublicationRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id);

        if(!$project){
            return Redirect::back()->withErrors('Nie masz dostępu do tego projektu');
        }

        $course = $this->checkAccessToCourse($request->id_banner);

        if(!$course){
            return Redirect::back()->withErrors('Nie masz dostępu do tej publikacji');
        }

        $banner = Banners::find($request->id_banner);

        $input = Input::all();
        $banner->fill($input);
        $banner->save();

        return redirect($this->redirectTo . $request->project_id);
    }

    public function emptyProjectDeletePublication(DeleteEmptyProjectPublicationRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id);

        if(!$project){
            return Redirect::back()->withErrors('Nie masz dostępu do tego projektu');
        }

        $course = $this->checkAccessToCourse($request->id_banner);

        if(!$course){
            return Redirect::back()->withErrors('Nie masz dostępu do tej publikacji');
        }


        $banner = Banners::find($request->id_banner);

        $this->deletePublicationFiles($course);

        $banner->delete();

        return redirect($this->redirectTo . $request->project_id);
    }

    public function addEmptyProjectFile(AddEmptyProjectFileRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id);

        if(!$project){
            return Redirect::back()->withErrors('Nie masz dostępu do tego projektu');
        }

        $projectFile = Input::file('project_file');
        $zipExtension = $projectFile->getClientOriginalExtension();

        if($zipExtension != 'zip'){
            return Redirect::back()->withErrors('Nieprawidłowy format pliku');
        }

        $result = $this->extractProjectFiles($projectFile, $project);

        if(!$result){
            return redirect($this->redirectTo . $request->project_id)->withErrors('Projekt zawiera plik o niedozwolonym rozszerzeniu');
        }

        return redirect($this->redirectTo . $request->project_id);
    }

    public function deleteEmptyProjectFiles(DeleteEmptyProjectFileRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id);

        if(!$project){
            return Redirect::back()->withErrors('Nie masz dostępu do tego projektu');
        }

        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);

        File::deleteDirectory($projectDirectory, true);

        return redirect($this->redirectTo . $request->project_id);
    }

    public function editProject(EditEmptyProjectRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id); 

        if($project){

            $project = Projects::find($request->project_id);

            $input = Input::all();
            $project->fill($input);
            $project->save();
        }

        return redirect($this->redirectTo . $request->project_id);
    }

    public function deleteProject(DeleteEmptyProjectRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id);

        if($project){
            $project = Projects::find($request->project_id);

            $user = Auth::user();
            $foldersStructure = json_decode($user->folders_structure);

            if($foldersStructure != ''){

                $objs = $foldersStructure->objs;

                foreach ($objs as $key => $value) {
                    if($value->project_id == $project->project_id){
                        array_splice($objs, $key, 1);
                    }
                }

                $foldersStructure->objs = $objs;
                $user->folders_structure = json_encode($foldersStructure);
                $user->save();
            }

            $this->deleteProjectFiles($project);
            $project->delete();

        }

        return redirect('lms/projects');
    }

    protected function checkAccessToCourse($courseId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $courseId)
                ->first();
    }

    protected function getProjectPublications($projectId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('project_id', '=', $projectId)
                ->get();

    }

    protected function createPublicationHash($title)
    {
        for (;;) {

            $hash = hash('md5', $title . time());

            // $checkHashQuery = $database->query("SELECT * FROM `banners_projects` WHERE `path`='$hash' LIMIT 1");
            $checkHashQuery = Banners::where('path', '=', $hash)->count();

            if ($checkHashQuery == 0) {
                return $hash;
                break;
            }
        }
    }

    protected function addPublicationFiles($project, $banner)
    {
        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);
        $publicationDirectory = $this->getPublicationDirectory($banner);

        if($publicationDirectory){
            File::copyDirectory($projectDirectory, $publicationDirectory);
            return true;
        }

        return false;
    }

    protected function deletePublicationFiles($banner)
    {
        $publicationDirectory = $this->getPublicationDirectory($banner);

        if($publicationDirectory){

            File::deleteDirectory($publicationDirectory, false);
            return true;
        }

        return false;
    }

}
