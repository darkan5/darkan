<?php namespace App\Modules\Plans;

use Auth;
use DateTime;
use App\Modules\Models\PlansUsers;
use App\Modules\Models\UserToUser;
use Carbon\Carbon;

class UserPlanModule {

	public static function hasPlan() {

		return self::getUserPlan() ? true : false;
	}

    public static function getUserPlanByDirectorsId($directorsIds) {
        return self::getUserPlan($directorsIds);
    }

    public static function getUserPlan() {

        $userId = Auth::user()->id;

        return self::getUserPlanByUserId($userId);
    }

	public static function getUserPlanByUserId($userId) {

        // if(count($directorsIds) == 0){

        //     $directors = UserToUser::where('user_id', '=', Auth::user()->id)->get();

        //     if(count($directors) == 0){
        //        return self::getFakePlan();
        //     }

        //     $directorsIds = array();

        //     foreach ($directors as  $director) {
        //         array_push($directorsIds, $director->director_id);
        //     }
        // }


        // $now = date('Y-m-d H:i:s');

        $plansUsers = PlansUsers::where('user_id', '=', $userId)
                                    ->where('active', '=', true)
        							//->where('paid', '=', true)
        							->get();


    

        if(count($plansUsers) == 0){
           return self::getFakePlan();
        }

        $activePlanUser = self::getFakePlan();

        $reversePlansUsers = $plansUsers->reverse();

        foreach ($reversePlansUsers as $planUser){

            $expirationResult = self::getExpirationResult($planUser->start_date, $planUser->expiration_date);

            if($expirationResult){

                return $planUser;
            }
        } 

        return self::getFakePlan();

    }

    private static function getExpirationResult($startDate, $expirationDate) {

    	$now = time();
		$first = DateTime::createFromFormat('Y-m-d H:i:s', $startDate)->getTimestamp();
		$second = DateTime::createFromFormat('Y-m-d H:i:s', $expirationDate)->getTimestamp();

		if ($now >= $first && $now <= $second)
		{
		    return true;
		}

		return false;
    }

    public static function getFakePlan() {

    	// Albo ustawienie domyślnego planu bez uprawnień

    	return false;

        // $plansUsers = new PlansUsers();
        // $plansUsers->start_date = new Carbon();
        // $plansUsers->expiration_date = new Carbon();
        // return $plansUsers;
    }
}