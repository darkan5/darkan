<?php

namespace App\Http\Controllers\Lms;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Banners;
use App\Modules\Models\Users;
use App\Modules\Models\MailingUsers;

use App\Modules\Plans\UserPlanModule;



class LmsIndexController extends Controller
{

    public function index(){

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return view('lms.lms_no_access_no_plan');
        }

        $planOptions = json_decode($userPlan->plan_options);

        $lmsAccess = isset($planOptions->adminPanel) ?  filter_var($planOptions->adminPanel, FILTER_VALIDATE_BOOLEAN) : false;

        if(!$lmsAccess){
            return view('lms.lms_no_access_no_option');
        }

        $maxCourses = isset($planOptions->banners) ? $planOptions->banners : false;
        $maxUsers = isset($planOptions->lms_users) ? $planOptions->lms_users : false;
        $maxMailingUsers = isset($planOptions->mailing_users) ? $planOptions->mailing_users : false;



    	$coursesList = $this->getPublications();
    	$usersEmearningList = $this->getElearningUsers();
    	$usersMailingList = $this->getMailngUsers();

        return view('lms.index')
		        		->with('maxCourses', $maxCourses)
		        		->with('maxUsers', $maxUsers)
		        		->with('maxMailingUsers', $maxMailingUsers)
		        		->with('coursesList', $coursesList)
		        		->with('usersEmearningList', $usersEmearningList)
		        		->with('usersMailingList', $usersMailingList);
    }

    // public function publications(){

    // 	$coursesList = $this->getPublications();

    //     return view('lms.publications.publications')
		  //       		->with('coursesList', $coursesList);
    // }

    protected function getPublications()
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->orWhere('primary', '=', 1)
                ->get();

    }

    protected function getElearningUsers()
    {
        $users = Users::select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'users.photo')
                    ->leftJoin('lms_user_portal', 'lms_user_portal.user', '=', 'users.id')
                    ->where('lms_user_portal.portal_admin', '=', Auth::user()->id)
                    ->get();

        return $users;
    }

    protected function getMailngUsers()
    {
        $mailingUsers = MailingUsers::where('owner_id', '=', Auth::user()->id)
                    ->get();

        return $mailingUsers;
    }


    public function elearningUsers(){


    	$usersList = [];

        return view('lms.elearnig.users')
		        		->with('usersList', $usersList);
    }

    public function elearningGroups(){


    	$groupsList = [];

        return view('lms.elearnig.groups')
		        		->with('groupsList', $groupsList);
    }

    public function mailingUsers(){


    	$usersList = [];

        return view('lms.mailing.users')
		        		->with('usersList', $usersList);
    }

    public function mailingGroups(){


    	$groupsList = [];

        return view('lms.mailing.groups')
		        		->with('groupsList', $groupsList);
    }

    public function elearningUserById(){


    	$user = [];

        return view('lms.elearnig.user')
		        		->with('user', $user);
    }

    public function mailingUserById(){


    	$user = [];

        return view('lms.mailing.user')
		        		->with('user', $user);
    }

    

    

  
}
