<?php

namespace App\Http\Controllers\Reseler;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\ChangePartnerReaportRequest;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use DateTime;
use App\Modules\Models\UsersToReselersRabats;

class ReselerControllerPlansUsersSale extends Controller
{
	protected $currency_id = 1;

    public function getUsersList($start_date = false, $end_date = false, $info = '- aktualnie wybrana jest data od początku do końca tego miesiąca'){

    	Carbon::setLocale('pl');
		CarbonInterval::setLocale('pl');

    	$start_date = $start_date ? $start_date : Carbon::now()->startOfMonth();
		$end_date = $end_date ? $end_date : Carbon::now()->endOfMonth();

		$usersToDistributor = $this->getSailedPlansUserByPartnerUser($start_date, $end_date);

		
		$darkanSoldo = 0;

		foreach ($usersToDistributor as $userToPromoCode) {

			$darkanSoldo += $userToPromoCode->plan_cost_to_pay_with_rabat;
    	}

    	$soldo = 0;

    	$usersToDistributorsRabats = UsersToReselersRabats::where('user_id', '=', Auth::user()->id)
    									->where('start_date', '>=', $start_date)
    									->where('expiration_date', '<=', $end_date)
    									->where('currency_id', '=', $this->currency_id)
    									->get();

    	$maxRabat = UsersToReselersRabats::where('user_id', '=', Auth::user()->id)
    									->where('start_date', '>=', $start_date)
    									->where('expiration_date', '<=', $end_date)
    									->where('amount', '>=' , 0)
    									->where('amount', '<=' , $darkanSoldo)
    									->where('currency_id', '=', $this->currency_id)
    									->orderBy('amount', 'desc')
    									->first();


    	if($maxRabat){
    		$soldo = $darkanSoldo * $maxRabat->rabat / 100;
    	}
    									


    	$timeAmount = Carbon::createFromFormat('Y-m-d H:i:s', $start_date)->diff(Carbon::createFromFormat('Y-m-d H:i:s', $end_date));
		$timeAmountForHumans = CarbonInterval::create($timeAmount->y, $timeAmount->m, 0,  $timeAmount->d, $timeAmount->h, $timeAmount->i, $timeAmount->s);  // 2 years 5 weeks 1 day 1 hour 2 minutes 7 seconds

        return view('reseler.users.saled_plans_user_by_rabat_list')
        			->with('info', $info)
        			->with('start_date', $start_date)
					->with('end_date', $end_date)
					->with('darkanSoldo', $darkanSoldo)
					->with('soldo', $soldo)
					->with('timeAmountForHumans', $timeAmountForHumans)
        			->with('usersToDistributor', $usersToDistributor)
        			->with('usersToDistributorsRabats', $usersToDistributorsRabats)
        			->with('maxRabat', $maxRabat);
    }

    public function changeUsersList(ChangePartnerReaportRequest $request){


        $start_date = $request->start_date;
		$end_date = $request->end_date;

		return $this->getUsersList($start_date, $end_date, '');
    }

    public function changeUsersListToday(){

		$start_date = Carbon::now()->startOfDay();
		$end_date = Carbon::now()->endOfDay();

		return $this->getUsersList($start_date, $end_date, '- aktualnie wybrana jest dzisiejsza data');
	}

	public function changeUsersListWeek(){

		$start_date = Carbon::now()->startOfWeek();
		$end_date = Carbon::now()->endOfWeek();

		return $this->getUsersList($start_date, $end_date, '- aktualnie wybrana jest data od początku do końca tego tygodnia');
	}

	public function changeUsersListLastWeek(){

		$start_date = Carbon::now()->subWeek()->startOfWeek();
		$end_date = Carbon::now()->subWeek()->endOfWeek();

		return $this->getUsersList($start_date, $end_date, '- aktualnie wybrana jest data od początku do końca poprzedniego tygodnia');
	}

	public function changeUsersListMonth(){

		$start_date = Carbon::now()->startOfMonth();
		$end_date = Carbon::now()->endOfMonth();

		return $this->getUsersList($start_date, $end_date, '- aktualnie wybrana jest data od początku do końca tego miesiąca');
	}

	public function changeUsersListLastMonth(){

		$start_date = Carbon::now()->subMonth()->startOfMonth();
		$end_date = Carbon::now()->subMonth()->endOfMonth();

		return $this->getUsersList($start_date, $end_date, '- aktualnie wybrana jest data od początku do końca poprzedniego miesiąca');
	}

	public function changeUsersListYear(){

		$start_date = Carbon::now()->startOfYear();
		$end_date = Carbon::now()->endOfYear();

		return $this->getUsersList($start_date, $end_date, '- aktualnie wybrana jest data od początku do końca tego roku');
	}

	

    private function getSailedPlansUserByPartnerUser($start_date, $end_date){

    	//$usersToDistributor = Auth::user()->usersToDistributor;


    	$usersToDistributor = DB::table('users_to_reselers')
						->select(
									'plans.name as plan_name',
									'plans.description as plan_description',
									'plans_users.expiration_date as plan_user_expiration_date',
									'plans_users.created_at as plan_user_created_at',
									'plans_users.plan_cost_to_pay_with_rabat as plan_cost_to_pay_with_rabat',
									'plans_users.plan_cost_to_pay as plan_cost',
									'currencies.name as currency_name',
									DB::raw('ROUND((plans_users.plan_cost_to_pay - plans_users.plan_cost_to_pay_with_rabat), 2) AS provision')
									)

						->leftJoin('plans_users', 'plans_users.user_id', '=', 'users_to_reselers.user_id')
						->leftJoin('plans', 'plans.id', '=', 'plans_users.plan_id')
						->leftJoin('currencies', 'currencies.id', '=', 'plans_users.currency_id')
						->whereBetween('plans_users.created_at', [$start_date, $end_date])
						->where('users_to_reselers.reseler_id', '=', Auth::user()->id)
						->where('plans_users.currency_id', '=', $this->currency_id)
						->get();

    	return $usersToDistributor;
    }

}
