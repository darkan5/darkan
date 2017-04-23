<?php namespace App\Modules\Api\NewProject;

use App\Modules\Models\Projects;
use App\Modules\Projectlist\ProjectFiles;
use stdClass;
use App\Modules\Api\ApiCommand\ApiCommandObject;


class NewProjectObject extends ApiCommandObject{

	public $userId = false;
    public $projectName = "Api project";
    public $dimensions = '860x500';
    public $skin = 'sk00';
    public $autoScale = false;

    public function update($request){
    	
    	if ($request->has('projectName')) {
		    $this->projectName = $request->projectName;
		}

        if ($request->has('dimensions')) {

            $arr = explode('x', $request->dimensions);

            if(count($arr) == 2){
                
                list($width, $height) = $arr;

                if($this->isInteger($width) && $this->isInteger($height)){
                    $this->dimensions = (int)$width . 'x' . (int)$height;
                }

            }
        }

        if ($request->has('skin')) {
            $this->skin = $request->skin;
        }

        if ($request->has('autoScale')) {

            $this->autoScale = filter_var($request->autoScale, FILTER_VALIDATE_BOOLEAN);
        }
	}

	public function createNewProject()
	{

		$project = new Projects();
        $project->dimentions = $this->dimensions;
        $project->external = 1;
        $project->name = $this->projectName;
        $project->skin = $this->skin;
        $project->status = 0;
        $project->template = 0;
        $project->user_id = $this->userId;
        $project->version = env('app_version');
        $project->date = date('Y-m-d H:i:s');
        $project->last_visit = date('Y-m-d H:i:s');
        $project->date_modification = date('Y-m-d H:i:s');

		$project->save();

		$newProject = clone $project;
		$newProject->pType = "userProjects";

		$this->addProjectFiles($newProject);

		return $newProject;
	}

	private function addProjectFiles($project)
    {

    	$userId = $project->user_id;
    	$projectId = $project->project_id;

    	$projectFolderPath = config('app.projects_folder') . $userId . '/' . $projectId . '/';

        if (!file_exists( config('app.projects_folder') . $userId . '/' ) ) {
            mkdir( config('app.projects_folder') . $userId . '/' );
        }
        if (!file_exists( $projectFolderPath ) ) {
            mkdir( $projectFolderPath );
        }
            
	    mkdir($projectFolderPath . 'pack');
	    mkdir($projectFolderPath . 'pdf');
	    mkdir($projectFolderPath . 'pre');
	    mkdir($projectFolderPath . 'sitemap');
	    mkdir($projectFolderPath . 'pre/js');
	    mkdir($projectFolderPath . 'pre/exported');
	    mkdir($projectFolderPath . 'pre/exported_view');

        // tworzymy plik json z mapa szkolenia w sitemap/map.json
        file_put_contents($projectFolderPath . '/sitemap/map.json', json_encode($this->getDefaultProjectMap()));
        file_put_contents($projectFolderPath . '/sitemap/options.json', json_encode($this->getDefaultProjectOptions()));
    }

    private function getDefaultProjectMap()
    {
        $map = new stdClass();
        $map->pages = array();

        return $map;
    }

    private function isInteger($input){
        return(ctype_digit(strval($input)));
    }

    private function getDefaultProjectOptions()
	{
        list($width, $height) = explode('x', $this->dimensions);

        return array(
                'name'=> '',
                'move_grid'=> 1,
                'copy_grid'=> 60,
                'image_quality'=> 100,
                'snapping'=> true,
                'showsnaplines' => true,
                'show_titles' => false,
                'draggable_snaptolerance'=> 10,
                'scorm_score_required'=> false,
                'require_score'=> false,
                'require_score_points'=> 0,
                'max_points_number'=> 0,
                'require_pages'=> true,
                'require_elements'=> false,
                'continue_method'=> 'popup',
                'help_title' => "",
                'sound_loop' => true,
                'sound_vol' => 100,
                'pagelisttype'=> 'thumbs',
                'singlefile'=> true,
                'orginal_images'=> false,
                'convert_sound_to_ogg'=> true,
                'dimentions'=> $this->dimensions,
                'skin'=> $this->skin,
                'lang'=> config('app.locale'),
                'thumb'=> '',
                'toc_enabled'=> true,
                'last_page_id'=> 0,
                'staticVariables'=> $this->getStaticVariables(),
                'projectVariables'=> [],
                'pagesDraws'=> [ ],
                'keep_dimensions'=> true,
                'load_every_page_at_start'=> false,
                'soundfilename'=> '',
                'autoScale'=> $this->autoScale,
                'width'=> (int)$width,
                'height'=> (int)$height
           );
	}

    private function getStaticVariables()
    {
        return [
            array(
                "varhash"=> '00000000000000000000000000000000',
                "pvarname"=> '_score',
                "pvarvalue"=> 0
            ),
            array(
                "varhash"=> '00000000000000000000000000000001',
                "pvarname"=> '_maxscore',
                "pvarvalue"=> 0
            ),
            array(
                "varhash"=> '00000000000000000000000000000002',
                "pvarname"=> '_percentscore',
                "pvarvalue"=> 0
            ),
            array(
                "varhash"=> '00000000000000000000000000000003',
                "pvarname"=> '_diamonds',
                "pvarvalue"=> 0
            )
        ];
    }

    public function checkPlan($aplicationApi)
    {
        $user = $this->getUserAdminFromAplicationApi($aplicationApi);



        if(!$user){
            return false;
        }

        $userPlan = $this->getPlans($user);

        if(!$userPlan){
            return false;
        }

        $createProjects = $this->getPlanOptionValue('createProjects', $userPlan);
        $projectsLimit = $this->getPlanOptionValue('projects', $userPlan);

        $projectsCount = Projects::where('user_id', '=', $user->id)->count();

        if($createProjects && ($projectsCount < $projectsLimit)){
            return true;
        }

        return false;
    }

}