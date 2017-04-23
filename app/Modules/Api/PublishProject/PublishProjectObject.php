<?php namespace App\Modules\Api\PublishProject;

use App\Modules\Editor\PublicationExternal;
use App\Modules\Models\BannersExternal;

use App\Modules\Api\ApiCommand\ApiCommandObject;

class PublishProjectObject extends ApiCommandObject{

	public $userId = false;
    public $projectId = false;
    public $title = '';
    public $description = '';

    public function update($request){

    	if ($request->has('projectId')) {
			$this->projectId = $request->projectId;
		}

		if ($request->has('title')) {
		    $this->title = $request->title;
		}

		if ($request->has('description')) {
		    $this->description = $request->description;
		}
    }

    public function publishProject(){

    	$banner = BannersExternal::where('user_id', '=', $this->userId)->where('project_id', '=', $this->projectId)->first();

    	if($banner){
    		$responce = $this->overwritePublication($banner->path);	
    	}else{
    		$responce = $this->newPublication();
    	}

    	return $responce;	
    }

    private function newPublication() {
    	$publication = new PublicationExternal();
        $publication->projectId = $this->projectId;
        $publication->userId = $this->userId;
        $publication->title = $this->title;
        $publication->description = $this->description;
    	$publication->newPublication();

        $this->link = $publication->prepareZipPackage();
        $this->publicationId = $publication->newPublicationId;

    	return false;
    }

    private function overwritePublication($hash) {
    	$publication = new PublicationExternal();
        $publication->projectId = $this->projectId;
        $publication->userId = $this->userId;
        $publication->title = $this->title;
        $publication->hash = $hash;
        $publication->description = $this->description;
    	$publication->overwritePublication();

        $this->link = $publication->prepareZipPackage();
        $this->publicationId = $publication->newPublicationId;

    	return false;
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

        $canPublish = $this->getPlanOptionValue('publish', $userPlan);
        $bannersLimit = $this->getPlanOptionValue('banners', $userPlan);

        $bannersCount = BannersExternal::where('user_id', '=', $this->userId)->count();

        if($canPublish && ($bannersCount < $bannersLimit)){
            return true;
        }

        return false;
    }
}