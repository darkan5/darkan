<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;
use App\Modules\Models\ScormDataGuest;
use App\Modules\Models\GroupBanner;
use App\Modules\Models\LmsInfo;
use App\Modules\Models\PortalSkins;
use App\Modules\Models\LmsInvitationRequests;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Utils\Utils;
use App\Http\Requests\DefaultRequest;
use File;
use Input;
use stdClass;
use App\Modules\Responce\ResponceFactory;
use App\Modules\Mailer\LmsAccessRequestMail;

class PortalController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}

	public function index()
	{
		if (Auth::check()) {

			$user = Auth::user();

			$portalSettings = LmsInfo::where('user_id', '=', $user->id)->first();
			if (!$portalSettings) {
				$portalSettings = Utils::getDefaultPortalSettings();
			}

			$portalSkins = PortalSkins::all();
			foreach ($portalSkins as $skin) {
				if ($skin->id == $portalSettings->skin) {
					$skin->active = true;
                    $portalSettings->skinName = $skin->name;
				} else {
					$skin->active = false;
				}
			}


			$currenciesArray = $this->getCurrenciesArray();

			$userPublications = $this->getUserPublications(Auth::user()->id);
			return view('web.pages.portal')
						->with('userPhoto', $this->getUserPhoto(Auth::user()->id))
						->with('subdomainName', $user->subdomain_name)
						->with('currenciesArray', $currenciesArray)
						->with('portalSkins', $portalSkins)
						->with('portalSettings', $portalSettings)
						->with('userPublications', $userPublications);

		} else {
			return redirect()->guest('/login');
		}
	}

	private function getCurrenciesArray()
	{
		$currencies = array();
		$pricingData = config('prices');

		foreach ($pricingData as $key => $value) {
			if (isset($value['currency'])) {
				array_push($currencies, $value['currency']);
			}
		}

		return $currencies;
	}

	public function givePortalAccess($accessHash)
	{
		$accessData = LmsInvitationRequests::where('hash', '=', $accessHash)->first();
		if ($accessData) {
			$userInPortal = LmsUserPortal::where('user', '=', $accessData->user_id)
								->where('portal_admin', '=', $accessData->owner_id)
								->first();


			$requestSender = User::find($accessData->user_id);

			if (!$userInPortal) {
				$setUserToPortal = new LmsUserPortal();
				$setUserToPortal->user = $accessData->user_id;
				$setUserToPortal->portal_admin = $accessData->owner_id;
				$setUserToPortal->save();


				$portalAdmin = User::find($accessData->owner_id);
				if ( $portalAdmin && $requestSender ) {
					$subdomainUrl = config('app.protocol_not_secure')
									. $portalAdmin->subdomain
									. '.'
									. config('app.domain')
									. config('app.folder');

					$mailing = new LmsAccessRequestMail();
					$mailing->sendLmsAccessGranted($subdomainUrl, $requestSender->email);
				}
			}

			return view('web.pages.portal.portalaccessgranted')
					->with('requestSender', $requestSender->email);
		}
		return view('web.pages.portal.portalaccessgrantederror');

	}

	public function getPortalSettings(DefaultRequest $request)
	{
		if (Auth::check()) {
			$portalSettings = LmsInfo::where('user_id', '=', Auth::user()->id)->first();
			if (!$portalSettings) {
				$portalSettings = Utils::getDefaultPortalSettings();
			}
		
			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('portalsettings' => $portalSettings);

		} else {
			$responce = ResponceFactory::createResponceFault();
		}

		echo $responce->toJSON();
	}

	public function changePortalSettings(DefaultRequest $request)
	{
		if (Auth::check()) {
			$portalSettings = LmsInfo::where('user_id', '=', Auth::user()->id)->first();
			if (!$portalSettings) {
				$portalSettings = new LmsInfo();
				$portalSettings->user_id = Auth::user()->id;
			}

			$params = Input::all();
			$params = json_decode( $params['params'] );

		
			$portalSettings->{$params->settingId} = $params->settingValue;
			$portalSettings->save();

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => $params->settingId .': '. $params->settingValue);

		} else {
			$responce = ResponceFactory::createResponceFault();
		}

		echo $responce->toJSON();
	}

	public function changePortalSkin(DefaultRequest $request)
	{
		if (Auth::check()) {

			$portalSettings = LmsInfo::firstOrNew(['user_id' => Auth::user()->id]);

			// $portalSettings = LmsInfo::where('user_id', '=', Auth::user()->user_id)->first();
			// if (!$portalSettings) {
			// 	$portalSettings = new LmsInfo();
			// 	$portalSettings->user_id = Auth::user()->user_id;
			// }

			$params = Input::all();
			$params = json_decode( $params['params'] );
			$skinName = $params->skinName;

			$skinData = PortalSkins::where('name', '=', $skinName)->first();

			if ($skinData) {

				$portalSettings->skin = $skinData->id;
				$portalSettings->save();
			} else {
				$responce = ResponceFactory::createResponceFault();
			}
		
			$responce = ResponceFactory::createResponceResult();

		} else {
			$responce = ResponceFactory::createResponceFault();
		}

		echo $responce->toJSON();
	}

	public function getUserPhoto($userId)
	{
		$user = User::where('id', '=', $userId)->first();
		if ($user) {
			return $user->photo;
		} else {
			return 0;
		}
	}

	public function getUserPublications($userId)
	{
		$userPublications = Banners::where('user_id', '=', $userId)->orderBy('ord')->get();
		foreach($userPublications as $publication) {
            $publication->summary_shorten = strlen($publication->summary) >= 150 ? substr($publication->summary, 0, 150) . "..." : $publication->summary;
            $publication->show_readmore = strlen($publication->summary) >= 150 ? true : false;
		}
		return $userPublications;
	}

	public function showHide($bannerId)
	{
		$publication = Banners::where('user_id', '=', Auth::user()->id)
								->where('id_banner', '=', $bannerId)
								->first();

		if ($publication) {
			$publication->active = $publication->active == 0 ? 1: 0;
			$publication->save();
		}

		$this->showReturnData();
	}

	private function deletePublicationScormData($publicationId) {
		ScormData::where('course_id', '=', $publicationId)->delete();
	}

	private function deletePublicationScormDataGuest($publicationId) {
		ScormDataGuest::where('course_id', '=', $publicationId)->delete();
	}

	private function deletePublicationFromGroups($publicationId) {
		GroupBanner::where('id_banner', '=', $publicationId)->delete();
	}

	private function reorderAllMyPublications() {

		$allMyPublications = Banners::where('user_id', '=', Auth::user()->id)
										->orderBy('ord')
										->get();

		$orderIterator = 0;
		foreach($allMyPublications as $publication) {
			$publication->ord = $orderIterator;
			$publication->save();
			$orderIterator++;
		}
	}

	public function deletePublication($publicationId)
	{
		$publication = Banners::where('user_id', '=', Auth::user()->id)
								->where('id_banner', '=', $publicationId)
								->first();

		if ($publication) {
			$publicationId = $publication->id_banner;

        	// delete scorm data
        	$this->deletePublicationScormData($publicationId);

        	// delete scorm data guest
        	$this->deletePublicationScormDataGuest($publicationId);

        	// delete banners from group-banner pairs
        	$this->deletePublicationFromGroups($publicationId);

        	// remove publication directory
			$hash = $publication->path;
        	$publicationPath = storage_path('/app/publications/' . $hash . '/');
        	$removeDirectory = File::deleteDirectory($publicationPath);

        	// remove from OCS
        	$this->removeFromOCS($publicationId);

        	// remove publication from banners_projects table
			$publication->delete();

        	// delete banners from group-banner pairs
        	$this->reorderAllMyPublications();
		}

		$this->showReturnData();

	}

	private function removeFromOCS () {
		// $ocs = new OCS($ocs_container_projects, $ocs_container_banners);
  //       $ocs->delete($ocs->container_banners,  'banners/' . $hash . '/backup.zip');
	}

	private function showReturnData()
	{
		echo '{}';
	}

	public function sortPublication()
	{
		$params = json_decode(Input::get('params'));

		$sortOrder = $params->sortOrder;

        
     	$sortedPublications = Banners::whereIn('path', $sortOrder)->get();

        foreach ($sortOrder as $index => $hash) { 	
        	foreach ($sortedPublications as $publication) {
        		if ($publication->path == $hash) {
        			$publication->ord = $index;
        			$publication->save();
        		}
        	}
        } 






		$result = true;

		if($result != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => $result, 'sortOrder' => $sortOrder);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	

}
