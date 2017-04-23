<?php namespace App\Modules\User;

use DB;
use Auth;
use App\User;
use App\Modules\Utils\Utils;
use App\Modules\Mailer\RegistrationMail;
use App\Modules\Models\ShareNoExist;
use App\Modules\Models\Share;
use App\Modules\User\UserRepository;

class ApiUserRepository extends UserRepository {

  
    public function findOrCreateUser($data)
    {
        return $this->createUser($data);
    }

    public function createUser($data, $roleId = 12)
    {
        $subdomain = Utils::createSubdomain($data['email']);

        $password = $this->createPassword($data['password']);

        $newUser = User::create([
            'email' => $data['email'],
            //'name' => $data['name'],
            'password' => bcrypt($password),
            'user_plans' => Utils::getTrialUserPlans(),
            'version' => env('app_version'),
            'download_project' => 1,
            'hash' => $this->generateHash($data['email']),
            'subdomain' => $subdomain,
            'subdomain_name' => $subdomain,
            'photo' => 'default',
            'active' => 1,
            'date' => date('Y-m-d H:i:s')
        ]);

        $this->attachRole($roleId, $newUser);

        $newUserId = $newUser->id;
        $this->createUserDirectory($newUserId);

        $this->checkSharedProjects($newUser->email, $newUserId);

        $this->checkAffiliateCookie($newUserId);

        $this->copyDefaultAvatar($newUserId);

        $this->addRegistrationPlan($newUser);

        $registrationData = array(
            'email' => $newUser->email,
            'pass' => $password
        );
        //$this->sendRegistrationMail($registrationData, $newUser->email);

        return $newUser;
    }

    protected function getCreatedPlanUserId($user) {
        return Auth::user()->id;
    }

    protected function getRegistrationPlanId() {
        return 3; //plan demo
    } 


}