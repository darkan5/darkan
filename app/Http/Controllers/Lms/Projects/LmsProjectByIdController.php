<?php

namespace App\Http\Controllers\Lms\Projects;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use File;
use App\Http\Controllers\Controller;
use App\Modules\Models\Users;
use App\Modules\Models\Projects;
use App\Modules\Models\Editors;
use App\Modules\Models\Banners;

use App\Http\Requests\Lms\Project\AddNewProjectRequest;
use App\Http\Requests\Lms\Project\EditProjectRequest;
use App\Http\Requests\Lms\Project\DeleteProjectRequest;

use App\Http\Foundation\Projects\ProjectCreator;
use App\Http\Foundation\Publications\PublicationCreator;
use App\Http\Foundation\Files\FilesOperations;

use App\Http\Requests\Lms\Files\DeleteEmptyProjectPublicationRequest;

class LmsProjectByIdController extends Controller
{
    use ProjectCreator;
    use PublicationCreator;
    use FilesOperations;

    protected $redirectTo = 'lms/project/';

    public function getProjectById($projectId, $userId = null){

        if($userId){
            if(Auth::user()->hasRole('admin') || Session::has('isAdmin')){
                $this->loginAsOtherUser($userId);
                return redirect($this->redirectTo . $projectId);
            }
        }

    	$project = $this->getProject($projectId);

        $editorsArray = $this->getEditorsArray();

        return view('lms.projects.project')
                        ->with('project', $project)
                        ->with('editorsArray', $editorsArray);
    }

    protected function getProject($projectId)
    {
        return Projects::where('user_id', '=', Auth::user()->id)
                ->where('project_id', '=', $projectId)
                ->first();

    }

    protected function getEditorsArray()
    {
        $editorsArray = Editors::where('develop', '=', false)
                        ->where('active', '=', true)
                        ->pluck('name', 'id');

        return $editorsArray;
    }


    public function editProject($projectId, EditProjectRequest $request)
    {
        $project = $this->checkAccessToProject($request->project_id); 

        if($project){

            $project = Projects::find($request->project_id);

            $input = Input::all();
            $project->fill($input);
            $project->save();
        }

        return redirect($this->redirectTo . $projectId);
    }

    public function deleteProject($projectId, DeleteProjectRequest $request)
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

        return redirect($this->redirectTo . $request->project_id);
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

    private function loginAsOtherUser($userId)
    {
        $user =  Users::find($userId);
        Session::set('loginasid', Auth::user()->id);
        Auth::loginUsingId($userId);
        Session::set('isAdmin', !Session::get('isAdmin'));
    }


}
