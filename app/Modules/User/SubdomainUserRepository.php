<?php namespace App\Modules\User;

use DB;
use Auth;
use App\User;
use App\Modules\Utils\Utils;
use App\Modules\Mailer\RegistrationMail;
use App\Modules\Models\ShareNoExist;
use App\Modules\Models\Share;
use App\Modules\User\UserRepository;
use App\Modules\Models\LmsUserPortal;

class SubdomainUserRepository extends UserRepository {

  
    public function findOrCreateUser($data)
    {
        return $this->createUser($data);
    }

    public function createUser($data, $roleId = 11) // Lms user
    {
        $subdomain = Utils::createSubdomain($data['email']);

        $newUser = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
            'user_plans' => Utils::getTrialUserPlans(),
            'version' => env('app_version'),
            'download_project' => 1,
            'hash' => $this->generateHash($data['email']),
            'subdomain' => $subdomain,
            'lang' => $this->getUserLanguage(),
            'subdomain_name' => $subdomain,
            'owner_id' => $data['sid'],
            'photo' => 'default',
            'active' => 1,
            'date' => date('Y-m-d H:i:s')
        ]);

        $this->attachRole($roleId, $newUser);

        $this->registerUserToPortal($data, $newUser);

        $newUserId = $newUser->id;
        $this->createUserDirectory($newUserId);

        $this->checkSharedProjects($newUser->email, $newUserId);

        $this->checkAffiliateCookie($newUserId);

        $this->copyDefaultAvatar($newUserId);

        $registrationData = array(
            'email' => $newUser->email,
            'owner_id' => $data['sid'],
            'username' => $data['username'],
            'pass' => $data['password']
        );
        $this->sendRegistrationMail($registrationData, $newUser->email);

        return $newUser;
    }


    public function sendRegistrationMail($registrationData, $receiver) {
        $mailer = new RegistrationMail();
        $mailer->sendRegistrationMail($registrationData, $receiver);
    }

    public function registerUserToPortal($params, $newUser)
    {
        $ownerId = $params['sid'];
        $newUserName = $params['username'];
        $newUserId = $newUser->user_id;

        $userPortalRow = new LmsUserPortal();

        $userPortalRow->portal_admin = $ownerId;
        $userPortalRow->user = $newUserId;
        $userPortalRow->user_name = $newUserName;
        $userPortalRow->save();

    }

}