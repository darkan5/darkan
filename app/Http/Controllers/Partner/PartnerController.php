<?php

namespace App\Http\Controllers\Partner;

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

class PartnerController extends Controller
{

    public function getUsersList($start_date = false, $end_date = false, $info = '- aktualnie wybrana jest data od początku do końca tego miesiąca'){

    	Carbon::setLocale('pl');
		CarbonInterval::setLocale('pl');

    	$start_date = $start_date ? $start_date : Carbon::now()->startOfMonth();
		$end_date = $end_date ? $end_date : Carbon::now()->endOfMonth();

		$usersToPromoCodes = $this->getSailedPlansUserByPartnerUser($start_date, $end_date);

		$saldo = 0;

		foreach ($usersToPromoCodes as $userToPromoCode) {

			$saldo += $userToPromoCode->provision;
            
    	}

    	$timeAmount = Carbon::createFromFormat('Y-m-d H:i:s', $start_date)->diff(Carbon::createFromFormat('Y-m-d H:i:s', $end_date));
		$timeAmountForHumans = CarbonInterval::create($timeAmount->y, $timeAmount->m, 0,  $timeAmount->d, $timeAmount->h, $timeAmount->i, $timeAmount->s);  // 2 years 5 weeks 1 day 1 hour 2 minutes 7 seconds

        return view('partner.users.saled_plans_user_list')
        			->with('info', $info)
        			->with('start_date', $start_date)
					->with('end_date', $end_date)
					->with('saldo', $saldo)
					->with('timeAmountForHumans', $timeAmountForHumans)
        			->with('usersToPromoCodes', $usersToPromoCodes);
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

    	//$usersToPromoCodes = Auth::user()->usersToPromoCodes;


    	$usersToPromoCodes = DB::table('users_to_promo_codes')
						->select(
									'promo_codes.code as promo_code_name', 
									'users_to_promo_codes.promo_code_id as promo_code_id',
									'plans.name as plan_name',
									'plans.description as plan_description',
									'plans_users.expiration_date as plan_user_expiration_date',
									'plans_users.created_at as plan_user_created_at',
									'plans_users.plan_cost_to_pay as plan_cost_to_pay',
									'promo_codes.rabat as promo_code_rabat',
									'plans_users.plan_cost_to_pay as plan_cost',
									'currencies.name as currency_name',
									DB::raw('ROUND((plans_users.plan_cost_to_pay - plans_users.plan_cost_to_pay_with_rabat), 2) AS provision')
									)

						->leftJoin('promo_codes', 'promo_codes.id', '=', 'users_to_promo_codes.promo_code_id')
						->leftJoin('plans_users', 'plans_users.promo_code_id', '=', 'promo_codes.id')
						->leftJoin('plans', 'plans.id', '=', 'plans_users.plan_id')
						->leftJoin('currencies', 'currencies.id', '=', 'plans_users.currency_id')
						->whereBetween('plans_users.created_at', [$start_date, $end_date])
						->where('users_to_promo_codes.user_id', '=', Auth::user()->id)
						->where('plans_users.currency_id', '=', 1)
						->get();


    	return $usersToPromoCodes;
    }

}
