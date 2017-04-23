<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Modules\Models\Banners;
use App\Modules\Models\LmsInfo;
use App\Modules\Utils\Utils;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\LmsUserPortalPaid;
use App\Modules\Models\LmsInvitationRequests;
use App\Modules\Models\ScormData;
use App\Modules\Models\BannersCategories;
use App\Modules\Models\BannersToCategories;
use App\Modules\Responce\ResponceFactory;
use Session;
use Lang;
use App\Modules\Mailer\LmsAccessRequestMail;

class SubdomainController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
		// $this->index();
	}

	public function sendAccessRequest()
	{
		$lastVisitedSubdomain = session('lastVisitedSubdomain');
		$owner = $this->getSubdomainOwner($lastVisitedSubdomain);

		if (Auth::check()) {

			if ($owner) {
				$invitation = LmsInvitationRequests::where('owner_id', '=', $owner->id)
												->where('user_id', '=', Auth::user()->id)
												->first();
				if ($invitation) {
					// invitation request already sent
					
					$invitation->mails_sent++;
					$invitation->save();

					$responce = ResponceFactory::createResponceResult();
            		$responce->data = array('message' => Lang::get('portal.invitationHasBeenSent'));

            		$invitationHash = $invitation->hash;
				} else {
					$newRequest = new LmsInvitationRequests();
					$newRequest->user_id = Auth::user()->id;
					$newRequest->owner_id = $owner->id;
					$newRequest->mails_sent = 1;
					$newRequest->hash = Utils::generateUniqueHash();
					$newRequest->save();

					$responce = ResponceFactory::createResponceResult();
            		$responce->data = array('message' => Lang::get('portal.invitationHasBeenSent'));

            		$invitationHash = $newRequest->hash;
				}

				$mailing = new LmsAccessRequestMail();
				$mailing->sendLmsAccessRequest($invitationHash, $owner->email);

				echo $responce->toJSON();
			}
		} else {
			$responce = ResponceFactory::createResponceFault();
            $responce->data = array('error' => 1);
		}
	}


	public function getAccessRequest($subdomainOwnerId)
	{
		if (Auth::check()) {
			$invitation = LmsInvitationRequests::where('owner_id', '=', $subdomainOwnerId)
											->where('user_id', '=', Auth::user()->id)
											->first();
			return $invitation;	
		}
		return false;
	}

	private function showReturnData($msg)
	{
		if (!$msg) {
			echo '{}';
			return;
		}
		echo json_encode($msg);
	}

	private function getCustomView($lmsInfo)
	{
		$customView = '';
		if (isset($lmsInfo->custom_view)) {
			$customView = $lmsInfo->custom_view;
			if ($customView != '') {
				$customView = '.custom.' . $customView;
			}	
		}

		return $customView;
	}

	public function indexSubdomain($subdomainName)
	{
		// $this->saveIntendedUrl();
		session(['lastVisitedSubdomain' => $subdomainName]);

		// get subdomain owner
		$owner = $this->getSubdomainOwner($subdomainName);

		if ($owner) {

			$subdomainOwnerId = $owner->id;

			$portalSettings = LmsInfo::where('user_id', '=', $subdomainOwnerId)->first();
			if (!$portalSettings) {
				$portalSettings = Utils::getDefaultPortalSettings();
				$portalSettings->skinName = 'default';
			} else {
				$portalSettings->skinName = $portalSettings->skindata->name;
			}

			if ($portalSettings->paypal_mail == '') {
				$merchantMail = (string)env('paypalMerchant');
			} else {
				$merchantMail = $portalSettings->paypal_mail;
			}

			if ($portalSettings->redirect_url == '') {
				$redirectUrl = config('app.protocol_not_secure') . $subdomainName . '.' . config('app.domain')  . config('app.folder');
			} else {
				$redirectUrl = $portalSettings->redirect_url;
			}

			if ($portalSettings->terms_link == '') {
				$termsLink = (string)env('TERMS_LINK');
			} else {
				$termsLink = $portalSettings->terms_link;
			}

			// if ($portalSettings->force_lang != '') {
			// 	app()->setLocale($portalSettings->force_lang);
			// }


			$customView = $this->getCustomView($portalSettings);

			// get this user publications
			$userPublications = $this->getUserPublications($subdomainOwnerId);

			$accessSubView = $this->getAccessTypeSubview($subdomainOwnerId, 'subdomain');

			$uniqueHash = md5(uniqid(rand(), true));

			$userCoursesStatus = $this->getUserCoursesStatus();

			return view('web.pages.subdomain'.$customView.'.subdomain')
						->with('userPhoto', $this->getUserPhoto($subdomainOwnerId))
						->with('subdomainViewName', $owner->subdomain_name)
						->with('subdomainName', $owner->subdomain)
						->with('accessSubView', $accessSubView)
						->with('uniqueHash', $uniqueHash)
						->with('merchantMail', $merchantMail)
						->with('redirectUrl', $redirectUrl)
						->with('termsLink', $termsLink)
						->with('portalSettings', $portalSettings)
						->with('subdomainOwnerId', $subdomainOwnerId)
						->with('invitation', $this->getAccessRequest($subdomainOwnerId))
						->with('portalPrice', $this->getPortalPrice($owner))
						->with('userPublications', $userPublications)
						->with('userCoursesStatus', $userCoursesStatus);
		} else {

			if (Auth::check()) {
				$mineSubdomain = Auth::user()->subdomain;
				$subdomainUrl = config('app.protocol_not_secure') 
								. $mineSubdomain 
								. '.'
								. config('app.domain')
								. config('app.folder');
				return view('web.pages.subdomain.subdomainnotfound')
						->with('subdomainUrl', $subdomainUrl)
						->with('mineSubdomain', $mineSubdomain);
			} else {
				return view('web.pages.subdomain.subdomainnotfoundnotlogged');
			}
		}

	}

	protected function getPortalPrice($owner) 
	{
		$lmsInfoData = LmsInfo::where('user_id', '=', $owner->id)->first();

		if ($lmsInfoData) {
			return $lmsInfoData->price;
		}

		return 0;
	}

	protected function saveIntendedUrl()
	{
		// save inteneded url
		session(['intentendedSubdomain' => session('lastVisitedSubdomain')]);
	}

	protected function userIsInvited($subdomainOwnerId)
	{
		if (Auth::check()) {

			if ($subdomainOwnerId == Auth::user()->id) {
				return true;
			}

			$lmsUsers = LmsUserPortal::where('portal_admin', '=', $subdomainOwnerId)->get();

			foreach ($lmsUsers as $lmsUser) {
				if ($lmsUser->user == Auth::user()->id) {
					return true;
				}
			}

		}
		return false;
	}

	protected function isOwner($userId)
	{
		if (Auth::check()) {
			return $userId == Auth::user()->id;
		}
		return false;
	}

	protected function getAccessTypeSubview($subdomainOwnerId, $subViewFolder)
	{
		$lmsInfoData = LmsInfo::where('user_id', '=', $subdomainOwnerId)->first();



		if ($lmsInfoData) {
			$customView = $this->getCustomView($lmsInfoData);

			if ($this->userPaidForAccess($subdomainOwnerId)) {
				return 'web.pages.'. $subViewFolder . $customView .'.accessgranted';
			}

			// portal need payment and user did not paid
			if ($lmsInfoData->paid && !$this->userPaidForAccess($subdomainOwnerId)) {
				$this->saveIntendedUrl();

				return 'web.pages.'. $subViewFolder . $customView .'.needpayment';
			}

			// only invited users and user is not invited
			if ($lmsInfoData->state && !$this->userIsInvited($subdomainOwnerId)) {
				$this->saveIntendedUrl();
				return 'web.pages.'. $subViewFolder . $customView .'.needinvitation';
			}

			// need login and user is not logged in
			if ($lmsInfoData->login && !Auth::check()) {
				$this->saveIntendedUrl();
				return 'web.pages.'. $subViewFolder . $customView .'.needlogin';
			}
		}

		return 'web.pages.'. $subViewFolder . '.accessgranted';
	}

	protected function userPaidForAccess($subdomainOwnerId)
	{
		if (Auth::check()) {

			if ($subdomainOwnerId == Auth::user()->id) {
				return true;
			}

			$userPaid = LmsUserPortalPaid::where('portal_admin', '=', $subdomainOwnerId)
											->where('user', '=', Auth::user()->id)
											->where('paid', '=', 1)
											->first();

			if ($userPaid) {
				return true;
			}

		}
		return false;
	}

	protected function getSubdomainOwner($subdomainName)
	{
		$user = User::where('subdomain', '=', $subdomainName)->first();
		return $user;
	}


	public function getUserById($userId)
	{
		$user = User::where('id', '=', $userId)->get();
		return $user;
	}

	public function getUserPublications($userId)
	{
		$userPublications = Banners::where('user_id', '=', $userId)->orderBy('ord')->get();
		foreach($userPublications as $publication) {
            $publication->summary_shorten = strlen($publication->summary) >= 150 ? substr($publication->summary, 0, 150) . "..." : $publication->summary;
            $publication->show_readmore = strlen($publication->summary) >= 150 ? true : false;


            $bannerCategory = BannersToCategories::where('course_id', '=', $publication->id_banner)->first();
            if ($bannerCategory) {
            	$publication->category = $bannerCategory->category;
            }

            if (Auth::check()) {
            	$loggedUser = Auth::user()->id;
            	$userStatus = ScormData::where('user_id', '=', $loggedUser)
            									->where('course_id', '=', $publication->id_banner)
            									->first();
				if ($userStatus) {
					$publication->userStatus = $userStatus;
					$publication->userStatus->icon = Utils::getIconByCourseStatus($userStatus->course_status);
					$publication->userStatus->course_status = Utils::getCourseStatusString($userStatus->course_status);
				} else {
					$publication->userStatus = false;
				}
            }

		}
		return $userPublications;
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


	public function redirectToMainPage()
	{
		die('wow');
	}

	private function getOwnerCourses() {

		$userId = Auth::user()->id;

		$coursesIDArray = array();

		$allMyCourses = Banners::where('user_id', '=', $userId)->get();
		foreach ($allMyCourses as $course) {
			$coursesIDArray[] = $course['id_banner'];
		}

		return $coursesIDArray;
	}

	private function getUserCoursesStatus() {

		

		$userCourses = array();

		if(!Auth::user()){
			return $userCourses;
		}

		$userID = Auth::user()->id;

		$ownerCourses = $this->getOwnerCourses();

		

		$coursesData = ScormData::whereIn('course_id', $ownerCourses)
									->where('user_id', '=', $userID)
									->get();


		foreach ($coursesData as $course) {
			$bannerData = Banners::find($course['course_id']);

			$userCourses[] = array(
				'courseID' 					=> $course['course_id'],
				'attempt_id' 				=> $course['id'],
				'courseName' 				=> $bannerData['name'],
				'photo' 					=> $bannerData['thumb'],
				'courseStatus' 				=> $course['course_status'],
				'coursePoints' 				=> $course['user_score'],
				'courseLastVisit' 			=> $course['modify_date']
			);
		}

		return $userCourses;
	}
}
