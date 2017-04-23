<?php namespace App\Modules\Editor;

use App\Modules\Models\BannersExternal;
use App\Modules\Models\Projects;
use ZipArchive;
use File;
use stdClass;

class PublicationExternal extends Publication {

    protected $responseData = [];


    protected function isPublicationsLimitExcedeed($userId)
    {
        return false;
    }

    protected function getOwnerUserId()
    {
        return $this->userId;
    }


    protected function getTitle()
    {
        return $this->title;
    }

    protected function getDescription()
    {
        return $this->description;
    }

    protected function getThumb()
    {
        return 'thisFileDoesNotExists.png';
    }

    protected function getProjectId()
    {
        return $this->projectId;
    }

    protected function getPublicationPath($hash)
    {
        return config('app.publications_external_folder') . '/' . $hash . '/';
    }

    protected function getSkin()
    {
        $projectData = Projects::find($this->projectId);
        return $projectData->skin;
    }

    protected function changeUrlsAndMetatags($publicationPath, $publicationLink, $title, $description, $thumbFileName)
    {
        $this->prepareMetaTags($publicationPath, '',  $title, '', '');
    }

    public function overwritePublication() {
        $this->preparePublication(false, $this->hash);
    }

    public function prepareZipPackage()
    {
        // zip file name
        $zipPath = config('app.publications_external_folder') . $this->hash . '.zip';

        File::delete($zipPath);

        $projectPath = config('app.publications_external_folder') . $this->hash . '/';

        // make zip archive
        $zip = new ZipArchive();
        if ($zip->open($zipPath, ZIPARCHIVE::CREATE) !== TRUE) {
            exit ("Error creating zip file.");
        }

        $this->zipDir($zip, $projectPath);
        $zip->close();

        File::deleteDirectory($projectPath);

        return config('app.publications_external_link') . $this->hash . '.zip';
    }

    protected function addToDatabase($data)
    {

        $newPublicationRow = BannersExternal::firstOrNew(['path' => $data->hash]);
        $newPublicationRow->user_id = $data->ownUserID; 
        $newPublicationRow->project_id = $data->projectID; 
        $newPublicationRow->name = $data->title; 
        $newPublicationRow->summary = $data->description; 
        $newPublicationRow->path = $data->hash; 
        $newPublicationRow->save(); 

        $this->newPublicationId = $newPublicationRow->id_banner;

        return $newPublicationRow->id_banner;
    }



    protected function copyBannerIndexToPublicationFolder($publicationPath)
    {
        return false;
    }

    protected function prepareConfigJsonFile($projectPath, $userId, $projectId, $hash){

        $projectModel = $this->getProjectModel($projectPath, $userId, $projectId);

        $slides = array();

        foreach ($projectModel['pages'] as $pageModel) {

            $pageId = $pageModel->options->pageid;

            $slide = new stdClass();
            $slide->path = 'index.html';
            $slide->uuid = $pageId;
            $slide->thumbnail = 'exported_view/' . $pageId . '/pagethumb.jpg';

            array_push($slides, $slide);
        }

        $configPath = $projectPath . '/pre/config.json';
        $configContent = '"slides":' . json_encode($slides);

        $wp = fopen($configPath, 'w');
        fwrite($wp, $configContent);
        fclose($wp);
    }
	
}