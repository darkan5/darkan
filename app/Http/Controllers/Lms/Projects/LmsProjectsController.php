<?php

namespace App\Http\Controllers\Lms\Projects;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use File;
use App\Http\Controllers\Controller;
use App\Modules\Models\Projects;
use App\Modules\Models\Editors;
use App\Modules\Models\Banners;

use App\Http\Requests\Lms\Project\AddNewProjectRequest;
use App\Http\Requests\Lms\Project\EditProjectRequest;
use App\Http\Requests\Lms\Project\DeleteProjectRequest;

use App\Http\Foundation\Projects\ProjectCreator;
use App\Http\Foundation\Publications\PublicationCreator;
use App\Http\Foundation\Files\FilesOperations;

use App\Modules\Utils\Utils;

use App\Http\Requests\Lms\Files\DeleteEmptyProjectPublicationRequest;

class LmsProjectsController extends Controller
{
    use ProjectCreator;
    use PublicationCreator;
    use FilesOperations;

    protected $redirectTo = 'lms/projects';

    public function getProjectsList(){

    	$projectsList = $this->getProjects();

        $editorsArray = $this->getEditorsArray();

        $bestEditorId = 5; // Darkan standard

        return view('lms.projects.projects')
                        ->with('projectsList', $projectsList)
                        ->with('editorsArray', $editorsArray)
                        ->with('bestEditorId', $bestEditorId);
    }

    protected function getProjects()
    {
        return Projects::where('user_id', '=', Auth::user()->id)
                ->get();

    }

    protected function getEditorsArray()
    {
        $editorsArray = Editors::where('develop', '=', false)
                        ->where('active', '=', true)
                        ->pluck('name', 'id');

        return $editorsArray;
    }

    public function addProject(AddNewProjectRequest $request)
    {

        $canCreate = $this->isProjectLimitExceeded();

        if(!$canCreate){
            redirect($this->redirectTo)->withErrors(['Przekroczono limit projektów']);
        }

        $input = Input::all();
        $project = new Projects($input);
 
        $project->user_id = Auth::user()->id;
        $project->version = env('app_version');
        $project->date = date('Y-m-d H:i:s');
        $project->last_visit = date('Y-m-d H:i:s');
        $project->date_modification = date('Y-m-d H:i:s');

        $project->save();

        $newProject = clone $project;
        $newProject->folder = 0;
        $newProject->pType = "userProjects";

        $user = Auth::user();
        
        $foldersStructure = json_decode($user->folders_structure);

        if($foldersStructure != ''){
            $objs = $foldersStructure->objs;
            array_push($objs, $newProject);
            $foldersStructure->objs = $objs;
            $user->folders_structure = json_encode($foldersStructure);
            $user->save();
        }

        $this->addProjectFiles($project);

        return redirect($this->redirectTo);
    }

    public function editProject(EditProjectRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id); 

        if($project){

            $project = Projects::find($request->project_id);

            $input = Input::all();
            $project->fill($input);
            $project->save();
        }

        return redirect($this->redirectTo);
    }

    public function deleteProject(DeleteProjectRequest $request)
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

        return redirect($this->redirectTo);
    }

    public function deletePublication(DeleteEmptyProjectPublicationRequest $request)
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

        return redirect($this->redirectTo);
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

    protected function checkAccessToGroup($groupId)
    {
        return Groups::where('id_owner', '=', Auth::user()->id)
                ->where('id', '=', $groupId)
                ->first();
    }

    protected function checkAccessToProject($projectId)
    {
        return Projects::where('user_id', '=', Auth::user()->id)
                ->where('project_id', '=', $projectId)
                ->first();
    }

    protected function checkAccessToCourse($courseId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $courseId)
                ->first();
    }

    protected function isProjectLimitExceeded()
    {
        return Utils::isProjectLimitExceeded();
    }


}
