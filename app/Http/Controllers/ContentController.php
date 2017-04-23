<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Modules\Models\Banners;
use App\Modules\Models\LmsInfo;
use App\Modules\Utils\Utils;
use DOMDocument;

class ContentController extends SubdomainController {

	public function __construct()
	{
		// $this->middleware('auth');
	}


	protected function getContentOwnerByHash($hash)
	{
		$publication = Banners::where('path', '=', $hash)->first();
		if ($publication) {
			$publicationOwner = $publication->user;
			if ($publicationOwner) {
				return $publicationOwner;
			}
		}

		return false;
	}

	public function showContent($contentHash)
	{
		$lmsOwner = $this->getContentOwnerByHash($contentHash);

		if ($lmsOwner) {
			

			// get subdomain owner
			$subdomainOwnerId = $lmsOwner->id;
			$accessSubView = $this->getAccessTypeSubview($subdomainOwnerId, 'content');


			$publicationData = $this->getPublicationByHash($contentHash);

			if ($publicationData) {

				$subViewType = explode('.', $accessSubView);
				$subViewType = end($subViewType);

				if ($subViewType != 'accessgranted') {

					$subdomainUrl = config('app.protocol_not_secure') 
									. $lmsOwner->subdomain
									. '.'
									. config('app.domain')
									. config('app.folder');

					return redirect($subdomainUrl);


				}
				
				$this->incrementViews($contentHash);

				$pathToIndex = storage_path('/app/publications/' . $contentHash . '/index.html');

				if (file_exists($pathToIndex)) {
					if ($publicationData->isold == 1) {
						
						return $this->showOldContent($contentHash);

					} else {

						return $this->showNewContent($contentHash);
					}
				}
			}
		}

		return $this->showNotExistsContent();

	}

	protected function showNotExistsContent()
	{
		return view('web.pages.content.contentnotexists');
	}

	protected function showNewContent($contentHash)
	{
		$content = file_get_contents(storage_path('/app/publications/' . $contentHash . '/index.html'));

		$publicationData = $this->getPublicationByHash($contentHash);

		$imageDimentions = array(0, 0);

		$thumbPath = config('app.publications_folder') . $contentHash . '/thumb/thumb.png';
		if (file_exists($thumbPath)) {
			$imageDimentions = getimagesize($thumbPath);
		}
		

		$content = $this->includeSeoContent($content, $contentHash);

		return view('web.pages.content.content')
					->with('content', $content)
					->with('imageDimentions', $imageDimentions)
					->with('publicationData', $publicationData);
	}

	protected function showOldContent($contentHash)
	{
		$iframePath = config('app.storagPublicationsLink') . $contentHash . '/index.html';

		return view('web.pages.content.contentold')
					->with('iframePath', $iframePath);
	}

	public function showEmbededContent($contentHash)
	{
		$this->incrementViews($contentHash);

		$content = file_get_contents(storage_path('/app/publications/' . $contentHash . '/index.html'));

		return view('web.pages.content.contentembeded')
					->with('content', $content);
	}

	public function showContentMailingUser($contentHash)
	{
		$this->incrementViews($contentHash);
		
		$content = file_get_contents(storage_path('/app/publications/' . $contentHash . '/index.html'));

		$content = $this->includeSeoContent($content, $contentHash);

		return view('web.pages.content.content')
					->with('content', $content);
	}


	public function incrementViews($contentHash)
	{
		$publicationData = Banners::where('path', '=', $contentHash)->first();
		// if (!Auth::check() || Auth::user()->user_id != $publicationData->user_id) {
			$publicationData->views = ++$publicationData->views;
			$publicationData->save();
		// }
		
	}

	protected function getPublicationByHash($hash)
	{
		return Banners::where('path', '=', $hash)->first();
	}

	protected function includeSeoContent($wholeContent, $hash)
	{
		$seomapPath = storage_path('/app/publications/' . $hash . '/seomap.json');

        $robotContent = '';

		if (file_exists($seomapPath)) {
			
	        $seomap = json_decode( file_get_contents($seomapPath) );


	        if( $seomap ){

	            foreach ($seomap as $pageOrder => $pageComponents) {

	            	$robotContent .= '<section>';

	                foreach ($pageComponents as $componenent) {


	            		$type = $componenent->type;
	            		$content = $componenent->content;

	            		$pageOrderLink = url('/content/' . $hash . '?darkan_p=' . $pageOrder);

	            		switch ($type) {
	                         case 'image':
	                             $robotContent .= '<a target="_self" href="'. $pageOrderLink .'"><img src="'. $content .'" style="display:none;"/></a>';	
	                             break;

	                         case 'text':
	                             $robotContent .= '<a target="_self" href="'. $pageOrderLink .'"><article style="display:none;">'. $content .'</article></a>';
	                             break;    
	                        
	                         default:
	     
	                             break;
	                     }
	            	}

	            	$robotContent .= '</section>';
	            }
	        }	
		}


		$wholeContent = str_replace('[-=ROBOT_CONTENT=-]', $robotContent, $wholeContent);

		return $wholeContent;
	}
}