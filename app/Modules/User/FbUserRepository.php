<?php namespace App\Modules\User;

use DB;
use Auth;
use App\User;
use App\Modules\Utils\Utils;
use App\Modules\Mailer\RegistrationMail;
use App\Modules\Models\ShareNoExist;
use App\Modules\Models\Share;
use App\Modules\User\UserRepository;

class FbUserRepository extends UserRepository {

  
    public function findOrCreateUser($data)
    {
        $authUser = User::where('provider_id', $data->id)
                            ->orWhere('email', '=', $data->email)
                            ->first();

        if ( $authUser ) {
            return $authUser;
        } else {

            return $this->createUser($data);

        }
    }

    public function createUser($data, $roleId = 3)
    {
        $generatedPassword = Utils::generateRandomPassword();
        $subdomain = Utils::createSubdomain($data->email);
        
        $newUser = User::create([
            'email' => $data->email,
            'name' => $data->name or '';
            'provider_id' => $data->id,
            'password' => bcrypt($generatedPassword),
            'user_plans' => Utils::getTrialUserPlans(),
            'version' => env('app_version'),
            'lang' => $this->getUserLanguage(),
            'download_project' => 1,
            'hash' => $this->generateHash($data->email),
            'subdomain' => $subdomain,
            'subdomain_name' => $subdomain,
            'photo' => $data->avatar,
            'active' => 1,
            'date' => date('Y-m-d H:i:s')
        ]);

        $this->attachRole($roleId, $newUser);

        $newUserId = $newUser->id;
        $this->createUserDirectory($newUserId);

        $this->checkSharedProjects($newUser->email, $newUserId);

        $this->checkAffiliateCookie($newUserId);

        $this->addRegistrationPlan($newUser);

        $registrationData = array(
            'email' => $newUser->email,
            'pass' => $generatedPassword
        );
        //$this->sendRegistrationMail($registrationData, $newUser->email);

        return $newUser;
    }


}