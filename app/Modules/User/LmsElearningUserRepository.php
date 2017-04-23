<?php namespace App\Modules\User;

use DB;
use Auth;
use App\User;
use App\Modules\Utils\Utils;
use App\Modules\Mailer\RegistrationMail;
use App\Modules\Models\ShareNoExist;
use App\Modules\Models\Share;
use App\Modules\Models\LmsInfo;
use App\Modules\User\UserRepository;
use App\Modules\Models\LmsUserPortal;

class LmsElearningUserRepository extends UserRepository {

  
    public function findOrCreateUser($data)
    {
        return $this->createUser($data);
    }

    public function createUser($data, $roleId = 11) // Lms user
    {
        $subdomain = Utils::createSubdomain($data['email']);

 
        $password = ((isset($data['password']) && $data['password']) != '') ? $data['password'] : $this->generatePassword();

        $newUser = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => bcrypt($password),
            'user_plans' => Utils::getTrialUserPlans(),
            'version' => env('app_version'),
            'download_project' => 1,
            'hash' => $this->generateHash($data['email']),
            'subdomain' => $subdomain,
            'lang' => $this->getUserLanguage(),
            'subdomain_name' => $subdomain, 
            'photo' => 'default',
            'active' => 1,
            'date' => date('Y-m-d H:i:s')
        ]);

        $this->attachRole($roleId, $newUser);

        $this->registerUserToPortal($newUser);

        $newUserId = $newUser->id;
        $this->createUserDirectory($newUserId);

        $this->checkSharedProjects($newUser->email, $newUserId);

        $this->checkAffiliateCookie($newUserId);

        $this->copyDefaultAvatar($newUserId);

        $registrationData = array(
            'email' => $newUser->email,
            'name' =>$newUser->name,
            'owner_id' => Auth::user()->id,
            'pass' => $password
        );

        $lmsInfoData = LmsInfo::where('user_id', '=', Auth::user()->id)->first();

        $this->sendLmsElearningRegistrationMail($registrationData, $newUser->email, $lmsInfoData);

        return $newUser;
    }

    public function sendLmsElearningRegistrationMail($registrationData, $email, $lmsInfoData) {

        $mailer = new RegistrationMail();
        $mailer->sendSubdomainRegistrationMail($registrationData, $email, $lmsInfoData);

    }

    public function registerUserToPortal($user)
    {

    }

}