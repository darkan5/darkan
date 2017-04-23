<?php

namespace App\Http\Foundation\Publications;

use Auth;
use File;

use App\Modules\Models\Banners;

trait PublicationCreator
{

    protected function getPublicationsByUser($userId){
        
        return Banners::where('user_id', '=', $userId)
                ->get();

    }

    protected function getPublicationDirectory($banner){

        if($banner->path == ''){
            return false;
        }

        return storage_path('app/publications/') . $banner->path;
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
