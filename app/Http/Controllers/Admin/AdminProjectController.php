<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use File;
use App\Http\Controllers\Controller;
use App\Modules\Models\Users;
use App\Modules\Models\Projects;
use App\Modules\Models\Roles;

use App\Http\Requests\Admin\Project\AddProjectsToUserRequest;

use App\Http\Foundation\Files\FilesOperations;

use App\Modules\Ocs\OcsDownloader;

use App\Modules\Mailer\UserMailSender;

class AdminProjectController extends Controller
{
    use FilesOperations;

    protected $accessRolesIds = [3, 4, 5, 6, 7, 9, 10, 11, 12, 13];
    private $DISTRIBITION_USER_ID = 5;

    protected $redirectTo = 'admin/user/';

    public function getProjectsList($userId){

        $accessToUser = $this->checkAccessToUser($userId); 

        if(!$accessToUser){
            return view('admin.users.user_no_exist');
        }

        $user = Users::find($userId);

        if(!$this->checkAccessToRole($user->roleUser->role_id)){
            return $this->redirectoToRolesError();
        }


        $distributionProjects = $this->getDistributionProjects($this->DISTRIBITION_USER_ID);
    	$userProjects = $this->getUserProjects(Auth::user()->id);

        $LINK = url('projects');

        return view('admin.add_projects_to_user.add_projects_to_user')
                        ->with('distributionProjects', $distributionProjects)
                        ->with('userProjects', $userProjects)
                        ->with('user', $user)
                        ->with('LINK', $LINK);
    }

    protected function getDistributionProjects($userId)
    {
        return $this->getProjectsByUser($userId);
    }

    protected function getUserProjects($userId)
    {
        return $this->getProjectsByUser($userId);
    }

    protected function getProjectsByUser($userId)
    {
        return Projects::where('user_id', '=', $userId)
                ->get();

    }

    protected function getProjectsByIds($projectsIds, $userId)
    {
        return Projects::whereIn('project_id', $projectsIds)
                ->where('user_id', '=', $userId)
                ->get();

    }

    public function addProjectsToUser(AddProjectsToUserRequest $request)
    {

        $accessToUser = $this->checkAccessToUser($request->user_id); 

        if(!$accessToUser){
            return view('admin.users.user_no_exist');
        }

        $newUser = Users::find($request->user_id);

        if(!$this->checkAccessToRole($newUser->roleUser->role_id)){
            return $this->redirectoToRolesError();
        }

        if(count($request->demos_projects_ids) == 0 && count($request->user_projects_ids) == 0){
            return $this->redirectoToNoProjectsToCopyError();
        }

        $demos_projects_ids = $this->strinArrayToIntArray($request->demos_projects_ids);
        $user_projects_ids = $this->strinArrayToIntArray($request->user_projects_ids);

        $distributionProjects = $this->getProjectsByIds($demos_projects_ids, $this->DISTRIBITION_USER_ID);
        $userProjects = $this->getProjectsByIds($user_projects_ids, Auth::user()->id);


        $this->copyDemoProjects($newUser, $distributionProjects);
        $this->copyDemoProjects($newUser, $userProjects);

        $this->sendEmail($newUser, $request);

        return redirect($this->redirectTo . $request->user_id);
    }

    public function copyDemoProjects($newUser, $demoProjects)
    {
        $projectsPath = config('app.projects_folder');
        $thumbProjectsPath = config('app.projects_thumb_folder');

        foreach ($demoProjects as $demoProject) {

            $sourceDir = $projectsPath . $demoProject->user_id . '/' . $demoProject->project_id;

            $newProject = $this->copyDemoProjectModel($newUser, $demoProject);
            $this->copyToFolderStructure($newUser, $newProject);

            if($newProject){

                $userId = $newUser->id;
                $projectId = $newProject->project_id;

                $downloaded = OcsDownloader::downloadProject($demoProject);

                //if (!$downloaded) { continue; } 

                $destinationDir = $projectsPath . $userId . '/' . $projectId;
                $copied = File::copyDirectory($sourceDir, $destinationDir);
                if (!$copied) { continue; }

                $thumbPath = $thumbProjectsPath . $demoProject->project_id .'.jpg';
                $destinationThumbPath = $thumbProjectsPath . $projectId .'.jpg';

                if(File::exists($thumbPath)){
                    File::copy($thumbPath, $destinationThumbPath);
                }
            }
        }
    }

    public function copyDemoProjectModel($newUser, $demoProject)
    {

        $newProject = new Projects();

        $newProject->dimentions = $demoProject->dimentions;
        $newProject->external = 0;
        $newProject->name = $demoProject->name;
        $newProject->skin = $demoProject->skin;
        $newProject->size = $demoProject->size;
        $newProject->status = 0;
        $newProject->template = 0;
        $newProject->user_id = $newUser->id;
        $newProject->version = $demoProject->version;
        $newProject->editor_id = $demoProject->editor_id;
        $newProject->save();


        return $newProject;
    }

    public function copyToFolderStructure($user, $project)
    {
        $newProject = clone $project;
        $newProject->folder = 0;
        $newProject->pType = "userProjects";
        
        $foldersStructure = json_decode($user->folders_structure);

        if($foldersStructure != ''){
            $objs = $foldersStructure->objs;
            array_push($objs, $newProject);
            $foldersStructure->objs = $objs;
            $user->folders_structure = json_encode($foldersStructure);
            $user->save();
        }

    }

    protected function strinArrayToIntArray($stringArray) 
    {
        $intArray = [];

        if(!isset($stringArray)){
            return $intArray;
        }

        foreach ($stringArray as $item) {
            array_push($intArray, (int)$item);
        }

        return $intArray;
    }

    protected function checkAccessToRole($role_id) 
    {
        $rolesIdsArray = Roles::wherein('id', $this->accessRolesIds)->pluck('id')->toArray();

        if(!in_array($role_id, $rolesIdsArray)) {
            return false;
        }

        return true;
    }

    protected function redirectoToRolesError() 
    {
        return Redirect::back()->withErrors(['Nie masz dostępu do tej roli użytkownika użytkownika!']);
    }

    protected function redirectoToNoProjectsToCopyError() 
    {
        return Redirect::back()->withErrors(['Nie wybrano żadnych projektów do skopiowania!']);
    }

    protected function checkAccessToUser($userId){

        return true;
    }

    public function sendEmail($newUser, $request){

        $registrationData = array(
            'email' => $newUser->email,
            'title' => $request->title,
            'message' => $request->message,
            'creatorMail' => Auth::user()->login
 
        );

        $mailer = new UserMailSender();
        $mailer->sendProjectsCopiedMail($registrationData, $newUser->email);
    }


}
